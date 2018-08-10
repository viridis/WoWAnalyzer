import SPELLS from '../../SPELLS';
import ITEMS from 'common/ITEMS';

import CoreAlwaysBeCastingHealing from 'Parser/Core/Modules/AlwaysBeCastingHealing';

const debug = false;

class AlwaysBeCasting extends CoreAlwaysBeCastingHealing {
  static HEALING_ABILITIES_ON_GCD = [
    SPELLS.FLASH_OF_LIGHT,
    SPELLS.HOLY_LIGHT,
    SPELLS.HOLY_SHOCK_CAST,
    // ABILITIES.JUDGMENT_CAST, // Only with either JoL or Ilterendi
    SPELLS.LIGHT_OF_DAWN_CAST,
    SPELLS.LIGHT_OF_THE_MARTYR,
    SPELLS.BESTOW_FAITH_TALENT,
    SPELLS.HOLY_PRISM_TALENT,
    SPELLS.LIGHTS_HAMMER_TALENT,
    // ABILITIES.CRUSADER_STRIKE, // Only with Crusader's Might, is added in constructor if applicable
  ];

  constructor(...args) {
    super(...args);

    if (this.selectedCombatant.hasTalent(SPELLS.CRUSADERS_MIGHT_TALENT)) {
      this.constructor.HEALING_ABILITIES_ON_GCD.push(SPELLS.CRUSADER_STRIKE);
    }
    if (this.selectedCombatant.hasTalent(SPELLS.JUDGMENT_OF_LIGHT_TALENT) || this.selectedCombatant.hasFinger(ITEMS.ILTERENDI_CROWN_JEWEL_OF_SILVERMOON)) {
      this.constructor.HEALING_ABILITIES_ON_GCD.push(SPELLS.JUDGMENT_CAST);
    }
  }

  countsAsHealingAbility(event) {
    const spellId = event.ability.guid;
    if (spellId === SPELLS.HOLY_SHOCK_CAST && !event.trigger.targetIsFriendly) {
      debug && console.log(`%cABC: ${event.ability.name} (${spellId}) skipped for healing time; target is not friendly`, 'color: orange');
      return false;
    }
    return super.countsAsHealingAbility(event);
  }
}

export default AlwaysBeCasting;
