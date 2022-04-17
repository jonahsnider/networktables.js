import type {DataTypes} from '../../../data-types/index.js';
import type {PropertiesUpdate} from './setproperties.js';

export interface AnnounceMessageParams {
	/** Topic name */
	name: DataTypes.string;
	/** Topic ID */
	id: DataTypes.int;
	/** Data type */
	type: DataTypes.string;
	/** Publisher UID */
	pubuid?: DataTypes.int;
	/** Properties */
	properties: PropertiesUpdate;
}
