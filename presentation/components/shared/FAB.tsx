/**
 * FAB de Floating Action Buttom
 */

import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

interface Props {
    iconName: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;

}

const FAB = ({ onPress, style, iconName}: Props) => {
    return (
        <View style={[ styles.btn, style ]}>
            <TouchableOpacity
                onPress={onPress}
            >
                <Ionicons name={iconName} color="white" size={35}/>
            </TouchableOpacity>
        </View>
    );
};

export default FAB;

const styles = StyleSheet.create({
    btn: {
        zIndex: 99,
        position: 'absolute',
        height: 55,
        width: 55,
        borderRadius: 30, 
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 0.27,
            width: 4.5
        },
        elevation: 5
    }
})