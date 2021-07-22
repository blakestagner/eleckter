import {View, Text} from 'react-native';
import React from 'react';
import TopNavigation from '../navigation/TopNavigation';

export default function Settings({navigation}) {

    return (
        <View>
            <TopNavigation navigation={navigation}/>
            <Text>Settings</Text>
        </View>
    )
}