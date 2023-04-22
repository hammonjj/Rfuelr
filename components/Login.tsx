import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import DebounceTextInput from './DebounceTextInput';
import Toast from 'react-native-toast-message';
import { useState } from 'react';
import { useStyle } from '../library/useStyle';
import { supabase } from '../library/initSupabase';
import RoundedButton from './RoundedButton';

export default function Login() {
    const styles = useStyle();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function signInWithEmail() {
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if(error) {
            console.log("Login Error: " + error.message);
            
            Toast.show({
                type: "error",
                text1: "Error: " + error.message,
            });
        }
        else {
            Toast.show({
                type: "success",
                text1: "Success",
                text2: "Signed in successfully"
            });
        }

        setLoading(false);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.settingsPageContainer}>
                <Text style={styles.text}>Username: </Text>
                <DebounceTextInput 
                    cssStyle={styles.gasInputTextInput} 
                    inputId="username" 
                    callback={setEmail} 
                    testId={"usernameField"} 
                    defaultValue={email} />

                <Text style={styles.text}>Password: </Text>
                <DebounceTextInput 
                    cssStyle={styles.gasInputTextInput} 
                    inputId="password" 
                    callback={setPassword} 
                    testId={"password"} 
                    secureEntry={true}
                    defaultValue={password} />

                <RoundedButton title="Login In" onPress={signInWithEmail}/>
            </View>
        </TouchableWithoutFeedback>
    );
}