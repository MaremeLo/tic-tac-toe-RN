import { StyleSheet, Switch, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const { isDark, theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Settings
      </Text>

      <View style={[styles.row, { backgroundColor: theme.card }]}>
        <View>
          <Text style={[styles.label, { color: theme.text }]}>
            Dark Theme
          </Text>

          <Text style={[styles.description, { color: theme.muted }]}>
            Current theme: {isDark ? 'Dark' : 'Light'}
          </Text>
        </View>

        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          accessibilityLabel="Toggle dark theme"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  row: {
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    marginTop: 5,
    fontSize: 14,
  },
});