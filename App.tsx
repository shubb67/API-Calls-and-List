import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const API_URL = 'https://numbersapi.p.rapidapi.com';
const API_HOST = 'numbersapi.p.rapidapi.com';
const API_KEY = '0e7529a8d8msh594059cc195517dp1219c5jsnf24c1325987c';

const Assignment3 = () => {
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState('');
  const [fact, setFact] = useState('');

  const months = [
    { label: 'January', value: '1' },
    { label: 'February', value: '2' },
    { label: 'March', value: '3' },
    { label: 'April', value: '4' },
    { label: 'May', value: '5' },
    { label: 'June', value: '6' },
    { label: 'July', value: '7' },
    { label: 'August', value: '8' },
    { label: 'September', value: '9' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];

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
        <Text style={styles.label}>Select Month:</Text>
        <Dropdown
          style={styles.dropdown}
          data={months}
          labelField="label"
          valueField="value"
          placeholder="Select month"
          value={month}
          onChange={item => setMonth(item.value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter Day (1-31):</Text>
        <TextInput
          style={styles.input}
          placeholder="1-31"
          keyboardType="numeric"
          maxLength={2}
          value={day}
          onChangeText={text => setDay(text)}
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
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
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
