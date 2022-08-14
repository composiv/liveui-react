/**
 * Copyright Composiv Inc and its affiliates
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/order */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Registry } from '@eclipse-muto/liveui-core';
import RemoteComponent from '../index';
import 'whatwg-fetch';
Enzyme.configure({ adapter: new Adapter() });
const onError = function error() {
  return Function;
};
describe('ExampleComponent', () => {
  const externals = 'test';
  const components = { test: 'test' };
  Registry.register(
    externals,
    components,
    new Error('There is no renderer.  Please register a renderer for Open canvas using Registry.register...'),
  );
  beforeEach(() => {
    window.fetch = jest.fn();
  });
  beforeEach(() => {
    const res = new Response('{"hello":"world"}', {
      status: 200,
      headers: {
        'Content-type': 'application/json',
      },
    });
    window.fetch.mockReturnValue(Promise.resolve(res));
  });
  jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  test('should have default handleChange', () => {
    expect(RemoteComponent.defaultProps.onError).toBeDefined();
  });

  test('Default Props', () => {
    const result = RemoteComponent.defaultProps.onError();
    expect(result).toBe(null);
  });
  test('renders prop url', () => {
    try {
      expect(mount(<RemoteComponent url="http://localhost" />));
    } catch (error) {
      expect(mount(<RemoteComponent url="http://localhost" />)).toBe(error);
    }
  });
  test('renders prop name', () => {
    try {
      expect(mount(<RemoteComponent name="componentName" />));
    } catch (error) {
      expect(mount(<RemoteComponent name="componentName" />)).toBe(error);
    }
  });
  test('renders prop source', () => {
    try {
      expect(mount(<RemoteComponent source="source" />));
    } catch (error) {
      expect(mount(<RemoteComponent source="source" />)).toBe(error);
    }
  });
  test('renders', () => {
    try {
      expect(mount(<RemoteComponent />));
    } catch (error) {
      expect(mount(<RemoteComponent />)).toBe(error);
    }
  });
});
