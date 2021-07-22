import {View, Text} from 'react-native';
import React from 'react';
import TopNavigation from '../navigation/TopNavigation';

export default function Notifications({navigation}) {

    return (
        <View>
            <TopNavigation navigation={navigation}/>
            <Text>Notifications</Text>
        </View>
    )
}