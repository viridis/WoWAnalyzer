import React from 'react';

import SPELLS from '../../SPELLS';
import SpellIcon from 'common/SpellIcon';
import getSpellIcon from 'common/getSpellIcon';
import { formatPercentage } from 'common/format';
import Analyzer from 'Parser/Core/Analyzer';
import StatisticBox, { STATISTIC_ORDER } from 'Interface/Others/StatisticBox';

class Consecration extends Analyzer {
  get uptime() {
    return this.selectedCombatant.getBuffUptime(SPELLS.CONSECRATION_BUFF) / this.owner.fightDuration;
  }

  get uptimeSuggestionThresholds() {
    return {
      actual: this.uptime,
      isLessThan: {
        minor: 0.95,
        average: 0.9,
        major: .8,
      },
      style: 'percentage',
    };
  }

  suggestions(when) {
    when(this.uptimeSuggestionThresholds)
        .addSuggestion((suggest, actual, recommended) => {
          return suggest('Your Consecration uptime can be improved. Maintain it to reduce all incoming damage by a flat amount and refresh it during rotational downtime.')
            .icon(getSpellIcon(SPELLS.CONSECRATION_CAST))
            .actual(`${formatPercentage(actual)}% Consecration uptime`)
            .recommended(`>${formatPercentage(recommended)}% is recommended`);
        });
  }

  statistic() {
    return (
      <StatisticBox
        icon={<SpellIcon id={SPELLS.CONSECRATION_CAST} />}
        value={`${formatPercentage(this.uptime)} %`}
        label="Consecration uptime"
      />
    );
  }

  statisticOrder = STATISTIC_ORDER.CORE(2);
}

export default Consecration;
