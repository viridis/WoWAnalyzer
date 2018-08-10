import SPELLS from '../../SPELLS';

/*
 * Fields:
 * int: spell scales with Intellect
 * crit: spell scales with (is able to or procced from) Critical Strike
 * hasteHpm: spell does more healing due to Haste, e.g. HoTs that gain more ticks
 * hasteHpct: spell can be cast more frequently due to Haste, basically any spell except for non haste scaling CDs
 * mastery: spell is boosted by Mastery
 * masteryStack: spell's HoT counts as a Mastery Stack
 * vers: spell scales with Versatility
 * multiplier: spell scales with whatever procs it, should be ignored for purpose of weights and for 'total healing' number
 * ignored: spell should be ignored for purpose of stat weights
 */

// This only works with actual healing events; casts are not recognized.
export default {
  [SPELLS.HOLY_SHOCK_HEAL]: {
    int: true,
    crit: true,
    hasteHpct: true,
    mastery: true,
    vers: true,
  },
  [SPELLS.LIGHT_OF_DAWN_HEAL]: {
    int: true,
    crit: true,
    hasteHpct: true,
    mastery: true,
    vers: true,
  },
  [SPELLS.JUDGMENT_OF_LIGHT_HEAL]: {
    int: true,
    crit: true,
    hasteHpct: true,
    mastery: true,
    vers: true,
  },
  [SPELLS.BESTOW_FAITH_TALENT]: {
    int: true,
    crit: true,
    hasteHpct: false, // static CD
    mastery: true,
    vers: true,
  },
  [SPELLS.LIGHTS_HAMMER_HEAL]: {
    int: true,
    crit: true,
    hasteHpct: false, // static CD
    mastery: true,
    vers: true,
  },
  [SPELLS.HOLY_PRISM_HEAL_DIRECT]: {
    int: true,
    crit: true,
    hasteHpct: false, // static CD
    mastery: true,
    vers: true,
  },
  [SPELLS.HOLY_PRISM_HEAL]: {
    int: true,
    crit: true,
    hasteHpct: false, // static CD
    mastery: true,
    vers: true,
  },
  [SPELLS.LIGHT_OF_THE_MARTYR]: {
    int: true,
    crit: true,
    hasteHpct: true,
    mastery: true,
    vers: true,
  },
  [SPELLS.FLASH_OF_LIGHT]: {
    int: true,
    crit: true,
    hasteHpct: true,
    mastery: true,
    vers: true,
  },
  [SPELLS.HOLY_LIGHT]: {
    int: true,
    crit: true,
    hasteHpct: true,
    mastery: true,
    vers: true,
  },
  [SPELLS.AURA_OF_MERCY_HEAL]: {
    int: true,
    crit: true,
    hasteHpct: false,
    mastery: false, // confirmed many times this doesn't scale with Mastery
    vers: true,
  },
  [SPELLS.AVENGING_CRUSADER_HEAL_NORMAL]: {
    int: true,
    crit: true,
    hasteHpct: true,
    mastery: false, // it just raw scales off of the damage done
    vers: true,
  },
  [SPELLS.AVENGING_CRUSADER_HEAL_CRIT]: {
    int: true,
    crit: true,
    hasteHpct: true,
    mastery: false, // it just raw scales off of the damage done
    vers: true,
  },
  [SPELLS.BEACON_OF_LIGHT_HEAL]: {
    // This gets special treatment with the `on_beacon_heal` event
    ignored: true,
  },
  [SPELLS.LAY_ON_HANDS]: {
    ignored: true,
  },

  [SPELLS.STALWART_PROTECTOR]: { // General Paladin Azerite Power
    int: false,
    crit: false,
    hasteHpct: false,
    mastery: false,
    vers: true,
  },
};
