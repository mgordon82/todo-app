export const formatDateTime = (dateTimeString) => {
  return new Date(dateTimeString).toLocaleString(undefined, {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
