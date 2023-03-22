import { View, Pressable, Text, StyleSheet, ScrollView} from 'react-native';
import { useState } from 'react';

function Dropdown({items = [], label = '', onValueChange}) {
    const [ isVisible, setVisible ] = useState(false)
    const [selectedValue, setSelectedValue] = useState('');

    const onValueSelected = (selected) => () => {
        setSelectedValue(selected);
        onValueChange(selected);
    }
    
    function toggleVisibility() {
        if(isVisible) {
            setVisible(false);
        }
        else {
            setVisible(true);
        }
    }

    
    return (
        <View style={styles.container}>
            <Pressable
                onPress={toggleVisibility}>
                <View>
                    <Text style={styles.toggleText}>{label}</Text>
                </View>
            </Pressable>

            <View style={styles.optionsContainer}>
                { isVisible && 
                    items.map( (item) => 
                        <Pressable key={item.key} android_ripple={{color: '#908e8e'}} onPress={onValueSelected(item.value)} style={styles.option}>
                            <View key={item.key}>
                                <Text style={{color: 'white'}}>{item.value}</Text>
                            </View>
                        </Pressable>)
                    
                }
            </View>
        </View>
    )
}

export default Dropdown;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a84db',
        paddingHorizontal: 24,
        paddingVertical: 16,
        marginVertical: 24,
        marginHorizontal: 8
    },
    optionsContainer: {
        backgroundColor: '#1a84db',
        marginBottom: 8,
        marginTop: 0
    },
    toggleText: {
        color: 'white',
        fontSize: 16
    },
    option: {
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        borderBottomColor: '#99a4ad',
        borderBottomWidth: 3,
        paddingVertical: 8
        
        
    }

});