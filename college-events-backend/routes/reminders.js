const express = require('express');
const { supabase } = require('../lib/supabase');
const { auth, requireStudent } = require('../middleware/auth');

const router = express.Router();

router.post('/reminders', auth, requireStudent, async (req, res) => {
  try {
    const eventId = req.body?.event_id;
    if (!eventId) return res.status(400).json({ error: 'event_id is required' });

    const nowISO = new Date().toISOString();

    // If reminder already exists, update reminded_at; otherwise insert a new row.
    const { data: existing, error: existingError } = await supabase
      .from('event_reminders')
      .select('id')
      .eq('student_id', req.user.id)
      .eq('event_id', eventId)
      .maybeSingle();

    if (existingError) return res.status(500).json({ error: existingError.message });
    if (existing) {
      const { data: updated, error: updateError } = await supabase
        .from('event_reminders')
        .update({ reminded_at: nowISO })
        .eq('student_id', req.user.id)
        .eq('event_id', eventId)
        .select('*')
        .single();

      if (updateError) return res.status(400).json({ error: updateError.message });
      return res.status(200).json({ reminder: updated, updated: true });
    }

    const { data: inserted, error: insertError } = await supabase
      .from('event_reminders')
      .insert({
        student_id: req.user.id,
        event_id: eventId,
        reminded_at: nowISO
      })
      .select('*')
      .single();

    if (insertError) return res.status(400).json({ error: insertError.message });
    return res.status(201).json({ reminder: inserted, updated: false });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to set reminder' });
  }
});

router.delete('/reminders/:event_id', auth, requireStudent, async (req, res) => {
  try {
    const eventId = req.params.event_id;

    const { data, error } = await supabase
      .from('event_reminders')
      .delete()
      .eq('student_id', req.user.id)
      .eq('event_id', eventId)
      .select('id');

    if (error) return res.status(400).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ error: 'Reminder not found' });

    return res.json({ cancelled: true, event_id: eventId });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to cancel reminder' });
  }
});

router.get('/reminders', auth, requireStudent, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('event_reminders')
      .select('event_id')
      .eq('student_id', req.user.id);

    if (error) return res.status(500).json({ error: error.message });
    return res.json({ event_ids: (data ?? []).map((r) => r.event_id) });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to fetch reminders' });
  }
});

module.exports = router;

