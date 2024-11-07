import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Picker } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function CadastrarLocal() {
  const [nomeLocal, setNomeLocal] = useState('');
  const [statusLocal, setStatusLocal] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchLocal = async () => {
      if (id) {
        setLoading(true);
        try {
          const token = await AsyncStorage.getItem('token');
          const response = await axios.get(`http://localhost:8000/api/locais/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const local = response.data;
          setNomeLocal(local.nomeLocal);
          setStatusLocal(local.statusLocal);
        } catch (error) {
          console.error('Erro ao buscar o local:', error);
          Swal.fire({
            title: 'Erro!',
            text: 'Erro ao carregar dados do local',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLocal();
  }, [id]);

  const salvarLocal = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const idCliente = await AsyncStorage.getItem('idCliente');
      const url = id ? `http://localhost:8000/api/locais/${id}` : 'http://localhost:8000/api/locais';
      const method = id ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          nomeLocal,
          statusLocal: id ? statusLocal : 1, // Define 1 para criação, valor selecionado para edição
          idCliente,
        },
      });

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: 'Sucesso!',
          text: `Local ${id ? 'atualizado' : 'criado'} com sucesso!`,
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        router.push('http://localhost:8081/components/locais');
      }
    } catch (error) {
      console.error('Erro ao salvar local:', error);
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao salvar o local',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } finally {
      setLoading(false);
    }
  };

  const excluirLocal = async () => {
    Swal.fire({
      title: 'Excluir Local',
      text: 'Tem certeza de que deseja excluir este local?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Excluir',
      confirmButtonColor: '#d33',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = await AsyncStorage.getItem('token');
          const response = await axios.delete(`http://localhost:8000/api/locais/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            Swal.fire({
              title: 'Sucesso!',
              text: 'Local excluído com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            router.push('http://localhost:8081/components/locais');
          }
        } catch (error) {
          console.error('Erro ao excluir local:', error);
          Swal.fire({
            title: 'Erro!',
            text: 'Erro ao excluir o local',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      }
    });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Local:</Text>
      <TextInput
        style={styles.input}
        value={nomeLocal}
        onChangeText={setNomeLocal}
        placeholder="Digite o nome do local"
      />

      {id && (
        <View>
          <Text style={styles.label}>Status do Local:</Text>
          <Picker
            selectedValue={statusLocal}
            onValueChange={(itemValue) => setStatusLocal(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Ativo" value={1} />
            <Picker.Item label="Inativo" value={0} />
          </Picker>
        </View>
      )}

      <Button
        title={id ? 'Atualizar Local' : 'Cadastrar Local'}
        onPress={salvarLocal}
        disabled={loading}
      />

      {id && (
        <Button
          title="Excluir Local"
          onPress={excluirLocal}
          color="#d33"
          disabled={loading}
        />
      )}

      <Button
        title="Voltar"
        onPress={() => router.push('http://localhost:8081/components/locais')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});
