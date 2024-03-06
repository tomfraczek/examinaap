import { SafeAreaView, StyleSheet } from 'react-native';

import { RegisterForm } from '../../components/registerForm';

export const SignUp = () => (
  <SafeAreaView style={styles.container}>
    <RegisterForm />
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
