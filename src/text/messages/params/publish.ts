import type {DataTypes} from '../../../data-types/index.js';
import type {TopicProperties} from '../../topics/index.js';

export interface PublishMessageParams {
	/** Publish name */
	name: DataTypes.string;
	/** Publisher UID */
	pubuid: DataTypes.int;
	/** Type of data */
	type: DataTypes.string;
	/** Properties */
	properties: Partial<TopicProperties>;
}
