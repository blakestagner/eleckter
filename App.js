import 'react-native-gesture-handler';
import { UserProvider} from './components/context/UserContext';
import React from 'react';
import Landing from './Landing';



export default function App() {

  return (

      <UserProvider>
        <Landing />
      </UserProvider>

  );
  
}
