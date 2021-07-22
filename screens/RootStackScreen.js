import { View, Text } from "react-native";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "./SignInScreen";

export default function RootStackScreen() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    )
}
const Stack = createStackNavigator();

function RootNavigator() {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
        </Stack.Navigator>
    );

}