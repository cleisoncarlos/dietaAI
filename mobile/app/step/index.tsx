import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import {colors} from '../../constants/colors'

import { Header } from "@/components/header";
import { Input } from "@/components/input";

import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { router } from "expo-router";

import {useDataStore} from '../../store/data'


const schema = z.object({
    name: z.string().min(1, {message: 'O nome é obrigatório'}),
    age: z.string().min(2, {message: 'A idade é obrigatória'}),
    weight: z.string().min(1, {message: 'O peso é obrigatório'}),
    height: z.string().min(1, {message: 'A altura é obrigatória'}),
   
})

type FormData = z.infer<typeof schema>

export default function Step() {

    const {control, handleSubmit, formState: {errors, isValid}} = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    // zustand
const setPageOne = useDataStore(state => state.setPageOne)

function handleCreate(data: FormData){
    console.log('passando dados da pagina 1')
    setPageOne({
        name: data.name,
        age: data.age,
        weight: data.weight,
        height: data.height
    })


    router.push('/create')
}


  return (
    <View style={styles.container}>

        <Header step='Passo 1' title='Vamos começar'  />
      


<ScrollView style={styles.content}>

<Text  style={styles.label}>Nome:</Text>
<Input 
name='name' 
control={control} 
placeholder='Digite o seu nome'
error={errors.name?.message}
keyboardType='default'
/>


<Text  style={styles.label}>Sua idade:</Text>
<Input 
name='age' 
control={control} 
placeholder='Digite a sua idade'
error={errors.age?.message}
keyboardType='numeric'
/>



<Text  style={styles.label}>Seu peso:</Text>
<Input 
name='weight' 
control={control} 
placeholder='Digite o seu peso'
error={errors.weight?.message}
keyboardType='numeric'
/>



<Text  style={styles.label}>Sua altura:</Text>
<Input 
name='height' 
control={control} 
placeholder='Digite o seu peso'
error={errors.height?.message}
keyboardType='numeric'
/>



 <Pressable style={styles.bt} onPress={handleSubmit(handleCreate)}>
        <Text style={styles.btText}> Avançar </Text>
      </Pressable>


       </ScrollView>
    </View>
  )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,  
      backgroundColor: colors.background,
    },
    content: {
      paddingHorizontal: 16      
      },

     label: {
      fontSize: 16,    
      color: colors.blueDark,
      marginBottom: 8
     },

     bt: {
        backgroundColor: colors.green,
        width: '100%',
        height: 48,
        marginTop:20,
        justifyContent: 'center',
       alignItems: 'center'
        
       },
       btText: {
        color: colors.white,
        fontSize: 16
    
       }
    
  
      
  })
  
  
  
