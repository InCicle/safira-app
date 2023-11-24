const rand = (min, max) => Math.round(Math.random() * (max - min) + min);
const getNumber = () => rand(0, 9);

export function hash({ amount }: { amount: number }) {
  const arr: any[] = [];

  for (let i = 0; i <= Number(amount); i++) {
    arr.push(getNumber());
  }

  return arr.slice(0, amount).join("");
}
