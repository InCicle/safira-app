export const getGroupType = (type: string) => {
  const converted = {
    OPEN: "aberto",
    CLOSE: "fechado",
    SECRET: "secreto",
  };

  return converted[type];
};
