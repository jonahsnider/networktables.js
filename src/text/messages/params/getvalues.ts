import type {DataTypes} from '../../../data-types/index.js';

export interface GetValuesMessageParams {
	/** Array of topic prefixes */
	prefixes: DataTypes.string[];
}
