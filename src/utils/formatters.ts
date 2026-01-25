interface Offsets {
  upper: number;
  lower: number;
}

type FormatterFn = (text: string) => string;

interface FormatterMap {
  bold: FormatterFn;
  italic: FormatterFn;
  boldItalic: FormatterFn;
  mono: FormatterFn;
}

const getChars = (text: string) => [...text];

export const clearFormatting = (text: string): string => {
  return getChars(text)
    .map((char) => {
      const code = char.codePointAt(0);
      if (!code) return char;

      if (code >= 120276 && code <= 120301)
        return String.fromCodePoint(code - 120211);
      if (code >= 120302 && code <= 120327)
        return String.fromCodePoint(code - 120205);

      if (code >= 120328 && code <= 120353)
        return String.fromCodePoint(code - 120263);
      if (code >= 120354 && code <= 120379)
        return String.fromCodePoint(code - 120257);

      if (code >= 120380 && code <= 120405)
        return String.fromCodePoint(code - 120315);
      if (code >= 120406 && code <= 120431)
        return String.fromCodePoint(code - 120309);

      if (code >= 120432 && code <= 120457)
        return String.fromCodePoint(code - 120367);
      if (code >= 120458 && code <= 120483)
        return String.fromCodePoint(code - 120361);

      return char;
    })
    .join("");
};

const transformText = (text: string, offsets: Offsets): string => {
  return getChars(text)
    .map((char) => {
      const code = char.codePointAt(0);
      if (!code) return char;

      if (code >= 65 && code <= 90) {
        return String.fromCodePoint(code + offsets.upper);
      }

      if (code >= 97 && code <= 122) {
        return String.fromCodePoint(code + offsets.lower);
      }

      return char;
    })
    .join("");
};

export const formatters: FormatterMap = {
  bold: (text) => transformText(text, { upper: 120211, lower: 120205 }),
  italic: (text) => transformText(text, { upper: 120263, lower: 120257 }),
  boldItalic: (text) => transformText(text, { upper: 120315, lower: 120309 }),
  mono: (text) => transformText(text, { upper: 120367, lower: 120361 }),
};
