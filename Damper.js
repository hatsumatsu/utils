import { clamp } from "./math.js";

/**
 * Damper
 */
class Damper {
  /**
   * Create new Damper
   *
   * @param {number} initialValue - initial value
   * @param {object} options
   * @param {number} options.smoothTime - smooth time
   * @param {number} options.maxSpeed - max speed
   * @param {function(t:number)} options.easing - easing function
   * @param {number} options.precision - precision
   */
  constructor(
    initialValue = 0,

    options = {}
  ) {
    this.defaults = {
      smoothTime: 1,
      maxSpeed: Infinity,
      easing: (t) => 1 / (1 + t + 0.48 * t * t + 0.235 * t * t * t),
      precision: 0.001,
    };

    this.options = Object.assign({}, this.defaults, options);

    this.value = initialValue;
  }

  /**
   * Update the value
   *
   * @param {number} targetValue - target value
   * @param {number} deltaTime - time since last update
   * @returns {number} current value
   */
  update(targetValue, deltaTime) {
    if (Math.abs(this.value - targetValue) <= this.options.precision) {
      this.value = targetValue;
      return this.value;
    }

    const originalTargetValue = targetValue;

    const omega = 2 / this.options.smoothTime;
    const t = this.options.easing(omega * deltaTime);
    const maxChange = this.options.maxSpeed * this.options.smoothTime;

    const change = clamp(this.value - targetValue, -maxChange, maxChange);

    const temp = (this.options.velocity + omega * change) * deltaTime;
    this.options.velocity = (this.options.velocity - omega * temp) * t;
    let newValue = this.value - change + (change + temp) * t;

    if (
      originalTargetValue - this.value > 0.0 ===
      newValue > originalTargetValue
    ) {
      newValue = originalTargetValue;
      this.options.velocity = (newValue - originalTargetValue) / deltaTime;
    }

    this.value = newValue;

    return this.value;
  }

  /**
   * Get the current value
   * @returns {number} current value
   */
  get() {
    return this.value;
  }
}

export { Damper };
