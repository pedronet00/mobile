import { Text, TextInput, View, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import axios from "axios"; // Importe o axios
import Swal from "sweetalert2"; // Importe o Swal

export default function Cadastro() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async () => {
    try {
      // Criação do payload para a requisição
      const payload = {
        razaoSocialCliente: nome,  // Você pode ajustar esse campo conforme necessário
        email: email,
        password: senha
      };

      // Envio da requisição POST para o servidor
      const response = await axios.post('http://localhost:8000/api/register', payload);

      // Se a requisição for bem-sucedida, exibe o Swal e redireciona
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: 'Cadastro realizado com sucesso!',
          text: 'Você será redirecionado para a tela inicial.',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          setTimeout(() => {
            router.push('http://localhost:8081/'); // Redireciona para a URL desejada
          }, 200); // Espera 2 segundos antes de redirecionar
        });
      }
    } catch (error) {
      // Se ocorrer um erro, exibe a mensagem de erro no Swal
      Swal.fire({
        title: 'Erro!',
        text: error.response?.data?.message || 'Erro ao realizar o cadastro.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ margin: 10, borderColor: '#999', borderWidth: 1 }}>
        <Text style={{ fontSize: 20, marginBottom: 10, textAlign: 'center', padding: '5%' }}>Cadastro</Text>
        <TextInput
          style={style.campo}
          placeholder="Nome"
          value={nome}
          onChangeText={e => setNome(e)}
        />
        <TextInput
          style={style.campo}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={e => setEmail(e)}
        />
        <TextInput
          style={style.campo}
          placeholder="Senha"
          secureTextEntry={true}
          value={senha}
          onChangeText={e => setSenha(e)}
        />
      </View>

      <View style={{ display: 'flex' }}>
        <TouchableOpacity style={style.button} onPress={handleCadastro}>
          <Text style={style.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  campo: {
    width: '90%',
    borderColor: '#CCC',
    borderWidth: 1,
    margin: 10,
    padding: 10
  },
  button: {
    backgroundColor: '#FCC',
    borderRadius: 15,
    marginTop: 10,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 10,
    width: 120
  },
  texto: {
    fontSize: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
});
