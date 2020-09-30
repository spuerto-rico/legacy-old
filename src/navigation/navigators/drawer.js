import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Text, View, TouchableOpacity, LayoutAnimation, Image, Linking } from 'react-native';
import { DrawerActions } from 'react-navigation';

import { createDrawerNavigator, createAppContainer } from "react-navigation";
import * as screenNames from "../screen_names";
import Dashboard from "../../features/dashboard/components";
import NewMemberPlacement from "../../features/dashboard/components/NewMemberPlacement";
import MemberActivation from "../../features/dashboard/components/MemberActivation";
import MyTeamMembers from "../../features/dashboard/components/MyTeamMembers";
import MarketingCompliance from "../../features/dashboard/components/MarketingCompliance";
import WeeklyMeetingOutline from "../../features/dashboard/components/WeeklyMeetingOutline";
import MemberCertificationActivation from "../../features/dashboard/components/MemberCertificationActivation";
import EntrepreneurshipTraining from "../../features/dashboard/components/EntrepreneurshipTraining";
import LeadershipLive from "../../features/dashboard/components/LeadershipLive";
import CompensationTutorial from "../../features/dashboard/components/CompensationTutorial";
import SCBusinessGoal from "../../features/dashboard/components/SCBusinessGoal";
import SCHealthGoal from "../../features/dashboard/components/SCHealthGoal";
import ProductUsage from "../../features/dashboard/components/ProductUsage";
import ProductTraining from "../../features/dashboard/components/ProductTraining";
import EliteHealthChallenge from "../../features/dashboard/components/EliteHealthChallenge";
import ChangeAutoship from "../../features/dashboard/components/ChangeAutoship";
import MyPURL from "../../features/dashboard/components/MyPURL";
import ChangePassword from "../../features/dashboard/components/ChangePassword";
import EditPersonalDetails from "../../features/dashboard/components/EditPersonalDetails";
import PreviewContactPage from "../../features/dashboard/components/PreviewContactPage";
import Notification from "../../features/dashboard/components/Notification";
import CancelSubscription from "../../features/dashboard/components/CancelSubscription";
import UpdatePaymentInfo from "../../features/dashboard/components/UpdatePaymentInfo";
import PaymentHistory from "../../features/dashboard/components/PaymentHistory";
import TrainingWorkbook from "../../features/dashboard/components/TrainingWorkbook";
import SupportTicket from "../../features/dashboard/components/SupportTicket";
import FAQ from "../../features/dashboard/components/FAQ";
import BioMe from "../../features/dashboard/components/BioMe";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Badge from "../../components/Badge";

import ProductTestimonial from "../../features/dashboard/components/ProductTestimonial";

//marketing tools
import EliteHealthChallengeParticipant from "../../features/dashboard/components/EliteHealthChallengeParticipant";
import SendInvites from "../../features/dashboard/components/MarketingTools/SendInvites";
import EHCVideos from "../../features/dashboard/components/MarketingTools/EHCVideos";
import BusinessVideos from "../../features/dashboard/components/MarketingTools/BusinessVideos";
import OrderYourBusinessCard from "../../features/dashboard/components/MarketingTools/OrderYourBusinessCards";
import ProductsVideo from "../../features/dashboard/components/MarketingTools/ProductsVideo";

const CustomDrawerContentComponent = (props) => {

  toggleDrawer = (pageTitle) => {
    props.navigation.navigate(pageTitle);
    props.navigation.dispatch(DrawerActions.closeDrawer());
  }

  // Open URI on Menu clicked
  goToURL = (pageTitle) => {
    switch (pageTitle) {
      case 'Buy Products':
        Linking.openURL('https://7ot4562p.synergyworldwide.com/en-us/shop/productwall;category=All%20Products')
      case 'Pulse':
        Linking.openURL('https://www.synergyworldwide.com/en-us/login/email')
    }

  }

  const [isShowBusiness, onShowBusiness] = useState(true);
  const [isShowSC, onShowSC] = useState(true);
  const [isShowMeeting, onShowMeeting] = useState(true);
  const [isShowTraining, onShowTraining] = useState(true);
  const [isShowProducts, onShowProducts] = useState(true);
  const [isShowMarketing, onShowMarketing] = useState(true);
  const [isShowSettings, onShowSettings] = useState(true);
  const [isShowDocument, onShowDocument] = useState(true);
  const [isShowTechSupport, onShowTechSupport] = useState(true);
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    AsyncStorage.getItem("profileInfo").then((res) => {
      let $res = JSON.parse(res);
      setProfileInfo($res);
    })
  },[profileInfo])

  LayoutAnimation.easeInEaseOut()

  return (
    <ScrollView style={styles.container}>
      <View style={{paddingHorizontal: 10, paddingVertical: 20, borderBottomWidth: 0.3, borderColor: 'white', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
        <View style={{justifyContent: 'center', alignItems: 'center', marginRight: 15}}>
          <Badge number={profileInfo.achievement_level}/>
        </View>
        <View>
          <Text style={[styles.textStyle, {fontWeight: '500'}]}>Hello {profileInfo.first_name}</Text>
          <Text style={[styles.textStyle, {fontWeight: '500', fontSize: 13}]}>{`(Synergy ID# ${profileInfo.synergy_id})`}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={()=>toggleDrawer('dashboard')}>
        <View style={[styles.drawerItem, {flexDirection: 'row'}]}>
          <Ionicons name="ios-speedometer" size={20} color="white" />
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={styles.textStyle}>Dashboard</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View>
        <TouchableOpacity style={[styles.drawerItem, {backgroundColor: '#343535', flexDirection: 'row'}]} onPress={() => onShowBusiness(!isShowBusiness)}>
          <Ionicons name="ios-business" size={20} color="white" />
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={styles.textStyle}>Business Building</Text>
          </View>
          <Ionicons name={isShowBusiness ? 'ios-arrow-down':'ios-arrow-forward'} size={20} color="white" />
        </TouchableOpacity>
        {
          isShowBusiness ?
          <View style={{paddingHorizontal: 15}}>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('NewMemberPlacement')}>
              <Text style={styles.textStyle}>New Member Placement</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('MemberActivation')}>
              <Text style={styles.textStyle}>Member Activation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('MyTeamMembers')}>
              <Text style={styles.textStyle}>My Team Members</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('EliteHealthChallengeParticipant')}>
              <Text style={styles.textStyle}>My Health Challenge Participants</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>{ toggleDrawer(''), goToURL('Pulse') }}>
              <Text style={styles.textStyle}>Pulse</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('MarketingCompliance')}>
              <Text style={styles.textStyle}>Marketing Compliance</Text>
            </TouchableOpacity>
          </View>
          :
          null
        }
      </View>

      <View>

        <TouchableOpacity style={[styles.drawerItem, {backgroundColor: '#343535', flexDirection: 'row'}]} onPress={() => onShowMarketing(!isShowMarketing)}>
          <Ionicons name="ios-business" size={20} color="white" />
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={styles.textStyle}>Marketing Tools</Text>
          </View>
          <Ionicons name={isShowMarketing ? 'ios-arrow-down':'ios-arrow-forward'} size={20} color="white" />
        </TouchableOpacity>
        {
          isShowMarketing ?
          <View style={{paddingHorizontal: 15}}>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('SendInvites')}>
              <Text style={styles.textStyle}>Send Invites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('ProductsVideo')}>
              <Text style={styles.textStyle}>Products</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('EHCVideos')}>
              <Text style={styles.textStyle}>Elite Health Challenge</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('BusinessVideos')}>
              <Text style={styles.textStyle}>Business</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('OrderYourBusinessCard')}>
              <Text style={styles.textStyle}>Order your Business Cards</Text>
            </TouchableOpacity>
          </View>
          :
          null
        }
      </View>

      <View>
        <TouchableOpacity style={[styles.drawerItem, {backgroundColor: '#343535', flexDirection: 'row'}]} onPress={() => onShowSC(!isShowSC)}>
          <Ionicons name="ios-business" size={20} color="white" />
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={styles.textStyle}>Success Compass</Text>
          </View>
          <Ionicons name={isShowSC ? 'ios-arrow-down':'ios-arrow-forward'} size={20} color="white" />
        </TouchableOpacity>
        {
          isShowSC ?
          <View style={{paddingHorizontal: 15}}>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('SCBusinessGoal')}>
              <Text style={styles.textStyle}>Business Goal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('SCHealthGoal')}>
              <Text style={styles.textStyle}>Health Goal</Text>
            </TouchableOpacity>
          </View>
          :
          null
        }
      </View>

      <View>
        <TouchableOpacity style={[styles.drawerItem, {backgroundColor: '#343535', flexDirection: 'row'}]} onPress={() => onShowMeeting(!isShowMeeting)}>
          <Ionicons name="ios-calendar" size={20} color="white" />
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={styles.textStyle}>Team Meetings</Text>
          </View>
          <Ionicons name={isShowMeeting ? 'ios-arrow-down':'ios-arrow-forward'} size={20} color="white" />
        </TouchableOpacity>
        {
          isShowMeeting ?
          <View style={{paddingHorizontal: 15}}>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('WeeklyMeetingOutline')}>
              <Text style={styles.textStyle}>Weekly Meeting Outline</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('MemberCertificationActivation')}>
              <Text style={styles.textStyle}>Certification Meeting Outline</Text>
            </TouchableOpacity>
          </View>
          :
          null
        }
      </View>

      <View>
        <TouchableOpacity style={[styles.drawerItem, {backgroundColor: '#343535', flexDirection: 'row'}]} onPress={() => onShowTraining(!isShowTraining)}>
          <Ionicons name="ios-calendar" size={20} color="white" />
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={styles.textStyle}>Training</Text>
          </View>
          <Ionicons name={isShowTraining ? 'ios-arrow-down':'ios-arrow-forward'} size={20} color="white" />
        </TouchableOpacity>
        {
          isShowTraining ?
          <View style={{paddingHorizontal: 15}}>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('EntrepreneurshipTraining')}>
              <Text style={styles.textStyle}>Entrepreneurship Training</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('LeadershipLive')}>
              <Text style={styles.textStyle}>Leadership Live</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('CompensationTutorial')}>
              <Text style={styles.textStyle}>Compensation Tutorial</Text>
            </TouchableOpacity>
          </View>
          :
          null
        }
      </View>

      <View>
        <TouchableOpacity style={[styles.drawerItem, {backgroundColor: '#343535', flexDirection: 'row'}]} onPress={() => onShowProducts(!isShowProducts)}>
          <Ionicons name="ios-calendar" size={20} color="white" />
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={styles.textStyle}>Products</Text>
          </View>
          <Ionicons name={isShowProducts ? 'ios-arrow-down':'ios-arrow-forward'} size={20} color="white" />
        </TouchableOpacity>
        {
          isShowProducts ?
          <View style={{paddingHorizontal: 15}}>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('ProductUsage')}>
              <Text style={styles.textStyle}>Product Usage</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('ProductTraining')}>
              <Text style={styles.textStyle}>Product Training</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('EliteHealthChallenge')}>
              <Text style={styles.textStyle}>Elite Health Challenge</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>{ toggleDrawer(''), goToURL('Buy Products') }}>
              <Text style={styles.textStyle}>Buy Products</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('ProductTestimonial')}>
              <Text style={styles.textStyle}>Product Testimonials</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('ChangeAutoship')}>
              <Text style={styles.textStyle}>Change Autoship</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('BioMe')}>
              <Text style={styles.textStyle}>Biome Man</Text>
            </TouchableOpacity>
          </View>
          :
          null
        }
      </View>

      <View>
        <TouchableOpacity style={[styles.drawerItem, {backgroundColor: '#343535', flexDirection: 'row'}]} onPress={() => onShowTraining(!isShowTraining)}>
          <Ionicons name="ios-calendar" size={20} color="white" />
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={styles.textStyle}>Leave a Legacy</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={[styles.drawerItem, {backgroundColor: '#343535', flexDirection: 'row'}]} onPress={() => onShowSettings(!isShowSettings)}>
          <Ionicons name="ios-calendar" size={20} color="white" />
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={styles.textStyle}>Settings & Contact Info</Text>
          </View>
          <Ionicons name={isShowSettings ? 'ios-arrow-down':'ios-arrow-forward'} size={20} color="white" />
        </TouchableOpacity>
        {
          isShowSettings ?
          <View style={{paddingHorizontal: 15}}>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('MyPURL')}>
              <Text style={styles.textStyle}>My PURL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('ChangePassword')}>
              <Text style={styles.textStyle}>Change my LN Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('EditPersonalDetails')}>
              <Text style={styles.textStyle}>Edit Personal Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('PreviewContactPage')}>
              <Text style={styles.textStyle}>Preview my Contact Page</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('Notification')}>
              <Text style={styles.textStyle}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('CancelSubscription')}>
              <Text style={styles.textStyle}>Cancel My Subscription</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('UpdatePaymentInfo')}>
              <Text style={styles.textStyle}>Update Payment Information</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('PaymentHistory')}>
              <Text style={styles.textStyle}>Payment History</Text>
            </TouchableOpacity>
          </View>
          :
          null
        }
      </View>

      <View>
        <TouchableOpacity style={[styles.drawerItem, {backgroundColor: '#343535', flexDirection: 'row'}]} onPress={() => onShowDocument(!isShowDocument)}>
          <Ionicons name="ios-calendar" size={20} color="white" />
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={styles.textStyle}>Document Library</Text>
          </View>
          <Ionicons name={isShowDocument ? 'ios-arrow-down':'ios-arrow-forward'} size={20} color="white" />
        </TouchableOpacity>
        {
          isShowDocument ?
          <View style={{paddingHorizontal: 15}}>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('TrainingWorkbook')}>
              <Text style={styles.textStyle}>Entrepreneurship Training Workbook</Text>
            </TouchableOpacity>
          </View>
          :
          null
        }
      </View>

      <View>
        <TouchableOpacity style={[styles.drawerItem, {backgroundColor: '#343535', flexDirection: 'row'}]} onPress={() => onShowTechSupport(!isShowTechSupport)}>
          <Ionicons name="ios-calendar" size={20} color="white" />
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={styles.textStyle}>Tech Support</Text>
          </View>
          <Ionicons name={isShowTechSupport ? 'ios-arrow-down':'ios-arrow-forward'} size={20} color="white" />
        </TouchableOpacity>
        {
          isShowTechSupport ?
          <View style={{paddingHorizontal: 15}}>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('SupportTicket')}>
              <Text style={styles.textStyle}>Support Tickets</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={()=>toggleDrawer('FAQ')}>
              <Text style={styles.textStyle}>FAQ</Text>
            </TouchableOpacity>
          </View>
          :
          null
        }
      </View>

    </ScrollView>
  )
}

const MyDrawer = createDrawerNavigator({
  [screenNames.DASHBOARD]: { screen: Dashboard },
  'NewMemberPlacement': {screen: NewMemberPlacement},
  'MemberActivation': {screen: MemberActivation},
  'MyTeamMembers': {screen: MyTeamMembers},
  'MarketingCompliance': {screen: MarketingCompliance},
  'WeeklyMeetingOutline': {screen: WeeklyMeetingOutline},
  'MemberCertificationActivation': {screen: MemberCertificationActivation},
  'EntrepreneurshipTraining': {screen: EntrepreneurshipTraining},
  'LeadershipLive': {screen: LeadershipLive},
  'CompensationTutorial': {screen: CompensationTutorial},
  'SCBusinessGoal': {screen: SCBusinessGoal},
  'SCHealthGoal': {screen: SCHealthGoal},
  'ProductUsage': {screen: ProductUsage},
  'ProductTraining': {screen: ProductTraining},
  'ProductsVideo': {screen: ProductsVideo},
  'EliteHealthChallenge': {screen: EliteHealthChallenge},
  'ChangeAutoship': {screen: ChangeAutoship},
  'MyPURL' : {screen: MyPURL},
  'ChangePassword': {screen: ChangePassword},
  'EditPersonalDetails': {screen: EditPersonalDetails},
  'PreviewContactPage': {screen: PreviewContactPage},
  'Notification': {screen: Notification},
  'CancelSubscription': {screen: CancelSubscription},
  'UpdatePaymentInfo': {screen: UpdatePaymentInfo},
  'PaymentHistory': {screen: PaymentHistory},
  'TrainingWorkbook': {screen: TrainingWorkbook},
  'SupportTicket': {screen: SupportTicket},
  'FAQ': {screen: FAQ},
  'BioMe': {screen: BioMe},
  'EliteHealthChallengeParticipant': {screen: EliteHealthChallengeParticipant},
  'SendInvites': {screen: SendInvites},
  'EHCVideos': {screen: EHCVideos},
  'BusinessVideos': {screen: BusinessVideos},
  'OrderYourBusinessCard': {screen: OrderYourBusinessCard},
  'ProductTestimonial': {screen: ProductTestimonial}
}, {
  contentComponent: CustomDrawerContentComponent,
  initialRouteName: 'dashboard',
  drawerBackgroundColor: '#202020'
});

export default Drawer = createAppContainer(MyDrawer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  textStyle: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600'
  }
});
