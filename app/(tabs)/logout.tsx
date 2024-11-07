import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            await AsyncStorage.removeItem('token'); // Remove token from storage
            router.replace('http://localhost:8081'); // Redirect to login page
        };
        logout();
    }, [router]);

    return null; // No UI needed, as it's just for logout functionality
}
