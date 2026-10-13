import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// TypeScript type for a square's value
type SquareValue = 'X' | 'O' | null;

// Props for the Square component
type SquareProps = {
  value: SquareValue;
  onSquareClick: () => void;
};

// A single square on the board
function Square({ value, onSquareClick }: SquareProps) {
  return (
    <Pressable style={styles.square} onPress={onSquareClick}>
      <Text style={styles.squareText}>{value}</Text>
    </Pressable>
  );
}

// Props for the Board component
type BoardProps = {
  xIsNext: boolean;
  squares: SquareValue[];
  onPlay: (nextSquares: SquareValue[]) => void;
};

// The game board
function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);

  let status: string;

  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <View>
      <Text style={styles.status}>{status}</Text>

      {[0, 1, 2].map((row) => (
        <View key={row} style={styles.boardRow}>
          {[0, 1, 2].map((col) => {
            const i = row * 3 + col;

            return (
              <Square
                key={i}
                value={squares[i]}
                onSquareClick={() => handleClick(i)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

// The main game component
export default function Game() {
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
    let description: string;

    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <Pressable
        key={move}
        style={styles.historyButton}
        onPress={() => jumpTo(move)}
      >
        <Text style={styles.historyButtonText}>{description}</Text>
      </Pressable>
    );
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tic-Tac-Toe</Text>

      <View style={styles.gameBoard}>
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </View>

      <View style={styles.gameInfo}>
        <Text style={styles.historyTitle}>Game History</Text>
        {moves}
      </View>
    </ScrollView>
  );
}

// Determines whether X or O has won
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

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

// React Native styles replace the tutorial's CSS
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f5f5f5',
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
    borderColor: '#333',
    backgroundColor: '#fff',
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
    backgroundColor: '#2563eb',
    marginVertical: 4,
  },

  historyButtonText: {
    color: '#fff',
    fontSize: 15,
  },
});
