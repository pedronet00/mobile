import { View, Text, Image, StyleSheet } from 'react-native';

export default function HeaderPIB() {
  return (
    <View style={styles.view}>
      <Image
        style={styles.imagem}
        source={{ uri: 'https://storage.googleapis.com/ecdt-logo-saida/50217c48a05d69951c5a62648ca1bbcfda96b435ba7364ccfc4c5f8d868197fb/PRIMEIRA-IGREJA-BATISTA-DE-PRESIDENTE-PRUDENTE.webp' }} // Corrigido para usar o objeto 'uri'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imagem: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  view:{
    marginBottom: 30,
    marginTop: 50
  }
});
