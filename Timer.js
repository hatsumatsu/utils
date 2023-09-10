/**
 * Timer
 */
class Timer {
  /**
   * Create new Timer
   *
   * @param {number} delay - delay in ms
   * @param {number} interval - interval in ms
   * @param {number} iterations - total iterations
   * @param {function(iteration:number)} callback - iteration callback
   * @param {function(iteration:number)} callbackStart - start callback
   * @param {function(iteration:number)} callbackFinish - finish callback
   * @param {boolean} start - start the timer after initialization
   * @param {boolean} immediate - run first iteration immerdiately
   */
  constructor(
    delay = 0,
    interval = 100,
    iterations = 10,
    callback = () => {},
    callbackStart = () => {},
    callbackFinish = () => {},
    start = true,
    immediate = true
  ) {
    this.settings = {
      delay,
      interval,
      iterations,
      start,
      immediate,
    };

    this.currentIteration = 0;

    this.callback = callback;
    this.callbackStart = callbackStart;
    this.callbackFinish = callbackFinish;

    this.timer = {
      delay: null,
      interval: null,
    };

    this.is = {
      running: false,
    };

    if (this.settings.start) this.start();
  }

  /**
   * Start timer
   */
  start() {
    if (this.is.running) this.stop();

    this.is.running = true;

    this.timer.delay = setTimeout(() => {
      this.callbackStart();

      this.currentIteration = 0;

      if (this.settings.immediate) {
        this.callback(this.currentIteration);
        this.currentIteration++;
      }

      this.timer.interval = setInterval(() => {
        this.callback(this.currentIteration);
        this.currentIteration++;

        if (this.currentIteration >= this.settings.iterations) {
          this.stop();
        }
      }, this.settings.interval);
    }, this.settings.delay);
  }

  /**
   * Stop timer
   */
  stop() {
    clearInterval(this.timer.interval);
    clearTimeout(this.timer.delay);

    this.is.running = false;

    this.callbackFinish();
  }

  /**
   * Destroy timer instance
   */
  destroy() {
    this.stop();
  }
}

export { Timer };
