import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

import {
  Input,
  InputField,
  InputSlot,
  InputIcon,
  EyeIcon,
  EyeOffIcon,
  Button,
  ButtonText,
  VStack,
} from '@gluestack-ui/themed';
import { FIREBASE_AUTH as auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import * as yup from 'yup';
import { Text, View, KeyboardAvoidingView, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

export const SignInForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const password = watch('password', '');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wrongLogin, setWrongLogin] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  const onSubmit = async ({ email, password }) => {
    try {
      setWrongLogin(false);
      setLoading(true);
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setWrongLogin(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.formContainer}>
      <KeyboardAvoidingView behavior='padding'>
        <VStack
          p='$4'
          borderWidth='$1'
          borderRadius='$lg'
          borderColor='$borderLight300'
          $dark-borderWidth='$1'
          $dark-borderRadius='$lg'
          $dark-borderColor='$borderDark800'
        >
          <Text style={styles.header}>Login</Text>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <VStack space='xs'>
                <Text style={styles.inputName}>Email</Text>
                <Input>
                  <InputField
                    type='text'
                    color='#fff'
                    placeholder='Email'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </Input>
              </VStack>
            )}
            name='email'
          />

          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <VStack space='xs'>
                <Text style={styles.inputName}>Password</Text>
                <Input>
                  <InputField
                    type={showPassword ? 'text' : 'password'}
                    color='#fff'
                    placeholder='Password'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  <InputSlot pr='$3' onPress={handleState}>
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} color='$darkBlue500' />
                  </InputSlot>
                </Input>
              </VStack>
            )}
            name='password'
          />
          {loading ? (
            <ActivityIndicator style={styles.spinner} size='large' color='#fff' />
          ) : (
            <Button ml='auto' mt={25} onPress={handleSubmit(onSubmit)}>
              <ButtonText color='$white'>Login</ButtonText>
            </Button>
          )}
          {wrongLogin && <Text style={styles.errorMessage}>Wrong email or password</Text>}
        </VStack>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '90%',
  },
  header: {
    color: '#fff',
    fontSize: 30,
  },
  inputName: {
    color: '#fff',
    marginTop: 25,
  },
  errorMessage: {
    color: '#ff0000',
  },
  spinner: {
    marginTop: 25,
  },
});
