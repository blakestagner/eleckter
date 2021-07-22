import React, { useEffect, useContext } from "react";
import { LogoText } from "../components/LogoText";
import { StyleSheet, View, Text, Platform, Pressable, TextInput, Dimensions} from "react-native";
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons'; 
import {useRoute} from '@react-navigation/native';
import { UserContext } from "../components/context/UserContext";
import { useNavigation } from '@react-navigation/native';
import SwitchCampaign from "../screens/assets/SwitchCampaign";

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 30 : 30;

export default function TopNavigation({handleSearch}) {
    const route = useRoute();
    const navigation = useNavigation();
    const user = useContext(UserContext);

    
    const SearchBar = ({handleSearch}) => {
        


        return (
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
        )
    }


    return(
        <View style={styles.container}>
            <View style={styles.statusBar}>
                <StatusBar/>
            </View>
            <View style={styles.topNav}>
                { 
                    route.name === 'Home' ?
                        <Pressable
                            onPress={() => navigation.navigate("Notifications")}>
                            <MaterialIcons 
                                name="notifications" 
                                size={32} 
                                color="#fff" />
                        </Pressable> :
                    route.name === 'Campaign' ?
                        <SwitchCampaign /> :
                    route.name === "ProfileScreen" ?
                        <Pressable
                            onPress={() => navigation.navigate("Messages")}>
                            <MaterialIcons 
                                name="message" 
                                size={32} 
                                color="#fff" />
                        </Pressable> :
                        <Pressable
                            onPress={() => navigation.navigate("Home")}>
                            <MaterialIcons name="arrow-back" size={32} color="#fff" />
                        </Pressable>
                }
                {
                    route.name === "Search" ?
                        <SearchBar handleSearch={handleSearch}/> :
                        <Pressable
                            onPress={() => navigation.goBack()}>
                            <LogoText style={styles.logo} />
                        </Pressable>
                }
                <Pressable
                    onPress={() => navigation.openDrawer()}>
                    <MaterialIcons 
                        name="menu" 
                        size={32} 
                        color="#fff" />
                </Pressable>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: 'column',
        backgroundColor: '#0277BD',
      },
    logo: {
        fontSize: 28
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
    },
    input: {
        width: Dimensions.get("window").width / 2,
        paddingHorizontal: 10
    },
})