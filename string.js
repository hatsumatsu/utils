function truncate(string, totalChars, prepend = "...") {
  return string.length <= totalChars
    ? string
    : `${string.slice(0, totalChars)}${prepend}`;
}

export { truncate };
