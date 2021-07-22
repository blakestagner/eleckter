import React, { useContext, useState, useEffect } from 'react';
import { View } from "../components/Themed";
import { Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../components/context/Context';
import { Ionicons } from '@expo/vector-icons';
import { LogoText } from '../components/LogoText';
import Button from '../components/button/Button';
import md5 from 'md5';

export default function SignInScreen() {

    const [data, setData] = useState({
        userName: null,
        password: null,
        check_textInputChange: false,
        securityTextEntry: true,
        isValidPassword: true,
        isValidEmail: true,
        errorHandle: null
    })

    const { signIn } = useContext(AuthContext)

    const handleUsername = (val) => {
        if(val.trim().length >= 5) {
            setData({
                ...data,
                userName: val,
                check_textInputChange: true,
                isValidEmail: true
            })
        } else {
            setData({
                ...data,
                userName: val,
                check_textInputChange: false,
                isValidEmail: false
            })
        }
    }

    const handlePassword = (val) => {
        let encodedVal = md5(val);
        if(val.trim().length >= 5) {
            setData({
                ...data,
                password: encodedVal,
                isValidPassword: true
            })
        } else {
            setData({
                ...data,
                password: encodedVal,
                isValidPassword: false
            })
        }
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 5) {
            setData({
                ...data,
                isValidEmail: true
            });
        } else {
            setData({
                ...data,
                isValidEmail: false
            });
        }
    }

    const handleValidPassword = (val) => {
        if(val.trim().length >= 5) {
            setData({
                ...data,
                isValidPassword: true
            })
        } else {
            setData({
                ...data,
                isValidPassword: false
            })
        }
    }

    const updateSecurityTextEntry = () => {
        setData({
            ...data,
            securityTextEntry: !securityTextEntry
        })
    }



    const handleLogin = (userName, password) => {
        signIn(userName, password)
        .then(res => {
            console.log('logging in')
        })
        .catch(err => {
            setData({
                ...data,
                errorHandle: err
            })
            setTimeout(() => {
                setData({
                    ...data,
                    errorHandle: null
                })
            }, 1500)
        })
    }

    return (
        <View style={styles.container}>
            <LogoText style={styles.mainHeader}/>
            <Text style={styles.header}>Sign In</Text>
            <View style={styles.card}>
                <Text style={styles.text}>Email</Text>
                <View style={styles.inputParent}>
                    <TextInput
                        placeholder="Your Email"
                        autoCapitalize="none"
                        onChangeText={(val) => handleUsername(val)} 
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                        style={styles.input}/>
                    { !data.check_textInputChange ? null : 
                        <Ionicons name="md-checkmark-circle" size={20} color="green" /> 
                    }
                </View>
                { data.isValidEmail ? null :
                    <Text style={styles.errorMsg}>Invalid Email</Text>      
                }
                <Text style={styles.text}>Password</Text>
                <View style={styles.inputParent}>
                    <TextInput
                        placeholder="Your Password"
                        autoCapitalize="none"
                        onChangeText={(val) => handlePassword(val)}
                        onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
                        style={styles.input}/>
                </View>
                { data.isValidPassword ? null :
                    <Text style={styles.errorMsg}>Invalid Password</Text>      
                }
                <Text style={styles.errorMsg}>{data.errorHandle}</Text>      
                <View style={styles.center}>
                    <Button 
                        title="Sign in"
                        onPress={() => handleLogin(data.userName, data.password)} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "#B3E5FC",
      padding: 10,
    },
    center: {
        position: 'relative',
        alignItems: 'center',
    },
    mainHeader: {
        fontSize: 48,
        textAlign: 'center',
    },
    header: {
        fontSize: 32,
        textAlign: 'center',
        paddingBottom: 25,
    },
    text: {
        paddingTop: 20,
        paddingBottom: 0,
        color: '#787878'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 25,
        padding: 20
    },
    inputParent: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#aaaaaa',
        paddingBottom: 0,
    },
    input: {
        flex: 1
    },
    top: {
      flex: 0.3,
      backgroundColor: "grey",
      borderWidth: 5,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    middle: {
      flex: 0.3,
      backgroundColor: "beige",
      borderWidth: 5,
    },
    bottom: {
      flex: 0.3,
      backgroundColor: "pink",
      borderWidth: 5,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    errorMsg: {
        color: 'red'
    }
  });