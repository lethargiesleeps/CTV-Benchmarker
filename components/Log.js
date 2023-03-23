import {View, FlatList, Text, Button, StyleSheet, ViewComponent} from "react-native";

function Log({logData, toggleLog, clearLog}) {

    return (
        <View style={styles.root}>
            <Text style={styles.header}>Log does not persist on app termination</Text>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title={'Close Log'} onPress={toggleLog}/>
                </View>
                <View style={styles.button}>
                    <Button title={'Clear Log'} onPress={clearLog}/>
                </View>
            </View>

            <View>
                <FlatList data={logData} renderItem={(itemData) => {
                    return (
                        <Text style={styles.logItem}>{itemData.item}</Text>
                    );
                }} />
            </View>

        </View>
    )
}

export default Log;
const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    header: {
        color: 'white',
        fontSize: 18,
        marginVertical: 16
    },
    button: {
        marginHorizontal: 8
    },
    buttonContainer: {
        marginVertical: 16,
        flexDirection: 'row',

    },
    logItem: {
        color: 'white',
        fontSize: 14,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginVertical: 12
    }
});