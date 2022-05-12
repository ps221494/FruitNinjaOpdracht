import React, { useRef, useEffect } from 'react';
import { Text, SafeAreaView, View, ImageBackground, Animated, Dimensions, Easing } from 'react-native';
import tw from 'tailwind-react-native-classnames';

export default function App() {
  const moveValue = useRef(new Animated.ValueXY()).current;
  const spinValue = new Animated.Value(0);

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  function getScreenValue() {
    const fullWidth = Dimensions.get('window').width - 70;
    const fullHeight = Dimensions.get('window').height - 70;

    setWidth(fullWidth / 2);
    setHeight(fullHeight / 2);

    console.log(fullWidth / 2);
  }

  function generateX() {
    let number = Math.floor(Math.random() * (Dimensions.get('window').width - 70));
    if (moveValue.x === number) number = Math.floor(Math.random() * (Dimensions.get('window').width - 70));
    return number;
  }

  function generateY() {
    let number = Math.floor(Math.random() * (Dimensions.get('window').height - 70));
    if (moveValue.y === number) number = Math.floor(Math.random() * (Dimensions.get('window').height - 70));
    return number;
  }

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  useEffect(() => {
    getScreenValue();
    // Animated.timing(
    //   spinValue,
    //   {
    //     toValue: 1,
    //     duration: 3000,
    //     easing: Easing.linear,
    //   }
    // ).start()

    // function cycleAnimation() {
    //   Animated.sequence([
    //     Animated.timing(moveValue, {
    //       toValue: { x: generateX(), y: generateY() },
    //       duration: 500,
    //       ease: Easing.ease,
    //       delay: 0
    //     }),
    //     Animated.timing(moveValue, {
    //       toValue: { x: generateX(), y: generateY() },
    //       duration: 500,
    //       ease: Easing.ease,
    //       delay: 0
    //     })
    //   ]).start(() => {
    //     cycleAnimation();
    //   });
    // }

    // function cycleRotation() {
    //   Animated.sequence([
    //     Animated.timing(
    //       spinValue,
    //       {
    //         toValue: 1,
    //         duration: 3000,
    //         easing: Easing.linear,
    //       }
    //     ),
    //     Animated.timing(
    //       spinValue,
    //       {
    //         toValue: 0,
    //         duration: 1,
    //         easing: Easing.linear,
    //       }
    //     )
    //   ]).start(() => {
    //     cycleRotation();
    //   });
    // }

    // cycleRotation();
    // cycleAnimation();
  }, []);

  return (
    <SafeAreaView style={tw.style('flex-1 bg-black')}>
      <ImageBackground source={require('./assets/background.jpg')} resizeMode="cover" style={tw.style('opacity-90 w-full h-full')}>
        <Text style={tw.style('text-red-500 text-xl')}>Hello</Text>
        <Animated.View
          style={[
            {
              transform: [{ rotate: spin }],
              backgroundColor: "#61dafb",
              width: 80,
              height: 80,
              borderRadius: 4,
            },
            moveValue.getLayout(),
          ]}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
