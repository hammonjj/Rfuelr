import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useStyle } from '../library/useStyle';

interface Props {
  onPress: () => void;
  title: string;
  isDisabled?: boolean;
}

const RoundedButton: React.FC<Props> = ({ onPress, title, isDisabled }) => {
    const styles = useStyle();

    return (
    
        <TouchableOpacity onPress={onPress} style={styles.button} disabled={isDisabled}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

export default RoundedButton;
