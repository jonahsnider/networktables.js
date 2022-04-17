import type {DataTypeId} from '../data-types/data-type-id.js';
import type {DataTypes} from '../data-types/index.js';

export type BinaryDataFrame<T extends DataTypes.Any = DataTypes.Any> =
	| [topicId: DataTypes.int, timestamp: DataTypes.int, dataType: DataTypeId, value: T]
	| [publisherId: DataTypes.int, timestamp: DataTypes.int, dataType: DataTypeId, value: T];

export function isBinaryDataFrame(dataFrame: unknown): dataFrame is BinaryDataFrame {
	return (
		Array.isArray(dataFrame) &&
		// A more lenient length check in case more fields are added in the future
		dataFrame.length >= 4
	);
}
