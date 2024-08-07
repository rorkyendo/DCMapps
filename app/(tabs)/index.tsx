import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
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
        <ThemedText type="title">Panduan Pengguna</ThemedText>
      </ThemedView>
      <ThemedView style={[styles.stepContainer]}>
        <ThemedText type="subtitle">Judul Aplikasi</ThemedText>
        <ThemedText  style={{marginBottom:10}}>
            PEMANFAATAN ALGORITMA EFFICIENTDET UNTUK
            DETEKSI CACAR MONYET DAN PENYAKIT KULIT
            SERUPA MELALUI CITRA LESI KULIT BERBASIS
            ANDROID
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Tujuan</ThemedText>
        <ThemedText  style={{marginBottom:10}}>
            Penelitian ini bertujuan untuk mengimplementasikan algoritma EfficientDet pada
            proses deteksi penyakit kulit Cacar Monyet, dan penyakit kulit serupa, seperti Cacar
            air, Hand Foot Mouth Disease/Flu Singapura dan Normal.        
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Cara Penggunaan</ThemedText>
        <ThemedText  style={{marginBottom:10}}>
            Masuk ke menu scan yang ada pada navigasi bar, kemudian arahkan kamera dan capture foto untuk di lakukan
            proses deteksi apakah objek tersebut mengalami penyakit kulit Cacar Monyet, dan penyakit kulit serupa, seperti Cacar
            air, Hand Foot Mouth Disease/Flu Singapura atau Normal.
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
