import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      scanned: false,
      hasCameraPermissions: null,
      scannedData:'',
      buttonState: 'normal',
    };
  }

  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    // granted
    //not granted

    this.setState({
      hasCameraPermissions: status === 'granted',
      buttonState: 'clicked',
      scanned: false,
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    const { buttonState } = this.state;
    
    if (buttonState === 'BookId') {
      this.setState({
        scanned: true,
        scannedData: data,
        buttonState: 'normal',
      });
    } else if (buttonState === 'StudentId') {
      this.setState({
        scanned: true,
        scannedData: data,
        buttonState: 'normal',
      });
    }
  };

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState === 'clicked' && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === 'normal') {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Image
              source={require('../assets/Barcode-scanner.jpg')}
              style={{ width: 200, height: 200 }}
            />
            <Text style={{ textAlign: 'center', fontSize: 30 }}>Billy App</Text>
          </View>

          <View style={styles.inputView}>

            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => {
                this.getCameraPermissions('BookId');
              }}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          </View>

        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayText: {
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  scanButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
  },
  inputView: {
    flexDirection: 'row',
    margin: 20,
  },
  inputBox: {
    width: 200,
    height: 40,
    borderWidth: 1.5,
    borderRightWidth: 0,
    fontSize: 20,
  },
  scanButton: {
    backgroundColor: '#66BB6A',
    width: 50,
    borderWidth: 1.5,
    borderLeftWidth: 0,
  },
});
