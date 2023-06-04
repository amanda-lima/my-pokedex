import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity,  ActivityIndicator } from "react-native";
import { Icon, Input } from "native-base";
import { AuthContext } from "../context/AuthProvider";
import { getPokemonDetails, getPokemonList } from "../../api";
import { Formik } from "formik";

import { MaterialIcons } from "@expo/vector-icons";
import { Card } from "../components/PokemonCard";

interface FilteredPokemon {
    name: string;
    id: string;
    image: string;
    types: Array<string>
}

export default function PokemonListScreen({ navigation }) {
    const [pokemonList, setPokemonList] = useState<FilteredPokemon[]>([]);
    const [pokemonFilteredList, setPokemonFilteredList] = useState<FilteredPokemon[]>([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const { signOut } = React.useContext(AuthContext);

    const filterPokemonList = () => {
        if (!pokemonList) {
            return;
        }
        const filteredList = pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setPokemonFilteredList(filteredList);

        setLoading(false);
        return filteredList;
    };

    const pokemonDetails = async (name: string) => {
        try {
          const result = await getPokemonDetails(name);
          const data = {
            name: result.name,
            id: result.id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result.id}.png`,
            types: result.types.map((type) => type.type.name),
          };
          return data;
        } catch (error) {
          console.log(error);
          return null;
        }
      };

    const getPokemons = async (offset: number) => {
        try {
            const response = await getPokemonList(offset);
            const names = response.map((pokemon) => pokemon.name);

            const data = await Promise.all(names.map(async (pokemon) => {
                const result = await pokemonDetails(pokemon);
                return result;
            }));

            console.log(data);
            setPokemonList((prevList) => [...prevList, ...data])
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleLoadMore = () => {
        setLoading(true)
        setPage(page + 1);
        getPokemons((page + 1) * 20)
    };

    const numColumns = 2;

    useEffect(() => {
        setLoading(true); //   Define o loading como true antes de buscar os pokemons
        getPokemons(0)
            .then(() => setLoading(false))
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
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
                data={pokemonFilteredList} columnWrapperStyle={{ flex: 1, justifyContent: 'space-around', marginBottom: 30 }}
                renderItem={({ item }: { item: { name: string, image: string, id: string, types: Array<string> } }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('PokemonDetails', { id: item.id })}>
                        <View>
                            <Card pokemon={item} />

                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? ActivityIndicator : null}
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
        backgroundColor: "white",
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 10,

    },
    icon: {
        color: "lightgray",
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
