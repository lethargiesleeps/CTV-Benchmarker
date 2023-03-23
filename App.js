import {
  StyleSheet,
  SafeAreaView,
  Alert
} from "react-native";
import {useState, useEffect} from "react";
import  Dropdown  from "./components/Dropdown";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { hocFetch, callApi} from "./Fetcher";
import MainUI from "./components/MainUI";
import Log from "./components/Log";

//task name
const BACKGROUND_FETCH_TASK = 'background-fetch';
let intensityGlobal = 'Low';
let logDataGlobal = [];
let logPrefix = `[ ${new Date(Date.now()).toString()} ] `;;

//task logic
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();
  logDataGlobal.push(`${logPrefix}FETCH INITIATED`);
  logDataGlobal.push(hocFetch(intensityGlobal));
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
  const [ logVisibe, setLogVisible ] = useState(false)
  const [ logData, setLogData] = useState([]);

  //Force updates log data to maintain state
  function updateLogData() {
    setLogData(logDataGlobal);
  }

  function clearLog() {
    logDataGlobal = [];
    updateLogData();
  }

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
    logDataGlobal.push(`${logPrefix}STATUS (3=Good): ${status}`);
    logDataGlobal.push(`${logPrefix}TASK REGISTERED: ${isRegistered}`);
    updateLogData();
  };

  //Main button onPress equivalent
  const toggleFetchTask = async () => {
    //Make sure no bad parameters than can mess up fetch task
    if (backgroundFrequency !== undefined && intensity !== undefined) {
      //convert dropdown selection to numerical equivalent in minutes
      const interval = parseInterval(backgroundFrequency);

      //unregister task (stop it from running)
      if (isRegistered) {
        await unregisterBackgroundFetchAsync();
        logDataGlobal.push(`${logPrefix}BACKGROUND FETCH TASK IN NOW UNREGISTERED`);
      } 
      //register task (start the process)
      else {
        await registerBackgroundFetchAsync(interval);
        logDataGlobal.push(`${logPrefix}FREQUENCY: ${backgroundFrequency}`);
        logDataGlobal.push(`${logPrefix}INTENSITY: ${intensity}`);
        logDataGlobal.push(`${logPrefix}BACKGROUND FETCH TASK IS NOW REGISTERED`);
      }
      setLogData(logDataGlobal);
    }
    //pseudo error handling
    else {
      Alert.alert('Hold up!', 'Some parameters are undefined. Cannot start background processes.', [{text: 'OK', style: 'default'}]);
      return;
    }
    
    //Check status each time process is started or stopped
    checkStatusAsync();
  };


  function toggleLog() {
    if(logVisibe)
      setLogVisible(false)
    else
      setLogVisible(true)
  }

  //For testing purposes only, stops app from starting/stopping background task for debugging purposes
  function doTheThing() {
    logDataGlobal.push("TEST");
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
    }
  }
  />

  //main screen
  let screen = <MainUI
      dropdown1={frequencyDropdown}
      dropdown2={intensityDropdown}
      toggleFetchTask={toggleFetchTask}
      toggleLog={toggleLog}
      isRegistered={isRegistered}
  />

  if(logVisibe) {
    screen = <Log
        toggleLog={toggleLog}
        logData={logData}
        clearLog={clearLog}
    />
  }

  return (
    <SafeAreaView style={styles.rootDisplay}>
      {screen}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  rootDisplay: {
    flex: 1,
    padding: 12
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