export const dataURLtoFile = async (dataurl: string, filename: string): Promise<File> => {
  const res: Response = await fetch(dataurl);
  const blob = await res.blob();
  const file = new File([blob], filename, { type: 'image/jpg' });

  return file;
};

export const createPreviewUrl = (file: File) => {
  return URL.createObjectURL(file);
};
export const destroyPreviewUrl = (url: string) => {
  return URL.revokeObjectURL(url);
};
