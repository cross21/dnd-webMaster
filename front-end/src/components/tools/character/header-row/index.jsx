import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'Utility/classNames';

import {
	Button,
	Icon,
	EditableText,
	Tooltip,
	Popover,
} from '@blueprintjs/core';
import SVG from 'react-inlinesvg';

import debounce from 'Utility/debounce';

import ResourceSelect from '../../../resource-select';
import Title from '../../../title';
import NumericInput from '../../../calculator-input';

import styles from './styles.less';

export default class HeaderRow extends React.Component {
	static propTypes = {
		navigateBack: PropTypes.func.isRequired,
		navigateToSettings: PropTypes.func.isRequired,
		onPropertyChanged: PropTypes.func.isRequired,
		mediaQuery: PropTypes.func.isRequired,
		setTabName: PropTypes.func.isRequired,
		name: PropTypes.string,
		className: PropTypes.string,
		race: PropTypes.string,
		level: PropTypes.number,
		stats: PropTypes.object,
		hp: PropTypes.number,
		ac: PropTypes.number,
		speed: PropTypes.number,
		maxHp: PropTypes.number,
	}

	mapStatName = abbreviation => {
		switch (abbreviation) {
		case 'dex':
			return 'dexterity';
		case 'cha':
			return 'charism';
		case 'str':
			return 'strength';
		case 'int':
			return 'intelligence';
		case 'wis':
			return 'wisdom';
		case 'con':
			return 'constitution';
		}
	}

	mapStats = stats => (stat, index) => {
		const { onPropertyChanged } = this.props;
		return (
			<Popover
				modifiers={{ arrow: false }}
				content={
					<NumericInput
						onChange={onPropertyChanged(this.mapStatName(stat))}
						value={stats[stat]}
						autoFocus
					/>
				}
				key={index}
			>
				<span>
					<span className={styles.statLabel}>{stat}</span>
					<span className={classNames(styles.statValue, styles.editable)}>{stats[stat]}</span>
				</span>
			</Popover>
		);
	};

	editCharacterName = value => {
		const { onPropertyChanged } = this.props;
		this.debouncedTabNameChange(value);
		onPropertyChanged('characterName')(value);
	}

	debouncedTabNameChange = debounce(
		name => {
			const { setTabName } = this.props;
			setTabName(name);
		},
		250
	)

	render() {
		const {
			navigateBack,
			navigateToSettings,
			onPropertyChanged,
			mediaQuery,
			name,
			level,
			className,
			race,
			stats,
			hp,
			maxHp,
			ac,
			speed,
		} = this.props;

		return (
			<div className={styles.root}>
				<div className={styles.topRow}>
					<Button
						icon={
							<Icon
								className={styles.icon}
								icon="arrow-left"
							/>
						}
						minimal
						className={styles.button}
						onClick={navigateBack}
					/>
					<div className={styles.flexSizing}>
						<Title fontSize={mediaQuery('max-width', 330) ? 20 : 30} className={styles.title}>
							<EditableText
								placeholder="Character Name"
								value={name}
								onChange={this.editCharacterName}
							/>
						</Title>
					</div>
					<div className={styles.spacer} />
					<Button
						icon={
							<Icon
								className={styles.icon}
								icon="cog"
								iconSize={20}
							/>
						}
						minimal
						onClick={navigateToSettings}
						className={styles.button}
					/>
				</div>
				<div className={styles.row}>
					<Popover
						content={
							<NumericInput
								onChange={onPropertyChanged('level')}
								value={level}
								autoFocus
							/>
						}
						modifiers={{ arrow: false }}
					>
						<span className={classNames(styles.level, styles.editable)}>Level: {level}</span>
					</Popover>
					<ResourceSelect
						endpoint="/api/search/klasses"
						onResourceSelected={klass => onPropertyChanged('klass')(klass.klassID)}
						queryOptions={{
							count: 'all',
						}}
						idKey="klassID"
						fetchOnMount={true}
						nameKey="klassName"
					>
						<span className={classNames(styles.class, styles.editable)}>{className}</span>
					</ResourceSelect>
					<ResourceSelect
						endpoint="/api/search/races"
						onResourceSelected={race => onPropertyChanged('race')(race.raceID)}
						queryOptions={{
							count: 'all',
						}}
						idKey="raceID"
						nameKey="raceName"
						fetchOnMount={true}
					>
						<span className={classNames(styles.race, styles.editable)}>{race}</span>
					</ResourceSelect>
				</div>
				<div
					className={styles.row}
					style={{
						justifyContent: mediaQuery('max-width', 900) ? 'space-around' : null,
					}}
				>
					{stats ? Object.keys(stats).map(this.mapStats(stats)) : null}
				</div>
				<div
					className={styles.row}
					style={{
						justifyContent: mediaQuery('max-width', 900) ? 'space-evenly' : null, 
					}}
				>
					<Popover
						content={
							<NumericInput
								onChange={onPropertyChanged('hp')}
								autoFocus
								value={hp}
							/>
						}
						modifiers={{ arrow: false }}
					>
						<Tooltip
							content={`HP - Max: ${maxHp}`}
							hoverOpenDelay={750}
						>
							<div className={styles.svg}>
								<SVG
									src="/svg/heart.svg"
								/>
								<span className={classNames(styles.svgLabel, styles.editable)}>{hp}</span>
							</div>
						</Tooltip>
					</Popover>
					<Tooltip
						content="Speed"
						hoverOpenDelay={750}
					>
						<div className={styles.svg}>
							<SVG
								src="/svg/circle.svg"
							/>
							<span className={styles.svgLabel}>{speed}</span>
						</div>
					</Tooltip>
					<Popover
						content={
							<NumericInput
								value={ac}
								onChange={onPropertyChanged('ac')}
								autoFocus
							/>
						}
						modifiers={{ arrow: false }}
					>
						<Tooltip
							content="AC"
							hoverOpenDelay={750}
						>
							<div className={styles.svg}>
								<SVG
									src="/svg/shield.svg"
								/>
								<span className={classNames(styles.svgLabel, styles.editable)}>{ac}</span>
							</div>
						</Tooltip>
					</Popover>
				</div>
			</div>
		);
	}
}