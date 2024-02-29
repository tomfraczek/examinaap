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
      <KeyboardAvoidingView style={{ width: '90%' }} behavior='padding'>
        <FormControl
          p='$4'
          borderWidth='$1'
          borderRadius='$lg'
          borderColor='$borderLight300'
          $dark-borderWidth='$1'
          $dark-borderRadius='$lg'
          $dark-borderColor='$borderDark800'
        >
          <VStack space='xl'>
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

            {loading ? (
              <ActivityIndicator size='large' color='#0000ff' />
            ) : (
              <>
                <Button ml='auto' onPress={handleLogInWithEmailAndPassword}>
                  <ButtonText color='$white'>Log in</ButtonText>
                </Button>
                <Button
                  onPress={() => navigation.navigate('SignUp')}
                  size='md'
                  variant='link'
                  action='primary'
                  isDisabled={false}
                  isFocusVisible={false}
                >
                  <ButtonText>Create a new account</ButtonText>
                </Button>
              </>
            )}
          </VStack>
        </FormControl>
      </KeyboardAvoidingView>
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
