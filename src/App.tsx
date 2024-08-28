import { MapScreen } from "./screens/MapScreen/MapScreen";
import React from 'react'
import { LocationPermissionsService } from "./services/LocationPermissionService";
import { ThemeProvider } from "./theme/ThemeProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserLocationStateContextProvider } from "./context/UserLocationContext";

export const App = () => {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <UserLocationStateContextProvider>
                    <MapScreen />
                    <LocationPermissionsService />
                </UserLocationStateContextProvider>
            </ThemeProvider>
        </SafeAreaProvider>
    )
}

export default App;