import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './screens/home';
import { SignIn } from './screens/signIn';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#191919',
            },
            headerTintColor: '#fff',
          }}
        >
          <Stack.Screen
            name='Home'
            component={Home}
            options={{
              title: '',
            }}
          />
          <Stack.Screen name='SignIn' component={SignIn} options={{ title: 'Sign In' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
