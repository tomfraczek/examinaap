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
import { SafeAreaView, StyleSheet } from 'react-native';

export const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
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
            Login
          </Heading>
          <VStack space='xs'>
            <Text color='$white' lineHeight='$xs'>
              Email
            </Text>
            <Input>
              <InputField type='text' />
            </Input>
          </VStack>
          <VStack space='xs'>
            <Text color='$white' lineHeight='$xs'>
              Password
            </Text>
            <Input>
              <InputField type={showPassword ? 'text' : 'password'} />
              <InputSlot pr='$3' onPress={handleState}>
                {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} color='$darkBlue500' />
              </InputSlot>
            </Input>
          </VStack>
          <Button ml='auto' onPress={() => {}}>
            <ButtonText color='$white'>Save</ButtonText>
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
