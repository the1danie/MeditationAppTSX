import React, { useState } from 'react';
import { styled } from 'nativewind';
import Home from "./src/screens/Home.tsx";
import Splash from "./src/screens/Splash.tsx";
import Splash2 from './src/screens/Splash_Second.tsx';

const App = () => {
  const [screen, setScreen] = useState(1); // 1 для Splash, 2 для Splash2, 3 для Home

  return (
    <>
      {screen === 1 && <Splash setScreen={setScreen} />}
      {screen === 2 && <Splash2 setScreen={setScreen} />}
      {screen === 3 && <Home />}
    </>
  );
};

export default App;
