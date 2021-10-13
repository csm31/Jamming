/**
 * Put a capital letter to each word
 * @param {string} title
 * @returns {string}
 */
export const capitalizeTitle = (title) => {
  const splitWords = title.split(" ");
  splitWords.forEach((element, index) => {
    splitWords[index] = element[0].toUpperCase() + element.slice(1);
  });
  return splitWords.join(" ");
};
