import React from 'react';

import { formatPercentage, formatThousands } from 'common/format';
import SPELLS from '../../SPELLS';
import MAGIC_SCHOOLS from 'common/MAGIC_SCHOOLS';
import SpellIcon from 'common/SpellIcon';
import SpellLink from 'common/SpellLink';
import getSpellIcon from 'common/getSpellIcon';
import StatisticBox, { STATISTIC_ORDER } from 'Interface/Others/StatisticBox';
import Analyzer from 'Parser/Core/Analyzer';

class ShieldOfTheRighteous extends Analyzer {

  physicalHitsWithShieldOfTheRighteous = 0;
  physicalDamageWithShieldOfTheRighteous = 0;
  physicalHitsWithoutShieldOfTheRighteous = 0;
  physicalDamageWithoutShieldOfTheRighteous = 0;

  on_toPlayer_damage(event) {
    if (event.ability.type === MAGIC_SCHOOLS.ids.PHYSICAL && this.selectedCombatant.hasBuff(SPELLS.SHIELD_OF_THE_RIGHTEOUS_BUFF)) {
      this.physicalHitsWithShieldOfTheRighteous += 1;
      this.physicalDamageWithShieldOfTheRighteous += event.amount + (event.absorbed || 0) + (event.overkill || 0);
    } else if (event.ability.type === MAGIC_SCHOOLS.ids.PHYSICAL && !this.selectedCombatant.hasBuff(SPELLS.SHIELD_OF_THE_RIGHTEOUS_BUFF)) {
      this.physicalHitsWithoutShieldOfTheRighteous += 1;
      this.physicalDamageWithoutShieldOfTheRighteous += event.amount + (event.absorbed || 0) + (event.overkill || 0);
    }
  }

  get suggestionThresholds() {
    return {
      actual: this.physicalDamageWithShieldOfTheRighteous / (this.physicalDamageWithShieldOfTheRighteous + this.physicalDamageWithoutShieldOfTheRighteous),
      isLessThan: {
        minor: 0.5,
        average: 0.35,
        major: 0.2,
      },
      style: 'percentage',
    };
  }

  suggestions(when) {
    when(this.suggestionThresholds)
        .addSuggestion((suggest, actual, recommended) => {
          return suggest(<React.Fragment>You only had the <SpellLink id={SPELLS.SHIELD_OF_THE_RIGHTEOUS} /> buff for {formatPercentage(actual)}% of physical damage taken. You should have Shield of the Righteous up to mitigate as much physical damage as possible.</React.Fragment>)
            .icon(getSpellIcon(SPELLS.SHIELD_OF_THE_RIGHTEOUS))
            .actual(`${formatPercentage(actual)}% was mitigated by Shield of the Righteous`)
            .recommended(`${Math.round(formatPercentage(recommended))}% or more is recommended`);
        });
  }

  statistic() {
    const physicalHitsMitigatedPercent = this.physicalHitsWithShieldOfTheRighteous / (this.physicalHitsWithShieldOfTheRighteous + this.physicalHitsWithoutShieldOfTheRighteous);
    const physicalDamageMitigatedPercent = this.physicalDamageWithShieldOfTheRighteous / (this.physicalDamageWithShieldOfTheRighteous + this.physicalDamageWithoutShieldOfTheRighteous);

    return (
      <StatisticBox
        icon={<SpellIcon id={SPELLS.SHIELD_OF_THE_RIGHTEOUS} />}
        value={`${formatPercentage (physicalDamageMitigatedPercent)}%`}
        label="Physical damage mitigated"
        tooltip={`Shield of the Righteous usage breakdown:
            <ul>
                <li>You were hit <b>${this.physicalHitsWithShieldOfTheRighteous}</b> times with your Shield of the Righteous buff (<b>${formatThousands(this.physicalDamageWithShieldOfTheRighteous)}</b> damage).</li>
                <li>You were hit <b>${this.physicalHitsWithoutShieldOfTheRighteous}</b> times <b><i>without</i></b> your Shield of the Righteous buff (<b>${formatThousands(this.physicalDamageWithoutShieldOfTheRighteous)}</b> damage).</li>
            </ul>
            <b>${formatPercentage(physicalHitsMitigatedPercent)}%</b> of physical attacks were mitigated with Shield of the Righteous (<b>${formatPercentage(physicalDamageMitigatedPercent)}%</b> of physical damage taken).`}
      />
    );
  }
  statisticOrder = STATISTIC_ORDER.CORE(10);
}

export default ShieldOfTheRighteous;
