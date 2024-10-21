// screens/AddJobScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddJobScreen = ({ navigation }) => {
  const [job, setJob] = useState('');

  const handleAddJob = () => {
    if (job.trim().length > 0) {
      
      navigation.navigate('Details', { newJob: job });
    }
  };

  return (
    <View style={styles.container}>
      <Text style = {styles.title}>ADD YOUR JOB</Text>
      <TextInput
        style={styles.input}
        placeholder="Input your job"
        value={job}
        onChangeText={setJob}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddJob}>
        <Text style={styles.buttonText}>Finish</Text>
        <Icon name="arrow-right" size={15} color="white" />
      </TouchableOpacity>
      <Image source= {require('./assets/NoteFullImg.PNG')} style={{alignContent : "center"}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  title: {
    textAlign : "center",
    fontSize: 32,
    fontWeight: 'bold',
    color: '#171A1F', 
    marginBottom: 30,
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
  }
});

export default AddJobScreen;
