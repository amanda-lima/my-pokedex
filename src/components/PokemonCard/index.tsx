import React from "react";
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground } from "react-native";
import { getBgColor, getBgImage, getColor } from "../../utils/Attributes";

type PokemonProps = {
  name: string;
  image: string;
  types: Array<string>
  id: string
}

export function Card({ pokemon }: { pokemon: PokemonProps }) {
  console.log(pokemon)
  function addZeroes(num:string) {
    var numberWithZeroes = String(num);
    var counter = numberWithZeroes.length;
    while (counter < 3) {
      numberWithZeroes = "0" + numberWithZeroes;

      counter++;
    }
    return numberWithZeroes;
  }

  const capitalize = (name:string) => {
    if (typeof name !== 'string') {
      return '';
    }
    return name.charAt(0).toUpperCase() + name.substr(1);
  }

  return (
    <ImageBackground resizeMode="cover" imageStyle={styles.bgImage} source={getBgImage(pokemon.types[0])}
      style={{
        backgroundColor: getBgColor(pokemon.types[0]),
        height: Dimensions.get('window').width / 2.5,
        width: Dimensions.get('window').width / 2.5, justifyContent: 'center', alignItems: 'center', borderRadius: 20
      }}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.id}>N°{addZeroes(pokemon.id)}</Text>
      </View>
      <Image source={{ uri: pokemon.image }} style={{ width: 100, height: 100 }} />
      <View style={{ backgroundColor: getColor(pokemon.types[0]), height: 40, width: '100%', borderBottomStartRadius: 20, borderBottomEndRadius: 20, padding: 5, alignItems: 'center', justifyContent: "center" }}>
        <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 20,
    padding: 8,
  },
  bgImage: {
    marginTop: 25,
    marginLeft: 25,
    height: 90,
    width: 90,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },
  id: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 13
  },
  name:{
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16

  },
  headerContainer: {
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 30,
    width: '100%',
    paddingLeft: 15
  }
})