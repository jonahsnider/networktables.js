import type {DataTypes} from '../../data-types/index.js';

interface ClientPublisher {
	/** Publisher UID */
	uid: DataTypes.int;
	/** Topic name */
	topic: DataTypes.string;
}

/** The server shall update this topic when the corresponding client publishes or unpublishes any topic. */
export type ClientpubTopic = ClientPublisher[];
