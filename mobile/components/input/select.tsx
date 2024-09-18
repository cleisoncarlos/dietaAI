import { colors } from '@/constants/colors'
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Modal} from 'react-native'

import { Controller } from 'react-hook-form'
import { Feather } from '@expo/vector-icons'

import { useState } from 'react'

interface OptionProps{
    label: string;
    value: string | number;
}


interface SelectProps{
    name: string;
    control: any;
    placeholder: string;
    rules?: object;
    error?: string;
    options: OptionProps[];    
    
}

export  function Select({name, control, placeholder, error, options}: SelectProps) {
  
    const [visible, setVisible] = useState(false)
    
  
    return (
    <View style={styles.container}>

        <Controller
        control={control}    
        name={name}
        render={({field: {onChange, onBlur, value}})=> (
         <>
         
         <TouchableOpacity style={styles.select} onPress={()=> setVisible(true)}>
            <Text> {value ? options.find(option => option.value === value)?.label: placeholder} </Text>
            <Feather name='chevron-down' size={26} color={colors.greenDark}/>
         </TouchableOpacity>

<Modal
visible={visible}
animationType='fade'
transparent={true}
onRequestClose={() => {setVisible(false)}}
>

    <TouchableOpacity 
    style={styles.modalContainer} 
    activeOpacity={1}
    >

        <TouchableOpacity
         style={styles.modalContent} 
         activeOpacity={1}
         onPress={()=> setVisible(false)}
        >

            <FlatList
            contentContainerStyle={{gap: 4}}
            data={options}
            keyExtractor={(item)=> item.value.toString()}
            renderItem={({item}) => (
                <TouchableOpacity 
                style={styles.option}
                onPress={() => {
                    onChange(item.value)
                    setVisible(false)
                }}
                >
                    <Text >{item.label}</Text>
                    </TouchableOpacity>
        )}
            
            
            />


        </TouchableOpacity>


    </TouchableOpacity>
</Modal>


         </>
        )}
        
        
        />
  
        { error && <Text style={styles.errorText}>{error}</Text>}


    </View>
  )
}


const styles = StyleSheet.create({
        container: {
            marginBottom: 16
    },
    
    select: {
        backgroundColor: colors.white,
        height: 48,
        padding: 8,
      flexDirection: 'row',
      alignItems: 'center',
        justifyContent: 'space-between'
    },
    errorText: {
        color: colors.red,
        fontSize: 14,
      
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "rgba(0,0,0, 0.7)",
        zIndex: 1000

    },
    modalContent: {
        backgroundColor: colors.white,
        marginHorizontal: 16,
        borderRadius: 8,
        padding: 30

    },
    option: {
    paddingVertical: 14,
    paddingHorizontal: 16,


    }
})
