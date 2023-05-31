import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Input, Button } from 'native-base'
import { editPokemon, getPokemon } from "../../db";
import { PokemonDatabase } from "./PokemonDetailsScreen";
import { MaterialIcons } from "@expo/vector-icons";
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
  <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('PokemonDetails', { id: pokemonName })}><MaterialIcons style={styles.icon} name="arrow-back" /></TouchableOpacity>
    </View>
    {pokemonData && (

    <Formik initialValues={{ nickname: pokemonData?.nickname, comment: pokemonData?.comment }} onSubmit={handleSave}>
      {({ handleChange, handleSubmit, values }) => (
        <View style={styles.formWrapper}>
          <Text style={styles.label}>Apelido</Text>
          <Input variant={'rounded'} onChangeText={handleChange('nickname')} style={styles.input} value={values.nickname} />
          <Text style={styles.label}>Comentário</Text>
          <Input variant={'rounded'} onChangeText={handleChange('comment')} style={styles.input} value={values.comment} />
          <Button style={styles.saveButton} _text={{
            color: "#1F2937"
          }} isLoading={loading} isLoadingText="Salvando" onPress={() => handleSubmit()}>Salvar</Button>
        </View>
      )}
    </Formik>)}
  </View>
  );
}

const styles = StyleSheet.create({
  header : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    height: 50,

  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: '#423E62',
    paddingHorizontal: 20,
  },
  formWrapper: {
    marginBottom: 280,
  },
  icon: {
    color: 'white',
    fontSize: 30,

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
