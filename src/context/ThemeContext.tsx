import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from 'react';


type ThemeContextType = {
  isDark: boolean;
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const theme = isDark ? darkTheme : lightTheme;

  function toggleTheme() {
    setIsDark((previous) => !previous);
  }

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}

type Theme = {
  background: string;
  text: string;
  card: string;
  border: string;
  primary: string;
  muted: string;
};

const lightTheme: Theme = {
  background: '#f5f5f5',
  text: '#222222',
  card: '#ffffff',
  border: '#333333',
  primary: '#2563eb',
  muted: '#666666',
};

const darkTheme: Theme = {
  background: '#121212',
  text: '#ffffff',
  card: '#242424',
  border: '#aaaaaa',
  primary: '#60a5fa',
  muted: '#cccccc',
};