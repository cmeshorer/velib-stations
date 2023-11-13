import React from 'react';
import AuthForm from '../../components/forms/auth';
import Page from '../../components/page';
import {LoginScreenProps} from './types';

const LoginScreen = (props: LoginScreenProps) => {
  return (
    <Page>
      <AuthForm
        authRoute="login"
        buttonTitle="Connexion"
        navigationTitle="Créer un compte"
        title="Se connecter"
      />
    </Page>
  );
};

export default LoginScreen;
