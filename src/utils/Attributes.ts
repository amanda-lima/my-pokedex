
export const getColor = (category: string) => {
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
        case 'ice':
            return '#73CEC0';
        case 'ghost':
            return '#5269AD';
        case 'dragon':
            return '#0B6DC3';
        default:
            return 'gray'
    }
}

export const getBgColor = (category: string) => {
    switch (category) {
        case 'grass':
            return '#EDF6EC';
        case 'poison':
            return '#F5EDF8';
        case 'fire':
            return '#FCF3EB';
        case 'flying':
            return '#F1F4FA';
        case 'water':
            return '#EBF1F8';
        case 'bug':
            return '#F1F6E8';
        case 'normal':
            return '#F1F2F3';
        case 'electric':
            return '#FBF8E9';
        case 'ground':
            return '#F9EFEA';
        case 'fairy':
            return '#FBF1FA';
        case 'fighting':
            return '#F8E9EE';
        case 'psychic':
            return '#FCEEEF';
        case 'rock':
            return '#F7F5F1';
        case 'steel':
            return '#ECF1F3';
        case 'ice':
            return '#F1FBF9';
        case 'ghost':
            return '#EBEDF4';
        case 'dragon':
            return '#E4EEF6';
        case 'dark': 
            return '#ECEBED'
        default:
            return 'gray'
    }
}

export const getBgImage = (category: string) => {
    switch (category) {
        case 'grass':
            return require('../../assets/image/background/grass.png');
            case 'poison':
                return require('../../assets/image/background/poison.png');
            case 'fire':
                return require('../../assets/image/background/fire.png');
            case 'flying':
                return require('../../assets/image/background/flying.png');
            case 'water':
                return require('../../assets/image/background/water.png');
            case 'bug':
                return require('../../assets/image/background/bug.png');
            case 'normal':
                return require('../../assets/image/background/normal.png');
            case 'electric':
                return require('../../assets/image/background/electric.png');
            case 'ground':
                return require('../../assets/image/background/ground.png');
            case 'fairy':
                return require('../../assets/image/background/fairy.png');
            case 'fighting':
                return require('../../assets/image/background/fighting.png');
            case 'psychic':
                return require('../../assets/image/background/psychic.png');
            case 'rock':
                return require('../../assets/image/background/rock.png');
            case 'steel':
                return require('../../assets/image/background/steel.png');
            case 'ice':
                return require('../../assets/image/background/ice.png');
            case 'ghost':
                return require('../../assets/image/background/ghost.png');
            case 'dragon':
                return require('../../assets/image/background/dragon.png');
            case 'dark' : 
                return require('../../assets/image/background/dark.png')
            default:
                return require('../../assets/image/background/normal.png');
    }
}

export const getIcon = (category: string) => {
    switch (category) {
        case 'grass':
            return require('../../assets/icons/grass.png');
        case 'poison':
            return require('../../assets/icons/poison.png');
        case 'fire':
            return require('../../assets/icons/fire.png');
        case 'flying':
            return require('../../assets/icons/flying.png');
        case 'water':
            return require('../../assets/icons/water.png');
        case 'bug':
            return require('../../assets/icons/bug.png');
        case 'normal':
            return require('../../assets/icons/normal.png');
        case 'electric':
            return require('../../assets/icons/electric.png');
        case 'ground':
            return require('../../assets/icons/ground.png');
        case 'fairy':
            return require('../../assets/icons/fairy.png');
        case 'fighting':
            return require('../../assets/icons/fighting.png');
        case 'psychic':
            return require('../../assets/icons/psychic.png');
        case 'rock':
            return require('../../assets/icons/rock.png');
        case 'steel':
            return require('../../assets/icons/steel.png');
        case 'ice':
            return require('../../assets/icons/ice.png');
        case 'ghost':
            return require('../../assets/icons/ghost.png');
        case 'dragon':
            return require('../../assets/icons/dragon.png');
        case 'dark' : 
            return require('../../assets/icons/dark.png')
        default:
            return require('../../assets/icons/normal.png');
    }

}

export const getLabel = (category: string) => {
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
        case 'dark': return 'Noturno'
        default: return 'Normal';
    }
}