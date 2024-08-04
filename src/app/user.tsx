import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";

export default () => {


    const snapPoints = useMemo(() => ["25%"], []);

    // renders
    return (
        <View style={styles.container}>
            <BottomSheet snapPoints={snapPoints} >
                <View style={styles.contentContainer}>
                    <BottomSheetTextInput value="Awesome 🎉" style={styles.textInput} />
                </View>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "grey",
    },
    textInput: {
        alignSelf: "stretch",
        marginHorizontal: 12,
        marginBottom: 12,
        padding: 12,
        borderRadius: 12,
        backgroundColor: "grey",
        color: "white",
        textAlign: "center",
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
    },
});