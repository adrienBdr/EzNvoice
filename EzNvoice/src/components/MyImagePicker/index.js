import React, {
  useState, useEffect, forwardRef, useImperativeHandle
} from 'react';
import {
  Image, Platform, TouchableHighlight, StyleSheet
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DEFAULT_IMAGE from '../../consts/images';

const MyImagePicker = forwardRef(({ imageLink }, ref) => {
  const [image, setImage] = useState(null);
  const [modified, setModified] = useState(false);

  useImperativeHandle(ref, () => ({
    didModify() {
      return modified;
    },
    getImage() {
      return image;
    }
  }));

  useEffect(() => {
    setImage(imageLink || DEFAULT_IMAGE);
    (async () => {
      if (Platform.OS !== 'web') {
        await ImagePicker.requestCameraRollPermissionsAsync();
      }
    })();
  }, [imageLink]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true
    });

    if (!result.cancelled) {
      console.log(result.base64);
      setImage(result.uri);
      setModified(true);
    }
  };

  return (
    <TouchableHighlight
      onPress={pickImage}
      style={styles.imageContainer}
    >
      <Image source={{ uri: image }} style={styles.image} />
    </TouchableHighlight>
  );
});

const styles = StyleSheet.create({
  imageContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    overflow: 'hidden'
  },
  image: {
    width: 180,
    height: 180
  }
});

export default MyImagePicker;
