import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Dimensions } from "react-native";
import { Icon, Input } from "native-base";
import { Pokemon } from "../../db";
import { AuthContext } from "../context/AuthProvider";
import { getPokemonList } from "../../api";
import { Formik } from "formik";


import { MaterialIcons } from "@expo/vector-icons";

interface FilteredPokemon {
    name: string;
    id: string;
    image: string;
}

export default function PokemonListScreen({ navigation }) {
    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonFilteredList, setPokemonFilteredList] = useState([]);
    const [searchText, setSearchText] = useState('');


    const { signOut } = React.useContext(AuthContext);

    const filterPokemonList = () => {
        const filteredList = pokemonList.filter((pokemon: Pokemon) =>
            pokemon.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setPokemonFilteredList(filteredList);
    };

    const getPokemons = async () => {
        try {
            await getPokemonList().then((response) => {
                const data = response.map((pokemon: any) => {
                    return {
                        name: pokemon.name,
                        id: pokemon.url.split('/')[6],
                        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`
                    }
                })
                setPokemonList(data)
            })
        } catch (error) {
            console.log(error)
        }
    }
    const numColumns = 2;

    useEffect(() => {
        getPokemons();
    }, []);

    useEffect(() => {
        filterPokemonList();
    }, [searchText, pokemonList]);

    return (
        <View style={styles.container}>

            <Formik
                Formik initialValues={{ searchText: '' }} onSubmit={() => { }}
            >
                {({ handleChange }) => (
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={signOut}><MaterialIcons style={styles.icon} name="logout" /></TouchableOpacity>
                        <Input
                            _focus={{ borderWidth: 1, backgroundColor: "white", borderColor: "white" }}
                            variant={'rounded'}
                            style={styles.input}
                            w={{
                                base: "90%",
                            }}
                            InputLeftElement={<Icon as={<MaterialIcons name="search" />} size={5} ml="2" color="muted.400" />}
                            onChangeText={(text) => setSearchText(text)}
                            value={searchText}
                            placeholder="Buscar Pokemon"
                            onFocus={() => setSearchText('')}

                        />
                    </View>)}
            </Formik>

            <FlatList style={styles.list} numColumns={numColumns}
                data={pokemonFilteredList} columnWrapperStyle={{ flex: 1, justifyContent: 'space-around', marginBottom: 10 }}
                renderItem={({ item }: { item: { name: string, image: string, id: string } }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('PokemonDetails', { id: item.id })}>
                        <View style={styles.listItem}>
                            <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
                            <Text style={styles.pokemonName}>{item.name}</Text>

                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
        justifyContent: "center",
        backgroundColor: "#423E62",
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 10,

    },
    icon: {
        color: "white",
        fontSize: 25,
        transform: [{ rotate: "180deg" }],
    },
    form: {
        flex: 2,
        flexDirection: "column",
    },
    list: {
        flex: 1,
        marginTop: 20,
    },
    input: {
    },
    searchButton: {
        margin: 10,
        backgroundColor: "#6200EE",
        justifyContent: "center",
        borderRadius: 10,
        width: "fit-content",
    },
    searchButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
    listItem: {
        backgroundColor: "#EAEAEA",
        alignItems: "center",
        height: Dimensions.get('window').width / 2.5,
        width: Dimensions.get('window').width / 2.5,
        justifyContent: "center",
        padding: 10,
        borderRadius: 5,
    },
    pokemonName: {
        fontWeight: "bold",
        fontSize: 18,
    },
    pokemonNickname: {
        color: "#666",
    },
    pokemonComment: {
        fontStyle: "italic",
    },
});
