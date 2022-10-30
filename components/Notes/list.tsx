import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import useNotes from "../../hooks/useNotes";

export const Posts = ({}) => {
  const { data, isLoading, isSuccess } = useNotes();

  console.log(data);
  return (
    <View style={styles.container}>
      {isLoading && (
        <React.Fragment>
          <Text>Loading...</Text>
        </React.Fragment>
      )}

      {isSuccess && (
        <React.Fragment>
          <Text style={styles.header}>All Notes</Text>
          <FlatList
            data={data}
            style={styles.wrapper}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {}} style={styles.post}>
                <View style={styles.item}>
                  <Text style={styles.postTitle}>{item.note}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </React.Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.white,
    padding: 10,
  },
  wrapper: {
    flex: 1,
    paddingVertical: 30,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  header: {
    textAlign: "center",
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: 30,
    // color: colors.primary,
    paddingVertical: 10,
  },
  post: {
    // backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  postTitle: {
    color: "#000",
    textTransform: "capitalize",
  },
});

export default Posts;
