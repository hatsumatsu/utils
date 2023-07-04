const nextFrame = () => new Promise(requestAnimationFrame);

const delay = (duration) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });

export { nextFrame, delay };
