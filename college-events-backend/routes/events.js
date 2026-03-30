const express = require('express');
const { supabase } = require('../lib/supabase');
const { auth, requireAdmin } = require('../middleware/auth');

function toDateOnlyISO(date) {
  // Supabase DATE comparisons work best with YYYY-MM-DD strings.
  return date.toISOString().slice(0, 10);
}

function normalizeTags(tags) {
  if (tags === undefined) return undefined;
  if (Array.isArray(tags)) return tags.map((t) => String(t).trim()).filter(Boolean);
  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
}

function pickUpdatePayload(body) {
  const payload = {};

  const allowedFields = [
    'title',
    'description',
    'date',
    'time',
    'venue',
    'category',
    'tags',
    'registration_link',
    'organizer_name',
    'organizer_college',
    'poster_url',
    'max_seats'
  ];

  for (const key of allowedFields) {
    if (!(key in body)) continue;
    if (key === 'tags') {
      payload.tags = normalizeTags(body.tags) ?? [];
      continue;
    }
    if (key === 'max_seats') {
      const num = Number(body.max_seats);
      if (!Number.isFinite(num)) throw new Error('max_seats must be a number');
      payload.max_seats = num;
      continue;
    }
    payload[key] = body[key];
  }

  return payload;
}

const router = express.Router();

// GET /api/events — fetch all upcoming events
router.get('/events', async (req, res) => {
  try {
    const today = toDateOnlyISO(new Date());
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : null;
    const category = typeof req.query.category === 'string' ? req.query.category.trim() : null;
    const college = typeof req.query.college === 'string' ? req.query.college.trim() : null;

    let q = supabase
      .from('events')
      .select('*')
      .gte('date', today)
      .order('date', { ascending: true });

    if (search) {
      q = q.ilike('title', `%${search}%`);
    }
    if (category) {
      q = q.eq('category', category);
    }
    if (college) {
      q = q.ilike('organizer_college', `%${college}%`);
    }

    const { data, error } = await q;
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ events: data ?? [] });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// GET /api/events/:id — fetch single event by id
router.get('/events/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .maybeSingle();

    if (error) return res.status(500).json({ error: error.message });
    if (!data) return res.status(404).json({ error: 'Event not found' });
    return res.json({ event: data });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// POST /api/events — create event (admin only)
router.post('/events', auth, requireAdmin, async (req, res) => {
  try {
    const body = req.body || {};
    const tags = normalizeTags(body.tags) ?? [];

    if (!body.title) return res.status(400).json({ error: 'title is required' });
    if (!body.date) return res.status(400).json({ error: 'date is required' });

    const payload = {
      title: body.title,
      description: body.description ?? null,
      date: body.date,
      time: body.time ?? null,
      venue: body.venue ?? null,
      category: body.category ?? null,
      tags,
      registration_link: body.registration_link ?? null,
      organizer_name: body.organizer_name ?? null,
      organizer_college: body.organizer_college ?? null,
      poster_url: body.poster_url ?? null,
      max_seats: body.max_seats === undefined || body.max_seats === null ? null : Number(body.max_seats),
      created_by: req.user.id
    };

    if (payload.max_seats !== null && !Number.isFinite(payload.max_seats)) {
      return res.status(400).json({ error: 'max_seats must be a number' });
    }

    const { data, error } = await supabase
      .from('events')
      .insert(payload)
      .select('*')
      .single();

    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json({ event: data });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to create event' });
  }
});

// PUT /api/events/:id — update event (admin only)
router.put('/events/:id', auth, requireAdmin, async (req, res) => {
  try {
    const eventId = req.params.id;
    const body = req.body || {};
    const payload = pickUpdatePayload(body);

    if (Object.keys(payload).length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const { data, error } = await supabase
      .from('events')
      .update(payload)
      .eq('id', eventId)
      .select('*')
      .maybeSingle();

    if (error) return res.status(400).json({ error: error.message });
    if (!data) return res.status(404).json({ error: 'Event not found' });
    return res.json({ event: data });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to update event' });
  }
});

// DELETE /api/events/:id — delete event (admin only)
router.delete('/events/:id', auth, requireAdmin, async (req, res) => {
  try {
    const eventId = req.params.id;
    const { data, error } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId)
      .select('id');

    if (error) return res.status(400).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ error: 'Event not found' });
    return res.json({ deleted: true, id: eventId });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to delete event' });
  }
});

// GET /api/admin/stats — admin only
router.get('/admin/stats', auth, requireAdmin, async (req, res) => {
  try {
    const [{ count: totalEvents, error: errEvents }, { count: totalSaves, error: errSaves }, { count: totalReminders, error: errReminders }] =
      await Promise.all([
        supabase.from('events').select('id', { count: 'exact', head: true }),
        supabase.from('saved_events').select('id', { count: 'exact', head: true }),
        supabase.from('event_reminders').select('id', { count: 'exact', head: true })
      ]);

    if (errEvents) return res.status(500).json({ error: errEvents.message });
    if (errSaves) return res.status(500).json({ error: errSaves.message });
    if (errReminders) return res.status(500).json({ error: errReminders.message });

    return res.json({
      total_events: Number(totalEvents ?? 0),
      total_saves: Number(totalSaves ?? 0),
      total_reminders: Number(totalReminders ?? 0)
    });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
});

// GET /api/admin/events — admin only
router.get('/admin/events', auth, requireAdmin, async (req, res) => {
  try {
    const { data: events, error: eventsError } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (eventsError) return res.status(500).json({ error: eventsError.message });

    const [{ data: savedRows, error: savedError }, { data: reminderRows, error: reminderError }] =
      await Promise.all([
        supabase.from('saved_events').select('event_id'),
        supabase.from('event_reminders').select('event_id')
      ]);

    if (savedError) return res.status(500).json({ error: savedError.message });
    if (reminderError) return res.status(500).json({ error: reminderError.message });

    const saveCountByEventId = new Map();
    for (const row of savedRows ?? []) {
      saveCountByEventId.set(row.event_id, (saveCountByEventId.get(row.event_id) ?? 0) + 1);
    }

    const reminderCountByEventId = new Map();
    for (const row of reminderRows ?? []) {
      reminderCountByEventId.set(row.event_id, (reminderCountByEventId.get(row.event_id) ?? 0) + 1);
    }

    const enriched = (events ?? []).map((evt) => ({
      ...evt,
      save_count: saveCountByEventId.get(evt.id) ?? 0,
      reminder_count: reminderCountByEventId.get(evt.id) ?? 0
    }));

    return res.json({ events: enriched });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to fetch admin events' });
  }
});

module.exports = router;

