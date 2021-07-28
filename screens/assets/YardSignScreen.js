import React, { useState, useEffect, useContext } from 'react';
import { Text, View, ScrollView, Dimensions, StyleSheet, Pressable, Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { colorSecondary, colorMainDark } from '../../components/Theme';
import { UserContext } from '../../components/context/UserContext';
import { getYardSigns } from '../../db/Repository';

export default function YardSignScreen() {

  return (
    <ScrollView style={styles.container}>
      <Map />
      <View style={styles.content}>
      </View>
    </ScrollView>
  );
}
  
function Map() {
  const [currentLocation, setCurrentLocation] = useState(
    {
      latitude: 47.2476383,
      longitude: -121.4640483,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  );
  const [loading, setLoading] = useState(true)
  const [pins, setPins] = useState(null)

  const user = useContext(UserContext)

  useEffect(() => {
    const findCoordinates = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        ...currentLocation,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
      })
      setLoading(false)
    };
    findCoordinates()
  }, [])


  useEffect(() => {
    
    if(user.currentCampaign && !loading) {
      getYardSigns(user.currentCampaign.id)
      .then(res => {
        setPins(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
    console.log('doing')
  }, [user.currentCampaign && loading])

  const placeSign = async () => {
    let location = await Location.getCurrentPositionAsync({});
    console.log(location.coords.latitude, location.coords.longitude)
    
  }


  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={currentLocation}
        showsUserLocation={true}
        //onRegionChangeComplete={onRegionChange}
        >
        { pins ? <Pins pins={pins}/> : null }
      </MapView>
      <View 
        style={styles.actionContainer}>
        <Pressable 
            android_ripple={{
              color: '#fff',
              borderless: false
            }}
            style={({ pressed }) => [
              {
                elevation: pressed
                  ? 1
                  : 3
              },
              styles.button, styles.primary
            ]}
            onPress={() => placeSign()}>
            <Text style={styles.buttonText}>Place Sign</Text>
        </Pressable>
        <Pressable 
          android_ripple={{
            color: '#fff',
            borderless: false
          }}
          style={({ pressed }) => [
            {
              elevation: pressed
                ? 1
                : 3
            },
            styles.button, styles.secondary
          ]}
          onPress={() => placeSign()}>
          <Text 
            style={styles.buttonText}>
            Place Yard Sign
          </Text>
        </Pressable>
      </View>
    </View> 
  )
}

function Pins({pins}) {

  return (
    <>
    { 
      pins.map((pin, i) => 
        <Marker
          title={`${pin.created}`}
          description={`pin-${i}`}
          key={`yard-sign-${pin.created}`}
          pinColor={'red'}
          coordinate={{
            latitude: pin.latitude,
            longitude: pin.longitude,
          }}
        />
      )
    }
    </>
  )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      alignItems: 'center'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    map: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height / 3,
      marginBottom: 10 
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    actionContainer: {
      flexDirection: 'row',
      marginHorizontal: 10,
      justifyContent: 'space-around'
    },
    button: {
      width: "45%",
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      backgroundColor: 'black',
      overflow: 'hidden'

    },
    buttonText: {
      padding: 8,
      fontSize: 18,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    primary: {
      backgroundColor: colorMainDark
    },
    secondary: {
      backgroundColor: colorSecondary
    }
  });