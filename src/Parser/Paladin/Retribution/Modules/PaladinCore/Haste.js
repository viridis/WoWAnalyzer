import SPELLS from '../../SPELLS';
import CoreHaste from 'Parser/Core/Modules/Haste';

class Haste extends CoreHaste {
  static HASTE_BUFFS = {
    ...CoreHaste.HASTE_BUFFS,
    //Ret specific
    [SPELLS.CRUSADE_TALENT]: {
      hastePerStack: 0.03,
    },
    [SPELLS.INQUISITION_TALENT]: 0.07,
  };
}

export default Haste;
