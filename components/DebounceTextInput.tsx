import { TextInput } from 'react-native';

interface IProps {
    callback: any;
    cssStyle?: any;
    inputId: string;
    testId?: string;
    secureEntry?: boolean;
    defaultValue?: string;
}

function DebounceTextInput(props: IProps) {
    return (
        <TextInput 
            style={props.cssStyle} 
            id={props.inputId} 
            autoCapitalize='none'
            onChangeText={props.callback}
            data-testid={props.testId} 
            secureTextEntry={props.secureEntry} 
            defaultValue={props.defaultValue} />
    );
}

export default DebounceTextInput;