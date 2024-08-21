import React, { useEffect, useRef, useState } from "react";
import { Animated, View, Text, StyleSheet } from "react-native";
import LottieView from 'lottie-react-native';
import axios from 'axios';
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledLottieView = styled(LottieView);
const StyledText = styled(Text);

interface Splash2Props {
  setScreen: (screen: number) => void;
}

const Splash2 = ({ setScreen }: Splash2Props): JSX.Element => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [quote, setQuote] = useState<{ text: string, author: string } | null>(null);
  const backgroundColor = '#0000ff'; // Background color is blue

  useEffect(() => {
    // Fetch a random Russian quote from an API
    const fetchQuote = async () => {
      try {
        const response = await axios.get('https://quotes15.p.rapidapi.com/quotes/random/?language_code=ru', {
          headers: {
            'x-rapidapi-key': 'a3cf6dc5bcmsh01bdcc01191b96dp1ffb80jsnf5cc44fd7302',
            'x-rapidapi-host': 'quotes15.p.rapidapi.com'
          }
        });

        const { content, originator } = response.data;

        // Limit quote text to 15 words
        const limitWords = (text: string, maxWords: number) => {
          const words = text.split(' ');
          if (words.length > maxWords) {
            return words.slice(0, maxWords).join(' ') + '...';
          }
          return text;
        };

        setQuote({
          text: limitWords(content, 10),
          author: originator.name
        });
      } catch (error) {
        console.error('Error fetching quote:', error);
        setQuote({ text: 'Ошибка при загрузке цитаты', author: '' }); // Fallback message
      }
    };

    fetchQuote();

    // Fade-in animation for the content
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
    <Animated.View style={{ flex: 1, backgroundColor, opacity: fadeAnim }}>
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
