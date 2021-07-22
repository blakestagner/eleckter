import React from "react";
import {  StyleSheet, Image, } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfilePictureSmall({imgUri, style, color}) {

    return (
      <>
            { imgUri ?
                  <Image
                      style={{...styles.image, ...style}}
                      source={{
                        uri: `${imgUri}`,
                      }}
                  /> :
                <MaterialIcons style={style} name="person" size={32} color={color} />
            }
          </>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 32,
        width: 32,
        borderRadius: 16,
    },
})