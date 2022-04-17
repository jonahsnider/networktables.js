import type {DataTypes} from '../../../data-types/index.js';
import type {TopicProperties} from '../../topics/index.js';

export type PropertiesUpdate = Partial<{
	[K in keyof TopicProperties]: null | TopicProperties[K];
}>;

export interface SetpropertiesMessageParams {
	/** Topic name */
	name: DataTypes.string;
	/** Properties to update */
	update: PropertiesUpdate;
}
