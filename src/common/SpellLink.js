import React from 'react';
import PropTypes from 'prop-types';

import getSpellName from 'common/getSpellName';
import TooltipProvider from 'Interface/common/TooltipProvider';

import SpellIcon from './SpellIcon';

class SpellLink extends React.PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    children: PropTypes.node,
    category: PropTypes.string,
    icon: PropTypes.bool,
    iconStyle: PropTypes.object,
  };
  static defaultProps = {
    icon: true,
  };

  elem = null;

  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    TooltipProvider.refresh(this.elem);
  }

  render() {
    const { id, children, category = undefined, icon, iconStyle, ...other } = this.props;

    return (
      <a
        href={TooltipProvider.spell(id)}
        target="_blank"
        rel="noopener noreferrer"
        className={category}
        ref={elem => {
          this.elem = elem;
        }}
        {...other}
      >
        {icon && <SpellIcon id={id} noLink style={iconStyle} alt="" />}{' '}
        {children || (getSpellName(id))}
      </a>
    );
  }
}

export default SpellLink;
