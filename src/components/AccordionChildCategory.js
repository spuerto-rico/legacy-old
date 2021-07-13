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
import AccordionInnerChildCategory from './AccordionChildCategory';
var { height, width } = Dimensions.get('window');
import Button from './Button';

export default class AccordionChildCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
      resource: '',
      isPdfView: false,
    };
  }

  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
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

  renderSubContent = (details) => {
    return (
      <View style={styles.subContainer}>
        <View style={{ flex: 1 }}>
          <Text style={{}}>{details.title}</Text>
          {details.content.isPdf ? (
            <Button
              type="primary"
              text="View PDF"
              size="mid"
              buttonStyle={{ height: 35, marginTop: 10 }}
              onPress={() => {}}
            />
          ) : null}

          <Button
            type="primary"
            text="Add to Invite"
            size="mid"
            size="mid"
            buttonStyle={{ height: 35, marginTop: 10 }}
            onPress={this.props.onPress}
          />
        </View>

        <Image
          source={{ uri: details.content.thumbnail }}
          style={styles.imageStyle}
        />
      </View>
    );
  };

  render() {
    const details = this.props.content;
    return (
      <View>
        <View>
          <TouchableOpacity onPress={() => this.toggleExpand()}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 16, color: '#777' }}>
                {this.state.expanded ? ' - ' : ' + '}
              </Text>
              <Text style={styles.title}>{this.props.title}sss</Text>
            </View>
          </TouchableOpacity>
          <View />
          {this.props.hasSubCategory === 'naa' ? (
            <View>
              <Text>naa ni</Text>
            </View>
          ) : (
            this.state.expanded && this.renderSubContent(details)
          )}
        </View>
        {this.renderPdfViewer()}
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
  imageStyle: {
    width: 140,
    height: 100,
    resizeMode: 'contain',
  },
  textStyle: {
    fontSize: 14,
    fontWeight: '500',
  },
});
