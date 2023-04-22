import { useStyle } from '../library/useStyle';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type CardProps = {
  title: string;
  value: string;
};

const DashboardCard: React.FC<CardProps> = ({ title, value }) => {
    const styles = useStyle();
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardValue}>{value}</Text>
        </View>
    );
};

export default DashboardCard;
