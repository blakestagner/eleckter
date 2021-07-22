import React, {useContext, useState, useEffect} from "react";
import {  View, StyleSheet, Image, Pressable, Modal, Text, Dimensions} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { UserContext } from "../../components/context/UserContext";

export default function SwitchCampaign() {
    const [modalVisible, setModalVisible] = useState(false);

    const user = useContext(UserContext);
    const imageUri = user.currentCampaign.campaign_logo;
    


    return (
        <>
            <Pressable
                onPress={() => setModalVisible(!modalVisible)}>
                { imageUri ?
                    <View style={styles.campaignImg}>
                        <Image
                            style={styles.image}
                            source={{
                            uri: `${imageUri}`,
                            }}
                        />
                    </View> : 
                    <MaterialIcons 
                        name="people" 
                        size={32} 
                        color="#fff" />
                }
            </Pressable>
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    animationType="fade"
                    hardwareAccelerated={true}
                    style={styles.modal}>
                    <View style={styles.centeredView }>
                        <View style={styles.modalContent}>
                            <View
                                style={styles.header}>
                                <Pressable
                                style={styles.leftContainer}
                                    onPress={() => {setModalVisible(!modalVisible)} }>
                                    <MaterialIcons
                                        style={styles.icon} 
                                        name="arrow-back" 
                                        size={42} 
                                        color="white" />
                                </Pressable>
                                <Text
                                    style={styles.headerText}>
                                    Choose a Campaign
                                </Text>
                            </View>
                            <View 
                                style={styles.content}>
                                <Text>Content</Text>
                                
                            </View>
                        </View>
                    </View>
                </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    campaignImg: {
        height: 32,
        width: 32,
        borderRadius: 16,
    },
    image: {
        height: 32,
        width: 32,
        borderRadius: 16,
    },
    model: {
        height: Dimensions.get("window").height,
    },
    icon: {
        marginLeft: 10
    },
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftContainer: {
        justifyContent: 'flex-start',
        width: '25%'
    },
    headerText: {
        fontSize: 24,
        color: '#fff',
    },
    centeredView: {
        flex: 1,
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
    modalContent: {
        backgroundColor: '#191919',
        width: Dimensions.get("window").width * .9,
        height: Dimensions.get("window").height * .5,
        position: 'absolute',
        top: Dimensions.get("window").height * .25,
        borderRadius: 20
    },
    content: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
    },
})