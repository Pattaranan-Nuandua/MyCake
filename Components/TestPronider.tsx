import React, { useState,createContext } from 'react';


type ADC ={ 
    ADC11: string,
    ADC12: string,
    ADC13: string,
    ADC14: string,
    ADC21: string,
    ADC22: string,
    ADC23: string,
    ADC24: string,
    ADC31: string,
    ADC32: string,
    ADC33: string,
    ADC34: string,
}

type indexprop = {
    data: ADC
    setData:(newdata:ADC)=>void
}

export const MyContext = createContext <indexprop> ({data: {
    ADC11: '',
    ADC12: '',
    ADC13: '',
    ADC14: '',
    ADC21: '',
    ADC22: '',
    ADC23: '',
    ADC24: '',
    ADC31: '',
    ADC32: '',
    ADC33: '',
    ADC34: '',
    },
    setData:(newdata:ADC)=>null
});
interface AuthContextProviderProps {
    children: JSX.Element;
}
function TestProvider(props: AuthContextProviderProps){
    const [data, setData] = useState<ADC>({
        ADC11: '',
        ADC12: '',
        ADC13: '',
        ADC14: '',
        ADC21: '',
        ADC22: '',
        ADC23: '',
        ADC24: '',
        ADC31: '',
        ADC32: '',
        ADC33: '',
        ADC34: '',
    });

    
    
    return(
        <MyContext.Provider value={{data,setData}}>
            {props.children}
            
        </MyContext.Provider>
    )


}
export default TestProvider