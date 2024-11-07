import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from "sweetalert2"; // Importando Swal para exibir alertas
import BackgroundWrapper from '../app/components/background';

export default function Index() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password: senha,
      });

      if (response.status === 200) {
        const { idCliente, token, idUsuario } = response.data;

        // Salva o ID e o token no AsyncStorage
        await AsyncStorage.setItem('idCliente', idCliente.toString());
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('idUsuario', token);

        // Exibe o Swal de sucesso e redireciona para o dashboard
        Swal.fire({
          title: 'Login realizado com sucesso!',
          text: 'Você será redirecionado para o dashboard.',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          router.push('/dashboard');
        });
      } else {
        Swal.fire({
          title: 'Erro',
          text: 'Credenciais inválidas',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Erro no login',
        text: error.response?.data?.message || 'Erro ao tentar realizar o login.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleCadastro = () => {
    router.push('/cadastro');
  };

  return (
    <BackgroundWrapper>
      <View style={{ width: '90%' }}>
        <View style={{ margin: "auto", width: '80%' }}>
          <Text style={style.label}>Email</Text>
          <TextInput
            style={style.campo}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={style.label}>Senha</Text>
          <TextInput
            style={style.campo}
            secureTextEntry={true}
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <View style={{ display: 'flex', flexDirection: "row", justifyContent: "flex-end", width: "90%" }}>
          <TouchableOpacity style={style.button} onPress={handleLogin}>
            <Text style={style.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={style.registro}>
          <Text style={style.regularText}>Não tem uma conta? </Text>
          <TouchableOpacity onPress={handleCadastro}>
            <Text style={style.registerText}>Registre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BackgroundWrapper>
  );
}

const style = StyleSheet.create({
  campo: {
    width: '100%',
    borderColor: '#CCC',
    borderWidth: 1,
    color: 'white',
    padding: 10,
    borderRadius: 10
  },
  regularText: {
    fontSize: 20,
    color: '#fff',
    textAlign: "center",
  },
  registerText: {
    fontSize: 20,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  registro: {
    alignItems: 'center',
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
  },
  button: {
    backgroundColor: '#868a73',
    color: '#fff',
    borderRadius: 15,
    marginTop: 10,
    height: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 5,
    width: 120
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
});
