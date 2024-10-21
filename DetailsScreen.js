// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import useFetch from './useFetch'

const API_URL = 'https://run.mocky.io/v3/8537bb1a-ced4-42db-8661-bb1ffe25f303';

const JobItem = ({ job, onEdit, isEditing, onSave, onDelete }) => {
  const [jobText, setJobText] = useState(job.title);

  return (
    <View style={styles.jobContainer}>
      <Icon style = {styles.checkBox} name = "check" size = {20} color= "#14923E"/>
      {isEditing ? (
        <TextInput
          value={jobText}
          onChangeText={(text) => setJobText(text)}
        />
      ) : (
        <Text style={styles.jobText}>{job.title}</Text>
      )
      }

      <TouchableOpacity
        onPress={isEditing 
        ? () => onSave(job.id, jobText) 
        : () => onEdit(job.id)
        }
      >
      <Text>{isEditing 
        ? 
        <View style={{ flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => onSave(job.id, jobText)}>
            <Icon name="save" size={20} color="red" style = {{marginRight : 10}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(job.id)}>
            <Icon name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View> 
        : <Icon name="edit" size={20} color="red"/>}
      </Text>
      </TouchableOpacity>

    </View>
  );
};

const DetailsScreen = ({ navigation, route }) => {
  const [search, setSearch] = useState('');
  const { data: jobList, loading, error } = useFetch('https://run.mocky.io/v3/8537bb1a-ced4-42db-8661-bb1ffe25f303');
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (jobList) {
      setJobs(jobList);
    }
  }, [jobList]);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );
  
  const renderItem = ({ item }) => (
    <JobItem
      job={item}
      isEditing={item.isEditing}
      onEdit={handleEdit}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
  const { userName } = route.params

  const handleEdit = (jobId) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, isEditing: true } : job
      )
    );
  };

  const handleSave = async (jobId, newText) => {
    const updatedJob = { id: jobId, title: newText, isEditing: false };

        // Gửi yêu cầu PUT để cập nhật công việc trên Mock API
    await axios.put(`${API_URL}`, [updatedJob]);

    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId
          ? { ...job, title: newText, isEditing: false }
          : job
      )
    );
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}`, { data: { id } }); // Dữ liệu cần xóa

    setJobs((prevJobs) => prevJobs.filter((item) => item.id !== id));
  };



  useEffect(() => {
    if (route.params.newJob) {
      // Add the new job to the list
      const newJob = { id: Math.random().toString(), title: route.params.newJob, isEditing : false };
      setJobs((prevJobs) => [...prevJobs, newJob]);
    }
  }, [route.params.newJob]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching data: {error.message}</Text>;

  return (
    
    <View style={styles.container}>
    {/* Header */}
      <View style={styles.header}>
        <Image source = {require('./assets/Avatar.PNG')}/>
        <View>
          <Text style={styles.greetingText}>Hi {userName}</Text>
          <Text style={styles.subText}>Have a great day ahead</Text>
        </View>
        
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {/* Display Job List */}
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem = {renderItem}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddJob')}>
        <Icon name="plus" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignContent : "center"
  },

  header: {
    marginBottom: 20,
    flexDirection : 'row',
    justifyContent : 'center'
  },
  greetingText: {
    marginLeft : 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 16,
    color: 'gray',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    padding: 10,
  },

  jobContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#DEE1E678',
    borderRadius: 10,
    marginVertical: 5,
  },

  jobText: {
    fontSize: 18,
  },

  checkBox : {
    borderWidth : 2,
    borderColor : "#14923E"
  },  

  addButton: {
    position: 'absolute',
    bottom: 50,
    right: 125,
    backgroundColor: '#0b84ff',
    borderRadius: 50,
    padding: 20,
  },
});

export default DetailsScreen;
