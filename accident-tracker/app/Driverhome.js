import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Your Google Maps API key - Replace this with your actual API key in your project
const GOOGLE_MAPS_API_KEY = 'AIzaSyArOVvcN9yNxBj8R_1fDf7ptyMnJNOZ6c8';

const HomeScreen = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [accidentReports, setAccidentReports] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "accidentReports"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reports = [];
      querySnapshot.forEach((doc) => {
        reports.push({ id: doc.id, ...doc.data() });
      });
      setAccidentReports(reports);
    });

     // Cleanup on unmount
  
    (async () => {
      try {
        // Request location permissions
        let { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        // Get current location
        let currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        
        setLocation(currentLocation);
        
        // Update map region to center on user's location
        setRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        setErrorMsg('Error getting location: ' + error.message);
      }
    })();
    return () => unsubscribe();
  }, []);

  const toggleOnlineStatus = () => {
    if (!location && !isOnline) {
      Alert.alert(
        "Location Required",
        "Please enable location services to go online",
        [{ text: "OK" }]
      );
      return;
    }
    setIsOnline(!isOnline);
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Status: <Text style={isOnline ? styles.online : styles.offline}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
        </Text>
      </View>
      
      {errorMsg ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      ) : (
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={region}
            showsUserLocation={true}
            showsMyLocationButton={true}
            apiKey={GOOGLE_MAPS_API_KEY} // Adding API key directly to the MapView component
          >
            {location && (
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="You are here"
                description="Your current location"
              />
            )}
            {accidentReports.map((report) => (
          <Marker
            key={report.id}
            coordinate={{
              latitude: report.location?.latitude,
              longitude: report.location?.longitude,
            }}
            pinColor="blue"
          >
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>Accident Details</Text>
                <Text>Severity: {report.severity}</Text>
                <Text>Type: {report.accidentType}</Text>
                <Text>Vehicles: {report.vehiclesInvolved}</Text>
                <Text>Casualties: {report.casualties}</Text>
                <Text style={styles.timestamp}>
                  {new Date(report.timestamp).toLocaleString()}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
          </MapView>
        </View>
      )}
      
      <TouchableOpacity
        style={[
          styles.button,
          isOnline ? styles.offlineButton : styles.onlineButton
        ]}
        onPress={toggleOnlineStatus}
      >
        <MaterialIcons 
          name={isOnline ? "offline-bolt" : "offline-pin"} 
          size={24} 
          color="white" 
        />
        <Text style={styles.buttonText}>
          {isOnline ? 'GO Offline' : 'GO Online'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  statusContainer: {
    padding: 15,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    zIndex: 1,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '500',
  },
  online: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  offline: {
    color: '#dc3545',
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  onlineButton: {
    backgroundColor: '#28a745',
  },
  offlineButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  calloutContainer: {
    width: 200,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 6,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#e53935',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  }
});

export default HomeScreen;