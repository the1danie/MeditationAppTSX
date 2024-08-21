import React, { useState, useEffect, Dispatch, SetStateAction, useRef } from "react";
import { Animated, View, Text, StyleSheet } from "react-native";
import LottieView from 'lottie-react-native';
import { styled } from "nativewind";


const StyledView = styled(View);
const StyledLottieView = styled(LottieView);
const StyledText = styled(Text);

interface SplashProps {
  setScreen: Dispatch<SetStateAction<number>>;
}

const Splash = ({ setScreen }: SplashProps): JSX.Element => {
  const colorAnim = useRef(new Animated.Value(1)).current; // Start with blue color
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Determine the greeting based on the time of day
    const now = new Date();
    const hours = now.getHours();

    if (hours < 6) {
      setGreeting('Спокойной ночи'); // Good night
    } else if (hours < 12) {
      setGreeting('Доброе утро!'); // Good morning
    } else if (hours < 18) {
      setGreeting('Хорошего дня!'); // Good day
    } else {
      setGreeting('Доброй ночи!'); // Good evening
    }


    // Transition to the next screen after 6 seconds
    const timer = setTimeout(() => {
      setScreen(2); // Transition to the second Splash screen
    }, 6000);

    return () => clearTimeout(timer);
  }, [setScreen]);

  // Set the background color to blue
  const backgroundColor = '#0000ff';

  return (
    <Animated.View style={{ flex: 1, backgroundColor }}>
      <StyledView className={'flex-1 align-center justify-center m-0'}>
        <StyledLottieView
          className={'flex-1'}
          source={require('../../assets/Flow 1.json')}
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
