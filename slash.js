/**
 * Remove trailing slash from string
 * @param {string} string
 * @returns {string} string
 */
function untrailingSlashIt(string) {
  return string.replace(/\/$/, "");
}

/**
 * add trailing slash from string
 * @param {string} string
 * @returns {string} string
 */
function trailingSlashIt(string) {
  return untrailingSlashIt(string) + "/";
}

/**
 * Remove leading slash from string
 * @param {string} string
 * @returns {string} string
 */
function unleadingSlashIt(string) {
  return string.replace(/^\//, "");
}

/**
 * Add leading slash from string
 * @param {string} string
 * @returns {string} string
 */
function leadingSlashIt(string) {
  return "/" + unleadingSlashIt(string);
}

export { trailingSlashIt, untrailingSlashIt, unleadingSlashIt, leadingSlashIt };
