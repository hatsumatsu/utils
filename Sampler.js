/**
 * Rolling average sampler for smoothing noisy values (e.g., touch deltas).
 *
 * Example usage:
 *   const dxSampler = new Sampler(8);
 *   dxSampler.sample(12);  // -> 12
 *   dxSampler.sample(10);  // -> 11
 *   dxSampler.reset();     // clears history
 */
class Sampler {
  /**
   * @param {number} size - Number of recent samples to average (window size)
   * @param {number} [clampRatio=0] - Optional ratio to ignore large outliers (0 disables)
   */
  constructor(size = 5, clampRatio = 0) {
    this.size = size;
    this.clampRatio = clampRatio;
    this.buffer = [];
    this.sum = 0;
  }

  /**
   * Add a new sample and get the current smoothed average.
   * @param {number} value
   * @returns {number} smoothed value
   */
  sample(value) {
    if (typeof value !== "number" || isNaN(value)) return false;

    const mean = this.getAverage() || value;

    // Optional outlier rejection
    if (this.clampRatio > 0 && this.buffer.length) {
      const deviation = Math.abs(value - mean);
      if (deviation > this.clampRatio * Math.abs(mean)) {
        return mean; // ignore this outlier
      }
    }

    this.buffer.push(value);
    this.sum += value;

    if (this.buffer.length > this.size) {
      this.sum -= this.buffer.shift();
    }
  }

  /**
   * Compute current average.
   * @returns {number}
   */
  getAverage() {
    return this.buffer.length ? this.sum / this.buffer.length : 0;
  }

  /**
   * Reset the buffer and sum.
   */
  reset() {
    this.buffer = [];
    this.sum = 0;
  }
}

export { Sampler };
