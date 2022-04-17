import type {DataTypes} from '../../../data-types/index.js';

export interface SubscriptionOptions {
	/** Immediate Flag */
	immediate?: DataTypes.boolean;
	/** Periodic sweep time (in seconds) */
	periodic?: DataTypes.double;
	/** Logging Flag */
	logging?: DataTypes.boolean;
}

export interface SubscribeMessageParams {
	/** Array of topic prefixes */
	prefixes: DataTypes.string[];
	/** Subscription UID */
	subuid: DataTypes.int;
	/** Options */
	options?: SubscriptionOptions;
}
