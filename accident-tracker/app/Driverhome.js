// app/driverHome.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // adjust path as needed
import { GOOGLE_MAPS_API_KEY } from '@env';
import { router } from 'expo-router';

const DriverHome = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // (Optional) If you still want to subscribe to accident reports for map markers:
  const [accidentReports, setAccidentReports] = useState([]);
  useEffect(() => {
    const q = query(collection(db, 'accidentReports'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reports = [];
      querySnapshot.forEach((doc) => {
        reports.push({ id: doc.id, ...doc.data() });
      });
      setAccidentReports(reports);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setLocation(currentLocation);
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
  }, []);

  const toggleOnlineStatus = () => {
    if (!location && !isOnline) {
      Alert.alert(
        'Location Required',
        'Please enable location services to go online',
        [{ text: 'OK' }]
      );
      return;
    }
    setIsOnline(!isOnline);
  };

  const handleRecordsPress = () => {
    // Navigate to the Accident Records screen
    router.push('/accidentRecords');
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Status:{' '}
          <Text style={isOnline ? styles.online : styles.offline}>
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
            apiKey={GOOGLE_MAPS_API_KEY}
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

      {/* Buttons container */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            isOnline ? styles.onlineButton : styles.offlineButton,
          ]}
          onPress={toggleOnlineStatus}
        >
          <MaterialIcons
            name={isOnline ? 'offline-bolt' : 'offline-pin'}
            size={24}
            color="white"
          />
          <Text style={styles.buttonText}>
            {isOnline ? 'GO Offline' : 'GO Online'}
          </Text>
        </TouchableOpacity>
        {/* Only show Records button if online */}
        {isOnline && (
          <TouchableOpacity
            style={[styles.button, styles.recordsButton]}
            onPress={handleRecordsPress}
          >
            <Text style={styles.buttonText}>Records</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
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
  statusText: { fontSize: 18, fontWeight: '500' },
  online: { color: '#28a745', fontWeight: 'bold' },
  offline: { color: '#dc3545', fontWeight: 'bold' },
  mapContainer: { flex: 1, overflow: 'hidden' },
  map: { width: '100%', height: '100%' },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: { color: '#dc3545', fontSize: 16, textAlign: 'center' },
  buttonsContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  onlineButton: { backgroundColor: '#28a745' },
  offlineButton: { backgroundColor: '#dc3545' },
  recordsButton: { backgroundColor: '#007bff', marginLeft: 10 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
});

export default DriverHome;
