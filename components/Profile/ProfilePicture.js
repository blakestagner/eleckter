import React from "react";
import {  StyleSheet, Image, } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfilePicture({imgUrl}) {

    return (
          <>
            { imgUrl ?
                  <Image
                      style={styles.image}
                      source={{
                        uri: `${imgUrl}`,
                      }}
                  /> :
                <MaterialIcons name="person" size={100} color="white" />
            }
          </>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },
})