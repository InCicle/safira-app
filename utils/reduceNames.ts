export const reduceSenderName = (value = '', length: number = 20) => {
  /**
   * This function is used to reduce the name of the sender.
   *
   * params:
   *  value: the name to reduce
   *  length: number of max characters for the string
   *
   * return: string reduced
   */

  // if the name has less than length characters, return the name
  if (value?.length <= length) return value;
  // if just the first name has more than length characters, reduce the name
  const noSpaceName = value.split(' ');
  let name = noSpaceName.shift() || '';
  if (name.length > length) return `${name.slice(0, length)}`;
  // else, while name has less than length characters, add the next name
  while (name.length < length) {
    name += ' ' + noSpaceName.shift();
  }
  return `${name}`;
};
