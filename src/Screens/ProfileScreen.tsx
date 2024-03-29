// ProfileScreen.js

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, SafeAreaView, Dimensions, Pressable,NativeModules, TaskProvider, Platform, Text, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tokenStorage from '../localStorage/tokenStorage';
import { StackNavigationProp } from '@react-navigation/stack';
import NavPanel, { ContextPanel } from './components/NavPanel';
import { socketClient } from '../socket/socketClient';
import PushNotificationIOS, { NotificationAction, NotificationCategory, NotificationRequest } from '@react-native-community/push-notification-ios';
import { useAppDispatch, useAppSelector } from '../store/typesHooks';
import { RESET_MESSAGE_REDUCER } from '../store/reducers/messageReducer';
import { RESET_LIKE_REDUCER } from '../store/reducers/likesReducer';
import { RESET_TEMP_USER_REDUCER } from '../store/reducers/tempUserDataReducer';
import { RESET_USER_REDUCER, updateUserProfile } from '../store/reducers/userReducer';
import { IUserProfile, UserHttp } from '../http/user/httpUser';
import GradientButton from '../UIComponents/GradientButton/GradientButton';
//@ts-ignore







const ProfileScreen: React.FC<{ navigation: StackNavigationProp<any>, route: any }> = ({ navigation, route }) => {

  const [loading, setLoading] = useState(false);
  const  {profile}=useAppSelector(state=>state.user)
  
  const dispatch=useAppDispatch()
  
  useEffect(() => {

    if(profile==null){
      new UserHttp().meInfo().then(value=>{
        if(value!=null){
          dispatch(updateUserProfile(value!))
        }
      })
    }

}, []);


  const handleLogoutPress = async () => {
    socketClient.closeSession();
    dispatch(RESET_MESSAGE_REDUCER())
    dispatch(RESET_LIKE_REDUCER())
    dispatch(RESET_TEMP_USER_REDUCER())
    dispatch(RESET_USER_REDUCER())
   await tokenStorage.deleteRefreshToken()
   navigation.reset({
    index:0,
    routes:[{name:"Loader"}]
   }) 
  };

  const calculateAge = (dateBirth: any) => {
    const birthYear = new Date(dateBirth).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  //const age = calculateAge(userData.dateBirth);
  const ScreenWidth = Dimensions.get('window').width;
  console.log(ScreenWidth);
  const gradientColors =  ['#F857A6', '#20BDFF'];
  
  const onPress=()=>{
    console.log("push");
    
   
    
   
    const ac:NotificationAction={
      id:"ACTION_E",
      title:"SOS",
      
      textInput:{
        buttonTitle:"send",
        placeholder:"sendeeer"
      },
      
    }
    const ac1:NotificationAction={
      id:"CALL_112_ACTION1",
      title:"call",
    }
    const cat:NotificationCategory={
      id:"EMERGENCY_CATEGORY1",
      actions:[ac1]
    }
    PushNotificationIOS.setNotificationCategories([cat])
    const notReq:NotificationRequest={
      id:"1",
      title:"SOS-кнопка",
      category:"EMERGENCY_CATEGORY1",
      userInfo:{
        "rew":"dsds"
      }
      
      
    }
    
    PushNotificationIOS.addNotificationRequest(notReq)
  }




  return (
    <SafeAreaView style={styles.container}>
      <View>
        <NavPanel panel={ContextPanel.profile} />
      </View>
      {profile==null
        ?  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <Text>Load...</Text>
          </View>
        :<>
          <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{paddingLeft:0,marginTop:32.27}} > 
       <ScrollView horizontal contentContainerStyle={{width:ScreenWidth*2-38,height:319.73}} bounces={false} showsHorizontalScrollIndicator={false}>
        <Image
          style={styles.photo}
          alt='photo'
          width={ScreenWidth-48}

          height={319.73}
          source={{
            uri:"https://stihi.ru/pics/2011/02/26/2515.jpg"
          }}
          />
          <Image
          style={styles.photo}
          alt='photo'
          width={ScreenWidth-48}
        
          height={319.73}
          source={{
            uri:"https://stihi.ru/pics/2011/02/26/2515.jpg"
          }}
          />
       </ScrollView>
       <View style={{paddingLeft:106,paddingRight:106,width:ScreenWidth,position:"absolute",bottom:8,flexDirection:"row"}}>
          <View style={styles.page}>
          </View>
          <View style={[styles.page,{backgroundColor:"rgba(255, 255, 255, 0.5)"}]}>
          </View>
        </View>
      </View>
     
      <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:32,paddingHorizontal:20}}>
        <View>
            <Text style={{fontFamily:"SF Pro Display",fontWeight:"600",fontSize:25,lineHeight:29.3, color:"rgba(36, 39, 41, 1)"}}>{profile.first_name}, {new Date().getFullYear()-profile.birth.getFullYear()}</Text>
            <Text style={{fontFamily:"SF Pro Display",fontWeight:"400",fontSize:16,lineHeight:18.75, color:"rgba(54, 67, 77, 0.7)",marginTop:10}}>Сварщик{"(mock)"}</Text>
        </View>
        {/* <View style={{backgroundColor: "rgba(240, 246, 250, 1)",borderRadius:13,height:25.93,alignItems:'center',justifyContent:'center',paddingHorizontal:8.98}}>
          <Text style={{fontFamily:"SF Pro Display",fontWeight:"600",fontSize:12.96,lineHeight:15.19, color:"rgba(36, 39, 41, 1)"}}>1.8 км</Text>
        </View> */}
      </View>
      <View style={{marginTop:20.66,paddingHorizontal:20}}>
          <Text style={{fontFamily:"SF Pro Display",fontWeight:"500",fontSize:19,lineHeight:22.27, color:"rgba(54, 67, 77, 0.9)"}}>О себе</Text>
          <Text style={{fontFamily:"SF Pro Display",fontWeight:"400",fontSize:16,lineHeight:18.75, color:"rgba(54, 67, 77, 0.7)",marginTop:10.77}}>{profile.about_me}</Text>
      </View>
      <View style={{marginTop:20.57,paddingHorizontal:20}}>
          <Text style={{fontFamily:"SF Pro Display",fontWeight:"500",fontSize:19,lineHeight:22.27, color:"rgba(54, 67, 77, 0.9)",marginBottom:10}}>Интересы</Text>
          <View style={{flexDirection:"row",padding:0,flexWrap:'wrap'}}>
            {profile.interests.map(el=>(
               <GradientButton
               
              onPress={()=>{}}
            >
              <Text style={{fontFamily:"SF Pro Display",fontWeight:"500",fontSize:15.04,lineHeight:17.62, color:"rgba(36, 39, 41, 0.7)"}}>{el.interest_text}</Text>
            </GradientButton>
            ))}
         </View>
      </View>
         
        <GradientButton onPress={handleLogoutPress}>
          <Text >Выйти</Text>
        </GradientButton>
      </ScrollView>
      <Pressable onPress={Platform.OS=="ios"?onPress:()=>{}} style={{height:40}}>
              <Text>go push</Text>
      </Pressable>
        </>
      }
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    height:42.96,
    borderRadius: 9,
    paddingLeft:12.89,
    paddingRight:12.89,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:10.23
  },
  page:{
    flex:1,
    marginHorizontal:5,
    height:4,
    backgroundColor:"white",
    borderRadius:20,
  },
  photo:{
    marginLeft : 19,
    borderRadius:24
  },
  container: {
    backgroundColor:"white",
    flex:1
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ProfileScreen;
