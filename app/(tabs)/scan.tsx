import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Image, Dimensions, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ScanScrollView from '@/components/ScanScrollView';

type DetectionResult = {
  class: string;
  score: number;
};

const ScanScreen: React.FC = () => {
  const [image, setImage] = useState<{ uri: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<DetectionResult[] | null>(null);
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access media library is required!');
      }
    })();
  }, []);

  const showImagePickerOptions = () => {
    Alert.alert(
      'Pilih Sumber Gambar',
      'Silakan pilih dari mana Anda ingin mengambil gambar:',
      [
        { text: 'Buka Kamera', onPress: () => pickImage("camera") },
        { text: 'Pilih dari Galeri', onPress: () => pickImage("galery") },
        { text: 'Batal', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const pickImage = async (sourceType :any) => {
    let result;
    if (sourceType === "camera") {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });
    }

    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = { uri: result.assets[0].uri };
      setImage(selectedImage);
      setResponse(null); // Clear previous response
    }
  };

  const processImage = async () => {
    if (!image) {
      alert('Please select an image first!');
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append('image', {
      uri: image.uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    } as any);

    try {
      const response = await fetch('https://dcmapp.my.id/prediksi', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result: DetectionResult[] = await response.json();
      setResponse(result);
    } catch (error) {
      console.error(error);
      alert('Failed to process image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScanScrollView headerBackgroundColor={{ light: '#4C967D', dark: '#1D3D47' }}>
      <ThemedView style={[styles.titleContainer, { justifyContent: "center" }]}>
        <ThemedText type="title">Scan Kamera</ThemedText>
      </ThemedView>
      <View style={styles.container}>
        <View style={{ flex: 1, marginBottom: 20 }}>
          {image ? (
            <Image
              source={{ uri: image.uri }}
              style={{
                width: width * 0.8,
                height: height * 0.5,
                resizeMode: "cover",
              }}
            />
          ) : (
            <View>
              <Text>Tidak ada gambar</Text>
            </View>
          )}
        </View>
        <View style={{ marginBottom: 10 }}>
          <Button title="Ambil Gambar" onPress={showImagePickerOptions} />
        </View>
        <View>
          <Button title="Proses Gambar" color="red" onPress={processImage} />
        </View>
        {loading && (
          <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
        )}
        {response && (
          <View style={styles.responseContainer}>
            <Text>Hasil Deteksi:</Text>
            {response.map((res, index) => (
              <Text key={index}>{`Class: ${res.class}, Score: ${res.score}`}</Text>
            ))}
          </View>
        )}
      </View>
    </ScanScrollView>
  );
};

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
  responseContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default ScanScreen;
