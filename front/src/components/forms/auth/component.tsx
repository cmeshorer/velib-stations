import axios from 'axios';
import React from 'react';
import {View} from 'react-native';

import {useAuthStore} from '../../../store';
import ActionButton from '../../buttons/action';
import NavigationButton from '../../buttons/navigation';
import BikeIllustration from '../../illustrations/bike';
import Input from '../../input';
import Loader from '../../loader';
import ErrorText from '../../texts/error';
import TitleText from '../../texts/title';
import styles from './styles';
import {AuthFormProps} from './types';

const AuthForm = ({
  authRoute,
  buttonTitle,
  navigationTitle,
  title,
}: AuthFormProps) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);
  const isPartialInfos = !email || !password;

  const setToken = useAuthStore(state => state.storeToken);

  const onAuthenticate = async () => {
    try {
      setIsAuthenticating(true);
      const response = await axios.post(`http://localhost:3000/${authRoute}`, {
        email,
        password,
      });
      const token = response?.data?.authToken?.token;
      localStorage.setItem('token', token);
      setToken(token);
    } catch {
      setError(true);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const onChangeEmail = (text: string) => {
    setError(false);
    setEmail(text);
  };

  const onChangePassword = (text: string) => {
    setError(false);
    setPassword(text);
  };

  return (
    <View style={styles.container}>
      <NavigationButton text={navigationTitle} navigateTo={navigationTitle} />
      <View style={styles.subContainer}>
        <TitleText text={title} />
        <Input
          style={styles.input}
          placeholder="Email"
          onChangeText={onChangeEmail}
          value={email}
        />
        <Input
          style={styles.input}
          placeholder="Mot de passe"
          onChangeText={onChangePassword}
          value={password}
          isPassword
        />
        <View style={styles.buttonContainer}>
          {isAuthenticating ? (
            <Loader />
          ) : (
            <ActionButton
              title={buttonTitle}
              disabled={isPartialInfos}
              onPress={onAuthenticate}
            />
          )}
        </View>
        <BikeIllustration />
        <View style={styles.errorContainer}>
          {error ? <ErrorText /> : null}
        </View>
      </View>
    </View>
  );
};

export default AuthForm;
