import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import HeaderPIB from '../components/header';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

interface Evento {
  id: string;
  nomeEvento: string;
  descricaoEvento: string;
  dataEvento: string;
  orcamentoEvento: string;
  local: {
    nomeLocal: string;
  };
}

const NovoEvento = () => {
  router.push('../components/cadastrarEvento');
};

const abrirEvento = (id) => {
  router.push({ pathname: '../components/cadastrarEvento', params: { id } });
};

export default function Eventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthAndFetchEventos = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const idCliente = await AsyncStorage.getItem('idCliente');

        if (!token || !idCliente) {
          router.push('http://localhost:8081'); // Redireciona para a tela de login
          return;
        }

        setIsAuthenticated(true); // Autenticação válida

        const response = await axios.get(`http://localhost:8000/api/eventos?idCliente=${idCliente}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEventos(response.data);
      } catch (error) {
        console.error('Erro ao buscar os eventos:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchEventos();
  }, []);

  const renderEvento = ({ item }: { item: Evento }) => (
    <View style={styles.eventoContainer}>
      <Image source={{ uri: 'https://placekitten.com/200/200' }} style={styles.imagem} />
      <View style={styles.infoContainer}>
        <Text style={styles.titulo}>{item.nomeEvento}</Text>
        <Text style={styles.descricao}>{item.descricaoEvento}</Text>
        <Text style={styles.data}>{new Date(item.dataEvento).toLocaleDateString()}</Text>
        <Text style={styles.local}>Local: {item.local.nomeLocal}</Text>
        <Text style={styles.orcamento}>Orçamento: R${item.orcamentoEvento}</Text>
      </View>
      <TouchableOpacity style={styles.icone} onPress={() => abrirEvento(item.id)}>
        <FontAwesome name="eye" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!isAuthenticated) {
    return null; // ou uma tela de carregamento ou placeholder, se necessário
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <HeaderPIB />
      <TouchableOpacity style={styles.button} onPress={() => router.push('../components/locais')}>
        <Text style={styles.buttonText}>Ver locais</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={NovoEvento}>
        <Text style={styles.buttonText}>+ Novo evento</Text>
      </TouchableOpacity>
      <FlatList
        data={eventos}
        renderItem={renderEvento}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  eventoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
  },
  imagem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descricao: {
    fontSize: 14,
    color: '#666',
  },
  data: {
    fontSize: 12,
    color: '#999',
  },
  local: {
    fontSize: 12,
    color: '#333',
  },
  orcamento: {
    fontSize: 12,
    color: '#333',
  },
  icone: {
    padding: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
