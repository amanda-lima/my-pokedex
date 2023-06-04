import { ActivityIndicator, StyleSheet, View, Text, Image } from "react-native";
import React from "react";

export function Category({ category }) {
    const getColor = (category: string) => {
        switch (category) {
            case 'grass':
                return '#63BC5A';
            case 'poison':
                return '#B567CE';
            case 'fire':
                return '#FF9D55';
            case 'flying':
                return '#89AAE3';
            case 'water':
                return '#5090D6';
            case 'bug':
                return '#91C12F';
            case 'normal':
                return '#919AA2';
            case 'electric':
                return '#F4D23C';
            case 'ground':
                return '#D97845';
            case 'fairy':
                return '#EC8FE6';
            case 'fighting':
                return '#CE416B';
            case 'psychic':
                return '#FA7179';
            case 'rock':
                return '#C5B78C';
            case 'steel':
                return '#5A8EA2';
                break;
            case 'ice':
                return '#73CEC0';
                break;
            case 'ghost':
                return '#5269AD';
            case 'dragon':
                return '#0B6DC3';
            default:
                return 'gray'
        }
    }

    const getIcon = (category: string) => {
        switch (category) {
            case 'grass':
                return require('../../../assets/icons/grass.png');
            case 'poison':
                return require('../../../assets/icons/poison.png');
            case 'fire':
                return require('../../../assets/icons/fire.png');
            case 'flying':
                return require('../../../assets/icons/flying.png');
            case 'water':
                return require('../../../assets/icons/water.png');
            case 'bug':
                return require('../../../assets/icons/bug.png');
            case 'normal':
                return require('../../../assets/icons/normal.png');
            case 'electric':
                return require('../../../assets/icons/electric.png');
            case 'ground':
                return require('../../../assets/icons/ground.png');
            case 'fairy':
                return require('../../../assets/icons/fairy.png');
            case 'fighting':
                return require('../../../assets/icons/fighting.png');
            case 'psychic':
                return require('../../../assets/icons/psychic.png');
            case 'rock':
                return require('../../../assets/icons/rock.png');
            case 'steel':
                return require('../../../assets/icons/steel.png');
            case 'ice':
                return require('../../../assets/icons/ice.png');
            case 'ghost':
                return require('../../../assets/icons/ghost.png');
            case 'dragon':
                return require('../../../assets/icons/dragon.png');
            default:
                return require('../../../assets/icons/normal.png');
        }

    }

    const getLabel = (category: string) => {
        switch (category) {
            case 'grass': return 'Grama';
            case 'poison': return 'Venenoso';
            case 'fire': return 'Fogo';
            case 'flying': return 'Voador';
            case 'water': return 'Água';
            case 'bug': return 'Inseto';
            case 'normal': return 'Normal';
            case 'electric': return 'Elétrico';
            case 'ground': return 'Terrestre';
            case 'fairy': return 'Fada';
            case 'fighting': return 'Lutador';
            case 'psychic': return 'Psíquico';
            case 'rock': return 'Pedra';
            case 'steel': return 'Metal';
            case 'ice': return 'Gelo';
            case 'ghost': return 'Fantasma';
            case 'dragon': return 'Dragão';
            default: return 'Normal';
        }
    }

    return (
        <View style={{ backgroundColor: getColor(category), borderRadius: 25, paddingLeft: 6, paddingRight: 14, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={styles.iconContainer}>

            <Image style={styles.icon} source={getIcon(category)}  />
            </View>
            <Text style={styles.text}>{getLabel(category)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
    },
    icon: {
        width: 10,
        height: 10,
    },
    text: {
        color: 'white',
        fontSize: 14,
    }
})