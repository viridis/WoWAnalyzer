import React from 'react';

import { Hewhosmites, Zerotorescue, joshinator } from 'CONTRIBUTORS';
import ITEMS from 'common/ITEMS';
import ItemLink from 'common/ItemLink';
import SpellLink from 'common/SpellLink';

import SPELLS from './SPELLS';

export default [
	{
		date: new Date('2018-04-07'),
		changes: <React.Fragment>Added a basic checklist for spell usage.</React.Fragment>,
		contributors: [joshinator],
	},
	{
		date: new Date('2018-04-07'),
		changes: <React.Fragment>Added <ItemLink id={ITEMS.BREASTPLATE_OF_THE_GOLDEN_VALKYR.id} icon /> and <ItemLink id={ITEMS.HEATHCLIFFS_IMMORTALITY.id} icon />.</React.Fragment>,
		contributors: [joshinator],
	},
	{
		date: new Date('2018-04-07'),
		changes: <React.Fragment>Added <SpellLink id={SPELLS.SERAPHIM_TALENT} icon /> module to track uptime and consumed <SpellLink id={SPELLS.SHIELD_OF_THE_RIGHTEOUS} icon /> charges.</React.Fragment>,
		contributors: [joshinator],
	},
	{
		date: new Date('2018-03-22'),
		changes: <React.Fragment>Marked <SpellLink id={SPELLS.BLESSED_HAMMER_TALENT} icon /> as being on the GCD.</React.Fragment>,
		contributors: [Zerotorescue],
	},
	{
		date: new Date('2018-03-14'),
		changes: <React.Fragment>Added <ItemLink id={ITEMS.TYELCA_FERREN_MARCUSS_STATURE.id} icon /></React.Fragment>,
		contributors: [Hewhosmites],
	},
  {
    date: new Date('2018-03-15'),
    changes: <React.Fragment>Implemented handling of <SpellLink id={SPELLS.GRAND_CRUSADER} /> that guesses where the cooldown reset. Because the combatlog doesn't reveal any cooldown information we have to do manual cooldown tracking. Unfortunately there's not a single event that shows random cooldown resets, so implementing effects like <SpellLink id={SPELLS.GRAND_CRUSADER} /> is nearly impossible. To work around this, the <SpellLink id={SPELLS.GRAND_CRUSADER} /> module will <i>guess</i> where it procced; whenever <SpellLink id={SPELLS.AVENGERS_SHIELD} /> is cast, it will check if it was supposed to still be on cooldown. If so, then it will mark the cooldown as ended on the last possible trigger. This should make the cooldown of this spell reasonable given you're using procs quickly.</React.Fragment>,
    contributors: [Zerotorescue],
  },
  {
    date: new Date('2018-03-15'),
    changes: <React.Fragment>Implemented <SpellLink id={SPELLS.JUDGMENT_CAST} />'s cooldown reduction of <SpellLink id={SPELLS.SHIELD_OF_THE_RIGHTEOUS} />, making its cooldown indicator in the timeline accurate.</React.Fragment>,
    contributors: [Zerotorescue],
  },
  {
    date: new Date('2018-03-15'),
    changes: <React.Fragment>Fixed <SpellLink id={SPELLS.JUDGMENT_CAST} />'s cooldown to the proper 6 seconds before Haste.</React.Fragment>,
    contributors: [Zerotorescue],
  },
  {
    date: new Date('2018-03-14'),
    changes: <React.Fragment>Added missing abilities, fixed some cooldowns and implemented <SpellLink id={SPELLS.RIGHTEOUS_PROTECTOR_TALENT} />.</React.Fragment>,
    contributors: [Zerotorescue, Hewhosmites],
  },
  {
    date: new Date('2018-03-03'),
    changes: <React.Fragment>Added <ItemLink id={ITEMS.PILLARS_OF_INMOST_LIGHT.id} /></React.Fragment>,
    contributors: [Hewhosmites],
  },
];
