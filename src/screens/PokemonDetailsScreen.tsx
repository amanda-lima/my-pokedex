import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Touchable } from 'react-native';
import { getPokemonDetails } from '../../api';
import { getPokemon } from '../../db';
import { Category } from '../components/PokemonCategory';
import { MaterialIcons } from "@expo/vector-icons";

import { TouchableOpacity } from 'react-native-gesture-handler';

export type PokemonDetails = {
  name: string;
  id: number;
  height: number;
  weight: number;
  image: string;
  types: any;
  nickname?: string;
  comment?: string;
};

export type PokemonDatabase = {
  name: string;
  nickname: string;
  id: number;
  comment: string;
}
export default function PokemonDetailsScreen({ navigation, route }) {
  const [pokemonData, setPokemonData] = useState<PokemonDetails>();
  const [pokemonDatabase, setPokemonDatabase] = useState<PokemonDatabase>();

  const { id } = route.params;

  const getPokemonData = async () => {
    try {
      const response = await getPokemonDetails(id);
      const data: PokemonDetails = {
        name: response.name,
        id: response.id,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${response.id}.png`,
        height: response.height,
        weight: response.weight,
        types: response.types.map((type) => type.type.name),
      };
      getPokemonDataBase(data.name)
      setPokemonData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPokemonDataBase = async (name: string) => {
    const result = await getPokemon(name);
    setPokemonDatabase(result);
  };

  useEffect(() => {
    getPokemonData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Pokedex')}><MaterialIcons style={styles.icon} name="arrow-back"/></TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditPokemon', {name: pokemonData?.name})}><MaterialIcons style={styles.icon} name="edit"/></TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Image source={{ uri: pokemonData?.image }} style={styles.image} />
        <View style={styles.cardHeaderWrapper}>
        <Text style={styles.cardTitle}>{pokemonData?.name}</Text>
        {pokemonDatabase?.nickname ? (<Text style={styles.cardsubTitle}>{pokemonDatabase?.nickname}</Text>) : <Text style={styles.cardsubTitle} >Adicione um apelido</Text>}
        </View>
        <View style={styles.cardCategoryWrapper}>
          {pokemonData?.types.map((type, index) => <Category key={index} category={type} />)}
        </View>
        <View style={styles.cardTextWrapper}>
        </View>

        <View style={styles.cardTextWrapper}>
          <View style={styles.cardCharacteristicsWrapper}>
            <Text style={styles.cardTextTitle}>Altura</Text>
            <Text style={styles.cardText}> {pokemonData?.height / 10 } m</Text>
          </View>
          <View style={styles.cardCharacteristicsWrapper}>
            <Text style={styles.cardTextTitle}>Peso</Text>
            <Text style={styles.cardText}> {pokemonData?.weight / 10} kg</Text>
          </View>
        </View>
        <View style={styles.commentWrapper}>
          <Text style={styles.cardTextTitle}>Comentário</Text>
          <Text style={styles.cardText}>{pokemonDatabase?.comment ? pokemonDatabase. comment : "Adicione um comentário"}</Text>
        </View>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#423E62',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  headerTitle: {
    color: 'white',
  },
  icon: {
    color: 'white',
    fontSize: 30,

  },
  image: {
    position: 'absolute',
    top: -170,
    width: 300,
    height: 300,
    zIndex: 1,

  },
  card: {
    borderColor: 'transparent',
    backgroundColor: 'white',
    width: '100%',
    height: '65%',
    borderWidth: 1,
    borderRadius: 20,
    paddingTop: 90,
    alignItems: 'center',
    gap	: 10,
  },
  cardHeaderWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
  },
  cardTitle: {
    fontSize: 30,
  },
  cardsubTitle: {
    color: 'gray',
    fontSize: 20,
  },
  cardTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    width: '80%'
  },
  cardCharacteristicsWrapper: {
    flexDirection: 'column',
    width: '50%',
  },
  cardCategoryWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  cardTextTitle: {
    color: 'gray',
  },
  cardText: {
    borderColor: 'lightgray',
    fontWeight: 'bold',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  commentWrapper: {
    flexDirection: 'column',
    width: '83%',
  }
})
