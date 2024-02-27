import { StyleSheet, StatusBar, Text, SafeAreaView, Image, View } from 'react-native';
import { Button, ButtonText } from '@gluestack-ui/themed';

export const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.logoContainer}>
        <Text style={styles.logoName}>ExamineApp</Text>
        <Image style={styles.logo} source={require('../../assets/logoTrans.png')} />
      </View>

      <Button ml='auto' onPress={() => navigation.navigate('SignIn')} marginRight={'auto'}>
        <ButtonText color='$white'>Sign In</ButtonText>
      </Button>
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
  logo: {
    width: 55,
    height: 60,
  },
  logoName: {
    color: '#fff',
    fontSize: 30,
    marginRight: 10,
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
