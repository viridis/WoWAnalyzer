import React from 'react';

import SPELLS from '../../SPELLS';
import SpellLink from 'common/SpellLink';
import getSpellIcon from 'common/getSpellIcon';
import { formatNumber } from 'common/format';
import Analyzer from 'Parser/Core/Analyzer';
import AbilityTracker from 'Parser/Core/Modules/AbilityTracker';

const CAST_BUFFER = 500;

class Crusade extends Analyzer {
	static dependencies = {
		abilityTracker: AbilityTracker,
	};

	constructor(...args) {
    super(...args);
		this.active = this.selectedCombatant.hasTalent(SPELLS.CRUSADE_TALENT);
	}

	crusadeCastTimestamp = 0;
	badFirstGlobal = 0;

	on_byPlayer_cast(event) {
		const spellId = event.ability.guid;
		if (spellId !== SPELLS.CRUSADE_TALENT) {
			return;
		}
		this.crusadeCastTimestamp = event.timestamp;
	}

	on_byPlayer_applybuffstack(event) {
		const spellId = event.ability.guid;
		if (spellId !== SPELLS.CRUSADE_TALENT) {
			return;
		}
		if(this.crusadeCastTimestamp && event.timestamp > this.crusadeCastTimestamp + CAST_BUFFER) {
			this.badFirstGlobal++;
		}
		this.crusadeCastTimestamp = null;
	}

	get badGlobalPercent() {
		return this.badFirstGlobal / this.abilityTracker.getAbility(SPELLS.CRUSADE_TALENT).casts;
	}

	get suggestionThresholds() {
		return {
			actual: 1 - this.badGlobalPercent,
			isLessThan: {
				minor: 1,
				average: 0.75,
				major: 0.5,
			},
			style: 'percentage',
		};
	}

	suggestions(when) {
		when(this.suggestionThresholds).addSuggestion((suggest, actual) => {
			return suggest(<React.Fragment>You want to build stacks of <SpellLink id={SPELLS.CRUSADE_TALENT} icon /> as quickly as possible. Make sure you are using <SpellLink id={SPELLS.TEMPLARS_VERDICT} icon /> or <SpellLink id={SPELLS.DIVINE_STORM} icon /> almost instantly after casting <SpellLink id={SPELLS.CRUSADE_TALENT} icon />.</React.Fragment>)
				.icon(getSpellIcon(SPELLS.CRUSADE_TALENT))
				.actual(`${formatNumber(this.badFirstGlobal)} bad first global(s)`)
				.recommended(`0 is recommended`);
		});
	}
}

export default Crusade;
