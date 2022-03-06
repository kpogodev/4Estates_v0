export const convertImages = (files) => {
  let data = [];

  [...files].forEach((file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => (data = [...data, reader.result]);
  });

  return data;
};
