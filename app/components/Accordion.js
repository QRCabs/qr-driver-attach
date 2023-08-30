import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Accordion = ({ title, children, style, block }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    if (block) setExpanded(!expanded);
  };

  return (
    <View style={[styles.container, { borderWidth: expanded ? 0 : 1 }, style]}>
      {/* Header */}
      <TouchableOpacity onPress={toggleAccordion} style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {block && !expanded && <Entypo name="chevron-thin-down" size={24} color="black" />}
        {expanded && <Entypo name="chevron-thin-up" size={24} color="black" />}
        {!block && <Entypo name="block" size={24} color="black" />}
      </TouchableOpacity>

      {/* Content (Visible when expanded) */}
      {expanded &&
        children.map((child, i) => (
          <View key={i} style={styles.content}>
            {child}
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#064347",
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  header: {
    padding: 16,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "normal",
  },
  content: {
    fontSize: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#064347",
    marginVertical: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default Accordion;
