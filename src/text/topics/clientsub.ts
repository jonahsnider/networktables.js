import type {DataTypes} from '../../data-types/index.js';
import type {SubscriptionOptions} from '../messages/params/subscribe.js';

interface ClientSubscription {
	/** Subscription UID */
	uid: DataTypes.int;
	/** Array of topic prefixes */
	prefixes: DataTypes.string[];
	/** Options */
	options: SubscriptionOptions;
}

/** The server shall update this topic when the corresponding client subscribes or unsubscribes to any topic. */
export type ClientsubTopic = ClientSubscription[];
