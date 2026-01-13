// Performance monitoring and optimization utilities

/**
 * Frame rate monitor for animation performance
 */
export class FrameRateMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private isMonitoring = false;
  private onLowFrameRate?: (fps: number) => void;

  constructor(onLowFrameRate?: (fps: number) => void) {
    this.onLowFrameRate = onLowFrameRate;
  }

  start() {
    if (this.isMonitoring) return;
    this.isMonitoring = true;
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.checkFrameRate();
  }

  stop() {
    this.isMonitoring = false;
  }

  private checkFrameRate = () => {
    if (!this.isMonitoring) return;

    const currentTime = performance.now();
    this.frameCount++;

    if (currentTime - this.lastTime >= 1000) {
      const fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
      
      // If frame rate drops below 30fps, trigger callback
      if (fps < 30 && this.onLowFrameRate) {
        this.onLowFrameRate(fps);
      }
      
      this.frameCount = 0;
      this.lastTime = currentTime;
    }
    
    requestAnimationFrame(this.checkFrameRate);
  };
}

/**
 * Memory usage monitor
 */
export class MemoryMonitor {
  private intervalId?: NodeJS.Timeout;
  private onHighMemoryUsage?: (usage: number) => void;

  constructor(onHighMemoryUsage?: (usage: number) => void) {
    this.onHighMemoryUsage = onHighMemoryUsage;
  }

  start(intervalMs = 5000) {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usedMB = memory.usedJSHeapSize / 1024 / 1024;
        const totalMB = memory.totalJSHeapSize / 1024 / 1024;
        const usage = (usedMB / totalMB) * 100;

        // If memory usage exceeds 80%, trigger callback
        if (usage > 80 && this.onHighMemoryUsage) {
          this.onHighMemoryUsage(usage);
        }
      }
    }, intervalMs);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }
}

/**
 * Bundle size analyzer
 */
export const getBundleSize = () => {
  if (typeof window === 'undefined') return null;

  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  
  return {
    scriptCount: scripts.length,
    styleCount: styles.length,
    // Note: Actual size would need to be measured during build time
    estimatedSize: scripts.length * 50 + styles.length * 20, // Rough estimate in KB
  };
};

/**
 * Performance optimization hooks
 */
export const usePerformanceMonitoring = () => {
  const [frameRate, setFrameRate] = React.useState<number | null>(null);
  const [memoryUsage, setMemoryUsage] = React.useState<number | null>(null);
  const [isOptimized, setIsOptimized] = React.useState(true);

  React.useEffect(() => {
    const frameMonitor = new FrameRateMonitor((fps) => {
      setFrameRate(fps);
      if (fps < 30) {
        setIsOptimized(false);
        console.warn(`Low frame rate detected: ${fps}fps`);
      }
    });

    const memoryMonitor = new MemoryMonitor((usage) => {
      setMemoryUsage(usage);
      if (usage > 80) {
        setIsOptimized(false);
        console.warn(`High memory usage detected: ${usage.toFixed(1)}%`);
      }
    });

    frameMonitor.start();
    memoryMonitor.start();

    return () => {
      frameMonitor.stop();
      memoryMonitor.stop();
    };
  }, []);

  return {
    frameRate,
    memoryUsage,
    isOptimized,
    bundleSize: getBundleSize(),
  };
};

/**
 * Debounce utility for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle utility for performance optimization
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Lazy loading utility for components
 */
export const createLazyComponent = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
) => {
  return React.lazy(importFunc);
};

// Import React for hooks
import React from 'react';