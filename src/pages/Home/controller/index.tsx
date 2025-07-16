import { useState } from 'react';
import { HomeView } from '../view';

export const HomeController = () => {
  const [count, setCount] = useState(0);

  return <HomeView count={count} setCount={setCount} />;
};
