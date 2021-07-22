import React, {useContext} from "react";
import { StyleSheet, View } from "react-native";
import { UserContext } from "../context/UserContext";
import FileUpload from "../../uploads/FileUpload";
import ProfilePicture from "./ProfilePicture";

export default function UserPicture() {
    const user = useContext(UserContext);
    const imgUrl = user.user.img;

    return (
        <View style={styles.profileImg}>
            <ProfilePicture imgUrl={imgUrl}/>
            <FileUpload />
        </View>
    )
}

const styles = StyleSheet.create({
    profileImg: {
      backgroundColor: "#784ba0",
      height: 150,
      width: 150,
      borderRadius: 75,
    }
  });
  