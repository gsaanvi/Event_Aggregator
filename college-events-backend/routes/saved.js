const express = require('express');
const { supabase } = require('../lib/supabase');
const { auth, requireStudent } = require('../middleware/auth');

const router = express.Router();

router.post('/saved', auth, requireStudent, async (req, res) => {
  try {
    const eventId = req.body?.event_id;
    if (!eventId) return res.status(400).json({ error: 'event_id is required' });

    // Ensure we don't create duplicates for the same student/event.
    const { data: existing, error: existingError } = await supabase
      .from('saved_events')
      .select('id')
      .eq('student_id', req.user.id)
      .eq('event_id', eventId)
      .maybeSingle();

    if (existingError) return res.status(500).json({ error: existingError.message });
    if (existing) return res.status(200).json({ saved: true, already_saved: true, event_id: eventId });

    const nowISO = new Date().toISOString();
    const { data: savedRow, error: insertError } = await supabase
      .from('saved_events')
      .insert({ student_id: req.user.id, event_id: eventId, saved_at: nowISO })
      .select('*')
      .single();

    if (insertError) return res.status(400).json({ error: insertError.message });
    return res.status(201).json({ saved: true, event: savedRow });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to save event' });
  }
});

router.delete('/saved/:event_id', auth, requireStudent, async (req, res) => {
  try {
    const eventId = req.params.event_id;

    const { data, error } = await supabase
      .from('saved_events')
      .delete()
      .eq('student_id', req.user.id)
      .eq('event_id', eventId)
      .select('id');

    if (error) return res.status(400).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ error: 'Saved event not found' });

    return res.json({ deleted: true, event_id: eventId });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to unsave event' });
  }
});

router.get('/saved', auth, requireStudent, async (req, res) => {
  try {
    const { data: savedRows, error: savedErr } = await supabase
      .from('saved_events')
      .select('event_id, saved_at')
      .eq('student_id', req.user.id);

    if (savedErr) return res.status(500).json({ error: savedErr.message });

    const eventIds = (savedRows ?? []).map((r) => r.event_id);
    if (eventIds.length === 0) return res.json({ events: [] });

    const savedAtByEventId = new Map();
    for (const row of savedRows ?? []) {
      savedAtByEventId.set(row.event_id, row.saved_at);
    }

    const { data: events, error: eventsErr } = await supabase
      .from('events')
      .select('*')
      .in('id', eventIds);

    if (eventsErr) return res.status(500).json({ error: eventsErr.message });

    const enriched = (events ?? []).map((evt) => ({
      ...evt,
      saved_at: savedAtByEventId.get(evt.id) ?? null
    }));

    return res.json({ events: enriched });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to fetch saved events' });
  }
});

module.exports = router;

