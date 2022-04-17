import type {DataTypes} from '../../data-types/index.js';

interface Subscription {
	/** Client name */
	client: DataTypes.string;
	/** Subscription UID */
	subuid: DataTypes.int;
}

/** The server shall update this topic when a client subscribes or unsubscribes to `<topic>`. */
export type SubTopic = Subscription[];
