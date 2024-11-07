import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';

const CadastrarPost = () => {
  const [tituloPost, setTituloPost] = useState('');
  const [subtituloPost, setSubtituloPost] = useState('');
  const [textoPost, setTextoPost] = useState('');
  const [dataPost, setDataPost] = useState('');
  const [imgPost, setImgPost] = useState('');
  const [tipoPost, setTipoPost] = useState('');
  const [tiposPosts, setTiposPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTiposPosts = async () => {
      try {
        const idCliente = await AsyncStorage.getItem('idCliente');
        if (idCliente) {
          const response = await axios.get(`http://localhost:8000/api/tipoPost?idCliente=${idCliente}`);
          setTiposPosts(response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar tipos de posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTiposPosts();
  }, []);

  const cadastrarPost = async () => {
      try {
          const idCliente = await AsyncStorage.getItem('idCliente');
          const autorPost = await AsyncStorage.getItem('idUsuario');
          
          if (idCliente && autorPost) {
              const response = await axios.post(
                  'http://localhost:8000/api/post',
          {
            tituloPost,
            subtituloPost,
            autorPost: parseInt(autorPost, 10),
            dataPost,
            textoPost,
            imgPost,
            tipoPost: parseInt(tipoPost, 10),
            idCliente: parseInt(idCliente, 10),
        }
    );
    console.log("chegou aqui");

        if (response.status === 201 || response.status === 200) {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Post cadastrado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          setTituloPost('');
          setSubtituloPost('');
          setTextoPost('');
          setDataPost('');
          setImgPost('');
          setTipoPost('');
        }
      }
    } catch (error) {
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao cadastrar post',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título do Post:</Text>
      <TextInput
        style={styles.input}
        value={tituloPost}
        onChangeText={setTituloPost}
        placeholder="Digite o título do post"
      />

      <Text style={styles.label}>Subtítulo do Post:</Text>
      <TextInput
        style={styles.input}
        value={subtituloPost}
        onChangeText={setSubtituloPost}
        placeholder="Digite o subtítulo do post"
      />

      <Text style={styles.label}>Data do Post:</Text>
      <TextInput
        style={styles.input}
        value={dataPost}
        onChangeText={setDataPost}
        placeholder="Digite a data do post (AAAA-MM-DD)"
      />

      <Text style={styles.label}>Texto do Post:</Text>
      <TextInput
        style={styles.input}
        value={textoPost}
        onChangeText={setTextoPost}
        placeholder="Digite o conteúdo do post"
        multiline
      />

      <Text style={styles.label}>Imagem do Post (URL):</Text>
      <TextInput
        style={styles.input}
        value={imgPost}
        onChangeText={setImgPost}
        placeholder="Digite a URL da imagem do post"
      />

      <Text style={styles.label}>Tipo de Post:</Text>
      <Picker
        selectedValue={tipoPost}
        onValueChange={(itemValue) => setTipoPost(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione o tipo do post" value="" />
        {tiposPosts.map((tipo) => (
          <Picker.Item key={tipo.id} label={tipo.TipoPost} value={tipo.id.toString()} />
        ))}
      </Picker>

      <Button title="Cadastrar Post" onPress={cadastrarPost} />
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
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default CadastrarPost;
