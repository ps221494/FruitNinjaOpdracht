import React, { useRef, useEffect } from 'react';
import { Text, SafeAreaView, View, ImageBackground, Animated, Dimensions, Easing, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';

export default function App() {
  const moveValue = useRef(new Animated.ValueXY({
    x: 0,
    y: Dimensions.get('window').height + 70
  })).current;
  const spinValue = new Animated.Value(0);

  const [height, setHeight] = React.useState(Dimensions.get('window').height * 0.25);
  const [image, setImage] = React.useState('https://i.pinimg.com/originals/4a/bb/5a/4abb5afb6d042b709dfb53ea108d52a2.png');

  let images = ['https://i.pinimg.com/originals/4a/bb/5a/4abb5afb6d042b709dfb53ea108d52a2.png', 'https://freepikpsd.com/file/2019/10/banana-cartoon-png-Images-PNG-Transparent.png']

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  function getRandomWidth() {
    return Math.floor(Math.random() * (Dimensions.get('window').width - 70));
  }

  useEffect(() => {
    function cycleAnimation() {
      let width = getRandomWidth();
      console.log(width)
      Animated.sequence([
        Animated.timing(moveValue, {
          toValue: { x: getRandomWidth(), y: Dimensions.get('window').height + 70 },
          duration: 1000,
          ease: Easing.ease,
          delay: 0,
          useNativeDriver: false
        }),
        Animated.timing(moveValue, {
          toValue: { x: getRandomWidth(), y: height },
          duration: 1000,
          ease: Easing.ease,
          delay: 0,
          useNativeDriver: false
        })
      ]).start(() => {
        cycleAnimation();
      });
    }

    function cycleRotation() {
      Animated.sequence([
        Animated.timing(
          spinValue,
          {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: false
          }
        ),
        Animated.timing(
          spinValue,
          {
            toValue: 0,
            duration: 1,
            easing: Easing.linear,
            useNativeDriver: false
          }
        )
      ]).start(() => {
        cycleRotation();
      });
    }

    function generateImage() {
      let randomNumber = Math.floor(Math.random() * images.length);
      setImage(images[randomNumber]);
    }

    cycleRotation();
    cycleAnimation();
  }, []);

  return (
    <SafeAreaView style={tw.style('flex-1 bg-black')}>
      <ImageBackground source={require('./assets/background.jpg')} resizeMode="cover" style={tw.style('opacity-90 w-full h-full')}>
        <Text style={tw.style('text-red-500 text-xl')}>Hello</Text>
        <Animated.View
          style={[
            {
              transform: [{ rotate: spin }],
              marginLeft: 10,
              width: 100,
              height: 100,
            },
            moveValue.getLayout(),
          ]}
        >
          <Image source={{
            uri: image,
          }} style={tw.style('w-full h-full')} />
        </Animated.View>
      </ImageBackground>
    </SafeAreaView>
  );
}
