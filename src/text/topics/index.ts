import type {JsonValue} from 'type-fest';
import type {DataTypes} from '../../data-types/index.js';

import type {ClientpubTopic} from './clientpub.js';
import type {ClientsTopic} from './clients.js';
import type {ClientsubTopic} from './clientsub.js';
import type {PubTopic} from './pub.js';
import type {ServerpubTopic} from './serverpub.js';
import type {ServersubTopic} from './serversub.js';
import type {SubTopic} from './sub.js';

/* eslint-disable @typescript-eslint/naming-convention */
type client = string;
type topic = string;
/* eslint-enable @typescript-eslint/naming-convention */

interface BuiltinTopics {
	/** Client <client> subscriptions */
	[key: `$clientsub$${client}`]: ClientsubTopic;
	/** Subscriptions to <topic> */
	[key: `$sub$${topic}`]: SubTopic;
	/** Client <client> publishers */
	[key: `$clientpub$${client}`]: ClientpubTopic;
	/** Publishers to <topic> */
	[key: `$pub$${topic}`]: PubTopic;
	/** Connected clients */
	$clients: ClientsTopic;
	/** Server subscriptions */
	$serversub: ServersubTopic;
	/** Server publishers */
	$serverpub: ServerpubTopic;
}

export interface TopicProperties extends Record<string, NonNullable<JsonValue>> {
	/** Persistent flag */
	persistent: boolean;
	/** Retained flag */
	retained: boolean;
	/** Hidden Flag */
	hidden: boolean;
}

/** Maps topic names to the topic itself. */
export type TopicNameToTopic<T extends Record<string, DataTypes.Any> = Record<string, DataTypes.Any>> = BuiltinTopics & Record<keyof T, T[keyof T]>;
