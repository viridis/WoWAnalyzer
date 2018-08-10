import React from 'react';

import SPELLS from '../../SPELLS';
import SpellIcon from 'common/SpellIcon';
import SpellLink from 'common/SpellLink';
import getSpellName from 'common/getSpellName';
import getSpellIcon from 'common/getSpellIcon';
import { formatPercentage } from 'common/format';

import Analyzer from 'Parser/Core/Analyzer';

import StatisticBox, { STATISTIC_ORDER } from 'Interface/Others/StatisticBox';

class RuleOfLaw extends Analyzer {
  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasTalent(SPELLS.RULE_OF_LAW_TALENT);
  }

  get uptime() {
    return this.selectedCombatant.getBuffUptime(SPELLS.RULE_OF_LAW_TALENT) / this.owner.fightDuration;
  }

  get uptimeSuggestionThresholds() {
    return {
      actual: this.uptime,
      isLessThan: {
        minor: 0.25,
        average: 0.2,
        major: 0.1,
      },
      style: 'percentage',
    };
  }
  suggestions(when) {
    when(this.uptimeSuggestionThresholds).addSuggestion((suggest, actual, recommended) => {
      return suggest(
        <React.Fragment>
          Your <SpellLink id={SPELLS.RULE_OF_LAW_TALENT} /> uptime can be improved. Try keeping at least 1 charge on cooldown; you should (almost) never be at max charges.
        </React.Fragment>
      )
        .icon(getSpellIcon(SPELLS.RULE_OF_LAW_TALENT))
        .actual(`${formatPercentage(actual)}% uptime`)
        .recommended(`>${formatPercentage(recommended)}% is recommended`);
    });
  }
  statistic({ i18n }) {
    return (
      <StatisticBox
        position={STATISTIC_ORDER.CORE(31)}
        icon={<SpellIcon id={SPELLS.RULE_OF_LAW_TALENT} />}
        value={`${formatPercentage(this.uptime)} %`}
        label={i18n.t`${getSpellName(SPELLS.RULE_OF_LAW_TALENT)} uptime`}
      />
    );
  }
}

export default RuleOfLaw;
