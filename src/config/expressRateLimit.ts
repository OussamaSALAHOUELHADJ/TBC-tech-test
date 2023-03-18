import ratelimit from 'express-rate-limit';

export const limiter = ratelimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
});
