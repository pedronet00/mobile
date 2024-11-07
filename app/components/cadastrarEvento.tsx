import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Picker, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { router, useLocalSearchParams } from 'expo-router';

const CadastrarEvento = () => {
  const { id } = useLocalSearchParams();
  const [nomeEvento, setNomeEvento] = useState('');
  const [descricaoEvento, setDescricaoEvento] = useState('');
  const [localEvento, setLocalEvento] = useState('');
  const [dataEvento, setDataEvento] = useState('');
  const [prioridadeEvento, setPrioridadeEvento] = useState('');
  const [orcamentoEvento, setOrcamentoEvento] = useState('');
  const [locaisEventos, setLocaisEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      router.push('http://localhost:8081'); // Redireciona para a tela de login se não houver token
      return false;
    }
    return true;
  };

  useEffect(() => {
    const fetchLocaisEventos = async () => {
      if (!(await checkAuth())) return;

      try {
        const token = await AsyncStorage.getItem('token');
        const idCliente = await AsyncStorage.getItem('idCliente');

        if (token && idCliente) {
          const responseLocais = await axios.get(`http://localhost:8000/api/locais?idCliente=${idCliente}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setLocaisEventos(responseLocais.data);

          if (id) {
            const responseEvento = await axios.get(`http://localhost:8000/api/eventos/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const evento = responseEvento.data.evento;
            setNomeEvento(evento.nomeEvento);
            setDescricaoEvento(evento.descricaoEvento);
            setLocalEvento(evento.localEvento.toString());
            setDataEvento(evento.dataEvento);
            setPrioridadeEvento(evento.prioridadeEvento.toString());
            setOrcamentoEvento(evento.orcamentoEvento.toString());
          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocaisEventos();
  }, [id]);

  const cadastrarOuAtualizarEvento = async () => {
    if (!(await checkAuth())) return;

    try {
      const token = await AsyncStorage.getItem('token');
      const idCliente = await AsyncStorage.getItem('idCliente');

      if (token && idCliente) {
        const endpoint = id ? `http://localhost:8000/api/eventos/${id}` : 'http://localhost:8000/api/eventos';
        const method = id ? 'put' : 'post';
        const response = await axios[method](endpoint, {
          nomeEvento,
          descricaoEvento,
          localEvento: parseInt(localEvento, 10),
          dataEvento,
          prioridadeEvento: parseInt(prioridadeEvento, 10),
          orcamentoEvento: parseFloat(orcamentoEvento),
          idCliente,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: 'Sucesso!',
            text: `Evento ${id ? 'atualizado' : 'cadastrado'} com sucesso!`,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          router.push('http://localhost:8081/atividades');
        }
      }
    } catch (error) {
      // Exibe a exceção personalizada no Swal
      let errorMessage = 'Erro ao cadastrar ou atualizar evento.';
      
      if (error.response && error.response.data && error.response.data.error) {
        // Caso o erro venha da API com uma mensagem personalizada (ex: conflito de local/data)
        errorMessage = error.response.data.error;
      } else if (error.message) {
        // Caso o erro tenha uma mensagem genérica
        errorMessage = error.message;
      }

      Swal.fire({
        title: 'Erro!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  const excluirEvento = async () => {
    if (!(await checkAuth())) return;

    Swal.fire({
      title: "Excluir Evento",
      text: "Tem certeza de que deseja excluir este evento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Excluir",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = await AsyncStorage.getItem('token');
          const response = await axios.delete(`http://localhost:8000/api/eventos/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.status === 200) {
            Swal.fire({
              title: 'Sucesso!',
              text: 'Evento excluído com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok',
            }).then(() => {
              router.push('http://localhost:8081/atividades');
            });
          }
        } catch (error) {
          Swal.fire({
            title: 'Erro!',
            text: 'Erro ao excluir evento',
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
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('http://localhost:8081/atividades')}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Nome do Evento:</Text>
      <TextInput
        style={styles.input}
        value={nomeEvento}
        onChangeText={setNomeEvento}
        placeholder="Digite o nome do evento"
      />

      <Text style={styles.label}>Descrição do Evento:</Text>
      <TextInput
        style={styles.input}
        value={descricaoEvento}
        onChangeText={setDescricaoEvento}
        placeholder="Digite a descrição do evento"
      />

      <Text style={styles.label}>Local do Evento:</Text>
      <Picker
        selectedValue={localEvento}
        onValueChange={(itemValue) => setLocalEvento(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione o local do evento" value="" />
        {locaisEventos.map((local) => (
          <Picker.Item key={local.id} label={local.nomeLocal} value={local.id.toString()} />
        ))}
      </Picker>

      <Text style={styles.label}>Data do Evento:</Text>
      <TextInput
        style={styles.input}
        value={dataEvento}
        onChangeText={setDataEvento}
        placeholder="Selecione a data"
        keyboardType="default"
        inputMode="none"
        type="date"
      />

      <Text style={styles.label}>Prioridade do Evento:</Text>
      <Picker
        selectedValue={prioridadeEvento}
        onValueChange={(itemValue) => setPrioridadeEvento(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Baixa" value="1" />
        <Picker.Item label="Média" value="2" />
        <Picker.Item label="Alta" value="3" />
        <Picker.Item label="Crítica" value="4" />
      </Picker>

      <Text style={styles.label}>Orçamento do Evento:</Text>
      <TextInput
        style={styles.input}
        value={orcamentoEvento}
        onChangeText={setOrcamentoEvento}
        placeholder="Digite o orçamento do evento"
        keyboardType="numeric"
      />

      {id && (
        <Button title="Excluir Evento" color="#d33" onPress={excluirEvento} />
      )}
      <Button title={id ? "Atualizar Evento" : "Cadastrar Evento"} onPress={cadastrarOuAtualizarEvento} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
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
  picker: {
    height: 50,
    marginBottom: 15,
  },
});

export default CadastrarEvento;
