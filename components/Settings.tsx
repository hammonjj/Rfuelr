import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import DebounceTextInput from './DebounceTextInput';
import Toast from 'react-native-toast-message';
import { useStyle } from '../library/useStyle';
import { supabase } from '../library/initSupabase';
import RoundedButton from './RoundedButton';

export default function Settings() {
    const styles = useStyle();

    async function signOut() {
        supabase.auth.signOut();
      }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.settingsPageContainer}>
                <RoundedButton title="Log Out" onPress={signOut}/>
            </View>
        </TouchableWithoutFeedback>
    );
}