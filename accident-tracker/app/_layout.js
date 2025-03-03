import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="first" options={{ headerShown: false }}/>
      <Stack.Screen name="auth" options={{ title: 'Login' }} />
      <Stack.Screen name="main" options={{ title: 'Dashboard' }} />
      <Stack.Screen name="report" options={{ title: 'Report Accident' }} />
      <Stack.Screen name="Driverregister" options={{ headerShown: false }} />
      <Stack.Screen name="Driverlogin" options={{ headerShown: false }} />
    </Stack>
  );
}