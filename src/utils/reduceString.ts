export const reduceString = (value = '', length: number) => {
  /**
   * This function is used to add '...' on strings.
   *
   * params:
   *  value: the string to reduce
   *  length: number of max characters for the string
   *
   * return: string reduced
   */
  if (value?.length <= length) return value;
  return `${value.slice(0, length - 3)}...`;
};
