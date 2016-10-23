import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import DuckImage from '../assets/Duck.jpg';
import './HomeView.scss';

export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <img
      alt="This is a duck, because Redux!"
      className="duck"
      src={DuckImage}
    />
    <RaisedButton label="Default" />
  </div>
);

export default HomeView;
