import React from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';

import {Colors} from '../assets/colors';

type TitleProps = {title: string; style: TextStyle};

export const ImageHeadline = ({title, style}: TitleProps) => {
  return (
    <Text style={[styles.titleHead, style]}>
      Title: <Text style={styles.title}>{title}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  titleHead: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 7,
    color: Colors.black,
  },
  title: {
    fontSize: 18,
    marginTop: 2,
    fontWeight: '200',
    color: Colors.black,
  },
});
