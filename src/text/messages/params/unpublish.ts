import type {DataTypes} from '../../../data-types/index.js';

export interface UnpublishMessageParams {
	/** Publisher UID */
	pubuid: DataTypes.int;
}
