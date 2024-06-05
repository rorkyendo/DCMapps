import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function InformasiScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#4C967D', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Informasi</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={[styles.stepContainer]}>
        <ThemedText type="subtitle">Aida Suryana Ritonga</ThemedText>
        <ThemedText  style={{marginBottom:10}}>
            NIM : 171402129
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Pembimbing 1</ThemedText>
        <ThemedText type="subtitle" style={{fontSize:18}}>Ade Sarah Huzaifah S.Kom., M.Kom.</ThemedText>
        <ThemedText  style={{marginBottom:10}}>
            NIP	:	198506302018032001  
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Pembimbing 2</ThemedText>
        <ThemedText type="subtitle" style={{fontSize:18}}>Fahrurrozi Lubis B.IT., M.Sc.IT</ThemedText>
        <ThemedText  style={{marginBottom:10}}>
            NIP	:	198610122018052001  
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 250,
    width: 250,
    bottom: -70,
    left: -40,
    position: 'absolute',
  },
});
