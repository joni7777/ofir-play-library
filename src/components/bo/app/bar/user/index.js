import React from 'react';

import './index.scss';

export default React.createClass({
  render: function() {
    return (
      <div className="user">
        <span className="user__title">Yossi Nachemi</span>
        <img className="user__image" src="//s3.amazonaws.com/res.wixpulse.com/photos/208793/thumb/208793-IMG_4800.JPG?1432555829" />
      </div>
    );
  }
});
