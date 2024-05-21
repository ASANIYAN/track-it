const getRandomRgbaColor = (opacity = 1) => {
  const getRandomValue = () => Math.floor(Math.random() * 256);
  const r = getRandomValue();
  const g = getRandomValue();
  const b = getRandomValue();
  const a = Math.min(Math.max(opacity, 0), 1); // Ensure opacity is between 0 and 1
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export default getRandomRgbaColor;
