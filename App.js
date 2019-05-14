import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, DeviceEventEmitter} from 'react-native';

import { SensorManager } from 'NativeModules';

import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes
} from "react-native-sensors";
// import { Accelerometer } from "react-native-sensors";

import { map, filter } from "rxjs/operators";

// отключаем варнинги
console.disableYellowBox = true;

const Value = ({name, value}) => (
  <View style={styles.valueContainer}>
    <Text style={styles.valueName}>{name}:</Text>
    <Text style={styles.valueValue}>{new String(value).substr(0, 8)}</Text>
  </View>
)


export default class App extends Component {
  constructor(props) {
    super(props);

    /*new Accelerometer({
      updateInterval: 400 // defaults to 100ms
    })
    .then(observable => {
      observable.subscribe(({x,y,z}) => this.setState({x,y,z}));
    })
    .catch(error => {
      console.log("The sensor is not available");
    });

    const subscription = accelerometer.subscribe(({ x, y, z, timestamp }) =>
      console.log({ x, y, z, timestamp })
    );*/

    this.state = {x: 0, y: 0, z: 0};


    /*setUpdateIntervalForType(SensorTypes.Accelerometer, 400);

    const subscription = accelerometer
      .pipe(map(({ x, y, z }) => x + y + z), filter(speed => speed > 20))
      .subscribe(
        speed => console.log(`You moved your phone with ${speed}`),
        error => {
          console.log("The sensor is not available");
        }
      );

    setTimeout(() => {
      subscription.unsubscribe();
    }, 1000);*/

    SensorManager.startAccelerometer(500);

    DeviceEventEmitter.addListener('Accelerometer', (data) => {
      // console.log(this);
      this.setState({x: data.x, y: data.y, z: data.z});
    });

    // SensorManager.stopAccelerometer();
  }

  sensorHandler(data) {
    this.setState({x: data.x, y: data.y, z: data.z});
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>
          Acc
        </Text>
        <Value name="x" value={this.state.x} />
        <Value name="y" value={this.state.y} />
        <Value name="z" value={this.state.z} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  headline: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  valueContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  valueValue: {
    width: 200,
    fontSize: 20
  },
  valueName: {
    width: 50,
    fontSize: 20,
    fontWeight: 'bold'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

