import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      {/* Image in the center */}
      <Image source={require('./assets/NoteFullImg.PNG')} style={styles.image} />

      {/* Title */}
      <Text style={styles.title}>
            MANAGE YOUR {"\n"}
            TASK
      </Text>

      {/* Input field */}
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#171A1F" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>

      {/* Get Started Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details', {userName : name})}>
        <Text style={styles.buttonText}>GET STARTED</Text>
        <Icon name="arrow-right" size={15} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  image: {
    width: 200,
    height: 200,  // Adjust size as necessary
    marginBottom: 20,
  },
  title: {
    textAlign : "center",
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8353E2', // Adjust color to your design
    marginBottom: 30,
  },
    inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9095A0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: '100%',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#000',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00BDD6',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default HomeScreen;
