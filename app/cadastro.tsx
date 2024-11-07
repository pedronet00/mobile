import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import axios from "axios";
import Swal from "sweetalert2";
import BackgroundWrapper from '../app/components/background';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async () => {
    try {
      const payload = {
        razaoSocialCliente: nome,
        email,
        password: senha
      };

      const response = await axios.post('http://localhost:8000/api/register', payload);

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: 'Cadastro realizado com sucesso!',
          text: 'Você será redirecionado para a tela inicial.',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          router.push('http://localhost:8081/');
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Erro!',
        text: error.response?.data?.message || 'Erro ao realizar o cadastro.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleVoltar = () => {
    router.push('http://localhost:8081/');
  };

  return (
    <BackgroundWrapper>
      <View style={{ width: '90%' }}>
        <View style={{ margin: "auto", width: '80%' }}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.campo}
            value={nome}
            onChangeText={setNome}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.campo}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.campo}
            secureTextEntry={true}
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <View style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", width: "90%" }}>
          <TouchableOpacity style={styles.voltarButton} onPress={handleVoltar}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  campo: {
    width: '100%',
    borderColor: '#CCC',
    borderWidth: 1,
    color: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
  },
  button: {
    backgroundColor: '#868a73',
    borderRadius: 15,
    marginTop: 10,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: 120,
  },
  voltarButton: {
    backgroundColor: '#b0b0b0', // Cor diferente para o botão de voltar
    borderRadius: 15,
    marginTop: 10,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: 120,
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
});
