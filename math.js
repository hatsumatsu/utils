/**
 * Clamp value
 * @param {number} value - value to clamp
 * @param {number} min - minimum value
 * @param {number} max - maximum value
 * @returns {number} clamped value
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between to values
 * @param {number} value1 - range start
 * @param {number} value2 - range end
 * @param {number} lerp factor - amount 0...1
 * @returns {number} Interpolated value
 */
function lerp(value1, value2, factor) {
  factor = clamp(factor, 0, 1);

  return factor === 0
    ? value1
    : factor === 1
    ? value2
    : value1 + (value2 - value1) * factor;
}

/**
 * Map value from one range to another
 * @param {number} value - value to map
 * @param {number[]} input - array of min and max value to map from
 * @param {number} input[0] - minimum value of input range
 * @param {number} input[1] - maximum value of input range
 * @param {number[]} output - array of min and max value to map to
 * @param {number} output[0] - minimum value of output range
 * @param {number} output[1] - maximum value of output range
 * @returns {number} Mapped value
 */
function map(value = 0, input = [0, 0], output = [0, 0]) {
  return (
    ((value - input[0]) * (output[1] - output[0])) / (input[1] - input[0]) +
    output[0]
  );
}

/**
 * Easing functions
 *
 * Replace with d3-ease
 */
const easing = {
  linear: (t) => t,

  easeInSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine: (t) => Math.sin((t * Math.PI) / 2),
  easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,

  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => --t * t * t + 1,
  easeInOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,

  easeInQuart: (t) => t * t * t * t,
  easeOutQuart: (t) => 1 - --t * t * t * t,
  easeInOutQuart: (t) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,

  easeInQuint: (t) => t * t * t * t * t,
  easeOutQuint: (t) => 1 + --t * t * t * t * t,
  easeInOutQuint: (t) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
};

export { clamp, lerp, map, easing };
