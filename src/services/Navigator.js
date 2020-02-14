import { NavigationActions } from 'react-navigation';

let navigator;

export function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

export default nav => {
  navigator = nav;
};
