import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Input, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { AuthContext } from '../context/AuthProvider';

const validationSchema = yup.object().shape({
  username: yup.string().required('O nome de usuário é obrigatório'),
  password: yup.string().required('A senha é obrigatória'),
});

export const LoginScreen = () => {
  const [error, setError] = useState('');
  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/sprite_hilda1.png')} style={{ width: 300, height: 300, marginBottom: 100 }}/>

      <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 20 }}>Entrar</Text>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values) => {
          try {
            await signIn(values.username, values.password);
          } catch (e) {
            setError('Nome de usuário ou senha incorretos');
          }
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={styles.loginContainer}>
            <Input
              placeholder="Nome de usuário"
              w={{
                base: "80%",}}
              variant={'rounded'}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {errors.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}
            <Input
              placeholder="Senha"
              w={{
                base: "80%",}}
              variant={'rounded'}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <Button isDisabled={!values.password || !values.username} style={styles.button} onPress={handleSubmit as any}>
              <Text style={styles.buttonText}>Entrar</Text>
            </Button>
            {error !== '' && <Text style={styles.error}>{error}</Text>}
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      height: 40,
      width: '80%',
      borderColor: 'purple',
      borderWidth: 2,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    loginContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    button: {
      backgroundColor: 'purple',
      padding: 10,
      width: '80%',
      borderRadius: 20,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    error: {
      color: 'red',
      marginBottom: 10,
    },
  });