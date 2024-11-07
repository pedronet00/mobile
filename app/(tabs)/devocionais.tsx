import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import Post from '../components/post';
import HeaderPIB from '../components/header';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Devocionais() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const idCliente = await AsyncStorage.getItem('idCliente');
        if (idCliente) {
          const response = await axios.get(`http://localhost:8000/api/post?idCliente=${idCliente}`);
          setPosts(response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <HeaderPIB />
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('../components/cadastrarPost')} >
        <Text style={styles.buttonText}>+ Novo post</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {posts.map((post) => (
          <Post
            key={post.id}
            userPhoto="https://randomuser.me/api/portraits/men/1.jpg"
            userName={post.autor.name}
            postImage={post.imgPost} // Aqui, use a URL correta se disponível
            postTitle={post.tituloPost}
            postDescription={post.subtituloPost}
            postDate={new Date(post.dataPost).toLocaleDateString()}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: "center",
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
