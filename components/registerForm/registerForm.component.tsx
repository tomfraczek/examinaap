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
import { Text, View, TextInput, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

const RegisterFormSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])/, {
      message: 'Password must contain at least one lowercase letter',
      excludeEmptyString: true,
      exclude: /(?=.*[A-Z])/, // Exclude uppercase letters from the error message
    })
    .matches(/(?=.*[A-Z])/, {
      message: 'Password must contain at least one uppercase letter',
      excludeEmptyString: true,
      exclude: /(?=.*\d)/, // Exclude numbers from the error message
    })
    .matches(/^(?=.*\d)/, {
      message: 'Password must contain at least one number',
      excludeEmptyString: true,
      exclude: /(?=.*[^a-zA-Z0-9\s])/, // Exclude special characters from the error message
    })
    .matches(/^(?=.*[^a-zA-Z0-9\s])/, {
      message: 'Password must contain at least one special character',
      excludeEmptyString: true,
      exclude: /(?=.{8,})/, // Exclude length requirement from the error message
    }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

export const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(RegisterFormSchema),
  });
  const password = watch('password', '');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      const response = await createUserWithEmailAndPassword(auth, email.toLowerCase(), password);
      // .then(() => navigation.navigate('signUpSuccess'));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.formContainer}>
      <VStack
        p='$4'
        borderWidth='$1'
        borderRadius='$lg'
        borderColor='$borderLight300'
        $dark-borderWidth='$1'
        $dark-borderRadius='$lg'
        $dark-borderColor='$borderDark800'
      >
        <Text style={styles.header}>Create a new account</Text>

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
        {errors.email && <Text style={styles.errorMessage}>{errors.email.message}</Text>}

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
        {errors.password && <Text style={styles.errorMessage}>{errors.password.message}</Text>}
        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: 'Password is required',
            validate: (value) => value === password || 'The passwords do not match',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <VStack space='xs'>
              <Text style={styles.inputName}>Confirm password</Text>
              <Input>
                <InputField
                  type={showPassword ? 'text' : 'password'}
                  color='#fff'
                  placeholder='Confirm Password'
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
          name='confirmPassword'
        />
        {errors.confirmPassword && <Text style={styles.errorMessage}>{errors.confirmPassword.message}</Text>}
        {loading ? (
          <ActivityIndicator style={styles.spinner} size='large' color='#fff' />
        ) : (
          <Button ml='auto' mt={25} onPress={handleSubmit(onSubmit)}>
            <ButtonText color='$white'>Submit</ButtonText>
          </Button>
        )}
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
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
