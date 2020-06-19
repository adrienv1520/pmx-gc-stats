/**
 * String helper.
 *
 * https://github.com/adrienv1520/consis
 *
 *    - capitalize({ string, first } = {}) -> String
 *    - camelCase({ string, separator } = {}) -> String
 */
const { is } = require('./object');

/**
 * @func capitalize
 *
 * put to upper case the first letter of a string.
 *
 * @param  {String} string a string to capitalized
 * @param  {Boolean} first whether only the first letter should be in upper case
 * @return {String}
 */
const capitalize = function capitalize({ string, first } = {}) {
  if (is(String, string)) {
    let capitalized = string.charAt(0).toUpperCase();

    if (first === true) {
      capitalized += string.slice(1).toLowerCase();
    } else {
      capitalized += string.slice(1);
    }

    return capitalized;
  }

  return '';
};

/**
 * @func camelCase
 *
 * put to camel case a string which words are separated by a specific string or pattern.
 *
 * @param  {String} string a string to put in camel case
 * @param  {String|RegExp} separator string or pattern separating words
 * @return {String}
 */
const camelCase = function camelCase({ string, separator } = {}) {
  let camelCaseStr = '';

  if (is(String, string) && (is(String, separator) || is(RegExp, separator))) {
    const splitted = string.split(separator);
    const splitLen = splitted.length;
    camelCaseStr = splitted[0].toLowerCase();

    for (let i = 1; i < splitLen; i += 1) {
      camelCaseStr += capitalize({ string: splitted[i], first: true });
    }
  }

  return camelCaseStr;
};

module.exports = Object.freeze({
  capitalize,
  camelCase,
});
