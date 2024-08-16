import React, { useState } from 'react';
import { styled } from 'nativewind';
import Home from "./src/screens/Home.tsx";
import Splash from "./src/screens/Splash.tsx";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    isLoading ? <Splash setIsLoading={setIsLoading}/> : <Home/>
  );
};

export default App;
