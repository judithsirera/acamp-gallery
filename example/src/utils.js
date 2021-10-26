export const TOTAL_IMAGES = 13;

export const getImage = (index) => {
  const id = index % TOTAL_IMAGES;
  return `${process.env.PUBLIC_URL}/images/image${id}.jpg`;
};
