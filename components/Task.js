import { StyleSheet, Text, SafeAreaView, View, StatusBar, Button, Alert} from "react-native";
import { useState, useEffect } from "react";
import  Dropdown  from "./components/Dropdown";
import Test from "./components/Test";


export default function App() {
  const [ backgroundFrequency, setBackgroundFrequency ] = useState();
  const [ intensity, setIntensity ] = useState();
  useEffect(() => {
    
  })

  //frequency rate dropdown
  const frequencyDropdown = <Dropdown
    items={
      [
        {'key': 1, 'value': '15 Minutes'},
        {'key': 2, 'value': '30 Minutes'},
        {'key': 3, 'value': '1 Hour'},
        {'key': 4, 'value': '1.5 Hours'},
        {'key': 5, 'value': '2 Hours'}
      ]
    }
    label={'Select Call Frequency'}
    onValueChange={(frequencyValue) => setBackgroundFrequency(frequencyValue)}
  />
  
  //intensity of benchmark dropdown
  const intensityDropdown = <Dropdown
    items={
      [
        {'key': 1, 'value': 'Low'},
        {'key': 2, 'value': 'Medium'},
        {'key': 3, 'value': 'High'},
        {'key': 4, 'value': 'XTREME'}
      ]
    }
    label={'Select Call Intensity'}
    onValueChange={(intensityValue) => setIntensity(intensityValue)}
  />

  
  function onButtonPress() {
    console.log(`FREQUENCY: ${backgroundFrequency}`);
    console.log(`INTENSITY: ${intensity}`);
    if (backgroundFrequency !== undefined && intensity !== undefined) {
      const interval = parseInterval(backgroundFrequency);
      

    }
    else {
      Alert.alert('Hold up!', 'Some parameters are undefined. Cannot start background processes.', [{text: 'OK', style: 'default'}]);
      return;
    }

  }
  return (
    <SafeAreaView style={styles.rootDisplay}>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>CanTrackVote Benchmarker</Text>
        
        <View style={styles.dropDownsContainer}>
          <View>
            {frequencyDropdown}
          </View>

          <View>
            {intensityDropdown}
          </View> 
        </View>
        
        <View>
          <Button title="Start Process" onPress={onButtonPress}></Button>
          <Test></Test>
        </View>
        
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  rootDisplay: {
    flex: 1,
    marginTop: StatusBar.currentHeight + 100
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  titleText: {
    fontSize: 24,
    flexWrap: 'nowrap',
    color: 'white'
    
  },
  dropDownsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

//Custom functions
function parseInterval(interval) {
  switch(interval) {
    case '1.5 Hours':
      return 90;
    case '15 Minutes':
      return 15;
    case '30 Minutes':
      return 30;
    case '1 Hour':
      return 60;
    case '2 Hours':
      return 120;
    default:
      return 15;
  }
}
