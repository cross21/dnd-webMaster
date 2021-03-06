module.exports = [
	{
		columns: '(spellName, spellDesc, spellHigherLevelDesc, spellRange, spellMaterial, ritual, duration, concentration, castingTime, schoolID, componentV, componentS, componentM, spellLevel)',
		pattern: '(name, desc, higher_level, range, material, ritual, duration, concentration, casting_time, school, components, components, components, level)',
		table: 'spell',
		file: '5e-SRD-Spells.json',
	},
	{
		columns: '(skillName, skillDesc, abilityScoreID)',
		pattern: '(name, desc, ability_score)',
		table: 'skill',
		file: '5e-SRD-Skills.json',
	},
	{
		columns: '(klassName, hitDie, magicAble)',
		pattern: '(name, hit_die, magicAble)',
		table: 'klass',
		file: '5e-SRD-Classes.json',
	},
	{
		columns: '(schoolName, schoolDesc)',
		pattern: '(name, desc)',
		table: 'spellschool',
		file: '5e-SRD-Magic-Schools.json',
	},
	{
		columns: '(raceName, raceSpeed, alignment, raceAge, raceSize, raceSizeDesc, languageDesc)',
		pattern: '(name, speed, alignment, age, size, size_description, language_desc)',
		table: 'race',
		file: '5e-SRD-Races.json',
	},
	{
		columns: '(featName, featDesc, featLevel)',
		pattern: '(name, desc, level)',
		table: 'feat',
		file: '5e-SRD-Features.json',
	},
	{
		columns: '(spellID, klassID)',
		pattern: '(index, deep.url)',
		table: 'spellklasslist',
		file: '5e-SRD-Spells.json',
		deepField: 'classes',
	},
	{
		columns: '(abilityScoreName, abilityScoreDesc)',
		pattern: '(name, desc)',
		table: 'abilityscore',
		file: '5e-SRD-Ability-Scores.json',
	},
	{
		columns: '(featID, klassID)',
		pattern: '(index, class)',
		table: 'featklasslist',
		file: '5e-SRD-Features.json',
	},
	{
		columns: '(proficiencyName, proficiencyDesc)',
		pattern: '(name, desc)',
		table: 'proficiency',
		file: '5e-SRD-Proficiencies.json',
	},
	{
		columns: '(damageTypeName, damageTypeDesc)',
		pattern: '(name, desc)',
		table: 'damagetype',
		file: '5e-SRD-Damage-Types.json',
	},
	{
		columns: '(weaponPropertyName, weaponPropertyDesc)',
		pattern: '(name, desc)',
		table: 'weaponproperty',
		file: '5e-SRD-Weapon-Properties.json',
	},
	{
		columns: '(equipmentName, equipmentDesc, categoryName, subcategoryName, equipmentWeight, costQuantity, costUnit, speedQuantity, speedUnit)',
		pattern: '(name, desc, equipment_category, subcategory, weight, costQuantity, costUnit, speedQuantity, speedUnit)',
		table: 'equipment',
		file: '5e-SRD-Equipment.json',
	},
];
