import React, { ReactNode } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

interface BackgroundWrapperProps {
  children: ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  return (
    <ImageBackground
    source={require('../../assets/images/wallpaper.jpg')}
      style={styles.background}
    >
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ajuste a imagem para cobrir a tela inteira
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Altere conforme necessário
    alignItems: 'center',     // Altere conforme necessário
  },
});

export default BackgroundWrapper;