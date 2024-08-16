import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Animated, View, Text, StyleSheet } from "react-native";
import LottieView from 'lottie-react-native';
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledLottieView = styled(LottieView);
const StyledText = styled(Text);

interface SplashProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const Splash = ({ setIsLoading }: SplashProps): JSX.Element => {
  const [fadeAnim] = useState(new Animated.Value(1));
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();

    if (hours < 12) {
      setGreeting('Доброе утро!');
    } else if (hours < 20) {
      setGreeting("Хорошего дня!");
    } else {
      setGreeting('Спокойной ночи');
    }

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setIsLoading(false);
      });
    }, 6000);

    return () => clearTimeout(timer);
  }, [fadeAnim, setIsLoading]);

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <StyledView className={'flex-1 align-center justify-center m-0'}>
        <StyledLottieView
          className={'flex-1'}
          source={require('../assets/Flow 1 (1).json')}
          autoPlay
          loop={false}
          resizeMode={'cover'}
        />
        <StyledView className={'flex justify-center items-center'} style={styles.overlay}>
          <StyledText className={'font-montserratThin text-[27px] text-white font-normal'}>{greeting}</StyledText>
        </StyledView>
      </StyledView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Splash;
