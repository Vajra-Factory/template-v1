import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const RATE_LIMIT = {
  WINDOW: 60, // 1 minute window
  MAX_REQUESTS: 100, // 100 requests per minute
};

export async function rateLimit(ip: string) {
  try {
    const key = `rate_limit:${ip}`;
    
    // Get current request count
    const current = await redis.get<number>(key) ?? 0;
    
    // Check if rate limit exceeded
    if (current >= RATE_LIMIT.MAX_REQUESTS) {
      return { success: false };
    }
    
    // Increment request count
    await redis.incr(key);
    
    // Set expiry if first request
    if (current === 0) {
      await redis.expire(key, RATE_LIMIT.WINDOW);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Rate limiting error:", error);
    return { success: true }; // Allow requests if rate limiting fails
  }
} 