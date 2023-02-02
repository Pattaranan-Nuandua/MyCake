import * as React from 'react';
import { SafeAreaView,Text } from 'react-native';

type WeightedLatLng = {
    latitude: Number;
    longitude: Number;
    weight?: Number;
}

const Insole =()=>{
    return(
        <SafeAreaView>
            <Text>
                Insole
            </Text>
        </SafeAreaView>
    )
}

export default Insole;
