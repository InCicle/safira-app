export const getStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    PENDING: "Pendente",
    IN_PROGRESS: "Em Andamento",
    COMPLETED: "Concluído",
    ARCHIVED: "Arquivado",
  };
  return statusMap[status.toUpperCase()] || status;
};