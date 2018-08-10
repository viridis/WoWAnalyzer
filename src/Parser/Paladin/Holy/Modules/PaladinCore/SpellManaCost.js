import SPELLS from '../../SPELLS';
import CoreSpellManaCost from 'Parser/Core/Modules/SpellManaCost';
import Combatants from 'Parser/Core/Modules/Combatants';

class SpellManaCost extends CoreSpellManaCost {
  static dependencies = {
    combatants: Combatants,
  };

  getResourceCost(event) {
    const spellId = event.ability.guid;
    const cost = super.getResourceCost(event);
    if (spellId !== SPELLS.HOLY_SHOCK_CAST && spellId !== SPELLS.LIGHT_OF_DAWN_CAST) {
      return cost;
    }
    if (cost === 0) {
      return cost;
    }

    if (spellId === SPELLS.HOLY_SHOCK_CAST && this.combatants.selected.hasBuff(SPELLS.DIVINE_PURPOSE_HOLY_SHOCK_BUFF, event.timestamp)) {
      return 0;
    }
    if (spellId === SPELLS.LIGHT_OF_DAWN_CAST && this.combatants.selected.hasBuff(SPELLS.DIVINE_PURPOSE_LIGHT_OF_DAWN_BUFF, event.timestamp)) {
      return 0;
    }

    return cost;
  }
}

export default SpellManaCost;
