import type {DataTypes} from '../../data-types/index.js';

interface Publisher {
	/** Client name */
	client: DataTypes.string;
	/** Publisher UID */
	pubuid: DataTypes.int;
}

/** The server shall update this topic when a client publishes or unpublishes to `<topic>`. */
export type PubTopic = Publisher[];
