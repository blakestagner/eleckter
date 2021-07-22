import React from "react";
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


export default function Button({onPress, title, icon}) {

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}>
            {icon ? 
                <MaterialIcons
                    style={styles.icon} 
                    name={icon} 
                    size={24} 
                    color="white" /> :
                null
            }
            <Text
                style={styles.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#335563',
        color: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 25,
        maxWidth: 250,
        marginTop: 25,
        flexDirection: 'row',

    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18
    },
    icon: {
        paddingRight: 10
    }
})