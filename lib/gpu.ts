import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function detectGPU(): Promise<string> {
  try {
    // For Windows
    if (process.platform === "win32") {
      const { stdout } = await execAsync("wmic path win32_VideoController get name");
      const gpuName = stdout.split("\n")[1].trim().toLowerCase();
      
      // Check if it's an integrated GPU
      if (gpuName.includes("intel") || gpuName.includes("amd radeon") || gpuName.includes("vega")) {
        return "iGPU";
      }
      
      return "dGPU";
    }
    
    // For Linux
    if (process.platform === "linux") {
      const { stdout } = await execAsync("lspci | grep -i vga");
      const gpuInfo = stdout.toLowerCase();
      
      if (gpuInfo.includes("intel") || gpuInfo.includes("amd") || gpuInfo.includes("vega")) {
        return "iGPU";
      }
      
      return "dGPU";
    }
    
    // For macOS
    if (process.platform === "darwin") {
      const { stdout } = await execAsync("system_profiler SPDisplaysDataType");
      const gpuInfo = stdout.toLowerCase();
      
      if (gpuInfo.includes("intel") || gpuInfo.includes("integrated")) {
        return "iGPU";
      }
      
      return "dGPU";
    }
    
    // Default to dGPU if detection fails
    return "dGPU";
  } catch (error) {
    console.error("GPU detection error:", error);
    return "dGPU"; // Default to dGPU if detection fails
  }
} 