import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import Metrics from './components/Metrics';
import Settings from './components/Settings';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import SubmitRefuel from './components/SubmitRefuel';
import { supabase } from './library/initSupabase';
import { Session } from '@supabase/supabase-js';
import Login from './components/Login';

const queryClient = new QueryClient();
const Tab = createBottomTabNavigator();

export default function App(): JSX.Element {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Refuel" 
            screenOptions={({ route }: { route: any }) => ({
              tabBarStyle: { backgroundColor: '#1c1c1c' },
              tabBarActiveTintColor: '#ff6347',
              tabBarIcon: ({ focused, color, size }: { focused: any, color: any, size: any}) => {
                if (route.name === 'Dashboard') {
                  return (<Ionicons name='home-sharp' size={size} color={color} />);
                } else if (route.name === 'Refuel') {
                  return (<Ionicons name='car-outline' size={size} color={color} />);
                } else if (route.name === 'Settings') {
                  return (<Ionicons name="settings" size={size} color={color} />);
                } else if (route.name === 'Data') {
                  return (<Ionicons name="analytics" size={size} color={color} />);
                }
              },
            })}>

            {session && session.user ? (
              <>
              <Tab.Screen name="Dashboard" component={Home} options=
              {{
                title: 'Dashboard',
                headerStyle: {
                  backgroundColor: '#ff6347',
                },
                headerTintColor: '#fff' 
              }}/>
              <Tab.Screen name="Refuel" component={SubmitRefuel} options=
              {{
                title: 'Refuel',
                headerStyle: {
                  backgroundColor: '#ff6347',
                },
                headerTintColor: '#fff' 
              }}/>
              <Tab.Screen name="Data" component={Metrics} options=
              {{
                title: 'Data',
                headerStyle: {
                  backgroundColor: '#ff6347',
                },
                headerTintColor: '#fff' 
              }}/>
              <Tab.Screen name="Settings" component={Settings} options=
              {{
                title: 'Settings',
                headerStyle: {
                  backgroundColor: '#ff6347',
                },
                headerTintColor: '#fff' 
              }}/>
            </>
              ) : (
                <>
                  <Tab.Screen name="Login" component={Login} options=
              {{
                title: 'Login',
                headerStyle: {
                  backgroundColor: '#ff6347',
                },
                headerTintColor: '#fff' 
              }}/>
                </>
              )}

          </Tab.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
      <Toast position="bottom" onPress={() => Toast.hide()} />
    </>
  );
}
