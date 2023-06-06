import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/context/AuthContext";
import Navigation from "./src/navigation/NavigationContainer";
import { ProductProvider } from "./src/context/ProductContext";

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
