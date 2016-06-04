import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'mocha-jsdom';
import domMock from '../dom-mock';
domMock('<html><body></body></html>');

import TextEditor from '../../src/components/text-editor/text-editor.js';
let component = TestUtils.renderIntoDocument(
  <TextEditor />
);

describe('Component: TextEditor', () => {
  jsdom({ skipWindowCheck: true  });

  //it('should work', function() {
  //});
});

