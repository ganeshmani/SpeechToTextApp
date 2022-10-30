import React, { Component } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MotiView } from "@motify/components";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";

import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";
import { Easing } from "react-native-reanimated";

type Props = {
  onSpeechStart: () => void;
  onSpeechEnd: (result: any[]) => void;
};
type State = {
  recognized: string;
  pitch: string;
  error: string;
  end: string;
  started: boolean;
  results: string[];
  partialResults: string[];
};

class Record extends Component<Props, State> {
  state = {
    recognized: "",
    pitch: "",
    error: "",
    end: "",
    started: false,
    results: [],
    partialResults: [],
  };

  constructor(props: Props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = (e: any) => {
    console.log("onSpeechStart: ", e);
    this.setState({
      started: true,
    });
  };

  onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    console.log("onSpeechRecognized: ", e);
    this.setState({
      recognized: "√",
    });
  };

  onSpeechEnd = (e: any) => {
    console.log("onSpeechEnd: ", e);
    this.setState({
      end: "√",
      started: false,
    });

    this.props.onSpeechEnd(this.state.results);
  };

  onSpeechError = (e: SpeechErrorEvent) => {
    console.log("onSpeechError: ", e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = (e: SpeechResultsEvent) => {
    console.log("onSpeechResults: ", e);
    this.setState({
      results: e.value!,
    });
  };

  onSpeechPartialResults = (e: SpeechResultsEvent) => {
    console.log("onSpeechPartialResults: ", e);
    this.setState({
      partialResults: e.value!,
    });
  };

  onSpeechVolumeChanged = (e: any) => {
    console.log("onSpeechVolumeChanged: ", e);
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    this.setState({
      recognized: "",
      pitch: "",
      error: "",
      started: false,
      results: [],
      partialResults: [],
      end: "",
    });

    try {
      await Voice.start("en-US");

      this.props.onSpeechStart();
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: "",
      pitch: "",
      error: "",
      started: false,
      results: [],
      partialResults: [],
      end: "",
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.started ? (
          <TouchableHighlight onPress={this._stopRecognizing}>
            <View
              style={{
                width: 75,
                height: 75,
                borderRadius: 75,
                backgroundColor: "#6E01EF",
                alignItems: "center",
                justifyContent: "center",
              }}
              // onPress={this._startRecognizing}
            >
              {[...Array(3).keys()].map((index) => {
                return (
                  <MotiView
                    from={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 4 }}
                    transition={{
                      type: "timing",
                      duration: 2000,
                      easing: Easing.out(Easing.ease),
                      delay: index * 200,
                      repeatReverse: false,
                      loop: true,
                    }}
                    key={index}
                    style={[
                      StyleSheet.absoluteFillObject,
                      { backgroundColor: "#6E01EF", borderRadius: 75 },
                    ]}
                  />
                );
              })}
              <FontAwesome name="microphone-slash" size={24} color="#fff" />
            </View>
          </TouchableHighlight>
        ) : (
          <TouchableHighlight onLongPress={this._startRecognizing}>
            <View
              style={{
                width: 75,
                height: 75,
                borderRadius: 75,
                backgroundColor: "#6E01EF",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome name="microphone" size={24} color="#fff" />
            </View>
          </TouchableHighlight>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {},
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  action: {
    textAlign: "center",
    color: "#0000FF",
    marginVertical: 5,
    fontWeight: "bold",
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  stat: {
    textAlign: "center",
    color: "#B0171F",
    marginBottom: 1,
  },
});

export default Record;
