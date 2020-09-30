import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image, Dimensions} from "react-native";
import PDFView from 'react-native-view-pdf';
import Modal from "react-native-modal";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AccordionSubCategory from './AccordionSubCategory';
var {height, width} = Dimensions.get('window');


export default class AccordionCategory extends Component {
  constructor(props) {
    super(props);
      this.state = {
        data: props.data,
        expanded: false,
        subExpanded: false,
        resource: "",
        isPdfView: false
    }
  }

  toggleExpand = () => {
    this.setState({ expanded : !this.state.expanded });
  }

  subToggleExpand = () => {
    this.setState({ subExpanded : !this.state.subExpanded });
  }

  renderPdfViewer = () => {
    return (
      <Modal style={{margin: 0, paddingTop: 80}} isVisible={this.state.isPdfView}>
        <View style={{backgroundColor: '#202020', paddingHorizontal: 10, paddingVertical: 5}}>
          <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() => this.setState({isPdfView: false})}>
            <FontAwesome name="close" color="#CCCCCC" size={30}  />
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
    )
  }

  onViewPdf = (pdfFile) => {
    this.setState({isPdfView: true, resource: pdfFile})
  }

  renderSubContent = () => {
    return (
      <View />
    )
  }

  renderContent = (subCategory) => {
    return (
      <View style={{paddingLeft: 10}}>
        { subCategory && subCategory.map((item, id) => {
          return (
            <AccordionSubCategory key={id} title={item.title} content={item} onPress={()=>this.props.onPress(item)} />
          )
        }) }
      </View>
    )
  }

  render() {
    const { subCategory } = this.props.contentList;
    return (
      <View>
        <View>
          <TouchableOpacity onPress={()=>this.toggleExpand()}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 16, color: '#777' }}>{this.state.expanded ? ' - ' : ' + '}</Text>
              <Text style={styles.title}>{this.props.title}</Text>
            </View>
          </TouchableOpacity>
          <View/>
          {
            this.state.expanded &&
            this.renderContent(subCategory)
          }
        </View>
      </View>
    )
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
    paddingBottom: 8
  },
  child: {
    borderTopWidth: 0.5,
    borderColor: '#ddd',
    borderStyle: 'solid',
    backgroundColor: '#fff',
    padding: 16
  },
});