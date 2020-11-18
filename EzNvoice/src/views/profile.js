import React, { useContext, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import BgRight from '../components/Backgrounds/BgRight';
import { SPACING_UNIT } from '../consts/spacing';
import {
  COLOR_PRIMARY, COLOR_RED, COLOR_WHITE
} from '../consts/colors';
import MyImagePicker from '../components/MyImagePicker';
import AppContext from '../context';

const Profile = ({ navigation }) => {
  const context = useContext(AppContext);
  const { user } = context;
  const imageRef = useRef();

  return (
    <View style={styles.defaultContainer}>
      <BgRight />
      <MyImagePicker ref={imageRef} imageLink={user.image} />
      <ActionButton offsetX={10} offsetY={10} buttonColor={COLOR_PRIMARY}>
        <ActionButton.Item
          buttonColor={COLOR_RED}
          title="Se déconnecter"
          onPress={() => {
            context.removeAvoidBackToLogin();
            navigation.popToTop();
          }}
        >
          <Icon
            name="sign-in"
            size={22}
            color={COLOR_WHITE}
          />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING_UNIT,
  },
});

export default Profile;
