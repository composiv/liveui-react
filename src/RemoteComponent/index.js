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
