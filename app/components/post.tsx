import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Componente de Post
const Post = ({ userPhoto, userName, postImage, postTitle, postDescription, postDate }) => {
  return (
    <View style={styles.postContainer}>
      {/* Header do Post: Foto e Nome do Usuário */}
      <View style={styles.postHeader}>
        <Image source={{ uri: userPhoto }} style={styles.userPhoto} />
        <Text style={styles.userName}>{userName}</Text>
      </View>

      {/* Imagem do Post */}
      <Image source={{ uri: postImage }} style={styles.postImage} />

      {/* Detalhes do Post: Título, Descrição e Data */}
      <View style={styles.postContent}>
        <Text style={styles.postTitle}>{postTitle}</Text>
        <Text style={styles.postDescription}>{postDescription}</Text>
        <Text style={styles.postDate}>{postDate}</Text>
      </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 10,
    padding: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 10,
  },
  postContent: {
    paddingHorizontal: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  postDate: {
    fontSize: 12,
    color: '#999',
  },
});

export default Post;
