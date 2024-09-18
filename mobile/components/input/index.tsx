import { colors } from '@/constants/colors'
import {View, Text, StyleSheet, TextInput, KeyboardTypeOptions} from 'react-native'

import { Controller } from 'react-hook-form'

interface InputProps{
    name: string;
    control: any;
    placeholder: string;
    rules?: object;
    error?: string;
    keyboardType: KeyboardTypeOptions;  
}

export  function Input({name, control, placeholder, rules, error, keyboardType}: InputProps) {
  return (
    <View style={styles.container}>

        <Controller
        control={control}
        rules={rules}
        name={name}
        render={({field: {onChange, onBlur, value}})=> (
            <TextInput style={styles.input}
            placeholder={placeholder}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            keyboardType={keyboardType}

            />
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
    
    input: {
        backgroundColor: colors.white,
        height: 48,
        padding: 8,
    },
    errorText: {
        color: colors.red,
        fontSize: 14,
      
    }
})
