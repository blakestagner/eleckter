import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Dimensions, StyleSheet, PermissionsAndroid } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

export default function YardSignScreen() {
  const [currentLocation, setCurrentLocation] = useState(
    { 
      latitude: null, 
      longitude: null
    }
  );

  /*const androidLocationPermission = async () => {
    const hasLocationPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if(hasLocationPermission) {
      setLocationPermission(true)
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message:
              "Dovoli needs access to your Location",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the Location");
        } else {
          console.log("Location permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }*/

  return (
    <ScrollView style={styles.container}>
      <Map />
      <View style={styles.content}>
        <Text>TEXTss</Text>
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
  const [pins, setPins] = useState([
    { latitude: 37.78825, longitude: -122.4324},
    { latitude: 37.78925, longitude: -122.4534}
  ])

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
    };
    findCoordinates()
  }, [])

  const onRegionChange = (region) => {
    setCurrentLocation(
      { 
        region 
      }
    );
  }


  return (
    <MapView
      style={styles.map}
      region={
        currentLocation.latitude && currentLocation.longitude ? 
        currentLocation : null }
      onRegionChange={() => onRegionChange()}
      >
      <Pins pins={pins}/>
      </MapView> 
  )
}

function Pins({pins}) {

  return (
    <>
    { 
      pins.map(pin => 
        <Marker
          key={pin.latitude + pin.longitude}
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
  });