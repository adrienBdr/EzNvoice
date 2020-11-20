import React, {
  useState, useEffect, forwardRef, useImperativeHandle
} from 'react';
import {
  Image, Platform, TouchableHighlight, StyleSheet
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BottomSheet, ListItem } from 'react-native-elements';
import DEFAULT_IMAGE from '../../consts/images';
import { COLOR_RED, COLOR_WHITE } from '../../consts/colors';

const MyImagePicker = forwardRef(({ imageLink, onSubmit }, ref) => {
  const [image, setImage] = useState(null);
  const [modified, setModified] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true
    });

    if (!result.cancelled) {
      onSubmit(`data:image/png;base64,${result.base64}`);
      setImage(result.uri);
      setModified(true);
    }

    setIsVisible(false);
  };

  const pickPhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true
    });

    if (!result.cancelled) {
      onSubmit(`data:image/png;base64,${result.base64}`);
      setImage(result.uri);
      setModified(true);
    }

    setIsVisible(false);
  };

  const list = [
    {
      title: 'Appareil Photo',
      onPress: pickPhoto
    },
    {
      title: 'Gallerie',
      onPress: pickImage
    },
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: COLOR_RED },
      titleStyle: { color: COLOR_WHITE },
      onPress: () => setIsVisible(false),
    },
  ];

  useImperativeHandle(ref, () => ({
    didModify() {
      return modified;
    },
    getImage() {
      return `data:image/png;base64,${image.base64}`;
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

  return (
    <TouchableHighlight
      onPress={() => setIsVisible(true)}
      style={styles.imageContainer}
    >
      <>
        <Image source={{ uri: image }} style={styles.image} />
        <BottomSheet isVisible={isVisible}>
          {list.map((l) => (
            <ListItem key={l.title} containerStyle={l.containerStyle} onPress={l.onPress}>
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
      </>
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
