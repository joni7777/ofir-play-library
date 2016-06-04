import React from 'react';
import classNames from 'classnames';
import './results.scss';

class TextGeneratorResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSEOEnabled: false
    }
  }

  componentDidMount() {
    this.setState({ isSEOEnabled: this.props.isSEOEnabled });
  }

  handleSEOClick() {
    this.setState(
      { isSEOEnabled: !this.state.isSEOEnabled },
      () => this.props.onClick(this.state.isSEOEnabled)
    );
  }

  render() {
    let seoClasses = classNames({
      'text-generator-results__seo': true,
      'text-generator-results__seo--active': !!this.state.isSEOEnabled,
    });

    return (
      <div className="text-generator-results">
        {this.props.count} Results

        <div onClick={this.handleSEOClick.bind(this)} className={seoClasses}>SEO Friendly</div>
      </div>
    );
  }
}

TextGeneratorResults.propTypes = {
  count: React.PropTypes.number.isRequired,
  isSEOEnabled: React.PropTypes.number.isRequired,
};

export default TextGeneratorResults;

