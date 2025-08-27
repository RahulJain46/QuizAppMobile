import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Card({ children, style, padding = 20, shadow = true }) {
  const cardStyles = [
    styles.card,
    shadow && styles.shadow,
    { padding },
    style,
  ];

  return <View style={cardStyles}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginVertical: 5,
  },
  shadow: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
