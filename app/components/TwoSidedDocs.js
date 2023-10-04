import { Image, TouchableOpacity, View, StyleSheet, Text } from "react-native";

const TwoSidedDocs = ({
  frontImage,
  setFrontImage,
  backImage,
  setBackImage,
  selectPhoto,
}) => {
  return (
    <View
      style={{
        width: "100%",
        height: 250,
        backgroundColor: "white",
        flexDirection: "row",
        paddingTop: 25,
        justifyContent: "space-evenly",
      }}
    >
      {!frontImage && (
        <TouchableOpacity onPress={() => selectPhoto("front")}>
          <View
            style={{
              height: 114,
              width: 132,
              borderWidth: 2,
              borderColor: "#064347",
              alignItems: "center",
              paddingTop: 17,
              borderStyle: "dashed",
            }}
          >
            {frontImage === null ? (
              <Image
                style={{ height: 32.9, width: 32.9 }}
                source={require("../../assets/uplaod.png")}
              ></Image>
            ) : (
              <Image
                style={{ height: 114, width: 132 }}
                source={{ uri: frontImage }}
              ></Image>
            )}

            <Text style={{ paddingTop: 12, fontWeight: "400" }}>
              Upload front
            </Text>
          </View>
        </TouchableOpacity>
      )}
      {frontImage && (
        <View>
          <TouchableOpacity
            style={styles.removeImageBtn}
            onPress={() => setFrontImage(null)}
          >
            <Text>X</Text>
          </TouchableOpacity>
          <Image
            style={{ width: 132, height: 114 }}
            source={{ uri: frontImage }}
          />
        </View>
      )}
      {!backImage && (
        <TouchableOpacity onPress={() => selectPhoto("back")}>
          {!backImage && (
            <View
              style={{
                height: 114,
                width: 132,
                borderWidth: 2,
                borderColor: "#064347",
                alignItems: "center",
                paddingTop: 17,
                borderStyle: "dashed",
              }}
            >
              <Image
                style={{ height: 32.9, width: 32.9 }}
                source={require("../../assets/uplaod.png")}
              />
              <Text style={{ paddingTop: 12, fontWeight: "400" }}>
                Upload back
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
      {backImage && (
        <View>
          <TouchableOpacity
            style={styles.removeImageBtn}
            onPress={() => setBackImage(null)}
          >
            <Text>X</Text>
          </TouchableOpacity>
          <Image
            style={{ width: 132, height: 114 }}
            source={{ uri: backImage }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  removeImageBtn: {
    position: "absolute",
    right: -5,
    top: -7,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderRadius: 15,
  },
});

export default TwoSidedDocs;
