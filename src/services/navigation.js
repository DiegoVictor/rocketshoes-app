import * as React from 'react';

export const navigation = React.createRef();

export const navigate = (name, params) => {
  return navigation.current?.navigate(name, params);
};
