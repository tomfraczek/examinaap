import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './screens/home';
import { SignIn } from './screens/signIn';
import { SignUp } from './screens/signUp';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH as auth } from './firebaseConfig';
import { Dashboard } from './screens/dashboard';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile } from './screens/profile/profile.component';
import { Search } from './screens/search';

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const SignInStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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

// const SignInStackScreen = () => (
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

function DashboardScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Dashboard' component={Dashboard} />
      <Tab.Screen name='Search' component={Search} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

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
          {!user ? (
            <>
              <Stack.Screen
                name='Home'
                component={Home}
                options={{
                  title: 'Home',
                }}
              />
              <Stack.Screen name='SignIn' component={SignIn} options={{ title: 'Sign In' }} />
              <Stack.Screen name='SignUp' component={SignUp} options={{ title: 'Sign Up' }} />
            </>
          ) : (
            <>
              <Stack.Screen name='DashboardScreen' options={{ headerShown: false }} component={DashboardScreen} />
              <Stack.Screen name='Dashboard' component={Dashboard} options={{ title: 'Dashboard' }} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
