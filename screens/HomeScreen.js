import { View, Image, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Features from "../components/Features";
import { dummyMessages } from "../constants";
import { TouchableOpacity } from "react-native";
import Voice from "@react-native-voice/voice";

const HomeScreen = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(true);
  const [result, setResult] = useState("");

  const speechStartHandler = (e) => {
    console.log("speech start handler");
  };

  const speechEndHandler = (e) => {
    setRecording(false);
    console.log("speech end handler");
  };

  const speechResultsHandler = (e) => {
    console.log("voice event: ", e);
    const text = e.value[0];
    setResult(text);
  };

  const speechErrorHandler = (e) => {
    console.log("speech error handler ", e);
  };

  const startRecording = async () => {
    setRecording(true);
    try {
      Voice.start("en-GB");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const stopRecording = () => {
    try {
      Voice.stop();
      setRecording(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const stopSpeaking = () => {
    setSpeaking(false);
  };

  const clear = () => {
    setMessages([]);
  };

  useEffect(() => {
    // voice handler events
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;

    return () => {
      //destroy the voice instance
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  console.log("Results: ", result);

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 flex mx-5">
        {/* bot icon */}
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/bot.png")}
            style={{ width: hp(15), height: hp(15) }}
          />
        </View>

        {/* feature || messages  */}
        {messages.length > 0 ? (
          <View className="space-y-2 flex-1">
            <Text
              style={{
                fontSize: wp(5),
              }}
              className="text-gray-700 font-semibold ml-1"
            >
              Assistant
            </Text>

            <View
              style={{ height: hp(58) }}
              className="bg-neutral-200 rounded-3xl p-4"
            >
              <ScrollView
                bounces={false}
                className="space-y-4"
                showsVerticalScrollIndicator={false}
              >
                {messages.map((message, index) => {
                  if (message.role == "assistant") {
                    if (message.content.includes("https")) {
                      // its an ai image
                      return (
                        <View key={index} className="flex-row justify-start">
                          <View className="bg-emerald-100 flex rounded-2xl p-2 rounded-tl-none">
                            <Image
                              source={{ uri: message.content }}
                              className="rounded-2xl"
                              resizeMode="contain"
                              style={{ height: wp(60), width: wp(60) }}
                            />
                          </View>
                        </View>
                      );
                    } else {
                      // text response
                      return (
                        <View key={index} className="flex-row justify-start">
                          <View
                            style={{ width: wp(70) }}
                            className="bg-emerald-100 rounded-xl p-2 rounded-tl-none"
                          >
                            <Text>{message.content}</Text>
                          </View>
                        </View>
                      );
                    }
                  } else {
                    // user input
                    return (
                      <View key={index} className="flex-row justify-end">
                        <View
                          style={{ width: wp(70) }}
                          className="bg-white rounded-xl p-2 rounded-tr-none"
                        >
                          <Text>{message.content}</Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </ScrollView>
            </View>
          </View>
        ) : (
          <Features />
        )}

        {/* recording, clear, and stop buttons  */}
        <View className="flex justify-center items-center">
          {recording ? (
            <TouchableOpacity onPress={stopRecording}>
              {/* recording start button */}
              <Image
                className="rounded-full"
                source={require("../assets/images/voiceLoading.gif")}
                style={{ width: hp(10), height: hp(10) }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={startRecording}>
              {/* recording start button */}
              <Image
                className="rounded-full"
                source={require("../assets/images/recordingIcon.png")}
                style={{ width: hp(10), height: hp(10) }}
              />
            </TouchableOpacity>
          )}

          {messages.length > 0 && (
            <TouchableOpacity
              onPress={clear}
              className="bg-neutral-400 rounded-3xl p-2 absolute right-10"
            >
              <Text className="text-white font-semibold">Clear</Text>
            </TouchableOpacity>
          )}

          {speaking && (
            <TouchableOpacity
              onPress={stopSpeaking}
              className="bg-red-400 rounded-3xl p-2 absolute left-10"
            >
              <Text className="text-white font-semibold">Stop</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
