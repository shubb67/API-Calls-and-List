import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const API_URL = 'https://numbersapi.p.rapidapi.com';
const API_HOST = 'numbersapi.p.rapidapi.com';
const API_KEY = '0e7529a8d8msh594059cc195517dp1219c5jsnf24c1325987c'; 

const Assignment3 = () => {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [fact, setFact] = useState('');

  useEffect(() => {
    if (month && day) {
      fetchFact();
    }
  }, [month, day]);

  const fetchFact = async () => {
    try {
      const response = await fetch(`${API_URL}/${month}/${day}/date?json`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': API_HOST,
          'X-RapidAPI-Key': API_KEY,
        },
      });
      const data = await response.json();
      setFact(data.text);
    } catch (error) {
      console.error('Error fetching fact:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Interesting Date Facts</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter Month:</Text>
        <TextInput
          style={styles.input}
          placeholder="1-12"
          keyboardType="numeric"
          maxLength={2}
          value={month}
          onChangeText={(text) => setMonth(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter Day:</Text>
        <TextInput
          style={styles.input}
          placeholder="1-31"
          keyboardType="numeric"
          maxLength={2}
          value={day}
          onChangeText={(text) => setDay(text)}
        />
      </View>
      {fact ? <Text style={styles.fact}>{fact}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  fact: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e3f2fd',
    borderRadius: 5,
  },
});

export default Assignment3;