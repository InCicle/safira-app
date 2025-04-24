export const reduceSenderName = (value = '', length: number = 20) => {
  /**
   * This function is used to reduce the name of the sender(person name).
   *
   * params:
   *  value: the name to reduce
   *  length: number of max characters for the string
   *
   * return: string reduced
   */

  if (value?.length <= length) return value;
  const noSpaceName = value.split(' ');
  let name = noSpaceName.shift() || '';
  if (name.length > length) return `${name.slice(0, length)}`;
  while (name.length < length) {
    name += ' ' + noSpaceName.shift();
  }
  return `${name}`;
};
