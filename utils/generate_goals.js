import AsyncStorage from '@react-native-async-storage/async-storage';
import {generatePages} from './generate_wird_pages';
const quranicTodos = [
  {
    task: 'قراءة 5 صفحات من القرأن',
    type: 'quran',
    count: 5,
  },
  {
    task: 'قراءة 3 صفحات من القرأن',
    type: 'quran',
    count: 3,
  },
  {
    task: 'قراءة 7 صفحات من القرأن',
    type: 'quran',
    count: 7,
  },
  {
    task: 'قراءة صفحتين من القرأن',
    type: 'quran',
    count: 2,
  },
];

const tasbeehTodos = [
  {
    task: 'سبح 50 تسبيحة',
    type: 'tasbeeh',
    count: 50,
  },
  {
    task: 'سبح 150 تسبيحة',
    type: 'tasbeeh',
    count: 150,
  },
  {
    task: 'سبح 100 تسبيحة',
    type: 'tasbeeh',
    count: 100,
  },
  {
    task: 'سبح 75 تسبيحة',
    type: 'tasbeeh',
    count: 75,
  },
];

export const generateGoals = async () => {
  const newGoals = [
    quranicTodos[Math.floor(Math.random() * 4)],
    tasbeehTodos[Math.floor(Math.random() * 4)],
  ];
  newProgressGoals = newGoals.map(goal => {
    return {
      ...goal,
      progress: 0,
    };
  });
  await AsyncStorage.setItem('goals', JSON.stringify(newProgressGoals));
  await generatePages();
  return newProgressGoals;
};
