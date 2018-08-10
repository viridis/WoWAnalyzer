import SPELLS from '../../SPELLS';
import Analyzer from 'Parser/Core/Analyzer';

class LightOfDawnIndexer extends Analyzer {
  _lightOfDawnHealIndex = 0;
  on_byPlayer_cast(event) {
    const spellId = event.ability.guid;
    if (spellId !== SPELLS.LIGHT_OF_DAWN_CAST) {
      return;
    }

    this._lightOfDawnHealIndex = 0;
  }

  on_byPlayer_heal(event) {
    const spellId = event.ability.guid;
    if (spellId !== SPELLS.LIGHT_OF_DAWN_HEAL) {
      return;
    }

    event.lightOfDawnHealIndex = this._lightOfDawnHealIndex;
    this._lightOfDawnHealIndex += 1;
  }
}

export default LightOfDawnIndexer;
