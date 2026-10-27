import { StyleSheet, Text, View } from 'react-native';
import appInfo from '../../app.json';
import { useTheme } from '../context/ThemeContext';

export default function AboutScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Tic-Tac-Toe
      </Text>

      <Text style={[styles.text, { color: theme.text }]}>
        Version: {appInfo.expo.version}
      </Text>

      <Text style={[styles.text, { color: theme.text }]}>
        Developed by: Marème Lo
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 17,
    marginBottom: 12,
  },
});
