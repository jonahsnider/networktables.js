import type {DataTypes} from '../../../data-types/index.js';

export interface UnsubscribeMessageParams {
	/** Subscription UID */
	subuid: DataTypes.int;
}
