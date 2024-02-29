import { NavigationProp } from '@react-navigation/native';
import { View } from 'react-native';
import { FIREBASE_AUTH as auth } from '../../firebaseConfig';
import { Button, ButtonText } from '@gluestack-ui/themed';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

export const Dashboard = ({ navigation }: RouterProps) => {
  return (
    <View>
      <Button variant='link' onPress={() => auth.signOut()}>
        <ButtonText>Logout</ButtonText>
      </Button>
    </View>
  );
};
