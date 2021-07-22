import * as React from 'react';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { Text } from 'react-native';

export function LogoText({style}) {
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
      <Text style={style}>
        eleckter
      </Text>
    )
  }

  return (
    <Text style={[style, { fontFamily: 'open-sans', color: "#fff"}]} >
      dovoli
    </Text>
  )
}