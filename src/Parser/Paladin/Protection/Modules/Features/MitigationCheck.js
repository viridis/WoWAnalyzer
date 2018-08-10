import CoreMitigationCheck from 'Parser/Core/Modules/MitigationCheck';
import SPELLS from '../../SPELLS';

class MitigationCheck extends CoreMitigationCheck {
  constructor(...args){
    super(...args);
    this.buffCheck = [SPELLS.SHIELD_OF_THE_RIGHTEOUS_BUFF,
                      SPELLS.ARDENT_DEFENDER,
                      SPELLS.GUARDIAN_OF_ANCIENT_KINGS];
  }
}

export default MitigationCheck;
