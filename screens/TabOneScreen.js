import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../components/context/Context';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { UserContext } from '../components/context/UserContext';
import TopNavigation from '../navigation/TopNavigation';

export default function TabOneScreen({navigation}) {

  const user = useContext(UserContext)

  if(!user.currentCampaign) {
    return (
      <Text>Loading</Text>
    )
  }

  return (
    <View>
      <TopNavigation navitation={navigation}/>
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        <Text>{user.user.fname} {user.user.lname}</Text>
        <Text>{user.user.email}</Text>
        <Text>{user.user.campaign}</Text>
        <Text>{user.user.position}</Text>
        <Text>{user.currentCampaign.name}</Text>
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
