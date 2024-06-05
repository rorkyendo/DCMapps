import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Image, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ScanScrollView from '@/components/ScanScrollView';

export default function ScanScreen() {
  const [image, setImage] = useState<any | null>(null);
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access media library is required!');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const source = { uri: result.assets[0].uri };
      console.log(source);
      setImage(source);
    }
  };

  return (
    <ScanScrollView headerBackgroundColor={{ light: '#4C967D', dark: '#1D3D47' }}>
      <ThemedView style={[styles.titleContainer, { justifyContent: "center" }]}>
        <ThemedText type="title">Scan Kamera</ThemedText>
      </ThemedView>
      <View style={styles.container}>
        <View style={{ flex: 1,marginBottom:20 }}>
          {image ? (
            <Image
              source={{ uri: image.uri }}
              style={{
                width: width * 0.8,
                height: height * 0.5,
                resizeMode: "cover"
              }}
            />
          ):(
              <View>
                <Text>Tidak ada gambar</Text>
              </View>
            )
          }
        </View>
        <View style={{marginBottom:10}}>
          <Button title="Ambil Gambar" onPress={pickImage} />
        </View>
        <View>
          <Button title="Proses Gambar" color="red" onPress={pickImage} />
        </View>
      </View>
    </ScanScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
