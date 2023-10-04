import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function Butt({
  onTouch,
  Title,
  colo,
  backgroundColor,
  borderWidth,
  borderColor,
  elevation,
  width,
}) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        onPress={onTouch}
        style={{
          width: width,
          height: 57,
          backgroundColor: backgroundColor,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 5,
          borderColor: borderColor,
          borderWidth: borderWidth,
          elevation: elevation,
        }}
      >
        <Text style={{ fontSize: 16, color: colo, fontWeight: "600" }}>
          {Title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Butt;
