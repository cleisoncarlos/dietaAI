import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";


import {colors} from '../../constants/colors'
import { Header } from "@/components/header";
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { router } from "expo-router";

import {Select} from '../../components/input/select'

import {useDataStore} from '../../store/data'


const schema = z.object({
    gender: z.string().min(1, {message: 'Sexo é obrigatório'}),
    objective: z.string().min(2, {message: 'O objetivo é obrigatório'}),
    level: z.string().min(1, {message: 'Selecione o seu nível'}),
 
   
})

type FormData = z.infer<typeof schema>


export default function Create() {


    const {control, handleSubmit, formState: {errors, isValid}} = useForm<FormData>({
        resolver: zodResolver(schema)
    })


const setPageTwo = useDataStore(state => state.setPageTwo)



    const genderOptions = [
        { label: "Masculino", value: "masculino" },
        { label: "Feminino", value: "feminino" },
      ]
    
      const levelOptions = [
        { label: 'Sedentário (pouco ou nenhuma atividade física)', value: 'Sedentário' },
        { label: 'Levemente ativo (exercícios 1 a 3 vezes na semana)', value: 'Levemente ativo (exercícios 1 a 3 vezes na semana)' },
        { label: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)', value: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)' },
        { label: 'Altamente ativo (exercícios 5 a 7 dia por semana)', value: 'Altamente ativo (exercícios 5 a 7 dia por semana)' },
      ]
    
      const objectiveOptions = [
        { label: 'Emagrecer', value: 'emagrecer' },
        { label: 'Hipertrofia', value: 'Hipertrofia' },
        { label: 'Hipertrofia + Definição', value: 'Hipertrofia e Definição' },
        { label: 'Definição', value: 'Definição' },
      ]

      function handleCreate(data: FormData){
       // console.log(data)
       setPageTwo({
        gender: data.gender,
        objective: data.objective,
        level: data.level
       })
       router.push('/nutrition')
      }


  return (
   <View style={styles.container}>

    <Header title='Passo 2' step='Finalizando Dieta' />

    <ScrollView style={styles.content}>

        <Text style={styles.label}>Sexo:</Text>
        <Select
        control={control}
        name="gender"
        placeholder="Selecione o sexo"
        error={errors.gender?.message}
        options={genderOptions}
    />


    
<Text style={styles.label}>Nível de atividade física:</Text>
        <Select
        control={control}
        name="level"
        placeholder="Selecione o nível"
        error={errors.level?.message}
        options={levelOptions}
    />


    
<Text style={styles.label}>Selecione o seu objetivo:</Text>
        <Select
        control={control}
        name="objective"
        placeholder="Selecione o objetivo"
        error={errors.objective?.message}
        options={objectiveOptions}
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