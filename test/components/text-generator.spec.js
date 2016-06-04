import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'mocha-jsdom';
import domMock from '../dom-mock';
import $ from 'jquery';
domMock('<html><body></body></html>');

import TextGenerator from '../../src/components/text-generator/text-generator.js';
let textGenerator = TestUtils.renderIntoDocument(<TextGenerator />);

describe('Component: TextGenerator', () => {
  jsdom({ skipWindowCheck: true  });
});

