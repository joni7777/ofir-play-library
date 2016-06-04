import React from 'react';
import { connect } from 'react-redux';
import Toggle from 'material-ui/lib/toggle';
import $ from 'jquery';
import { API_URL } from '../../../scripts/config.js';

import { fetchSites, fetchTags, selectSite, unselectSite, createText, updateText } from '../../../app-bo-actions';
import Panel from './panel';
import Row from './row';
import Column from './column';
import SitesFilter from './sites-filter';
import WordsFilter from './words-filter';
import Editable from './editable';
import PageTitle from '../page-title';
import Button from '../../common/button';
import Select from '../../common/select';

import './index.scss';

function toNumber(text) {
  return parseInt(text, 10);
}

function fromNumber(number) {
  return number.toString();
}

function fromValue(value){
  return value.value;
}

const AppTextsEdit = React.createClass({

  getInitialState() {
    return {
      title: '',
      isNew: false,
      text: {
        categories: [],
        sections: [],
        intents: [],
        styles: [],
        views: 0,
        rank: 0,
        impression: 0,
        provider: 'wix',
        seo: false,
        text: '',
        html: '',
        suggestions: {}
      }
    };
  },
  toNumbers(text) {
    return Object.assign({}, text, {
      categories: text.categories.map(toNumber),
      sections: text.sections.map(toNumber),
      intents: text.intents.map(toNumber),
      styles: text.styles.map(toNumber)
    });
  },
  fromNumbers(text) {
    return Object.assign({}, text, {
      categories: text.categories.map(fromNumber),
      sections: text.sections.map(fromNumber),
      intents: text.intents.map(fromNumber),
      styles: text.styles.map(fromNumber)
    });
  },
  componentDidMount() {
    this.props.dispatch(fetchSites());
    this.props.dispatch(fetchTags());
    this.setState({
      title: this.props.params.id === 'new' ? 'Add New Text' : 'Edit the text',
      isNew: this.props.params.id === 'new'
    });
    if (!this.state.isNew) {
      $.get(`${API_URL}/texts/` + this.props.params.id).then(function (text) {
        this.setState({ text: this.fromNumbers(text) });
        this.refs.editable.setValue(text);
      }.bind(this));
    }
  },
  onSitesChanged(id, toggled) {
    this.props.dispatch(toggled ? selectSite(id) : unselectSite(id));
  },
  onSeoChange(event, enabled) {
    var text = this.state.text;
    this.setState({ text: Object.assign(text, { seo: enabled }) });
  },
  onCategoryChange(_, values) {
    var text = this.state.text;
    this.setState({ text: Object.assign(text, { categories: values.map(fromValue) }) });
  },
  onSectionChange(_, values) {
    var text = this.state.text;
    this.setState({ text: Object.assign(text, { sections: values.map(fromValue) }) });
  },
  onIntentChange(_, values) {
    var text = this.state.text;
    this.setState({ text: Object.assign(text, { intents: values.map(fromValue) }) });
  },
  onStyleChange(_, values) {
    var text = this.state.text;
    this.setState({ text: Object.assign(text, { styles: values.map(fromValue) }) });
  },
  onSave() {

    var content = this.refs.editable.getValue();
    var text = Object.assign({}, this.state.text, {
      text: content.text,
      html: content.html,
      suggestions: content.suggestions
    });

    if (this.state.isNew) {
      this.props.dispatch(createText(this.toNumbers(text)));
    } else {
      this.props.dispatch(updateText(this.props.params.id, this.toNumbers(text)));
    }

    this.props.history.replaceState(null, '/');
  },
  render() {
    return (
      <div>
        <PageTitle primary={this.state.title}>
          <Button size="large" route="/" secondary={true}>Cancel</Button>
          <Button size="large" onClick={this.onSave}>Save</Button>
        </PageTitle>
        <div className="app-texts-edit">
          <div className="app-texts-edit__form">
            <Panel title="Choose Filters" titleControls={<Toggle label="Present as SEO Friendly" labelPosition="right" labelStyle={{color: '#9fadb8', whiteSpace: 'nowrap'}} checked={this.state.text.seo} onToggle={this.onSeoChange} />}>
              <Column>
                <Row title="Category">
                  <Select options={this.props.tags.categories}
                          multi={true}
                          value={this.state.text.categories}
                          onChange={this.onCategoryChange}></Select>
                </Row>
                <Row title="I need a text for...">
                  <Select options={this.props.tags.sections}
                          multi={true}
                          value={this.state.text.sections}
                          onChange={this.onSectionChange}></Select>
                </Row>
              </Column>
              <Column>
                <Row title="I'd like to say...">
                  <Select options={this.props.tags.intents}
                          multi={true}
                          value={this.state.text.intents}
                          onChange={this.onIntentChange}></Select>
                </Row>
                <Row title="Text tone & style">
                  <Select options={this.props.tags.styles}
                          multi={true}
                          value={this.state.text.styles}
                          onChange={this.onStyleChange}></Select>
                </Row>
              </Column>
            </Panel>
            <Panel title="Enter Text">
              <Editable ref="editable"/>
            </Panel>
          </div>
          <div className="app-texts-edit__info">
            <Panel title="Writers Corner">
              <SitesFilter sites={this.props.sites.data} selected={this.props.selectedSites} onToggle={this.onSitesChanged}/>
              <WordsFilter words={this.props.words} onWordSelected={function () {}} />
            </Panel>
          </div>
        </div>
      </div>
    );
  }
});

export default connect(function (state) {
  return state;
})(AppTextsEdit);
