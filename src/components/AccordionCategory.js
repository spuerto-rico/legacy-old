import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import PDFView from 'react-native-view-pdf';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AccordionSubCategory from './AccordionSubCategory';
// import DocumentPicker from 'react-native-document-picker';
var { height, width } = Dimensions.get('window');

export default class AccordionCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
      subExpanded: false,
      resource: '',
      isPdfView: false,
    };
  }

  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  subToggleExpand = () => {
    this.setState({ subExpanded: !this.state.subExpanded });
  };

  selectOneFile = async () => {
    //Opening Document Picker for selection of one file
    // try {
    //   const res = await DocumentPicker.pick({
    //     type: [DocumentPicker.types.images],
    //   });
    //   console.log(
    //     res.uri,
    //     res.type, // mime type
    //     res.name,
    //     res.size
    //   );
    // } catch (err) {
    //   if (DocumentPicker.isCancel(err)) {
    //     // User cancelled the picker, exit any dialogs or menus and move on
    //   } else {
    //     throw err;
    //   }
    // }
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

  renderSubContent = () => {
    return (
    <View style={styles.subContainer} >
      <View style={{ flex: 1 }}> 
        <Text style={{}}>Add a personally recorded short video for your invite.</Text>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => this.selectOneFile() }>
          {/*Single file selection button*/}
          <Text style={{marginRight: 10, fontSize: 19}}>
            Click here to pick one file
          </Text>
          <Image
            source={{
              uri: 'https://img.icons8.com/offices/40/000000/attach.png',
            }}
            style={styles.imageIconStyle}
          />
        </TouchableOpacity>
      </View>
    </View>);
  };

  renderContent = (subCategory) => {
    return (
      <View style={{ paddingLeft: 10 }}>
        {subCategory &&
          subCategory.map((item, id) => {
            return (
              <AccordionSubCategory
                key={`${id}_parent_${item.title}`}
                title={item.title}
                content={item}
                hasSubCategory={
                  item.subCategory && item.subCategory.length > 0 ? 'naa' : 'wa'
                }
                onPress={this.props.onPress}
              />
            );
          })}
      </View>
    );
  };

  render() {
    const { subCategory } = this.props.contentList;
    return (
      <View>
        <View>
          <TouchableOpacity onPress={() => this.toggleExpand()}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 16, color: '#777' }}>
                {this.state.expanded ? ' - ' : ' + '}
              </Text>
              <Text style={styles.title}>{this.props.title}</Text>
            </View>
          </TouchableOpacity>
          <View />
          {subCategory === false ? this.state.expanded && this.renderSubContent() : this.state.expanded && this.renderContent(subCategory)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderStyle: 'solid',
    borderLeftWidth: 0.5,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    marginBottom: 10,
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#337ab7',
    paddingBottom: 8,
  },
  child: {
    borderTopWidth: 0.5,
    borderColor: '#ddd',
    borderStyle: 'solid',
    backgroundColor: '#fff',
    padding: 16,
  },
  subContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  //https://aboutreact.com/file-uploading-in-react-native/
});
