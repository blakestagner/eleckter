import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from 'react-native';
import YardSignScreen from './assets/YardSignScreen';
import FundsScreen from './assets/FundsScreen';
import { MaterialIcons } from '@expo/vector-icons';
import TopNavigation from '../navigation/TopNavigation';
import {colorSecondary, colorMain} from '../components/Theme';

const Tab = createMaterialTopTabNavigator();

export default function AssetsScreen() {

  return (
    <>
    <TopNavigation/>
    <Tab.Navigator
      tabBarOptions={{
        showIcon: true,
        tabStyle: {
          display: 'flex',
          flexDirection: 'row',
        },
        style: {
          backgroundColor: colorMain
        },
        activeTintColor: "#fff",
        inactiveTintColor: '#B8B8B8',
        indicatorStyle: {
          backgroundColor: colorSecondary,
        }
      }}>
      <Tab.Screen 
        name="Yard Sign" 
        component={YardSignScreen}
        navigationOptions={{
          tabBarIcon: {
            tintColor: "#3f51b5"
          }
        }}
        options={{
          tabBarIcon: ({color}) => <MaterialIcons name="flag" size={24} color={color} />
        }} />
        {console.log(colorMain)}
      <Tab.Screen 
        name="Funds" 
        component={FundsScreen} 
        options={{
          tabBarIcon: ({color}) => <MaterialIcons name="attach-money" size={24} color={color} />,
        }} />
    </Tab.Navigator>
    </>
  )

}



const styles = StyleSheet.create({

});
