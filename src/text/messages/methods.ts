export enum JsonMessageMethod {
	/* eslint-disable @typescript-eslint/naming-convention */
	/** Publish Request */
	publish = 'publish',
	/** Publish Release */
	unpublish = 'unpublish',
	/** Set Properties */
	setproperties = 'setproperties',

	/** Get Values */
	getvalues = 'getvalues',
	/** Subscribe */
	subscribe = 'subscribe',
	/** Unsubscribe */
	unsubscribe = 'unsubscribe',

	/** Topic Announcement */
	announce = 'announce',
	/** Topic Removed */
	unannounce = 'unannounce',
	/* eslint-enable @typescript-eslint/naming-convention */
}

const knownMethods: ReadonlySet<string> = new Set<JsonMessageMethod>(Object.values(JsonMessageMethod));
/** @returns Whether `method` is a known method */

export function isKnownJsonMessageMethod(method: string): method is JsonMessageMethod {
	return knownMethods.has(method);
}
