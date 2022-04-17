import type {JsonMessageMethod} from '../methods.js';
import {isKnownJsonMessageMethod} from '../methods.js';
import type {AnnounceMessageParams} from './announce.js';
import type {GetValuesMessageParams} from './getvalues.js';
import type {PublishMessageParams} from './publish.js';
import type {SetpropertiesMessageParams} from './setproperties.js';
import type {SubscribeMessageParams} from './subscribe.js';
import type {UnannounceMessageParams} from './unannounce.js';
import type {UnpublishMessageParams} from './unpublish.js';
import type {UnsubscribeMessageParams} from './unsubscribe.js';

interface MessageMethodParams {
	[JsonMessageMethod.publish]: PublishMessageParams;
	[JsonMessageMethod.unpublish]: UnpublishMessageParams;
	[JsonMessageMethod.setproperties]: SetpropertiesMessageParams;

	[JsonMessageMethod.getvalues]: GetValuesMessageParams;
	[JsonMessageMethod.subscribe]: SubscribeMessageParams;
	[JsonMessageMethod.unsubscribe]: UnsubscribeMessageParams;

	[JsonMessageMethod.announce]: AnnounceMessageParams;
	[JsonMessageMethod.unannounce]: UnannounceMessageParams;
}

export interface JsonMessage<T extends JsonMessageMethod = JsonMessageMethod> {
	method: T;
	params: MessageMethodParams[T];
}

export function isTextDataFrame(dataFrame: unknown): dataFrame is JsonMessage {
	return (
		typeof dataFrame === 'object' &&
		dataFrame !== null &&
		typeof (dataFrame as any).method === 'string' &&
		typeof (dataFrame as any).params === 'object' &&
		isKnownJsonMessageMethod((dataFrame as any).method)
	);
}
