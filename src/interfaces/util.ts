import {
	CPHashedData,
	CPHashedDataAsync,
	CPSigner,
	CPSignerAsync,
	Version,
	VersionAsync
} from "./cadescom";
import {
	ICertificate,
	ICertificateAsync,
	ICertificates,
	ICertificatesAsync,
	IEncodedData,
	IEncodedDataAsync,
	IOID,
	IOIDAsync,
	IPublicKey,
	IPublicKeyAsync
} from "./capicom";

export type ValuesOf<T> = T[keyof T];
export type VarDate = object;

// Extracts the type if wrapped by a Promise
export type Unpacked<T> = T extends Promise<infer U> ? U :
						  T extends ICertificate ? ICertificateAsync :
						  T extends ICertificates ? ICertificatesAsync :
						  T extends CPSigner ? CPSignerAsync :
						  T extends CPHashedData ? CPHashedDataAsync :
						  T extends Version ? VersionAsync :
						  T extends IOID ? IOIDAsync :
						  T extends IEncodedData ? IEncodedDataAsync :
						  T extends IPublicKey ? IPublicKeyAsync :
						  T;

export type PromisifiedFunction<T extends Function> =
	T extends (...args: infer A) => infer U ? (...args: { [K in keyof A]: Unpacked<A[K]> }) => Promise<Unpacked<U>> :
	T;

export type Async<T> = {
	readonly [K in keyof T]: T[K] extends Function ? PromisifiedFunction<T[K]> :
							 Promise<Unpacked<T[K]>>;
};