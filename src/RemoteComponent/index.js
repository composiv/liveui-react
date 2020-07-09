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

/**
 *
 * RemoteComponent
 *
 */

import React, { useState, useEffect } from 'react';
import { Registry, ViewBuilder } from '@composiv/liveui-core';
import PropTypes from 'prop-types';

function RemoteComponent(props) {
  const { url, name, source, onError, ...compProps } = props;
  const [state, setState] = useState({ DynamicElement: undefined });

  useEffect(() => {
    fetchComponent();
  }, []);

  function fetchComponent() {
    if (url) {
      handleRequest(url);
    } else if (name) {
      const componentUrl = Registry.getComponentUrl(name);
      handleRequest(componentUrl);
    } else if (source) {
      const DynamicElement = ViewBuilder.build(source, onError);
      setState({ DynamicElement });
    }
  }

  function handleRequest(componentUrl) {
    fetch(componentUrl, { method: 'GET' })
      .then((response) => response.text())
      .then((js) => {
        const DynamicElement = ViewBuilder.build(js, onError);
        setState({ DynamicElement });
      })
      .catch((error) => {
        const DynamicElement = onError('Remote Component fetch failed', -200, error);
        setState({ DynamicElement });
      });
  }

  const { DynamicElement } = state;
  return DynamicElement ? <DynamicElement {...compProps} /> : null;
}

RemoteComponent.defaultProps = {
  onError: (message, code, error) => {
    console.log(message, code, error);
    return null;
  },
  cached: false,
};

RemoteComponent.propTypes = {
  name: PropTypes.string,
  source: PropTypes.string,
  onError: PropTypes.func,
  cached: PropTypes.bool,
};

export default RemoteComponent;
