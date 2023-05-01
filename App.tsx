import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/context/AuthContext";
import Navigation from "./src/navigation/NavigationContainer";

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    </AuthProvider>
  );
}
