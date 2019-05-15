import React, {Component} from 'react';
import {Platform, StyleSheet, ScrollView, View, Text, DeviceEventEmitter} from 'react-native';

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

    /*
      new Accelerometer({
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
      );


      **********


      setUpdateIntervalForType(SensorTypes.Accelerometer, 400);

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
      }, 1000);
    */

    // https://github.com/kprimice/react-native-sensor-manager

    this.state = {
      AccelerometerData: {
        x: 0,
        y: 0,
        z: 0
      },
      GyroscopeData: {
        x: 0,
        y: 0,
        z: 0
      },
      MagnetometerData: {
        x: 0,
        y: 0,
        z: 0
      },
      OrientationData: {
        azimuth: 0,
        pitch: 0,
        roll: 0
      },
      StepCounterData: {
        steps: 0
      },
      ThermometerData: {
        term: 0
      },
      LightSensorData: {
        light: 0
      },
      ProximityData: {
        isNear: false,      // [Boolean] A flag representing whether something is near the screen
        value: 0,           // The raw value returned by the sensor (usually distance in cm)
        maxRange: 0         //The maximum range of the sensor
      }
    };

    SensorManager.startAccelerometer(500);
    SensorManager.startGyroscope(500);
    SensorManager.startMagnetometer(500);
    SensorManager.startOrientation(500);
    SensorManager.startStepCounter(500);
    SensorManager.startThermometer(500);
    SensorManager.startLightSensor(500);
    SensorManager.startProximity(500);

    DeviceEventEmitter.addListener('Accelerometer', (data) => {
      this.setState({AccelerometerData: {x: data.x, y: data.y, z: data.z}});
    });
    DeviceEventEmitter.addListener('Gyroscope', (data) => {
      this.setState({GyroscopeData: {x: data.x, y: data.y, z: data.z}});
    });
    DeviceEventEmitter.addListener('Magnetometer', (data) => {
      this.setState({MagnetometerData: {x: data.x, y: data.y, z: data.z}});
    });
    DeviceEventEmitter.addListener('Orientation', (data) => {
      this.setState({OrientationDataData: {azimuth: data.azimuth, pitch: data.pitch, roll: data.roll}});
    });
    DeviceEventEmitter.addListener('StepCounter', (data) => {
      this.setState({StepCounterData: {steps: data.steps}});
    });
    DeviceEventEmitter.addListener('Thermometer', (data) => {
      this.setState({ThermometerData: {term: data.term}});
    });
    DeviceEventEmitter.addListener('LightSensor', (data) => {
      this.setState({LightSensorData: {light: data.light}});
    });
    DeviceEventEmitter.addListener('Proximity', (data) => {
      this.setState({ProximityData: {isNear: data.isNear, value: data.value, maxRange: data.maxRange}});
    });


    // SensorManager.stopAccelerometer();
  }

  sensorHandler(data) {
    this.setState({x: data.x, y: data.y, z: data.z});
  }


  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.headline}>
              Accelerometer
            </Text>
            <Value name="x" value={this.state.AccelerometerData.x} />
            <Value name="y" value={this.state.AccelerometerData.y} />
            <Value name="z" value={this.state.AccelerometerData.z} />
          </View>

          <View>
            <Text style={styles.headline}>
              Gyroscope
            </Text>
            <Value name="x" value={this.state.GyroscopeData.x} />
            <Value name="y" value={this.state.GyroscopeData.y} />
            <Value name="z" value={this.state.GyroscopeData.z} />
          </View>

          <View>
            <Text style={styles.headline}>
              Magnetometer
            </Text>
            <Value name="x" value={this.state.MagnetometerData.x} />
            <Value name="y" value={this.state.MagnetometerData.y} />
            <Value name="z" value={this.state.MagnetometerData.z} />
          </View>

          <View>
            <Text style={styles.headline}>
              Orientation
            </Text>
            <Value name="azimuth" value={this.state.OrientationData.azimuth} />
            <Value name="pitch" value={this.state.OrientationData.pitch} />
            <Value name="roll" value={this.state.OrientationData.roll} />
          </View>

          <View>
            <Text style={styles.headline}>
              Step
            </Text>
            <Value name="steps" value={this.state.StepCounterData.steps} />
          </View>

          <View>
            <Text style={styles.headline}>
              Thermometer
            </Text>
            <Value name="term" value={this.state.ThermometerData.term} />
          </View>

          <View>
            <Text style={styles.headline}>
              Light
            </Text>
            <Value name="light" value={this.state.LightSensorData.light} />
          </View>

          <View>
            <Text style={styles.headline}>
              Proximity
            </Text>
            <Value name="isNear" value={this.state.ProximityData.isNear} />
            <Value name="value" value={this.state.ProximityData.value} />
            <Value name="maxRange" value={this.state.ProximityData.maxRange} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  headline: {
    fontSize: 26,
    // textAlign: 'center',
    margin: 10,
  },
  valueContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  valueValue: {
    // width: 200,
    fontSize: 20
  },
  valueName: {
    // width: 50,
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 10,
    // marginLeft: 10,
  }
});

