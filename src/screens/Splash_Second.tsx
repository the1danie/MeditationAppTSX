import React, { useEffect, useRef, useState } from "react";
import { Animated, View, Text, StyleSheet } from "react-native";
import LottieView from 'lottie-react-native';
import { styled } from "nativewind";
import quotes from '../../assets/sortedQuotes.json'; // Импортируем из файла

const StyledView = styled(View);
const StyledLottieView = styled(LottieView);
const StyledText = styled(Text);

interface Splash2Props {
  setScreen: (screen: number) => void;
}

const Splash2 = ({ setScreen }: Splash2Props): JSX.Element => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [quote, setQuote] = useState<{ text: string, author: string } | null>(null);

  useEffect(() => {
    const getRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex];
    };

    // Select a new random quote each time the component mounts
    setQuote(getRandomQuote());
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 0,
      useNativeDriver: false,
    }).start();

    // Transition to the Home screen after 6 seconds
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setScreen(3); // Transition to Home screen
      });
    }, 6000);

    return () => clearTimeout(timer);
  }, [fadeAnim, setScreen]);

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <StyledView className={'flex-1 align-center justify-center m-0'}>
        <StyledLottieView
          className={'flex-1'}
          source={require('../../assets/loading_new.json')}
          autoPlay
          loop={false}
          resizeMode={'cover'}
        />
        <View style={styles.quoteBlock}>
          <StyledView className={'flex justify-center items-center'} style={styles.quoteContainer}>
            {quote ? (
              <>
                <StyledText className={'font-montserratThin text-[14px] text-white font-normal'}>
                  {quote.text}
                </StyledText>
                {quote.author ? (
                  <StyledText className={'font-montserratThin text-[16px] text-white font-bold'}>
                    {quote.author}
                  </StyledText>
                ) : null}
              </>
            ) : null}
          </StyledView>
        </View>
      </StyledView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  quoteBlock: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent background for better readability
    padding: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  quoteContainer: {
    alignItems: 'center',
  },
});

export default Splash2;
