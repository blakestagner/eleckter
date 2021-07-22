import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../components/context/Context';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { UserContext } from '../components/context/UserContext';
import TopNavigation from '../navigation/TopNavigation';

export default function Messages({navigation}) {

  const user = useContext(UserContext)


  return (
    <View>
      <TopNavigation />
      <View style={styles.container}>
        <Text style={styles.title}>Message</Text>
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
