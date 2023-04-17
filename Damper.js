import { clamp } from "./math";

// easeInOutCubic
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

class Damper {
  constructor(
    initialValue = 0,
    smoothTime = 1,
    maxSpeed = Infinity,
    easing = easeInOutCubic,
    precision = 0.001
  ) {
    this.value = initialValue;

    this.smoothTime = Math.max(0.0001, smoothTime);
    this.maxSpeed = maxSpeed;
    this.easing = easing;
    this.precision = precision;
    this.velocity = 0;
  }

  update(targetValue, deltaTime) {
    if (Math.abs(this.value - targetValue) <= this.precision) {
      this.value = this.targetValue;
      return this.value;
    }

    const originalTargetValue = targetValue;

    const omega = 2 / this.smoothTime;
    const t = this.easing(omega * deltaTime);
    const maxChange = this.maxSpeed * this.smoothTime;

    const change = clamp(this.value - targetValue, -maxChange, maxChange);

    const temp = (this.velocity + omega * change) * deltaTime;
    this.velocity = (this.velocity - omega * temp) * t;
    let newValue = this.value - change + (change + temp) * t;

    if (
      originalTargetValue - this.value > 0.0 ===
      newValue > originalTargetValue
    ) {
      newValue = originalTargetValue;
      this.velocity = (newValue - originalTargetValue) / deltaTime;
    }

    this.value = newValue;
    return this.value;
  }

  get() {
    return this.value;
  }
}

export { Damper };
