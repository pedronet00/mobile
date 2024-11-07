import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import HeaderPIB from '../components/header';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface Local {
  id: number;
  nomeLocal: string;
  statusLocal: number;
}

export default function Locais() {
  const [locais, setLocais] = useState<Local[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Usando o router para navegação

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        router.push('http://localhost:8081'); // Redireciona para a página de login se o usuário não estiver autenticado
      }
    };

    const fetchLocais = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const idCliente = await AsyncStorage.getItem('idCliente');

        if (token && idCliente) {
          const response = await axios.get(`http://localhost:8000/api/locais?idCliente=${idCliente}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setLocais(response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar os locais:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication(); // Verifica a autenticação
    fetchLocais(); // Carrega os dados dos locais
  }, []);

  const renderLocal = ({ item }: { item: Local }) => (
    <TouchableOpacity
      style={styles.localContainer}
      onPress={() => router.push({ pathname: '../components/cadastrarLocal', params: { id: item.id } })} // Redireciona para a página de edição ao clicar no local
    >
      <Text style={styles.nome}>{item.nomeLocal}</Text>
      <Text style={styles.status}>Status: {item.statusLocal === 1 ? 'Ativo' : 'Inativo'}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <HeaderPIB />
      
      {/* Botão para criar um novo local */}
      <Button
        title="Criar Novo Local"
        onPress={() => router.push('http://localhost:8081/components/cadastrarLocal')}
      />
      
      {/* Botão para voltar para a listagem de eventos */}
      <TouchableOpacity
  style={styles.voltarAtividades}
  onPress={() => router.push('http://localhost:8081/atividades')}
>
  <Text style={styles.buttonText}>VOLTAR PARA ATIVIDADES</Text>
</TouchableOpacity>

      
      <FlatList
        data={locais}
        renderItem={renderLocal}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  localContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    color: '#666',
  },
  voltarAtividades: {
    marginTop: '5%',
    backgroundColor: '#007bff', // Cor de fundo do botão
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    color: '#FFF'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
