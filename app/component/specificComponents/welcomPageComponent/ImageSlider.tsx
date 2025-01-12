import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, ScrollView, Animated } from 'react-native';


interface ImageSliderProps {
  onChange: (slideIndex: number) => void;
  currentSlide: number;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ onChange, currentSlide }) => {
  const images = [
    require('../../../../assets/image/slider3.png'),
    require('../../../../assets/image/slider3.png'),
    require('../../../../assets/image/slider3.png'),
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const slideIndex = Math.floor(
            event.nativeEvent.contentOffset.x / Dimensions.get('window').width
          );
          onChange(slideIndex);
        }}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <Image key={index} source={image} style={styles.image} />
        ))}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.indicator,
              {
                backgroundColor: currentSlide === index ? 'black' : 'transparent',
                borderColor: 'black',
                width: currentSlide === index ? 15 : 8,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

 

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 420,
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: Dimensions.get('window').width,
    height: 220,
    resizeMode: 'cover',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    height: 8,
    marginHorizontal: 3,
    borderRadius: 10,
    borderWidth: 1,
  },
});
