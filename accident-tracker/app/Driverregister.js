import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView,
  Alert
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

const RegisterScreen = ({ navigation }) => {
  const [details, setDetails] = useState({ 
    name: '', 
    address: '', 
    phone: '', 
    aadhaar: '', 
    license: '', 
    vehicle: '' 
  });
  
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    
    if (!details.name) tempErrors.name = "Name is required";
    if (!details.address) tempErrors.address = "Address is required";
    
    if (!details.phone) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(details.phone)) {
      tempErrors.phone = "Phone number must be 10 digits";
    }
    
    if (!details.aadhaar) {
      tempErrors.aadhaar = "Aadhaar number is required";
    } else if (!/^\d{12}$/.test(details.aadhaar)) {
      tempErrors.aadhaar = "Aadhaar must be 12 digits";
    }
    
    if (!details.license) tempErrors.license = "License details are required";
    if (!details.vehicle) tempErrors.vehicle = "Vehicle details are required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRegister = () => {
    if (validate()) {
      // Registration logic would go here
      Alert.alert(
        "Registration Successful",
        "Your details have been submitted successfully!",
        [
          { text: "OK", onPress: () => navigation.navigate('Driverlogin') }
        ]
      );
    }
  };

  const InputField = ({ icon, placeholder, value, onChangeText, keyboardType = "default", error }) => (
    <View style={styles.inputContainer}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <FontAwesome5 name="user-plus" size={35} color="#e53935" />
            <Text style={styles.headerTitle}>Driver Registration</Text>
            <Text style={styles.headerSubtitle}>Complete your profile to get started</Text>
          </View>

          <View style={styles.formContainer}>
            <InputField 
              icon={<MaterialIcons name="person" size={24} color="#e53935" />}
              placeholder="Full Name"
              value={details.name}
              onChangeText={(text) => setDetails({ ...details, name: text })}
              error={errors.name}
            />
            
            <InputField 
              icon={<MaterialIcons name="home" size={24} color="#e53935" />}
              placeholder="Complete Address"
              value={details.address}
              onChangeText={(text) => setDetails({ ...details, address: text })}
              error={errors.address}
            />
            
            <InputField 
              icon={<MaterialIcons name="phone" size={24} color="#e53935" />}
              placeholder="Phone Number"
              value={details.phone}
              onChangeText={(text) => setDetails({ ...details, phone: text })}
              keyboardType="phone-pad"
              error={errors.phone}
            />
            
            <InputField 
              icon={<MaterialIcons name="credit-card" size={24} color="#e53935" />}
              placeholder="Aadhaar Number"
              value={details.aadhaar}
              onChangeText={(text) => setDetails({ ...details, aadhaar: text })}
              keyboardType="numeric"
              error={errors.aadhaar}
            />
            
            <InputField 
              icon={<MaterialIcons name="card-membership" size={24} color="#e53935" />}
              placeholder="License Number"
              value={details.license}
              onChangeText={(text) => setDetails({ ...details, license: text })}
              error={errors.license}
            />
            
            <InputField 
              icon={<MaterialIcons name="directions-car" size={24} color="#e53935" />}
              placeholder="Vehicle Details (Model, Year, Color)"
              value={details.vehicle}
              onChangeText={(text) => setDetails({ ...details, vehicle: text })}
              error={errors.vehicle}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => router.push('/Driverlogin')} 
              style={styles.loginLink}
            >
              <Text style={styles.loginText}>
                Already registered?   
                <Text style={styles.loginTextBold}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 15,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconContainer: {
    marginRight: 10,
    paddingTop: 15,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#e53935',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 25,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#6b7280',
  },
  loginTextBold: {
    color: '#e53935',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;