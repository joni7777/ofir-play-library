import React from 'react';
import $ from 'jquery';

import TextGenerator from './components/text-generator/text-generator.js';
import TextEditor from './components/text-editor/text-editor.js';
import WixModal from './components/common/modal/modal.js';
import { API_URL } from './scripts/config.js';

class WixEditor extends React.Component {
  constructor() {
    super();
    let self = this;
    this.state = {
      isModalVisible: false,
      texts: [{
        id: 1,
        className: 'title',
        position: {
          'top': '208px'
        }
      }, {
        id: 2,
        className: 'subtitle',
        position: {
          'top': '670px'
        }
      }, {
        id: 3,
        className: 'description',
        position: {
          'top': '775px'
        }
      }, {
        id: 6,
        className: 'about',
        position: {
          'top': '2220px'
        }
      }]
    };
    this.state.texts.forEach(function(text, index) {
      $.get(`${API_URL}texts/` + text.id).then(data => {
        self.state.texts[index].data = data;
        self.setState({'texts': self.state.texts});
        self.refs['editor' + index].setState({ text: data.html, suggestions: data.suggestions })
      })
    });
    document.body.onclick = function(e) {
      if (e.target.nodeName === 'BODY') {
        self.state.texts.forEach(function(text, index) {
          self.refs['editor' + index].setState({status: 'unselected', popupClass: 'popup'});
        });
        self.setState({ isModalVisible: false});
      }
    }
  }

  handleTextEditorClick(ref) {
    let self = this;
    if (this.refs[ref].state.status !== 'find') {
      this.setState({ isModalVisible: false, selectedText: ref });
      this.state.texts.forEach(function(text, index) {
        self.refs['editor' + index].setState({status: 'unselected', popupClass: 'popup'});
      });
      this.refs[ref].setState({status: 'selected'});
    }
  }

  findText(data, ref, e) {
    e.stopPropagation();
    this.refs[ref].setState({status: 'find'});
    this.setState({data: data}, function() {
      this.setState({ isModalVisible: true});
    });
  }

  handleModalClose() {
    this.setState({ isModalVisible: false });
  }

  selectText(text) {
    let id = parseInt(this.state.selectedText.replace('editor', ''));
    this.state.texts[id].data = text;
    this.setState({texts: this.state.texts});
    this.refs[this.state.selectedText].setState({text: text.html, suggestions: text.suggestions});
  }

  render() {
    let self = this;
    return (
      <div>
        {this.state.isModalVisible &&
        <WixModal title="Find Text" onClose={this.handleModalClose.bind(this)}>
          <TextGenerator ref="generator" data={this.state.data} selectionCallback={this.selectText.bind(this)}/>
        </WixModal>
        }
        {
          this.state.texts.map(function(text, index) {
            let ref = "editor" + index;
            return (<div key={text.id} className={'editor-' + text.id}><TextEditor position={text.position} ref={ref}
                                className={text.className}
                                findTextCallback={self.findText.bind(self, text.data, ref)} onClick={self.handleTextEditorClick.bind(self, ref)}/></div>)
          })
        }
      </div>
    );
  }
};

export default WixEditor;
