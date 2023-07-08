import { View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "react-native";
const Features = () => {
  return (
    <View style={{ height: hp(60) }} className="space-y-4">
      <Text
        style={{ fontSize: wp(6.5) }}
        className="font-semibold text-gray-700 mt-2"
      >
        Features
      </Text>

      <View className="bg-emerald-200 p-4 rounded-xl space-y-4">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require("../assets/images/chatgptIcon.png")}
            style={{ width: hp(4), height: hp(4) }}
          />
          <Text
            style={{ fontSize: wp(4.8) }}
            className="font-semibold text-gray-700 "
          >
            ChatGPT
          </Text>
        </View>

        <Text
          style={{ fontSize: wp(3.8) }}
          className="font-medium text-gray-700 mt-2"
        >
          ChatGPT is a language model developed by OpenAI that uses deep
          learning techniques to generate human-like text responses to user
          inputs.
        </Text>
      </View>

      <View className="bg-purple-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require("../assets/images/dalleIcon.png")}
            style={{ width: hp(4), height: hp(4) }}
          />
          <Text
            style={{ fontSize: wp(4.8) }}
            className="font-semibold text-gray-700 "
          >
            DALL-E
          </Text>
        </View>

        <Text
          style={{ fontSize: wp(3.8) }}
          className="font-medium text-gray-700 mt-2"
        >
          DALL·E is an AI model that generates images from text descriptions,
          combining natural language processing and computer vision for creative
          and detailed visuals.
        </Text>
      </View>

      <View className="bg-cyan-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require("../assets/images/smartaiIcon.png")}
            style={{ width: hp(4), height: hp(4) }}
          />
          <Text
            style={{ fontSize: wp(4.8) }}
            className="font-semibold text-gray-700 "
          >
            Smart AI
          </Text>
        </View>

        <Text
          style={{ fontSize: wp(3.8) }}
          className="font-medium text-gray-700 mt-2"
        >
          A powerful voice assistant with the abilities of ChatGPT and Dall-E,
          providing you the best of both worlds
        </Text>
      </View>
    </View>
  );
};

export default Features;
