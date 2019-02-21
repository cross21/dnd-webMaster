/* eslint-disable no-console */

import React from 'react';
import PropTypes from 'prop-types';

import {
	InputGroup,
	Button,
	Icon,
	MenuItem,
} from '@blueprintjs/core';
import {
	Select,
} from '@blueprintjs/select';

import Table from '../../../table';

import allSpells from '../../../../dummy-data/spells';

import styles from './styles.less';

export default class Spells extends React.Component {
	static propTypes = {
		spells: PropTypes.array,
		sortingDirection: PropTypes.string,
		sortingColumn: PropTypes.string,
		handleSortingChange: PropTypes.func,
		onPropertyChanged: PropTypes.func,
	}

	renderItem = (item, props) => (
		<MenuItem
			text={item.name}
			onClick={props.handleClick}
			className={[
				styles.menuItem,
				props.modifiers.active ? styles.active : '',
			].join(' ')}
			key={item.index}
		/>
	)
	
	render() {
		const {
			spells,
			handleSortingChange,
			sortingColumn,
			sortingDirection,
			onPropertyChanged,
		} = this.props;

		return (
			<div className={styles.root}>
				<div className={styles.searchContainer}>
					<InputGroup
						leftIcon="search"
					/>
					<div className={styles.spacer} />
					<Select
						items={allSpells.filter(spell => !spells.find(spellId => spellId === spell.index))}
						itemRenderer={this.renderItem}
						itemPredicate={(query, item) => item.name.includes(query)}
						popoverProps={{
							modifiers: {
								arrow: false,
							},
						}}
						onItemSelect={spell => onPropertyChanged('spells')([ ...spells, spell.index ])}
						resetOnClose
					>
						<Button
							minimal
							className={styles.button}
							icon={
								<Icon
									icon="plus"
									className={styles.icon}
								/>
							}
						/>
					</Select>
				</div>
				<Table
					onItemSelect={item => onPropertyChanged('spells')(spells.filter(spell => spell !== item.index))}
					fullWidth
					sortable
					head={{
						name: {
							name: 'Name',
						},
						level: {
							name: 'Level',
						},
						removeButton: {
							name: '',
							sortable: false,
							renderCol: () => (
								<Button
									minimal
									className={styles.button}
									icon={
										<Icon
											icon="minus"
											className={styles.icon}
										/>
									}
								/>
							),
							textAlign: 'right',
						},
					}}
					sortingColumn={sortingColumn}
					sortingDirection={sortingDirection}
					handleSortChange={handleSortingChange}
					items={spells.map(spellId => allSpells.find(spell => spell.index === spellId)).filter(spell => spell)}
				/>
			</div>
		);
	}
}