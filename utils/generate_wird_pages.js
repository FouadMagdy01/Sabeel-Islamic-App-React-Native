import AsyncStorage from '@react-native-async-storage/async-storage';
export const generatePages = async () => {
  let startNumber = parseInt(Math.floor(Math.random() * 600) + 1);
  const numberOfPages = parseInt(Math.floor(Math.random() * 4) + 1);
  const pages = [];
  for (let i = 0; i < numberOfPages; i++) {
    pages.push(startNumber);
    startNumber = startNumber + 1;
  }
  const images = pages.map(page => {
    const imageNum = `${(page / 1000).toFixed(3).split('.')[1]}`;
    const imageUrl = `https://mp3quran.net/api/quran_pages_arabic/${imageNum}.png`;
    return imageUrl;
  });
  await AsyncStorage.setItem('wird', JSON.stringify(images));
};
