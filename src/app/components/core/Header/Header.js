// @flow strict
import React, { Component } from 'react';
// $FlowIgnore
import { connect } from 'react-redux';

import Icon from '@/components/base/Icon/Icon';
import Navigation from '@/components/core/Navigation/Navigation';

import './Header.scss';

type PropsType = {};

type StateType = {};

class Header extends Component<PropsType, StateType> {
  state = {};

  render() {
    return (
      <div className="header">
        <Navigation />
        <span>
          <Icon name="cart" />
        </span>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
