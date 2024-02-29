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
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { FIREBASE_AUTH as auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const hadleSignUpWithEmail = async () => {
    try {
      setLoading(true);
      const response = await createUserWithEmailAndPassword(auth, email, password);
      // .then(() => navigation.navigate('signUpSuccess'));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <FormControl
        p='$4'
        borderWidth='$1'
        borderRadius='$lg'
        borderColor='$borderLight300'
        $dark-borderWidth='$1'
        $dark-borderRadius='$lg'
        $dark-borderColor='$borderDark800'
        width={'90%'}
      >
        <VStack space='xl'>
          <Heading color='$white' lineHeight='$md'>
            Sign Up
          </Heading>
          <VStack space='xs'>
            <Text color='$white' lineHeight='$xs'>
              Email
            </Text>
            <Input>
              <InputField type='text' color='#fff' onChangeText={(text) => setEmail(text)} />
            </Input>
          </VStack>
          <VStack space='xs'>
            <Text color='$white' lineHeight='$xs'>
              Password
            </Text>
            <Input>
              <InputField
                type={showPassword ? 'text' : 'password'}
                color='#fff'
                onChangeText={(text) => setPassword(text)}
              />
              <InputSlot pr='$3' onPress={handleState}>
                {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} color='$darkBlue500' />
              </InputSlot>
            </Input>
          </VStack>
          <VStack space='xs'>
            <Text color='$white' lineHeight='$xs'>
              Confirm password
            </Text>
            <Input>
              <InputField
                type={showPassword ? 'text' : 'password'}
                color='#fff'
                onChangeText={(text) => setPassword(text)}
              />
              <InputSlot pr='$3' onPress={handleState}>
                {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} color='$darkBlue500' />
              </InputSlot>
            </Input>
          </VStack>
          <Button ml='auto' onPress={hadleSignUpWithEmail}>
            <ButtonText color='$white'>Sign Up</ButtonText>
          </Button>
        </VStack>
      </FormControl>
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
