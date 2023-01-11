import * as React from 'react';
import BleManager from 'react-native-ble-manager';  
conts componentDidMount() {
    console.log('bluetooth scanner mounted');

    NativeAppEventEmitter.addListener('BleManagerDiscoverPeripheral',(data) => 
    {
        let device = 'device found: ' + data.name + '(' + data.id + ')'; 

        if(this.devices.indexOf(device) == -1) {
            this.devices.push(device);
        }

        let newState = this.state;
        newState.dataSource = newState.dataSource.cloneWithRows(this.devices);
        this.setState(newState);
    });

    BleManager.start({showAlert: false})
            .then(() => {
                        // Success code 
                        console.log('Module initialized');
                        BleManager.scan([], 120);
                        });

}