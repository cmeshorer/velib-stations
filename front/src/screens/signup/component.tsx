import React from 'react';
import AuthForm from '../../components/forms/auth';
import Page from '../../components/page';
import {SignupScreenProps} from './types';

const SignupScreen = (props: SignupScreenProps) => {
  return (
    <Page>
      <AuthForm
        authRoute="signup"
        buttonTitle="Créer compte"
        navigationTitle="Se connecter"
        title="Créer un compte"
      />
    </Page>
  );
};

export default SignupScreen;
