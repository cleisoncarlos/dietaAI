import {View, Text, StyleSheet, ScrollView, Pressable, Image, Share} from 'react-native'
import { colors } from '@/constants/colors'
import { Link, router } from 'expo-router'
import {Data} from '../../types/data'

import { useDataStore } from '@/store/data'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import Ionicons from '@expo/vector-icons/Ionicons';



interface ResponseData {
  data: Data
}

export default function Nutrition() {
const user = useDataStore(state => state.user)


const {data, isFetching, error} = useQuery({
  queryKey:["nutrition"],
  queryFn: async ()=> {

    try{

      if(!user){
        throw new Error('Filed Load Nutrition!')
      }


//const response = await api.get<ResponseData>('/teste')

 const response = await api.post<ResponseData>('/create', {
   name: user.name,
   age: user.age,
   gender: user.gender, 
   height: user.height, 
   weight: user.weight,
   level: user.level, 
   objective: user.objective
 })

console.log(response.data)
return response.data.data


      
    }catch(err){
      console.log(err)
    }
}})

if(isFetching){
  return(
    <View style={style.loading}>
        <Image style={style.logo} source={require('../../assets/images/robot.png')} />
      <Text style={style.loadingText}> Consultando IA... </Text>
    </View>
  )
}


if(error){
  return(
    <View style={style.loading}>
      <Text style={style.loadingText}> Falha ao gerar dieta </Text>

      <Link href='/'>
      <Text>Tente novamente </Text>
      </Link>
    </View>
  )
}

async function handleShare(){
try {
  if (data && Object.keys(data).length === 0) return;

  const suplements = `${data?.suplementos.map(item => `${item}`)}`
  const foods =  `${data?.refeicoes.map(item => `- Nome: ${item.nome}\n Horario: ${item.horario}\n Alimentos: ${item.alimentos.map(alimento => `${alimento}`)}`)}`
  const message = `Dieta: ${data?.nome} - Objetivo: ${data?.objetivo}\n ${foods}\n Dica de suplementos: ${suplements}`

  await Share.share({
    message: message
  })

}catch(err){
  console.log(err)
}
}


  return (
    <View style={style.container}>

      <View style={style.containerHeader}>

 <View  style={style.contentHeader}>
 <Text style={style.title}> Minha dieta </Text>



        <Pressable style={style.buttonShare} onPress={handleShare}>
          <Text style={style.txt}> Compartilhar </Text>           
           
            <Ionicons name="share-social" size={18} color={colors.green} />
        </Pressable>

 </View>

      </View>
        {/* <Header step='Passo 3' title='Minha dieta'/> */}

        <ScrollView style={style.content}>
{data && Object.keys(data).length > 0 && (

<>

<Text style={style.titletxt}> {data.nome} </Text>
<Text style={style.titletxt}> Foco: {data.objetivo} </Text>


<View style={style.card}>


<View style={style.cardHeader}>
  <Text style={style.titletxt}>Dicas de suplementos: </Text>

  <Ionicons name="barbell-outline" size={32} color={colors.green} />
</View>


{data.suplementos.map(suplemento => (
  <Text style={style.txt} key={suplemento}>{suplemento}</Text>
))}

</View>


<View >
  {data.refeicoes.map((refeicao)=> (

<View style={style.card} key={refeicao.nome}>

<View style={style.cardHeader}>
  <Text style={style.titletxt}> {refeicao.nome} </Text>
  <Ionicons name="fast-food" size={32} color={colors.green} />
</View>

<View style={style.cardContent}>
<Ionicons name="time-outline" size={16} color={colors.green} />
<Text style={style.txt}> Horário: {refeicao.horario} </Text>
</View>



<View style={style.cardContent}>
<Ionicons name="restaurant-outline" size={16} color={colors.green} />
<Text style={style.txt}> Alimentos: </Text>
</View>

{refeicao.alimentos.map(alimento => (
  <Text style={style.txt}> {alimento} </Text>
))}






      </View>
  ) )}
</View>

</>
)}


        <Pressable style={style.bt} onPress={() => router.replace('/')}>
        <Text style={style.btText}>Gerar uma nova Dieta </Text>
      </Pressable>
        </ScrollView>




    </View>
  )
}


const style = StyleSheet.create({
  loading: {
    flex:1, 
    justifyContent:'center', 
    alignItems:'center',
    backgroundColor: colors.background
  },
  loadingText: {
    color: colors.greenDark,
    fontSize: 22    
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
   // marginHorizontal: 16
  },
  containerHeader: {
    backgroundColor: colors.green,
    paddingTop: 80,
    paddingBottom: 20   

  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16

  },
  title: {
    color: colors.white,
    fontSize: 22
  },
  txt: {
color: colors.green,
//fontSize: 14
  },


  titletxt: {
    fontSize: 18,
    color: colors.green

  },
  buttonShare:{
    backgroundColor: colors.greenLigth,
    paddingVertical: 4,
    paddingHorizontal: 16,
    flexDirection: 'row',
   alignItems: 'center',
   gap: 4,
  // elevation: 20,
   borderRadius: 4
    },
    content: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      flex: 1
    },
    card: {
      backgroundColor: colors.greenLigth,
      padding: 20,
      marginVertical: 10
      
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
     // marginVertical: 10
      
    },
    cardContent: {
      flexDirection: 'row',
      gap: 4,
      alignItems: 'center',
      marginVertical: 4
    },
    bt: {
      backgroundColor: colors.green,
      width: '100%',
      height: 48,
      marginTop:20,
      justifyContent: 'center',
     alignItems: 'center',
     marginBottom: 20
     },
     btText: {
      color: colors.white,
      fontSize: 16
     },
     logo: {
      height: 180,
      width: 180,
      marginBottom: 10
    }
})