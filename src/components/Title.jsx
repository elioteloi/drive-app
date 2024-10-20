import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Title = ({title}) => {
    return (
        <View>
            <Text style={styles.containerTitle}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containerTitle: {
        textAlign: 'center',
        fontSize: 30,
        color: "black"
      },
})

export default Title