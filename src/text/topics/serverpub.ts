import type {ClientpubTopic} from './clientpub.js';

/** Same as `$clientpub`, except it's updated when the server publishes or unpublishes any topic. */
export type ServerpubTopic = ClientpubTopic;
