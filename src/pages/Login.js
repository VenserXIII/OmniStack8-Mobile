import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import api from '../services/api';
import ReactLogo from './ReactLogo';
import logo from '../assets/logo.png';

export default function Login({navigation}) {
  const [user, setUser] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('Main', {user});
      }
    });
  }, []);

  async function handleLogin() {
    const response = await api.post('/devs', {username: user});
    const {_id} = response.data;
    await AsyncStorage.setItem('user', _id);
    navigation.navigate('Main', {user: _id});
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS === 'ios'}
        style={styles.container}>
        <ReactLogo />
        <Image source={logo} />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Digite seu usuário do Github"
          placeholderTextColor="#999"
          style={styles.input}
          value={user}
          onChangeText={setUser}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0052CC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  react: {
    width: 50,
    height: 50,
  },
  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#df4723',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
