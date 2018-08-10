import React from 'react';
import PropTypes from 'prop-types';

import getSpellName from 'common/getSpellName';
import getSpellIcon from 'common/getSpellIcon';

import SpellLink from './SpellLink';
import Icon from './Icon';

const SpellIcon = ({ id, noLink, alt, ...others }) => {
  const icon = (
    <Icon
      icon={getSpellIcon(id)}
      alt={alt !== '' ? getSpellName(id) : ''}
      {...others}
    />
  );

  if (noLink) {
    return icon;
  }

  return (
    <SpellLink id={id} icon={false}>
      {icon}
    </SpellLink>
  );
};
SpellIcon.propTypes = {
  id: PropTypes.number.isRequired,
  noLink: PropTypes.bool,
  alt: PropTypes.string,
};

export default SpellIcon;
