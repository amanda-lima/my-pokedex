import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AuthContext } from "../../src/context/AuthProvider";
import PokemonListScreen from "../../src/screens/PokemonListScreen";
import EditPokemonScreen from "../../src/screens/EditPokemonDetailsScreen";
import {LoginScreen} from "../../src/screens/LoginScreen";
import PokemonDetailsScreen from "../../src/screens/PokemonDetailsScreen";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';

const Stack = createStackNavigator();

export default function Routes() {

  const { signed } = React.useContext(AuthContext);


  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {signed ? (
        <Stack.Navigator
            screenOptions={{
              headerShown: false,
              headerStyle: {
                backgroundColor: 'transparent',
                shadowColor: 'transparent'
              }
            }}>
            <Stack.Screen name="Pokedex" component={PokemonListScreen} />
            <Stack.Screen name="EditPokemon" component={EditPokemonScreen} />
            <Stack.Screen name="PokemonDetails" component={PokemonDetailsScreen} />
          </Stack.Navigator>
      ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              headerStyle: {
                backgroundColor: 'transparent',
                shadowColor: 'transparent'
              }
            }}>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
          )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
