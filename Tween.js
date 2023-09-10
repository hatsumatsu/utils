/**
 * Tween
 *
 * ## Usage:
 *
 * const animation = new Tween({
 *   duration: 2000,
 *   onUpdate: (value, delta, progress ) => {
 *     console.log( `current value: ${value}`, `animation progress: ${}` );
 *   }
 * });
 *
 * animation.start( 0, 100 );
 */
export default class Tween {
  /**
   * Create new Tween
   *
   * @param {object} options - Options
   * @param {number} options.duration - Duration of the animation
   * @param {function(t:number)} options.easing - Easing function
   * @param {function(value:number, delta:number, progress:number)} options.onUpdate - Callback when value changes
   * @param {function(value:number)} options.onCompleted - Callback when animation finishes
   *
   */
  constructor(options) {
    this.defaults = {
      duration: 1000,
      easing: (t) => t,

      onUpdate: () => {},
      onCompleted: () => {},
    };
    this.options = Object.assign({}, this.defaults, options);

    this.isRunning = false;

    this.value = null;
    this.startValue = null;
    this.previousValue = null;
    this.targetValue = null;

    this.startTime = null;

    this.progress = 0;
    this.delta = 0;

    this.frame = null;
  }

  /**
   * Start animation
   * @param {number} startValue - start value
   * @param {number} targetValue - target value
   */
  start(startValue, targetValue) {
    this.value = startValue;
    this.startValue = startValue;
    this.previousValue = startValue;
    this.targetValue = targetValue;

    this.delta = 0;

    this.progress = 0;

    this.isRunning = true;

    this.frame = requestAnimationFrame((time) => {
      this.startTime = time;
      this.onFrame(time);
    });
  }

  /**
   * Stop the animation
   * @param {boolean} finish - Whether the value should be set to the target value
   */
  stop(finish = false) {
    this.isRunning = false;

    cancelAnimationFrame(this.frame);

    if (finish) {
      this.value = this.targetValue;
      this.options.onUpdate(this.value);
    }

    this.options.onCompleted(this.value);
  }

  destroy() {
    this.stop();
  }

  /**
   * Frame loop while the animation is running
   * @param {number} time - Current time useually passed from requestAnimationFrame
   */
  onFrame(time = 0) {
    if (!this.isRunning) {
      return;
    }

    const progress = this.options.easing(
      (time - this.startTime) / this.options.duration
    );

    this.previousValue = this.value;

    this.value =
      this.startValue + (this.targetValue - this.startValue) * progress;

    this.delta = this.value - this.previousValue;

    this.options.onUpdate(this.value, this.delta, this.progress);

    if (
      time - this.startTime >= this.options.duration ||
      Math.abs(this.value - this.targetValue) <= 0
    ) {
      this.stop();
      return;
    }

    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame((time) => {
      this.onFrame(time);
    });
  }

  /**
   * Return if the the animation is running
   * @returns {boolean} animation is running
   */
  getIsRunning() {
    return this.isRunning;
  }

  /**
   * Return current value
   * @returns {number} current value
   */
  getValue() {
    return this.value;
  }

  /**
   * Return current progess
   * @returns {number} current progess
   */
  getProgress() {
    return this.progress;
  }

  /**
   * Return current delta
   * @returns {number} current delta
   */
  getDelta() {
    return this.delta;
  }
}

export { Tween };
