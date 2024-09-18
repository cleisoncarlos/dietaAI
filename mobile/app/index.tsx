import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import {colors} from '../constants/colors'
import {Link} from 'expo-router'


export default function Index() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/images/logo.png')} />
      <Text style={styles.textLogo1}>Dieta
        <Text style={styles.textLogo2}>
        .AI </Text> 
        </Text>



      <Text style={styles.slogan}>Sua dieta personalizada com inteligência artificial!</Text>

 <Link href='/step' asChild>
 <Pressable style={styles.bt}>
        <Text style={styles.btText}>Gerar a sua Dieta </Text>
      </Pressable>
      
      </Link>


<View style={styles.card}>
  <Text style={styles.cardtext}>O app de geração de dietas com inteligência artificial é uma ferramenta inovadora para auxiliar na sua jornada de bem-estar, mas é importante lembrar que ele serve apenas como apoio para variação de pratos. Para uma orientação mais adequada e mais segura, é fundamental consultar um profissional qualificado. </Text>
</View>





    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 16
    },
    logo: {
      height: 180,
      width: 180
    },
   textLogo1: {
    fontSize: 48,
    color: colors.blueDark,


   },
   textLogo2: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.green
   },
   slogan: {
    color: colors.greenDark,
    fontSize: 16,
    textAlign: 'center'
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
   },
   card: {
    backgroundColor: colors.redLigth,
    padding: 8,
    marginTop: 10
   },
   cardtext: {
    color: colors.red
   
   }

    
})


