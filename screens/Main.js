import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      faces: [],
    };
  }

  componentDidMount() {
    Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermission);
  }

  onCameraPermission = (status) => {
    this.setState({ hasCameraPermission: status.status === 'granted' });
  };
  onFaceDetected = (faces) => {
    this.setState({ faces: faces });
  };
  onFaceDetectionError = (error) => {
    console.log(error);
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return (
        <View style={styles.container}>
          <Text> No access to camera</Text>
        </View>
      );
    }
    console.log(this.state.faces);
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.headingContainer}>
          <Text style={styles.titleText}>Look Me....</Text>
        </View>
        <View style={styles.cameraStyle}>
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.front}
            faceDetectorSettings={
              {
                //mode: FaceDetector.Constants.Mode.fast,
                //detectLandmarks: FaceDetector.Constants.Landmarks.all,
                //runClassifications: FaceDetector.Constants.Classifications.all
              }
            }
            onFacesDetected={this.onFacesDetected}
            onFacesDetectionError={this.onFacesDetectionError}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headingContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    marginTop: 15,
    paddingVertical: 7,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 20,
    backgroundColor: 'yellow',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    
  },
  cameraStyle: {
    flex: 0.65,
    marginTop:30,
  },
  filterContainer: {},
  actionContainer: {},
});
