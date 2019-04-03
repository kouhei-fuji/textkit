import * as R from 'ramda';

import font from '../internal/font';
import resolveYOffset from '../../src/core/resolveYOffset';

const instance = resolveYOffset();

describe('resolveYOffset', () => {
  test('should return no attributed strings if none provided', () => {
    const result = instance([]);
    expect(result).toEqual([]);
  });

  test('should return same string if no attributes present', () => {
    const string = {
      string: 'Lorem',
      runs: [
        {
          start: 0,
          end: 5,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
            { id: 114, codePoints: [114] }, // r
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] } // m
          ],
          positions: [
            { xAdvance: 8 }, // l
            { xAdvance: 7 }, // o
            { xAdvance: 6 }, // r
            { xAdvance: 5 }, // e
            { xAdvance: 4 } // m
          ],
          glyphIndices: [0, 1, 2, 3, 4]
        }
      ]
    };
    const result = instance([string]);

    expect(result).toHaveLength(1);
    expect(result[0]).not.toBe(string);
    expect(result[0]).toEqual(string);
  });

  test('should return same string if no yOffset present', () => {
    const string = {
      string: 'Lorem',
      runs: [
        {
          start: 0,
          end: 5,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
            { id: 114, codePoints: [114] }, // r
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] } // m
          ],
          positions: [
            { xAdvance: 8 }, // l
            { xAdvance: 7 }, // o
            { xAdvance: 6 }, // r
            { xAdvance: 5 }, // e
            { xAdvance: 4 } // m
          ],
          glyphIndices: [0, 1, 2, 3, 4],
          attributes: { something: 'blah' }
        }
      ]
    };
    const result = instance([string]);

    expect(result).toHaveLength(1);
    expect(result[0]).not.toBe(string);
    expect(result[0]).toEqual(string);
  });

  test('should return same string if no font present', () => {
    const string = {
      string: 'Lorem',
      runs: [
        {
          start: 0,
          end: 5,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
            { id: 114, codePoints: [114] }, // r
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] } // m
          ],
          positions: [
            { xAdvance: 8 }, // l
            { xAdvance: 7 }, // o
            { xAdvance: 6 }, // r
            { xAdvance: 5 }, // e
            { xAdvance: 4 } // m
          ],
          glyphIndices: [0, 1, 2, 3, 4],
          attributes: { yOffset: 20 }
        }
      ]
    };
    const result = instance([string]);

    expect(result).toHaveLength(1);
    expect(result[0]).not.toBe(string);
    expect(result[0]).toEqual(string);
  });

  test('should return same string if no positions present', () => {
    const string = {
      string: 'Lorem',
      runs: [
        {
          start: 0,
          end: 5,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
            { id: 114, codePoints: [114] }, // r
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] } // m
          ],
          glyphIndices: [0, 1, 2, 3, 4],
          attributes: { yOffset: 20, font }
        }
      ]
    };
    const result = instance([string]);

    expect(result).toHaveLength(1);
    expect(result[0]).not.toBe(string);
    expect(result[0]).toEqual(string);
  });

  test('should not mutate passed string', () => {
    const string = {
      string: `Lorem`,
      runs: [
        {
          start: 0,
          end: 5,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
            { id: 114, codePoints: [114] }, // r
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] } // m
          ],
          positions: [
            { xAdvance: 8 }, // l
            { xAdvance: 7 }, // o
            { xAdvance: 6 }, // r
            { xAdvance: 5 }, // e
            { xAdvance: 4 } // m
          ],
          glyphIndices: [0, 1, 2, 3, 4],
          attributes: { yOffset: 20, font }
        }
      ]
    };

    instance([string]);

    expect(string.runs[0].glyphIndices).toEqual([0, 1, 2, 3, 4]);
    expect(R.pluck('id', string.runs[0].glyphs)).toEqual([76, 111, 114, 101, 109]);
    expect(R.pluck('xAdvance', string.runs[0].positions)).toEqual([8, 7, 6, 5, 4]);
  });

  test('should change glyph positions appropiately', () => {
    const string = {
      string: `Lorem`,
      runs: [
        {
          start: 0,
          end: 5,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
            { id: 114, codePoints: [114] }, // r
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] } // m
          ],
          positions: [
            { xAdvance: 8 }, // l
            { xAdvance: 7 }, // o
            { xAdvance: 6 }, // r
            { xAdvance: 5 }, // e
            { xAdvance: 4 } // m
          ],
          glyphIndices: [0, 1, 2, 3, 4],
          attributes: { yOffset: 20, font }
        }
      ]
    };
    const result = instance([string]);

    expect(result).toHaveLength(1);
    expect(result[0].runs[0].glyphIndices).toEqual([0, 1, 2, 3, 4]);
    expect(R.pluck('id', result[0].runs[0].glyphs)).toEqual([76, 111, 114, 101, 109]);
    expect(R.pluck('xAdvance', result[0].runs[0].positions)).toEqual([8, 7, 6, 5, 4]);
    expect(R.pluck('yOffset', result[0].runs[0].positions)).toEqual([40, 40, 40, 40, 40]); // yOffset * font.unitsPerEm
  });
});
