const { supabase } = require('../lib/supabase');

function getBearerToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || typeof authHeader !== 'string') return null;
  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) return null;
  return token;
}

async function auth(req, res, next) {
  const token = getBearerToken(req);
  if (!token) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const userId = data.user.id;
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('id, name, email, role, year, branch')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      return res.status(401).json({ error: 'User profile not found' });
    }

    req.user = profile;
    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin only' });
  }
  return next();
}

function requireStudent(req, res, next) {
  if (req.user?.role !== 'student') {
    return res.status(403).json({ error: 'Student only' });
  }
  return next();
}

module.exports = { auth, requireAdmin, requireStudent };

