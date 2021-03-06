import React from 'react';
import SPELLS from 'common/SPELLS';
import SpellIcon from 'common/SpellIcon';
import SpellLink from 'common/SpellLink';
import { STATISTIC_ORDER } from 'interface/others/StatisticBox';
import { formatNumber, formatDuration } from 'common/format';
import Analyzer from 'parser/core/Analyzer';
import Statistic from 'interface/statistics/Statistic';
import BoringSpellValueText from 'interface/statistics/components/BoringSpellValueText/index';
import { ABILITIES_AFFECTED_BY_MASTERY } from '../../constants';

class ComboStrikes extends Analyzer {
  _lastSpellUsed = null;
  _lastThreeSpellsUsed = [];
  masteryDropSpellSequence = [];

  on_byPlayer_cast(event) {
    const spellId = event.ability.guid;
    const eventTimestamp = event.timestamp;

    if(!ABILITIES_AFFECTED_BY_MASTERY.includes(spellId)) {
        return;
    }

    // Track Details on the last 3 spells used - Need to populate up to 3 first, then begin to modify the array.
    if(this._lastThreeSpellsUsed.length < 3) {
        this._lastThreeSpellsUsed.push({
            ability: spellId,
            timestamp: eventTimestamp,
        });
    } else {
        this._lastThreeSpellsUsed = this._lastThreeSpellsUsed.slice(1);
        this._lastThreeSpellsUsed.push({
            ability: spellId,
            timestamp: eventTimestamp,
        });
    }

    if(this._lastSpellUsed === spellId) {
        this.masteryDropSpellSequence.push(this._lastThreeSpellsUsed);
    }
    this._lastSpellUsed = spellId;
  }

  get suggestionThresholds() {
    const hitComboMultiplier = this.selectedCombatant.hasTalent(SPELLS.HIT_COMBO_TALENT.id) ? 1 : 2;
    return {
      actual: this.masteryDropSpellSequence.length,
      isGreaterThan: {
        minor: 1 * hitComboMultiplier,
        average: 2 * hitComboMultiplier,
        major: 3 * hitComboMultiplier,
      },
      style: 'number',
    };
  }

  suggestions(when) {
    when(this.suggestionThresholds).addSuggestion((suggest, actual, recommended) => {
        return suggest(<span>You ignored your <SpellLink id={SPELLS.COMBO_STRIKES.id} /> buff by casting the same spell twice in a row. This directly lowers your overall damage, and if you have <SpellLink id={SPELLS.HIT_COMBO_TALENT.id} /> talented, you will also drop all stacks of this damage buff.</span>)
          .icon(SPELLS.COMBO_STRIKES.icon)
          .actual(`${actual} instances where mastery dropped.`)
          .recommended(`mastery should be dropped less than ${recommended} times`);
      });
  }

  statistic() {
    const masteryDropEvents = this.masteryDropSpellSequence.length;

    return (
      <Statistic
        position={STATISTIC_ORDER.CORE(2)}
        size="flexible"
        tooltip="This is the number of times you incorrectly casted the same spell twice in a row. While on its own this may be a minor mistake, if you combine this with the Hit Combo talent, you will also lose all of the damage increase provided by that talent buff."
        dropdown={(
          <>
            <div>
            Spell sequence when mastery dropped.
            </div>
            <table className="table table-condensed">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.masteryDropSpellSequence
                    .map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{formatDuration((item[0].timestamp - this.owner.fight.start_time) / 1000)}</th>
                        <td><SpellIcon id={item[0].ability} style={{ height: '2.4em' }} /></td>
                        <td><SpellIcon id={item[1].ability} style={{ height: '2.4em' }} /></td>
                        {item[2] && item[2].ability && (
                          <td><SpellIcon id={item[2].ability} style={{ height: '2.4em' }} /></td>
                        )}
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </>
        )}
      >
        <BoringSpellValueText spell={SPELLS.COMBO_STRIKES}>
          {formatNumber(masteryDropEvents)} <small>Mastery benefit mistakes</small>
        </BoringSpellValueText>
      </Statistic>
    );
  }
}

export default ComboStrikes;
