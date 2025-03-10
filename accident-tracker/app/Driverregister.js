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
  // State for form fields
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [license, setLicense] = useState('');
  const [vehicle, setVehicle] = useState('');
  
  // State for validation errors
  const [errors, setErrors] = useState({});

  // Form validation
  const validate = () => {
    let isValid = true;
    let newErrors = {};
    
    if (!name) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    
    if (!address) {
      newErrors.address = "Address is required";
      isValid = false;
    }
    
    if (!phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits";
      isValid = false;
    }
    
    if (!aadhaar) {
      newErrors.aadhaar = "Aadhaar number is required";
      isValid = false;
    } else if (!/^\d{12}$/.test(aadhaar)) {
      newErrors.aadhaar = "Aadhaar must be 12 digits";
      isValid = false;
    }
    
    if (!license) {
      newErrors.license = "License details are required";
      isValid = false;
    }
    
    if (!vehicle) {
      newErrors.vehicle = "Vehicle details are required";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  // Handle registration submission
  const handleRegister = () => {
    if (validate()) {
      Alert.alert(
        "Registration Successful",
        "Your details have been submitted successfully!",
        [
          { text: "OK", onPress: () => navigation.navigate('Driverlogin') }
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <FontAwesome5 name="user-plus" size={35} color="#e53935" />
            <Text style={styles.headerTitle}>Driver Registration</Text>
            <Text style={styles.headerSubtitle}>Complete your profile to get started</Text>
          </View>

          <View style={styles.formContainer}>
            {/* Name Input */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="person" size={24} color="#e53935" style={styles.icon} />
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={name}
                  onChangeText={setName}
                />
                {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
              </View>
            </View>
            
            {/* Address Input */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="home" size={24} color="#e53935" style={styles.icon} />
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Complete Address"
                  value={address}
                  onChangeText={setAddress}
                />
                {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}
              </View>
            </View>
            
            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="phone" size={24} color="#e53935" style={styles.icon} />
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
                {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
              </View>
            </View>
            
            {/* Aadhaar Input */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="credit-card" size={24} color="#e53935" style={styles.icon} />
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Aadhaar Number"
                  value={aadhaar}
                  onChangeText={setAadhaar}
                  keyboardType="numeric"
                />
                {errors.aadhaar ? <Text style={styles.errorText}>{errors.aadhaar}</Text> : null}
              </View>
            </View>
            
            {/* License Input */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="card-membership" size={24} color="#e53935" style={styles.icon} />
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="License Number"
                  value={license}
                  onChangeText={setLicense}
                />
                {errors.license ? <Text style={styles.errorText}>{errors.license}</Text> : null}
              </View>
            </View>
            
            {/* Vehicle Input */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="directions-car" size={24} color="#e53935" style={styles.icon} />
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Vehicle Details (Model, Year, Color)"
                  value={vehicle}
                  onChangeText={setVehicle}
                />
                {errors.vehicle ? <Text style={styles.errorText}>{errors.vehicle}</Text> : null}
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity 
              onPress={() => router.push('/Driverlogin')} 
              style={styles.loginLink}
            >
              <Text style={styles.loginText}>
                Already registered?{' '}
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
  icon: {
    marginRight: 10,
    marginTop: 15,
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