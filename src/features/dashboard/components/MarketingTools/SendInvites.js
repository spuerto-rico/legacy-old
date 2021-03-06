import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  TouchableHighlight,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import AppHeader from '../../../../components/AppHeader';
import Card from '../../../../components/Card';
import FormInline from '../../../../components/FormInline';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Data from '../../data/categorylist';
import AccordionCategory from '../../../../components/AccordionCategory';
import DropDownPicker from 'react-native-dropdown-picker';
import SortableListView from 'react-native-sortable-listview';
import VideoPlayer from 'react-native-video-player';
import PDFView from 'react-native-view-pdf';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Contacts from 'react-native-contacts';
import Autocomplete from 'react-native-autocomplete-input';

var { height, width } = Dimensions.get('window');

import { sendInvite } from '../../actions';

let order = [];

class RowComponent extends Component {
  renderPdfView = (data) => {
    return (
      <View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.onPressArrow('up', data.id)}
            >
              <Ionicons name="md-arrow-dropup" color="black" size={40} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.onPressArrow('down', data.id)}
            >
              <Ionicons name="md-arrow-dropdown" color="black" size={40} />
            </TouchableOpacity>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 5 }}>
              {data.title}
            </Text>
          </View>
          <Image
            source={{ uri: data.content.thumbnail }}
            style={{ height: 150, width: 200, resizeMode: 'contain' }}
          />
        </View>

        <Button
          type="primary"
          text="View PDF"
          size="mid"
          buttonStyle={{ height: 35, marginBottom: 20, marginLeft: 10 }}
          onPress={() => {
            this.props.onViewPdf(data.content.url);
          }}
        />
        <TouchableOpacity
          style={{ position: 'absolute', top: -10, right: -5 }}
          onPress={() => this.props.onPressDelete(data.id)}
        >
          <Ionicons name="ios-close" color="black" size={40} />
        </TouchableOpacity>
      </View>
    );
  };

  renderVideoView = (data) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.onPressArrow('up', data.id)}
          >
            <Ionicons name="md-arrow-dropup" color="black" size={40} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.onPressArrow('down', data.id)}
          >
            <Ionicons name="md-arrow-dropdown" color="black" size={40} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              marginBottom: 10,
              marginLeft: 5,
            }}
          >
            {data.title}
          </Text>
        </View>
        {data.content.isVimeo ? (<VideoPlayer
          endWithThumbnail
          thumbnail={{ uri: data.content.thumbnail }}
          video={{ uri: data.content.url }}
          videoWidth={750}
          videoHeight={380}
          ref={(r) => (this.player = r)}
        />):(<VideoPlayer
          endWithThumbnail
          thumbnail={{ uri: data.content.thumbnail }}
          video={{ uri: data.content.url }}
          videoWidth={750}
          videoHeight={380}
          ref={(r) => (this.player = r)}
        />)}
        
        <TouchableOpacity
          style={{ position: 'absolute', top: -10, right: -5 }}
          onPress={() => this.props.onPressDelete(data.id)}
        >
          <Ionicons name="ios-close" color="black" size={40} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    let data = this.props.data;
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={{
          padding: 25,
          backgroundColor: '#F8F8F8',
          borderBottomWidth: 1,
          borderColor: '#eee',
        }}
        {...this.props.sortHandlers}
      >
        {data.content.isPdf
          ? this.renderPdfView(data)
          : this.renderVideoView(data)}
      </TouchableHighlight>
    );
  }
}

class SendInvites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      items: [
        {
          label: 'SMS Message',
          value: 'sms',
          icon: () => (
            <Ionicons name="ios-chatbubbles" size={18} color="black" />
          ),
        },
        {
          label: 'Email',
          value: 'email',
          icon: () => <Ionicons name="ios-mail" size={18} color="black" />,
        },
      ],
      type: 'sms',
      name: '',
      phone: '',
      message: '',
      subject: '',
      email: '',
      isNullName: false,
      isNullPhone: false,
      isNullMessage: false,
      isNullEmail: false,
      isValidEmail: true,
      isNullSubject: false,
      isCategoryVisible: false,
      isPreviewInvite: false,
      isPreviewPopup: false,
      inputPopup: '',
      inputType: '',
      listCategoryInvite: [],
      synergy_id: '',
      userId: 0,
      purl: 'partners',
      contacts: [],
      query: '',
      isPdfView: false,
      resource: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('profileInfo').then((res) => {
      let $res = JSON.parse(res);
      this.setState({
        synergy_id: $res.synergy_id,
        userId: $res.id,
        purl: $res.purl,
        name: `${$res.first_name} ${$res.last_name}`,
      });
    });

    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Contacts.getAll((err, contacts) => {
        if (err) {
          throw err;
        }
        console.log(contacts);
        this.setState({ contacts: contacts });
        // contacts returned
      });
    } else {
      console.log('Contact permission denied');
    }
  }

  onSetParams = async () => {
    var SynergyFactSheet =
      "<div class='card-body'><div class='row'><div class='col-7 col-sm-6' id='pdfLeft'><img src='https://synergylegacynetwork.com//images/products/PopUpsWithAssets/ProArgi-9+/Screenshot%20ProArgi-9+%20Info%20Sheet.png' class='img-responsive'></div><div class='col-5 col-sm-6' id='pdfRight'><p><h4 style='font-size: 20px !important;'>Synergy Fact Sheet</h4><a href='https://synergylegacynetwork.com//images/products/PopUpsWithAssets/ProArgi-9+/ProArgi9_ScienceInfoSheet_USen.pdf' target='_blank'><button type='button' id='sharedbutton'>View PDF</button> </a></p></div></div></div>";
    var HistoryOfProArgi =
      "<div class='card-body'><div class='row'><div class='col-7 col-sm-6' id='pdfLeft'><img src='https://synergylegacynetwork.com//images/products/PopUpsWithAssets/ProArgi-9+/Screenshot%20The%20History%20of%20ProArgi-9+.png' class='img-responsive'></div><div class='col-5 col-sm-6' id='pdfRight'><p><h4 style='font-size: 20px !important;'>History of ProArgi-9+</h4><a href='https://synergylegacynetwork.com//images/products/PopUpsWithAssets/ProArgi-9+/The_history_of_ProArgi-9+.pdf' target='_blank'><button type='button' id='sharedbutton'>View PDF</button> </a></p></div></div></div>";
    var SynergyVideoBuyButton =
      "<div class='embed-responsive embed-responsive-16by9'><center><iframe src='https://player.vimeo.com/video/312618526' frameborder='0' allow='accelerometer; autoplay; gyroscope; picture-in-picture'allowfullscreen></iframe></center></div><br>";

    var ProgiBuyButton =
      "<div class='card-body'>\
    <div class='row'>\
    <div class='col-8 col-sm-6' id='productLeft'>\
      <p><h4 style='font-size: 21px !important;''>PROARGI-9+</h4> <br>\
          <a href='https://" +
      this.state.synergy_id +
      "synergyworldwide.com/en-us/shop/product/ProArgi-9%2B' target='_blank'><button type='button' id='sharedbuttonproduct' value='1'>Buy</button> </a></p>\
        </div>\
          <div class='col-4 col-sm-6' id='productRight'>\
          <img src='https://synergylegacynetwork.com//images/products/proargi9noflavor-ssp-us.png' class='img-responsive'>\
          </div>\
      </div>\
    </div>";

    var PurifyKitBuyButton =
      "<div class='card-body'>\
    <div class='row'>\
    <div class='col-8 col-sm-6' id='productLeft'>\
      <p><h4 style='font-size: 21px !important;'>PURIFY KIT</h4> <br>\
          <a href='https://" +
      this.state.synergy_id +
      "synergyworldwide.com/en-us/shop/product/Purify%20Kit' target='_blank'><button type='button' id='sharedbuttonproduct' value='1'>Buy</button> </a></p>\
        </div>\
          <div class='col-4 col-sm-6' id='productRight'>\
          <img src='https://synergylegacynetwork.com//images/products/purify_kit.png' class='img-responsive'>\
          </div>\
      </div>\
    </div>";

    var TrulumPackBuyButton =
      "<div class='card-body'>\
    <div class='row'>\
    <div class='col-8 col-sm-6' id='productLeft'>\
      <p><h4 style='font-size: 21px !important;'>TRUL??M PACK</h4> <br>\
          <a href='https://" +
      this.state.synergy_id +
      "synergyworldwide.com/en-us/shop/product/Trul??m%20Pack' target='_blank'><button type='button' id='sharedbuttonproduct' value='1'>Buy</button> </a></p>\
        </div>\
          <div class='col-4 col-sm-6' id='productRight'>\
          <img src='https://synergylegacynetwork.com//images/trulum-pack.png' class='img-responsive'>\
          </div>\
      </div>\
    </div>";

    let params = {
      user_id: this.state.userId,
      type: this.state.type,
      sender_name: this.state.name,
      purl: this.state.purl,
      name: this.state.message,
      video_invite: '',
    };

    if (this.state.type === 'sms') {
      params['phone'] = this.state.phone;
    } else {
      params['email'] = this.state.email;
      params['subject'] = this.state.subject;
    }

    let $listCategory = this.state.listCategoryInvite;

    order.map((keys, id) => {
      let data = $listCategory[keys];
      if (data.title == 'Synergy Fact Sheet') {
        params[`getVal${id + 1}`] = SynergyFactSheet;
        params[`display${id + 1}`] = data.title;
      } else if (data.title == 'History of ProArgi-9+') {
        params[`getVal${id + 1}`] = HistoryOfProArgi;
        params[`display${id + 1}`] = data.title;
      } else if (data.title == 'Synergy Video Buy Button') {
        params[`getVal${id + 1}`] = SynergyVideoBuyButton;
        params[`display${id + 1}`] = data.title;
      } else if (data.title == 'Link to PA9') {
        params[`getVal${id + 1}`] = ProgiBuyButton;
        params[`display${id + 1}`] = data.title;
      } else if (data.title == 'Link to EHC') {
        params[`getVal${id + 1}`] = PurifyKitBuyButton;
        params[`display${id + 1}`] = data.title;
      } else if (data.title == 'Link to Trul??m') {
        params[`getVal${id + 1}`] = TrulumPackBuyButton;
        params[`display${id + 1}`] = data.title;
      } else {
        params[`getVal${id + 1}`] = data.html;
        params[`display${id + 1}`] = data.title;
      }
    });

    return params;
  };

  onSendCancel = () => {
    this.setState({ isPreviewPopup: false, inputPopup: '', inputType: '' });
  };

  onSendDone = () => {
    if (this.state.inputType == 'message') {
      this.setState({ message: this.state.inputPopup });
    }

    if (this.state.inputType == 'email') {
      this.setState({ email: this.state.inputPopup });
    }

    if (this.state.inputType == 'phone') {
      this.setState({ phone: this.state.inputPopup });
    }

    this.setState({ isPreviewPopup: false, inputPopup: '', inputType: '' });
  };

  onFocusInput = (inputType, value) => {
    this.setState({ inputType, inputPopup: value, isPreviewPopup: true });
  };

  onSendInvite = async () => {
    const params = await this.onSetParams();
    console.log('SEND INVITE DATA', params);
    this.props.sendInvite(params).then((res) => {
      if (res) {
        Alert.alert(
          'Invitation was sent!',
          'Successfully sent invite!',
          [
            {
              text: 'OK',
              onPress: () => {
                order = [];
                this.setState({
                  listCategoryInvite: [],
                  name: '',
                  phone: '',
                  message: '',
                  subject: '',
                  email: '',
                });
                let self = this;
                setTimeout(() => {
                  self.setState({ isPreviewInvite: false });
                }, 1000);
              },
            },
          ],
          { cancelable: false }
        );
      }
    });
  };

  onNextStep = () => {
    if (this.state.type == 'sms') {
      if (
        this.state.name == '' ||
        this.state.phone == '' ||
        this.state.message == ''
      ) {
        alert('Please fill out all required fields');
        this.setState({
          isNullName: this.state.name == '' ? true : false,
          isNullPhone: this.state.phone == '' ? true : false,
          isNullMessage: this.state.message == '' ? true : false,
        });
      } else {
        this.setState({
          isPreviewInvite: true,
          isNullName: false,
          isNullPhone: false,
          isNullMessage: false,
        });
      }
    } else {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (
        this.state.name == '' ||
        this.state.message == '' ||
        this.state.subject == '' ||
        this.state.email == '' ||
        reg.test(this.state.email) === false
      ) {
        alert('Please fill out all required fields');
        this.setState({
          isNullName: this.state.name == '' ? true : false,
          isNullMessage: this.state.message == '' ? true : false,
          isNullEmail: this.state.email == '' ? true : false,
          isNullSubject: this.state.subject == '' ? true : false,
          isValidEmail: !(this.state.email == '' ? true : false)
            ? reg.test(this.state.email) === false
              ? false
              : true
            : true,
        });
      } else {
        this.setState({
          isPreviewInvite: true,
          isNullName: false,
          isNullMessage: false,
          isNullEmail: false,
          isValidEmail: true,
          isNullSubject: false,
        });
      }
    }
  };

  makeid = (length) => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  onAddInvite = async (data, id) => {
    console.log(data);
    if(data.content.isVimeo) {
      const VIMEO_ID = data.content.url;
      await fetch(`https://player.vimeo.com/video/${VIMEO_ID}/config`)
      .then(res => res.json())
      .then(res => {
        data.content.url = res.request.files.hls.cdns[res.request.files.hls.default_cdn].url;
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });
    }
    
    let $listInvitePreview = this.state.listCategoryInvite;
    let hashId = this.makeid(32);
    data['id'] = hashId;
    $listInvitePreview[hashId] = data;
    order = Object.keys($listInvitePreview);
    this.setState({
      listCategoryInvite: $listInvitePreview,
      isCategoryVisible: false,
    });
  };

  onDeleteItem = (hashId) => {
    let $listInvitePreview = this.state.listCategoryInvite;
    delete $listInvitePreview[hashId];
    order = Object.keys($listInvitePreview);
    this.setState({ listCategoryInvite: $listInvitePreview });
  };

  onReOrder = (direction, hashId) => {
    let $listInvitePreview = this.state.listCategoryInvite;
    let indexOfElement = order.indexOf(hashId);
    order.splice(
      direction == 'down' ? indexOfElement + 1 : indexOfElement - 1,
      0,
      order.splice(indexOfElement, 1)[0]
    );
    this.setState({ listCategoryInvite: $listInvitePreview });
  };

  renderCategory = () => {
    return (
      <Modal
        deviceHeight={height}
        deviceWidth={width}
        style={styles.modalContainer}
        isVisible={this.state.isCategoryVisible}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        hasBackdrop={false}
      >
        <View style={{ flex: 1 }}>
          <View style={{ height: 120, backgroundColor: '#00acef' }}>
            <View style={{ paddingTop: 60, paddingHorizontal: 20 }}>
              <Text
                style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}
              >
                Select which info you want to add to the landing page that will
                be shared.
              </Text>
            </View>
          </View>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 20 }}
          >
            {Data.category.map((item, id) => {
              return (
                <AccordionCategory
                  key={`${id}_main_${item.title}`}
                  title={item.title}
                  contentList={item}
                  onPress={(data, key) => this.onAddInvite(data, key)}
                />
              );
            })}
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.rightPosition}
          onPress={() => this.setState({ isCategoryVisible: false })}
        >
          <Ionicons name="ios-close" color="black" size={40} />
        </TouchableOpacity>
      </Modal>
    );
  };

  renderPdfViewer = () => {
    return (
      <Modal
        style={{ margin: 0, paddingTop: 80 }}
        isVisible={this.state.isPdfView}
      >
        <View
          style={{
            backgroundColor: '#202020',
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <TouchableOpacity
            style={{ alignSelf: 'flex-end' }}
            onPress={() => this.setState({ isPdfView: false })}
          >
            <FontAwesome name="close" color="#CCCCCC" size={30} />
          </TouchableOpacity>
        </View>
        <PDFView
          fadeInDuration={250.0}
          style={{ flex: 1 }}
          resource={this.state.resource}
          resourceType={'url'}
          onLoad={() => console.log('')}
          onError={() => console.log('Cannot render PDF')}
        />
      </Modal>
    );
  };

  onViewPdf = (pdfFile) => {
    this.setState({ isPdfView: true, resource: pdfFile });
  };

  renderInputPopup = () => {
    const { query } = this.state;
    const contacts = this.findFilm(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <Modal
        deviceHeight={height}
        deviceWidth={width}
        style={styles.modalContainer}
        isVisible={this.state.isPreviewPopup}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        hasBackdrop={false}
      >
        <View style={{ flex: 1 }}>
          <View style={{ height: 100, backgroundColor: '#00acef' }}>
            <View style={styles.lefttPosition}>
              <Button
                type="primaryV2"
                textColor="White"
                text="Cancel"
                textStyle={{ fontSize: 16, fontWeight: 'bold' }}
                buttonStyle={{
                  width: 90,
                  height: 40,
                  backgroundColor: 'tranparent',
                }}
                onPress={() => this.onSendCancel()}
              />
            </View>
            <View style={styles.rightPosition}>
              <Button
                type="primaryV2"
                textColor="White"
                text="Done"
                textStyle={{ fontSize: 16, fontWeight: 'bold' }}
                buttonStyle={{
                  width: 100,
                  height: 40,
                  backgroundColor: 'tranparent',
                }}
                onPress={() => this.onSendDone()}
              />
            </View>
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <FormInline>
              { this.state.inputType === 'message' ? (<Autocomplete
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoFocus = {true}
                  data={
                      contacts.length === 1 &&
                      comp(query, contacts[0].givenName)
                      ? []
                      : contacts
                  }
                  defaultValue={query}
                  onChangeText={(text) =>
                      this.setState({ query: text, inputPopup: text, message: text })
                  }
                  placeholder=""
                  renderItem={(res, id) => {
                      return (
                      <TouchableOpacity
                          style={{
                          backgroundColor: 'white',
                          paddingVertical: 5,
                          }}
                          key={id}
                          onPress={() =>
                          this.setState({
                              query: res.item.givenName,
                              message: res.item.givenName,
                              phone:
                              res.item.phoneNumbers.length > 0
                                  ? res.item.phoneNumbers[0].number
                                  : 'None',
                          })
                          }
                      >
                          <Text
                          style={{
                              paddingVertical: 5,
                              paddingHorizontal: 5,
                          }}
                          >
                          {res.item.givenName}{' '}
                          {res.item.phoneNumbers.length > 0
                              ? res.item.phoneNumbers[0].number
                              : 'None'}
                          </Text>
                      </TouchableOpacity>
                      );
                  }}
              />):(<Input
                autoFocus = {true}
                value={this.state.inputPopup}
                onChangeText={(inputPopup) => { 
                  this.setState({ inputPopup })
                }}
                containerStyle={{ marginBottom: 10 }}
              />)}
              
            </FormInline>
          </View>
        </View>
      </Modal>
    );
  };

  renderPreviewInvite = () => {
    return (
      <Modal
        deviceHeight={height}
        deviceWidth={width}
        style={styles.modalContainer}
        isVisible={this.state.isPreviewInvite}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
      >
        <View style={{ flex: 1 }}>
          <View style={{ height: 100, backgroundColor: '#00acef' }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 40,
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}
              >
                INVITE PREVIEW
              </Text>
            </View>
            <View style={styles.rightPosition}>
              <Button
                type="primaryV2"
                textColor="White"
                text="SEND"
                textStyle={{ fontSize: 16, fontWeight: 'bold' }}
                buttonStyle={{
                  width: 80,
                  height: 40,
                  backgroundColor: 'tranparent',
                }}
                onPress={() => this.onSendInvite()}
              />
            </View>
          </View>
          <Image
            source={{ uri: 'https://synergylegacynetwork.com/files/logo.png' }}
            style={{
              width: 220,
              height: 60,
              resizeMode: 'contain',
              alignSelf: 'center',
              marginTop: 10,
            }}
          />
          <View style={{ flex: 1 }}>
            <SortableListView
              style={{ flex: 1 }}
              data={this.state.listCategoryInvite}
              order={order}
              onRowMoved={(e) => {
                order.splice(e.to, 0, order.splice(e.from, 1)[0]);
              }}
              renderRow={(row, index) => (
                <RowComponent
                  data={row}
                  onPressDelete={(hashId) => this.onDeleteItem(hashId)}
                  onPressArrow={(direction, hashId) =>
                    this.onReOrder(direction, hashId)
                  }
                  onViewPdf={(data) => this.onViewPdf(data)}
                />
              )}
            />
          </View>
        </View>
        <View style={styles.fabContainer}>
          <Button
            type="primaryV2"
            textColor="White"
            text="+"
            textStyle={{ fontSize: 40, fontWeight: 'bold' }}
            buttonStyle={styles.addContainer}
            onPress={() => this.setState({ isCategoryVisible: true })}
          />
        </View>
        {this.renderCategory()}
        <TouchableOpacity
          style={styles.lefttPosition}
          onPress={() => this.setState({ isPreviewInvite: false })}
        >
          <Ionicons name="ios-arrow-round-back" color="white" size={40} />
        </TouchableOpacity>
      </Modal>
    );
  };

  findFilm(query) {
    if (query === '') {
      return [];
    }

    const { contacts } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return contacts.filter((contact) => contact.givenName.search(regex) >= 0);
  }

  setOpen = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  setValue = (callback) => {
    this.setState({
      type: callback(this.state.type),
    });
  };

  render() {
    

    return (
      <View style={{ flex: 1 }}>
        <AppHeader
          title="SEND INVITES"
          onLeftButtonPress={() => this.props.navigation.openDrawer()}
        />
        <ScrollView
          style={[styles.container, { backgroundColor: '#eee' }]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          alwaysBounceVertical={true}
        >
          <Card title="SEND INVITE" isShadow={true}>
            <View style={styles.textContainer}>
              <View>
                  <FormInline >
                    <Input
                      editable={false}
                      placeholder={this.state.name}
                      value={this.state.name}
                      onChangeText={(name) => this.setState({ name })}
                      containerStyle={{ marginBottom: 10 }}
                    />
                    {this.state.isNullName ? (
                      <Text style={styles.errorText}>
                        *Please fill out this required field
                      </Text>
                    ) : null}
                  </FormInline>
              </View>
              {Platform.OS == 'android' ? (
                <FormInline label="Message Type">
                  <DropDownPicker
                    open={this.state.open}
                    value={this.state.type}
                    items={this.state.items}
                    setOpen={() => this.setOpen()}
                    setValue={(value) => this.setValue(value)}
                    style={{ backgroundColor: 'white' }}
                  />
                </FormInline>
              ) : (
                <FormInline label="Message Type" style={{ zIndex: 10 }}>
                  <DropDownPicker
                    open={this.state.open}
                    value={this.state.type}
                    items={this.state.items}
                    setOpen={() => this.setOpen()}
                    setValue={(value) => this.setValue(value)}
                    style={{ backgroundColor: 'white' }}
                  />
                </FormInline>
              )}

              {this.state.type == 'sms' ? (
                <View>
                  <FormInline label="Contact's Name">
                    <TouchableOpacity
                      onPress={() =>
                        this.onFocusInput('message', this.state.message)
                      }
                    >
                      {Platform.OS != 'android' ? (<Input
                        pointerEvents={'none'}
                        placeholder={this.state.message}
                        value={this.state.message}
                        onChangeText={(message) => this.setState({ message })}
                        containerStyle={{ marginBottom: 10 }}
                      />): (<View style={styles.inputStyle}>
                        <Text style={{color: 'black', fontSize: 16}}>{this.state.message}</Text>
                      </View>)}
                    </TouchableOpacity>
                    {this.state.isNullMessage ? (
                      <Text style={styles.errorText}>
                        *Please fill out this required field
                      </Text>
                    ) : null}
                  </FormInline>
                  <FormInline label="Phone">
                    <TouchableOpacity
                      onPress={() =>
                        this.onFocusInput('phone', this.state.phone)
                      }
                    >
                      {Platform.OS != 'android' ? (<Input
                        pointerEvents={'none'}
                        placeholder={this.state.phone}
                        value={this.state.phone}
                        onChangeText={(phone) => this.setState({ phone })}
                        containerStyle={{ marginBottom: 10 }}
                      />): (<View style={styles.inputStyle}>
                        <Text style={{color: 'black', fontSize: 16}}>{this.state.phone}</Text>
                      </View>)}
                    </TouchableOpacity>
                    {this.state.isNullPhone ? (
                      <Text style={styles.errorText}>
                        *Please fill out this required field
                      </Text>
                    ) : null}
                  </FormInline>
                </View>
              ) : (
                <View>
                  <FormInline label="Subject">
                    <Input
                      placeholder={this.state.subject}
                      value={this.state.subject}
                      onChangeText={(subject) => this.setState({ subject })}
                      containerStyle={{ marginBottom: 10 }}
                    />
                    {this.state.isNullSubject ? (
                      <Text style={styles.errorText}>
                        *Please fill out this required field
                      </Text>
                    ) : null}
                  </FormInline>
                  <FormInline label="Contact's Name">
                    <TouchableOpacity
                      onPress={() =>
                        this.onFocusInput('message', this.state.message)
                      }
                    >
                      {Platform.OS == 'ios' ? (<Input
                        pointerEvents={'none'}
                        placeholder={this.state.message}
                        value={this.state.message}
                        onChangeText={(message) => this.setState({ message })}
                        containerStyle={{ marginBottom: 10 }}
                      />): (<View style={styles.inputStyle}>
                        <Text style={{color: 'black', fontSize: 16}}>{this.state.message}</Text>
                      </View>)}
                    </TouchableOpacity>
                    {this.state.isNullMessage ? (
                      <Text style={styles.errorText}>
                        *Please fill out this required field
                      </Text>
                    ) : null}
                  </FormInline>
                  <FormInline label="Email">
                    <TouchableOpacity
                      onPress={() =>
                        this.onFocusInput('email', this.state.email)
                      }
                    >
                      {Platform.OS == 'ios' ? (<Input
                        pointerEvents={'none'}
                        placeholder={this.state.email}
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                        containerStyle={{ marginBottom: 10 }}
                      />): (<View style={styles.inputStyle}>
                        <Text style={{color: 'black', fontSize: 16}}>{this.state.email}</Text>
                      </View>)}
                    </TouchableOpacity>
                    {this.state.isNullEmail ? (
                      <Text style={styles.errorText}>
                        *Please fill out this required field
                      </Text>
                    ) : null}
                    {!this.state.isValidEmail ? (
                      <Text style={styles.errorText}>*Email is invalid</Text>
                    ) : null}
                  </FormInline>
                </View>
              )}
              <Button
                type="primaryV2"
                textColor="White"
                text="Next"
                buttonStyle={{ flex: 1 }}
                onPress={() => this.onNextStep()}
              />
            </View>
          </Card>
        </ScrollView>
        {this.renderPreviewInvite()}
        {this.renderInputPopup()}
        {this.renderPdfViewer()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  textContainer: {
    padding: 15,
  },
  textStyle: {
    color: '#000',
    fontSize: 13,
    fontWeight: 'normal',
    marginBottom: 10,
  },
  urlTextStyle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#337ab7',
  },
  rightPosition: {
    position: 'absolute',
    top: 50,
    right: 5,
  },
  lefttPosition: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  modalContainer: {
    flex: 1,
    margin: 0,
    backgroundColor: 'white',
  },
  addContainer: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  fabContainer: {
    position: 'absolute',
    right: 40,
    bottom: 50,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  inputStyle: {
    borderColor: 'lightgray',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 2,
    paddingHorizontal: 2,
    height: 40,
  }
});

const mapStateToProps = (state) => ({
  data: state.dashboard,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      sendInvite,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SendInvites);
