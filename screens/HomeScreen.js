import { View, Image, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Features from "../components/Features";

const HomeScreen = () => {
  const [messages, setMessages] = useState([]);

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
        {messages.length > 0 ? <View></View> : <Features />}
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
