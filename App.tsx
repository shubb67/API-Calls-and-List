import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';

// API Configuration
const API_KEY: string = 'd35464e860msh2b80dc9c4ca5ec7p1342d0jsn4ca60d14ead';
const API_HOST: string = 'numbersapi.p.rapidapi.com';

// Define the structure of a month object
interface Month {
  label: string;
  value: string;
}

// List of months for dropdown selection
const months: Month[] = [
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

const App: React.FC = () => {
  // State variables
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [fact, setFact] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // Fetch fact when both month and day are selected
  useEffect(() => {
    if (month && day) {
      fetchFact();
    }
  }, [month, day]);

  // Function to fetch a fact from the API
  const fetchFact = async (): Promise<void> => {
    try {
      const response = await fetch(`https://${API_HOST}/${month}/${day}/date`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': API_HOST,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data: string = await response.text(); // API returns plain text
      setFact(data);
    } catch (error) {
      console.error(error);
      setFact('Error fetching fact');
    }
  };

  return (
    <View style={styles.container}>
       {/* Display Fetched Fact */}
       {fact ? <Text style={styles.fact}>{fact}</Text> : null}
      {/* Dropdown Button to Select Month */}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownText}>
          {month ? months.find((m) => m.value === month)?.label : 'Select Month'}
        </Text>
      </TouchableOpacity>

      {/* Modal for Month Selection */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={months}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    setMonth(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Input for Day Selection */}
      <TextInput
        style={styles.input}
        placeholder="Enter Day (1-31)"
        keyboardType="numeric"
        maxLength={2}
        onChangeText={setDay}
        value={day}
      />

     
    </View>
  );
};

// Styles for UI Components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    width: '80%',
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  fact: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center',
    width: '80%',
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default App;
