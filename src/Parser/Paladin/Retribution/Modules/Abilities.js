import React from 'react';

import ITEMS from 'common/ITEMS';
import SpellLink from 'common/SpellLink';
import ItemLink from 'common/ItemLink';
import ISSUE_IMPORTANCE from 'Parser/Core/ISSUE_IMPORTANCE';
import CoreAbilities from 'Parser/Core/Modules/Abilities';

import SPELLS from '../SPELLS';

class Abilities extends CoreAbilities {
  spellbook() {
    const combatant = this.selectedCombatant;
    return [
      {
        spell: SPELLS.WAKE_OF_ASHES_TALENT,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 45,
        gcd: {
          base: 1500,
        },
        enabled: !combatant.hasShoulder(ITEMS.ASHES_TO_DUST.id) && combatant.hasTalent(SPELLS.WAKE_OF_ASHES_TALENT),
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.85,
          extraSuggestion: 'It has a high damage per execute time and generates a lot of holy power. It is better to waste 1-2 holy power than to hold the ability. Only hold the ability if adds are coming out in less than 3 seconds',
        },
      },
      {
        spell: SPELLS.WAKE_OF_ASHES_TALENT,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 45,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasShoulder(ITEMS.ASHES_TO_DUST.id) && combatant.hasTalent(SPELLS.WAKE_OF_ASHES_TALENT),
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: .95,
          extraSuggestion: <React.Fragment>With <ItemLink id={ITEMS.ASHES_TO_DUST.id} icon /> it is imperative you cast this on cooldown to get the damage bonus.</React.Fragment>,
          importance: ISSUE_IMPORTANCE.MAJOR,
        },
      },
      {
        spell: SPELLS.CRUSADE_TALENT,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 120,
        enabled: combatant.hasTalent(SPELLS.CRUSADE_TALENT),
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.9,
          importance: ISSUE_IMPORTANCE.MAJOR,
          extraSuggestion: 'This is our only cooldown and where most of our damage comes from. You really want to not lose a cast of this over a fight.',
        },
      },
      {
        spell: SPELLS.AVENGING_WRATH,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 120,
        enabled: !combatant.hasTalent(SPELLS.CRUSADE_TALENT),
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.9,
        },
      },
      {
        spell: SPELLS.CRUSADER_STRIKE,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        charges: 2,
        cooldown: haste => 6 / (1 + haste),
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
        },
      },
      {
        spell: SPELLS.JUDGMENT_CAST,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        cooldown: haste => 12 / (1 + haste),
        gcd: {
          base: 1500,
        },
        enabled: (!combatant.hasBuff(SPELLS.RET_PALADIN_T20_2SET_BONUS) && !combatant.hasBuff(SPELLS.RET_PALADIN_T21_2SET_BONUS)),
        castEfficiency: {
          suggestion: true,
        },
      },
      //This is the judgment CE with t20/21
      {
        spell: SPELLS.JUDGMENT_CAST,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        cooldown: haste => 12 / (1 + haste),
        gcd: {
          base: 1500,
        },
        enabled: (combatant.hasBuff(SPELLS.RET_PALADIN_T20_2SET_BONUS) || combatant.hasBuff(SPELLS.RET_PALADIN_T21_2SET_BONUS)),
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.95,
          extraSuggestion: <React.Fragment>With tier 20 and tier 21 it is even more important to use <SpellLink id={SPELLS.JUDGMENT_CAST} /> on cooldown</React.Fragment>,
        },
      },
      {
        spell: SPELLS.BLADE_OF_JUSTICE,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        cooldown: haste => 10.5 / (1 + haste),
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.75,
        },
      },
      {
        spell: SPELLS.HAMMER_OF_WRATH_TALENT,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        enabled: combatant.hasTalent(SPELLS.HAMMER_OF_WRATH_TALENT),
        cooldown: haste => 7.5 / (1 + haste),
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.TEMPLARS_VERDICT,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.DIVINE_STORM,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.INQUISITION_TALENT,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(SPELLS.INQUISITION_TALENT),
      },
      {
        spell: SPELLS.EXECUTION_SENTENCE_TALENT,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        cooldown: haste => 20 / (1 + haste),
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(SPELLS.EXECUTION_SENTENCE_TALENT),
        castEfficiency: {
          suggestion: true,
        },
      },
      {
        spell: SPELLS.CONSECRATION_TALENT,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        cooldown: haste => 20,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(SPELLS.CONSECRATION_TALENT),
        castEfficiency: {
          suggestion: true,
        },
      },
      //Utility
      {
        spell: SPELLS.SHIELD_OF_VENGEANCE,
        buffSpellId: SPELLS.SHIELD_OF_VENGEANCE,
        category: Abilities.SPELL_CATEGORIES.DEFENSIVE,
        cooldown: combatant.hasTalent(SPELLS.UNBREAKABLE_SPIRIT_TALENT) ? 84 : 120,
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.5,
          importance: ISSUE_IMPORTANCE.MINOR,
        },
      },
      {
        spell: SPELLS.JUSTICARS_VENGEANCE_TALENT,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(SPELLS.JUSTICARS_VENGEANCE_TALENT),
      },
      {
        spell: SPELLS.EYE_FOR_AN_EYE_TALENT,
        buffSpellId: SPELLS.EYE_FOR_AN_EYE_TALENT,
        category: Abilities.SPELL_CATEGORIES.DEFENSIVE,
        cooldown: 60,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(SPELLS.EYE_FOR_AN_EYE_TALENT),
      },
      {
        spell: SPELLS.WORD_OF_GLORY_TALENT,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        charges: 2,
        cooldown: 60,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(SPELLS.WORD_OF_GLORY_TALENT),
      },
      {
        spell: SPELLS.BLINDING_LIGHT_TALENT,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 90,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(SPELLS.BLINDING_LIGHT_TALENT),
      },
      {
        spell: SPELLS.REPENTANCE_TALENT,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 15,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(SPELLS.REPENTANCE_TALENT),
      },
      {
        spell: SPELLS.DIVINE_STEED,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        charges: combatant.hasTalent(SPELLS.CAVALIER_TALENT) ? 2 : 1,
        cooldown: 45,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.LAY_ON_HANDS,
        isDefensive: true,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: combatant.hasTalent(SPELLS.UNBREAKABLE_SPIRIT_TALENT) ? 420 : 600,
        castEfficiency: {
          recommendedEfficiency: 0.1,
        },
      },
      {
        spell: SPELLS.BLESSING_OF_FREEDOM,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 25,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.BLESSING_OF_PROTECTION,
        buffSpellId: SPELLS.BLESSING_OF_PROTECTION,
        isDefensive: true,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 300,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.HAMMER_OF_JUSTICE,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 60,
      },
      {
        spell: SPELLS.HAND_OF_RECKONING,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 8,
      },
      {
        spell: SPELLS.DIVINE_SHIELD,
        buffSpellId: SPELLS.DIVINE_SHIELD,
        category: Abilities.SPELL_CATEGORIES.DEFENSIVE,
        cooldown: combatant.hasTalent(SPELLS.UNBREAKABLE_SPIRIT_TALENT) ? 210 : 300,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.FLASH_OF_LIGHT,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        gcd: {
          base: 1500,
        },
      },
    ];
  }
}

export default Abilities;
