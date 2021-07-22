import React, { useContext, useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput,
  StyleSheet, 
  Pressable, 
  Platform, 
  Dimensions, 
  StatusBar } from 'react-native';
import { UserContext } from '../components/context/UserContext';
import { MaterialIcons } from '@expo/vector-icons'; 


const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 30 : 30;

export default function SearchScreen({navigation}) {
  const [searchTerm, setSearchTerm] = useState("")
  const user = useContext(UserContext)

  const handleSearch = (val) => {
    setSearchTerm(val)
  }

  useEffect(() => {
    console.log(searchTerm)
  }, [searchTerm])


  if(!user.currentCampaign) {
    return (
      <Text>Loading</Text>
    )
  }

  return (
    <View>
      <View style={styles.navContainer}>
        <View style={styles.statusBar}>
            <StatusBar/>
        </View>
        <View style={styles.topNav}>
          <View style={styles.inputParent}>
          <TextInput
              placeholder="Search"
              autoCapitalize="none"
              onChangeText={(val) => handleSearch(val)}
              style={styles.input}/>
              <MaterialIcons 
                  size={26} 
                  style={{paddingHorizontal: 10}} 
                  name="search"
                  color="grey"
              />
          </View>
          <Pressable
              onPress={() => navigation.openDrawer()}>
              <MaterialIcons name="menu" size={32} color="#fff" />
          </Pressable>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Search</Text>
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
  navContainer: {
    height: 70,
    flexDirection: 'column',
    backgroundColor: '#0277BD',
  },
  statusBar: {
      height: STATUSBAR_HEIGHT,
  },
  topNav: {
      height: 50,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10
    },
  inputParent: {
      flexDirection: 'row',
      borderColor: '#aaaaaa',
      borderWidth: 1,
      borderRadius: 15,
      backgroundColor: '#fff'
  },
  input: {
      width: Dimensions.get("window").width * 0.6,
      paddingHorizontal: 10,
  },
});
