import { useEffect, useState } from 'react';
import { Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { getRefuels } from '../library/api';
import { useStyle } from '../library/useStyle';
import DashboardCard from './DashboardCard';
import useVehicles from '../hooks/useVehicles';

const Home = () => {
    const styles = useStyle();
    const vehicleList = useVehicles();
    
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [vehicles, setVehicles] = useState([{label: "", value: ""}]);
    const [vehicleOpen, setVehicleOpen] = useState(false);

    //Lifetime Metrics
    const [lifeTimeAvgFill, setLifeTimeAvgFill] = useState(0);
    const [lifeTimeAvgMpg, setLifeTimeAvgMpg] = useState(0);
    const [lifeTimeCost, setLifeTimeCost] = useState(0);
    const [lifeTimeMiles, setLifeTimeMiles] = useState(0);

    //YTD Metrics
    const [ytdAvgFill, setYtdAvgFill] = useState(0);
    const [ytdAvgMpg, setYtdAvgMpg] = useState(0);
    const [ytdCost, setYtdCost] = useState(0);
    const [ytdMiles, setYtdMiles] = useState(0);

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
        else if((selectedVehicle === null || selectedVehicle === '')) {
            console.log("selectedVehicle is null or empty");
            return;
        }

        const fetchMetrics = async (vehicle: number) => {
            console.log("fetchMetrics called with vehicle: " + vehicle);
            try {
                let lifetimeGallons = 0;
                let lifetimeRefills = 0;
                let lifeTimeMilesTmp = 0;
                let lifeTimeCostTmp = 0;
                
                let ytdCostTmp = 0;
                let ytdMilesTmp = 0;
                let ytdRefills = 0;
                let ytdGallonsTmp = 0;

                const refuels = await getRefuels(vehicle);

                if(!refuels) {
                    console.log("No refuels returned");
                    return;
                }

                refuels.forEach((refuel) => {
                    const date = new Date(refuel.date);

                    //YTD Metrics
                    if(date.getFullYear() === new Date().getFullYear()) {
                        ytdRefills++;
                        ytdGallonsTmp += parseFloat(refuel.gallons.toString());
                        ytdMilesTmp = ytdMilesTmp + parseFloat(refuel.trip_miles.toString());
                        ytdCostTmp += parseFloat(refuel.gallons.toString()) * parseFloat(refuel.price_per_gallon.toString());
                    }

                    //Lifetime Metrics
                    lifetimeRefills++;
                    lifetimeGallons += parseFloat(refuel.gallons.toString());
                    lifeTimeMilesTmp = lifeTimeMilesTmp + parseFloat(refuel.trip_miles.toString());
                    lifeTimeCostTmp += parseFloat(refuel.gallons.toString()) * parseFloat(refuel.price_per_gallon.toString());
                }); 

                //YTD Metrics
                setYtdAvgFill(ytdCostTmp / ytdRefills);
                setYtdAvgMpg(ytdMilesTmp / ytdGallonsTmp);
                setYtdCost(ytdCostTmp);
                setYtdMiles(ytdMilesTmp);

                setLifeTimeAvgFill(lifeTimeCostTmp / lifetimeRefills);
                setLifeTimeAvgMpg(lifeTimeMilesTmp / lifetimeGallons);
                setLifeTimeCost(lifeTimeCostTmp);
                setLifeTimeMiles(lifeTimeMilesTmp);
            }
            catch (error) {
                console.log(`Exception Caught: ${error}`);
            }
        }

        fetchMetrics(parseInt(vehicle));
    }, [selectedVehicle, vehicleList]);

    return (
        <View style={styles.container}>
            <DropDownPicker 
                defaultValue={vehicles[0]}
                placeholder={vehicles[0].label}
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
                //itemStyle={styles.dropDownItem}
                itemStyle={{ justifyContent: 'flex-start' }}
                labelStyle={styles.dropDownLabel}
                arrowColor="#fff"
                dropDownStyle={styles.dropDownPicker}
                zIndex={1000}
            />
            {/*selectedVehicle === null || selectedVehicle === '' ?  null :*/
                <>
                    <Text style={styles.sectionHeader}>Year to Date</Text>
                    <View style={styles.dashboardContainer}>
                        <DashboardCard title="Avg. MPG" value={ytdAvgMpg.toFixed(2)} />
                        <DashboardCard title="Miles Driven" value={ytdMiles.toString()} />
                    </View>
                    <View style={styles.dashboardContainer}>
                        <DashboardCard title="Avg. Fill" value={"$" + ytdAvgFill.toFixed(2)} />
                        <DashboardCard title="Total Cost" value={"$" + ytdCost.toFixed(2)} />
                    </View>

                    <Text style={styles.sectionHeader}>Lifetime</Text>
                    <View style={styles.dashboardContainer}>
                        <DashboardCard title="Avg. MPG" value={lifeTimeAvgMpg.toFixed(2)} />
                        <DashboardCard title="Miles Driven" value={lifeTimeMiles.toString()} />
                    </View>
                    <View style={styles.dashboardContainer}>
                        <DashboardCard title="Avg. Fill" value={"$" + lifeTimeAvgFill.toFixed(2)} />
                        <DashboardCard title="Total Cost" value={"$" + lifeTimeCost.toFixed(2)} />
                    </View> 
                </>}
        </View>
    );
}

export default Home;