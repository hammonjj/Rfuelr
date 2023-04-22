import { useEffect, useState } from 'react';
import { supabase } from '../library/initSupabase'
import useUser from './useUser';

interface Vehicle {
    make: string;
    model: string;
    id: string;
}

export default function useVehicles() {
    const user = useUser();
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    useEffect(() => {
        async function getVehicles() {
            if(!user) {
                console.log('No user found - User null');
                return;
            }

            console.log('User found - User: ' + user.id);
            
            const { data, error } = await supabase
                .from('Refuel.Vehicles')
                .select('make, model, id')
                .eq('user', user.id);

            if(error) {
                console.log(error);
                return;
            }

            setVehicles(data);
        }

        getVehicles();
    }, [user]);

    return vehicles;
}