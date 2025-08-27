import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        Developed by: RAJESH, RAHUL & ANUJ JAIN UJJAIN
      </Text>
      <Text style={styles.footerText}>
        MOB: 8989984415
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#234f64',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerText: {
    color: '#fafafa',
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 2,
  },
});

export default Footer;
