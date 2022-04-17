/* eslint-disable @typescript-eslint/naming-convention */
type boolean_ = boolean;
export type double = number;
export type int = number;
export type float = number;
type string_ = string;
export type json = string;
export type raw = Uint8Array;
export type rpc = Uint8Array;
export type msgpack = Uint8Array;
export type protobuf = Uint8Array;
/* eslint-enable @typescript-eslint/naming-convention */

export {string_ as string};
export {boolean_ as boolean};

export type Any = boolean_ | double | int | float | string_ | json | raw | rpc | msgpack | protobuf | boolean_[] | double[] | int[] | float[] | string_[];
