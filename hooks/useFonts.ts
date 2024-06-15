import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

const useFonts = async () => {
  await Font.loadAsync({
    'Quicksand-Bold': require('../src/assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-SemiBold':require('../src/assets/fonts/Quicksand-SemiBold.ttf'),
    'Quicksand-Regular':require('../src/assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-Medium':require('../src/assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-Light':require('../src/assets/fonts/Quicksand-Light.ttf')
  });
};

export default useFonts;
