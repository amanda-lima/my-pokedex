import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from 'native-base'
import { editPokemon, getPokemon } from "../../db";
import { PokemonDatabase } from "./PokemonDetailsScreen";
import { Formik } from "formik";

export default function EditPokemonScreen({ navigation, route }) {
  const [pokemonData, setPokemonData] = useState<PokemonDatabase>();
  const [loading, setLoading] = useState(false)

  const pokemonName = route.params.name;

  const getPokemonData = async () => {
    try {
      const result = await getPokemon(pokemonName);


      const data: PokemonDatabase = {
        name: result.name,
        id: result.id,
        nickname: result.nickname,
        comment: result.comment,
      };
      setPokemonData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = (values: { nickname: string, comment: string }) => {
    setLoading(true)
    setTimeout(async () => {
      try {
        editPokemon(pokemonName, values.nickname, values.comment);
        navigation.navigate("Pokedex");
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    getPokemonData()

  }, []);

  return (
    pokemonData && (

      <Formik initialValues={{ nickname: pokemonData.nickname, comment: pokemonData.comment }} onSubmit={handleSave}>
        {({ handleChange, handleSubmit, values }) => (
          <View style={styles.container}>
            <Text style={styles.label}>Apelido</Text>
            <Input variant={'rounded'} onChangeText={handleChange('nickname')} style={styles.input} value={values.nickname} />
            <Text style={styles.label}>Comentário</Text>
            <Input variant={'rounded'} onChangeText={handleChange('comment')} style={styles.input} value={values.comment} />
            <Button style={styles.saveButton} _text={{
              color: "#1F2937"
            }} isLoading={loading} isLoadingText="Salvando" onPress={() => handleSubmit()}>Salvar</Button>
          </View>
        )}
      </Formik>)

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: '#423E62',
  },
  label: {
    color: 'white',
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#EAEAEA",
  },
  saveButton: {
    backgroundColor: '#F2CC8F',
    borderRadius: 20,
    marginTop: 40,
  }
});
