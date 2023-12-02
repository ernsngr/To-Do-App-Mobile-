import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View, TextInput, Animated } from 'react-native';
import { FlatList } from 'react-native';
import { useEffect } from 'react';
export default function App() {

  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const translateY = new Animated.Value(0);
  const fadeAnim = new Animated.Value(1);

  const onChangeText = (text) => {
    setInputValue(text);
  }

  const handleAddNote = () =>{
    if (inputValue.trim() !== ""){
      setNotes([
        ...notes,
        {
          text: inputValue,
        }
      ]);
      setInputValue('');
      startTranslateAnimation();
    }
  }
  const handleDeleteNote = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };
  const startTranslateAnimation = () => {
    translateY.setValue(-50);
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };


  useEffect(() => {
    startTranslateAnimation();
  }, [notes]);

  return (
      <View style={styles.container}>
        <ScrollView>

          <View style={styles.main}>
            <View style={styles.headerBox}>
              <Text style={styles.topHeader}>To Do App</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
              editable={true}
              multiline
              numberOfLines={4}
              style={styles.inputs}
              value={inputValue}
              onChangeText={onChangeText}
              />
              <Pressable style={styles.addButton} onPress={handleAddNote}>
                <Text style={styles.addButtonHeader}>Add</Text>
              </Pressable>
            </View>
            <View style={styles.taskContainer}>
              <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center',minWidth: "100%" }}
                          showsVerticalScrollIndicator={false}>
              {notes.map((note, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.noteBox,
                    {
                      opacity: fadeAnim,
                      transform: [{ translateY }],
                    },
                  ]}
                >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                  
                    <Text>{note.text}</Text>
                    <Pressable onPress={() => handleDeleteNote(index)}>
                      <Text style={{ color: 'red', marginLeft: 10 }}>Sil</Text>
                    </Pressable>
                  
                 
                </View>
              </Animated.View>
            ))}
            </ScrollView>
            </View>
            <StatusBar style="auto" />
          </View>
                    
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A1CCD1"
  },
  main: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent:"center",
    marginTop: 60,
  },
  headerBox:{
    display: "flex",
    width: "50%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#7C9D96",
    marginBottom: 15,
    borderRadius: 9
  },
  topHeader : {
    display: "flex",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#303030",
  },
  inputContainer:{
    display: "flex",
    width: "100%",
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 40
  },
  inputs:{
    display: "flex",
    minWidth: 200,
    height: 40,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 10,
    backgroundColor: "#f1f1f1",
    textAlign: "center",
    fontSize: 22
  },
  addButton:{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: "20%",
    backgroundColor: "#7C9D96",
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
  },
  addButtonHeader:{
    color: "#303030",
    fontWeight: "bold",
  },
  taskContainer: {
    display: "flex",
    width: "95%",
    height: 450,
    backgroundColor: "#F4F2DE",
    marginTop: 30,
    borderRadius: 10,
    alignItems: "center",
    color: "#C2D9FF",
  },
  taskItem: {
    width: '70%',
    height: 50,
    margin: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: "#C2D9FF"
  },
  noteBox: {
    width: "90%",
    backgroundColor: '#E9B384',
    padding: 20,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 8,
    color: "#C2D9FF",
  },
  scrollTask:{
    display: "flex",
    width: "100%",
  }
});
