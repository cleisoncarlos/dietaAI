import {View, StyleSheet, Pressable, Text, StatusBar} from 'react-native'
import {colors} from '../../constants/colors'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'


interface HeaderDrops{
    step: string;
    title: string;
}





export  function Header({step, title}: HeaderDrops) {
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={colors.green}/>
        <View style={styles.content}>

            <View style={styles.row}> 

            <Pressable onPress={()=> router.back()}>
                    <Feather name="arrow-left" size={24} color={colors.white} />
            </Pressable>
        
             <Text style={styles.text}> {step}  <Feather name="loader" size={16} color={colors.white} /> </Text> 
   
            </View>

        <Text style={styles.title}> {title} </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {     
      backgroundColor: colors.green, 
     // borderBottomLeftRadius: 16,
    //  borderBottomRightRadius: 16,
      marginBottom: 14,
      marginTop: 23,
      paddingBottom: 20,
      paddingTop: 10   
    },
    content: {
    paddingHorizontal: 16,
},
row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
},
 text: {
    color: colors.white,
       fontSize: 18
      },
     textLogo1: {
      fontSize: 48,
      color: colors.blueDark,  
     },
     title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.white,
      marginTop: 10
     }  
      
  })
