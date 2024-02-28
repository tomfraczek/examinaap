import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './screens/home';
import { SignIn } from './screens/signIn';
import { SignUp } from './screens/signUp';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const SignInStack = createNativeStackNavigator();

// const HomeStackScreen = () => (
//   <HomeStack.Navigator
//     screenOptions={{
//       headerStyle: {
//         backgroundColor: '#191919',
//       },
//       headerTintColor: '#fff',
//     }}
//   >
//     <HomeStack.Screen
//       name='Home'
//       component={Home}
//       options={{
//         title: '',
//       }}
//     />
//     <HomeStack.Screen
//       name='SignIn'
//       options={{
//         title: '',
//       }}
//       component={SignIn}
//     />
//   </HomeStack.Navigator>
// );

// export const SignInStackScreen = () => (
//   <SignInStack.Navigator
//     screenOptions={{
//       headerStyle: {
//         backgroundColor: '#191919',
//       },
//       headerTintColor: '#fff',
//     }}
//   >
//     <SignInStack.Screen name='SignIn' component={SignIn} options={{ title: 'Sign In' }} />
//     <SignInStack.Screen name='SignUp' component={SignUp} options={{ title: 'Sign Up' }} />
//   </SignInStack.Navigator>
// );

export default function App() {
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
              title: 'Home',
            }}
          />
          <Stack.Screen name='SignIn' component={SignIn} options={{ title: 'Sign In' }} />
          <Stack.Screen name='SignUp' component={SignUp} options={{ title: 'Sign Up' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
