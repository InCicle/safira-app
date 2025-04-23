export function checkLetters(letters: string, len: number) {
  let value = '';

  if (letters?.length > len) {
    for (let idx = 0; idx < len; idx++) {
      value += letters[idx];
    }

    return `${value.trim()}...`;
  }

  return letters;
}

export default function maxLetters(str: string, pixels: number) {
  return checkLetters(str, Math.round((pixels * 12) / 100));
}
