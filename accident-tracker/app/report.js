import { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

export default function ReportScreen() {
  const [severity, setSeverity] = useState('Critical');
  const [casualties, setCasualties] = useState('1');
  const [accidentType, setAccidentType] = useState('Bus');
  const [vehiclesInvolved, setVehiclesInvolved] = useState('1');

  const handleSubmit = () => {
    const reportData = {
      severity,
      casualties,
      accidentType,
      vehiclesInvolved,
      timestamp: new Date().toISOString()
    };

    console.log('Submitted:', reportData);
    Alert.alert('Success', 'Accident report submitted successfully');
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Report Accident</Text>

      {/* Severity Dropdown */}
      <View style={styles.field}>
        <Text style={styles.label}>Severity:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={severity}
            onValueChange={setSeverity}
          >
            <Picker.Item label="Critical" value="Critical" />
            <Picker.Item label="Moderate" value="Moderate" />
            <Picker.Item label="Minor" value="Minor" />
          </Picker>
        </View>
      </View>

      {/* Casualties Dropdown */}
      <View style={styles.field}>
        <Text style={styles.label}>Casualties:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={casualties}
            onValueChange={setCasualties}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="More than 2" value="More than 2" />
            <Picker.Item label="More than 5" value="More than 5" />
            <Picker.Item label="More than 10" value="More than 10" />
            <Picker.Item label="More than 20" value="More than 20" />
          </Picker>
        </View>
      </View>

      {/* Type of Accident Dropdown */}
      <View style={styles.field}>
        <Text style={styles.label}>Type of Accident:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={accidentType}
            onValueChange={setAccidentType}
          >
            <Picker.Item label="Bus" value="Bus" />
            <Picker.Item label="Car" value="Car" />
            <Picker.Item label="Bike" value="Bike" />
            <Picker.Item label="Transport Heavy Vehicle" value="Transport Heavy Vehicle" />
          </Picker>
        </View>
      </View>

      {/* Vehicles Involved Dropdown */}
      <View style={styles.field}>
        <Text style={styles.label}>Vehicles Involved:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={vehiclesInvolved}
            onValueChange={setVehiclesInvolved}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="More than 4" value="More than 4" />
          </Picker>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Submit Report" onPress={handleSubmit} color="#e53935" />
        <View style={{ height: 10 }} />
        <Button title="Cancel" onPress={() => router.back()} color="#666" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e53935',
    marginBottom: 20,
    textAlign: 'center',
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e53935',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  buttonContainer: {
    marginTop: 20,
  },
});