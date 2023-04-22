import { useEffect, useState } from 'react';
import { Text, TextInput, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Toast from 'react-native-toast-message';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Refuel, submitRefuel } from '../library/api';
import { useStyle } from '../library/useStyle';
import RoundedButton from './RoundedButton';
import useVehicles from '../hooks/useVehicles';

const SubmitRefuel = () => {
    const styles = useStyle();
    const vehicleList = useVehicles();

    const [previousRefuel, setPreviousRefuel] = useState<Refuel | null>(null);
    const [date, setDate] = useState<Date>(new Date());
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [vehicles, setVehicles] = useState([{label: "", value: ""}]);
    const [dateOpen, setDateOpen] = useState(false);
    const [vehicleOpen, setVehicleOpen] = useState(false);

    const [gallonsPumped, setGallonsPumped] = useState('');
    const [pricePerGallon, setPricePerGallon] = useState('');
    const [milesDriven, setMilesDriven] = useState('');

    useEffect(() => {
        if(vehicleList.length === 0) {
            console.log("No vehicles returned");
            setVehicles([{label: "", value: ""}]);
            return;
        }

        const vehicleData = vehicleList.map((vehicle) => {
            return {label: vehicle.make + ' ' + vehicle.model, value: vehicle.id}
        });

        setVehicles(vehicleData);
    }, [vehicleList]);

    function onDateSelected(event: DateTimePickerEvent, value: Date | undefined) {
        if(value === undefined) {
            return;
        }

        setDate(value);
        setDateOpen(false);
      };

    async function onSubmit() {
        Keyboard.dismiss();

        //Check fields for proper inputs
        if(selectedVehicle === null) {
            Toast.show({
                type: "error",
                text1: "Please select a vehicle"
            });

            return;
        }
        
        const gallonsPumpedNumber = Number(gallonsPumped);
        const tripMilesNumber = Number(milesDriven);

        const refuel: Refuel = {
            vehicleId: selectedVehicle,
            date: date,
            gallons: gallonsPumpedNumber,
            pricePerGallon: Number(pricePerGallon),
            milesPerGallon: tripMilesNumber / gallonsPumpedNumber,
            tripMiles: tripMilesNumber,
            latitude: 0,
            longitude: 0
        };

        if(previousRefuel !== null && 
            previousRefuel.vehicleId === refuel.vehicleId &&
            previousRefuel.date.getTime() === refuel.date.getTime() &&
            previousRefuel.gallons === refuel.gallons &&
            previousRefuel.pricePerGallon === refuel.pricePerGallon &&
            previousRefuel.tripMiles === refuel.tripMiles) {
                Toast.show({
                    type: "error",
                    text1: "Refueling already submitted"
                });

                return;
            }

        const error = await submitRefuel(refuel);
        if(error) {
            console.log("Error Submitting Refueling: " + error.message);
            Toast.show({
                type: "error",
                text1: "Error Submitting Refueling: " + error.message,
            });
        } else {
            Toast.show({
                type: "success",
                text1: "Submitting Refueling Successfully"
            });

            setPreviousRefuel(refuel);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <>
            <View style={styles.submitPageContainer}>
                <DropDownPicker 
                        placeholder="Select a Vehicle"
                        open={vehicleOpen}
                        setOpen={setVehicleOpen}
                        value={selectedVehicle}
                        setValue={setSelectedVehicle}
                        items={vehicles}
                        setItems={setVehicles} 
                        placeholderStyle={{
                            color: "#fff",
                            fontSize: 16
                          }}
                        
                        containerStyle={styles.dropDownContainer}
                        style={styles.dropDown}
                        itemStyle={{ justifyContent: 'flex-start' }}
                        labelStyle={styles.dropDownLabel}
                        arrowColor="#fff"
                        dropDownStyle={styles.dropDownPicker}
                        zIndex={1000}/>

                <Text style={styles.text}>Date:</Text>
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={false}
                    display="default"
                    onChange={onDateSelected}
                    style={styles.datePicker}
                />
                
                <Text style={styles.text}>Gallons:</Text>
                <TextInput 
                    style={styles.gasInputTextInput} 
                    keyboardType="numeric" 
                    id="gallonsPumped"
                    value={gallonsPumped}
                    onChangeText={setGallonsPumped}
                />

                <Text style={styles.text}>PPG:</Text>
                <TextInput 
                    style={styles.gasInputTextInput} 
                    keyboardType="numeric" 
                    id="pricePerGallon"
                    value={pricePerGallon} 
                    onChangeText={setPricePerGallon} />

                <Text style={styles.text}>Trip Miles:</Text>
                <TextInput 
                    style={styles.gasInputTextInput} 
                    keyboardType="numeric" 
                    id="milesDriven" 
                    value={milesDriven}
                    onChangeText={setMilesDriven} />

            </View>
            <View style={styles.container}>
                <RoundedButton title="Submit" onPress={onSubmit} />
            </View>
        </>
        </TouchableWithoutFeedback>
        
    );
}

export default SubmitRefuel;