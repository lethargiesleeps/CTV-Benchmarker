import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  StatusBar,
  Button,
  Alert,
} from "react-native";
import {useState, useEffect} from "react";
import  Dropdown  from "./components/Dropdown";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { hocFetch, callApi} from "./Fetcher";

//task name
const BACKGROUND_FETCH_TASK = 'background-fetch';
let intensityGlobal = 'Low';

//task logic
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();
  console.log(`[ FETCH INITIATED: ${new Date(now).toString()} ]`);
  hocFetch(intensityGlobal);


  return BackgroundFetch.BackgroundFetchResult.NewData;
});

//register task
async function registerBackgroundFetchAsync(interval) {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * interval, // interval is minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

//unregister task
async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

export default function App() {
  const [isRegistered, setIsRegistered] = useState(false); //whether app is registered
  const [status, setStatus] = useState(null); //status code of task, 3 is good
  const [ backgroundFrequency, setBackgroundFrequency ] = useState(15); //minimum frequency of task execution, cannot be lower than 15, will cause issues
  const [ intensity, setIntensity ] = useState(); //intensity of API call, not yet implemented

  //hook
  useEffect(() => {
    checkStatusAsync();
  }, []);

  //api call gets logged here
  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    setStatus(status);
    setIsRegistered(isRegistered);
    console.log("[ STATUS: " + status + " ]");
    console.log("[ TASK REGISTERED: " + isRegistered + " ]");
  };

  //Main button onPress equivalent
  const toggleFetchTask = async () => {
    console.log(`[ FREQUENCY: ${backgroundFrequency} ]`);
    console.log(`[ INTENSITY: ${intensity} ]`);
    //Make sure no bad parameters than can mess up fetch task
    if (backgroundFrequency !== undefined && intensity !== undefined) {
      //convert dropdown selection to numerical equivalent in minutes
      const interval = parseInterval(backgroundFrequency);

      //unregister task (stop it from running)
      if (isRegistered) {
        await unregisterBackgroundFetchAsync();
        console.log("[ BACKGROUND FETCH TASK IS NOW UNREGISTERED ]")
      } 
      //register task (start the process)
      else {
        await registerBackgroundFetchAsync(interval);
        console.log("[ BACKGROUND FETCH TASK IS NOW REGISTERED ]");
      }

    }
    //pseudo error handling
    else {
      Alert.alert('Hold up!', 'Some parameters are undefined. Cannot start background processes.', [{text: 'OK', style: 'default'}]);
      return;
    }
    
    //Check status each time process is started or stopped
    checkStatusAsync();
  };

  function doTheThing() {
    callApi();
  }
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
    onValueChange={(intensityValue) => {
      setIntensity(intensityValue);
      intensityGlobal = intensityValue;
      console.log(`[ INTENSITY GLOBAL CHECK : ${intensityGlobal}]`);
    }
  }
  />

  return (
    <SafeAreaView style={styles.rootDisplay}>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>CanTrackVote Benchmarker</Text>
        <View>
          <Text>BG FETCH STATUS: {' '}
            <Text style={{fontWeight: 'bold', color: 'white'}}>{status && BackgroundFetch.BackgroundFetchStatus[status]}</Text>
          </Text>
        </View>
        
        <View style={styles.dropDownsContainer}>
          <View>
            {frequencyDropdown}
          </View>

          <View>
            {intensityDropdown}
          </View> 
        </View>
        
        <View style={styles.buttonContainer}>
          <Button 
            title={isRegistered ? 'Stop Background Fetch Task' : 'Start Background Fetch Task'} 
            onPress={toggleFetchTask}
            />
        </View>
      </View>
    </SafeAreaView>
  
  );
}

const styles = StyleSheet.create({

  rootDisplay: {
    flex: 1,
    marginTop: StatusBar.currentHeight + 150,
    padding: 40
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
    justifyContent: 'space-between',
    padding: 24
  },
  buttonContainer: {
    padding: 24
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