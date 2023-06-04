import { StyleSheet, View, Text, Image } from "react-native";
import React from "react";
import { getColor, getIcon, getLabel } from "../../utils/Attributes";

export function Category({ category }) {

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