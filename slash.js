function untrailingSlashIt(str) {
  return str.replace(/\/$/, "");
}

function trailingSlashIt(str) {
  return untrailingSlashIt(str) + "/";
}

function unleadingSlashIt(str) {
  return str.replace(/^\//, "");
}

function leadingSlashIt(str) {
  return "/" + unleadingSlashIt(str);
}

export { trailingSlashIt, untrailingSlashIt, unleadingSlashIt, leadingSlashIt };
