import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'react-native-elements';
import { useForm } from 'react-hook-form';
import BgRight from '../components/Backgrounds/BgRight';
import { SPACING_UNIT } from '../consts/spacing';
import {
  COLOR_PRIMARY, COLOR_RED, COLOR_WHITE
} from '../consts/colors';
import MyImagePicker from '../components/MyImagePicker';
import AppContext from '../context';
import ModifiableInfo from '../components/ModifiableInfo';
import ProfileTile from '../components/ProfileTile';
import ChangePwdForm from '../components/ChangePwdForm';

const Profile = ({ navigation }) => {
  const context = useContext(AppContext);
  const { user } = context;
  const imageRef = useRef();
  const [modifyPwd, setModifyPwd] = useState(false);
  const { control, handleSubmit, errors } = useForm();

  const disconnect = () => {
    user.deleteStoredToken().then(() => {
      context.removeAvoidBackToLogin();
      context.setUser({});
      navigation.popToTop();
    });
  };

  const onSubmit = async (data) => {
    if (data.email !== '' && data.name !== '') {
      await user.update(data);
    }
  };

  return (
    <View style={styles.defaultContainer}>
      <BgRight />
      <View style={styles.detailUserContainer}>
        <MyImagePicker ref={imageRef} imageLink={user.image} />
        <ModifiableInfo
          name="name"
          item={`${user.firstName} ${user.lastName}`}
          submitFunction={handleSubmit(async (data) => { await onSubmit(data); })}
          control={control}
          errorMessage={errors.name?.message}
        />
      </View>
      <ProfileTile iconName="envelope">
        <ModifiableInfo
          name="email"
          item={user.email}
          submitFunction={handleSubmit(async (data) => { await onSubmit(data); })}
          control={control}
          errorMessage={errors.email?.message}
          small
        />
      </ProfileTile>
      {
        modifyPwd
          ? <ChangePwdForm onSubmit={onSubmit} endModifs={() => setModifyPwd(false)} />
          : (
            <ProfileTile onPress={() => setModifyPwd(true)} iconName="lock">
              <Text style={styles.textStyle}>********</Text>
            </ProfileTile>
          )
      }
      <ActionButton offsetX={10} offsetY={10} buttonColor={COLOR_PRIMARY}>
        <ActionButton.Item
          buttonColor={COLOR_RED}
          title="Se déconnecter"
          onPress={() => disconnect()}
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
    alignItems: 'center',
    padding: SPACING_UNIT,
  },
  detailUserContainer: {
    margin: SPACING_UNIT * 3,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 19
  }
});

export default Profile;
