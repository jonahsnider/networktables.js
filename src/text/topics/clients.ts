import type {DataTypes} from '../../data-types/index.js';

interface ConnectedClient {
	/** Client name */
	id: DataTypes.string;
	/** Connection info */
	conn: DataTypes.string;
}

/** The server shall update this topic when a client connects or disconnects. */
export type ClientsTopic = ConnectedClient[];
