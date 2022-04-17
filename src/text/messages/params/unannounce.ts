import type {DataTypes} from '../../../data-types/index.js';

export interface UnannounceMessageParams {
	/** Topic name */
	name: DataTypes.string;
	/** Topic ID */
	id: DataTypes.int;
}
