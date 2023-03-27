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
  constructor(options = {}) {
    console.log("new AnimationLoop()");

    this.defaultOptions = {
      debug: false, // log info on subscriptions
      start: true, // automatically start on first subscription
    };
    this.options = { ...this.defaultOptions, ...options };

    this.callbacks = [];
    this.frame = null;

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

  subscribe(callback) {
    if (!callback || typeof callback !== "function") return;

    this.callbacks.push(callback);

    if (this.options.start && this.callbacks.length === 1 && !this.isRunning) {
      this.start();
    }
  }

  unsubscribe(callback) {
    if (!callback || typeof callback !== "function") return;

    this.callbacks = this.callbacks.filter((c) => c !== callback);

    if (this.options.start && !this.callbacks.length) {
      this.stop();
    }
  }

  start() {
    this.isRunning = true;
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame((t) => {
      this.onFrame(t);
    });
  }

  stop() {
    this.isRunning = false;
    cancelAnimationFrame(this.frame);
  }

  destroy() {
    this.stop();

    this.callbacks = [];

    clearTimeout(this.debugTimer);
  }

  onFrame(time) {
    if (!this.isRunning) return;

    if (this.callbacks && typeof this.callbacks === "object") {
      this.callbacks.forEach((c) => c(time));
    }

    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame((t) => {
      this.onFrame(t);
    });
  }
}

export { AnimationLoop };
