
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model run
 * 
 */
export type run = $Result.DefaultSelection<Prisma.$runPayload>
/**
 * Model data
 * 
 */
export type data = $Result.DefaultSelection<Prisma.$dataPayload>
/**
 * Model data_type
 * 
 */
export type data_type = $Result.DefaultSelection<Prisma.$data_typePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Runs
 * const runs = await prisma.run.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Runs
   * const runs = await prisma.run.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>

      /**
   * `prisma.run`: Exposes CRUD operations for the **run** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Runs
    * const runs = await prisma.run.findMany()
    * ```
    */
  get run(): Prisma.runDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.data`: Exposes CRUD operations for the **data** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Data
    * const data = await prisma.data.findMany()
    * ```
    */
  get data(): Prisma.dataDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.data_type`: Exposes CRUD operations for the **data_type** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Data_types
    * const data_types = await prisma.data_type.findMany()
    * ```
    */
  get data_type(): Prisma.data_typeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.2.1
   * Query Engine version: 4123509d24aa4dede1e864b46351bf2790323b69
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    run: 'run',
    data: 'data',
    data_type: 'data_type'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "run" | "data" | "data_type"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      run: {
        payload: Prisma.$runPayload<ExtArgs>
        fields: Prisma.runFieldRefs
        operations: {
          findUnique: {
            args: Prisma.runFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$runPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.runFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$runPayload>
          }
          findFirst: {
            args: Prisma.runFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$runPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.runFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$runPayload>
          }
          findMany: {
            args: Prisma.runFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$runPayload>[]
          }
          create: {
            args: Prisma.runCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$runPayload>
          }
          createMany: {
            args: Prisma.runCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.runCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$runPayload>[]
          }
          delete: {
            args: Prisma.runDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$runPayload>
          }
          update: {
            args: Prisma.runUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$runPayload>
          }
          deleteMany: {
            args: Prisma.runDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.runUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.runUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$runPayload>[]
          }
          upsert: {
            args: Prisma.runUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$runPayload>
          }
          aggregate: {
            args: Prisma.RunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRun>
          }
          groupBy: {
            args: Prisma.runGroupByArgs<ExtArgs>
            result: $Utils.Optional<RunGroupByOutputType>[]
          }
          count: {
            args: Prisma.runCountArgs<ExtArgs>
            result: $Utils.Optional<RunCountAggregateOutputType> | number
          }
        }
      }
      data: {
        payload: Prisma.$dataPayload<ExtArgs>
        fields: Prisma.dataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.dataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.dataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dataPayload>
          }
          findFirst: {
            args: Prisma.dataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.dataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dataPayload>
          }
          findMany: {
            args: Prisma.dataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dataPayload>[]
          }
          create: {
            args: Prisma.dataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dataPayload>
          }
          createMany: {
            args: Prisma.dataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.dataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dataPayload>[]
          }
          delete: {
            args: Prisma.dataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dataPayload>
          }
          update: {
            args: Prisma.dataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dataPayload>
          }
          deleteMany: {
            args: Prisma.dataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.dataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.dataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dataPayload>[]
          }
          upsert: {
            args: Prisma.dataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dataPayload>
          }
          aggregate: {
            args: Prisma.DataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateData>
          }
          groupBy: {
            args: Prisma.dataGroupByArgs<ExtArgs>
            result: $Utils.Optional<DataGroupByOutputType>[]
          }
          count: {
            args: Prisma.dataCountArgs<ExtArgs>
            result: $Utils.Optional<DataCountAggregateOutputType> | number
          }
        }
      }
      data_type: {
        payload: Prisma.$data_typePayload<ExtArgs>
        fields: Prisma.data_typeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.data_typeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$data_typePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.data_typeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$data_typePayload>
          }
          findFirst: {
            args: Prisma.data_typeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$data_typePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.data_typeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$data_typePayload>
          }
          findMany: {
            args: Prisma.data_typeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$data_typePayload>[]
          }
          create: {
            args: Prisma.data_typeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$data_typePayload>
          }
          createMany: {
            args: Prisma.data_typeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.data_typeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$data_typePayload>[]
          }
          delete: {
            args: Prisma.data_typeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$data_typePayload>
          }
          update: {
            args: Prisma.data_typeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$data_typePayload>
          }
          deleteMany: {
            args: Prisma.data_typeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.data_typeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.data_typeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$data_typePayload>[]
          }
          upsert: {
            args: Prisma.data_typeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$data_typePayload>
          }
          aggregate: {
            args: Prisma.Data_typeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateData_type>
          }
          groupBy: {
            args: Prisma.data_typeGroupByArgs<ExtArgs>
            result: $Utils.Optional<Data_typeGroupByOutputType>[]
          }
          count: {
            args: Prisma.data_typeCountArgs<ExtArgs>
            result: $Utils.Optional<Data_typeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    run?: runOmit
    data?: dataOmit
    data_type?: data_typeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type RunCountOutputType
   */

  export type RunCountOutputType = {
    data: number
  }

  export type RunCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data?: boolean | RunCountOutputTypeCountDataArgs
  }

  // Custom InputTypes
  /**
   * RunCountOutputType without action
   */
  export type RunCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunCountOutputType
     */
    select?: RunCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RunCountOutputType without action
   */
  export type RunCountOutputTypeCountDataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: dataWhereInput
  }


  /**
   * Count Type Data_typeCountOutputType
   */

  export type Data_typeCountOutputType = {
    data: number
  }

  export type Data_typeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data?: boolean | Data_typeCountOutputTypeCountDataArgs
  }

  // Custom InputTypes
  /**
   * Data_typeCountOutputType without action
   */
  export type Data_typeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Data_typeCountOutputType
     */
    select?: Data_typeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Data_typeCountOutputType without action
   */
  export type Data_typeCountOutputTypeCountDataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: dataWhereInput
  }


  /**
   * Models
   */

  /**
   * Model run
   */

  export type AggregateRun = {
    _count: RunCountAggregateOutputType | null
    _avg: RunAvgAggregateOutputType | null
    _sum: RunSumAggregateOutputType | null
    _min: RunMinAggregateOutputType | null
    _max: RunMaxAggregateOutputType | null
  }

  export type RunAvgAggregateOutputType = {
    runId: number | null
  }

  export type RunSumAggregateOutputType = {
    runId: number | null
  }

  export type RunMinAggregateOutputType = {
    id: string | null
    runId: number | null
    driverName: string | null
    notes: string | null
    time: Date | null
  }

  export type RunMaxAggregateOutputType = {
    id: string | null
    runId: number | null
    driverName: string | null
    notes: string | null
    time: Date | null
  }

  export type RunCountAggregateOutputType = {
    id: number
    runId: number
    driverName: number
    notes: number
    time: number
    _all: number
  }


  export type RunAvgAggregateInputType = {
    runId?: true
  }

  export type RunSumAggregateInputType = {
    runId?: true
  }

  export type RunMinAggregateInputType = {
    id?: true
    runId?: true
    driverName?: true
    notes?: true
    time?: true
  }

  export type RunMaxAggregateInputType = {
    id?: true
    runId?: true
    driverName?: true
    notes?: true
    time?: true
  }

  export type RunCountAggregateInputType = {
    id?: true
    runId?: true
    driverName?: true
    notes?: true
    time?: true
    _all?: true
  }

  export type RunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which run to aggregate.
     */
    where?: runWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of runs to fetch.
     */
    orderBy?: runOrderByWithRelationInput | runOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: runWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` runs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` runs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned runs
    **/
    _count?: true | RunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RunAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RunSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RunMaxAggregateInputType
  }

  export type GetRunAggregateType<T extends RunAggregateArgs> = {
        [P in keyof T & keyof AggregateRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRun[P]>
      : GetScalarType<T[P], AggregateRun[P]>
  }




  export type runGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: runWhereInput
    orderBy?: runOrderByWithAggregationInput | runOrderByWithAggregationInput[]
    by: RunScalarFieldEnum[] | RunScalarFieldEnum
    having?: runScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RunCountAggregateInputType | true
    _avg?: RunAvgAggregateInputType
    _sum?: RunSumAggregateInputType
    _min?: RunMinAggregateInputType
    _max?: RunMaxAggregateInputType
  }

  export type RunGroupByOutputType = {
    id: string
    runId: number
    driverName: string
    notes: string
    time: Date
    _count: RunCountAggregateOutputType | null
    _avg: RunAvgAggregateOutputType | null
    _sum: RunSumAggregateOutputType | null
    _min: RunMinAggregateOutputType | null
    _max: RunMaxAggregateOutputType | null
  }

  type GetRunGroupByPayload<T extends runGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RunGroupByOutputType[P]>
            : GetScalarType<T[P], RunGroupByOutputType[P]>
        }
      >
    >


  export type runSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    driverName?: boolean
    notes?: boolean
    time?: boolean
    data?: boolean | run$dataArgs<ExtArgs>
    _count?: boolean | RunCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["run"]>

  export type runSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    driverName?: boolean
    notes?: boolean
    time?: boolean
  }, ExtArgs["result"]["run"]>

  export type runSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    driverName?: boolean
    notes?: boolean
    time?: boolean
  }, ExtArgs["result"]["run"]>

  export type runSelectScalar = {
    id?: boolean
    runId?: boolean
    driverName?: boolean
    notes?: boolean
    time?: boolean
  }

  export type runOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "runId" | "driverName" | "notes" | "time", ExtArgs["result"]["run"]>
  export type runInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data?: boolean | run$dataArgs<ExtArgs>
    _count?: boolean | RunCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type runIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type runIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $runPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "run"
    objects: {
      data: Prisma.$dataPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      runId: number
      driverName: string
      notes: string
      time: Date
    }, ExtArgs["result"]["run"]>
    composites: {}
  }

  type runGetPayload<S extends boolean | null | undefined | runDefaultArgs> = $Result.GetResult<Prisma.$runPayload, S>

  type runCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<runFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RunCountAggregateInputType | true
    }

  export interface runDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['run'], meta: { name: 'run' } }
    /**
     * Find zero or one Run that matches the filter.
     * @param {runFindUniqueArgs} args - Arguments to find a Run
     * @example
     * // Get one Run
     * const run = await prisma.run.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends runFindUniqueArgs>(args: SelectSubset<T, runFindUniqueArgs<ExtArgs>>): Prisma__runClient<$Result.GetResult<Prisma.$runPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Run that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {runFindUniqueOrThrowArgs} args - Arguments to find a Run
     * @example
     * // Get one Run
     * const run = await prisma.run.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends runFindUniqueOrThrowArgs>(args: SelectSubset<T, runFindUniqueOrThrowArgs<ExtArgs>>): Prisma__runClient<$Result.GetResult<Prisma.$runPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Run that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {runFindFirstArgs} args - Arguments to find a Run
     * @example
     * // Get one Run
     * const run = await prisma.run.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends runFindFirstArgs>(args?: SelectSubset<T, runFindFirstArgs<ExtArgs>>): Prisma__runClient<$Result.GetResult<Prisma.$runPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Run that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {runFindFirstOrThrowArgs} args - Arguments to find a Run
     * @example
     * // Get one Run
     * const run = await prisma.run.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends runFindFirstOrThrowArgs>(args?: SelectSubset<T, runFindFirstOrThrowArgs<ExtArgs>>): Prisma__runClient<$Result.GetResult<Prisma.$runPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Runs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {runFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Runs
     * const runs = await prisma.run.findMany()
     * 
     * // Get first 10 Runs
     * const runs = await prisma.run.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const runWithIdOnly = await prisma.run.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends runFindManyArgs>(args?: SelectSubset<T, runFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$runPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Run.
     * @param {runCreateArgs} args - Arguments to create a Run.
     * @example
     * // Create one Run
     * const Run = await prisma.run.create({
     *   data: {
     *     // ... data to create a Run
     *   }
     * })
     * 
     */
    create<T extends runCreateArgs>(args: SelectSubset<T, runCreateArgs<ExtArgs>>): Prisma__runClient<$Result.GetResult<Prisma.$runPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Runs.
     * @param {runCreateManyArgs} args - Arguments to create many Runs.
     * @example
     * // Create many Runs
     * const run = await prisma.run.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends runCreateManyArgs>(args?: SelectSubset<T, runCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Runs and returns the data saved in the database.
     * @param {runCreateManyAndReturnArgs} args - Arguments to create many Runs.
     * @example
     * // Create many Runs
     * const run = await prisma.run.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Runs and only return the `id`
     * const runWithIdOnly = await prisma.run.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends runCreateManyAndReturnArgs>(args?: SelectSubset<T, runCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$runPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Run.
     * @param {runDeleteArgs} args - Arguments to delete one Run.
     * @example
     * // Delete one Run
     * const Run = await prisma.run.delete({
     *   where: {
     *     // ... filter to delete one Run
     *   }
     * })
     * 
     */
    delete<T extends runDeleteArgs>(args: SelectSubset<T, runDeleteArgs<ExtArgs>>): Prisma__runClient<$Result.GetResult<Prisma.$runPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Run.
     * @param {runUpdateArgs} args - Arguments to update one Run.
     * @example
     * // Update one Run
     * const run = await prisma.run.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends runUpdateArgs>(args: SelectSubset<T, runUpdateArgs<ExtArgs>>): Prisma__runClient<$Result.GetResult<Prisma.$runPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Runs.
     * @param {runDeleteManyArgs} args - Arguments to filter Runs to delete.
     * @example
     * // Delete a few Runs
     * const { count } = await prisma.run.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends runDeleteManyArgs>(args?: SelectSubset<T, runDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Runs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {runUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Runs
     * const run = await prisma.run.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends runUpdateManyArgs>(args: SelectSubset<T, runUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Runs and returns the data updated in the database.
     * @param {runUpdateManyAndReturnArgs} args - Arguments to update many Runs.
     * @example
     * // Update many Runs
     * const run = await prisma.run.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Runs and only return the `id`
     * const runWithIdOnly = await prisma.run.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends runUpdateManyAndReturnArgs>(args: SelectSubset<T, runUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$runPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Run.
     * @param {runUpsertArgs} args - Arguments to update or create a Run.
     * @example
     * // Update or create a Run
     * const run = await prisma.run.upsert({
     *   create: {
     *     // ... data to create a Run
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Run we want to update
     *   }
     * })
     */
    upsert<T extends runUpsertArgs>(args: SelectSubset<T, runUpsertArgs<ExtArgs>>): Prisma__runClient<$Result.GetResult<Prisma.$runPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Runs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {runCountArgs} args - Arguments to filter Runs to count.
     * @example
     * // Count the number of Runs
     * const count = await prisma.run.count({
     *   where: {
     *     // ... the filter for the Runs we want to count
     *   }
     * })
    **/
    count<T extends runCountArgs>(
      args?: Subset<T, runCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Run.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RunAggregateArgs>(args: Subset<T, RunAggregateArgs>): Prisma.PrismaPromise<GetRunAggregateType<T>>

    /**
     * Group by Run.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {runGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends runGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: runGroupByArgs['orderBy'] }
        : { orderBy?: runGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, runGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the run model
   */
  readonly fields: runFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for run.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__runClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    data<T extends run$dataArgs<ExtArgs> = {}>(args?: Subset<T, run$dataArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$dataPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the run model
   */ 
  interface runFieldRefs {
    readonly id: FieldRef<"run", 'String'>
    readonly runId: FieldRef<"run", 'Int'>
    readonly driverName: FieldRef<"run", 'String'>
    readonly notes: FieldRef<"run", 'String'>
    readonly time: FieldRef<"run", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * run findUnique
   */
  export type runFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the run
     */
    select?: runSelect<ExtArgs> | null
    /**
     * Omit specific fields from the run
     */
    omit?: runOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: runInclude<ExtArgs> | null
    /**
     * Filter, which run to fetch.
     */
    where: runWhereUniqueInput
  }

  /**
   * run findUniqueOrThrow
   */
  export type runFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the run
     */
    select?: runSelect<ExtArgs> | null
    /**
     * Omit specific fields from the run
     */
    omit?: runOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: runInclude<ExtArgs> | null
    /**
     * Filter, which run to fetch.
     */
    where: runWhereUniqueInput
  }

  /**
   * run findFirst
   */
  export type runFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the run
     */
    select?: runSelect<ExtArgs> | null
    /**
     * Omit specific fields from the run
     */
    omit?: runOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: runInclude<ExtArgs> | null
    /**
     * Filter, which run to fetch.
     */
    where?: runWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of runs to fetch.
     */
    orderBy?: runOrderByWithRelationInput | runOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for runs.
     */
    cursor?: runWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` runs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` runs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of runs.
     */
    distinct?: RunScalarFieldEnum | RunScalarFieldEnum[]
  }

  /**
   * run findFirstOrThrow
   */
  export type runFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the run
     */
    select?: runSelect<ExtArgs> | null
    /**
     * Omit specific fields from the run
     */
    omit?: runOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: runInclude<ExtArgs> | null
    /**
     * Filter, which run to fetch.
     */
    where?: runWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of runs to fetch.
     */
    orderBy?: runOrderByWithRelationInput | runOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for runs.
     */
    cursor?: runWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` runs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` runs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of runs.
     */
    distinct?: RunScalarFieldEnum | RunScalarFieldEnum[]
  }

  /**
   * run findMany
   */
  export type runFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the run
     */
    select?: runSelect<ExtArgs> | null
    /**
     * Omit specific fields from the run
     */
    omit?: runOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: runInclude<ExtArgs> | null
    /**
     * Filter, which runs to fetch.
     */
    where?: runWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of runs to fetch.
     */
    orderBy?: runOrderByWithRelationInput | runOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing runs.
     */
    cursor?: runWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` runs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` runs.
     */
    skip?: number
    distinct?: RunScalarFieldEnum | RunScalarFieldEnum[]
  }

  /**
   * run create
   */
  export type runCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the run
     */
    select?: runSelect<ExtArgs> | null
    /**
     * Omit specific fields from the run
     */
    omit?: runOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: runInclude<ExtArgs> | null
    /**
     * The data needed to create a run.
     */
    data: XOR<runCreateInput, runUncheckedCreateInput>
  }

  /**
   * run createMany
   */
  export type runCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many runs.
     */
    data: runCreateManyInput | runCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * run createManyAndReturn
   */
  export type runCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the run
     */
    select?: runSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the run
     */
    omit?: runOmit<ExtArgs> | null
    /**
     * The data used to create many runs.
     */
    data: runCreateManyInput | runCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * run update
   */
  export type runUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the run
     */
    select?: runSelect<ExtArgs> | null
    /**
     * Omit specific fields from the run
     */
    omit?: runOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: runInclude<ExtArgs> | null
    /**
     * The data needed to update a run.
     */
    data: XOR<runUpdateInput, runUncheckedUpdateInput>
    /**
     * Choose, which run to update.
     */
    where: runWhereUniqueInput
  }

  /**
   * run updateMany
   */
  export type runUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update runs.
     */
    data: XOR<runUpdateManyMutationInput, runUncheckedUpdateManyInput>
    /**
     * Filter which runs to update
     */
    where?: runWhereInput
  }

  /**
   * run updateManyAndReturn
   */
  export type runUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the run
     */
    select?: runSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the run
     */
    omit?: runOmit<ExtArgs> | null
    /**
     * The data used to update runs.
     */
    data: XOR<runUpdateManyMutationInput, runUncheckedUpdateManyInput>
    /**
     * Filter which runs to update
     */
    where?: runWhereInput
  }

  /**
   * run upsert
   */
  export type runUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the run
     */
    select?: runSelect<ExtArgs> | null
    /**
     * Omit specific fields from the run
     */
    omit?: runOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: runInclude<ExtArgs> | null
    /**
     * The filter to search for the run to update in case it exists.
     */
    where: runWhereUniqueInput
    /**
     * In case the run found by the `where` argument doesn't exist, create a new run with this data.
     */
    create: XOR<runCreateInput, runUncheckedCreateInput>
    /**
     * In case the run was found with the provided `where` argument, update it with this data.
     */
    update: XOR<runUpdateInput, runUncheckedUpdateInput>
  }

  /**
   * run delete
   */
  export type runDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the run
     */
    select?: runSelect<ExtArgs> | null
    /**
     * Omit specific fields from the run
     */
    omit?: runOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: runInclude<ExtArgs> | null
    /**
     * Filter which run to delete.
     */
    where: runWhereUniqueInput
  }

  /**
   * run deleteMany
   */
  export type runDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which runs to delete
     */
    where?: runWhereInput
  }

  /**
   * run.data
   */
  export type run$dataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data
     */
    select?: dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the data
     */
    omit?: dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dataInclude<ExtArgs> | null
    where?: dataWhereInput
    orderBy?: dataOrderByWithRelationInput | dataOrderByWithRelationInput[]
    cursor?: dataWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DataScalarFieldEnum | DataScalarFieldEnum[]
  }

  /**
   * run without action
   */
  export type runDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the run
     */
    select?: runSelect<ExtArgs> | null
    /**
     * Omit specific fields from the run
     */
    omit?: runOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: runInclude<ExtArgs> | null
  }


  /**
   * Model data
   */

  export type AggregateData = {
    _count: DataCountAggregateOutputType | null
    _avg: DataAvgAggregateOutputType | null
    _sum: DataSumAggregateOutputType | null
    _min: DataMinAggregateOutputType | null
    _max: DataMaxAggregateOutputType | null
  }

  export type DataAvgAggregateOutputType = {
    values: number | null
  }

  export type DataSumAggregateOutputType = {
    values: number[]
  }

  export type DataMinAggregateOutputType = {
    time: Date | null
    dataTypeName: string | null
    runId: string | null
  }

  export type DataMaxAggregateOutputType = {
    time: Date | null
    dataTypeName: string | null
    runId: string | null
  }

  export type DataCountAggregateOutputType = {
    values: number
    time: number
    dataTypeName: number
    runId: number
    _all: number
  }


  export type DataAvgAggregateInputType = {
    values?: true
  }

  export type DataSumAggregateInputType = {
    values?: true
  }

  export type DataMinAggregateInputType = {
    time?: true
    dataTypeName?: true
    runId?: true
  }

  export type DataMaxAggregateInputType = {
    time?: true
    dataTypeName?: true
    runId?: true
  }

  export type DataCountAggregateInputType = {
    values?: true
    time?: true
    dataTypeName?: true
    runId?: true
    _all?: true
  }

  export type DataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which data to aggregate.
     */
    where?: dataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of data to fetch.
     */
    orderBy?: dataOrderByWithRelationInput | dataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: dataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` data from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` data.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned data
    **/
    _count?: true | DataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DataMaxAggregateInputType
  }

  export type GetDataAggregateType<T extends DataAggregateArgs> = {
        [P in keyof T & keyof AggregateData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateData[P]>
      : GetScalarType<T[P], AggregateData[P]>
  }




  export type dataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: dataWhereInput
    orderBy?: dataOrderByWithAggregationInput | dataOrderByWithAggregationInput[]
    by: DataScalarFieldEnum[] | DataScalarFieldEnum
    having?: dataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DataCountAggregateInputType | true
    _avg?: DataAvgAggregateInputType
    _sum?: DataSumAggregateInputType
    _min?: DataMinAggregateInputType
    _max?: DataMaxAggregateInputType
  }

  export type DataGroupByOutputType = {
    values: number[]
    time: Date
    dataTypeName: string
    runId: string
    _count: DataCountAggregateOutputType | null
    _avg: DataAvgAggregateOutputType | null
    _sum: DataSumAggregateOutputType | null
    _min: DataMinAggregateOutputType | null
    _max: DataMaxAggregateOutputType | null
  }

  type GetDataGroupByPayload<T extends dataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DataGroupByOutputType[P]>
            : GetScalarType<T[P], DataGroupByOutputType[P]>
        }
      >
    >


  export type dataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    values?: boolean
    time?: boolean
    dataTypeName?: boolean
    runId?: boolean
    dataType?: boolean | data_typeDefaultArgs<ExtArgs>
    run?: boolean | runDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["data"]>

  export type dataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    values?: boolean
    time?: boolean
    dataTypeName?: boolean
    runId?: boolean
    dataType?: boolean | data_typeDefaultArgs<ExtArgs>
    run?: boolean | runDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["data"]>

  export type dataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    values?: boolean
    time?: boolean
    dataTypeName?: boolean
    runId?: boolean
    dataType?: boolean | data_typeDefaultArgs<ExtArgs>
    run?: boolean | runDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["data"]>

  export type dataSelectScalar = {
    values?: boolean
    time?: boolean
    dataTypeName?: boolean
    runId?: boolean
  }

  export type dataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"values" | "time" | "dataTypeName" | "runId", ExtArgs["result"]["data"]>
  export type dataInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dataType?: boolean | data_typeDefaultArgs<ExtArgs>
    run?: boolean | runDefaultArgs<ExtArgs>
  }
  export type dataIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dataType?: boolean | data_typeDefaultArgs<ExtArgs>
    run?: boolean | runDefaultArgs<ExtArgs>
  }
  export type dataIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dataType?: boolean | data_typeDefaultArgs<ExtArgs>
    run?: boolean | runDefaultArgs<ExtArgs>
  }

  export type $dataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "data"
    objects: {
      dataType: Prisma.$data_typePayload<ExtArgs>
      run: Prisma.$runPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      values: number[]
      time: Date
      dataTypeName: string
      runId: string
    }, ExtArgs["result"]["data"]>
    composites: {}
  }

  type dataGetPayload<S extends boolean | null | undefined | dataDefaultArgs> = $Result.GetResult<Prisma.$dataPayload, S>

  type dataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<dataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DataCountAggregateInputType | true
    }

  export interface dataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['data'], meta: { name: 'data' } }
    /**
     * Find zero or one Data that matches the filter.
     * @param {dataFindUniqueArgs} args - Arguments to find a Data
     * @example
     * // Get one Data
     * const data = await prisma.data.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends dataFindUniqueArgs>(args: SelectSubset<T, dataFindUniqueArgs<ExtArgs>>): Prisma__dataClient<$Result.GetResult<Prisma.$dataPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Data that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {dataFindUniqueOrThrowArgs} args - Arguments to find a Data
     * @example
     * // Get one Data
     * const data = await prisma.data.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends dataFindUniqueOrThrowArgs>(args: SelectSubset<T, dataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__dataClient<$Result.GetResult<Prisma.$dataPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Data that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dataFindFirstArgs} args - Arguments to find a Data
     * @example
     * // Get one Data
     * const data = await prisma.data.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends dataFindFirstArgs>(args?: SelectSubset<T, dataFindFirstArgs<ExtArgs>>): Prisma__dataClient<$Result.GetResult<Prisma.$dataPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Data that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dataFindFirstOrThrowArgs} args - Arguments to find a Data
     * @example
     * // Get one Data
     * const data = await prisma.data.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends dataFindFirstOrThrowArgs>(args?: SelectSubset<T, dataFindFirstOrThrowArgs<ExtArgs>>): Prisma__dataClient<$Result.GetResult<Prisma.$dataPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Data that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Data
     * const data = await prisma.data.findMany()
     * 
     * // Get first 10 Data
     * const data = await prisma.data.findMany({ take: 10 })
     * 
     * // Only select the `values`
     * const dataWithValuesOnly = await prisma.data.findMany({ select: { values: true } })
     * 
     */
    findMany<T extends dataFindManyArgs>(args?: SelectSubset<T, dataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$dataPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Data.
     * @param {dataCreateArgs} args - Arguments to create a Data.
     * @example
     * // Create one Data
     * const Data = await prisma.data.create({
     *   data: {
     *     // ... data to create a Data
     *   }
     * })
     * 
     */
    create<T extends dataCreateArgs>(args: SelectSubset<T, dataCreateArgs<ExtArgs>>): Prisma__dataClient<$Result.GetResult<Prisma.$dataPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Data.
     * @param {dataCreateManyArgs} args - Arguments to create many Data.
     * @example
     * // Create many Data
     * const data = await prisma.data.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends dataCreateManyArgs>(args?: SelectSubset<T, dataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Data and returns the data saved in the database.
     * @param {dataCreateManyAndReturnArgs} args - Arguments to create many Data.
     * @example
     * // Create many Data
     * const data = await prisma.data.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Data and only return the `values`
     * const dataWithValuesOnly = await prisma.data.createManyAndReturn({
     *   select: { values: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends dataCreateManyAndReturnArgs>(args?: SelectSubset<T, dataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$dataPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Data.
     * @param {dataDeleteArgs} args - Arguments to delete one Data.
     * @example
     * // Delete one Data
     * const Data = await prisma.data.delete({
     *   where: {
     *     // ... filter to delete one Data
     *   }
     * })
     * 
     */
    delete<T extends dataDeleteArgs>(args: SelectSubset<T, dataDeleteArgs<ExtArgs>>): Prisma__dataClient<$Result.GetResult<Prisma.$dataPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Data.
     * @param {dataUpdateArgs} args - Arguments to update one Data.
     * @example
     * // Update one Data
     * const data = await prisma.data.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends dataUpdateArgs>(args: SelectSubset<T, dataUpdateArgs<ExtArgs>>): Prisma__dataClient<$Result.GetResult<Prisma.$dataPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Data.
     * @param {dataDeleteManyArgs} args - Arguments to filter Data to delete.
     * @example
     * // Delete a few Data
     * const { count } = await prisma.data.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends dataDeleteManyArgs>(args?: SelectSubset<T, dataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Data.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Data
     * const data = await prisma.data.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends dataUpdateManyArgs>(args: SelectSubset<T, dataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Data and returns the data updated in the database.
     * @param {dataUpdateManyAndReturnArgs} args - Arguments to update many Data.
     * @example
     * // Update many Data
     * const data = await prisma.data.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Data and only return the `values`
     * const dataWithValuesOnly = await prisma.data.updateManyAndReturn({
     *   select: { values: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends dataUpdateManyAndReturnArgs>(args: SelectSubset<T, dataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$dataPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Data.
     * @param {dataUpsertArgs} args - Arguments to update or create a Data.
     * @example
     * // Update or create a Data
     * const data = await prisma.data.upsert({
     *   create: {
     *     // ... data to create a Data
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Data we want to update
     *   }
     * })
     */
    upsert<T extends dataUpsertArgs>(args: SelectSubset<T, dataUpsertArgs<ExtArgs>>): Prisma__dataClient<$Result.GetResult<Prisma.$dataPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Data.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dataCountArgs} args - Arguments to filter Data to count.
     * @example
     * // Count the number of Data
     * const count = await prisma.data.count({
     *   where: {
     *     // ... the filter for the Data we want to count
     *   }
     * })
    **/
    count<T extends dataCountArgs>(
      args?: Subset<T, dataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Data.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DataAggregateArgs>(args: Subset<T, DataAggregateArgs>): Prisma.PrismaPromise<GetDataAggregateType<T>>

    /**
     * Group by Data.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends dataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: dataGroupByArgs['orderBy'] }
        : { orderBy?: dataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, dataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the data model
   */
  readonly fields: dataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for data.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__dataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dataType<T extends data_typeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, data_typeDefaultArgs<ExtArgs>>): Prisma__data_typeClient<$Result.GetResult<Prisma.$data_typePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    run<T extends runDefaultArgs<ExtArgs> = {}>(args?: Subset<T, runDefaultArgs<ExtArgs>>): Prisma__runClient<$Result.GetResult<Prisma.$runPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the data model
   */ 
  interface dataFieldRefs {
    readonly values: FieldRef<"data", 'Float[]'>
    readonly time: FieldRef<"data", 'DateTime'>
    readonly dataTypeName: FieldRef<"data", 'String'>
    readonly runId: FieldRef<"data", 'String'>
  }
    

  // Custom InputTypes
  /**
   * data findUnique
   */
  export type dataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data
     */
    select?: dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the data
     */
    omit?: dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dataInclude<ExtArgs> | null
    /**
     * Filter, which data to fetch.
     */
    where: dataWhereUniqueInput
  }

  /**
   * data findUniqueOrThrow
   */
  export type dataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data
     */
    select?: dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the data
     */
    omit?: dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dataInclude<ExtArgs> | null
    /**
     * Filter, which data to fetch.
     */
    where: dataWhereUniqueInput
  }

  /**
   * data findFirst
   */
  export type dataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data
     */
    select?: dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the data
     */
    omit?: dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dataInclude<ExtArgs> | null
    /**
     * Filter, which data to fetch.
     */
    where?: dataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of data to fetch.
     */
    orderBy?: dataOrderByWithRelationInput | dataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for data.
     */
    cursor?: dataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` data from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` data.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of data.
     */
    distinct?: DataScalarFieldEnum | DataScalarFieldEnum[]
  }

  /**
   * data findFirstOrThrow
   */
  export type dataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data
     */
    select?: dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the data
     */
    omit?: dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dataInclude<ExtArgs> | null
    /**
     * Filter, which data to fetch.
     */
    where?: dataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of data to fetch.
     */
    orderBy?: dataOrderByWithRelationInput | dataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for data.
     */
    cursor?: dataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` data from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` data.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of data.
     */
    distinct?: DataScalarFieldEnum | DataScalarFieldEnum[]
  }

  /**
   * data findMany
   */
  export type dataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data
     */
    select?: dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the data
     */
    omit?: dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dataInclude<ExtArgs> | null
    /**
     * Filter, which data to fetch.
     */
    where?: dataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of data to fetch.
     */
    orderBy?: dataOrderByWithRelationInput | dataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing data.
     */
    cursor?: dataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` data from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` data.
     */
    skip?: number
    distinct?: DataScalarFieldEnum | DataScalarFieldEnum[]
  }

  /**
   * data create
   */
  export type dataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data
     */
    select?: dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the data
     */
    omit?: dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dataInclude<ExtArgs> | null
    /**
     * The data needed to create a data.
     */
    data: XOR<dataCreateInput, dataUncheckedCreateInput>
  }

  /**
   * data createMany
   */
  export type dataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many data.
     */
    data: dataCreateManyInput | dataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * data createManyAndReturn
   */
  export type dataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data
     */
    select?: dataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the data
     */
    omit?: dataOmit<ExtArgs> | null
    /**
     * The data used to create many data.
     */
    data: dataCreateManyInput | dataCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dataIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * data update
   */
  export type dataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data
     */
    select?: dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the data
     */
    omit?: dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dataInclude<ExtArgs> | null
    /**
     * The data needed to update a data.
     */
    data: XOR<dataUpdateInput, dataUncheckedUpdateInput>
    /**
     * Choose, which data to update.
     */
    where: dataWhereUniqueInput
  }

  /**
   * data updateMany
   */
  export type dataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update data.
     */
    data: XOR<dataUpdateManyMutationInput, dataUncheckedUpdateManyInput>
    /**
     * Filter which data to update
     */
    where?: dataWhereInput
  }

  /**
   * data updateManyAndReturn
   */
  export type dataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data
     */
    select?: dataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the data
     */
    omit?: dataOmit<ExtArgs> | null
    /**
     * The data used to update data.
     */
    data: XOR<dataUpdateManyMutationInput, dataUncheckedUpdateManyInput>
    /**
     * Filter which data to update
     */
    where?: dataWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dataIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * data upsert
   */
  export type dataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data
     */
    select?: dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the data
     */
    omit?: dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dataInclude<ExtArgs> | null
    /**
     * The filter to search for the data to update in case it exists.
     */
    where: dataWhereUniqueInput
    /**
     * In case the data found by the `where` argument doesn't exist, create a new data with this data.
     */
    create: XOR<dataCreateInput, dataUncheckedCreateInput>
    /**
     * In case the data was found with the provided `where` argument, update it with this data.
     */
    update: XOR<dataUpdateInput, dataUncheckedUpdateInput>
  }

  /**
   * data delete
   */
  export type dataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data
     */
    select?: dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the data
     */
    omit?: dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dataInclude<ExtArgs> | null
    /**
     * Filter which data to delete.
     */
    where: dataWhereUniqueInput
  }

  /**
   * data deleteMany
   */
  export type dataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which data to delete
     */
    where?: dataWhereInput
  }

  /**
   * data without action
   */
  export type dataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data
     */
    select?: dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the data
     */
    omit?: dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dataInclude<ExtArgs> | null
  }


  /**
   * Model data_type
   */

  export type AggregateData_type = {
    _count: Data_typeCountAggregateOutputType | null
    _min: Data_typeMinAggregateOutputType | null
    _max: Data_typeMaxAggregateOutputType | null
  }

  export type Data_typeMinAggregateOutputType = {
    name: string | null
    unit: string | null
    nodeName: string | null
  }

  export type Data_typeMaxAggregateOutputType = {
    name: string | null
    unit: string | null
    nodeName: string | null
  }

  export type Data_typeCountAggregateOutputType = {
    name: number
    unit: number
    nodeName: number
    _all: number
  }


  export type Data_typeMinAggregateInputType = {
    name?: true
    unit?: true
    nodeName?: true
  }

  export type Data_typeMaxAggregateInputType = {
    name?: true
    unit?: true
    nodeName?: true
  }

  export type Data_typeCountAggregateInputType = {
    name?: true
    unit?: true
    nodeName?: true
    _all?: true
  }

  export type Data_typeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which data_type to aggregate.
     */
    where?: data_typeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of data_types to fetch.
     */
    orderBy?: data_typeOrderByWithRelationInput | data_typeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: data_typeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` data_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` data_types.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned data_types
    **/
    _count?: true | Data_typeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Data_typeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Data_typeMaxAggregateInputType
  }

  export type GetData_typeAggregateType<T extends Data_typeAggregateArgs> = {
        [P in keyof T & keyof AggregateData_type]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateData_type[P]>
      : GetScalarType<T[P], AggregateData_type[P]>
  }




  export type data_typeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: data_typeWhereInput
    orderBy?: data_typeOrderByWithAggregationInput | data_typeOrderByWithAggregationInput[]
    by: Data_typeScalarFieldEnum[] | Data_typeScalarFieldEnum
    having?: data_typeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Data_typeCountAggregateInputType | true
    _min?: Data_typeMinAggregateInputType
    _max?: Data_typeMaxAggregateInputType
  }

  export type Data_typeGroupByOutputType = {
    name: string
    unit: string
    nodeName: string
    _count: Data_typeCountAggregateOutputType | null
    _min: Data_typeMinAggregateOutputType | null
    _max: Data_typeMaxAggregateOutputType | null
  }

  type GetData_typeGroupByPayload<T extends data_typeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Data_typeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Data_typeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Data_typeGroupByOutputType[P]>
            : GetScalarType<T[P], Data_typeGroupByOutputType[P]>
        }
      >
    >


  export type data_typeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
    unit?: boolean
    nodeName?: boolean
    data?: boolean | data_type$dataArgs<ExtArgs>
    _count?: boolean | Data_typeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["data_type"]>

  export type data_typeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
    unit?: boolean
    nodeName?: boolean
  }, ExtArgs["result"]["data_type"]>

  export type data_typeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
    unit?: boolean
    nodeName?: boolean
  }, ExtArgs["result"]["data_type"]>

  export type data_typeSelectScalar = {
    name?: boolean
    unit?: boolean
    nodeName?: boolean
  }

  export type data_typeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"name" | "unit" | "nodeName", ExtArgs["result"]["data_type"]>
  export type data_typeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data?: boolean | data_type$dataArgs<ExtArgs>
    _count?: boolean | Data_typeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type data_typeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type data_typeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $data_typePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "data_type"
    objects: {
      data: Prisma.$dataPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      name: string
      unit: string
      nodeName: string
    }, ExtArgs["result"]["data_type"]>
    composites: {}
  }

  type data_typeGetPayload<S extends boolean | null | undefined | data_typeDefaultArgs> = $Result.GetResult<Prisma.$data_typePayload, S>

  type data_typeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<data_typeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Data_typeCountAggregateInputType | true
    }

  export interface data_typeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['data_type'], meta: { name: 'data_type' } }
    /**
     * Find zero or one Data_type that matches the filter.
     * @param {data_typeFindUniqueArgs} args - Arguments to find a Data_type
     * @example
     * // Get one Data_type
     * const data_type = await prisma.data_type.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends data_typeFindUniqueArgs>(args: SelectSubset<T, data_typeFindUniqueArgs<ExtArgs>>): Prisma__data_typeClient<$Result.GetResult<Prisma.$data_typePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Data_type that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {data_typeFindUniqueOrThrowArgs} args - Arguments to find a Data_type
     * @example
     * // Get one Data_type
     * const data_type = await prisma.data_type.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends data_typeFindUniqueOrThrowArgs>(args: SelectSubset<T, data_typeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__data_typeClient<$Result.GetResult<Prisma.$data_typePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Data_type that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {data_typeFindFirstArgs} args - Arguments to find a Data_type
     * @example
     * // Get one Data_type
     * const data_type = await prisma.data_type.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends data_typeFindFirstArgs>(args?: SelectSubset<T, data_typeFindFirstArgs<ExtArgs>>): Prisma__data_typeClient<$Result.GetResult<Prisma.$data_typePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Data_type that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {data_typeFindFirstOrThrowArgs} args - Arguments to find a Data_type
     * @example
     * // Get one Data_type
     * const data_type = await prisma.data_type.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends data_typeFindFirstOrThrowArgs>(args?: SelectSubset<T, data_typeFindFirstOrThrowArgs<ExtArgs>>): Prisma__data_typeClient<$Result.GetResult<Prisma.$data_typePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Data_types that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {data_typeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Data_types
     * const data_types = await prisma.data_type.findMany()
     * 
     * // Get first 10 Data_types
     * const data_types = await prisma.data_type.findMany({ take: 10 })
     * 
     * // Only select the `name`
     * const data_typeWithNameOnly = await prisma.data_type.findMany({ select: { name: true } })
     * 
     */
    findMany<T extends data_typeFindManyArgs>(args?: SelectSubset<T, data_typeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$data_typePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Data_type.
     * @param {data_typeCreateArgs} args - Arguments to create a Data_type.
     * @example
     * // Create one Data_type
     * const Data_type = await prisma.data_type.create({
     *   data: {
     *     // ... data to create a Data_type
     *   }
     * })
     * 
     */
    create<T extends data_typeCreateArgs>(args: SelectSubset<T, data_typeCreateArgs<ExtArgs>>): Prisma__data_typeClient<$Result.GetResult<Prisma.$data_typePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Data_types.
     * @param {data_typeCreateManyArgs} args - Arguments to create many Data_types.
     * @example
     * // Create many Data_types
     * const data_type = await prisma.data_type.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends data_typeCreateManyArgs>(args?: SelectSubset<T, data_typeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Data_types and returns the data saved in the database.
     * @param {data_typeCreateManyAndReturnArgs} args - Arguments to create many Data_types.
     * @example
     * // Create many Data_types
     * const data_type = await prisma.data_type.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Data_types and only return the `name`
     * const data_typeWithNameOnly = await prisma.data_type.createManyAndReturn({
     *   select: { name: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends data_typeCreateManyAndReturnArgs>(args?: SelectSubset<T, data_typeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$data_typePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Data_type.
     * @param {data_typeDeleteArgs} args - Arguments to delete one Data_type.
     * @example
     * // Delete one Data_type
     * const Data_type = await prisma.data_type.delete({
     *   where: {
     *     // ... filter to delete one Data_type
     *   }
     * })
     * 
     */
    delete<T extends data_typeDeleteArgs>(args: SelectSubset<T, data_typeDeleteArgs<ExtArgs>>): Prisma__data_typeClient<$Result.GetResult<Prisma.$data_typePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Data_type.
     * @param {data_typeUpdateArgs} args - Arguments to update one Data_type.
     * @example
     * // Update one Data_type
     * const data_type = await prisma.data_type.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends data_typeUpdateArgs>(args: SelectSubset<T, data_typeUpdateArgs<ExtArgs>>): Prisma__data_typeClient<$Result.GetResult<Prisma.$data_typePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Data_types.
     * @param {data_typeDeleteManyArgs} args - Arguments to filter Data_types to delete.
     * @example
     * // Delete a few Data_types
     * const { count } = await prisma.data_type.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends data_typeDeleteManyArgs>(args?: SelectSubset<T, data_typeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Data_types.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {data_typeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Data_types
     * const data_type = await prisma.data_type.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends data_typeUpdateManyArgs>(args: SelectSubset<T, data_typeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Data_types and returns the data updated in the database.
     * @param {data_typeUpdateManyAndReturnArgs} args - Arguments to update many Data_types.
     * @example
     * // Update many Data_types
     * const data_type = await prisma.data_type.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Data_types and only return the `name`
     * const data_typeWithNameOnly = await prisma.data_type.updateManyAndReturn({
     *   select: { name: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends data_typeUpdateManyAndReturnArgs>(args: SelectSubset<T, data_typeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$data_typePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Data_type.
     * @param {data_typeUpsertArgs} args - Arguments to update or create a Data_type.
     * @example
     * // Update or create a Data_type
     * const data_type = await prisma.data_type.upsert({
     *   create: {
     *     // ... data to create a Data_type
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Data_type we want to update
     *   }
     * })
     */
    upsert<T extends data_typeUpsertArgs>(args: SelectSubset<T, data_typeUpsertArgs<ExtArgs>>): Prisma__data_typeClient<$Result.GetResult<Prisma.$data_typePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Data_types.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {data_typeCountArgs} args - Arguments to filter Data_types to count.
     * @example
     * // Count the number of Data_types
     * const count = await prisma.data_type.count({
     *   where: {
     *     // ... the filter for the Data_types we want to count
     *   }
     * })
    **/
    count<T extends data_typeCountArgs>(
      args?: Subset<T, data_typeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Data_typeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Data_type.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Data_typeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Data_typeAggregateArgs>(args: Subset<T, Data_typeAggregateArgs>): Prisma.PrismaPromise<GetData_typeAggregateType<T>>

    /**
     * Group by Data_type.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {data_typeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends data_typeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: data_typeGroupByArgs['orderBy'] }
        : { orderBy?: data_typeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, data_typeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetData_typeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the data_type model
   */
  readonly fields: data_typeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for data_type.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__data_typeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    data<T extends data_type$dataArgs<ExtArgs> = {}>(args?: Subset<T, data_type$dataArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$dataPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the data_type model
   */ 
  interface data_typeFieldRefs {
    readonly name: FieldRef<"data_type", 'String'>
    readonly unit: FieldRef<"data_type", 'String'>
    readonly nodeName: FieldRef<"data_type", 'String'>
  }
    

  // Custom InputTypes
  /**
   * data_type findUnique
   */
  export type data_typeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_type
     */
    select?: data_typeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the data_type
     */
    omit?: data_typeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: data_typeInclude<ExtArgs> | null
    /**
     * Filter, which data_type to fetch.
     */
    where: data_typeWhereUniqueInput
  }

  /**
   * data_type findUniqueOrThrow
   */
  export type data_typeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_type
     */
    select?: data_typeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the data_type
     */
    omit?: data_typeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: data_typeInclude<ExtArgs> | null
    /**
     * Filter, which data_type to fetch.
     */
    where: data_typeWhereUniqueInput
  }

  /**
   * data_type findFirst
   */
  export type data_typeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_type
     */
    select?: data_typeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the data_type
     */
    omit?: data_typeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: data_typeInclude<ExtArgs> | null
    /**
     * Filter, which data_type to fetch.
     */
    where?: data_typeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of data_types to fetch.
     */
    orderBy?: data_typeOrderByWithRelationInput | data_typeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for data_types.
     */
    cursor?: data_typeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` data_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` data_types.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of data_types.
     */
    distinct?: Data_typeScalarFieldEnum | Data_typeScalarFieldEnum[]
  }

  /**
   * data_type findFirstOrThrow
   */
  export type data_typeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_type
     */
    select?: data_typeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the data_type
     */
    omit?: data_typeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: data_typeInclude<ExtArgs> | null
    /**
     * Filter, which data_type to fetch.
     */
    where?: data_typeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of data_types to fetch.
     */
    orderBy?: data_typeOrderByWithRelationInput | data_typeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for data_types.
     */
    cursor?: data_typeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` data_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` data_types.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of data_types.
     */
    distinct?: Data_typeScalarFieldEnum | Data_typeScalarFieldEnum[]
  }

  /**
   * data_type findMany
   */
  export type data_typeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_type
     */
    select?: data_typeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the data_type
     */
    omit?: data_typeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: data_typeInclude<ExtArgs> | null
    /**
     * Filter, which data_types to fetch.
     */
    where?: data_typeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of data_types to fetch.
     */
    orderBy?: data_typeOrderByWithRelationInput | data_typeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing data_types.
     */
    cursor?: data_typeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` data_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` data_types.
     */
    skip?: number
    distinct?: Data_typeScalarFieldEnum | Data_typeScalarFieldEnum[]
  }

  /**
   * data_type create
   */
  export type data_typeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_type
     */
    select?: data_typeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the data_type
     */
    omit?: data_typeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: data_typeInclude<ExtArgs> | null
    /**
     * The data needed to create a data_type.
     */
    data: XOR<data_typeCreateInput, data_typeUncheckedCreateInput>
  }

  /**
   * data_type createMany
   */
  export type data_typeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many data_types.
     */
    data: data_typeCreateManyInput | data_typeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * data_type createManyAndReturn
   */
  export type data_typeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_type
     */
    select?: data_typeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the data_type
     */
    omit?: data_typeOmit<ExtArgs> | null
    /**
     * The data used to create many data_types.
     */
    data: data_typeCreateManyInput | data_typeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * data_type update
   */
  export type data_typeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_type
     */
    select?: data_typeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the data_type
     */
    omit?: data_typeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: data_typeInclude<ExtArgs> | null
    /**
     * The data needed to update a data_type.
     */
    data: XOR<data_typeUpdateInput, data_typeUncheckedUpdateInput>
    /**
     * Choose, which data_type to update.
     */
    where: data_typeWhereUniqueInput
  }

  /**
   * data_type updateMany
   */
  export type data_typeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update data_types.
     */
    data: XOR<data_typeUpdateManyMutationInput, data_typeUncheckedUpdateManyInput>
    /**
     * Filter which data_types to update
     */
    where?: data_typeWhereInput
  }

  /**
   * data_type updateManyAndReturn
   */
  export type data_typeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_type
     */
    select?: data_typeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the data_type
     */
    omit?: data_typeOmit<ExtArgs> | null
    /**
     * The data used to update data_types.
     */
    data: XOR<data_typeUpdateManyMutationInput, data_typeUncheckedUpdateManyInput>
    /**
     * Filter which data_types to update
     */
    where?: data_typeWhereInput
  }

  /**
   * data_type upsert
   */
  export type data_typeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_type
     */
    select?: data_typeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the data_type
     */
    omit?: data_typeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: data_typeInclude<ExtArgs> | null
    /**
     * The filter to search for the data_type to update in case it exists.
     */
    where: data_typeWhereUniqueInput
    /**
     * In case the data_type found by the `where` argument doesn't exist, create a new data_type with this data.
     */
    create: XOR<data_typeCreateInput, data_typeUncheckedCreateInput>
    /**
     * In case the data_type was found with the provided `where` argument, update it with this data.
     */
    update: XOR<data_typeUpdateInput, data_typeUncheckedUpdateInput>
  }

  /**
   * data_type delete
   */
  export type data_typeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_type
     */
    select?: data_typeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the data_type
     */
    omit?: data_typeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: data_typeInclude<ExtArgs> | null
    /**
     * Filter which data_type to delete.
     */
    where: data_typeWhereUniqueInput
  }

  /**
   * data_type deleteMany
   */
  export type data_typeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which data_types to delete
     */
    where?: data_typeWhereInput
  }

  /**
   * data_type.data
   */
  export type data_type$dataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data
     */
    select?: dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the data
     */
    omit?: dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dataInclude<ExtArgs> | null
    where?: dataWhereInput
    orderBy?: dataOrderByWithRelationInput | dataOrderByWithRelationInput[]
    cursor?: dataWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DataScalarFieldEnum | DataScalarFieldEnum[]
  }

  /**
   * data_type without action
   */
  export type data_typeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the data_type
     */
    select?: data_typeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the data_type
     */
    omit?: data_typeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: data_typeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const RunScalarFieldEnum: {
    id: 'id',
    runId: 'runId',
    driverName: 'driverName',
    notes: 'notes',
    time: 'time'
  };

  export type RunScalarFieldEnum = (typeof RunScalarFieldEnum)[keyof typeof RunScalarFieldEnum]


  export const DataScalarFieldEnum: {
    values: 'values',
    time: 'time',
    dataTypeName: 'dataTypeName',
    runId: 'runId'
  };

  export type DataScalarFieldEnum = (typeof DataScalarFieldEnum)[keyof typeof DataScalarFieldEnum]


  export const Data_typeScalarFieldEnum: {
    name: 'name',
    unit: 'unit',
    nodeName: 'nodeName'
  };

  export type Data_typeScalarFieldEnum = (typeof Data_typeScalarFieldEnum)[keyof typeof Data_typeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type runWhereInput = {
    AND?: runWhereInput | runWhereInput[]
    OR?: runWhereInput[]
    NOT?: runWhereInput | runWhereInput[]
    id?: StringFilter<"run"> | string
    runId?: IntFilter<"run"> | number
    driverName?: StringFilter<"run"> | string
    notes?: StringFilter<"run"> | string
    time?: DateTimeFilter<"run"> | Date | string
    data?: DataListRelationFilter
  }

  export type runOrderByWithRelationInput = {
    id?: SortOrder
    runId?: SortOrder
    driverName?: SortOrder
    notes?: SortOrder
    time?: SortOrder
    data?: dataOrderByRelationAggregateInput
  }

  export type runWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: runWhereInput | runWhereInput[]
    OR?: runWhereInput[]
    NOT?: runWhereInput | runWhereInput[]
    runId?: IntFilter<"run"> | number
    driverName?: StringFilter<"run"> | string
    notes?: StringFilter<"run"> | string
    time?: DateTimeFilter<"run"> | Date | string
    data?: DataListRelationFilter
  }, "id">

  export type runOrderByWithAggregationInput = {
    id?: SortOrder
    runId?: SortOrder
    driverName?: SortOrder
    notes?: SortOrder
    time?: SortOrder
    _count?: runCountOrderByAggregateInput
    _avg?: runAvgOrderByAggregateInput
    _max?: runMaxOrderByAggregateInput
    _min?: runMinOrderByAggregateInput
    _sum?: runSumOrderByAggregateInput
  }

  export type runScalarWhereWithAggregatesInput = {
    AND?: runScalarWhereWithAggregatesInput | runScalarWhereWithAggregatesInput[]
    OR?: runScalarWhereWithAggregatesInput[]
    NOT?: runScalarWhereWithAggregatesInput | runScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"run"> | string
    runId?: IntWithAggregatesFilter<"run"> | number
    driverName?: StringWithAggregatesFilter<"run"> | string
    notes?: StringWithAggregatesFilter<"run"> | string
    time?: DateTimeWithAggregatesFilter<"run"> | Date | string
  }

  export type dataWhereInput = {
    AND?: dataWhereInput | dataWhereInput[]
    OR?: dataWhereInput[]
    NOT?: dataWhereInput | dataWhereInput[]
    values?: FloatNullableListFilter<"data">
    time?: DateTimeFilter<"data"> | Date | string
    dataTypeName?: StringFilter<"data"> | string
    runId?: StringFilter<"data"> | string
    dataType?: XOR<Data_typeScalarRelationFilter, data_typeWhereInput>
    run?: XOR<RunScalarRelationFilter, runWhereInput>
  }

  export type dataOrderByWithRelationInput = {
    values?: SortOrder
    time?: SortOrder
    dataTypeName?: SortOrder
    runId?: SortOrder
    dataType?: data_typeOrderByWithRelationInput
    run?: runOrderByWithRelationInput
  }

  export type dataWhereUniqueInput = Prisma.AtLeast<{
    time_dataTypeName?: dataTimeDataTypeNameCompoundUniqueInput
    AND?: dataWhereInput | dataWhereInput[]
    OR?: dataWhereInput[]
    NOT?: dataWhereInput | dataWhereInput[]
    values?: FloatNullableListFilter<"data">
    time?: DateTimeFilter<"data"> | Date | string
    dataTypeName?: StringFilter<"data"> | string
    runId?: StringFilter<"data"> | string
    dataType?: XOR<Data_typeScalarRelationFilter, data_typeWhereInput>
    run?: XOR<RunScalarRelationFilter, runWhereInput>
  }, "time_dataTypeName">

  export type dataOrderByWithAggregationInput = {
    values?: SortOrder
    time?: SortOrder
    dataTypeName?: SortOrder
    runId?: SortOrder
    _count?: dataCountOrderByAggregateInput
    _avg?: dataAvgOrderByAggregateInput
    _max?: dataMaxOrderByAggregateInput
    _min?: dataMinOrderByAggregateInput
    _sum?: dataSumOrderByAggregateInput
  }

  export type dataScalarWhereWithAggregatesInput = {
    AND?: dataScalarWhereWithAggregatesInput | dataScalarWhereWithAggregatesInput[]
    OR?: dataScalarWhereWithAggregatesInput[]
    NOT?: dataScalarWhereWithAggregatesInput | dataScalarWhereWithAggregatesInput[]
    values?: FloatNullableListFilter<"data">
    time?: DateTimeWithAggregatesFilter<"data"> | Date | string
    dataTypeName?: StringWithAggregatesFilter<"data"> | string
    runId?: StringWithAggregatesFilter<"data"> | string
  }

  export type data_typeWhereInput = {
    AND?: data_typeWhereInput | data_typeWhereInput[]
    OR?: data_typeWhereInput[]
    NOT?: data_typeWhereInput | data_typeWhereInput[]
    name?: StringFilter<"data_type"> | string
    unit?: StringFilter<"data_type"> | string
    nodeName?: StringFilter<"data_type"> | string
    data?: DataListRelationFilter
  }

  export type data_typeOrderByWithRelationInput = {
    name?: SortOrder
    unit?: SortOrder
    nodeName?: SortOrder
    data?: dataOrderByRelationAggregateInput
  }

  export type data_typeWhereUniqueInput = Prisma.AtLeast<{
    name?: string
    AND?: data_typeWhereInput | data_typeWhereInput[]
    OR?: data_typeWhereInput[]
    NOT?: data_typeWhereInput | data_typeWhereInput[]
    unit?: StringFilter<"data_type"> | string
    nodeName?: StringFilter<"data_type"> | string
    data?: DataListRelationFilter
  }, "name">

  export type data_typeOrderByWithAggregationInput = {
    name?: SortOrder
    unit?: SortOrder
    nodeName?: SortOrder
    _count?: data_typeCountOrderByAggregateInput
    _max?: data_typeMaxOrderByAggregateInput
    _min?: data_typeMinOrderByAggregateInput
  }

  export type data_typeScalarWhereWithAggregatesInput = {
    AND?: data_typeScalarWhereWithAggregatesInput | data_typeScalarWhereWithAggregatesInput[]
    OR?: data_typeScalarWhereWithAggregatesInput[]
    NOT?: data_typeScalarWhereWithAggregatesInput | data_typeScalarWhereWithAggregatesInput[]
    name?: StringWithAggregatesFilter<"data_type"> | string
    unit?: StringWithAggregatesFilter<"data_type"> | string
    nodeName?: StringWithAggregatesFilter<"data_type"> | string
  }

  export type runCreateInput = {
    id?: string
    runId?: number
    driverName: string
    notes: string
    time: Date | string
    data?: dataCreateNestedManyWithoutRunInput
  }

  export type runUncheckedCreateInput = {
    id?: string
    runId?: number
    driverName: string
    notes: string
    time: Date | string
    data?: dataUncheckedCreateNestedManyWithoutRunInput
  }

  export type runUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: IntFieldUpdateOperationsInput | number
    driverName?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: dataUpdateManyWithoutRunNestedInput
  }

  export type runUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: IntFieldUpdateOperationsInput | number
    driverName?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: dataUncheckedUpdateManyWithoutRunNestedInput
  }

  export type runCreateManyInput = {
    id?: string
    runId?: number
    driverName: string
    notes: string
    time: Date | string
  }

  export type runUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: IntFieldUpdateOperationsInput | number
    driverName?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type runUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: IntFieldUpdateOperationsInput | number
    driverName?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type dataCreateInput = {
    values?: dataCreatevaluesInput | number[]
    time: Date | string
    dataType: data_typeCreateNestedOneWithoutDataInput
    run: runCreateNestedOneWithoutDataInput
  }

  export type dataUncheckedCreateInput = {
    values?: dataCreatevaluesInput | number[]
    time: Date | string
    dataTypeName: string
    runId: string
  }

  export type dataUpdateInput = {
    values?: dataUpdatevaluesInput | number[]
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    dataType?: data_typeUpdateOneRequiredWithoutDataNestedInput
    run?: runUpdateOneRequiredWithoutDataNestedInput
  }

  export type dataUncheckedUpdateInput = {
    values?: dataUpdatevaluesInput | number[]
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    dataTypeName?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
  }

  export type dataCreateManyInput = {
    values?: dataCreatevaluesInput | number[]
    time: Date | string
    dataTypeName: string
    runId: string
  }

  export type dataUpdateManyMutationInput = {
    values?: dataUpdatevaluesInput | number[]
    time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type dataUncheckedUpdateManyInput = {
    values?: dataUpdatevaluesInput | number[]
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    dataTypeName?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
  }

  export type data_typeCreateInput = {
    name: string
    unit: string
    nodeName: string
    data?: dataCreateNestedManyWithoutDataTypeInput
  }

  export type data_typeUncheckedCreateInput = {
    name: string
    unit: string
    nodeName: string
    data?: dataUncheckedCreateNestedManyWithoutDataTypeInput
  }

  export type data_typeUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    nodeName?: StringFieldUpdateOperationsInput | string
    data?: dataUpdateManyWithoutDataTypeNestedInput
  }

  export type data_typeUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    nodeName?: StringFieldUpdateOperationsInput | string
    data?: dataUncheckedUpdateManyWithoutDataTypeNestedInput
  }

  export type data_typeCreateManyInput = {
    name: string
    unit: string
    nodeName: string
  }

  export type data_typeUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    nodeName?: StringFieldUpdateOperationsInput | string
  }

  export type data_typeUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    nodeName?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DataListRelationFilter = {
    every?: dataWhereInput
    some?: dataWhereInput
    none?: dataWhereInput
  }

  export type dataOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type runCountOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    driverName?: SortOrder
    notes?: SortOrder
    time?: SortOrder
  }

  export type runAvgOrderByAggregateInput = {
    runId?: SortOrder
  }

  export type runMaxOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    driverName?: SortOrder
    notes?: SortOrder
    time?: SortOrder
  }

  export type runMinOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    driverName?: SortOrder
    notes?: SortOrder
    time?: SortOrder
  }

  export type runSumOrderByAggregateInput = {
    runId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    has?: number | FloatFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListFloatFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListFloatFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type Data_typeScalarRelationFilter = {
    is?: data_typeWhereInput
    isNot?: data_typeWhereInput
  }

  export type RunScalarRelationFilter = {
    is?: runWhereInput
    isNot?: runWhereInput
  }

  export type dataTimeDataTypeNameCompoundUniqueInput = {
    time: Date | string
    dataTypeName: string
  }

  export type dataCountOrderByAggregateInput = {
    values?: SortOrder
    time?: SortOrder
    dataTypeName?: SortOrder
    runId?: SortOrder
  }

  export type dataAvgOrderByAggregateInput = {
    values?: SortOrder
  }

  export type dataMaxOrderByAggregateInput = {
    time?: SortOrder
    dataTypeName?: SortOrder
    runId?: SortOrder
  }

  export type dataMinOrderByAggregateInput = {
    time?: SortOrder
    dataTypeName?: SortOrder
    runId?: SortOrder
  }

  export type dataSumOrderByAggregateInput = {
    values?: SortOrder
  }

  export type data_typeCountOrderByAggregateInput = {
    name?: SortOrder
    unit?: SortOrder
    nodeName?: SortOrder
  }

  export type data_typeMaxOrderByAggregateInput = {
    name?: SortOrder
    unit?: SortOrder
    nodeName?: SortOrder
  }

  export type data_typeMinOrderByAggregateInput = {
    name?: SortOrder
    unit?: SortOrder
    nodeName?: SortOrder
  }

  export type dataCreateNestedManyWithoutRunInput = {
    create?: XOR<dataCreateWithoutRunInput, dataUncheckedCreateWithoutRunInput> | dataCreateWithoutRunInput[] | dataUncheckedCreateWithoutRunInput[]
    connectOrCreate?: dataCreateOrConnectWithoutRunInput | dataCreateOrConnectWithoutRunInput[]
    createMany?: dataCreateManyRunInputEnvelope
    connect?: dataWhereUniqueInput | dataWhereUniqueInput[]
  }

  export type dataUncheckedCreateNestedManyWithoutRunInput = {
    create?: XOR<dataCreateWithoutRunInput, dataUncheckedCreateWithoutRunInput> | dataCreateWithoutRunInput[] | dataUncheckedCreateWithoutRunInput[]
    connectOrCreate?: dataCreateOrConnectWithoutRunInput | dataCreateOrConnectWithoutRunInput[]
    createMany?: dataCreateManyRunInputEnvelope
    connect?: dataWhereUniqueInput | dataWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type dataUpdateManyWithoutRunNestedInput = {
    create?: XOR<dataCreateWithoutRunInput, dataUncheckedCreateWithoutRunInput> | dataCreateWithoutRunInput[] | dataUncheckedCreateWithoutRunInput[]
    connectOrCreate?: dataCreateOrConnectWithoutRunInput | dataCreateOrConnectWithoutRunInput[]
    upsert?: dataUpsertWithWhereUniqueWithoutRunInput | dataUpsertWithWhereUniqueWithoutRunInput[]
    createMany?: dataCreateManyRunInputEnvelope
    set?: dataWhereUniqueInput | dataWhereUniqueInput[]
    disconnect?: dataWhereUniqueInput | dataWhereUniqueInput[]
    delete?: dataWhereUniqueInput | dataWhereUniqueInput[]
    connect?: dataWhereUniqueInput | dataWhereUniqueInput[]
    update?: dataUpdateWithWhereUniqueWithoutRunInput | dataUpdateWithWhereUniqueWithoutRunInput[]
    updateMany?: dataUpdateManyWithWhereWithoutRunInput | dataUpdateManyWithWhereWithoutRunInput[]
    deleteMany?: dataScalarWhereInput | dataScalarWhereInput[]
  }

  export type dataUncheckedUpdateManyWithoutRunNestedInput = {
    create?: XOR<dataCreateWithoutRunInput, dataUncheckedCreateWithoutRunInput> | dataCreateWithoutRunInput[] | dataUncheckedCreateWithoutRunInput[]
    connectOrCreate?: dataCreateOrConnectWithoutRunInput | dataCreateOrConnectWithoutRunInput[]
    upsert?: dataUpsertWithWhereUniqueWithoutRunInput | dataUpsertWithWhereUniqueWithoutRunInput[]
    createMany?: dataCreateManyRunInputEnvelope
    set?: dataWhereUniqueInput | dataWhereUniqueInput[]
    disconnect?: dataWhereUniqueInput | dataWhereUniqueInput[]
    delete?: dataWhereUniqueInput | dataWhereUniqueInput[]
    connect?: dataWhereUniqueInput | dataWhereUniqueInput[]
    update?: dataUpdateWithWhereUniqueWithoutRunInput | dataUpdateWithWhereUniqueWithoutRunInput[]
    updateMany?: dataUpdateManyWithWhereWithoutRunInput | dataUpdateManyWithWhereWithoutRunInput[]
    deleteMany?: dataScalarWhereInput | dataScalarWhereInput[]
  }

  export type dataCreatevaluesInput = {
    set: number[]
  }

  export type data_typeCreateNestedOneWithoutDataInput = {
    create?: XOR<data_typeCreateWithoutDataInput, data_typeUncheckedCreateWithoutDataInput>
    connectOrCreate?: data_typeCreateOrConnectWithoutDataInput
    connect?: data_typeWhereUniqueInput
  }

  export type runCreateNestedOneWithoutDataInput = {
    create?: XOR<runCreateWithoutDataInput, runUncheckedCreateWithoutDataInput>
    connectOrCreate?: runCreateOrConnectWithoutDataInput
    connect?: runWhereUniqueInput
  }

  export type dataUpdatevaluesInput = {
    set?: number[]
    push?: number | number[]
  }

  export type data_typeUpdateOneRequiredWithoutDataNestedInput = {
    create?: XOR<data_typeCreateWithoutDataInput, data_typeUncheckedCreateWithoutDataInput>
    connectOrCreate?: data_typeCreateOrConnectWithoutDataInput
    upsert?: data_typeUpsertWithoutDataInput
    connect?: data_typeWhereUniqueInput
    update?: XOR<XOR<data_typeUpdateToOneWithWhereWithoutDataInput, data_typeUpdateWithoutDataInput>, data_typeUncheckedUpdateWithoutDataInput>
  }

  export type runUpdateOneRequiredWithoutDataNestedInput = {
    create?: XOR<runCreateWithoutDataInput, runUncheckedCreateWithoutDataInput>
    connectOrCreate?: runCreateOrConnectWithoutDataInput
    upsert?: runUpsertWithoutDataInput
    connect?: runWhereUniqueInput
    update?: XOR<XOR<runUpdateToOneWithWhereWithoutDataInput, runUpdateWithoutDataInput>, runUncheckedUpdateWithoutDataInput>
  }

  export type dataCreateNestedManyWithoutDataTypeInput = {
    create?: XOR<dataCreateWithoutDataTypeInput, dataUncheckedCreateWithoutDataTypeInput> | dataCreateWithoutDataTypeInput[] | dataUncheckedCreateWithoutDataTypeInput[]
    connectOrCreate?: dataCreateOrConnectWithoutDataTypeInput | dataCreateOrConnectWithoutDataTypeInput[]
    createMany?: dataCreateManyDataTypeInputEnvelope
    connect?: dataWhereUniqueInput | dataWhereUniqueInput[]
  }

  export type dataUncheckedCreateNestedManyWithoutDataTypeInput = {
    create?: XOR<dataCreateWithoutDataTypeInput, dataUncheckedCreateWithoutDataTypeInput> | dataCreateWithoutDataTypeInput[] | dataUncheckedCreateWithoutDataTypeInput[]
    connectOrCreate?: dataCreateOrConnectWithoutDataTypeInput | dataCreateOrConnectWithoutDataTypeInput[]
    createMany?: dataCreateManyDataTypeInputEnvelope
    connect?: dataWhereUniqueInput | dataWhereUniqueInput[]
  }

  export type dataUpdateManyWithoutDataTypeNestedInput = {
    create?: XOR<dataCreateWithoutDataTypeInput, dataUncheckedCreateWithoutDataTypeInput> | dataCreateWithoutDataTypeInput[] | dataUncheckedCreateWithoutDataTypeInput[]
    connectOrCreate?: dataCreateOrConnectWithoutDataTypeInput | dataCreateOrConnectWithoutDataTypeInput[]
    upsert?: dataUpsertWithWhereUniqueWithoutDataTypeInput | dataUpsertWithWhereUniqueWithoutDataTypeInput[]
    createMany?: dataCreateManyDataTypeInputEnvelope
    set?: dataWhereUniqueInput | dataWhereUniqueInput[]
    disconnect?: dataWhereUniqueInput | dataWhereUniqueInput[]
    delete?: dataWhereUniqueInput | dataWhereUniqueInput[]
    connect?: dataWhereUniqueInput | dataWhereUniqueInput[]
    update?: dataUpdateWithWhereUniqueWithoutDataTypeInput | dataUpdateWithWhereUniqueWithoutDataTypeInput[]
    updateMany?: dataUpdateManyWithWhereWithoutDataTypeInput | dataUpdateManyWithWhereWithoutDataTypeInput[]
    deleteMany?: dataScalarWhereInput | dataScalarWhereInput[]
  }

  export type dataUncheckedUpdateManyWithoutDataTypeNestedInput = {
    create?: XOR<dataCreateWithoutDataTypeInput, dataUncheckedCreateWithoutDataTypeInput> | dataCreateWithoutDataTypeInput[] | dataUncheckedCreateWithoutDataTypeInput[]
    connectOrCreate?: dataCreateOrConnectWithoutDataTypeInput | dataCreateOrConnectWithoutDataTypeInput[]
    upsert?: dataUpsertWithWhereUniqueWithoutDataTypeInput | dataUpsertWithWhereUniqueWithoutDataTypeInput[]
    createMany?: dataCreateManyDataTypeInputEnvelope
    set?: dataWhereUniqueInput | dataWhereUniqueInput[]
    disconnect?: dataWhereUniqueInput | dataWhereUniqueInput[]
    delete?: dataWhereUniqueInput | dataWhereUniqueInput[]
    connect?: dataWhereUniqueInput | dataWhereUniqueInput[]
    update?: dataUpdateWithWhereUniqueWithoutDataTypeInput | dataUpdateWithWhereUniqueWithoutDataTypeInput[]
    updateMany?: dataUpdateManyWithWhereWithoutDataTypeInput | dataUpdateManyWithWhereWithoutDataTypeInput[]
    deleteMany?: dataScalarWhereInput | dataScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type dataCreateWithoutRunInput = {
    values?: dataCreatevaluesInput | number[]
    time: Date | string
    dataType: data_typeCreateNestedOneWithoutDataInput
  }

  export type dataUncheckedCreateWithoutRunInput = {
    values?: dataCreatevaluesInput | number[]
    time: Date | string
    dataTypeName: string
  }

  export type dataCreateOrConnectWithoutRunInput = {
    where: dataWhereUniqueInput
    create: XOR<dataCreateWithoutRunInput, dataUncheckedCreateWithoutRunInput>
  }

  export type dataCreateManyRunInputEnvelope = {
    data: dataCreateManyRunInput | dataCreateManyRunInput[]
    skipDuplicates?: boolean
  }

  export type dataUpsertWithWhereUniqueWithoutRunInput = {
    where: dataWhereUniqueInput
    update: XOR<dataUpdateWithoutRunInput, dataUncheckedUpdateWithoutRunInput>
    create: XOR<dataCreateWithoutRunInput, dataUncheckedCreateWithoutRunInput>
  }

  export type dataUpdateWithWhereUniqueWithoutRunInput = {
    where: dataWhereUniqueInput
    data: XOR<dataUpdateWithoutRunInput, dataUncheckedUpdateWithoutRunInput>
  }

  export type dataUpdateManyWithWhereWithoutRunInput = {
    where: dataScalarWhereInput
    data: XOR<dataUpdateManyMutationInput, dataUncheckedUpdateManyWithoutRunInput>
  }

  export type dataScalarWhereInput = {
    AND?: dataScalarWhereInput | dataScalarWhereInput[]
    OR?: dataScalarWhereInput[]
    NOT?: dataScalarWhereInput | dataScalarWhereInput[]
    values?: FloatNullableListFilter<"data">
    time?: DateTimeFilter<"data"> | Date | string
    dataTypeName?: StringFilter<"data"> | string
    runId?: StringFilter<"data"> | string
  }

  export type data_typeCreateWithoutDataInput = {
    name: string
    unit: string
    nodeName: string
  }

  export type data_typeUncheckedCreateWithoutDataInput = {
    name: string
    unit: string
    nodeName: string
  }

  export type data_typeCreateOrConnectWithoutDataInput = {
    where: data_typeWhereUniqueInput
    create: XOR<data_typeCreateWithoutDataInput, data_typeUncheckedCreateWithoutDataInput>
  }

  export type runCreateWithoutDataInput = {
    id?: string
    runId?: number
    driverName: string
    notes: string
    time: Date | string
  }

  export type runUncheckedCreateWithoutDataInput = {
    id?: string
    runId?: number
    driverName: string
    notes: string
    time: Date | string
  }

  export type runCreateOrConnectWithoutDataInput = {
    where: runWhereUniqueInput
    create: XOR<runCreateWithoutDataInput, runUncheckedCreateWithoutDataInput>
  }

  export type data_typeUpsertWithoutDataInput = {
    update: XOR<data_typeUpdateWithoutDataInput, data_typeUncheckedUpdateWithoutDataInput>
    create: XOR<data_typeCreateWithoutDataInput, data_typeUncheckedCreateWithoutDataInput>
    where?: data_typeWhereInput
  }

  export type data_typeUpdateToOneWithWhereWithoutDataInput = {
    where?: data_typeWhereInput
    data: XOR<data_typeUpdateWithoutDataInput, data_typeUncheckedUpdateWithoutDataInput>
  }

  export type data_typeUpdateWithoutDataInput = {
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    nodeName?: StringFieldUpdateOperationsInput | string
  }

  export type data_typeUncheckedUpdateWithoutDataInput = {
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    nodeName?: StringFieldUpdateOperationsInput | string
  }

  export type runUpsertWithoutDataInput = {
    update: XOR<runUpdateWithoutDataInput, runUncheckedUpdateWithoutDataInput>
    create: XOR<runCreateWithoutDataInput, runUncheckedCreateWithoutDataInput>
    where?: runWhereInput
  }

  export type runUpdateToOneWithWhereWithoutDataInput = {
    where?: runWhereInput
    data: XOR<runUpdateWithoutDataInput, runUncheckedUpdateWithoutDataInput>
  }

  export type runUpdateWithoutDataInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: IntFieldUpdateOperationsInput | number
    driverName?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type runUncheckedUpdateWithoutDataInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: IntFieldUpdateOperationsInput | number
    driverName?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type dataCreateWithoutDataTypeInput = {
    values?: dataCreatevaluesInput | number[]
    time: Date | string
    run: runCreateNestedOneWithoutDataInput
  }

  export type dataUncheckedCreateWithoutDataTypeInput = {
    values?: dataCreatevaluesInput | number[]
    time: Date | string
    runId: string
  }

  export type dataCreateOrConnectWithoutDataTypeInput = {
    where: dataWhereUniqueInput
    create: XOR<dataCreateWithoutDataTypeInput, dataUncheckedCreateWithoutDataTypeInput>
  }

  export type dataCreateManyDataTypeInputEnvelope = {
    data: dataCreateManyDataTypeInput | dataCreateManyDataTypeInput[]
    skipDuplicates?: boolean
  }

  export type dataUpsertWithWhereUniqueWithoutDataTypeInput = {
    where: dataWhereUniqueInput
    update: XOR<dataUpdateWithoutDataTypeInput, dataUncheckedUpdateWithoutDataTypeInput>
    create: XOR<dataCreateWithoutDataTypeInput, dataUncheckedCreateWithoutDataTypeInput>
  }

  export type dataUpdateWithWhereUniqueWithoutDataTypeInput = {
    where: dataWhereUniqueInput
    data: XOR<dataUpdateWithoutDataTypeInput, dataUncheckedUpdateWithoutDataTypeInput>
  }

  export type dataUpdateManyWithWhereWithoutDataTypeInput = {
    where: dataScalarWhereInput
    data: XOR<dataUpdateManyMutationInput, dataUncheckedUpdateManyWithoutDataTypeInput>
  }

  export type dataCreateManyRunInput = {
    values?: dataCreatevaluesInput | number[]
    time: Date | string
    dataTypeName: string
  }

  export type dataUpdateWithoutRunInput = {
    values?: dataUpdatevaluesInput | number[]
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    dataType?: data_typeUpdateOneRequiredWithoutDataNestedInput
  }

  export type dataUncheckedUpdateWithoutRunInput = {
    values?: dataUpdatevaluesInput | number[]
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    dataTypeName?: StringFieldUpdateOperationsInput | string
  }

  export type dataUncheckedUpdateManyWithoutRunInput = {
    values?: dataUpdatevaluesInput | number[]
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    dataTypeName?: StringFieldUpdateOperationsInput | string
  }

  export type dataCreateManyDataTypeInput = {
    values?: dataCreatevaluesInput | number[]
    time: Date | string
    runId: string
  }

  export type dataUpdateWithoutDataTypeInput = {
    values?: dataUpdatevaluesInput | number[]
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    run?: runUpdateOneRequiredWithoutDataNestedInput
  }

  export type dataUncheckedUpdateWithoutDataTypeInput = {
    values?: dataUpdatevaluesInput | number[]
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    runId?: StringFieldUpdateOperationsInput | string
  }

  export type dataUncheckedUpdateManyWithoutDataTypeInput = {
    values?: dataUpdatevaluesInput | number[]
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    runId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}