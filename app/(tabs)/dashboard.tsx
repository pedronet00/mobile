import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderPIB from "../components/header";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login'); // Redireciona para a tela de login se não houver token
      }
      setLoading(false);
    }; 
    checkAuth();
  }, [navigation]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1, alignContent: "center", alignItems: "center" }}>
      <HeaderPIB />
      <Text style={styles.nome}>Olá, Pedro!</Text>
      <View style={styles.gridContainer}>
        <View style={styles.gridItem}><FontAwesome name="youtube-play" size={30} color="#363453" /><Text style={styles.gridText}>Ao Vivo</Text></View>
        <View style={styles.gridItem}><FontAwesome name="file-text" size={30} color="#363453" /><Text style={styles.gridText}>Boletins</Text></View>
        <View style={styles.gridItem}><FontAwesome name="heart" size={30} color="#363453" /><Text style={styles.gridText}>Orações</Text></View>
        <View style={styles.gridItem}><FontAwesome name="building" size={30} color="#363453" /><Text style={styles.gridText}>Depart.</Text></View>
        <View style={styles.gridItem}><FontAwesome name="laptop" size={30} color="#363453" /><Text style={styles.gridText}>Blog</Text></View>
        <View style={styles.gridItem}><FontAwesome name="book" size={30} color="#363453" /><Text style={styles.gridText}>Leitura anual</Text></View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  nome: { fontSize: 40, color: '#666', marginBottom: 20 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '80%', marginTop: 20, alignItems: 'center' },
  gridItem: { width: '30%', height: 100, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  infos: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '80%', marginTop: 20, alignItems: 'center' },
  gridText: { fontSize: 20, color: '#000', marginTop: 10, textAlign: 'center' },
  viewVersiculo: { width: '80%', margin: "auto", borderLeftWidth: 2, height: 140, paddingLeft: 10 },
  endereco: { fontWeight: 'bold', marginTop: 10 },
  textoProximoCulto: { textAlign: 'center', fontSize: 18 }
});
