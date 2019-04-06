import unicode from 'unicode-properties';

import empty from '../attributedString/empty';

const ignoredScripts = ['Common', 'Inherited', 'Unknown'];

/**
 * ResolvesUnicode script in runs, grouping equal runs together
 *
 * @param  {Object}  attributed string
 * @return {Object} attributed string
 */
const scriptItemizer = ({ string }) => {
  let lastScript = 'Unknown';
  let lastIndex = 0;
  let index = 0;
  const res = [];

  if (!string) return empty();

  for (const char of string) {
    const codePoint = char.codePointAt();
    const script = unicode.getScript(codePoint);

    if (script !== lastScript && !ignoredScripts.includes(script)) {
      if (lastScript !== 'Unknown') {
        res.push({ start: lastIndex, end: index, attributes: { script: lastScript } });
      }

      lastIndex = index;
      lastScript = script;
    }

    index += char.length;
  }

  if (lastIndex < string.length) {
    res.push({ start: lastIndex, end: string.length, attributes: { script: lastScript } });
  }

  return { string, runs: res };
};

export default scriptItemizer;