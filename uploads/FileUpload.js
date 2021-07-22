import React, { useEffect, useState, useContext } from 'react';
import { uploadUserImage, updateUser} from '../db/Repository';
import { 
        View, 
        Text, 
        StyleSheet, 
        Pressable, 
        Modal, 
        Dimensions, 
        Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { UserContext } from '../components/context/UserContext';
import ProfilePicture from '../components/Profile/ProfilePicture';
import Button from '../components/button/Button';
import * as ImagePicker from 'expo-image-picker';
import {LinearGradient} from 'expo-linear-gradient';




export default function FileUpload() {
    const [message, setMessage] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [photo, setPhoto] = useState(null);
    const user = useContext(UserContext);
    const imgUrl = !photo ? user.user.img : photo.uri;


    const handleUploadPhoto = () => {
        if(photo) {
            setMessage('Image Uploading')

            let uriParts = photo.uri.split('.');
            let fileType = uriParts[uriParts.length - 1];
            let uri = photo.uri;
            
            const data = new FormData()
            data.append('photo', {
                uri,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
            });

            uploadUserImage(data)
            .then(res => { // then print response status
                updateUser()
                .then(res => {
                    setMessage('New Image Set')
                    user.setToken(res);
                    setTimeout(() => {
                        setMessage('')
                        setModalVisible(false)
                        setPhoto(null)
                    }, 1000)
                })
                .catch(err => {
                    console.log(err)
                })
            })
            .catch(err => {
                console.log(err)
                setMessage('Image Upload failed, please try again later')
                setTimeout(() => {
                    setMessage('')
                }, 3000)
            })
        } else {
            setMessage('No Photo Selected')
            setTimeout(() => {
                setMessage('')
            }, 2000)
        }
    }


      const handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        if (!result.cancelled) {
            result.uri = Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri;
            setPhoto(result);
        }
      };

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
                                Upload New Image
                            </Text>
                        </View>
                        </LinearGradient>
                        <View 
                            style={styles.content}>
                                <View style={styles.profileImg}>
                                    <ProfilePicture imgUrl={imgUrl}/>
                                    { photo ? 
                                        <Pressable 
                                            onPress={() => { setPhoto(null) }}
                                            style={[styles.uploadButton, styles.remove]}>
                                                <MaterialIcons 
                                                    name="remove" 
                                                    size={24} 
                                                    color="white" />
                                        </Pressable> : null
                                    }
                                </View>
                            <View style={styles.row}>
                                { photo ? 
                                    <Button
                                        icon="upload-file"
                                        title="Upload Photo" 
                                        onPress={handleUploadPhoto}/> :
                                    <Button
                                        icon="image-search"
                                        title="Choose Photo" 
                                        onPress={handleChoosePhoto} />
                                }
                            </View>
                            <Text style={styles.errorText}>{message}</Text>
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
    leftContainer: {
        justifyContent: 'flex-start',
        width: '25%'
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
    },
    upload: {
        backgroundColor: '#3f51b5',
    },
    remove: {
        backgroundColor: 'red'
    },
    errorText: {
        color: '#fff',
        paddingTop: 20,
        fontSize: 16
    }
  });

