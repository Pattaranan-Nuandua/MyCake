import * as React from 'react';
import {Text,StyleSheet, View} from 'react-native';

const HomeScreen =()=>{
    return(
        <View style={styles.container}>
            <Text>
                คุณ
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#00979C",
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default HomeScreen;