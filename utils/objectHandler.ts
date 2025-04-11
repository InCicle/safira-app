type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

export type ReturnOnly<OBJ, KeyName extends keyof OBJ> = {
  [K in KeyName]: OBJ[KeyName];
};

export function pickItems<T extends any, K extends keyof T>(data: T, keys: K[]) {
  const ref = {
    original: data,
    current: {} as Nullable<T>,
  };

  keys.forEach(key => {
    const value = ref.original[key] || null;

    ref.current[key] = value;
  });

  return ref.current as ReturnOnly<T, K>;
}
