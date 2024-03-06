import {
  FormControl,
  VStack,
  Heading,
  Text,
  Input,
  InputField,
  InputSlot,
  InputIcon,
  EyeIcon,
  EyeOffIcon,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, SafeAreaView, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { SignInForm } from '../../components/signInForm';

export const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleLogInWithEmailAndPassword = async () => {
    try {
      setLoading(true);
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SignInForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
