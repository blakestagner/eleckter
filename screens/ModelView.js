import React, { useState } from 'react';

import { 
        View, 
        Text, 
        StyleSheet, 
        Pressable, 
        Modal, 
        Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import {LinearGradient} from 'expo-linear-gradient';




export default function modelView() {
    const [modalVisible, setModalVisible] = useState(false);


    

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <View>
            <Pressable 
              onPress={() => { setModalVisible(true) }}
              style={[styles.uploadButton, styles.upload]}>
                  <MaterialIcons name="cloud-upload" size={24} color="white" />
            </Pressable>
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                style={styles.modal}>
                <View style={styles.centeredView }>
                    <View style={{
                        ...styles.modalContent, 
                        width: windowWidth,
                        height: windowHeight - 20
                        }}>
                        <LinearGradient 
                            start={[0, 1]}
                            end={[1, 0]}
                            locations={[0, 0.5, 1]}
                            colors={[ "#2b86c5", "#3f51b5", "#784ba0"]} 
                            >
                        <View
                            style={{
                                ...styles.header, 
                                width: windowWidth,
                                }}>
                            <Pressable
                                onPress={() => {setModalVisible(!modalVisible)} }>
                                <MaterialIcons
                                    style={styles.icon} 
                                    name="arrow-back" 
                                    size={42} 
                                    color="white" />
                            </Pressable>
                            <Text
                                style={styles.headerText}>

                            </Text>
                        </View>
                        </LinearGradient>
                        <View 
                            style={styles.content}>
                            {children}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    
    profileImg: {
        backgroundColor: "#784ba0",
        height: 150,
        width: 150,
        borderRadius: 75,
    }, 
    row: {
        flexDirection: 'row'
    },
    header: {

        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        color: '#fff'
    },
    icon: {
        padding: 15
    },  
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22
      },
    modalContent: {
        alignItems: 'center',
        backgroundColor: '#191919',
    },
    content: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#3f51b5',
        borderRadius: 50,
        padding: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }
  });

