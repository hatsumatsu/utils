/**
 * Get DOM node from template string
 * @param {string} string - string containing HTML
 * @returns {Node} DOM node
 */
function getNodeFromString(string) {
  const element = document.createElement("div");
  element.innerHTML = string.trim();

  return element.firstChild;
}

function repaint(element) {
  if (!element) return;

  element.offsetHeight;
}

export { getNodeFromString, repaint };
