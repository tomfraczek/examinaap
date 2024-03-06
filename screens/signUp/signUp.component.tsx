import { SafeAreaView, StyleSheet } from 'react-native';

import { SignUpForm } from '../../components/signUpForm';

export const SignUp = () => (
  <SafeAreaView style={styles.container}>
    <SignUpForm />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
