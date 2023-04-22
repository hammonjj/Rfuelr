import { getRefuels } from '../library/api';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table, Row, Rows } from 'react-native-table-component';
import { useStyle } from '../library/useStyle';
import useVehicles from '../hooks/useVehicles';

export default function Metrics() {
    const styles = useStyle();
    const vehicleList = useVehicles();
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [vehicles, setVehicles] = useState([{label: "", value: ""}]);
    const [open, setOpen] = useState(false);
    const [tableData, setTableData] = useState([] as any);

    useEffect(() => {
        if(vehicleList.length === 0) {
            console.log("No vehicles returned");
            setVehicles([{label: "", value: ""}]);
            return;
        }

        console.log("vehicleList: " + vehicleList);
        const vehicleData = vehicleList.map((vehicle) => {
            return {label: vehicle.make + ' ' + vehicle.model, value: vehicle.id}
        });

        setVehicles(vehicleData);
    }, [vehicleList]);

    useEffect(() => {
        let vehicle = '' + selectedVehicle;
        if(vehicleList.length === 1 && vehicleList[0].make !== '' && vehicleList[0].model !== '') {
            console.log("Only one vehicle returned, setting selectedVehicle to " + vehicleList[0].id)
            vehicle = vehicleList[0].id;
        }
        else if(selectedVehicle === null || selectedVehicle === '') {
            setTableData([]);
            return;
        }
        const fetchMetrics = async (vehicle: number) => {
            try {
                const refuels = await getRefuels(vehicle);

                if(!refuels) {
                    setTableData([]);
                    return;
                }

                let tableData: any[] = [];
                tableData = refuels.map((refuel) => {
                    const date = new Date(refuel.date);
                    return [
                        (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear(), 
                        refuel.gallons.toFixed(2), 
                        "$" + refuel.price_per_gallon.toFixed(2), 
                        refuel.trip_miles.toFixed(2), 
                        refuel.miles_per_gallon.toFixed(2)];});

                setTableData(tableData);
            }
            catch (error) {
                console.log(`Exception Caught: ${error}`);
            }
        }

        fetchMetrics(parseInt(vehicle));
    }, [selectedVehicle, vehicleList]);
    
    return (
        <>
        <View style={styles.container}>
            <DropDownPicker 
            defaultValue={vehicles[0]}
            placeholder={vehicles[0].label}
                    style={styles.vehiclePicker}
                    open={open}
                    setOpen={setOpen}
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
                    //itemStyle={styles.dropDownItem}
                    itemStyle={{ justifyContent: 'flex-start' }}
                    labelStyle={styles.dropDownLabel}
                    arrowColor="#fff"
                    dropDownStyle={styles.dropDownPicker}
                    zIndex={1000}/>
                    
            <ScrollView  style={styles.settingsContainer}>
                <View style={styles.tableStyle}>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#000000'}}>
                        <Row data={['Date', 'Gallons', 'PPG', 'Miles', 'MPG']} textStyle={styles.tableText as object} />
                        <Rows data={tableData} textStyle={styles.tableText as object} />
                    </Table>
                </View>
            </ScrollView >
        </View>
        </>
    );
}