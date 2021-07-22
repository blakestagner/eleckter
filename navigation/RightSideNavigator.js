import { createDrawerNavigator } from "@react-navigation/drawer";
import React, {useContext} from "react";
import BottomTabNavigator from "./BottomTabNavigator";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { DrawerItemList, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AuthContext } from "../components/context/Context";
import Settings from "../screens/Settings";
import Messages from "../screens/Messages";
import Notifications from "../screens/NotificationsScree";

const Drawer = createDrawerNavigator()
//<Button
//onPress={() => navigation.navigate('Notifications')}
//title="Go to notifications"/>



export default function RightSideNavigator({navigation}) {
  const {signOut} = useContext(AuthContext)
  

  const handleLogout = () => {
    signOut()
  }
  
  return (
        <Drawer.Navigator
            style={styles.container}
            drawerPosition="right"
            initialRouteName="Home"
            drawerContent={(props) => {
              return (
                <DrawerContentScrollView 
                    contentContainerStyle={styles.container} 
                    {...props}>
                    <View>
                        <DrawerItemList {...props} />
                    </View>
                    <DrawerItem
                      labelStyle={{color: 'red'}}
                      style={styles.logout}
                      label="logout"
                      onPress={() => handleLogout()}
                    />
                    
                </DrawerContentScrollView>
              );
            }}>
            <Drawer.Screen 
              name="Home"
              navigation={navigation}
              component={BottomTabNavigator} />
            <Drawer.Screen name="Messages" component={Messages} />
            <Drawer.Screen name="Notifications" component={Notifications} />
            <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  logout: {
    color: 'green',
    justifyContent: 'flex-end',
  }
});