import { lerp } from "./math.js";

/**
 * Inertia
 */
export default class Inertia {
  /**
   * Create new Inertia
   *
   * @param {object} options
   * @param {number} options.lerpFactor - amount of inertia
   * @param {number} options.precision - precision
   */
  constructor(options = {}) {
    this.defaults = {
      lerpFactor: 0.035,
      precision: 0.1,
    };

    this.options = Object.assign({}, this.defaults, options);

    this.isActive = false;

    this.value = null;
    this.frame = null;
  }

  /**
   * Activate the instance
   */
  activate() {
    if (Math.abs(this.value) < this.options.precision) {
      return;
    }

    this.isActive = true;

    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      this.onFrame();
    });
  }

  /**
   * Deactivate the instance
   */
  deactivate() {
    this.isActive = false;
    this.value = 0;

    cancelAnimationFrame(this.frame);
  }

  /**
   * Set the value
   * @param {number} value - target value
   */
  setValue(value) {
    this.value = value;
  }

  /**
   * Destroy the instance
   */
  destroy() {
    this.deactivate();
  }

  /**
   * Frame loop while the instance is active
   */
  onFrame() {
    if (!this.isActive) {
      return;
    }

    this.value = lerp(this.value, 0, this.options.lerpFactor);

    if (Math.abs(this.value) < this.options.precision) {
      this.deactivate();
    }

    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      this.onFrame();
    });
  }

  /**
   * Return whether the instance is active
   * @returns {boolean} whether the instance is active
   */
  getIsActive() {
    return this.isActive;
  }

  /**
   * Get current value
   * @returns {number} current value
   */
  getValue() {
    return this.value;
  }
}

export { Inertia };
