import React, { useRef, useEffect } from 'react';
import { Text, SafeAreaView, ImageBackground, Animated, Dimensions, Easing, Image, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

export default function App() {
  // Use state to store some values
  const [points, setPoints] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [height, setHeight] = React.useState(Dimensions.get('window').height * 0.25);

  // The values of the animations
  const moveValue = useRef(new Animated.ValueXY({
    x: 0,
    y: Dimensions.get('window').height + 70
  })).current;
  const spinValue = new Animated.Value(0);

  // Config for the spin animation
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  // Images that are used in the game
  const [image, setImage] = React.useState(
    require('./assets/1.png'),
    require('./assets/2.png'),
    require('./assets/3.png'),
    require('./assets/4.png'),
    require('./assets/5.png'),
    require('./assets/6.png'),
  );

  // Generate a random width
  function getRandomWidth() {
    return Math.floor(Math.random() * (Dimensions.get('window').width - 70));
  }

  // Function that changes the image to a random image onclick
  generateImage = () => {
    const randomImage = Math.floor(Math.random() * 6) + 1;
    setImage(randomImage);
  }

  // Function that run the animation when the game starts
  function cycleAnimation() {
    // Loop the animation
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
    ]).start(({ finished }) => {
      // Check if the animation is finished and the game is still running
      if (finished && isPlaying) {
        // Restart the animation
        cycleAnimation();
        setTimeout(() => {
          // Generate a new image
          generateImage();
        }, 1000);
      }
      else {
        // Reset the values
        moveValue.setValue({ x: 0, y: Dimensions.get('window').height + 70 });
      }
    });
  }

  // Fruit rotate function
  function cycleRotation() {
    // Loop the rotation
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
    ]).start(({ finished }) => {
      if (finished) {
        // Restart the rotation
        cycleRotation();
      }
    });
  }

  ClickedObject = () => {
    // Stop the game
    setIsPlaying(false);

    // Wait 500ms to restart the game
    setTimeout(() => {
      // Generate a new image
      generateImage();
      // Start the game again
      setIsPlaying(true);
    }, 500);
  }

  useEffect(() => {
    if (isPlaying) {
      // Restart the animation
      cycleAnimation();
    }
    else {
      // Reset the values and stop the animation
      moveValue.stopAnimation();
      moveValue.setValue({ x: 0, y: Dimensions.get('window').height + 70 });
    }
    cycleRotation();
  }, [isPlaying, cycleRotation, cycleAnimation]);

  return (
    <SafeAreaView style={tw.style('flex-1 bg-black')}>
      <ImageBackground source={require('./assets/background.jpg')} resizeMode="cover" style={tw.style('opacity-90 w-full h-full')}>
        <Text style={tw.style('text-white text-xl font-bold mt-10 ml-5')}>Score: {points}</Text>
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
          <TouchableOpacity onPress={() => {
            ClickedObject()
            // Adds 1 to the score
            setPoints(points + 1)
          }}>

            <Image source={image} style={tw.style('')} />
          </TouchableOpacity>
        </Animated.View>
      </ImageBackground>
    </SafeAreaView>
  );
}
