// Rate limiting utility for MARYAN API endpoints
// Uses in-memory store per function instance (best-effort for MVP)
// Upgrade to Vercel KV / Upstash Redis for production scale

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}

// Config: max requests per window
const LIMITS = {
  authenticated: { max: 30, windowMs: 60 * 1000 },   // 30/min per user
  anonymous: { max: 5, windowMs: 60 * 1000 },          // 5/min per IP
};

// In-memory store for rate limiting (per function instance, best-effort)
const store = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, isAuthenticated: boolean): RateLimitResult {
  const config = isAuthenticated ? LIMITS.authenticated : LIMITS.anonymous;
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now >= entry.resetAt) {
    // New window
    store.set(key, { count: 1, resetAt: now + config.windowMs });
    return { allowed: true, remaining: config.max - 1, resetAt: new Date(now + config.windowMs) };
  }

  if (entry.count >= config.max) {
    return { allowed: false, remaining: 0, resetAt: new Date(entry.resetAt) };
  }

  entry.count++;
  return { allowed: true, remaining: config.max - entry.count, resetAt: new Date(entry.resetAt) };
}

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now >= entry.resetAt) store.delete(key);
  }
}, 60_000);
