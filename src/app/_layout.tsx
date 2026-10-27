 import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

function DrawerLayout() {
  const { theme, isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.text,
          headerTitleStyle: {
            color: theme.text,
          },
          drawerStyle: {
            backgroundColor: theme.background,
          },
          drawerActiveTintColor: theme.primary,
          drawerInactiveTintColor: theme.text,
          sceneStyle: {
            backgroundColor: theme.background,
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Game',
            title: 'Tic-Tac-Toe',
          }}
        />

        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: 'Settings',
            title: 'Settings',
          }}
        />

        <Drawer.Screen
          name="about"
          options={{
            drawerLabel: 'About',
            title: 'About',
          }}
        />
      </Drawer>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <DrawerLayout />
    </ThemeProvider>
  );
}