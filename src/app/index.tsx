import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

type SquareValue = 'X' | 'O' | null;
type ThemeColors = ReturnType<typeof useTheme>['theme'];

type SquareProps = {
  value: SquareValue;
  onSquareClick: () => void;
  theme: ThemeColors;
};

function Square({ value, onSquareClick, theme }: SquareProps) {
  return (
    <Pressable
      style={[
        styles.square,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
      onPress={onSquareClick}
    >
      <Text style={[styles.squareText, { color: theme.text }]}>
        {value}
      </Text>
    </Pressable>
  );
}

type BoardProps = {
  xIsNext: boolean;
  squares: SquareValue[];
  onPlay: (nextSquares: SquareValue[]) => void;
  theme: ThemeColors;
};

function Board({ xIsNext, squares, onPlay, theme }: BoardProps) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);

  const status = winner
    ? 'Winner: ' + winner
    : 'Next player: ' + (xIsNext ? 'X' : 'O');

  return (
    <View>
      <Text style={[styles.status, { color: theme.text }]}>
        {status}
      </Text>

      {[0, 1, 2].map((row) => (
        <View key={row} style={styles.boardRow}>
          {[0, 1, 2].map((col) => {
            const i = row * 3 + col;

            return (
              <Square
                key={i}
                value={squares[i]}
                onSquareClick={() => handleClick(i)}
                theme={theme}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

export default function Game() {
  const { theme } = useTheme();

  const [history, setHistory] = useState<SquareValue[][]>([
    Array(9).fill(null),
  ]);

  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: SquareValue[]) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      nextSquares,
    ];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const description =
      move > 0 ? 'Go to move #' + move : 'Go to game start';

    return (
      <Pressable
        key={move}
        style={[
          styles.historyButton,
          { backgroundColor: theme.primary },
        ]}
        onPress={() => jumpTo(move)}
      >
        <Text style={styles.historyButtonText}>
          {description}
        </Text>
      </Pressable>
    );
  });

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <Text style={[styles.title, { color: theme.text }]}>
        Tic-Tac-Toe
      </Text>

      <View style={styles.gameBoard}>
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          theme={theme}
        />
      </View>

      <View style={styles.gameInfo}>
        <Text style={[styles.historyTitle, { color: theme.text }]}>
          Game History
        </Text>

        {moves}
      </View>
    </ScrollView>
  );
}

function calculateWinner(squares: SquareValue[]): SquareValue {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  gameBoard: {
    alignItems: 'center',
  },
  status: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
  },
  boardRow: {
    flexDirection: 'row',
  },
  square: {
    width: 85,
    height: 85,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  gameInfo: {
    marginTop: 30,
    alignItems: 'center',
    width: '100%',
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginVertical: 4,
  },
  historyButtonText: {
    color: '#ffffff',
    fontSize: 15,
  },
});