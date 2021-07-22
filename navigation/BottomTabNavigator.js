/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, {useContext} from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import AssetsScreen from '../screens/AssetsScreen';
import Messages from '../screens/Messages';
import Profile from '../screens/Profile';
import { MaterialIcons } from '@expo/vector-icons';
import TopNavigation from './TopNavigation';
import { UserContext } from '../components/context/UserContext';
import ProfilePictureSmall from '../components/Profile/ProfilePictureSmall';
import SearchScreen from '../screens/SearchScreen';
const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({navigation}) {
  const colorScheme = useColorScheme();
  const user = useContext(UserContext)

  return (
    <>
      <BottomTab.Navigator
        initialRouteName="Home"
        barStyle={{ backgroundColor: '#ffff' }}
        tabBarOptions={
            { 
              activeTintColor: '#fff',
              inactiveTintColor: '#B8B8B8',
              style: { backgroundColor: '#0277BD' },
            }
          }
        >
        <BottomTab.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        {  
          user.campaign ?
            <BottomTab.Screen
              name="Campaign"
              component={AssetsScreen}
              options={{
                tabBarIcon: ({ color }) => <TabBarIcon name="people-alt" color={color} />,
              }}
            /> : null
        }
        
        <BottomTab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={ProfileNavigator}
          options={{
            tabBarIcon: ({ color }) => <ProfilePictureSmall 
              imgUri={user.user.img} 
              color={color} 
              style={{ marginBottom: -3 }} 
              />,
          }}
        />
      </BottomTab.Navigator>
    </>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon({name, color}) {
  return (
    <MaterialIcons 
        size={32} 
        style={{ marginBottom: -3 }} 
        name={name} 
        color={color}
    />
  )
}
// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={TabOneScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}

