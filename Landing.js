import 'react-native-gesture-handler';
import { AuthContext } from './components/context/Context';
import { UserContext } from './components/context/UserContext';
import React, { useMemo, useEffect, useReducer, useContext} from 'react';
import { login } from './db/Repository';
import useColorScheme from './hooks/useColorScheme';
import RootStackScreen from './screens/RootStackScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RightSideNavigator from './navigation/RightSideNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function Landing() {
  const user = useContext(UserContext);
  const colorScheme = useColorScheme();

  let initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null
  }

  let loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false
        };
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

  const authContext = useMemo(() => ({
    signIn: async(userName, password) => {
      let userToken;
      userToken = null;
      if(userName && password) {
        try {
            const token = await login(userName, password)
            userToken = token;
            await AsyncStorage.setItem('userToken', token)
            user.setToken(userToken)
        } catch(err) {
          throw err
        }
      } else if(password) {
          throw 'Email is empty'
      } else if(userName) {
          throw 'Password is empty'
      } else {
          throw 'Fields are empty'
      }
      dispatch({type: 'LOGIN', id: userName, token: userToken})
    },
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('userToken')
      } catch(e) {
        console.log(e)
      }
      dispatch({type: 'LOGOUT'})
    }
  }), [])


useEffect(() => {
    setTimeout(async() => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        user.setToken(userToken)
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []); 

  if (loginState.isLoading) {
    return null;
  } 

  return (
    <AuthContext.Provider value={authContext}>
      { loginState.userToken ? 
          <SafeAreaProvider>
            <NavigationContainer>
              <RightSideNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
      : <RootStackScreen/> 
      }
    </AuthContext.Provider>
  );
  
}