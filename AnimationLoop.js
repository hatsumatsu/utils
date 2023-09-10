/**
 * Unified animation loop
 *
 * In some circumstances performance of multiple independent requestAnimationFrame loops
 * is worse than batching all tasks in one loop
 *
 * How to use:
 *
 * // ----------------------
 * // Init globally
 * // ----------------------
 * const loop = AnimationLoop({
 *   debug: false, // log loop infos to console
 *   start: true // automatically start on first subscription
 * });
 *
 * // loop.start();
 * // loop.stop();
 * // loop.destroy();
 *
 *
 * // ----------------------
 * // in your components:
 * // ----------------------
 *
 * function onFrame() {
 *   // your animation...
 * }
 *
 * loop.subscribe(onFrame);
 * loop.unsubscribe(onFrame);
 *
 */
class AnimationLoop {
  /**
   * Creates a new AnimationLoop
   * @param {object} options
   * @param {boolean} options.debug - Log info on subscriptions
   * @param {boolean} options.start - Automatically start on first subscription, stop without subscriptions
   */
  constructor(options = {}) {
    console.log("new AnimationLoop()");

    this.defaults = {
      debug: false,
      start: true,
    };
    this.options = { ...this.defaults, ...options };

    this.callbacks = [];
    this.frame = null;
    this.frameTime = undefined;

    this.isRunning = false;

    if (this.options.debug) {
      this.debugTimer = setInterval(() => {
        console.log(
          "[AnimationLoop]",
          `${this.callbacks.length} subscriptions.`,
          `loop is ${this.isRunning ? "" : "NOT "}running.`
        );
      }, 2000);
    }
  }

  /**
   * Subscribe to the loop
   * @param {function} callback - function to call on every frame
   */
  subscribe(callback) {
    if (!callback || typeof callback !== "function") return;

    this.callbacks.push(callback);

    if (this.options.start && this.callbacks.length === 1 && !this.isRunning) {
      this.start();
    }
  }

  /**
   * Unsubscribe from the loop
   * @param {function} callback - function to not call on every frame anymore
   */
  unsubscribe(callback) {
    if (!callback || typeof callback !== "function") return;

    this.callbacks = this.callbacks.filter((c) => c !== callback);

    if (this.options.start && !this.callbacks.length) {
      this.stop();
    }
  }

  /**
   * Start the loop
   */
  start() {
    this.isRunning = true;
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame((t) => {
      this.onFrame(t);
    });
  }

  /**
   * Stop the loop
   */
  stop() {
    this.isRunning = false;
    cancelAnimationFrame(this.frame);
  }

  /**
   * Destroy the instance
   */
  destroy() {
    this.stop();

    this.callbacks = [];

    clearTimeout(this.debugTimer);
  }

  /**
   * Function called on every frame
   *
   * @param {number} time - Current time useually passed from requestAnimationFrame
   */
  onFrame(time) {
    if (!this.isRunning) return;

    const delta = this.frameTime ? time - this.frameTime : 0;

    if (this.callbacks && typeof this.callbacks === "object") {
      this.callbacks.forEach((c) => c(time, delta));
    }

    this.frameTime = time;

    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame((t) => {
      this.onFrame(t);
    });
  }
}

export { AnimationLoop };
