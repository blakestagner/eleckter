import * as React from 'react';
import { useEffect } from 'react';
import * as Font from 'expo-font';

import { Text, TextProps } from './Themed';
import { useState } from 'react';

export function HeaderText(props: TextProps) {
  const [fontLoaded, setFontLoaded] = useState(false)
  
  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        'open-sans': require('../assets/fonts/PaytoneOne.ttf'),
      });
      setFontLoaded(true);
      console.log('loaded')
    })()
  }, [])

  if(!fontLoaded) {
    return (
      <Text {...props} style={[props.style]} />
    )
  }

  return (
    <Text {...props} style={[props.style, { fontFamily: 'open-sans'}]} />
  )
}
