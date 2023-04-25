import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";

const BlogPostForm = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

  return (
    <View>
      <Text style={styles.label}>Enter Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.label}>Enter Content:</Text>
      <TextInput
        value={content}
        onChangeText={(content) => setContent(content)}
        style={styles.input}
      />
      <Button
        title="Save Blog Post"
        onPress={() => {
          onSubmit(title, content);
        }}
      />
    </View>
  );
};

BlogPostForm.defaultProps = {
  initialValues: {
    title: "",
    content: "",
  },
};

export default BlogPostForm;

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 5,
    borderRadius: 5,
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginHorizontal: 5,
  },
});
