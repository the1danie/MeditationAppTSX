import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const Home = (): JSX.Element => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <StyledView className={'flex-1 justify-center items-center m-0'}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <StyledText className={'font-montserratBold'}>Hello Home</StyledText>
      </Animated.View>
    </StyledView>
  );
};

export default Home;
