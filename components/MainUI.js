import {Button, StatusBar, StyleSheet, Text, View} from "react-native";

function MainUI({dropdown1, dropdown2, toggleFetchTask, toggleLog, isRegistered}) {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>CanTrackVote Benchmarker</Text>
            <View style={styles.dropDownsContainer}>
                <View>
                    {dropdown1}
                </View>

                <View>
                    {dropdown2}
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button
                        title={isRegistered ? 'Stop Background Fetch Task' : 'Start Background Fetch Task'}
                        onPress={toggleFetchTask}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title={'Log'}
                        onPress={toggleLog}
                    />
                </View>
            </View>
        </View>
    )
}

export default MainUI;

const styles = StyleSheet.create({
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight + 150,

    },
    titleText: {
        fontSize: 24,
        flexWrap: 'nowrap',
        color: 'white'

    },
    dropDownsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 24
    },
    buttonContainer: {
        padding: 24,
        flexDirection: 'column',

    },
    button: {
        marginVertical: 8
    }
})