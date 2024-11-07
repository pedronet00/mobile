import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import HeaderPIB from '../components/header';
import { router } from "expo-router";

// Definindo o tipo da atividade
interface Atividade {
  id: string;
  titulo: string;
  nome: string;
  data: string;
  imagem: string;
}

const Login = () => {
  router.push('/cadastrarAtividade');
}

const atividades: Atividade[] = [
  {
    id: '1',
    titulo: 'Atividade 1',
    nome: 'João Silva',
    data: '19/09/2024',
    imagem: 'https://placekitten.com/200/200',
  },
  {
    id: '2',
    titulo: 'Atividade 2',
    nome: 'Maria Oliveira',
    data: '18/09/2024',
    imagem: 'https://placekitten.com/201/201',
  },
  {
    id: '3',
    titulo: 'Atividade 3',
    nome: 'Carlos Souza',
    data: '17/09/2024',
    imagem: 'https://placekitten.com/202/202',
  },
];

export default function Atividades() {
  // Tipando o item explicitamente como 'Atividade'
  const renderAtividade = ({ item }: { item: Atividade }) => (
    <View style={styles.atividadeContainer}>
      <TouchableOpacity  onPress={Login}>
            <Text>Login</Text>
          </TouchableOpacity>
      <Image source={{ uri: item.imagem }} style={styles.imagem} />
      <View style={styles.infoContainer}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.data}>{item.data}</Text>
      </View>
      <TouchableOpacity style={styles.icone}>
        <FontAwesome name="eye" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
        <HeaderPIB/>
      <FlatList
        data={atividades}
        renderItem={renderAtividade}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  atividadeContainer: {
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
  nome: {
    fontSize: 14,
    color: '#666',
  },
  data: {
    fontSize: 12,
    color: '#999',
  },
  icone: {
    padding: 10,
  },
});
