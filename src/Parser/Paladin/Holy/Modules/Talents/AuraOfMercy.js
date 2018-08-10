import React from 'react';

import SPELLS from '../../SPELLS';
import SpellIcon from 'common/SpellIcon';
import SpellLink from 'common/SpellLink';
import getSpellIcon from 'common/getSpellIcon';
import { formatNumber } from 'common/format';

import Analyzer from 'Parser/Core/Analyzer';
import AbilityTracker from 'Parser/Core/Modules/AbilityTracker';

import StatisticBox, { STATISTIC_ORDER } from 'Interface/Others/StatisticBox';

class AuraOfMercy extends Analyzer {
  static dependencies = {
    abilityTracker: AbilityTracker,
  };

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasTalent(SPELLS.AURA_OF_MERCY_TALENT);
  }

  get healing() {
    const abilityTracker = this.abilityTracker;
    const getAbility = spellId => abilityTracker.getAbility(spellId);

    return (getAbility(SPELLS.AURA_OF_MERCY_HEAL).healingEffective + getAbility(SPELLS.AURA_OF_MERCY_HEAL).healingAbsorbed);
  }
  get hps() {
    return this.healing / this.owner.fightDuration * 1000;
  }

  get suggestionThresholds() {
    return {
      actual: this.hps,
      isLessThan: {
        minor: 600,
        average: 550,
        major: 500,
      },
    };
  }

  suggestions(when) {
    when(this.suggestionThresholds).addSuggestion((suggest, actual, recommended) => {
      return suggest(
        <React.Fragment>
          The healing done by your <SpellLink id={SPELLS.AURA_OF_MERCY_TALENT} /> is low. Try to find a better moment to cast it or consider changing to <SpellLink id={SPELLS.AURA_OF_SACRIFICE_TALENT} /> or <SpellLink id={SPELLS.DEVOTION_AURA_TALENT} /> which can be more reliable.
        </React.Fragment>
      )
        .icon(getSpellIcon(SPELLS.AURA_OF_MERCY_TALENT))
        .actual(`${formatNumber(actual)} HPS`)
        .recommended(`>${formatNumber(recommended)} HPS is recommended`);
    });
  }
  statistic() {
    return (
      <StatisticBox
        position={STATISTIC_ORDER.OPTIONAL(60)}
        icon={<SpellIcon id={SPELLS.AURA_OF_MERCY_TALENT} />}
        value={`${formatNumber(this.hps)} HPS`}
        label="Healing done"
      />
    );
  }
}

export default AuraOfMercy;
