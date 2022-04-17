import type {ClientsubTopic} from './clientsub.js';

/** Same as `$clientsub`, except it's updated when the server subscribes or unsubscribes to any topic. */
export type ServersubTopic = ClientsubTopic;
