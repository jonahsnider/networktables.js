import {decode} from '@msgpack/msgpack';
import type {JsonValue} from 'type-fest';
import {isBinaryDataFrame} from './binary/messages.js';
import type {DataTypeName} from './data-types/data-type-id.js';
import type {DataTypes} from './data-types/index.js';
import {JsonMessageMethod} from './text/messages/methods.js';
import type {JsonMessage} from './text/messages/params/index.js';
import {isTextDataFrame} from './text/messages/params/index.js';
import type {PropertiesUpdate} from './text/messages/params/setproperties.js';
import type {SubscriptionOptions} from './text/messages/params/subscribe.js';
import type {TopicProperties} from './text/topics/index.js';
import {IdGenerator} from './util/id-generator.js';

const WEBSOCKET_PROTOCOL = 'networktables.first.wpi.edu';

export class Client {
	private readonly publisherIdGenerator = new IdGenerator();
	private readonly subscriptionIdGenerator = new IdGenerator();

	constructor(private readonly socket: WebSocket) {
		if (socket.protocol !== WEBSOCKET_PROTOCOL) {
			throw new RangeError(`Invalid protocol, expected "${WEBSOCKET_PROTOCOL}" but got "${socket.protocol}"`);
		}

		socket.binaryType = 'arraybuffer';
		socket.addEventListener('message', this.onMessage.bind(this));
	}

	publish(topicName: string, options: {dataType: DataTypeName; properties?: Partial<TopicProperties>}): DataTypes.int {
		options.properties ??= {};

		const publisherId = this.publisherIdGenerator.generate();

		const message: JsonMessage<JsonMessageMethod.publish> = {
			method: JsonMessageMethod.publish,
			params: {
				pubuid: publisherId,
				name: topicName,
				type: options.dataType,
				properties: options.properties,
			},
		};

		this.socket.send(JSON.stringify(message));

		return publisherId;
	}

	unpublish(publisherId: number): void {
		const message: JsonMessage<JsonMessageMethod.unpublish> = {
			method: JsonMessageMethod.unpublish,
			params: {
				pubuid: publisherId,
			},
		};

		this.socket.send(JSON.stringify(message));
	}

	setProperties(topicName: string, properties: Readonly<PropertiesUpdate>): void {
		const message: JsonMessage<JsonMessageMethod.setproperties> = {
			method: JsonMessageMethod.setproperties,
			params: {
				name: topicName,
				update: properties,
			},
		};

		this.socket.send(JSON.stringify(message));
	}

	async getValues(prefix: string): Promise<DataTypes.Any>;
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	async getValues(prefixes: string | readonly string[]): Promise<DataTypes.Any>;
	async getValues(prefixOrPrefixes: string | readonly string[]): Promise<DataTypes.Any> {
		const prefixes = Array.isArray(prefixOrPrefixes) ? prefixOrPrefixes : [prefixOrPrefixes];

		const message: JsonMessage<JsonMessageMethod.getvalues> = {
			method: JsonMessageMethod.getvalues,
			params: {
				prefixes,
			},
		};

		this.socket.send(JSON.stringify(message));

		throw new Error('Waiting for response not implemented');
	}

	subscribe(prefix: string, options?: Readonly<SubscriptionOptions>): () => void;
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	subscribe(prefixes: readonly string[], options?: Readonly<SubscriptionOptions>): () => void;
	subscribe(prefixOrPrefixes: string | readonly string[], options?: Readonly<SubscriptionOptions>): () => void {
		const prefixes = Array.isArray(prefixOrPrefixes) ? prefixOrPrefixes : [prefixOrPrefixes];
		const subscriptionId = this.subscriptionIdGenerator.generate();

		const message: JsonMessage<JsonMessageMethod.subscribe> = {
			method: JsonMessageMethod.subscribe,
			params: {
				subuid: subscriptionId,
				prefixes,
			},
		};

		if (options) {
			message.params.options = options;
		}

		this.socket.send(JSON.stringify(message));

		// TODO: This shouldn't use a closure
		return () => {
			this.unsubscribe(subscriptionId);
		};
	}

	unsubscribe(subscriptionId: number): void {
		const message: JsonMessage<JsonMessageMethod.unsubscribe> = {
			method: JsonMessageMethod.unsubscribe,
			params: {
				subuid: subscriptionId,
			},
		};

		this.socket.send(JSON.stringify(message));
	}

	private onMessage(message: MessageEvent<string | ArrayBuffer>): void {
		const data = message.data;

		if (typeof data === 'string') {
			// Text data frame
			// Text data frames are always strings - see https://datatracker.ietf.org/doc/html/rfc6455#section-5.6

			this.handleTextDataFrame(data);
		} else {
			// Binary data frame

			this.handleBinaryDataFrame(data);
		}
	}

	private handleTextDataFrame(dataFrame: string): void {
		const parsedDataFrame = JSON.parse(dataFrame) as JsonValue;

		if (!Array.isArray(parsedDataFrame)) {
			// Silently ignore non-array data frames
			return;
		}

		for (const dataFrameElement of parsedDataFrame) {
			if (!isTextDataFrame(dataFrameElement)) {
				// Ignore invalid text data frames

				continue;
			}

			throw new Error('Handling text data frames is not implemented');
		}
	}

	private handleBinaryDataFrame(dataFrame: ArrayBuffer): void {
		const decodedDataFrame = decode(dataFrame);

		if (!isBinaryDataFrame(decodedDataFrame)) {
			// Ignore invalid binary data frames
			// This is currently undefined behavior in the NetworkTables 4 spec

			return;
		}

		throw new Error('Handling binary data frames is not implemented');
	}
}
