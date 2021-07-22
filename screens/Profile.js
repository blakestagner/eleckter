import React, { useContext } from "react";
import { ScrollView, SafeAreaView, Text, StyleSheet, View, Header } from "react-native";
import { UserContext } from "../components/context/UserContext";
import ProfilePicture from "../components/Profile/ProfilePicture";
import UserPicture from "../components/Profile/UserPicture";
import TopNavigation from "../navigation/TopNavigation";

export default function Profile() {

    const user = useContext(UserContext)


    return (
        <View>
            <TopNavigation />
            <ScrollView style={styles.scrollView}>
                <View>
                    <View>
                        <UserPicture />
                        <Text 
                            style={styles.name}>
                            {user.user.fname} {user.user.lname}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        paddingTop: 20,
        paddingHorizontal: 20
    },
    name: {
      fontSize: 28,
      fontWeight: 'bold',
    }
  });
  