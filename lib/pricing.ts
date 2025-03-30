import { prisma } from "@/lib/prisma";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

interface PricingConfig {
  basePrice: number; // Base price in INR per hour
  maxPrice: number; // Maximum price in INR per hour
  demandMultiplier: number; // Multiplier for high demand
  updateInterval: number; // Price update interval in seconds
}

const PRICING_CONFIG: PricingConfig = {
  basePrice: 5, // ₹5/hour base price
  maxPrice: 50, // ₹50/hour maximum price
  demandMultiplier: 1.5, // 50% increase during high demand
  updateInterval: 300, // Update every 5 minutes
};

export class PricingService {
  private static instance: PricingService;
  private redis: Redis;

  private constructor() {
    this.redis = redis;
  }

  public static getInstance(): PricingService {
    if (!PricingService.instance) {
      PricingService.instance = new PricingService();
    }
    return PricingService.instance;
  }

  async getCurrentPrice(): Promise<number> {
    try {
      // Get current demand from Redis
      const demand = await this.redis.get<number>("render_demand") ?? 0;
      
      // Calculate price based on demand
      const price = this.calculatePrice(demand);
      
      return price;
    } catch (error) {
      console.error("Get current price error:", error);
      return PRICING_CONFIG.basePrice; // Return base price on error
    }
  }

  async updateDemand(activeJobs: number): Promise<void> {
    try {
      // Store current demand in Redis
      await this.redis.set("render_demand", activeJobs);
      
      // Set expiry to ensure price updates
      await this.redis.expire("render_demand", PRICING_CONFIG.updateInterval);
    } catch (error) {
      console.error("Update demand error:", error);
    }
  }

  async createBillingSession(userId: string, jobId: string): Promise<string> {
    try {
      // Get current price
      const price = await this.getCurrentPrice();
      
      // Create billing session in database
      const session = await prisma.billingSession.create({
        data: {
          userId,
          jobId,
          price,
          status: "PENDING",
          createdAt: new Date(),
        },
      });
      
      return session.id;
    } catch (error) {
      console.error("Create billing session error:", error);
      throw error;
    }
  }

  private calculatePrice(demand: number): number {
    // Calculate price based on demand
    const demandFactor = Math.min(demand / 100, 1); // Normalize demand to 0-1
    const priceMultiplier = 1 + (demandFactor * (PRICING_CONFIG.demandMultiplier - 1));
    
    // Calculate final price
    const price = PRICING_CONFIG.basePrice * priceMultiplier;
    
    // Ensure price doesn't exceed maximum
    return Math.min(price, PRICING_CONFIG.maxPrice);
  }
} 