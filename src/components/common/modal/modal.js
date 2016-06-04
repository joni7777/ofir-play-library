import React from 'react';
import Draggable from 'react-draggable';
import './modal.scss';

class WixModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Draggable handle=".wix-modal-header, .wix-modal-header *">
        <div className="wix-modal">
          <div className="wix-modal-header">
            <div className="wix-modal-header__title">{this.props.title}</div>
            <div className="wix-modal-header__controls">
              <span className="wix-modal-header__control">?</span>
              <span
                onClick={this.props.onClose}
                className="wix-modal-header__control">&times;</span>
            </div>
          </div>

          <div className="wix-modal-content">
            {this.props.children}
          </div>
        </div>
      </Draggable>
    );
  }
}

WixModal.propTypes = {
  title: React.PropTypes.string.isRequired,
  onClose: React.PropTypes.func.isRequired
};

export default WixModal;

