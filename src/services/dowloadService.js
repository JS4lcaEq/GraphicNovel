// Функция скачивания (без зависимостей)
const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Composable для Vue (возвращает функцию)
export const useDownloadService = () => {
  const downloadJSON = (jsonString, filename = 'data.json') => {
    try {
      if (typeof jsonString !== 'string') {
        throw new Error('Аргумент должен быть строкой JSON');
      }
      const blob = new Blob([jsonString], { type: 'application/json' });
      downloadBlob(blob, filename);
    } catch (error) {
      console.error('Ошибка скачивания JSON:', error);
    }
  };

  return { downloadJSON };
};