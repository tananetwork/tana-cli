// @bun
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __moduleCache = /* @__PURE__ */ new WeakMap;
var __toCommonJS = (from) => {
  var entry = __moduleCache.get(from), desc;
  if (entry)
    return entry;
  entry = __defProp({}, "__esModule", { value: true });
  if (from && typeof from === "object" || typeof from === "function")
    __getOwnPropNames(from).map((key) => !__hasOwnProp.call(entry, key) && __defProp(entry, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    }));
  __moduleCache.set(from, entry);
  return entry;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);
var __require = import.meta.require;

// ../../../node_modules/@ioredis/commands/built/commands.json
var require_commands = __commonJS((exports, module) => {
  module.exports = {
    acl: {
      arity: -2,
      flags: [],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    append: {
      arity: 3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    asking: {
      arity: 1,
      flags: [
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    auth: {
      arity: -2,
      flags: [
        "noscript",
        "loading",
        "stale",
        "fast",
        "no_auth",
        "allow_busy"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    bgrewriteaof: {
      arity: 1,
      flags: [
        "admin",
        "noscript",
        "no_async_loading"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    bgsave: {
      arity: -1,
      flags: [
        "admin",
        "noscript",
        "no_async_loading"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    bitcount: {
      arity: -2,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    bitfield: {
      arity: -2,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    bitfield_ro: {
      arity: -2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    bitop: {
      arity: -4,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 2,
      keyStop: -1,
      step: 1
    },
    bitpos: {
      arity: -3,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    blmove: {
      arity: 6,
      flags: [
        "write",
        "denyoom",
        "noscript",
        "blocking"
      ],
      keyStart: 1,
      keyStop: 2,
      step: 1
    },
    blmpop: {
      arity: -5,
      flags: [
        "write",
        "blocking",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    blpop: {
      arity: -3,
      flags: [
        "write",
        "noscript",
        "blocking"
      ],
      keyStart: 1,
      keyStop: -2,
      step: 1
    },
    brpop: {
      arity: -3,
      flags: [
        "write",
        "noscript",
        "blocking"
      ],
      keyStart: 1,
      keyStop: -2,
      step: 1
    },
    brpoplpush: {
      arity: 4,
      flags: [
        "write",
        "denyoom",
        "noscript",
        "blocking"
      ],
      keyStart: 1,
      keyStop: 2,
      step: 1
    },
    bzmpop: {
      arity: -5,
      flags: [
        "write",
        "blocking",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    bzpopmax: {
      arity: -3,
      flags: [
        "write",
        "noscript",
        "blocking",
        "fast"
      ],
      keyStart: 1,
      keyStop: -2,
      step: 1
    },
    bzpopmin: {
      arity: -3,
      flags: [
        "write",
        "noscript",
        "blocking",
        "fast"
      ],
      keyStart: 1,
      keyStop: -2,
      step: 1
    },
    client: {
      arity: -2,
      flags: [],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    cluster: {
      arity: -2,
      flags: [],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    command: {
      arity: -1,
      flags: [
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    config: {
      arity: -2,
      flags: [],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    copy: {
      arity: -3,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 2,
      step: 1
    },
    dbsize: {
      arity: 1,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    debug: {
      arity: -2,
      flags: [
        "admin",
        "noscript",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    decr: {
      arity: 2,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    decrby: {
      arity: 3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    del: {
      arity: -2,
      flags: [
        "write"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    discard: {
      arity: 1,
      flags: [
        "noscript",
        "loading",
        "stale",
        "fast",
        "allow_busy"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    dump: {
      arity: 2,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    echo: {
      arity: 2,
      flags: [
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    eval: {
      arity: -3,
      flags: [
        "noscript",
        "stale",
        "skip_monitor",
        "no_mandatory_keys",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    eval_ro: {
      arity: -3,
      flags: [
        "readonly",
        "noscript",
        "stale",
        "skip_monitor",
        "no_mandatory_keys",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    evalsha: {
      arity: -3,
      flags: [
        "noscript",
        "stale",
        "skip_monitor",
        "no_mandatory_keys",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    evalsha_ro: {
      arity: -3,
      flags: [
        "readonly",
        "noscript",
        "stale",
        "skip_monitor",
        "no_mandatory_keys",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    exec: {
      arity: 1,
      flags: [
        "noscript",
        "loading",
        "stale",
        "skip_slowlog"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    exists: {
      arity: -2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    expire: {
      arity: -3,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    expireat: {
      arity: -3,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    expiretime: {
      arity: 2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    failover: {
      arity: -1,
      flags: [
        "admin",
        "noscript",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    fcall: {
      arity: -3,
      flags: [
        "noscript",
        "stale",
        "skip_monitor",
        "no_mandatory_keys",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    fcall_ro: {
      arity: -3,
      flags: [
        "readonly",
        "noscript",
        "stale",
        "skip_monitor",
        "no_mandatory_keys",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    flushall: {
      arity: -1,
      flags: [
        "write"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    flushdb: {
      arity: -1,
      flags: [
        "write"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    function: {
      arity: -2,
      flags: [],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    geoadd: {
      arity: -5,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    geodist: {
      arity: -4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    geohash: {
      arity: -2,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    geopos: {
      arity: -2,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    georadius: {
      arity: -6,
      flags: [
        "write",
        "denyoom",
        "movablekeys"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    georadius_ro: {
      arity: -6,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    georadiusbymember: {
      arity: -5,
      flags: [
        "write",
        "denyoom",
        "movablekeys"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    georadiusbymember_ro: {
      arity: -5,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    geosearch: {
      arity: -7,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    geosearchstore: {
      arity: -8,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 2,
      step: 1
    },
    get: {
      arity: 2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    getbit: {
      arity: 3,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    getdel: {
      arity: 2,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    getex: {
      arity: -2,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    getrange: {
      arity: 4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    getset: {
      arity: 3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hdel: {
      arity: -3,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hello: {
      arity: -1,
      flags: [
        "noscript",
        "loading",
        "stale",
        "fast",
        "no_auth",
        "allow_busy"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    hexists: {
      arity: 3,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hexpire: {
      arity: -6,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hpexpire: {
      arity: -6,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hget: {
      arity: 3,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hgetall: {
      arity: 2,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hincrby: {
      arity: 4,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hincrbyfloat: {
      arity: 4,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hkeys: {
      arity: 2,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hlen: {
      arity: 2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hmget: {
      arity: -3,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hmset: {
      arity: -4,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hrandfield: {
      arity: -2,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hscan: {
      arity: -3,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hset: {
      arity: -4,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hsetnx: {
      arity: 4,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hstrlen: {
      arity: 3,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    hvals: {
      arity: 2,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    incr: {
      arity: 2,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    incrby: {
      arity: 3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    incrbyfloat: {
      arity: 3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    info: {
      arity: -1,
      flags: [
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    keys: {
      arity: 2,
      flags: [
        "readonly"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    lastsave: {
      arity: 1,
      flags: [
        "loading",
        "stale",
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    latency: {
      arity: -2,
      flags: [],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    lcs: {
      arity: -3,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 2,
      step: 1
    },
    lindex: {
      arity: 3,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    linsert: {
      arity: 5,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    llen: {
      arity: 2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    lmove: {
      arity: 5,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 2,
      step: 1
    },
    lmpop: {
      arity: -4,
      flags: [
        "write",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    lolwut: {
      arity: -1,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    lpop: {
      arity: -2,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    lpos: {
      arity: -3,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    lpush: {
      arity: -3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    lpushx: {
      arity: -3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    lrange: {
      arity: 4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    lrem: {
      arity: 4,
      flags: [
        "write"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    lset: {
      arity: 4,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    ltrim: {
      arity: 4,
      flags: [
        "write"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    memory: {
      arity: -2,
      flags: [],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    mget: {
      arity: -2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    migrate: {
      arity: -6,
      flags: [
        "write",
        "movablekeys"
      ],
      keyStart: 3,
      keyStop: 3,
      step: 1
    },
    module: {
      arity: -2,
      flags: [],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    monitor: {
      arity: 1,
      flags: [
        "admin",
        "noscript",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    move: {
      arity: 3,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    mset: {
      arity: -3,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 2
    },
    msetnx: {
      arity: -3,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 2
    },
    multi: {
      arity: 1,
      flags: [
        "noscript",
        "loading",
        "stale",
        "fast",
        "allow_busy"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    object: {
      arity: -2,
      flags: [],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    persist: {
      arity: 2,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    pexpire: {
      arity: -3,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    pexpireat: {
      arity: -3,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    pexpiretime: {
      arity: 2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    pfadd: {
      arity: -2,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    pfcount: {
      arity: -2,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    pfdebug: {
      arity: 3,
      flags: [
        "write",
        "denyoom",
        "admin"
      ],
      keyStart: 2,
      keyStop: 2,
      step: 1
    },
    pfmerge: {
      arity: -2,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    pfselftest: {
      arity: 1,
      flags: [
        "admin"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    ping: {
      arity: -1,
      flags: [
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    psetex: {
      arity: 4,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    psubscribe: {
      arity: -2,
      flags: [
        "pubsub",
        "noscript",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    psync: {
      arity: -3,
      flags: [
        "admin",
        "noscript",
        "no_async_loading",
        "no_multi"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    pttl: {
      arity: 2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    publish: {
      arity: 3,
      flags: [
        "pubsub",
        "loading",
        "stale",
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    pubsub: {
      arity: -2,
      flags: [],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    punsubscribe: {
      arity: -1,
      flags: [
        "pubsub",
        "noscript",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    quit: {
      arity: -1,
      flags: [
        "noscript",
        "loading",
        "stale",
        "fast",
        "no_auth",
        "allow_busy"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    randomkey: {
      arity: 1,
      flags: [
        "readonly"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    readonly: {
      arity: 1,
      flags: [
        "loading",
        "stale",
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    readwrite: {
      arity: 1,
      flags: [
        "loading",
        "stale",
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    rename: {
      arity: 3,
      flags: [
        "write"
      ],
      keyStart: 1,
      keyStop: 2,
      step: 1
    },
    renamenx: {
      arity: 3,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 2,
      step: 1
    },
    replconf: {
      arity: -1,
      flags: [
        "admin",
        "noscript",
        "loading",
        "stale",
        "allow_busy"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    replicaof: {
      arity: 3,
      flags: [
        "admin",
        "noscript",
        "stale",
        "no_async_loading"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    reset: {
      arity: 1,
      flags: [
        "noscript",
        "loading",
        "stale",
        "fast",
        "no_auth",
        "allow_busy"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    restore: {
      arity: -4,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    "restore-asking": {
      arity: -4,
      flags: [
        "write",
        "denyoom",
        "asking"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    role: {
      arity: 1,
      flags: [
        "noscript",
        "loading",
        "stale",
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    rpop: {
      arity: -2,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    rpoplpush: {
      arity: 3,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 2,
      step: 1
    },
    rpush: {
      arity: -3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    rpushx: {
      arity: -3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    sadd: {
      arity: -3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    save: {
      arity: 1,
      flags: [
        "admin",
        "noscript",
        "no_async_loading",
        "no_multi"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    scan: {
      arity: -2,
      flags: [
        "readonly"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    scard: {
      arity: 2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    script: {
      arity: -2,
      flags: [],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    sdiff: {
      arity: -2,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    sdiffstore: {
      arity: -3,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    select: {
      arity: 2,
      flags: [
        "loading",
        "stale",
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    set: {
      arity: -3,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    setbit: {
      arity: 4,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    setex: {
      arity: 4,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    setnx: {
      arity: 3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    setrange: {
      arity: 4,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    shutdown: {
      arity: -1,
      flags: [
        "admin",
        "noscript",
        "loading",
        "stale",
        "no_multi",
        "allow_busy"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    sinter: {
      arity: -2,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    sintercard: {
      arity: -3,
      flags: [
        "readonly",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    sinterstore: {
      arity: -3,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    sismember: {
      arity: 3,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    slaveof: {
      arity: 3,
      flags: [
        "admin",
        "noscript",
        "stale",
        "no_async_loading"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    slowlog: {
      arity: -2,
      flags: [],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    smembers: {
      arity: 2,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    smismember: {
      arity: -3,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    smove: {
      arity: 4,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 2,
      step: 1
    },
    sort: {
      arity: -2,
      flags: [
        "write",
        "denyoom",
        "movablekeys"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    sort_ro: {
      arity: -2,
      flags: [
        "readonly",
        "movablekeys"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    spop: {
      arity: -2,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    spublish: {
      arity: 3,
      flags: [
        "pubsub",
        "loading",
        "stale",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    srandmember: {
      arity: -2,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    srem: {
      arity: -3,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    sscan: {
      arity: -3,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    ssubscribe: {
      arity: -2,
      flags: [
        "pubsub",
        "noscript",
        "loading",
        "stale"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    strlen: {
      arity: 2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    subscribe: {
      arity: -2,
      flags: [
        "pubsub",
        "noscript",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    substr: {
      arity: 4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    sunion: {
      arity: -2,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    sunionstore: {
      arity: -3,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    sunsubscribe: {
      arity: -1,
      flags: [
        "pubsub",
        "noscript",
        "loading",
        "stale"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    swapdb: {
      arity: 3,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    sync: {
      arity: 1,
      flags: [
        "admin",
        "noscript",
        "no_async_loading",
        "no_multi"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    time: {
      arity: 1,
      flags: [
        "loading",
        "stale",
        "fast"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    touch: {
      arity: -2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    ttl: {
      arity: 2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    type: {
      arity: 2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    unlink: {
      arity: -2,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    unsubscribe: {
      arity: -1,
      flags: [
        "pubsub",
        "noscript",
        "loading",
        "stale"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    unwatch: {
      arity: 1,
      flags: [
        "noscript",
        "loading",
        "stale",
        "fast",
        "allow_busy"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    wait: {
      arity: 3,
      flags: [
        "noscript"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    watch: {
      arity: -2,
      flags: [
        "noscript",
        "loading",
        "stale",
        "fast",
        "allow_busy"
      ],
      keyStart: 1,
      keyStop: -1,
      step: 1
    },
    xack: {
      arity: -4,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    xadd: {
      arity: -5,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    xautoclaim: {
      arity: -6,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    xclaim: {
      arity: -6,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    xdel: {
      arity: -3,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    xdelex: {
      arity: -5,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    xgroup: {
      arity: -2,
      flags: [],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    xinfo: {
      arity: -2,
      flags: [],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    xlen: {
      arity: 2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    xpending: {
      arity: -3,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    xrange: {
      arity: -4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    xread: {
      arity: -4,
      flags: [
        "readonly",
        "blocking",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    xreadgroup: {
      arity: -7,
      flags: [
        "write",
        "blocking",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    xrevrange: {
      arity: -4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    xsetid: {
      arity: -3,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    xtrim: {
      arity: -4,
      flags: [
        "write"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zadd: {
      arity: -4,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zcard: {
      arity: 2,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zcount: {
      arity: 4,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zdiff: {
      arity: -3,
      flags: [
        "readonly",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    zdiffstore: {
      arity: -4,
      flags: [
        "write",
        "denyoom",
        "movablekeys"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zincrby: {
      arity: 4,
      flags: [
        "write",
        "denyoom",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zinter: {
      arity: -3,
      flags: [
        "readonly",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    zintercard: {
      arity: -3,
      flags: [
        "readonly",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    zinterstore: {
      arity: -4,
      flags: [
        "write",
        "denyoom",
        "movablekeys"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zlexcount: {
      arity: 4,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zmpop: {
      arity: -4,
      flags: [
        "write",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    zmscore: {
      arity: -3,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zpopmax: {
      arity: -2,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zpopmin: {
      arity: -2,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zrandmember: {
      arity: -2,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zrange: {
      arity: -4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zrangebylex: {
      arity: -4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zrangebyscore: {
      arity: -4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zrangestore: {
      arity: -5,
      flags: [
        "write",
        "denyoom"
      ],
      keyStart: 1,
      keyStop: 2,
      step: 1
    },
    zrank: {
      arity: 3,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zrem: {
      arity: -3,
      flags: [
        "write",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zremrangebylex: {
      arity: 4,
      flags: [
        "write"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zremrangebyrank: {
      arity: 4,
      flags: [
        "write"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zremrangebyscore: {
      arity: 4,
      flags: [
        "write"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zrevrange: {
      arity: -4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zrevrangebylex: {
      arity: -4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zrevrangebyscore: {
      arity: -4,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zrevrank: {
      arity: 3,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zscan: {
      arity: -3,
      flags: [
        "readonly"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zscore: {
      arity: 3,
      flags: [
        "readonly",
        "fast"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    },
    zunion: {
      arity: -3,
      flags: [
        "readonly",
        "movablekeys"
      ],
      keyStart: 0,
      keyStop: 0,
      step: 0
    },
    zunionstore: {
      arity: -4,
      flags: [
        "write",
        "denyoom",
        "movablekeys"
      ],
      keyStart: 1,
      keyStop: 1,
      step: 1
    }
  };
});

// ../../../node_modules/@ioredis/commands/built/index.js
var require_built = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getKeyIndexes = exports.hasFlag = exports.exists = exports.list = undefined;
  var commands_json_1 = __importDefault(require_commands());
  exports.list = Object.keys(commands_json_1.default);
  var flags = {};
  exports.list.forEach((commandName) => {
    flags[commandName] = commands_json_1.default[commandName].flags.reduce(function(flags2, flag) {
      flags2[flag] = true;
      return flags2;
    }, {});
  });
  function exists2(commandName) {
    return Boolean(commands_json_1.default[commandName]);
  }
  exports.exists = exists2;
  function hasFlag(commandName, flag) {
    if (!flags[commandName]) {
      throw new Error("Unknown command " + commandName);
    }
    return Boolean(flags[commandName][flag]);
  }
  exports.hasFlag = hasFlag;
  function getKeyIndexes(commandName, args, options) {
    const command = commands_json_1.default[commandName];
    if (!command) {
      throw new Error("Unknown command " + commandName);
    }
    if (!Array.isArray(args)) {
      throw new Error("Expect args to be an array");
    }
    const keys = [];
    const parseExternalKey = Boolean(options && options.parseExternalKey);
    const takeDynamicKeys = (args2, startIndex) => {
      const keys2 = [];
      const keyStop = Number(args2[startIndex]);
      for (let i = 0;i < keyStop; i++) {
        keys2.push(i + startIndex + 1);
      }
      return keys2;
    };
    const takeKeyAfterToken = (args2, startIndex, token) => {
      for (let i = startIndex;i < args2.length - 1; i += 1) {
        if (String(args2[i]).toLowerCase() === token.toLowerCase()) {
          return i + 1;
        }
      }
      return null;
    };
    switch (commandName) {
      case "zunionstore":
      case "zinterstore":
      case "zdiffstore":
        keys.push(0, ...takeDynamicKeys(args, 1));
        break;
      case "eval":
      case "evalsha":
      case "eval_ro":
      case "evalsha_ro":
      case "fcall":
      case "fcall_ro":
      case "blmpop":
      case "bzmpop":
        keys.push(...takeDynamicKeys(args, 1));
        break;
      case "sintercard":
      case "lmpop":
      case "zunion":
      case "zinter":
      case "zmpop":
      case "zintercard":
      case "zdiff": {
        keys.push(...takeDynamicKeys(args, 0));
        break;
      }
      case "georadius": {
        keys.push(0);
        const storeKey = takeKeyAfterToken(args, 5, "STORE");
        if (storeKey)
          keys.push(storeKey);
        const distKey = takeKeyAfterToken(args, 5, "STOREDIST");
        if (distKey)
          keys.push(distKey);
        break;
      }
      case "georadiusbymember": {
        keys.push(0);
        const storeKey = takeKeyAfterToken(args, 4, "STORE");
        if (storeKey)
          keys.push(storeKey);
        const distKey = takeKeyAfterToken(args, 4, "STOREDIST");
        if (distKey)
          keys.push(distKey);
        break;
      }
      case "sort":
      case "sort_ro":
        keys.push(0);
        for (let i = 1;i < args.length - 1; i++) {
          let arg = args[i];
          if (typeof arg !== "string") {
            continue;
          }
          const directive = arg.toUpperCase();
          if (directive === "GET") {
            i += 1;
            arg = args[i];
            if (arg !== "#") {
              if (parseExternalKey) {
                keys.push([i, getExternalKeyNameLength(arg)]);
              } else {
                keys.push(i);
              }
            }
          } else if (directive === "BY") {
            i += 1;
            if (parseExternalKey) {
              keys.push([i, getExternalKeyNameLength(args[i])]);
            } else {
              keys.push(i);
            }
          } else if (directive === "STORE") {
            i += 1;
            keys.push(i);
          }
        }
        break;
      case "migrate":
        if (args[2] === "") {
          for (let i = 5;i < args.length - 1; i++) {
            const arg = args[i];
            if (typeof arg === "string" && arg.toUpperCase() === "KEYS") {
              for (let j = i + 1;j < args.length; j++) {
                keys.push(j);
              }
              break;
            }
          }
        } else {
          keys.push(2);
        }
        break;
      case "xreadgroup":
      case "xread":
        for (let i = commandName === "xread" ? 0 : 3;i < args.length - 1; i++) {
          if (String(args[i]).toUpperCase() === "STREAMS") {
            for (let j = i + 1;j <= i + (args.length - 1 - i) / 2; j++) {
              keys.push(j);
            }
            break;
          }
        }
        break;
      default:
        if (command.step > 0) {
          const keyStart = command.keyStart - 1;
          const keyStop = command.keyStop > 0 ? command.keyStop : args.length + command.keyStop + 1;
          for (let i = keyStart;i < keyStop; i += command.step) {
            keys.push(i);
          }
        }
        break;
    }
    return keys;
  }
  exports.getKeyIndexes = getKeyIndexes;
  function getExternalKeyNameLength(key) {
    if (typeof key !== "string") {
      key = String(key);
    }
    const hashPos = key.indexOf("->");
    return hashPos === -1 ? key.length : hashPos;
  }
});

// ../../../node_modules/standard-as-callback/built/utils.js
var require_utils = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.tryCatch = exports.errorObj = undefined;
  exports.errorObj = { e: {} };
  var tryCatchTarget;
  function tryCatcher(err2, val) {
    try {
      const target = tryCatchTarget;
      tryCatchTarget = null;
      return target.apply(this, arguments);
    } catch (e) {
      exports.errorObj.e = e;
      return exports.errorObj;
    }
  }
  function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
  }
  exports.tryCatch = tryCatch;
});

// ../../../node_modules/standard-as-callback/built/index.js
var require_built2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var utils_1 = require_utils();
  function throwLater(e) {
    setTimeout(function() {
      throw e;
    }, 0);
  }
  function asCallback(promise, nodeback, options) {
    if (typeof nodeback === "function") {
      promise.then((val) => {
        let ret;
        if (options !== undefined && Object(options).spread && Array.isArray(val)) {
          ret = utils_1.tryCatch(nodeback).apply(undefined, [null].concat(val));
        } else {
          ret = val === undefined ? utils_1.tryCatch(nodeback)(null) : utils_1.tryCatch(nodeback)(null, val);
        }
        if (ret === utils_1.errorObj) {
          throwLater(ret.e);
        }
      }, (cause) => {
        if (!cause) {
          const newReason = new Error(cause + "");
          Object.assign(newReason, { cause });
          cause = newReason;
        }
        const ret = utils_1.tryCatch(nodeback)(cause);
        if (ret === utils_1.errorObj) {
          throwLater(ret.e);
        }
      });
    }
    return promise;
  }
  exports.default = asCallback;
});

// ../../../node_modules/redis-errors/lib/old.js
var require_old = __commonJS((exports, module) => {
  var assert = __require("assert");
  var util3 = __require("util");
  function RedisError(message) {
    Object.defineProperty(this, "message", {
      value: message || "",
      configurable: true,
      writable: true
    });
    Error.captureStackTrace(this, this.constructor);
  }
  util3.inherits(RedisError, Error);
  Object.defineProperty(RedisError.prototype, "name", {
    value: "RedisError",
    configurable: true,
    writable: true
  });
  function ParserError(message, buffer2, offset) {
    assert(buffer2);
    assert.strictEqual(typeof offset, "number");
    Object.defineProperty(this, "message", {
      value: message || "",
      configurable: true,
      writable: true
    });
    const tmp = Error.stackTraceLimit;
    Error.stackTraceLimit = 2;
    Error.captureStackTrace(this, this.constructor);
    Error.stackTraceLimit = tmp;
    this.offset = offset;
    this.buffer = buffer2;
  }
  util3.inherits(ParserError, RedisError);
  Object.defineProperty(ParserError.prototype, "name", {
    value: "ParserError",
    configurable: true,
    writable: true
  });
  function ReplyError(message) {
    Object.defineProperty(this, "message", {
      value: message || "",
      configurable: true,
      writable: true
    });
    const tmp = Error.stackTraceLimit;
    Error.stackTraceLimit = 2;
    Error.captureStackTrace(this, this.constructor);
    Error.stackTraceLimit = tmp;
  }
  util3.inherits(ReplyError, RedisError);
  Object.defineProperty(ReplyError.prototype, "name", {
    value: "ReplyError",
    configurable: true,
    writable: true
  });
  function AbortError(message) {
    Object.defineProperty(this, "message", {
      value: message || "",
      configurable: true,
      writable: true
    });
    Error.captureStackTrace(this, this.constructor);
  }
  util3.inherits(AbortError, RedisError);
  Object.defineProperty(AbortError.prototype, "name", {
    value: "AbortError",
    configurable: true,
    writable: true
  });
  function InterruptError(message) {
    Object.defineProperty(this, "message", {
      value: message || "",
      configurable: true,
      writable: true
    });
    Error.captureStackTrace(this, this.constructor);
  }
  util3.inherits(InterruptError, AbortError);
  Object.defineProperty(InterruptError.prototype, "name", {
    value: "InterruptError",
    configurable: true,
    writable: true
  });
  module.exports = {
    RedisError,
    ParserError,
    ReplyError,
    AbortError,
    InterruptError
  };
});

// ../../../node_modules/redis-errors/lib/modern.js
var require_modern = __commonJS((exports, module) => {
  var assert = __require("assert");

  class RedisError extends Error {
    get name() {
      return this.constructor.name;
    }
  }

  class ParserError extends RedisError {
    constructor(message, buffer2, offset) {
      assert(buffer2);
      assert.strictEqual(typeof offset, "number");
      const tmp = Error.stackTraceLimit;
      Error.stackTraceLimit = 2;
      super(message);
      Error.stackTraceLimit = tmp;
      this.offset = offset;
      this.buffer = buffer2;
    }
    get name() {
      return this.constructor.name;
    }
  }

  class ReplyError extends RedisError {
    constructor(message) {
      const tmp = Error.stackTraceLimit;
      Error.stackTraceLimit = 2;
      super(message);
      Error.stackTraceLimit = tmp;
    }
    get name() {
      return this.constructor.name;
    }
  }

  class AbortError extends RedisError {
    get name() {
      return this.constructor.name;
    }
  }

  class InterruptError extends AbortError {
    get name() {
      return this.constructor.name;
    }
  }
  module.exports = {
    RedisError,
    ParserError,
    ReplyError,
    AbortError,
    InterruptError
  };
});

// ../../../node_modules/redis-errors/index.js
var require_redis_errors = __commonJS((exports, module) => {
  var Errors2 = process.version.charCodeAt(1) < 55 && process.version.charCodeAt(2) === 46 ? require_old() : require_modern();
  module.exports = Errors2;
});

// ../../../node_modules/cluster-key-slot/lib/index.js
var require_lib = __commonJS((exports, module) => {
  var lookup = [
    0,
    4129,
    8258,
    12387,
    16516,
    20645,
    24774,
    28903,
    33032,
    37161,
    41290,
    45419,
    49548,
    53677,
    57806,
    61935,
    4657,
    528,
    12915,
    8786,
    21173,
    17044,
    29431,
    25302,
    37689,
    33560,
    45947,
    41818,
    54205,
    50076,
    62463,
    58334,
    9314,
    13379,
    1056,
    5121,
    25830,
    29895,
    17572,
    21637,
    42346,
    46411,
    34088,
    38153,
    58862,
    62927,
    50604,
    54669,
    13907,
    9842,
    5649,
    1584,
    30423,
    26358,
    22165,
    18100,
    46939,
    42874,
    38681,
    34616,
    63455,
    59390,
    55197,
    51132,
    18628,
    22757,
    26758,
    30887,
    2112,
    6241,
    10242,
    14371,
    51660,
    55789,
    59790,
    63919,
    35144,
    39273,
    43274,
    47403,
    23285,
    19156,
    31415,
    27286,
    6769,
    2640,
    14899,
    10770,
    56317,
    52188,
    64447,
    60318,
    39801,
    35672,
    47931,
    43802,
    27814,
    31879,
    19684,
    23749,
    11298,
    15363,
    3168,
    7233,
    60846,
    64911,
    52716,
    56781,
    44330,
    48395,
    36200,
    40265,
    32407,
    28342,
    24277,
    20212,
    15891,
    11826,
    7761,
    3696,
    65439,
    61374,
    57309,
    53244,
    48923,
    44858,
    40793,
    36728,
    37256,
    33193,
    45514,
    41451,
    53516,
    49453,
    61774,
    57711,
    4224,
    161,
    12482,
    8419,
    20484,
    16421,
    28742,
    24679,
    33721,
    37784,
    41979,
    46042,
    49981,
    54044,
    58239,
    62302,
    689,
    4752,
    8947,
    13010,
    16949,
    21012,
    25207,
    29270,
    46570,
    42443,
    38312,
    34185,
    62830,
    58703,
    54572,
    50445,
    13538,
    9411,
    5280,
    1153,
    29798,
    25671,
    21540,
    17413,
    42971,
    47098,
    34713,
    38840,
    59231,
    63358,
    50973,
    55100,
    9939,
    14066,
    1681,
    5808,
    26199,
    30326,
    17941,
    22068,
    55628,
    51565,
    63758,
    59695,
    39368,
    35305,
    47498,
    43435,
    22596,
    18533,
    30726,
    26663,
    6336,
    2273,
    14466,
    10403,
    52093,
    56156,
    60223,
    64286,
    35833,
    39896,
    43963,
    48026,
    19061,
    23124,
    27191,
    31254,
    2801,
    6864,
    10931,
    14994,
    64814,
    60687,
    56684,
    52557,
    48554,
    44427,
    40424,
    36297,
    31782,
    27655,
    23652,
    19525,
    15522,
    11395,
    7392,
    3265,
    61215,
    65342,
    53085,
    57212,
    44955,
    49082,
    36825,
    40952,
    28183,
    32310,
    20053,
    24180,
    11923,
    16050,
    3793,
    7920
  ];
  var toUTF8Array = function toUTF8Array(str) {
    var char;
    var i = 0;
    var p = 0;
    var utf8 = [];
    var len = str.length;
    for (;i < len; i++) {
      char = str.charCodeAt(i);
      if (char < 128) {
        utf8[p++] = char;
      } else if (char < 2048) {
        utf8[p++] = char >> 6 | 192;
        utf8[p++] = char & 63 | 128;
      } else if ((char & 64512) === 55296 && i + 1 < str.length && (str.charCodeAt(i + 1) & 64512) === 56320) {
        char = 65536 + ((char & 1023) << 10) + (str.charCodeAt(++i) & 1023);
        utf8[p++] = char >> 18 | 240;
        utf8[p++] = char >> 12 & 63 | 128;
        utf8[p++] = char >> 6 & 63 | 128;
        utf8[p++] = char & 63 | 128;
      } else {
        utf8[p++] = char >> 12 | 224;
        utf8[p++] = char >> 6 & 63 | 128;
        utf8[p++] = char & 63 | 128;
      }
    }
    return utf8;
  };
  var generate = module.exports = function generate(str) {
    var char;
    var i = 0;
    var start = -1;
    var result = 0;
    var resultHash = 0;
    var utf8 = typeof str === "string" ? toUTF8Array(str) : str;
    var len = utf8.length;
    while (i < len) {
      char = utf8[i++];
      if (start === -1) {
        if (char === 123) {
          start = i;
        }
      } else if (char !== 125) {
        resultHash = lookup[(char ^ resultHash >> 8) & 255] ^ resultHash << 8;
      } else if (i - 1 !== start) {
        return resultHash & 16383;
      }
      result = lookup[(char ^ result >> 8) & 255] ^ result << 8;
    }
    return result & 16383;
  };
  module.exports.generateMulti = function generateMulti(keys) {
    var i = 1;
    var len = keys.length;
    var base = generate(keys[0]);
    while (i < len) {
      if (generate(keys[i++]) !== base)
        return -1;
    }
    return base;
  };
});

// ../../../node_modules/lodash.defaults/index.js
var require_lodash = __commonJS((exports, module) => {
  var MAX_SAFE_INTEGER = 9007199254740991;
  var argsTag = "[object Arguments]";
  var funcTag = "[object Function]";
  var genTag = "[object GeneratorFunction]";
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);
      case 1:
        return func.call(thisArg, args[0]);
      case 2:
        return func.call(thisArg, args[0], args[1]);
      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }
  function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var objectToString = objectProto.toString;
  var propertyIsEnumerable = objectProto.propertyIsEnumerable;
  var nativeMax = Math.max;
  function arrayLikeKeys(value, inherited) {
    var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
    var length = result.length, skipIndexes = !!length;
    for (var key in value) {
      if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  function assignInDefaults(objValue, srcValue, key, object) {
    if (objValue === undefined || eq2(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
      return srcValue;
    }
    return objValue;
  }
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty.call(object, key) && eq2(objValue, value)) || value === undefined && !(key in object)) {
      object[key] = value;
    }
  }
  function baseKeysIn(object) {
    if (!isObject(object)) {
      return nativeKeysIn(object);
    }
    var isProto = isPrototype(object), result = [];
    for (var key in object) {
      if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }
  function baseRest(func, start) {
    start = nativeMax(start === undefined ? func.length - 1 : start, 0);
    return function() {
      var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = array;
      return apply(func, this, otherArgs);
    };
  }
  function copyObject(source, props, object, customizer) {
    object || (object = {});
    var index = -1, length = props.length;
    while (++index < length) {
      var key = props[index];
      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
      assignValue(object, key, newValue === undefined ? source[key] : newValue);
    }
    return object;
  }
  function createAssigner(assigner) {
    return baseRest(function(object, sources) {
      var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined, guard = length > 2 ? sources[2] : undefined;
      customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined;
      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }
  function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
      return false;
    }
    var type = typeof index;
    if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && (index in object)) {
      return eq2(object[index], value);
    }
    return false;
  }
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
    return value === proto;
  }
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }
  function eq2(value, other) {
    return value === other || value !== value && other !== other;
  }
  function isArguments(value) {
    return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
  }
  var isArray = Array.isArray;
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }
  function isFunction(value) {
    var tag = isObject(value) ? objectToString.call(value) : "";
    return tag == funcTag || tag == genTag;
  }
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  function isObject(value) {
    var type = typeof value;
    return !!value && (type == "object" || type == "function");
  }
  function isObjectLike(value) {
    return !!value && typeof value == "object";
  }
  var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
    copyObject(source, keysIn(source), object, customizer);
  });
  var defaults = baseRest(function(args) {
    args.push(undefined, assignInDefaults);
    return apply(assignInWith, undefined, args);
  });
  function keysIn(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
  }
  module.exports = defaults;
});

// ../../../node_modules/lodash.isarguments/index.js
var require_lodash2 = __commonJS((exports, module) => {
  var MAX_SAFE_INTEGER = 9007199254740991;
  var argsTag = "[object Arguments]";
  var funcTag = "[object Function]";
  var genTag = "[object GeneratorFunction]";
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var objectToString = objectProto.toString;
  var propertyIsEnumerable = objectProto.propertyIsEnumerable;
  function isArguments(value) {
    return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
  }
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }
  function isFunction(value) {
    var tag = isObject(value) ? objectToString.call(value) : "";
    return tag == funcTag || tag == genTag;
  }
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  function isObject(value) {
    var type = typeof value;
    return !!value && (type == "object" || type == "function");
  }
  function isObjectLike(value) {
    return !!value && typeof value == "object";
  }
  module.exports = isArguments;
});

// ../../../node_modules/ioredis/built/utils/lodash.js
var require_lodash3 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.isArguments = exports.defaults = exports.noop = undefined;
  var defaults = require_lodash();
  exports.defaults = defaults;
  var isArguments = require_lodash2();
  exports.isArguments = isArguments;
  function noop3() {}
  exports.noop = noop3;
});

// ../../../node_modules/ms/index.js
var require_ms = __commonJS((exports, module) => {
  var s = 1000;
  var m = s * 60;
  var h2 = m * 60;
  var d = h2 * 24;
  var w = d * 7;
  var y = d * 365.25;
  module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) {
      return parse3(val);
    } else if (type === "number" && isFinite(val)) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
  };
  function parse3(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match2 = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match2) {
      return;
    }
    var n = parseFloat(match2[1]);
    var type = (match2[2] || "ms").toLowerCase();
    switch (type) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n * y;
      case "weeks":
      case "week":
      case "w":
        return n * w;
      case "days":
      case "day":
      case "d":
        return n * d;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n * h2;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n * m;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n * s;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n;
      default:
        return;
    }
  }
  function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return Math.round(ms / d) + "d";
    }
    if (msAbs >= h2) {
      return Math.round(ms / h2) + "h";
    }
    if (msAbs >= m) {
      return Math.round(ms / m) + "m";
    }
    if (msAbs >= s) {
      return Math.round(ms / s) + "s";
    }
    return ms + "ms";
  }
  function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return plural(ms, msAbs, d, "day");
    }
    if (msAbs >= h2) {
      return plural(ms, msAbs, h2, "hour");
    }
    if (msAbs >= m) {
      return plural(ms, msAbs, m, "minute");
    }
    if (msAbs >= s) {
      return plural(ms, msAbs, s, "second");
    }
    return ms + " ms";
  }
  function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
  }
});

// ../../../node_modules/debug/src/common.js
var require_common = __commonJS((exports, module) => {
  function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce2;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = require_ms();
    createDebug.destroy = destroy;
    Object.keys(env).forEach((key) => {
      createDebug[key] = env[key];
    });
    createDebug.names = [];
    createDebug.skips = [];
    createDebug.formatters = {};
    function selectColor(namespace) {
      let hash = 0;
      for (let i = 0;i < namespace.length; i++) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    function createDebug(namespace) {
      let prevTime;
      let enableOverride = null;
      let namespacesCache;
      let enabledCache;
      function debug(...args) {
        if (!debug.enabled) {
          return;
        }
        const self = debug;
        const curr = Number(new Date);
        const ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        args[0] = createDebug.coerce(args[0]);
        if (typeof args[0] !== "string") {
          args.unshift("%O");
        }
        let index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, (match2, format) => {
          if (match2 === "%%") {
            return "%";
          }
          index++;
          const formatter = createDebug.formatters[format];
          if (typeof formatter === "function") {
            const val = args[index];
            match2 = formatter.call(self, val);
            args.splice(index, 1);
            index--;
          }
          return match2;
        });
        createDebug.formatArgs.call(self, args);
        const logFn = self.log || createDebug.log;
        logFn.apply(self, args);
      }
      debug.namespace = namespace;
      debug.useColors = createDebug.useColors();
      debug.color = createDebug.selectColor(namespace);
      debug.extend = extend;
      debug.destroy = createDebug.destroy;
      Object.defineProperty(debug, "enabled", {
        enumerable: true,
        configurable: false,
        get: () => {
          if (enableOverride !== null) {
            return enableOverride;
          }
          if (namespacesCache !== createDebug.namespaces) {
            namespacesCache = createDebug.namespaces;
            enabledCache = createDebug.enabled(namespace);
          }
          return enabledCache;
        },
        set: (v) => {
          enableOverride = v;
        }
      });
      if (typeof createDebug.init === "function") {
        createDebug.init(debug);
      }
      return debug;
    }
    function extend(namespace, delimiter) {
      const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
      newDebug.log = this.log;
      return newDebug;
    }
    function enable(namespaces) {
      createDebug.save(namespaces);
      createDebug.namespaces = namespaces;
      createDebug.names = [];
      createDebug.skips = [];
      const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const ns of split) {
        if (ns[0] === "-") {
          createDebug.skips.push(ns.slice(1));
        } else {
          createDebug.names.push(ns);
        }
      }
    }
    function matchesTemplate(search, template) {
      let searchIndex = 0;
      let templateIndex = 0;
      let starIndex = -1;
      let matchIndex = 0;
      while (searchIndex < search.length) {
        if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
          if (template[templateIndex] === "*") {
            starIndex = templateIndex;
            matchIndex = searchIndex;
            templateIndex++;
          } else {
            searchIndex++;
            templateIndex++;
          }
        } else if (starIndex !== -1) {
          templateIndex = starIndex + 1;
          matchIndex++;
          searchIndex = matchIndex;
        } else {
          return false;
        }
      }
      while (templateIndex < template.length && template[templateIndex] === "*") {
        templateIndex++;
      }
      return templateIndex === template.length;
    }
    function disable() {
      const namespaces = [
        ...createDebug.names,
        ...createDebug.skips.map((namespace) => "-" + namespace)
      ].join(",");
      createDebug.enable("");
      return namespaces;
    }
    function enabled(name) {
      for (const skip of createDebug.skips) {
        if (matchesTemplate(name, skip)) {
          return false;
        }
      }
      for (const ns of createDebug.names) {
        if (matchesTemplate(name, ns)) {
          return true;
        }
      }
      return false;
    }
    function coerce2(val) {
      if (val instanceof Error) {
        return val.stack || val.message;
      }
      return val;
    }
    function destroy() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    createDebug.enable(createDebug.load());
    return createDebug;
  }
  module.exports = setup;
});

// ../../../node_modules/debug/src/browser.js
var require_browser = __commonJS((exports, module) => {
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = localstorage();
  exports.destroy = (() => {
    let warned = false;
    return () => {
      if (!warned) {
        warned = true;
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
    };
  })();
  exports.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function useColors() {
    if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
      return true;
    }
    if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    }
    let m;
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function formatArgs(args) {
    args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
    if (!this.useColors) {
      return;
    }
    const c = "color: " + this.color;
    args.splice(1, 0, c, "color: inherit");
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match2) => {
      if (match2 === "%%") {
        return;
      }
      index++;
      if (match2 === "%c") {
        lastC = index;
      }
    });
    args.splice(lastC, 0, c);
  }
  exports.log = console.debug || console.log || (() => {});
  function save(namespaces) {
    try {
      if (namespaces) {
        exports.storage.setItem("debug", namespaces);
      } else {
        exports.storage.removeItem("debug");
      }
    } catch (error) {}
  }
  function load() {
    let r;
    try {
      r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
    } catch (error) {}
    if (!r && typeof process !== "undefined" && "env" in process) {
      r = process.env.DEBUG;
    }
    return r;
  }
  function localstorage() {
    try {
      return localStorage;
    } catch (error) {}
  }
  module.exports = require_common()(exports);
  var { formatters } = module.exports;
  formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (error) {
      return "[UnexpectedJSONParseError]: " + error.message;
    }
  };
});

// ../../../node_modules/supports-color/index.js
var exports_supports_color = {};
__export(exports_supports_color, {
  default: () => supports_color_default,
  createSupportsColor: () => createSupportsColor
});
import process2 from "process";
import os2 from "os";
import tty from "tty";
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : process2.argv) {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position = argv.indexOf(prefix + flag);
  const terminatorPosition = argv.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
function envForceColor() {
  if (!("FORCE_COLOR" in env)) {
    return;
  }
  if (env.FORCE_COLOR === "true") {
    return 1;
  }
  if (env.FORCE_COLOR === "false") {
    return 0;
  }
  if (env.FORCE_COLOR.length === 0) {
    return 1;
  }
  const level = Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
  if (![0, 1, 2, 3].includes(level)) {
    return;
  }
  return level;
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== undefined) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if ("TF_BUILD" in env && "AGENT_NAME" in env) {
    return 1;
  }
  if (haveStream && !streamIsTTY && forceColor === undefined) {
    return 0;
  }
  const min = forceColor || 0;
  if (env.TERM === "dumb") {
    return min;
  }
  if (process2.platform === "win32") {
    const osRelease = os2.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env) {
    if (["GITHUB_ACTIONS", "GITEA_ACTIONS", "CIRCLECI"].some((key) => (key in env))) {
      return 3;
    }
    if (["TRAVIS", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => (sign in env)) || env.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env.COLORTERM === "truecolor") {
    return 3;
  }
  if (env.TERM === "xterm-kitty") {
    return 3;
  }
  if (env.TERM === "xterm-ghostty") {
    return 3;
  }
  if (env.TERM === "wezterm") {
    return 3;
  }
  if ("TERM_PROGRAM" in env) {
    const version2 = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env.TERM_PROGRAM) {
      case "iTerm.app": {
        return version2 >= 3 ? 3 : 2;
      }
      case "Apple_Terminal": {
        return 2;
      }
    }
  }
  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream, options = {}) {
  const level = _supportsColor(stream, {
    streamIsTTY: stream && stream.isTTY,
    ...options
  });
  return translateLevel(level);
}
var env, flagForceColor, supportsColor, supports_color_default;
var init_supports_color = __esm(() => {
  ({ env } = process2);
  if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
    flagForceColor = 0;
  } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
    flagForceColor = 1;
  }
  supportsColor = {
    stdout: createSupportsColor({ isTTY: tty.isatty(1) }),
    stderr: createSupportsColor({ isTTY: tty.isatty(2) })
  };
  supports_color_default = supportsColor;
});

// ../../../node_modules/debug/src/node.js
var require_node = __commonJS((exports, module) => {
  var tty2 = __require("tty");
  var util3 = __require("util");
  exports.init = init;
  exports.log = log2;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.destroy = util3.deprecate(() => {}, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  exports.colors = [6, 2, 3, 4, 5, 1];
  try {
    const supportsColor2 = (init_supports_color(), __toCommonJS(exports_supports_color));
    if (supportsColor2 && (supportsColor2.stderr || supportsColor2).level >= 2) {
      exports.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ];
    }
  } catch (error) {}
  exports.inspectOpts = Object.keys(process.env).filter((key) => {
    return /^debug_/i.test(key);
  }).reduce((obj, key) => {
    const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
      return k.toUpperCase();
    });
    let val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) {
      val = true;
    } else if (/^(no|off|false|disabled)$/i.test(val)) {
      val = false;
    } else if (val === "null") {
      val = null;
    } else {
      val = Number(val);
    }
    obj[prop] = val;
    return obj;
  }, {});
  function useColors() {
    return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty2.isatty(process.stderr.fd);
  }
  function formatArgs(args) {
    const { namespace: name, useColors: useColors2 } = this;
    if (useColors2) {
      const c = this.color;
      const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
      const prefix = `  ${colorCode};1m${name} \x1B[0m`;
      args[0] = prefix + args[0].split(`
`).join(`
` + prefix);
      args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
    } else {
      args[0] = getDate() + name + " " + args[0];
    }
  }
  function getDate() {
    if (exports.inspectOpts.hideDate) {
      return "";
    }
    return new Date().toISOString() + " ";
  }
  function log2(...args) {
    return process.stderr.write(util3.formatWithOptions(exports.inspectOpts, ...args) + `
`);
  }
  function save(namespaces) {
    if (namespaces) {
      process.env.DEBUG = namespaces;
    } else {
      delete process.env.DEBUG;
    }
  }
  function load() {
    return process.env.DEBUG;
  }
  function init(debug) {
    debug.inspectOpts = {};
    const keys = Object.keys(exports.inspectOpts);
    for (let i = 0;i < keys.length; i++) {
      debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
  }
  module.exports = require_common()(exports);
  var { formatters } = module.exports;
  formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util3.inspect(v, this.inspectOpts).split(`
`).map((str) => str.trim()).join(" ");
  };
  formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util3.inspect(v, this.inspectOpts);
  };
});

// ../../../node_modules/debug/src/index.js
var require_src = __commonJS((exports, module) => {
  if (typeof process === "undefined" || process.type === "renderer" || false || process.__nwjs) {
    module.exports = require_browser();
  } else {
    module.exports = require_node();
  }
});

// ../../../node_modules/ioredis/built/utils/debug.js
var require_debug = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.genRedactedString = exports.getStringValue = exports.MAX_ARGUMENT_LENGTH = undefined;
  var debug_1 = require_src();
  var MAX_ARGUMENT_LENGTH = 200;
  exports.MAX_ARGUMENT_LENGTH = MAX_ARGUMENT_LENGTH;
  var NAMESPACE_PREFIX = "ioredis";
  function getStringValue(v) {
    if (v === null) {
      return;
    }
    switch (typeof v) {
      case "boolean":
        return;
      case "number":
        return;
      case "object":
        if (Buffer.isBuffer(v)) {
          return v.toString("hex");
        }
        if (Array.isArray(v)) {
          return v.join(",");
        }
        try {
          return JSON.stringify(v);
        } catch (e) {
          return;
        }
      case "string":
        return v;
    }
  }
  exports.getStringValue = getStringValue;
  function genRedactedString(str, maxLen) {
    const { length } = str;
    return length <= maxLen ? str : str.slice(0, maxLen) + ' ... <REDACTED full-length="' + length + '">';
  }
  exports.genRedactedString = genRedactedString;
  function genDebugFunction(namespace) {
    const fn = (0, debug_1.default)(`${NAMESPACE_PREFIX}:${namespace}`);
    function wrappedDebug(...args) {
      if (!fn.enabled) {
        return;
      }
      for (let i = 1;i < args.length; i++) {
        const str = getStringValue(args[i]);
        if (typeof str === "string" && str.length > MAX_ARGUMENT_LENGTH) {
          args[i] = genRedactedString(str, MAX_ARGUMENT_LENGTH);
        }
      }
      return fn.apply(null, args);
    }
    Object.defineProperties(wrappedDebug, {
      namespace: {
        get() {
          return fn.namespace;
        }
      },
      enabled: {
        get() {
          return fn.enabled;
        }
      },
      destroy: {
        get() {
          return fn.destroy;
        }
      },
      log: {
        get() {
          return fn.log;
        },
        set(l) {
          fn.log = l;
        }
      }
    });
    return wrappedDebug;
  }
  exports.default = genDebugFunction;
});

// ../../../node_modules/ioredis/built/constants/TLSProfiles.js
var require_TLSProfiles = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var RedisCloudCA = `-----BEGIN CERTIFICATE-----
MIIDTzCCAjegAwIBAgIJAKSVpiDswLcwMA0GCSqGSIb3DQEBBQUAMD4xFjAUBgNV
BAoMDUdhcmFudGlhIERhdGExJDAiBgNVBAMMG1NTTCBDZXJ0aWZpY2F0aW9uIEF1
dGhvcml0eTAeFw0xMzEwMDExMjE0NTVaFw0yMzA5MjkxMjE0NTVaMD4xFjAUBgNV
BAoMDUdhcmFudGlhIERhdGExJDAiBgNVBAMMG1NTTCBDZXJ0aWZpY2F0aW9uIEF1
dGhvcml0eTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALZqkh/DczWP
JnxnHLQ7QL0T4B4CDKWBKCcisriGbA6ZePWVNo4hfKQC6JrzfR+081NeD6VcWUiz
rmd+jtPhIY4c+WVQYm5PKaN6DT1imYdxQw7aqO5j2KUCEh/cznpLxeSHoTxlR34E
QwF28Wl3eg2vc5ct8LjU3eozWVk3gb7alx9mSA2SgmuX5lEQawl++rSjsBStemY2
BDwOpAMXIrdEyP/cVn8mkvi/BDs5M5G+09j0gfhyCzRWMQ7Hn71u1eolRxwVxgi3
TMn+/vTaFSqxKjgck6zuAYjBRPaHe7qLxHNr1So/Mc9nPy+3wHebFwbIcnUojwbp
4nctkWbjb2cCAwEAAaNQME4wHQYDVR0OBBYEFP1whtcrydmW3ZJeuSoKZIKjze3w
MB8GA1UdIwQYMBaAFP1whtcrydmW3ZJeuSoKZIKjze3wMAwGA1UdEwQFMAMBAf8w
DQYJKoZIhvcNAQEFBQADggEBAG2erXhwRAa7+ZOBs0B6X57Hwyd1R4kfmXcs0rta
lbPpvgULSiB+TCbf3EbhJnHGyvdCY1tvlffLjdA7HJ0PCOn+YYLBA0pTU/dyvrN6
Su8NuS5yubnt9mb13nDGYo1rnt0YRfxN+8DM3fXIVr038A30UlPX2Ou1ExFJT0MZ
uFKY6ZvLdI6/1cbgmguMlAhM+DhKyV6Sr5699LM3zqeI816pZmlREETYkGr91q7k
BpXJu/dtHaGxg1ZGu6w/PCsYGUcECWENYD4VQPd8N32JjOfu6vEgoEAwfPP+3oGp
Z4m3ewACcWOAenqflb+cQYC4PsF7qbXDmRaWrbKntOlZ3n0=
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIGMTCCBBmgAwIBAgICEAAwDQYJKoZIhvcNAQELBQAwajELMAkGA1UEBhMCVVMx
CzAJBgNVBAgMAkNBMQswCQYDVQQHDAJDQTESMBAGA1UECgwJUmVkaXNMYWJzMS0w
KwYDVQQDDCRSZWRpc0xhYnMgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkwHhcN
MTgwMjI1MTUzNzM3WhcNMjgwMjIzMTUzNzM3WjBfMQswCQYDVQQGEwJVUzELMAkG
A1UECAwCQ0ExEjAQBgNVBAoMCVJlZGlzTGFiczEvMC0GA1UEAwwmUkNQIEludGVy
bWVkaWF0ZSBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkwggIiMA0GCSqGSIb3DQEBAQUA
A4ICDwAwggIKAoICAQDf9dqbxc8Bq7Ctq9rWcxrGNKKHivqLAFpPq02yLPx6fsOv
Tq7GsDChAYBBc4v7Y2Ap9RD5Vs3dIhEANcnolf27QwrG9RMnnvzk8pCvp1o6zSU4
VuOE1W66/O1/7e2rVxyrnTcP7UgK43zNIXu7+tiAqWsO92uSnuMoGPGpeaUm1jym
hjWKtkAwDFSqvHY+XL5qDVBEjeUe+WHkYUg40cAXjusAqgm2hZt29c2wnVrxW25W
P0meNlzHGFdA2AC5z54iRiqj57dTfBTkHoBczQxcyw6hhzxZQ4e5I5zOKjXXEhZN
r0tA3YC14CTabKRus/JmZieyZzRgEy2oti64tmLYTqSlAD78pRL40VNoaSYetXLw
hhNsXCHgWaY6d5bLOc/aIQMAV5oLvZQKvuXAF1IDmhPA+bZbpWipp0zagf1P1H3s
UzsMdn2KM0ejzgotbtNlj5TcrVwpmvE3ktvUAuA+hi3FkVx1US+2Gsp5x4YOzJ7u
P1WPk6ShF0JgnJH2ILdj6kttTWwFzH17keSFICWDfH/+kM+k7Y1v3EXMQXE7y0T9
MjvJskz6d/nv+sQhY04xt64xFMGTnZjlJMzfQNi7zWFLTZnDD0lPowq7l3YiPoTT
t5Xky83lu0KZsZBo0WlWaDG00gLVdtRgVbcuSWxpi5BdLb1kRab66JptWjxwXQID
AQABo4HrMIHoMDoGA1UdHwQzMDEwL6AtoCuGKWh0dHBzOi8vcmwtY2Etc2VydmVy
LnJlZGlzbGFicy5jb20vdjEvY3JsMEYGCCsGAQUFBwEBBDowODA2BggrBgEFBQcw
AYYqaHR0cHM6Ly9ybC1jYS1zZXJ2ZXIucmVkaXNsYWJzLmNvbS92MS9vY3NwMB0G
A1UdDgQWBBQHar5OKvQUpP2qWt6mckzToeCOHDAfBgNVHSMEGDAWgBQi42wH6hM4
L2sujEvLM0/u8lRXTzASBgNVHRMBAf8ECDAGAQH/AgEAMA4GA1UdDwEB/wQEAwIB
hjANBgkqhkiG9w0BAQsFAAOCAgEAirEn/iTsAKyhd+pu2W3Z5NjCko4NPU0EYUbr
AP7+POK2rzjIrJO3nFYQ/LLuC7KCXG+2qwan2SAOGmqWst13Y+WHp44Kae0kaChW
vcYLXXSoGQGC8QuFSNUdaeg3RbMDYFT04dOkqufeWVccoHVxyTSg9eD8LZuHn5jw
7QDLiEECBmIJHk5Eeo2TAZrx4Yx6ufSUX5HeVjlAzqwtAqdt99uCJ/EL8bgpWbe+
XoSpvUv0SEC1I1dCAhCKAvRlIOA6VBcmzg5Am12KzkqTul12/VEFIgzqu0Zy2Jbc
AUPrYVu/+tOGXQaijy7YgwH8P8n3s7ZeUa1VABJHcxrxYduDDJBLZi+MjheUDaZ1
jQRHYevI2tlqeSBqdPKG4zBY5lS0GiAlmuze5oENt0P3XboHoZPHiqcK3VECgTVh
/BkJcuudETSJcZDmQ8YfoKfBzRQNg2sv/hwvUv73Ss51Sco8GEt2lD8uEdib1Q6z
zDT5lXJowSzOD5ZA9OGDjnSRL+2riNtKWKEqvtEG3VBJoBzu9GoxbAc7wIZLxmli
iF5a/Zf5X+UXD3s4TMmy6C4QZJpAA2egsSQCnraWO2ULhh7iXMysSkF/nzVfZn43
iqpaB8++9a37hWq14ZmOv0TJIDz//b2+KC4VFXWQ5W5QC6whsjT+OlG4p5ZYG0jo
616pxqo=
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIFujCCA6KgAwIBAgIJAJ1aTT1lu2ScMA0GCSqGSIb3DQEBCwUAMGoxCzAJBgNV
BAYTAlVTMQswCQYDVQQIDAJDQTELMAkGA1UEBwwCQ0ExEjAQBgNVBAoMCVJlZGlz
TGFiczEtMCsGA1UEAwwkUmVkaXNMYWJzIFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9y
aXR5MB4XDTE4MDIyNTE1MjA0MloXDTM4MDIyMDE1MjA0MlowajELMAkGA1UEBhMC
VVMxCzAJBgNVBAgMAkNBMQswCQYDVQQHDAJDQTESMBAGA1UECgwJUmVkaXNMYWJz
MS0wKwYDVQQDDCRSZWRpc0xhYnMgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkw
ggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDLEjXy7YrbN5Waau5cd6g1
G5C2tMmeTpZ0duFAPxNU4oE3RHS5gGiok346fUXuUxbZ6QkuzeN2/2Z+RmRcJhQY
Dm0ZgdG4x59An1TJfnzKKoWj8ISmoHS/TGNBdFzXV7FYNLBuqZouqePI6ReC6Qhl
pp45huV32Q3a6IDrrvx7Wo5ZczEQeFNbCeCOQYNDdTmCyEkHqc2AGo8eoIlSTutT
ULOC7R5gzJVTS0e1hesQ7jmqHjbO+VQS1NAL4/5K6cuTEqUl+XhVhPdLWBXJQ5ag
54qhX4v+ojLzeU1R/Vc6NjMvVtptWY6JihpgplprN0Yh2556ewcXMeturcKgXfGJ
xeYzsjzXerEjrVocX5V8BNrg64NlifzTMKNOOv4fVZszq1SIHR8F9ROrqiOdh8iC
JpUbLpXH9hWCSEO6VRMB2xJoKu3cgl63kF30s77x7wLFMEHiwsQRKxooE1UhgS9K
2sO4TlQ1eWUvFvHSTVDQDlGQ6zu4qjbOpb3Q8bQwoK+ai2alkXVR4Ltxe9QlgYK3
StsnPhruzZGA0wbXdpw0bnM+YdlEm5ffSTpNIfgHeaa7Dtb801FtA71ZlH7A6TaI
SIQuUST9EKmv7xrJyx0W1pGoPOLw5T029aTjnICSLdtV9bLwysrLhIYG5bnPq78B
cS+jZHFGzD7PUVGQD01nOQIDAQABo2MwYTAdBgNVHQ4EFgQUIuNsB+oTOC9rLoxL
yzNP7vJUV08wHwYDVR0jBBgwFoAUIuNsB+oTOC9rLoxLyzNP7vJUV08wDwYDVR0T
AQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZIhvcNAQELBQADggIBAHfg
z5pMNUAKdMzK1aS1EDdK9yKz4qicILz5czSLj1mC7HKDRy8cVADUxEICis++CsCu
rYOvyCVergHQLREcxPq4rc5Nq1uj6J6649NEeh4WazOOjL4ZfQ1jVznMbGy+fJm3
3Hoelv6jWRG9iqeJZja7/1s6YC6bWymI/OY1e4wUKeNHAo+Vger7MlHV+RuabaX+
hSJ8bJAM59NCM7AgMTQpJCncrcdLeceYniGy5Q/qt2b5mJkQVkIdy4TPGGB+AXDJ
D0q3I/JDRkDUFNFdeW0js7fHdsvCR7O3tJy5zIgEV/o/BCkmJVtuwPYOrw/yOlKj
TY/U7ATAx9VFF6/vYEOMYSmrZlFX+98L6nJtwDqfLB5VTltqZ4H/KBxGE3IRSt9l
FXy40U+LnXzhhW+7VBAvyYX8GEXhHkKU8Gqk1xitrqfBXY74xKgyUSTolFSfFVgj
mcM/X4K45bka+qpkj7Kfv/8D4j6aZekwhN2ly6hhC1SmQ8qjMjpG/mrWOSSHZFmf
ybu9iD2AYHeIOkshIl6xYIa++Q/00/vs46IzAbQyriOi0XxlSMMVtPx0Q3isp+ji
n8Mq9eOuxYOEQ4of8twUkUDd528iwGtEdwf0Q01UyT84S62N8AySl1ZBKXJz6W4F
UhWfa/HQYOAPDdEjNgnVwLI23b8t0TozyCWw7q8h
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIEjzCCA3egAwIBAgIQe55B/ALCKJDZtdNT8kD6hTANBgkqhkiG9w0BAQsFADBM
MSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEGA1UEChMKR2xv
YmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjAeFw0yMjAxMjYxMjAwMDBaFw0y
NTAxMjYwMDAwMDBaMFgxCzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9iYWxTaWdu
IG52LXNhMS4wLAYDVQQDEyVHbG9iYWxTaWduIEF0bGFzIFIzIE9WIFRMUyBDQSAy
MDIyIFEyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmGmg1LW9b7Lf
8zDD83yBDTEkt+FOxKJZqF4veWc5KZsQj9HfnUS2e5nj/E+JImlGPsQuoiosLuXD
BVBNAMcUFa11buFMGMeEMwiTmCXoXRrXQmH0qjpOfKgYc5gHG3BsRGaRrf7VR4eg
ofNMG9wUBw4/g/TT7+bQJdA4NfE7Y4d5gEryZiBGB/swaX6Jp/8MF4TgUmOWmalK
dZCKyb4sPGQFRTtElk67F7vU+wdGcrcOx1tDcIB0ncjLPMnaFicagl+daWGsKqTh
counQb6QJtYHa91KvCfKWocMxQ7OIbB5UARLPmC4CJ1/f8YFm35ebfzAeULYdGXu
jE9CLor0OwIDAQABo4IBXzCCAVswDgYDVR0PAQH/BAQDAgGGMB0GA1UdJQQWMBQG
CCsGAQUFBwMBBggrBgEFBQcDAjASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQW
BBSH5Zq7a7B/t95GfJWkDBpA8HHqdjAfBgNVHSMEGDAWgBSP8Et/qC5FJK5NUPpj
move4t0bvDB7BggrBgEFBQcBAQRvMG0wLgYIKwYBBQUHMAGGImh0dHA6Ly9vY3Nw
Mi5nbG9iYWxzaWduLmNvbS9yb290cjMwOwYIKwYBBQUHMAKGL2h0dHA6Ly9zZWN1
cmUuZ2xvYmFsc2lnbi5jb20vY2FjZXJ0L3Jvb3QtcjMuY3J0MDYGA1UdHwQvMC0w
K6ApoCeGJWh0dHA6Ly9jcmwuZ2xvYmFsc2lnbi5jb20vcm9vdC1yMy5jcmwwIQYD
VR0gBBowGDAIBgZngQwBAgIwDAYKKwYBBAGgMgoBAjANBgkqhkiG9w0BAQsFAAOC
AQEAKRic9/f+nmhQU/wz04APZLjgG5OgsuUOyUEZjKVhNGDwxGTvKhyXGGAMW2B/
3bRi+aElpXwoxu3pL6fkElbX3B0BeS5LoDtxkyiVEBMZ8m+sXbocwlPyxrPbX6mY
0rVIvnuUeBH8X0L5IwfpNVvKnBIilTbcebfHyXkPezGwz7E1yhUULjJFm2bt0SdX
y+4X/WeiiYIv+fTVgZZgl+/2MKIsu/qdBJc3f3TvJ8nz+Eax1zgZmww+RSQWeOj3
15Iw6Z5FX+NwzY/Ab+9PosR5UosSeq+9HhtaxZttXG1nVh+avYPGYddWmiMT90J5
ZgKnO/Fx2hBgTxhOTMYaD312kg==
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgILBAAAAAABIVhTCKIwDQYJKoZIhvcNAQELBQAwTDEgMB4G
A1UECxMXR2xvYmFsU2lnbiBSb290IENBIC0gUjMxEzARBgNVBAoTCkdsb2JhbFNp
Z24xEzARBgNVBAMTCkdsb2JhbFNpZ24wHhcNMDkwMzE4MTAwMDAwWhcNMjkwMzE4
MTAwMDAwWjBMMSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEG
A1UEChMKR2xvYmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjCCASIwDQYJKoZI
hvcNAQEBBQADggEPADCCAQoCggEBAMwldpB5BngiFvXAg7aEyiie/QV2EcWtiHL8
RgJDx7KKnQRfJMsuS+FggkbhUqsMgUdwbN1k0ev1LKMPgj0MK66X17YUhhB5uzsT
gHeMCOFJ0mpiLx9e+pZo34knlTifBtc+ycsmWQ1z3rDI6SYOgxXG71uL0gRgykmm
KPZpO/bLyCiR5Z2KYVc3rHQU3HTgOu5yLy6c+9C7v/U9AOEGM+iCK65TpjoWc4zd
QQ4gOsC0p6Hpsk+QLjJg6VfLuQSSaGjlOCZgdbKfd/+RFO+uIEn8rUAVSNECMWEZ
XriX7613t2Saer9fwRPvm2L7DWzgVGkWqQPabumDk3F2xmmFghcCAwEAAaNCMEAw
DgYDVR0PAQH/BAQDAgEGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFI/wS3+o
LkUkrk1Q+mOai97i3Ru8MA0GCSqGSIb3DQEBCwUAA4IBAQBLQNvAUKr+yAzv95ZU
RUm7lgAJQayzE4aGKAczymvmdLm6AC2upArT9fHxD4q/c2dKg8dEe3jgr25sbwMp
jjM5RcOO5LlXbKr8EpbsU8Yt5CRsuZRj+9xTaGdWPoO4zzUhw8lo/s7awlOqzJCK
6fBdRoyV3XpYKBovHd7NADdBj+1EbddTKJd+82cEHhXXipa0095MJ6RMG3NzdvQX
mcIfeg7jLQitChws/zyrVQ4PkX4268NXSb7hLi18YIvDQVETI53O9zJrlAGomecs
Mx86OyXShkDOOyyGeMlhLxS67ttVb9+E7gUJTb0o2HLO02JQZR7rkpeDMdmztcpH
WD9f
-----END CERTIFICATE-----`;
  var TLSProfiles = {
    RedisCloudFixed: { ca: RedisCloudCA },
    RedisCloudFlexible: { ca: RedisCloudCA }
  };
  exports.default = TLSProfiles;
});

// ../../../node_modules/ioredis/built/utils/index.js
var require_utils2 = __commonJS((exports) => {
  var __dirname = "/Users/samifouad/Projects/conoda/tana/node_modules/ioredis/built/utils";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.noop = exports.defaults = exports.Debug = exports.getPackageMeta = exports.zipMap = exports.CONNECTION_CLOSED_ERROR_MSG = exports.shuffle = exports.sample = exports.resolveTLSProfile = exports.parseURL = exports.optimizeErrorStack = exports.toArg = exports.convertMapToArray = exports.convertObjectToArray = exports.timeout = exports.packObject = exports.isInt = exports.wrapMultiResult = exports.convertBufferToString = undefined;
  var fs_1 = __require("fs");
  var path_1 = __require("path");
  var url_1 = __require("url");
  var lodash_1 = require_lodash3();
  Object.defineProperty(exports, "defaults", { enumerable: true, get: function() {
    return lodash_1.defaults;
  } });
  Object.defineProperty(exports, "noop", { enumerable: true, get: function() {
    return lodash_1.noop;
  } });
  var debug_1 = require_debug();
  exports.Debug = debug_1.default;
  var TLSProfiles_1 = require_TLSProfiles();
  function convertBufferToString(value, encoding) {
    if (value instanceof Buffer) {
      return value.toString(encoding);
    }
    if (Array.isArray(value)) {
      const length = value.length;
      const res = Array(length);
      for (let i = 0;i < length; ++i) {
        res[i] = value[i] instanceof Buffer && encoding === "utf8" ? value[i].toString() : convertBufferToString(value[i], encoding);
      }
      return res;
    }
    return value;
  }
  exports.convertBufferToString = convertBufferToString;
  function wrapMultiResult(arr) {
    if (!arr) {
      return null;
    }
    const result = [];
    const length = arr.length;
    for (let i = 0;i < length; ++i) {
      const item = arr[i];
      if (item instanceof Error) {
        result.push([item]);
      } else {
        result.push([null, item]);
      }
    }
    return result;
  }
  exports.wrapMultiResult = wrapMultiResult;
  function isInt(value) {
    const x = parseFloat(value);
    return !isNaN(value) && (x | 0) === x;
  }
  exports.isInt = isInt;
  function packObject(array) {
    const result = {};
    const length = array.length;
    for (let i = 1;i < length; i += 2) {
      result[array[i - 1]] = array[i];
    }
    return result;
  }
  exports.packObject = packObject;
  function timeout(callback, timeout2) {
    let timer2 = null;
    const run = function() {
      if (timer2) {
        clearTimeout(timer2);
        timer2 = null;
        callback.apply(this, arguments);
      }
    };
    timer2 = setTimeout(run, timeout2, new Error("timeout"));
    return run;
  }
  exports.timeout = timeout;
  function convertObjectToArray(obj) {
    const result = [];
    const keys = Object.keys(obj);
    for (let i = 0, l = keys.length;i < l; i++) {
      result.push(keys[i], obj[keys[i]]);
    }
    return result;
  }
  exports.convertObjectToArray = convertObjectToArray;
  function convertMapToArray(map) {
    const result = [];
    let pos = 0;
    map.forEach(function(value, key) {
      result[pos] = key;
      result[pos + 1] = value;
      pos += 2;
    });
    return result;
  }
  exports.convertMapToArray = convertMapToArray;
  function toArg(arg) {
    if (arg === null || typeof arg === "undefined") {
      return "";
    }
    return String(arg);
  }
  exports.toArg = toArg;
  function optimizeErrorStack(error, friendlyStack, filterPath) {
    const stacks = friendlyStack.split(`
`);
    let lines = "";
    let i;
    for (i = 1;i < stacks.length; ++i) {
      if (stacks[i].indexOf(filterPath) === -1) {
        break;
      }
    }
    for (let j = i;j < stacks.length; ++j) {
      lines += `
` + stacks[j];
    }
    if (error.stack) {
      const pos = error.stack.indexOf(`
`);
      error.stack = error.stack.slice(0, pos) + lines;
    }
    return error;
  }
  exports.optimizeErrorStack = optimizeErrorStack;
  function parseURL(url) {
    if (isInt(url)) {
      return { port: url };
    }
    let parsed = (0, url_1.parse)(url, true, true);
    if (!parsed.slashes && url[0] !== "/") {
      url = "//" + url;
      parsed = (0, url_1.parse)(url, true, true);
    }
    const options = parsed.query || {};
    const result = {};
    if (parsed.auth) {
      const index = parsed.auth.indexOf(":");
      result.username = index === -1 ? parsed.auth : parsed.auth.slice(0, index);
      result.password = index === -1 ? "" : parsed.auth.slice(index + 1);
    }
    if (parsed.pathname) {
      if (parsed.protocol === "redis:" || parsed.protocol === "rediss:") {
        if (parsed.pathname.length > 1) {
          result.db = parsed.pathname.slice(1);
        }
      } else {
        result.path = parsed.pathname;
      }
    }
    if (parsed.host) {
      result.host = parsed.hostname;
    }
    if (parsed.port) {
      result.port = parsed.port;
    }
    if (typeof options.family === "string") {
      const intFamily = Number.parseInt(options.family, 10);
      if (!Number.isNaN(intFamily)) {
        result.family = intFamily;
      }
    }
    (0, lodash_1.defaults)(result, options);
    return result;
  }
  exports.parseURL = parseURL;
  function resolveTLSProfile(options) {
    let tls2 = options === null || options === undefined ? undefined : options.tls;
    if (typeof tls2 === "string")
      tls2 = { profile: tls2 };
    const profile = TLSProfiles_1.default[tls2 === null || tls2 === undefined ? undefined : tls2.profile];
    if (profile) {
      tls2 = Object.assign({}, profile, tls2);
      delete tls2.profile;
      options = Object.assign({}, options, { tls: tls2 });
    }
    return options;
  }
  exports.resolveTLSProfile = resolveTLSProfile;
  function sample(array, from = 0) {
    const length = array.length;
    if (from >= length) {
      return null;
    }
    return array[from + Math.floor(Math.random() * (length - from))];
  }
  exports.sample = sample;
  function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);
      counter--;
      [array[counter], array[index]] = [array[index], array[counter]];
    }
    return array;
  }
  exports.shuffle = shuffle;
  exports.CONNECTION_CLOSED_ERROR_MSG = "Connection is closed.";
  function zipMap(keys, values2) {
    const map = new Map;
    keys.forEach((key, index) => {
      map.set(key, values2[index]);
    });
    return map;
  }
  exports.zipMap = zipMap;
  var cachedPackageMeta = null;
  async function getPackageMeta() {
    if (cachedPackageMeta) {
      return cachedPackageMeta;
    }
    try {
      const filePath = (0, path_1.resolve)(__dirname, "..", "..", "package.json");
      const data = await fs_1.promises.readFile(filePath, "utf8");
      const parsed = JSON.parse(data);
      cachedPackageMeta = {
        version: parsed.version
      };
      return cachedPackageMeta;
    } catch (err2) {
      cachedPackageMeta = {
        version: "error-fetching-version"
      };
      return cachedPackageMeta;
    }
  }
  exports.getPackageMeta = getPackageMeta;
});

// ../../../node_modules/ioredis/built/Command.js
var require_Command = __commonJS((exports) => {
  var __dirname = "/Users/samifouad/Projects/conoda/tana/node_modules/ioredis/built";
  Object.defineProperty(exports, "__esModule", { value: true });
  var commands_1 = require_built();
  var calculateSlot = require_lib();
  var standard_as_callback_1 = require_built2();
  var utils_1 = require_utils2();

  class Command {
    constructor(name, args = [], options = {}, callback) {
      this.name = name;
      this.inTransaction = false;
      this.isResolved = false;
      this.transformed = false;
      this.replyEncoding = options.replyEncoding;
      this.errorStack = options.errorStack;
      this.args = args.flat();
      this.callback = callback;
      this.initPromise();
      if (options.keyPrefix) {
        const isBufferKeyPrefix = options.keyPrefix instanceof Buffer;
        let keyPrefixBuffer = isBufferKeyPrefix ? options.keyPrefix : null;
        this._iterateKeys((key) => {
          if (key instanceof Buffer) {
            if (keyPrefixBuffer === null) {
              keyPrefixBuffer = Buffer.from(options.keyPrefix);
            }
            return Buffer.concat([keyPrefixBuffer, key]);
          } else if (isBufferKeyPrefix) {
            return Buffer.concat([options.keyPrefix, Buffer.from(String(key))]);
          }
          return options.keyPrefix + key;
        });
      }
      if (options.readOnly) {
        this.isReadOnly = true;
      }
    }
    static checkFlag(flagName, commandName) {
      return !!this.getFlagMap()[flagName][commandName];
    }
    static setArgumentTransformer(name, func) {
      this._transformer.argument[name] = func;
    }
    static setReplyTransformer(name, func) {
      this._transformer.reply[name] = func;
    }
    static getFlagMap() {
      if (!this.flagMap) {
        this.flagMap = Object.keys(Command.FLAGS).reduce((map, flagName) => {
          map[flagName] = {};
          Command.FLAGS[flagName].forEach((commandName) => {
            map[flagName][commandName] = true;
          });
          return map;
        }, {});
      }
      return this.flagMap;
    }
    getSlot() {
      if (typeof this.slot === "undefined") {
        const key = this.getKeys()[0];
        this.slot = key == null ? null : calculateSlot(key);
      }
      return this.slot;
    }
    getKeys() {
      return this._iterateKeys();
    }
    toWritable(_socket) {
      let result;
      const commandStr = "*" + (this.args.length + 1) + `\r
$` + Buffer.byteLength(this.name) + `\r
` + this.name + `\r
`;
      if (this.bufferMode) {
        const buffers = new MixedBuffers;
        buffers.push(commandStr);
        for (let i = 0;i < this.args.length; ++i) {
          const arg = this.args[i];
          if (arg instanceof Buffer) {
            if (arg.length === 0) {
              buffers.push(`$0\r
\r
`);
            } else {
              buffers.push("$" + arg.length + `\r
`);
              buffers.push(arg);
              buffers.push(`\r
`);
            }
          } else {
            buffers.push("$" + Buffer.byteLength(arg) + `\r
` + arg + `\r
`);
          }
        }
        result = buffers.toBuffer();
      } else {
        result = commandStr;
        for (let i = 0;i < this.args.length; ++i) {
          const arg = this.args[i];
          result += "$" + Buffer.byteLength(arg) + `\r
` + arg + `\r
`;
        }
      }
      return result;
    }
    stringifyArguments() {
      for (let i = 0;i < this.args.length; ++i) {
        const arg = this.args[i];
        if (typeof arg === "string") {} else if (arg instanceof Buffer) {
          this.bufferMode = true;
        } else {
          this.args[i] = (0, utils_1.toArg)(arg);
        }
      }
    }
    transformReply(result) {
      if (this.replyEncoding) {
        result = (0, utils_1.convertBufferToString)(result, this.replyEncoding);
      }
      const transformer = Command._transformer.reply[this.name];
      if (transformer) {
        result = transformer(result);
      }
      return result;
    }
    setTimeout(ms) {
      if (!this._commandTimeoutTimer) {
        this._commandTimeoutTimer = setTimeout(() => {
          if (!this.isResolved) {
            this.reject(new Error("Command timed out"));
          }
        }, ms);
      }
    }
    initPromise() {
      const promise = new Promise((resolve, reject) => {
        if (!this.transformed) {
          this.transformed = true;
          const transformer = Command._transformer.argument[this.name];
          if (transformer) {
            this.args = transformer(this.args);
          }
          this.stringifyArguments();
        }
        this.resolve = this._convertValue(resolve);
        if (this.errorStack) {
          this.reject = (err2) => {
            reject((0, utils_1.optimizeErrorStack)(err2, this.errorStack.stack, __dirname));
          };
        } else {
          this.reject = reject;
        }
      });
      this.promise = (0, standard_as_callback_1.default)(promise, this.callback);
    }
    _iterateKeys(transform = (key) => key) {
      if (typeof this.keys === "undefined") {
        this.keys = [];
        if ((0, commands_1.exists)(this.name)) {
          const keyIndexes = (0, commands_1.getKeyIndexes)(this.name, this.args);
          for (const index of keyIndexes) {
            this.args[index] = transform(this.args[index]);
            this.keys.push(this.args[index]);
          }
        }
      }
      return this.keys;
    }
    _convertValue(resolve) {
      return (value) => {
        try {
          const existingTimer = this._commandTimeoutTimer;
          if (existingTimer) {
            clearTimeout(existingTimer);
            delete this._commandTimeoutTimer;
          }
          resolve(this.transformReply(value));
          this.isResolved = true;
        } catch (err2) {
          this.reject(err2);
        }
        return this.promise;
      };
    }
  }
  exports.default = Command;
  Command.FLAGS = {
    VALID_IN_SUBSCRIBER_MODE: [
      "subscribe",
      "psubscribe",
      "unsubscribe",
      "punsubscribe",
      "ssubscribe",
      "sunsubscribe",
      "ping",
      "quit"
    ],
    VALID_IN_MONITOR_MODE: ["monitor", "auth"],
    ENTER_SUBSCRIBER_MODE: ["subscribe", "psubscribe", "ssubscribe"],
    EXIT_SUBSCRIBER_MODE: ["unsubscribe", "punsubscribe", "sunsubscribe"],
    WILL_DISCONNECT: ["quit"],
    HANDSHAKE_COMMANDS: ["auth", "select", "client", "readonly", "info"],
    IGNORE_RECONNECT_ON_ERROR: ["client"]
  };
  Command._transformer = {
    argument: {},
    reply: {}
  };
  var msetArgumentTransformer = function(args) {
    if (args.length === 1) {
      if (args[0] instanceof Map) {
        return (0, utils_1.convertMapToArray)(args[0]);
      }
      if (typeof args[0] === "object" && args[0] !== null) {
        return (0, utils_1.convertObjectToArray)(args[0]);
      }
    }
    return args;
  };
  var hsetArgumentTransformer = function(args) {
    if (args.length === 2) {
      if (args[1] instanceof Map) {
        return [args[0]].concat((0, utils_1.convertMapToArray)(args[1]));
      }
      if (typeof args[1] === "object" && args[1] !== null) {
        return [args[0]].concat((0, utils_1.convertObjectToArray)(args[1]));
      }
    }
    return args;
  };
  Command.setArgumentTransformer("mset", msetArgumentTransformer);
  Command.setArgumentTransformer("msetnx", msetArgumentTransformer);
  Command.setArgumentTransformer("hset", hsetArgumentTransformer);
  Command.setArgumentTransformer("hmset", hsetArgumentTransformer);
  Command.setReplyTransformer("hgetall", function(result) {
    if (Array.isArray(result)) {
      const obj = {};
      for (let i = 0;i < result.length; i += 2) {
        const key = result[i];
        const value = result[i + 1];
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value,
            configurable: true,
            enumerable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }
      }
      return obj;
    }
    return result;
  });

  class MixedBuffers {
    constructor() {
      this.length = 0;
      this.items = [];
    }
    push(x) {
      this.length += Buffer.byteLength(x);
      this.items.push(x);
    }
    toBuffer() {
      const result = Buffer.allocUnsafe(this.length);
      let offset = 0;
      for (const item of this.items) {
        const length = Buffer.byteLength(item);
        Buffer.isBuffer(item) ? item.copy(result, offset) : result.write(item, offset, length);
        offset += length;
      }
      return result;
    }
  }
});

// ../../../node_modules/ioredis/built/errors/ClusterAllFailedError.js
var require_ClusterAllFailedError = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var redis_errors_1 = require_redis_errors();

  class ClusterAllFailedError extends redis_errors_1.RedisError {
    constructor(message, lastNodeError) {
      super(message);
      this.lastNodeError = lastNodeError;
      Error.captureStackTrace(this, this.constructor);
    }
    get name() {
      return this.constructor.name;
    }
  }
  exports.default = ClusterAllFailedError;
  ClusterAllFailedError.defaultMessage = "Failed to refresh slots cache.";
});

// ../../../node_modules/ioredis/built/ScanStream.js
var require_ScanStream = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var stream_1 = __require("stream");

  class ScanStream extends stream_1.Readable {
    constructor(opt) {
      super(opt);
      this.opt = opt;
      this._redisCursor = "0";
      this._redisDrained = false;
    }
    _read() {
      if (this._redisDrained) {
        this.push(null);
        return;
      }
      const args = [this._redisCursor];
      if (this.opt.key) {
        args.unshift(this.opt.key);
      }
      if (this.opt.match) {
        args.push("MATCH", this.opt.match);
      }
      if (this.opt.type) {
        args.push("TYPE", this.opt.type);
      }
      if (this.opt.count) {
        args.push("COUNT", String(this.opt.count));
      }
      if (this.opt.noValues) {
        args.push("NOVALUES");
      }
      this.opt.redis[this.opt.command](args, (err2, res) => {
        if (err2) {
          this.emit("error", err2);
          return;
        }
        this._redisCursor = res[0] instanceof Buffer ? res[0].toString() : res[0];
        if (this._redisCursor === "0") {
          this._redisDrained = true;
        }
        this.push(res[1]);
      });
    }
    close() {
      this._redisDrained = true;
    }
  }
  exports.default = ScanStream;
});

// ../../../node_modules/ioredis/built/autoPipelining.js
var require_autoPipelining = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.executeWithAutoPipelining = exports.getFirstValueInFlattenedArray = exports.shouldUseAutoPipelining = exports.notAllowedAutoPipelineCommands = exports.kCallbacks = exports.kExec = undefined;
  var lodash_1 = require_lodash3();
  var calculateSlot = require_lib();
  var standard_as_callback_1 = require_built2();
  exports.kExec = Symbol("exec");
  exports.kCallbacks = Symbol("callbacks");
  exports.notAllowedAutoPipelineCommands = [
    "auth",
    "info",
    "script",
    "quit",
    "cluster",
    "pipeline",
    "multi",
    "subscribe",
    "psubscribe",
    "unsubscribe",
    "unpsubscribe",
    "select",
    "client"
  ];
  function executeAutoPipeline(client2, slotKey) {
    if (client2._runningAutoPipelines.has(slotKey)) {
      return;
    }
    if (!client2._autoPipelines.has(slotKey)) {
      return;
    }
    client2._runningAutoPipelines.add(slotKey);
    const pipeline = client2._autoPipelines.get(slotKey);
    client2._autoPipelines.delete(slotKey);
    const callbacks = pipeline[exports.kCallbacks];
    pipeline[exports.kCallbacks] = null;
    pipeline.exec(function(err2, results) {
      client2._runningAutoPipelines.delete(slotKey);
      if (err2) {
        for (let i = 0;i < callbacks.length; i++) {
          process.nextTick(callbacks[i], err2);
        }
      } else {
        for (let i = 0;i < callbacks.length; i++) {
          process.nextTick(callbacks[i], ...results[i]);
        }
      }
      if (client2._autoPipelines.has(slotKey)) {
        executeAutoPipeline(client2, slotKey);
      }
    });
  }
  function shouldUseAutoPipelining(client2, functionName, commandName) {
    return functionName && client2.options.enableAutoPipelining && !client2.isPipeline && !exports.notAllowedAutoPipelineCommands.includes(commandName) && !client2.options.autoPipeliningIgnoredCommands.includes(commandName);
  }
  exports.shouldUseAutoPipelining = shouldUseAutoPipelining;
  function getFirstValueInFlattenedArray(args) {
    for (let i = 0;i < args.length; i++) {
      const arg = args[i];
      if (typeof arg === "string") {
        return arg;
      } else if (Array.isArray(arg) || (0, lodash_1.isArguments)(arg)) {
        if (arg.length === 0) {
          continue;
        }
        return arg[0];
      }
      const flattened = [arg].flat();
      if (flattened.length > 0) {
        return flattened[0];
      }
    }
    return;
  }
  exports.getFirstValueInFlattenedArray = getFirstValueInFlattenedArray;
  function executeWithAutoPipelining(client2, functionName, commandName, args, callback) {
    if (client2.isCluster && !client2.slots.length) {
      if (client2.status === "wait")
        client2.connect().catch(lodash_1.noop);
      return (0, standard_as_callback_1.default)(new Promise(function(resolve, reject) {
        client2.delayUntilReady((err2) => {
          if (err2) {
            reject(err2);
            return;
          }
          executeWithAutoPipelining(client2, functionName, commandName, args, null).then(resolve, reject);
        });
      }), callback);
    }
    const prefix = client2.options.keyPrefix || "";
    const slotKey = client2.isCluster ? client2.slots[calculateSlot(`${prefix}${getFirstValueInFlattenedArray(args)}`)].join(",") : "main";
    if (!client2._autoPipelines.has(slotKey)) {
      const pipeline2 = client2.pipeline();
      pipeline2[exports.kExec] = false;
      pipeline2[exports.kCallbacks] = [];
      client2._autoPipelines.set(slotKey, pipeline2);
    }
    const pipeline = client2._autoPipelines.get(slotKey);
    if (!pipeline[exports.kExec]) {
      pipeline[exports.kExec] = true;
      setImmediate(executeAutoPipeline, client2, slotKey);
    }
    const autoPipelinePromise = new Promise(function(resolve, reject) {
      pipeline[exports.kCallbacks].push(function(err2, value) {
        if (err2) {
          reject(err2);
          return;
        }
        resolve(value);
      });
      if (functionName === "call") {
        args.unshift(commandName);
      }
      pipeline[functionName](...args);
    });
    return (0, standard_as_callback_1.default)(autoPipelinePromise, callback);
  }
  exports.executeWithAutoPipelining = executeWithAutoPipelining;
});

// ../../../node_modules/ioredis/built/Script.js
var require_Script = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var crypto_1 = __require("crypto");
  var Command_1 = require_Command();
  var standard_as_callback_1 = require_built2();

  class Script {
    constructor(lua, numberOfKeys = null, keyPrefix = "", readOnly = false) {
      this.lua = lua;
      this.numberOfKeys = numberOfKeys;
      this.keyPrefix = keyPrefix;
      this.readOnly = readOnly;
      this.sha = (0, crypto_1.createHash)("sha1").update(lua).digest("hex");
      const sha = this.sha;
      const socketHasScriptLoaded = new WeakSet;
      this.Command = class CustomScriptCommand extends Command_1.default {
        toWritable(socket) {
          const origReject = this.reject;
          this.reject = (err2) => {
            if (err2.message.indexOf("NOSCRIPT") !== -1) {
              socketHasScriptLoaded.delete(socket);
            }
            origReject.call(this, err2);
          };
          if (!socketHasScriptLoaded.has(socket)) {
            socketHasScriptLoaded.add(socket);
            this.name = "eval";
            this.args[0] = lua;
          } else if (this.name === "eval") {
            this.name = "evalsha";
            this.args[0] = sha;
          }
          return super.toWritable(socket);
        }
      };
    }
    execute(container, args, options, callback) {
      if (typeof this.numberOfKeys === "number") {
        args.unshift(this.numberOfKeys);
      }
      if (this.keyPrefix) {
        options.keyPrefix = this.keyPrefix;
      }
      if (this.readOnly) {
        options.readOnly = true;
      }
      const evalsha = new this.Command("evalsha", [this.sha, ...args], options);
      evalsha.promise = evalsha.promise.catch((err2) => {
        if (err2.message.indexOf("NOSCRIPT") === -1) {
          throw err2;
        }
        const resend = new this.Command("evalsha", [this.sha, ...args], options);
        const client2 = container.isPipeline ? container.redis : container;
        return client2.sendCommand(resend);
      });
      (0, standard_as_callback_1.default)(evalsha.promise, callback);
      return container.sendCommand(evalsha);
    }
  }
  exports.default = Script;
});

// ../../../node_modules/ioredis/built/utils/Commander.js
var require_Commander = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var commands_1 = require_built();
  var autoPipelining_1 = require_autoPipelining();
  var Command_1 = require_Command();
  var Script_1 = require_Script();

  class Commander {
    constructor() {
      this.options = {};
      this.scriptsSet = {};
      this.addedBuiltinSet = new Set;
    }
    getBuiltinCommands() {
      return commands.slice(0);
    }
    createBuiltinCommand(commandName) {
      return {
        string: generateFunction(null, commandName, "utf8"),
        buffer: generateFunction(null, commandName, null)
      };
    }
    addBuiltinCommand(commandName) {
      this.addedBuiltinSet.add(commandName);
      this[commandName] = generateFunction(commandName, commandName, "utf8");
      this[commandName + "Buffer"] = generateFunction(commandName + "Buffer", commandName, null);
    }
    defineCommand(name, definition) {
      const script = new Script_1.default(definition.lua, definition.numberOfKeys, this.options.keyPrefix, definition.readOnly);
      this.scriptsSet[name] = script;
      this[name] = generateScriptingFunction(name, name, script, "utf8");
      this[name + "Buffer"] = generateScriptingFunction(name + "Buffer", name, script, null);
    }
    sendCommand(command, stream, node) {
      throw new Error('"sendCommand" is not implemented');
    }
  }
  var commands = commands_1.list.filter((command) => command !== "monitor");
  commands.push("sentinel");
  commands.forEach(function(commandName) {
    Commander.prototype[commandName] = generateFunction(commandName, commandName, "utf8");
    Commander.prototype[commandName + "Buffer"] = generateFunction(commandName + "Buffer", commandName, null);
  });
  Commander.prototype.call = generateFunction("call", "utf8");
  Commander.prototype.callBuffer = generateFunction("callBuffer", null);
  Commander.prototype.send_command = Commander.prototype.call;
  function generateFunction(functionName, _commandName, _encoding) {
    if (typeof _encoding === "undefined") {
      _encoding = _commandName;
      _commandName = null;
    }
    return function(...args) {
      const commandName = _commandName || args.shift();
      let callback = args[args.length - 1];
      if (typeof callback === "function") {
        args.pop();
      } else {
        callback = undefined;
      }
      const options = {
        errorStack: this.options.showFriendlyErrorStack ? new Error : undefined,
        keyPrefix: this.options.keyPrefix,
        replyEncoding: _encoding
      };
      if (!(0, autoPipelining_1.shouldUseAutoPipelining)(this, functionName, commandName)) {
        return this.sendCommand(new Command_1.default(commandName, args, options, callback));
      }
      return (0, autoPipelining_1.executeWithAutoPipelining)(this, functionName, commandName, args, callback);
    };
  }
  function generateScriptingFunction(functionName, commandName, script, encoding) {
    return function(...args) {
      const callback = typeof args[args.length - 1] === "function" ? args.pop() : undefined;
      const options = {
        replyEncoding: encoding
      };
      if (this.options.showFriendlyErrorStack) {
        options.errorStack = new Error;
      }
      if (!(0, autoPipelining_1.shouldUseAutoPipelining)(this, functionName, commandName)) {
        return script.execute(this, args, options, callback);
      }
      return (0, autoPipelining_1.executeWithAutoPipelining)(this, functionName, commandName, args, callback);
    };
  }
  exports.default = Commander;
});

// ../../../node_modules/ioredis/built/Pipeline.js
var require_Pipeline = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var calculateSlot = require_lib();
  var commands_1 = require_built();
  var standard_as_callback_1 = require_built2();
  var util_1 = __require("util");
  var Command_1 = require_Command();
  var utils_1 = require_utils2();
  var Commander_1 = require_Commander();
  function generateMultiWithNodes(redis, keys) {
    const slot = calculateSlot(keys[0]);
    const target = redis._groupsBySlot[slot];
    for (let i = 1;i < keys.length; i++) {
      if (redis._groupsBySlot[calculateSlot(keys[i])] !== target) {
        return -1;
      }
    }
    return slot;
  }

  class Pipeline extends Commander_1.default {
    constructor(redis) {
      super();
      this.redis = redis;
      this.isPipeline = true;
      this.replyPending = 0;
      this._queue = [];
      this._result = [];
      this._transactions = 0;
      this._shaToScript = {};
      this.isCluster = this.redis.constructor.name === "Cluster" || this.redis.isCluster;
      this.options = redis.options;
      Object.keys(redis.scriptsSet).forEach((name) => {
        const script = redis.scriptsSet[name];
        this._shaToScript[script.sha] = script;
        this[name] = redis[name];
        this[name + "Buffer"] = redis[name + "Buffer"];
      });
      redis.addedBuiltinSet.forEach((name) => {
        this[name] = redis[name];
        this[name + "Buffer"] = redis[name + "Buffer"];
      });
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      const _this = this;
      Object.defineProperty(this, "length", {
        get: function() {
          return _this._queue.length;
        }
      });
    }
    fillResult(value, position) {
      if (this._queue[position].name === "exec" && Array.isArray(value[1])) {
        const execLength = value[1].length;
        for (let i = 0;i < execLength; i++) {
          if (value[1][i] instanceof Error) {
            continue;
          }
          const cmd = this._queue[position - (execLength - i)];
          try {
            value[1][i] = cmd.transformReply(value[1][i]);
          } catch (err2) {
            value[1][i] = err2;
          }
        }
      }
      this._result[position] = value;
      if (--this.replyPending) {
        return;
      }
      if (this.isCluster) {
        let retriable = true;
        let commonError;
        for (let i = 0;i < this._result.length; ++i) {
          const error = this._result[i][0];
          const command = this._queue[i];
          if (error) {
            if (command.name === "exec" && error.message === "EXECABORT Transaction discarded because of previous errors.") {
              continue;
            }
            if (!commonError) {
              commonError = {
                name: error.name,
                message: error.message
              };
            } else if (commonError.name !== error.name || commonError.message !== error.message) {
              retriable = false;
              break;
            }
          } else if (!command.inTransaction) {
            const isReadOnly = (0, commands_1.exists)(command.name) && (0, commands_1.hasFlag)(command.name, "readonly");
            if (!isReadOnly) {
              retriable = false;
              break;
            }
          }
        }
        if (commonError && retriable) {
          const _this = this;
          const errv = commonError.message.split(" ");
          const queue = this._queue;
          let inTransaction = false;
          this._queue = [];
          for (let i = 0;i < queue.length; ++i) {
            if (errv[0] === "ASK" && !inTransaction && queue[i].name !== "asking" && (!queue[i - 1] || queue[i - 1].name !== "asking")) {
              const asking = new Command_1.default("asking");
              asking.ignore = true;
              this.sendCommand(asking);
            }
            queue[i].initPromise();
            this.sendCommand(queue[i]);
            inTransaction = queue[i].inTransaction;
          }
          let matched = true;
          if (typeof this.leftRedirections === "undefined") {
            this.leftRedirections = {};
          }
          const exec = function() {
            _this.exec();
          };
          const cluster = this.redis;
          cluster.handleError(commonError, this.leftRedirections, {
            moved: function(_slot, key) {
              _this.preferKey = key;
              cluster.slots[errv[1]] = [key];
              cluster._groupsBySlot[errv[1]] = cluster._groupsIds[cluster.slots[errv[1]].join(";")];
              cluster.refreshSlotsCache();
              _this.exec();
            },
            ask: function(_slot, key) {
              _this.preferKey = key;
              _this.exec();
            },
            tryagain: exec,
            clusterDown: exec,
            connectionClosed: exec,
            maxRedirections: () => {
              matched = false;
            },
            defaults: () => {
              matched = false;
            }
          });
          if (matched) {
            return;
          }
        }
      }
      let ignoredCount = 0;
      for (let i = 0;i < this._queue.length - ignoredCount; ++i) {
        if (this._queue[i + ignoredCount].ignore) {
          ignoredCount += 1;
        }
        this._result[i] = this._result[i + ignoredCount];
      }
      this.resolve(this._result.slice(0, this._result.length - ignoredCount));
    }
    sendCommand(command) {
      if (this._transactions > 0) {
        command.inTransaction = true;
      }
      const position = this._queue.length;
      command.pipelineIndex = position;
      command.promise.then((result) => {
        this.fillResult([null, result], position);
      }).catch((error) => {
        this.fillResult([error], position);
      });
      this._queue.push(command);
      return this;
    }
    addBatch(commands) {
      let command, commandName, args;
      for (let i = 0;i < commands.length; ++i) {
        command = commands[i];
        commandName = command[0];
        args = command.slice(1);
        this[commandName].apply(this, args);
      }
      return this;
    }
  }
  exports.default = Pipeline;
  var multi = Pipeline.prototype.multi;
  Pipeline.prototype.multi = function() {
    this._transactions += 1;
    return multi.apply(this, arguments);
  };
  var execBuffer = Pipeline.prototype.execBuffer;
  Pipeline.prototype.execBuffer = (0, util_1.deprecate)(function() {
    if (this._transactions > 0) {
      this._transactions -= 1;
    }
    return execBuffer.apply(this, arguments);
  }, "Pipeline#execBuffer: Use Pipeline#exec instead");
  Pipeline.prototype.exec = function(callback) {
    if (this.isCluster && !this.redis.slots.length) {
      if (this.redis.status === "wait")
        this.redis.connect().catch(utils_1.noop);
      if (callback && !this.nodeifiedPromise) {
        this.nodeifiedPromise = true;
        (0, standard_as_callback_1.default)(this.promise, callback);
      }
      this.redis.delayUntilReady((err2) => {
        if (err2) {
          this.reject(err2);
          return;
        }
        this.exec(callback);
      });
      return this.promise;
    }
    if (this._transactions > 0) {
      this._transactions -= 1;
      return execBuffer.apply(this, arguments);
    }
    if (!this.nodeifiedPromise) {
      this.nodeifiedPromise = true;
      (0, standard_as_callback_1.default)(this.promise, callback);
    }
    if (!this._queue.length) {
      this.resolve([]);
    }
    let pipelineSlot;
    if (this.isCluster) {
      const sampleKeys = [];
      for (let i = 0;i < this._queue.length; i++) {
        const keys = this._queue[i].getKeys();
        if (keys.length) {
          sampleKeys.push(keys[0]);
        }
        if (keys.length && calculateSlot.generateMulti(keys) < 0) {
          this.reject(new Error("All the keys in a pipeline command should belong to the same slot"));
          return this.promise;
        }
      }
      if (sampleKeys.length) {
        pipelineSlot = generateMultiWithNodes(this.redis, sampleKeys);
        if (pipelineSlot < 0) {
          this.reject(new Error("All keys in the pipeline should belong to the same slots allocation group"));
          return this.promise;
        }
      } else {
        pipelineSlot = Math.random() * 16384 | 0;
      }
    }
    const _this = this;
    execPipeline();
    return this.promise;
    function execPipeline() {
      let writePending = _this.replyPending = _this._queue.length;
      let node;
      if (_this.isCluster) {
        node = {
          slot: pipelineSlot,
          redis: _this.redis.connectionPool.nodes.all[_this.preferKey]
        };
      }
      let data = "";
      let buffers;
      const stream = {
        isPipeline: true,
        destination: _this.isCluster ? node : { redis: _this.redis },
        write(writable) {
          if (typeof writable !== "string") {
            if (!buffers) {
              buffers = [];
            }
            if (data) {
              buffers.push(Buffer.from(data, "utf8"));
              data = "";
            }
            buffers.push(writable);
          } else {
            data += writable;
          }
          if (!--writePending) {
            if (buffers) {
              if (data) {
                buffers.push(Buffer.from(data, "utf8"));
              }
              stream.destination.redis.stream.write(Buffer.concat(buffers));
            } else {
              stream.destination.redis.stream.write(data);
            }
            writePending = _this._queue.length;
            data = "";
            buffers = undefined;
          }
        }
      };
      for (let i = 0;i < _this._queue.length; ++i) {
        _this.redis.sendCommand(_this._queue[i], stream, node);
      }
      return _this.promise;
    }
  };
});

// ../../../node_modules/ioredis/built/transaction.js
var require_transaction = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.addTransactionSupport = undefined;
  var utils_1 = require_utils2();
  var standard_as_callback_1 = require_built2();
  var Pipeline_1 = require_Pipeline();
  function addTransactionSupport(redis) {
    redis.pipeline = function(commands) {
      const pipeline = new Pipeline_1.default(this);
      if (Array.isArray(commands)) {
        pipeline.addBatch(commands);
      }
      return pipeline;
    };
    const { multi } = redis;
    redis.multi = function(commands, options) {
      if (typeof options === "undefined" && !Array.isArray(commands)) {
        options = commands;
        commands = null;
      }
      if (options && options.pipeline === false) {
        return multi.call(this);
      }
      const pipeline = new Pipeline_1.default(this);
      pipeline.multi();
      if (Array.isArray(commands)) {
        pipeline.addBatch(commands);
      }
      const exec2 = pipeline.exec;
      pipeline.exec = function(callback) {
        if (this.isCluster && !this.redis.slots.length) {
          if (this.redis.status === "wait")
            this.redis.connect().catch(utils_1.noop);
          return (0, standard_as_callback_1.default)(new Promise((resolve, reject) => {
            this.redis.delayUntilReady((err2) => {
              if (err2) {
                reject(err2);
                return;
              }
              this.exec(pipeline).then(resolve, reject);
            });
          }), callback);
        }
        if (this._transactions > 0) {
          exec2.call(pipeline);
        }
        if (this.nodeifiedPromise) {
          return exec2.call(pipeline);
        }
        const promise = exec2.call(pipeline);
        return (0, standard_as_callback_1.default)(promise.then(function(result) {
          const execResult = result[result.length - 1];
          if (typeof execResult === "undefined") {
            throw new Error("Pipeline cannot be used to send any commands when the `exec()` has been called on it.");
          }
          if (execResult[0]) {
            execResult[0].previousErrors = [];
            for (let i = 0;i < result.length - 1; ++i) {
              if (result[i][0]) {
                execResult[0].previousErrors.push(result[i][0]);
              }
            }
            throw execResult[0];
          }
          return (0, utils_1.wrapMultiResult)(execResult[1]);
        }), callback);
      };
      const { execBuffer } = pipeline;
      pipeline.execBuffer = function(callback) {
        if (this._transactions > 0) {
          execBuffer.call(pipeline);
        }
        return pipeline.exec(callback);
      };
      return pipeline;
    };
    const { exec } = redis;
    redis.exec = function(callback) {
      return (0, standard_as_callback_1.default)(exec.call(this).then(function(results) {
        if (Array.isArray(results)) {
          results = (0, utils_1.wrapMultiResult)(results);
        }
        return results;
      }), callback);
    };
  }
  exports.addTransactionSupport = addTransactionSupport;
});

// ../../../node_modules/ioredis/built/utils/applyMixin.js
var require_applyMixin = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  function applyMixin(derivedConstructor, mixinConstructor) {
    Object.getOwnPropertyNames(mixinConstructor.prototype).forEach((name) => {
      Object.defineProperty(derivedConstructor.prototype, name, Object.getOwnPropertyDescriptor(mixinConstructor.prototype, name));
    });
  }
  exports.default = applyMixin;
});

// ../../../node_modules/ioredis/built/cluster/ClusterOptions.js
var require_ClusterOptions = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DEFAULT_CLUSTER_OPTIONS = undefined;
  var dns_1 = __require("dns");
  exports.DEFAULT_CLUSTER_OPTIONS = {
    clusterRetryStrategy: (times) => Math.min(100 + times * 2, 2000),
    enableOfflineQueue: true,
    enableReadyCheck: true,
    scaleReads: "master",
    maxRedirections: 16,
    retryDelayOnMoved: 0,
    retryDelayOnFailover: 100,
    retryDelayOnClusterDown: 100,
    retryDelayOnTryAgain: 100,
    slotsRefreshTimeout: 1000,
    useSRVRecords: false,
    resolveSrv: dns_1.resolveSrv,
    dnsLookup: dns_1.lookup,
    enableAutoPipelining: false,
    autoPipeliningIgnoredCommands: [],
    shardedSubscribers: false
  };
});

// ../../../node_modules/ioredis/built/cluster/util.js
var require_util = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getConnectionName = exports.weightSrvRecords = exports.groupSrvRecords = exports.getUniqueHostnamesFromOptions = exports.normalizeNodeOptions = exports.nodeKeyToRedisOptions = exports.getNodeKey = undefined;
  var utils_1 = require_utils2();
  var net_1 = __require("net");
  function getNodeKey(node) {
    node.port = node.port || 6379;
    node.host = node.host || "127.0.0.1";
    return node.host + ":" + node.port;
  }
  exports.getNodeKey = getNodeKey;
  function nodeKeyToRedisOptions(nodeKey) {
    const portIndex = nodeKey.lastIndexOf(":");
    if (portIndex === -1) {
      throw new Error(`Invalid node key ${nodeKey}`);
    }
    return {
      host: nodeKey.slice(0, portIndex),
      port: Number(nodeKey.slice(portIndex + 1))
    };
  }
  exports.nodeKeyToRedisOptions = nodeKeyToRedisOptions;
  function normalizeNodeOptions(nodes) {
    return nodes.map((node) => {
      const options = {};
      if (typeof node === "object") {
        Object.assign(options, node);
      } else if (typeof node === "string") {
        Object.assign(options, (0, utils_1.parseURL)(node));
      } else if (typeof node === "number") {
        options.port = node;
      } else {
        throw new Error("Invalid argument " + node);
      }
      if (typeof options.port === "string") {
        options.port = parseInt(options.port, 10);
      }
      delete options.db;
      if (!options.port) {
        options.port = 6379;
      }
      if (!options.host) {
        options.host = "127.0.0.1";
      }
      return (0, utils_1.resolveTLSProfile)(options);
    });
  }
  exports.normalizeNodeOptions = normalizeNodeOptions;
  function getUniqueHostnamesFromOptions(nodes) {
    const uniqueHostsMap = {};
    nodes.forEach((node) => {
      uniqueHostsMap[node.host] = true;
    });
    return Object.keys(uniqueHostsMap).filter((host) => !(0, net_1.isIP)(host));
  }
  exports.getUniqueHostnamesFromOptions = getUniqueHostnamesFromOptions;
  function groupSrvRecords(records) {
    const recordsByPriority = {};
    for (const record of records) {
      if (!recordsByPriority.hasOwnProperty(record.priority)) {
        recordsByPriority[record.priority] = {
          totalWeight: record.weight,
          records: [record]
        };
      } else {
        recordsByPriority[record.priority].totalWeight += record.weight;
        recordsByPriority[record.priority].records.push(record);
      }
    }
    return recordsByPriority;
  }
  exports.groupSrvRecords = groupSrvRecords;
  function weightSrvRecords(recordsGroup) {
    if (recordsGroup.records.length === 1) {
      recordsGroup.totalWeight = 0;
      return recordsGroup.records.shift();
    }
    const random = Math.floor(Math.random() * (recordsGroup.totalWeight + recordsGroup.records.length));
    let total = 0;
    for (const [i, record] of recordsGroup.records.entries()) {
      total += 1 + record.weight;
      if (total > random) {
        recordsGroup.totalWeight -= record.weight;
        recordsGroup.records.splice(i, 1);
        return record;
      }
    }
  }
  exports.weightSrvRecords = weightSrvRecords;
  function getConnectionName(component, nodeConnectionName) {
    const prefix = `ioredis-cluster(${component})`;
    return nodeConnectionName ? `${prefix}:${nodeConnectionName}` : prefix;
  }
  exports.getConnectionName = getConnectionName;
});

// ../../../node_modules/ioredis/built/cluster/ClusterSubscriber.js
var require_ClusterSubscriber = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var util_1 = require_util();
  var utils_1 = require_utils2();
  var Redis_1 = require_Redis();
  var debug = (0, utils_1.Debug)("cluster:subscriber");

  class ClusterSubscriber {
    constructor(connectionPool, emitter, isSharded = false) {
      this.connectionPool = connectionPool;
      this.emitter = emitter;
      this.isSharded = isSharded;
      this.started = false;
      this.subscriber = null;
      this.slotRange = [];
      this.onSubscriberEnd = () => {
        if (!this.started) {
          debug("subscriber has disconnected, but ClusterSubscriber is not started, so not reconnecting.");
          return;
        }
        debug("subscriber has disconnected, selecting a new one...");
        this.selectSubscriber();
      };
      this.connectionPool.on("-node", (_, key) => {
        if (!this.started || !this.subscriber) {
          return;
        }
        if ((0, util_1.getNodeKey)(this.subscriber.options) === key) {
          debug("subscriber has left, selecting a new one...");
          this.selectSubscriber();
        }
      });
      this.connectionPool.on("+node", () => {
        if (!this.started || this.subscriber) {
          return;
        }
        debug("a new node is discovered and there is no subscriber, selecting a new one...");
        this.selectSubscriber();
      });
    }
    getInstance() {
      return this.subscriber;
    }
    associateSlotRange(range) {
      if (this.isSharded) {
        this.slotRange = range;
      }
      return this.slotRange;
    }
    start() {
      this.started = true;
      this.selectSubscriber();
      debug("started");
    }
    stop() {
      this.started = false;
      if (this.subscriber) {
        this.subscriber.disconnect();
        this.subscriber = null;
      }
    }
    isStarted() {
      return this.started;
    }
    selectSubscriber() {
      const lastActiveSubscriber = this.lastActiveSubscriber;
      if (lastActiveSubscriber) {
        lastActiveSubscriber.off("end", this.onSubscriberEnd);
        lastActiveSubscriber.disconnect();
      }
      if (this.subscriber) {
        this.subscriber.off("end", this.onSubscriberEnd);
        this.subscriber.disconnect();
      }
      const sampleNode = (0, utils_1.sample)(this.connectionPool.getNodes());
      if (!sampleNode) {
        debug("selecting subscriber failed since there is no node discovered in the cluster yet");
        this.subscriber = null;
        return;
      }
      const { options } = sampleNode;
      debug("selected a subscriber %s:%s", options.host, options.port);
      let connectionPrefix = "subscriber";
      if (this.isSharded)
        connectionPrefix = "ssubscriber";
      this.subscriber = new Redis_1.default({
        port: options.port,
        host: options.host,
        username: options.username,
        password: options.password,
        enableReadyCheck: true,
        connectionName: (0, util_1.getConnectionName)(connectionPrefix, options.connectionName),
        lazyConnect: true,
        tls: options.tls,
        retryStrategy: null
      });
      this.subscriber.on("error", utils_1.noop);
      this.subscriber.on("moved", () => {
        this.emitter.emit("forceRefresh");
      });
      this.subscriber.once("end", this.onSubscriberEnd);
      const previousChannels = { subscribe: [], psubscribe: [], ssubscribe: [] };
      if (lastActiveSubscriber) {
        const condition = lastActiveSubscriber.condition || lastActiveSubscriber.prevCondition;
        if (condition && condition.subscriber) {
          previousChannels.subscribe = condition.subscriber.channels("subscribe");
          previousChannels.psubscribe = condition.subscriber.channels("psubscribe");
          previousChannels.ssubscribe = condition.subscriber.channels("ssubscribe");
        }
      }
      if (previousChannels.subscribe.length || previousChannels.psubscribe.length || previousChannels.ssubscribe.length) {
        let pending = 0;
        for (const type of ["subscribe", "psubscribe", "ssubscribe"]) {
          const channels2 = previousChannels[type];
          if (channels2.length == 0) {
            continue;
          }
          debug("%s %d channels", type, channels2.length);
          if (type === "ssubscribe") {
            for (const channel of channels2) {
              pending += 1;
              this.subscriber[type](channel).then(() => {
                if (!--pending) {
                  this.lastActiveSubscriber = this.subscriber;
                }
              }).catch(() => {
                debug("failed to ssubscribe to channel: %s", channel);
              });
            }
          } else {
            pending += 1;
            this.subscriber[type](channels2).then(() => {
              if (!--pending) {
                this.lastActiveSubscriber = this.subscriber;
              }
            }).catch(() => {
              debug("failed to %s %d channels", type, channels2.length);
            });
          }
        }
      } else {
        this.lastActiveSubscriber = this.subscriber;
      }
      for (const event of [
        "message",
        "messageBuffer"
      ]) {
        this.subscriber.on(event, (arg1, arg2) => {
          this.emitter.emit(event, arg1, arg2);
        });
      }
      for (const event of ["pmessage", "pmessageBuffer"]) {
        this.subscriber.on(event, (arg1, arg2, arg3) => {
          this.emitter.emit(event, arg1, arg2, arg3);
        });
      }
      if (this.isSharded == true) {
        for (const event of [
          "smessage",
          "smessageBuffer"
        ]) {
          this.subscriber.on(event, (arg1, arg2) => {
            this.emitter.emit(event, arg1, arg2);
          });
        }
      }
    }
  }
  exports.default = ClusterSubscriber;
});

// ../../../node_modules/ioredis/built/cluster/ConnectionPool.js
var require_ConnectionPool = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var events_1 = __require("events");
  var utils_1 = require_utils2();
  var util_1 = require_util();
  var Redis_1 = require_Redis();
  var debug = (0, utils_1.Debug)("cluster:connectionPool");

  class ConnectionPool extends events_1.EventEmitter {
    constructor(redisOptions) {
      super();
      this.redisOptions = redisOptions;
      this.nodes = {
        all: {},
        master: {},
        slave: {}
      };
      this.specifiedOptions = {};
    }
    getNodes(role = "all") {
      const nodes = this.nodes[role];
      return Object.keys(nodes).map((key) => nodes[key]);
    }
    getInstanceByKey(key) {
      return this.nodes.all[key];
    }
    getSampleInstance(role) {
      const keys = Object.keys(this.nodes[role]);
      const sampleKey = (0, utils_1.sample)(keys);
      return this.nodes[role][sampleKey];
    }
    addMasterNode(node) {
      const key = (0, util_1.getNodeKey)(node.options);
      const redis = this.createRedisFromOptions(node, node.options.readOnly);
      if (!node.options.readOnly) {
        this.nodes.all[key] = redis;
        this.nodes.master[key] = redis;
        return true;
      }
      return false;
    }
    createRedisFromOptions(node, readOnly) {
      const redis = new Redis_1.default((0, utils_1.defaults)({
        retryStrategy: null,
        enableOfflineQueue: true,
        readOnly
      }, node, this.redisOptions, { lazyConnect: true }));
      return redis;
    }
    findOrCreate(node, readOnly = false) {
      const key = (0, util_1.getNodeKey)(node);
      readOnly = Boolean(readOnly);
      if (this.specifiedOptions[key]) {
        Object.assign(node, this.specifiedOptions[key]);
      } else {
        this.specifiedOptions[key] = node;
      }
      let redis;
      if (this.nodes.all[key]) {
        redis = this.nodes.all[key];
        if (redis.options.readOnly !== readOnly) {
          redis.options.readOnly = readOnly;
          debug("Change role of %s to %s", key, readOnly ? "slave" : "master");
          redis[readOnly ? "readonly" : "readwrite"]().catch(utils_1.noop);
          if (readOnly) {
            delete this.nodes.master[key];
            this.nodes.slave[key] = redis;
          } else {
            delete this.nodes.slave[key];
            this.nodes.master[key] = redis;
          }
        }
      } else {
        debug("Connecting to %s as %s", key, readOnly ? "slave" : "master");
        redis = this.createRedisFromOptions(node, readOnly);
        this.nodes.all[key] = redis;
        this.nodes[readOnly ? "slave" : "master"][key] = redis;
        redis.once("end", () => {
          this.removeNode(key);
          this.emit("-node", redis, key);
          if (!Object.keys(this.nodes.all).length) {
            this.emit("drain");
          }
        });
        this.emit("+node", redis, key);
        redis.on("error", function(error) {
          this.emit("nodeError", error, key);
        });
      }
      return redis;
    }
    reset(nodes) {
      debug("Reset with %O", nodes);
      const newNodes = {};
      nodes.forEach((node) => {
        const key = (0, util_1.getNodeKey)(node);
        if (!(node.readOnly && newNodes[key])) {
          newNodes[key] = node;
        }
      });
      Object.keys(this.nodes.all).forEach((key) => {
        if (!newNodes[key]) {
          debug("Disconnect %s because the node does not hold any slot", key);
          this.nodes.all[key].disconnect();
          this.removeNode(key);
        }
      });
      Object.keys(newNodes).forEach((key) => {
        const node = newNodes[key];
        this.findOrCreate(node, node.readOnly);
      });
    }
    removeNode(key) {
      const { nodes } = this;
      if (nodes.all[key]) {
        debug("Remove %s from the pool", key);
        delete nodes.all[key];
      }
      delete nodes.master[key];
      delete nodes.slave[key];
    }
  }
  exports.default = ConnectionPool;
});

// ../../../node_modules/denque/index.js
var require_denque = __commonJS((exports, module) => {
  function Denque(array, options) {
    var options = options || {};
    this._capacity = options.capacity;
    this._head = 0;
    this._tail = 0;
    if (Array.isArray(array)) {
      this._fromArray(array);
    } else {
      this._capacityMask = 3;
      this._list = new Array(4);
    }
  }
  Denque.prototype.peekAt = function peekAt(index) {
    var i = index;
    if (i !== (i | 0)) {
      return;
    }
    var len = this.size();
    if (i >= len || i < -len)
      return;
    if (i < 0)
      i += len;
    i = this._head + i & this._capacityMask;
    return this._list[i];
  };
  Denque.prototype.get = function get(i) {
    return this.peekAt(i);
  };
  Denque.prototype.peek = function peek() {
    if (this._head === this._tail)
      return;
    return this._list[this._head];
  };
  Denque.prototype.peekFront = function peekFront() {
    return this.peek();
  };
  Denque.prototype.peekBack = function peekBack() {
    return this.peekAt(-1);
  };
  Object.defineProperty(Denque.prototype, "length", {
    get: function length() {
      return this.size();
    }
  });
  Denque.prototype.size = function size() {
    if (this._head === this._tail)
      return 0;
    if (this._head < this._tail)
      return this._tail - this._head;
    else
      return this._capacityMask + 1 - (this._head - this._tail);
  };
  Denque.prototype.unshift = function unshift(item) {
    if (arguments.length === 0)
      return this.size();
    var len = this._list.length;
    this._head = this._head - 1 + len & this._capacityMask;
    this._list[this._head] = item;
    if (this._tail === this._head)
      this._growArray();
    if (this._capacity && this.size() > this._capacity)
      this.pop();
    if (this._head < this._tail)
      return this._tail - this._head;
    else
      return this._capacityMask + 1 - (this._head - this._tail);
  };
  Denque.prototype.shift = function shift() {
    var head = this._head;
    if (head === this._tail)
      return;
    var item = this._list[head];
    this._list[head] = undefined;
    this._head = head + 1 & this._capacityMask;
    if (head < 2 && this._tail > 1e4 && this._tail <= this._list.length >>> 2)
      this._shrinkArray();
    return item;
  };
  Denque.prototype.push = function push(item) {
    if (arguments.length === 0)
      return this.size();
    var tail = this._tail;
    this._list[tail] = item;
    this._tail = tail + 1 & this._capacityMask;
    if (this._tail === this._head) {
      this._growArray();
    }
    if (this._capacity && this.size() > this._capacity) {
      this.shift();
    }
    if (this._head < this._tail)
      return this._tail - this._head;
    else
      return this._capacityMask + 1 - (this._head - this._tail);
  };
  Denque.prototype.pop = function pop() {
    var tail = this._tail;
    if (tail === this._head)
      return;
    var len = this._list.length;
    this._tail = tail - 1 + len & this._capacityMask;
    var item = this._list[this._tail];
    this._list[this._tail] = undefined;
    if (this._head < 2 && tail > 1e4 && tail <= len >>> 2)
      this._shrinkArray();
    return item;
  };
  Denque.prototype.removeOne = function removeOne(index) {
    var i = index;
    if (i !== (i | 0)) {
      return;
    }
    if (this._head === this._tail)
      return;
    var size2 = this.size();
    var len = this._list.length;
    if (i >= size2 || i < -size2)
      return;
    if (i < 0)
      i += size2;
    i = this._head + i & this._capacityMask;
    var item = this._list[i];
    var k;
    if (index < size2 / 2) {
      for (k = index;k > 0; k--) {
        this._list[i] = this._list[i = i - 1 + len & this._capacityMask];
      }
      this._list[i] = undefined;
      this._head = this._head + 1 + len & this._capacityMask;
    } else {
      for (k = size2 - 1 - index;k > 0; k--) {
        this._list[i] = this._list[i = i + 1 + len & this._capacityMask];
      }
      this._list[i] = undefined;
      this._tail = this._tail - 1 + len & this._capacityMask;
    }
    return item;
  };
  Denque.prototype.remove = function remove(index, count) {
    var i = index;
    var removed;
    var del_count = count;
    if (i !== (i | 0)) {
      return;
    }
    if (this._head === this._tail)
      return;
    var size2 = this.size();
    var len = this._list.length;
    if (i >= size2 || i < -size2 || count < 1)
      return;
    if (i < 0)
      i += size2;
    if (count === 1 || !count) {
      removed = new Array(1);
      removed[0] = this.removeOne(i);
      return removed;
    }
    if (i === 0 && i + count >= size2) {
      removed = this.toArray();
      this.clear();
      return removed;
    }
    if (i + count > size2)
      count = size2 - i;
    var k;
    removed = new Array(count);
    for (k = 0;k < count; k++) {
      removed[k] = this._list[this._head + i + k & this._capacityMask];
    }
    i = this._head + i & this._capacityMask;
    if (index + count === size2) {
      this._tail = this._tail - count + len & this._capacityMask;
      for (k = count;k > 0; k--) {
        this._list[i = i + 1 + len & this._capacityMask] = undefined;
      }
      return removed;
    }
    if (index === 0) {
      this._head = this._head + count + len & this._capacityMask;
      for (k = count - 1;k > 0; k--) {
        this._list[i = i + 1 + len & this._capacityMask] = undefined;
      }
      return removed;
    }
    if (i < size2 / 2) {
      this._head = this._head + index + count + len & this._capacityMask;
      for (k = index;k > 0; k--) {
        this.unshift(this._list[i = i - 1 + len & this._capacityMask]);
      }
      i = this._head - 1 + len & this._capacityMask;
      while (del_count > 0) {
        this._list[i = i - 1 + len & this._capacityMask] = undefined;
        del_count--;
      }
      if (index < 0)
        this._tail = i;
    } else {
      this._tail = i;
      i = i + count + len & this._capacityMask;
      for (k = size2 - (count + index);k > 0; k--) {
        this.push(this._list[i++]);
      }
      i = this._tail;
      while (del_count > 0) {
        this._list[i = i + 1 + len & this._capacityMask] = undefined;
        del_count--;
      }
    }
    if (this._head < 2 && this._tail > 1e4 && this._tail <= len >>> 2)
      this._shrinkArray();
    return removed;
  };
  Denque.prototype.splice = function splice(index, count) {
    var i = index;
    if (i !== (i | 0)) {
      return;
    }
    var size2 = this.size();
    if (i < 0)
      i += size2;
    if (i > size2)
      return;
    if (arguments.length > 2) {
      var k;
      var temp;
      var removed;
      var arg_len = arguments.length;
      var len = this._list.length;
      var arguments_index = 2;
      if (!size2 || i < size2 / 2) {
        temp = new Array(i);
        for (k = 0;k < i; k++) {
          temp[k] = this._list[this._head + k & this._capacityMask];
        }
        if (count === 0) {
          removed = [];
          if (i > 0) {
            this._head = this._head + i + len & this._capacityMask;
          }
        } else {
          removed = this.remove(i, count);
          this._head = this._head + i + len & this._capacityMask;
        }
        while (arg_len > arguments_index) {
          this.unshift(arguments[--arg_len]);
        }
        for (k = i;k > 0; k--) {
          this.unshift(temp[k - 1]);
        }
      } else {
        temp = new Array(size2 - (i + count));
        var leng = temp.length;
        for (k = 0;k < leng; k++) {
          temp[k] = this._list[this._head + i + count + k & this._capacityMask];
        }
        if (count === 0) {
          removed = [];
          if (i != size2) {
            this._tail = this._head + i + len & this._capacityMask;
          }
        } else {
          removed = this.remove(i, count);
          this._tail = this._tail - leng + len & this._capacityMask;
        }
        while (arguments_index < arg_len) {
          this.push(arguments[arguments_index++]);
        }
        for (k = 0;k < leng; k++) {
          this.push(temp[k]);
        }
      }
      return removed;
    } else {
      return this.remove(i, count);
    }
  };
  Denque.prototype.clear = function clear() {
    this._list = new Array(this._list.length);
    this._head = 0;
    this._tail = 0;
  };
  Denque.prototype.isEmpty = function isEmpty() {
    return this._head === this._tail;
  };
  Denque.prototype.toArray = function toArray() {
    return this._copyArray(false);
  };
  Denque.prototype._fromArray = function _fromArray(array) {
    var length = array.length;
    var capacity = this._nextPowerOf2(length);
    this._list = new Array(capacity);
    this._capacityMask = capacity - 1;
    this._tail = length;
    for (var i = 0;i < length; i++)
      this._list[i] = array[i];
  };
  Denque.prototype._copyArray = function _copyArray(fullCopy, size2) {
    var src = this._list;
    var capacity = src.length;
    var length = this.length;
    size2 = size2 | length;
    if (size2 == length && this._head < this._tail) {
      return this._list.slice(this._head, this._tail);
    }
    var dest = new Array(size2);
    var k = 0;
    var i;
    if (fullCopy || this._head > this._tail) {
      for (i = this._head;i < capacity; i++)
        dest[k++] = src[i];
      for (i = 0;i < this._tail; i++)
        dest[k++] = src[i];
    } else {
      for (i = this._head;i < this._tail; i++)
        dest[k++] = src[i];
    }
    return dest;
  };
  Denque.prototype._growArray = function _growArray() {
    if (this._head != 0) {
      var newList = this._copyArray(true, this._list.length << 1);
      this._tail = this._list.length;
      this._head = 0;
      this._list = newList;
    } else {
      this._tail = this._list.length;
      this._list.length <<= 1;
    }
    this._capacityMask = this._capacityMask << 1 | 1;
  };
  Denque.prototype._shrinkArray = function _shrinkArray() {
    this._list.length >>>= 1;
    this._capacityMask >>>= 1;
  };
  Denque.prototype._nextPowerOf2 = function _nextPowerOf2(num) {
    var log2 = Math.log(num) / Math.log(2);
    var nextPow2 = 1 << log2 + 1;
    return Math.max(nextPow2, 4);
  };
  module.exports = Denque;
});

// ../../../node_modules/ioredis/built/cluster/DelayQueue.js
var require_DelayQueue = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var utils_1 = require_utils2();
  var Deque = require_denque();
  var debug = (0, utils_1.Debug)("delayqueue");

  class DelayQueue {
    constructor() {
      this.queues = {};
      this.timeouts = {};
    }
    push(bucket, item, options) {
      const callback = options.callback || process.nextTick;
      if (!this.queues[bucket]) {
        this.queues[bucket] = new Deque;
      }
      const queue = this.queues[bucket];
      queue.push(item);
      if (!this.timeouts[bucket]) {
        this.timeouts[bucket] = setTimeout(() => {
          callback(() => {
            this.timeouts[bucket] = null;
            this.execute(bucket);
          });
        }, options.timeout);
      }
    }
    execute(bucket) {
      const queue = this.queues[bucket];
      if (!queue) {
        return;
      }
      const { length } = queue;
      if (!length) {
        return;
      }
      debug("send %d commands in %s queue", length, bucket);
      this.queues[bucket] = null;
      while (queue.length > 0) {
        queue.shift()();
      }
    }
  }
  exports.default = DelayQueue;
});

// ../../../node_modules/ioredis/built/cluster/ClusterSubscriberGroup.js
var require_ClusterSubscriberGroup = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var utils_1 = require_utils2();
  var ClusterSubscriber_1 = require_ClusterSubscriber();
  var ConnectionPool_1 = require_ConnectionPool();
  var util_1 = require_util();
  var calculateSlot = require_lib();
  var debug = (0, utils_1.Debug)("cluster:subscriberGroup");

  class ClusterSubscriberGroup {
    constructor(cluster, refreshSlotsCacheCallback) {
      this.cluster = cluster;
      this.shardedSubscribers = new Map;
      this.clusterSlots = [];
      this.subscriberToSlotsIndex = new Map;
      this.channels = new Map;
      cluster.on("+node", (redis) => {
        this._addSubscriber(redis);
      });
      cluster.on("-node", (redis) => {
        this._removeSubscriber(redis);
      });
      cluster.on("refresh", () => {
        this._refreshSlots(cluster);
      });
      cluster.on("forceRefresh", () => {
        refreshSlotsCacheCallback();
      });
    }
    getResponsibleSubscriber(slot) {
      const nodeKey = this.clusterSlots[slot][0];
      return this.shardedSubscribers.get(nodeKey);
    }
    addChannels(channels2) {
      const slot = calculateSlot(channels2[0]);
      channels2.forEach((c) => {
        if (calculateSlot(c) != slot)
          return -1;
      });
      const currChannels = this.channels.get(slot);
      if (!currChannels) {
        this.channels.set(slot, channels2);
      } else {
        this.channels.set(slot, currChannels.concat(channels2));
      }
      return [...this.channels.values()].flatMap((v) => v).length;
    }
    removeChannels(channels2) {
      const slot = calculateSlot(channels2[0]);
      channels2.forEach((c) => {
        if (calculateSlot(c) != slot)
          return -1;
      });
      const slotChannels = this.channels.get(slot);
      if (slotChannels) {
        const updatedChannels = slotChannels.filter((c) => !channels2.includes(c));
        this.channels.set(slot, updatedChannels);
      }
      return [...this.channels.values()].flatMap((v) => v).length;
    }
    stop() {
      for (const s of this.shardedSubscribers.values()) {
        s.stop();
      }
    }
    start() {
      for (const s of this.shardedSubscribers.values()) {
        if (!s.isStarted()) {
          s.start();
        }
      }
    }
    _addSubscriber(redis) {
      const pool = new ConnectionPool_1.default(redis.options);
      if (pool.addMasterNode(redis)) {
        const sub = new ClusterSubscriber_1.default(pool, this.cluster, true);
        const nodeKey = (0, util_1.getNodeKey)(redis.options);
        this.shardedSubscribers.set(nodeKey, sub);
        sub.start();
        this._resubscribe();
        this.cluster.emit("+subscriber");
        return sub;
      }
      return null;
    }
    _removeSubscriber(redis) {
      const nodeKey = (0, util_1.getNodeKey)(redis.options);
      const sub = this.shardedSubscribers.get(nodeKey);
      if (sub) {
        sub.stop();
        this.shardedSubscribers.delete(nodeKey);
        this._resubscribe();
        this.cluster.emit("-subscriber");
      }
      return this.shardedSubscribers;
    }
    _refreshSlots(cluster) {
      if (this._slotsAreEqual(cluster.slots)) {
        debug("Nothing to refresh because the new cluster map is equal to the previous one.");
      } else {
        debug("Refreshing the slots of the subscriber group.");
        this.subscriberToSlotsIndex = new Map;
        for (let slot = 0;slot < cluster.slots.length; slot++) {
          const node = cluster.slots[slot][0];
          if (!this.subscriberToSlotsIndex.has(node)) {
            this.subscriberToSlotsIndex.set(node, []);
          }
          this.subscriberToSlotsIndex.get(node).push(Number(slot));
        }
        this._resubscribe();
        this.clusterSlots = JSON.parse(JSON.stringify(cluster.slots));
        this.cluster.emit("subscribersReady");
        return true;
      }
      return false;
    }
    _resubscribe() {
      if (this.shardedSubscribers) {
        this.shardedSubscribers.forEach((s, nodeKey) => {
          const subscriberSlots = this.subscriberToSlotsIndex.get(nodeKey);
          if (subscriberSlots) {
            s.associateSlotRange(subscriberSlots);
            subscriberSlots.forEach((ss) => {
              const redis = s.getInstance();
              const channels2 = this.channels.get(ss);
              if (channels2 && channels2.length > 0) {
                if (redis) {
                  redis.ssubscribe(channels2);
                  redis.on("ready", () => {
                    redis.ssubscribe(channels2);
                  });
                }
              }
            });
          }
        });
      }
    }
    _slotsAreEqual(other) {
      if (this.clusterSlots === undefined)
        return false;
      else
        return JSON.stringify(this.clusterSlots) === JSON.stringify(other);
    }
  }
  exports.default = ClusterSubscriberGroup;
});

// ../../../node_modules/ioredis/built/cluster/index.js
var require_cluster = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var commands_1 = require_built();
  var events_1 = __require("events");
  var redis_errors_1 = require_redis_errors();
  var standard_as_callback_1 = require_built2();
  var Command_1 = require_Command();
  var ClusterAllFailedError_1 = require_ClusterAllFailedError();
  var Redis_1 = require_Redis();
  var ScanStream_1 = require_ScanStream();
  var transaction_1 = require_transaction();
  var utils_1 = require_utils2();
  var applyMixin_1 = require_applyMixin();
  var Commander_1 = require_Commander();
  var ClusterOptions_1 = require_ClusterOptions();
  var ClusterSubscriber_1 = require_ClusterSubscriber();
  var ConnectionPool_1 = require_ConnectionPool();
  var DelayQueue_1 = require_DelayQueue();
  var util_1 = require_util();
  var Deque = require_denque();
  var ClusterSubscriberGroup_1 = require_ClusterSubscriberGroup();
  var debug = (0, utils_1.Debug)("cluster");
  var REJECT_OVERWRITTEN_COMMANDS = new WeakSet;

  class Cluster extends Commander_1.default {
    constructor(startupNodes, options = {}) {
      super();
      this.slots = [];
      this._groupsIds = {};
      this._groupsBySlot = Array(16384);
      this.isCluster = true;
      this.retryAttempts = 0;
      this.delayQueue = new DelayQueue_1.default;
      this.offlineQueue = new Deque;
      this.isRefreshing = false;
      this._refreshSlotsCacheCallbacks = [];
      this._autoPipelines = new Map;
      this._runningAutoPipelines = new Set;
      this._readyDelayedCallbacks = [];
      this.connectionEpoch = 0;
      events_1.EventEmitter.call(this);
      this.startupNodes = startupNodes;
      this.options = (0, utils_1.defaults)({}, options, ClusterOptions_1.DEFAULT_CLUSTER_OPTIONS, this.options);
      if (this.options.shardedSubscribers == true)
        this.shardedSubscribers = new ClusterSubscriberGroup_1.default(this, this.refreshSlotsCache.bind(this));
      if (this.options.redisOptions && this.options.redisOptions.keyPrefix && !this.options.keyPrefix) {
        this.options.keyPrefix = this.options.redisOptions.keyPrefix;
      }
      if (typeof this.options.scaleReads !== "function" && ["all", "master", "slave"].indexOf(this.options.scaleReads) === -1) {
        throw new Error('Invalid option scaleReads "' + this.options.scaleReads + '". Expected "all", "master", "slave" or a custom function');
      }
      this.connectionPool = new ConnectionPool_1.default(this.options.redisOptions);
      this.connectionPool.on("-node", (redis, key) => {
        this.emit("-node", redis);
      });
      this.connectionPool.on("+node", (redis) => {
        this.emit("+node", redis);
      });
      this.connectionPool.on("drain", () => {
        this.setStatus("close");
      });
      this.connectionPool.on("nodeError", (error, key) => {
        this.emit("node error", error, key);
      });
      this.subscriber = new ClusterSubscriber_1.default(this.connectionPool, this);
      if (this.options.scripts) {
        Object.entries(this.options.scripts).forEach(([name, definition]) => {
          this.defineCommand(name, definition);
        });
      }
      if (this.options.lazyConnect) {
        this.setStatus("wait");
      } else {
        this.connect().catch((err2) => {
          debug("connecting failed: %s", err2);
        });
      }
    }
    connect() {
      return new Promise((resolve, reject) => {
        if (this.status === "connecting" || this.status === "connect" || this.status === "ready") {
          reject(new Error("Redis is already connecting/connected"));
          return;
        }
        const epoch = ++this.connectionEpoch;
        this.setStatus("connecting");
        this.resolveStartupNodeHostnames().then((nodes) => {
          if (this.connectionEpoch !== epoch) {
            debug("discard connecting after resolving startup nodes because epoch not match: %d != %d", epoch, this.connectionEpoch);
            reject(new redis_errors_1.RedisError("Connection is discarded because a new connection is made"));
            return;
          }
          if (this.status !== "connecting") {
            debug("discard connecting after resolving startup nodes because the status changed to %s", this.status);
            reject(new redis_errors_1.RedisError("Connection is aborted"));
            return;
          }
          this.connectionPool.reset(nodes);
          const readyHandler = () => {
            this.setStatus("ready");
            this.retryAttempts = 0;
            this.executeOfflineCommands();
            this.resetNodesRefreshInterval();
            resolve();
          };
          let closeListener = undefined;
          const refreshListener = () => {
            this.invokeReadyDelayedCallbacks(undefined);
            this.removeListener("close", closeListener);
            this.manuallyClosing = false;
            this.setStatus("connect");
            if (this.options.enableReadyCheck) {
              this.readyCheck((err2, fail) => {
                if (err2 || fail) {
                  debug("Ready check failed (%s). Reconnecting...", err2 || fail);
                  if (this.status === "connect") {
                    this.disconnect(true);
                  }
                } else {
                  readyHandler();
                }
              });
            } else {
              readyHandler();
            }
          };
          closeListener = () => {
            const error = new Error("None of startup nodes is available");
            this.removeListener("refresh", refreshListener);
            this.invokeReadyDelayedCallbacks(error);
            reject(error);
          };
          this.once("refresh", refreshListener);
          this.once("close", closeListener);
          this.once("close", this.handleCloseEvent.bind(this));
          this.refreshSlotsCache((err2) => {
            if (err2 && err2.message === ClusterAllFailedError_1.default.defaultMessage) {
              Redis_1.default.prototype.silentEmit.call(this, "error", err2);
              this.connectionPool.reset([]);
            }
          });
          this.subscriber.start();
          if (this.options.shardedSubscribers) {
            this.shardedSubscribers.start();
          }
        }).catch((err2) => {
          this.setStatus("close");
          this.handleCloseEvent(err2);
          this.invokeReadyDelayedCallbacks(err2);
          reject(err2);
        });
      });
    }
    disconnect(reconnect = false) {
      const status = this.status;
      this.setStatus("disconnecting");
      if (!reconnect) {
        this.manuallyClosing = true;
      }
      if (this.reconnectTimeout && !reconnect) {
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = null;
        debug("Canceled reconnecting attempts");
      }
      this.clearNodesRefreshInterval();
      this.subscriber.stop();
      if (this.options.shardedSubscribers) {
        this.shardedSubscribers.stop();
      }
      if (status === "wait") {
        this.setStatus("close");
        this.handleCloseEvent();
      } else {
        this.connectionPool.reset([]);
      }
    }
    quit(callback) {
      const status = this.status;
      this.setStatus("disconnecting");
      this.manuallyClosing = true;
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = null;
      }
      this.clearNodesRefreshInterval();
      this.subscriber.stop();
      if (this.options.shardedSubscribers) {
        this.shardedSubscribers.stop();
      }
      if (status === "wait") {
        const ret = (0, standard_as_callback_1.default)(Promise.resolve("OK"), callback);
        setImmediate(function() {
          this.setStatus("close");
          this.handleCloseEvent();
        }.bind(this));
        return ret;
      }
      return (0, standard_as_callback_1.default)(Promise.all(this.nodes().map((node) => node.quit().catch((err2) => {
        if (err2.message === utils_1.CONNECTION_CLOSED_ERROR_MSG) {
          return "OK";
        }
        throw err2;
      }))).then(() => "OK"), callback);
    }
    duplicate(overrideStartupNodes = [], overrideOptions = {}) {
      const startupNodes = overrideStartupNodes.length > 0 ? overrideStartupNodes : this.startupNodes.slice(0);
      const options = Object.assign({}, this.options, overrideOptions);
      return new Cluster(startupNodes, options);
    }
    nodes(role = "all") {
      if (role !== "all" && role !== "master" && role !== "slave") {
        throw new Error('Invalid role "' + role + '". Expected "all", "master" or "slave"');
      }
      return this.connectionPool.getNodes(role);
    }
    delayUntilReady(callback) {
      this._readyDelayedCallbacks.push(callback);
    }
    get autoPipelineQueueSize() {
      let queued = 0;
      for (const pipeline of this._autoPipelines.values()) {
        queued += pipeline.length;
      }
      return queued;
    }
    refreshSlotsCache(callback) {
      if (callback) {
        this._refreshSlotsCacheCallbacks.push(callback);
      }
      if (this.isRefreshing) {
        return;
      }
      this.isRefreshing = true;
      const _this = this;
      const wrapper = (error) => {
        this.isRefreshing = false;
        for (const callback2 of this._refreshSlotsCacheCallbacks) {
          callback2(error);
        }
        this._refreshSlotsCacheCallbacks = [];
      };
      const nodes = (0, utils_1.shuffle)(this.connectionPool.getNodes());
      let lastNodeError = null;
      function tryNode(index) {
        if (index === nodes.length) {
          const error = new ClusterAllFailedError_1.default(ClusterAllFailedError_1.default.defaultMessage, lastNodeError);
          return wrapper(error);
        }
        const node = nodes[index];
        const key = `${node.options.host}:${node.options.port}`;
        debug("getting slot cache from %s", key);
        _this.getInfoFromNode(node, function(err2) {
          switch (_this.status) {
            case "close":
            case "end":
              return wrapper(new Error("Cluster is disconnected."));
            case "disconnecting":
              return wrapper(new Error("Cluster is disconnecting."));
          }
          if (err2) {
            _this.emit("node error", err2, key);
            lastNodeError = err2;
            tryNode(index + 1);
          } else {
            _this.emit("refresh");
            wrapper();
          }
        });
      }
      tryNode(0);
    }
    sendCommand(command, stream, node) {
      if (this.status === "wait") {
        this.connect().catch(utils_1.noop);
      }
      if (this.status === "end") {
        command.reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
        return command.promise;
      }
      let to = this.options.scaleReads;
      if (to !== "master") {
        const isCommandReadOnly = command.isReadOnly || (0, commands_1.exists)(command.name) && (0, commands_1.hasFlag)(command.name, "readonly");
        if (!isCommandReadOnly) {
          to = "master";
        }
      }
      let targetSlot = node ? node.slot : command.getSlot();
      const ttl = {};
      const _this = this;
      if (!node && !REJECT_OVERWRITTEN_COMMANDS.has(command)) {
        REJECT_OVERWRITTEN_COMMANDS.add(command);
        const reject = command.reject;
        command.reject = function(err2) {
          const partialTry = tryConnection.bind(null, true);
          _this.handleError(err2, ttl, {
            moved: function(slot, key) {
              debug("command %s is moved to %s", command.name, key);
              targetSlot = Number(slot);
              if (_this.slots[slot]) {
                _this.slots[slot][0] = key;
              } else {
                _this.slots[slot] = [key];
              }
              _this._groupsBySlot[slot] = _this._groupsIds[_this.slots[slot].join(";")];
              _this.connectionPool.findOrCreate(_this.natMapper(key));
              tryConnection();
              debug("refreshing slot caches... (triggered by MOVED error)");
              _this.refreshSlotsCache();
            },
            ask: function(slot, key) {
              debug("command %s is required to ask %s:%s", command.name, key);
              const mapped = _this.natMapper(key);
              _this.connectionPool.findOrCreate(mapped);
              tryConnection(false, `${mapped.host}:${mapped.port}`);
            },
            tryagain: partialTry,
            clusterDown: partialTry,
            connectionClosed: partialTry,
            maxRedirections: function(redirectionError) {
              reject.call(command, redirectionError);
            },
            defaults: function() {
              reject.call(command, err2);
            }
          });
        };
      }
      tryConnection();
      function tryConnection(random, asking) {
        if (_this.status === "end") {
          command.reject(new redis_errors_1.AbortError("Cluster is ended."));
          return;
        }
        let redis;
        if (_this.status === "ready" || command.name === "cluster") {
          if (node && node.redis) {
            redis = node.redis;
          } else if (Command_1.default.checkFlag("ENTER_SUBSCRIBER_MODE", command.name) || Command_1.default.checkFlag("EXIT_SUBSCRIBER_MODE", command.name)) {
            if (_this.options.shardedSubscribers == true && (command.name == "ssubscribe" || command.name == "sunsubscribe")) {
              const sub = _this.shardedSubscribers.getResponsibleSubscriber(targetSlot);
              let status = -1;
              if (command.name == "ssubscribe")
                status = _this.shardedSubscribers.addChannels(command.getKeys());
              if (command.name == "sunsubscribe")
                status = _this.shardedSubscribers.removeChannels(command.getKeys());
              if (status !== -1) {
                redis = sub.getInstance();
              } else {
                command.reject(new redis_errors_1.AbortError("Can't add or remove the given channels. Are they in the same slot?"));
              }
            } else {
              redis = _this.subscriber.getInstance();
            }
            if (!redis) {
              command.reject(new redis_errors_1.AbortError("No subscriber for the cluster"));
              return;
            }
          } else {
            if (!random) {
              if (typeof targetSlot === "number" && _this.slots[targetSlot]) {
                const nodeKeys = _this.slots[targetSlot];
                if (typeof to === "function") {
                  const nodes = nodeKeys.map(function(key) {
                    return _this.connectionPool.getInstanceByKey(key);
                  });
                  redis = to(nodes, command);
                  if (Array.isArray(redis)) {
                    redis = (0, utils_1.sample)(redis);
                  }
                  if (!redis) {
                    redis = nodes[0];
                  }
                } else {
                  let key;
                  if (to === "all") {
                    key = (0, utils_1.sample)(nodeKeys);
                  } else if (to === "slave" && nodeKeys.length > 1) {
                    key = (0, utils_1.sample)(nodeKeys, 1);
                  } else {
                    key = nodeKeys[0];
                  }
                  redis = _this.connectionPool.getInstanceByKey(key);
                }
              }
              if (asking) {
                redis = _this.connectionPool.getInstanceByKey(asking);
                redis.asking();
              }
            }
            if (!redis) {
              redis = (typeof to === "function" ? null : _this.connectionPool.getSampleInstance(to)) || _this.connectionPool.getSampleInstance("all");
            }
          }
          if (node && !node.redis) {
            node.redis = redis;
          }
        }
        if (redis) {
          redis.sendCommand(command, stream);
        } else if (_this.options.enableOfflineQueue) {
          _this.offlineQueue.push({
            command,
            stream,
            node
          });
        } else {
          command.reject(new Error("Cluster isn't ready and enableOfflineQueue options is false"));
        }
      }
      return command.promise;
    }
    sscanStream(key, options) {
      return this.createScanStream("sscan", { key, options });
    }
    sscanBufferStream(key, options) {
      return this.createScanStream("sscanBuffer", { key, options });
    }
    hscanStream(key, options) {
      return this.createScanStream("hscan", { key, options });
    }
    hscanBufferStream(key, options) {
      return this.createScanStream("hscanBuffer", { key, options });
    }
    zscanStream(key, options) {
      return this.createScanStream("zscan", { key, options });
    }
    zscanBufferStream(key, options) {
      return this.createScanStream("zscanBuffer", { key, options });
    }
    handleError(error, ttl, handlers) {
      if (typeof ttl.value === "undefined") {
        ttl.value = this.options.maxRedirections;
      } else {
        ttl.value -= 1;
      }
      if (ttl.value <= 0) {
        handlers.maxRedirections(new Error("Too many Cluster redirections. Last error: " + error));
        return;
      }
      const errv = error.message.split(" ");
      if (errv[0] === "MOVED") {
        const timeout = this.options.retryDelayOnMoved;
        if (timeout && typeof timeout === "number") {
          this.delayQueue.push("moved", handlers.moved.bind(null, errv[1], errv[2]), { timeout });
        } else {
          handlers.moved(errv[1], errv[2]);
        }
      } else if (errv[0] === "ASK") {
        handlers.ask(errv[1], errv[2]);
      } else if (errv[0] === "TRYAGAIN") {
        this.delayQueue.push("tryagain", handlers.tryagain, {
          timeout: this.options.retryDelayOnTryAgain
        });
      } else if (errv[0] === "CLUSTERDOWN" && this.options.retryDelayOnClusterDown > 0) {
        this.delayQueue.push("clusterdown", handlers.connectionClosed, {
          timeout: this.options.retryDelayOnClusterDown,
          callback: this.refreshSlotsCache.bind(this)
        });
      } else if (error.message === utils_1.CONNECTION_CLOSED_ERROR_MSG && this.options.retryDelayOnFailover > 0 && this.status === "ready") {
        this.delayQueue.push("failover", handlers.connectionClosed, {
          timeout: this.options.retryDelayOnFailover,
          callback: this.refreshSlotsCache.bind(this)
        });
      } else {
        handlers.defaults();
      }
    }
    resetOfflineQueue() {
      this.offlineQueue = new Deque;
    }
    clearNodesRefreshInterval() {
      if (this.slotsTimer) {
        clearTimeout(this.slotsTimer);
        this.slotsTimer = null;
      }
    }
    resetNodesRefreshInterval() {
      if (this.slotsTimer || !this.options.slotsRefreshInterval) {
        return;
      }
      const nextRound = () => {
        this.slotsTimer = setTimeout(() => {
          debug('refreshing slot caches... (triggered by "slotsRefreshInterval" option)');
          this.refreshSlotsCache(() => {
            nextRound();
          });
        }, this.options.slotsRefreshInterval);
      };
      nextRound();
    }
    setStatus(status) {
      debug("status: %s -> %s", this.status || "[empty]", status);
      this.status = status;
      process.nextTick(() => {
        this.emit(status);
      });
    }
    handleCloseEvent(reason) {
      if (reason) {
        debug("closed because %s", reason);
      }
      let retryDelay;
      if (!this.manuallyClosing && typeof this.options.clusterRetryStrategy === "function") {
        retryDelay = this.options.clusterRetryStrategy.call(this, ++this.retryAttempts, reason);
      }
      if (typeof retryDelay === "number") {
        this.setStatus("reconnecting");
        this.reconnectTimeout = setTimeout(() => {
          this.reconnectTimeout = null;
          debug("Cluster is disconnected. Retrying after %dms", retryDelay);
          this.connect().catch(function(err2) {
            debug("Got error %s when reconnecting. Ignoring...", err2);
          });
        }, retryDelay);
      } else {
        this.setStatus("end");
        this.flushQueue(new Error("None of startup nodes is available"));
      }
    }
    flushQueue(error) {
      let item;
      while (item = this.offlineQueue.shift()) {
        item.command.reject(error);
      }
    }
    executeOfflineCommands() {
      if (this.offlineQueue.length) {
        debug("send %d commands in offline queue", this.offlineQueue.length);
        const offlineQueue = this.offlineQueue;
        this.resetOfflineQueue();
        let item;
        while (item = offlineQueue.shift()) {
          this.sendCommand(item.command, item.stream, item.node);
        }
      }
    }
    natMapper(nodeKey) {
      const key = typeof nodeKey === "string" ? nodeKey : `${nodeKey.host}:${nodeKey.port}`;
      let mapped = null;
      if (this.options.natMap && typeof this.options.natMap === "function") {
        mapped = this.options.natMap(key);
      } else if (this.options.natMap && typeof this.options.natMap === "object") {
        mapped = this.options.natMap[key];
      }
      if (mapped) {
        debug("NAT mapping %s -> %O", key, mapped);
        return Object.assign({}, mapped);
      }
      return typeof nodeKey === "string" ? (0, util_1.nodeKeyToRedisOptions)(nodeKey) : nodeKey;
    }
    getInfoFromNode(redis, callback) {
      if (!redis) {
        return callback(new Error("Node is disconnected"));
      }
      const duplicatedConnection = redis.duplicate({
        enableOfflineQueue: true,
        enableReadyCheck: false,
        retryStrategy: null,
        connectionName: (0, util_1.getConnectionName)("refresher", this.options.redisOptions && this.options.redisOptions.connectionName)
      });
      duplicatedConnection.on("error", utils_1.noop);
      duplicatedConnection.cluster("SLOTS", (0, utils_1.timeout)((err2, result) => {
        duplicatedConnection.disconnect();
        if (err2) {
          debug("error encountered running CLUSTER.SLOTS: %s", err2);
          return callback(err2);
        }
        if (this.status === "disconnecting" || this.status === "close" || this.status === "end") {
          debug("ignore CLUSTER.SLOTS results (count: %d) since cluster status is %s", result.length, this.status);
          callback();
          return;
        }
        const nodes = [];
        debug("cluster slots result count: %d", result.length);
        for (let i = 0;i < result.length; ++i) {
          const items = result[i];
          const slotRangeStart = items[0];
          const slotRangeEnd = items[1];
          const keys = [];
          for (let j2 = 2;j2 < items.length; j2++) {
            if (!items[j2][0]) {
              continue;
            }
            const node = this.natMapper({
              host: items[j2][0],
              port: items[j2][1]
            });
            node.readOnly = j2 !== 2;
            nodes.push(node);
            keys.push(node.host + ":" + node.port);
          }
          debug("cluster slots result [%d]: slots %d~%d served by %s", i, slotRangeStart, slotRangeEnd, keys);
          for (let slot = slotRangeStart;slot <= slotRangeEnd; slot++) {
            this.slots[slot] = keys;
          }
        }
        this._groupsIds = Object.create(null);
        let j = 0;
        for (let i = 0;i < 16384; i++) {
          const target = (this.slots[i] || []).join(";");
          if (!target.length) {
            this._groupsBySlot[i] = undefined;
            continue;
          }
          if (!this._groupsIds[target]) {
            this._groupsIds[target] = ++j;
          }
          this._groupsBySlot[i] = this._groupsIds[target];
        }
        this.connectionPool.reset(nodes);
        callback();
      }, this.options.slotsRefreshTimeout));
    }
    invokeReadyDelayedCallbacks(err2) {
      for (const c of this._readyDelayedCallbacks) {
        process.nextTick(c, err2);
      }
      this._readyDelayedCallbacks = [];
    }
    readyCheck(callback) {
      this.cluster("INFO", (err2, res) => {
        if (err2) {
          return callback(err2);
        }
        if (typeof res !== "string") {
          return callback();
        }
        let state;
        const lines = res.split(`\r
`);
        for (let i = 0;i < lines.length; ++i) {
          const parts = lines[i].split(":");
          if (parts[0] === "cluster_state") {
            state = parts[1];
            break;
          }
        }
        if (state === "fail") {
          debug("cluster state not ok (%s)", state);
          callback(null, state);
        } else {
          callback();
        }
      });
    }
    resolveSrv(hostname) {
      return new Promise((resolve, reject) => {
        this.options.resolveSrv(hostname, (err2, records) => {
          if (err2) {
            return reject(err2);
          }
          const self = this, groupedRecords = (0, util_1.groupSrvRecords)(records), sortedKeys = Object.keys(groupedRecords).sort((a, b2) => parseInt(a) - parseInt(b2));
          function tryFirstOne(err3) {
            if (!sortedKeys.length) {
              return reject(err3);
            }
            const key = sortedKeys[0], group = groupedRecords[key], record = (0, util_1.weightSrvRecords)(group);
            if (!group.records.length) {
              sortedKeys.shift();
            }
            self.dnsLookup(record.name).then((host) => resolve({
              host,
              port: record.port
            }), tryFirstOne);
          }
          tryFirstOne();
        });
      });
    }
    dnsLookup(hostname) {
      return new Promise((resolve, reject) => {
        this.options.dnsLookup(hostname, (err2, address) => {
          if (err2) {
            debug("failed to resolve hostname %s to IP: %s", hostname, err2.message);
            reject(err2);
          } else {
            debug("resolved hostname %s to IP %s", hostname, address);
            resolve(address);
          }
        });
      });
    }
    async resolveStartupNodeHostnames() {
      if (!Array.isArray(this.startupNodes) || this.startupNodes.length === 0) {
        throw new Error("`startupNodes` should contain at least one node.");
      }
      const startupNodes = (0, util_1.normalizeNodeOptions)(this.startupNodes);
      const hostnames = (0, util_1.getUniqueHostnamesFromOptions)(startupNodes);
      if (hostnames.length === 0) {
        return startupNodes;
      }
      const configs = await Promise.all(hostnames.map((this.options.useSRVRecords ? this.resolveSrv : this.dnsLookup).bind(this)));
      const hostnameToConfig = (0, utils_1.zipMap)(hostnames, configs);
      return startupNodes.map((node) => {
        const config = hostnameToConfig.get(node.host);
        if (!config) {
          return node;
        }
        if (this.options.useSRVRecords) {
          return Object.assign({}, node, config);
        }
        return Object.assign({}, node, { host: config });
      });
    }
    createScanStream(command, { key, options = {} }) {
      return new ScanStream_1.default({
        objectMode: true,
        key,
        redis: this,
        command,
        ...options
      });
    }
  }
  (0, applyMixin_1.default)(Cluster, events_1.EventEmitter);
  (0, transaction_1.addTransactionSupport)(Cluster.prototype);
  exports.default = Cluster;
});

// ../../../node_modules/ioredis/built/connectors/AbstractConnector.js
var require_AbstractConnector = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var utils_1 = require_utils2();
  var debug = (0, utils_1.Debug)("AbstractConnector");

  class AbstractConnector {
    constructor(disconnectTimeout) {
      this.connecting = false;
      this.disconnectTimeout = disconnectTimeout;
    }
    check(info) {
      return true;
    }
    disconnect() {
      this.connecting = false;
      if (this.stream) {
        const stream = this.stream;
        const timeout = setTimeout(() => {
          debug("stream %s:%s still open, destroying it", stream.remoteAddress, stream.remotePort);
          stream.destroy();
        }, this.disconnectTimeout);
        stream.on("close", () => clearTimeout(timeout));
        stream.end();
      }
    }
  }
  exports.default = AbstractConnector;
});

// ../../../node_modules/ioredis/built/connectors/StandaloneConnector.js
var require_StandaloneConnector = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var net_1 = __require("net");
  var tls_1 = __require("tls");
  var utils_1 = require_utils2();
  var AbstractConnector_1 = require_AbstractConnector();

  class StandaloneConnector extends AbstractConnector_1.default {
    constructor(options) {
      super(options.disconnectTimeout);
      this.options = options;
    }
    connect(_) {
      const { options } = this;
      this.connecting = true;
      let connectionOptions;
      if ("path" in options && options.path) {
        connectionOptions = {
          path: options.path
        };
      } else {
        connectionOptions = {};
        if ("port" in options && options.port != null) {
          connectionOptions.port = options.port;
        }
        if ("host" in options && options.host != null) {
          connectionOptions.host = options.host;
        }
        if ("family" in options && options.family != null) {
          connectionOptions.family = options.family;
        }
      }
      if (options.tls) {
        Object.assign(connectionOptions, options.tls);
      }
      return new Promise((resolve, reject) => {
        process.nextTick(() => {
          if (!this.connecting) {
            reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
            return;
          }
          try {
            if (options.tls) {
              this.stream = (0, tls_1.connect)(connectionOptions);
            } else {
              this.stream = (0, net_1.createConnection)(connectionOptions);
            }
          } catch (err2) {
            reject(err2);
            return;
          }
          this.stream.once("error", (err2) => {
            this.firstError = err2;
          });
          resolve(this.stream);
        });
      });
    }
  }
  exports.default = StandaloneConnector;
});

// ../../../node_modules/ioredis/built/connectors/SentinelConnector/SentinelIterator.js
var require_SentinelIterator = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  function isSentinelEql(a, b2) {
    return (a.host || "127.0.0.1") === (b2.host || "127.0.0.1") && (a.port || 26379) === (b2.port || 26379);
  }

  class SentinelIterator {
    constructor(sentinels) {
      this.cursor = 0;
      this.sentinels = sentinels.slice(0);
    }
    next() {
      const done = this.cursor >= this.sentinels.length;
      return { done, value: done ? undefined : this.sentinels[this.cursor++] };
    }
    reset(moveCurrentEndpointToFirst) {
      if (moveCurrentEndpointToFirst && this.sentinels.length > 1 && this.cursor !== 1) {
        this.sentinels.unshift(...this.sentinels.splice(this.cursor - 1));
      }
      this.cursor = 0;
    }
    add(sentinel) {
      for (let i = 0;i < this.sentinels.length; i++) {
        if (isSentinelEql(sentinel, this.sentinels[i])) {
          return false;
        }
      }
      this.sentinels.push(sentinel);
      return true;
    }
    toString() {
      return `${JSON.stringify(this.sentinels)} @${this.cursor}`;
    }
  }
  exports.default = SentinelIterator;
});

// ../../../node_modules/ioredis/built/connectors/SentinelConnector/FailoverDetector.js
var require_FailoverDetector = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.FailoverDetector = undefined;
  var utils_1 = require_utils2();
  var debug = (0, utils_1.Debug)("FailoverDetector");
  var CHANNEL_NAME = "+switch-master";

  class FailoverDetector {
    constructor(connector, sentinels) {
      this.isDisconnected = false;
      this.connector = connector;
      this.sentinels = sentinels;
    }
    cleanup() {
      this.isDisconnected = true;
      for (const sentinel of this.sentinels) {
        sentinel.client.disconnect();
      }
    }
    async subscribe() {
      debug("Starting FailoverDetector");
      const promises = [];
      for (const sentinel of this.sentinels) {
        const promise = sentinel.client.subscribe(CHANNEL_NAME).catch((err2) => {
          debug("Failed to subscribe to failover messages on sentinel %s:%s (%s)", sentinel.address.host || "127.0.0.1", sentinel.address.port || 26739, err2.message);
        });
        promises.push(promise);
        sentinel.client.on("message", (channel) => {
          if (!this.isDisconnected && channel === CHANNEL_NAME) {
            this.disconnect();
          }
        });
      }
      await Promise.all(promises);
    }
    disconnect() {
      this.isDisconnected = true;
      debug("Failover detected, disconnecting");
      this.connector.disconnect();
    }
  }
  exports.FailoverDetector = FailoverDetector;
});

// ../../../node_modules/ioredis/built/connectors/SentinelConnector/index.js
var require_SentinelConnector = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SentinelIterator = undefined;
  var net_1 = __require("net");
  var utils_1 = require_utils2();
  var tls_1 = __require("tls");
  var SentinelIterator_1 = require_SentinelIterator();
  exports.SentinelIterator = SentinelIterator_1.default;
  var AbstractConnector_1 = require_AbstractConnector();
  var Redis_1 = require_Redis();
  var FailoverDetector_1 = require_FailoverDetector();
  var debug = (0, utils_1.Debug)("SentinelConnector");

  class SentinelConnector extends AbstractConnector_1.default {
    constructor(options) {
      super(options.disconnectTimeout);
      this.options = options;
      this.emitter = null;
      this.failoverDetector = null;
      if (!this.options.sentinels.length) {
        throw new Error("Requires at least one sentinel to connect to.");
      }
      if (!this.options.name) {
        throw new Error("Requires the name of master.");
      }
      this.sentinelIterator = new SentinelIterator_1.default(this.options.sentinels);
    }
    check(info) {
      const roleMatches = !info.role || this.options.role === info.role;
      if (!roleMatches) {
        debug("role invalid, expected %s, but got %s", this.options.role, info.role);
        this.sentinelIterator.next();
        this.sentinelIterator.next();
        this.sentinelIterator.reset(true);
      }
      return roleMatches;
    }
    disconnect() {
      super.disconnect();
      if (this.failoverDetector) {
        this.failoverDetector.cleanup();
      }
    }
    connect(eventEmitter) {
      this.connecting = true;
      this.retryAttempts = 0;
      let lastError;
      const connectToNext = async () => {
        const endpoint = this.sentinelIterator.next();
        if (endpoint.done) {
          this.sentinelIterator.reset(false);
          const retryDelay = typeof this.options.sentinelRetryStrategy === "function" ? this.options.sentinelRetryStrategy(++this.retryAttempts) : null;
          let errorMsg = typeof retryDelay !== "number" ? "All sentinels are unreachable and retry is disabled." : `All sentinels are unreachable. Retrying from scratch after ${retryDelay}ms.`;
          if (lastError) {
            errorMsg += ` Last error: ${lastError.message}`;
          }
          debug(errorMsg);
          const error = new Error(errorMsg);
          if (typeof retryDelay === "number") {
            eventEmitter("error", error);
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
            return connectToNext();
          } else {
            throw error;
          }
        }
        let resolved = null;
        let err2 = null;
        try {
          resolved = await this.resolve(endpoint.value);
        } catch (error) {
          err2 = error;
        }
        if (!this.connecting) {
          throw new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG);
        }
        const endpointAddress = endpoint.value.host + ":" + endpoint.value.port;
        if (resolved) {
          debug("resolved: %s:%s from sentinel %s", resolved.host, resolved.port, endpointAddress);
          if (this.options.enableTLSForSentinelMode && this.options.tls) {
            Object.assign(resolved, this.options.tls);
            this.stream = (0, tls_1.connect)(resolved);
            this.stream.once("secureConnect", this.initFailoverDetector.bind(this));
          } else {
            this.stream = (0, net_1.createConnection)(resolved);
            this.stream.once("connect", this.initFailoverDetector.bind(this));
          }
          this.stream.once("error", (err3) => {
            this.firstError = err3;
          });
          return this.stream;
        } else {
          const errorMsg = err2 ? "failed to connect to sentinel " + endpointAddress + " because " + err2.message : "connected to sentinel " + endpointAddress + " successfully, but got an invalid reply: " + resolved;
          debug(errorMsg);
          eventEmitter("sentinelError", new Error(errorMsg));
          if (err2) {
            lastError = err2;
          }
          return connectToNext();
        }
      };
      return connectToNext();
    }
    async updateSentinels(client2) {
      if (!this.options.updateSentinels) {
        return;
      }
      const result = await client2.sentinel("sentinels", this.options.name);
      if (!Array.isArray(result)) {
        return;
      }
      result.map(utils_1.packObject).forEach((sentinel) => {
        const flags = sentinel.flags ? sentinel.flags.split(",") : [];
        if (flags.indexOf("disconnected") === -1 && sentinel.ip && sentinel.port) {
          const endpoint = this.sentinelNatResolve(addressResponseToAddress(sentinel));
          if (this.sentinelIterator.add(endpoint)) {
            debug("adding sentinel %s:%s", endpoint.host, endpoint.port);
          }
        }
      });
      debug("Updated internal sentinels: %s", this.sentinelIterator);
    }
    async resolveMaster(client2) {
      const result = await client2.sentinel("get-master-addr-by-name", this.options.name);
      await this.updateSentinels(client2);
      return this.sentinelNatResolve(Array.isArray(result) ? { host: result[0], port: Number(result[1]) } : null);
    }
    async resolveSlave(client2) {
      const result = await client2.sentinel("slaves", this.options.name);
      if (!Array.isArray(result)) {
        return null;
      }
      const availableSlaves = result.map(utils_1.packObject).filter((slave) => slave.flags && !slave.flags.match(/(disconnected|s_down|o_down)/));
      return this.sentinelNatResolve(selectPreferredSentinel(availableSlaves, this.options.preferredSlaves));
    }
    sentinelNatResolve(item) {
      if (!item || !this.options.natMap)
        return item;
      const key = `${item.host}:${item.port}`;
      let result = item;
      if (typeof this.options.natMap === "function") {
        result = this.options.natMap(key) || item;
      } else if (typeof this.options.natMap === "object") {
        result = this.options.natMap[key] || item;
      }
      return result;
    }
    connectToSentinel(endpoint, options) {
      const redis = new Redis_1.default({
        port: endpoint.port || 26379,
        host: endpoint.host,
        username: this.options.sentinelUsername || null,
        password: this.options.sentinelPassword || null,
        family: endpoint.family || ("path" in this.options && this.options.path ? undefined : this.options.family),
        tls: this.options.sentinelTLS,
        retryStrategy: null,
        enableReadyCheck: false,
        connectTimeout: this.options.connectTimeout,
        commandTimeout: this.options.sentinelCommandTimeout,
        ...options
      });
      return redis;
    }
    async resolve(endpoint) {
      const client2 = this.connectToSentinel(endpoint);
      client2.on("error", noop3);
      try {
        if (this.options.role === "slave") {
          return await this.resolveSlave(client2);
        } else {
          return await this.resolveMaster(client2);
        }
      } finally {
        client2.disconnect();
      }
    }
    async initFailoverDetector() {
      var _a2;
      if (!this.options.failoverDetector) {
        return;
      }
      this.sentinelIterator.reset(true);
      const sentinels = [];
      while (sentinels.length < this.options.sentinelMaxConnections) {
        const { done, value } = this.sentinelIterator.next();
        if (done) {
          break;
        }
        const client2 = this.connectToSentinel(value, {
          lazyConnect: true,
          retryStrategy: this.options.sentinelReconnectStrategy
        });
        client2.on("reconnecting", () => {
          var _a3;
          (_a3 = this.emitter) === null || _a3 === undefined || _a3.emit("sentinelReconnecting");
        });
        sentinels.push({ address: value, client: client2 });
      }
      this.sentinelIterator.reset(false);
      if (this.failoverDetector) {
        this.failoverDetector.cleanup();
      }
      this.failoverDetector = new FailoverDetector_1.FailoverDetector(this, sentinels);
      await this.failoverDetector.subscribe();
      (_a2 = this.emitter) === null || _a2 === undefined || _a2.emit("failoverSubscribed");
    }
  }
  exports.default = SentinelConnector;
  function selectPreferredSentinel(availableSlaves, preferredSlaves) {
    if (availableSlaves.length === 0) {
      return null;
    }
    let selectedSlave;
    if (typeof preferredSlaves === "function") {
      selectedSlave = preferredSlaves(availableSlaves);
    } else if (preferredSlaves !== null && typeof preferredSlaves === "object") {
      const preferredSlavesArray = Array.isArray(preferredSlaves) ? preferredSlaves : [preferredSlaves];
      preferredSlavesArray.sort((a, b2) => {
        if (!a.prio) {
          a.prio = 1;
        }
        if (!b2.prio) {
          b2.prio = 1;
        }
        if (a.prio < b2.prio) {
          return -1;
        }
        if (a.prio > b2.prio) {
          return 1;
        }
        return 0;
      });
      for (let p = 0;p < preferredSlavesArray.length; p++) {
        for (let a = 0;a < availableSlaves.length; a++) {
          const slave = availableSlaves[a];
          if (slave.ip === preferredSlavesArray[p].ip) {
            if (slave.port === preferredSlavesArray[p].port) {
              selectedSlave = slave;
              break;
            }
          }
        }
        if (selectedSlave) {
          break;
        }
      }
    }
    if (!selectedSlave) {
      selectedSlave = (0, utils_1.sample)(availableSlaves);
    }
    return addressResponseToAddress(selectedSlave);
  }
  function addressResponseToAddress(input) {
    return { host: input.ip, port: Number(input.port) };
  }
  function noop3() {}
});

// ../../../node_modules/ioredis/built/connectors/index.js
var require_connectors = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SentinelConnector = exports.StandaloneConnector = undefined;
  var StandaloneConnector_1 = require_StandaloneConnector();
  exports.StandaloneConnector = StandaloneConnector_1.default;
  var SentinelConnector_1 = require_SentinelConnector();
  exports.SentinelConnector = SentinelConnector_1.default;
});

// ../../../node_modules/ioredis/built/errors/MaxRetriesPerRequestError.js
var require_MaxRetriesPerRequestError = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var redis_errors_1 = require_redis_errors();

  class MaxRetriesPerRequestError extends redis_errors_1.AbortError {
    constructor(maxRetriesPerRequest) {
      const message = `Reached the max retries per request limit (which is ${maxRetriesPerRequest}). Refer to "maxRetriesPerRequest" option for details.`;
      super(message);
      Error.captureStackTrace(this, this.constructor);
    }
    get name() {
      return this.constructor.name;
    }
  }
  exports.default = MaxRetriesPerRequestError;
});

// ../../../node_modules/ioredis/built/errors/index.js
var require_errors = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.MaxRetriesPerRequestError = undefined;
  var MaxRetriesPerRequestError_1 = require_MaxRetriesPerRequestError();
  exports.MaxRetriesPerRequestError = MaxRetriesPerRequestError_1.default;
});

// ../../../node_modules/redis-parser/lib/parser.js
var require_parser = __commonJS((exports, module) => {
  var Buffer2 = __require("buffer").Buffer;
  var StringDecoder = __require("string_decoder").StringDecoder;
  var decoder = new StringDecoder;
  var errors2 = require_redis_errors();
  var ReplyError = errors2.ReplyError;
  var ParserError = errors2.ParserError;
  var bufferPool = Buffer2.allocUnsafe(32 * 1024);
  var bufferOffset = 0;
  var interval = null;
  var counter = 0;
  var notDecreased = 0;
  function parseSimpleNumbers(parser) {
    const length = parser.buffer.length - 1;
    var offset = parser.offset;
    var number = 0;
    var sign = 1;
    if (parser.buffer[offset] === 45) {
      sign = -1;
      offset++;
    }
    while (offset < length) {
      const c1 = parser.buffer[offset++];
      if (c1 === 13) {
        parser.offset = offset + 1;
        return sign * number;
      }
      number = number * 10 + (c1 - 48);
    }
  }
  function parseStringNumbers(parser) {
    const length = parser.buffer.length - 1;
    var offset = parser.offset;
    var number = 0;
    var res = "";
    if (parser.buffer[offset] === 45) {
      res += "-";
      offset++;
    }
    while (offset < length) {
      var c1 = parser.buffer[offset++];
      if (c1 === 13) {
        parser.offset = offset + 1;
        if (number !== 0) {
          res += number;
        }
        return res;
      } else if (number > 429496728) {
        res += number * 10 + (c1 - 48);
        number = 0;
      } else if (c1 === 48 && number === 0) {
        res += 0;
      } else {
        number = number * 10 + (c1 - 48);
      }
    }
  }
  function parseSimpleString(parser) {
    const start = parser.offset;
    const buffer2 = parser.buffer;
    const length = buffer2.length - 1;
    var offset = start;
    while (offset < length) {
      if (buffer2[offset++] === 13) {
        parser.offset = offset + 1;
        if (parser.optionReturnBuffers === true) {
          return parser.buffer.slice(start, offset - 1);
        }
        return parser.buffer.toString("utf8", start, offset - 1);
      }
    }
  }
  function parseLength(parser) {
    const length = parser.buffer.length - 1;
    var offset = parser.offset;
    var number = 0;
    while (offset < length) {
      const c1 = parser.buffer[offset++];
      if (c1 === 13) {
        parser.offset = offset + 1;
        return number;
      }
      number = number * 10 + (c1 - 48);
    }
  }
  function parseInteger(parser) {
    if (parser.optionStringNumbers === true) {
      return parseStringNumbers(parser);
    }
    return parseSimpleNumbers(parser);
  }
  function parseBulkString(parser) {
    const length = parseLength(parser);
    if (length === undefined) {
      return;
    }
    if (length < 0) {
      return null;
    }
    const offset = parser.offset + length;
    if (offset + 2 > parser.buffer.length) {
      parser.bigStrSize = offset + 2;
      parser.totalChunkSize = parser.buffer.length;
      parser.bufferCache.push(parser.buffer);
      return;
    }
    const start = parser.offset;
    parser.offset = offset + 2;
    if (parser.optionReturnBuffers === true) {
      return parser.buffer.slice(start, offset);
    }
    return parser.buffer.toString("utf8", start, offset);
  }
  function parseError2(parser) {
    var string = parseSimpleString(parser);
    if (string !== undefined) {
      if (parser.optionReturnBuffers === true) {
        string = string.toString();
      }
      return new ReplyError(string);
    }
  }
  function handleError(parser, type) {
    const err2 = new ParserError("Protocol error, got " + JSON.stringify(String.fromCharCode(type)) + " as reply type byte", JSON.stringify(parser.buffer), parser.offset);
    parser.buffer = null;
    parser.returnFatalError(err2);
  }
  function parseArray(parser) {
    const length = parseLength(parser);
    if (length === undefined) {
      return;
    }
    if (length < 0) {
      return null;
    }
    const responses = new Array(length);
    return parseArrayElements(parser, responses, 0);
  }
  function pushArrayCache(parser, array, pos) {
    parser.arrayCache.push(array);
    parser.arrayPos.push(pos);
  }
  function parseArrayChunks(parser) {
    const tmp = parser.arrayCache.pop();
    var pos = parser.arrayPos.pop();
    if (parser.arrayCache.length) {
      const res = parseArrayChunks(parser);
      if (res === undefined) {
        pushArrayCache(parser, tmp, pos);
        return;
      }
      tmp[pos++] = res;
    }
    return parseArrayElements(parser, tmp, pos);
  }
  function parseArrayElements(parser, responses, i) {
    const bufferLength = parser.buffer.length;
    while (i < responses.length) {
      const offset = parser.offset;
      if (parser.offset >= bufferLength) {
        pushArrayCache(parser, responses, i);
        return;
      }
      const response = parseType(parser, parser.buffer[parser.offset++]);
      if (response === undefined) {
        if (!(parser.arrayCache.length || parser.bufferCache.length)) {
          parser.offset = offset;
        }
        pushArrayCache(parser, responses, i);
        return;
      }
      responses[i] = response;
      i++;
    }
    return responses;
  }
  function parseType(parser, type) {
    switch (type) {
      case 36:
        return parseBulkString(parser);
      case 43:
        return parseSimpleString(parser);
      case 42:
        return parseArray(parser);
      case 58:
        return parseInteger(parser);
      case 45:
        return parseError2(parser);
      default:
        return handleError(parser, type);
    }
  }
  function decreaseBufferPool() {
    if (bufferPool.length > 50 * 1024) {
      if (counter === 1 || notDecreased > counter * 2) {
        const minSliceLen = Math.floor(bufferPool.length / 10);
        const sliceLength = minSliceLen < bufferOffset ? bufferOffset : minSliceLen;
        bufferOffset = 0;
        bufferPool = bufferPool.slice(sliceLength, bufferPool.length);
      } else {
        notDecreased++;
        counter--;
      }
    } else {
      clearInterval(interval);
      counter = 0;
      notDecreased = 0;
      interval = null;
    }
  }
  function resizeBuffer(length) {
    if (bufferPool.length < length + bufferOffset) {
      const multiplier = length > 1024 * 1024 * 75 ? 2 : 3;
      if (bufferOffset > 1024 * 1024 * 111) {
        bufferOffset = 1024 * 1024 * 50;
      }
      bufferPool = Buffer2.allocUnsafe(length * multiplier + bufferOffset);
      bufferOffset = 0;
      counter++;
      if (interval === null) {
        interval = setInterval(decreaseBufferPool, 50);
      }
    }
  }
  function concatBulkString(parser) {
    const list = parser.bufferCache;
    const oldOffset = parser.offset;
    var chunks = list.length;
    var offset = parser.bigStrSize - parser.totalChunkSize;
    parser.offset = offset;
    if (offset <= 2) {
      if (chunks === 2) {
        return list[0].toString("utf8", oldOffset, list[0].length + offset - 2);
      }
      chunks--;
      offset = list[list.length - 2].length + offset;
    }
    var res = decoder.write(list[0].slice(oldOffset));
    for (var i = 1;i < chunks - 1; i++) {
      res += decoder.write(list[i]);
    }
    res += decoder.end(list[i].slice(0, offset - 2));
    return res;
  }
  function concatBulkBuffer(parser) {
    const list = parser.bufferCache;
    const oldOffset = parser.offset;
    const length = parser.bigStrSize - oldOffset - 2;
    var chunks = list.length;
    var offset = parser.bigStrSize - parser.totalChunkSize;
    parser.offset = offset;
    if (offset <= 2) {
      if (chunks === 2) {
        return list[0].slice(oldOffset, list[0].length + offset - 2);
      }
      chunks--;
      offset = list[list.length - 2].length + offset;
    }
    resizeBuffer(length);
    const start = bufferOffset;
    list[0].copy(bufferPool, start, oldOffset, list[0].length);
    bufferOffset += list[0].length - oldOffset;
    for (var i = 1;i < chunks - 1; i++) {
      list[i].copy(bufferPool, bufferOffset);
      bufferOffset += list[i].length;
    }
    list[i].copy(bufferPool, bufferOffset, 0, offset - 2);
    bufferOffset += offset - 2;
    return bufferPool.slice(start, bufferOffset);
  }

  class JavascriptRedisParser {
    constructor(options) {
      if (!options) {
        throw new TypeError("Options are mandatory.");
      }
      if (typeof options.returnError !== "function" || typeof options.returnReply !== "function") {
        throw new TypeError("The returnReply and returnError options have to be functions.");
      }
      this.setReturnBuffers(!!options.returnBuffers);
      this.setStringNumbers(!!options.stringNumbers);
      this.returnError = options.returnError;
      this.returnFatalError = options.returnFatalError || options.returnError;
      this.returnReply = options.returnReply;
      this.reset();
    }
    reset() {
      this.offset = 0;
      this.buffer = null;
      this.bigStrSize = 0;
      this.totalChunkSize = 0;
      this.bufferCache = [];
      this.arrayCache = [];
      this.arrayPos = [];
    }
    setReturnBuffers(returnBuffers) {
      if (typeof returnBuffers !== "boolean") {
        throw new TypeError("The returnBuffers argument has to be a boolean");
      }
      this.optionReturnBuffers = returnBuffers;
    }
    setStringNumbers(stringNumbers) {
      if (typeof stringNumbers !== "boolean") {
        throw new TypeError("The stringNumbers argument has to be a boolean");
      }
      this.optionStringNumbers = stringNumbers;
    }
    execute(buffer2) {
      if (this.buffer === null) {
        this.buffer = buffer2;
        this.offset = 0;
      } else if (this.bigStrSize === 0) {
        const oldLength = this.buffer.length;
        const remainingLength = oldLength - this.offset;
        const newBuffer = Buffer2.allocUnsafe(remainingLength + buffer2.length);
        this.buffer.copy(newBuffer, 0, this.offset, oldLength);
        buffer2.copy(newBuffer, remainingLength, 0, buffer2.length);
        this.buffer = newBuffer;
        this.offset = 0;
        if (this.arrayCache.length) {
          const arr = parseArrayChunks(this);
          if (arr === undefined) {
            return;
          }
          this.returnReply(arr);
        }
      } else if (this.totalChunkSize + buffer2.length >= this.bigStrSize) {
        this.bufferCache.push(buffer2);
        var tmp = this.optionReturnBuffers ? concatBulkBuffer(this) : concatBulkString(this);
        this.bigStrSize = 0;
        this.bufferCache = [];
        this.buffer = buffer2;
        if (this.arrayCache.length) {
          this.arrayCache[0][this.arrayPos[0]++] = tmp;
          tmp = parseArrayChunks(this);
          if (tmp === undefined) {
            return;
          }
        }
        this.returnReply(tmp);
      } else {
        this.bufferCache.push(buffer2);
        this.totalChunkSize += buffer2.length;
        return;
      }
      while (this.offset < this.buffer.length) {
        const offset = this.offset;
        const type = this.buffer[this.offset++];
        const response = parseType(this, type);
        if (response === undefined) {
          if (!(this.arrayCache.length || this.bufferCache.length)) {
            this.offset = offset;
          }
          return;
        }
        if (type === 45) {
          this.returnError(response);
        } else {
          this.returnReply(response);
        }
      }
      this.buffer = null;
    }
  }
  module.exports = JavascriptRedisParser;
});

// ../../../node_modules/ioredis/built/SubscriptionSet.js
var require_SubscriptionSet = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });

  class SubscriptionSet {
    constructor() {
      this.set = {
        subscribe: {},
        psubscribe: {},
        ssubscribe: {}
      };
    }
    add(set, channel) {
      this.set[mapSet(set)][channel] = true;
    }
    del(set, channel) {
      delete this.set[mapSet(set)][channel];
    }
    channels(set) {
      return Object.keys(this.set[mapSet(set)]);
    }
    isEmpty() {
      return this.channels("subscribe").length === 0 && this.channels("psubscribe").length === 0 && this.channels("ssubscribe").length === 0;
    }
  }
  exports.default = SubscriptionSet;
  function mapSet(set) {
    if (set === "unsubscribe") {
      return "subscribe";
    }
    if (set === "punsubscribe") {
      return "psubscribe";
    }
    if (set === "sunsubscribe") {
      return "ssubscribe";
    }
    return set;
  }
});

// ../../../node_modules/ioredis/built/DataHandler.js
var require_DataHandler = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var Command_1 = require_Command();
  var utils_1 = require_utils2();
  var RedisParser = require_parser();
  var SubscriptionSet_1 = require_SubscriptionSet();
  var debug = (0, utils_1.Debug)("dataHandler");

  class DataHandler {
    constructor(redis, parserOptions) {
      this.redis = redis;
      const parser = new RedisParser({
        stringNumbers: parserOptions.stringNumbers,
        returnBuffers: true,
        returnError: (err2) => {
          this.returnError(err2);
        },
        returnFatalError: (err2) => {
          this.returnFatalError(err2);
        },
        returnReply: (reply) => {
          this.returnReply(reply);
        }
      });
      redis.stream.prependListener("data", (data) => {
        parser.execute(data);
      });
      redis.stream.resume();
    }
    returnFatalError(err2) {
      err2.message += ". Please report this.";
      this.redis.recoverFromFatalError(err2, err2, { offlineQueue: false });
    }
    returnError(err2) {
      const item = this.shiftCommand(err2);
      if (!item) {
        return;
      }
      err2.command = {
        name: item.command.name,
        args: item.command.args
      };
      if (item.command.name == "ssubscribe" && err2.message.includes("MOVED")) {
        this.redis.emit("moved");
        return;
      }
      this.redis.handleReconnection(err2, item);
    }
    returnReply(reply) {
      if (this.handleMonitorReply(reply)) {
        return;
      }
      if (this.handleSubscriberReply(reply)) {
        return;
      }
      const item = this.shiftCommand(reply);
      if (!item) {
        return;
      }
      if (Command_1.default.checkFlag("ENTER_SUBSCRIBER_MODE", item.command.name)) {
        this.redis.condition.subscriber = new SubscriptionSet_1.default;
        this.redis.condition.subscriber.add(item.command.name, reply[1].toString());
        if (!fillSubCommand(item.command, reply[2])) {
          this.redis.commandQueue.unshift(item);
        }
      } else if (Command_1.default.checkFlag("EXIT_SUBSCRIBER_MODE", item.command.name)) {
        if (!fillUnsubCommand(item.command, reply[2])) {
          this.redis.commandQueue.unshift(item);
        }
      } else {
        item.command.resolve(reply);
      }
    }
    handleSubscriberReply(reply) {
      if (!this.redis.condition.subscriber) {
        return false;
      }
      const replyType = Array.isArray(reply) ? reply[0].toString() : null;
      debug('receive reply "%s" in subscriber mode', replyType);
      switch (replyType) {
        case "message":
          if (this.redis.listeners("message").length > 0) {
            this.redis.emit("message", reply[1].toString(), reply[2] ? reply[2].toString() : "");
          }
          this.redis.emit("messageBuffer", reply[1], reply[2]);
          break;
        case "pmessage": {
          const pattern = reply[1].toString();
          if (this.redis.listeners("pmessage").length > 0) {
            this.redis.emit("pmessage", pattern, reply[2].toString(), reply[3].toString());
          }
          this.redis.emit("pmessageBuffer", pattern, reply[2], reply[3]);
          break;
        }
        case "smessage": {
          if (this.redis.listeners("smessage").length > 0) {
            this.redis.emit("smessage", reply[1].toString(), reply[2] ? reply[2].toString() : "");
          }
          this.redis.emit("smessageBuffer", reply[1], reply[2]);
          break;
        }
        case "ssubscribe":
        case "subscribe":
        case "psubscribe": {
          const channel = reply[1].toString();
          this.redis.condition.subscriber.add(replyType, channel);
          const item = this.shiftCommand(reply);
          if (!item) {
            return;
          }
          if (!fillSubCommand(item.command, reply[2])) {
            this.redis.commandQueue.unshift(item);
          }
          break;
        }
        case "sunsubscribe":
        case "unsubscribe":
        case "punsubscribe": {
          const channel = reply[1] ? reply[1].toString() : null;
          if (channel) {
            this.redis.condition.subscriber.del(replyType, channel);
          }
          const count = reply[2];
          if (Number(count) === 0) {
            this.redis.condition.subscriber = false;
          }
          const item = this.shiftCommand(reply);
          if (!item) {
            return;
          }
          if (!fillUnsubCommand(item.command, count)) {
            this.redis.commandQueue.unshift(item);
          }
          break;
        }
        default: {
          const item = this.shiftCommand(reply);
          if (!item) {
            return;
          }
          item.command.resolve(reply);
        }
      }
      return true;
    }
    handleMonitorReply(reply) {
      if (this.redis.status !== "monitoring") {
        return false;
      }
      const replyStr = reply.toString();
      if (replyStr === "OK") {
        return false;
      }
      const len = replyStr.indexOf(" ");
      const timestamp2 = replyStr.slice(0, len);
      const argIndex = replyStr.indexOf('"');
      const args = replyStr.slice(argIndex + 1, -1).split('" "').map((elem) => elem.replace(/\\"/g, '"'));
      const dbAndSource = replyStr.slice(len + 2, argIndex - 2).split(" ");
      this.redis.emit("monitor", timestamp2, args, dbAndSource[1], dbAndSource[0]);
      return true;
    }
    shiftCommand(reply) {
      const item = this.redis.commandQueue.shift();
      if (!item) {
        const message = "Command queue state error. If you can reproduce this, please report it.";
        const error = new Error(message + (reply instanceof Error ? ` Last error: ${reply.message}` : ` Last reply: ${reply.toString()}`));
        this.redis.emit("error", error);
        return null;
      }
      return item;
    }
  }
  exports.default = DataHandler;
  var remainingRepliesMap = new WeakMap;
  function fillSubCommand(command, count) {
    let remainingReplies = remainingRepliesMap.has(command) ? remainingRepliesMap.get(command) : command.args.length;
    remainingReplies -= 1;
    if (remainingReplies <= 0) {
      command.resolve(count);
      remainingRepliesMap.delete(command);
      return true;
    }
    remainingRepliesMap.set(command, remainingReplies);
    return false;
  }
  function fillUnsubCommand(command, count) {
    let remainingReplies = remainingRepliesMap.has(command) ? remainingRepliesMap.get(command) : command.args.length;
    if (remainingReplies === 0) {
      if (Number(count) === 0) {
        remainingRepliesMap.delete(command);
        command.resolve(count);
        return true;
      }
      return false;
    }
    remainingReplies -= 1;
    if (remainingReplies <= 0) {
      command.resolve(count);
      return true;
    }
    remainingRepliesMap.set(command, remainingReplies);
    return false;
  }
});

// ../../../node_modules/ioredis/built/redis/event_handler.js
var require_event_handler = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.readyHandler = exports.errorHandler = exports.closeHandler = exports.connectHandler = undefined;
  var redis_errors_1 = require_redis_errors();
  var Command_1 = require_Command();
  var errors_1 = require_errors();
  var utils_1 = require_utils2();
  var DataHandler_1 = require_DataHandler();
  var debug = (0, utils_1.Debug)("connection");
  function connectHandler(self) {
    return function() {
      var _a2;
      self.setStatus("connect");
      self.resetCommandQueue();
      let flushed = false;
      const { connectionEpoch } = self;
      if (self.condition.auth) {
        self.auth(self.condition.auth, function(err2) {
          if (connectionEpoch !== self.connectionEpoch) {
            return;
          }
          if (err2) {
            if (err2.message.indexOf("no password is set") !== -1) {
              console.warn("[WARN] Redis server does not require a password, but a password was supplied.");
            } else if (err2.message.indexOf("without any password configured for the default user") !== -1) {
              console.warn("[WARN] This Redis server's `default` user does not require a password, but a password was supplied");
            } else if (err2.message.indexOf("wrong number of arguments for 'auth' command") !== -1) {
              console.warn(`[ERROR] The server returned "wrong number of arguments for 'auth' command". You are probably passing both username and password to Redis version 5 or below. You should only pass the 'password' option for Redis version 5 and under.`);
            } else {
              flushed = true;
              self.recoverFromFatalError(err2, err2);
            }
          }
        });
      }
      if (self.condition.select) {
        self.select(self.condition.select).catch((err2) => {
          self.silentEmit("error", err2);
        });
      }
      new DataHandler_1.default(self, {
        stringNumbers: self.options.stringNumbers
      });
      const clientCommandPromises = [];
      if (self.options.connectionName) {
        debug("set the connection name [%s]", self.options.connectionName);
        clientCommandPromises.push(self.client("setname", self.options.connectionName).catch(utils_1.noop));
      }
      if (!self.options.disableClientInfo) {
        debug("set the client info");
        clientCommandPromises.push((0, utils_1.getPackageMeta)().then((packageMeta) => {
          return self.client("SETINFO", "LIB-VER", packageMeta.version).catch(utils_1.noop);
        }).catch(utils_1.noop));
        clientCommandPromises.push(self.client("SETINFO", "LIB-NAME", ((_a2 = self.options) === null || _a2 === undefined ? undefined : _a2.clientInfoTag) ? `ioredis(${self.options.clientInfoTag})` : "ioredis").catch(utils_1.noop));
      }
      Promise.all(clientCommandPromises).catch(utils_1.noop).finally(() => {
        if (!self.options.enableReadyCheck) {
          exports.readyHandler(self)();
        }
        if (self.options.enableReadyCheck) {
          self._readyCheck(function(err2, info) {
            if (connectionEpoch !== self.connectionEpoch) {
              return;
            }
            if (err2) {
              if (!flushed) {
                self.recoverFromFatalError(new Error("Ready check failed: " + err2.message), err2);
              }
            } else {
              if (self.connector.check(info)) {
                exports.readyHandler(self)();
              } else {
                self.disconnect(true);
              }
            }
          });
        }
      });
    };
  }
  exports.connectHandler = connectHandler;
  function abortError(command) {
    const err2 = new redis_errors_1.AbortError("Command aborted due to connection close");
    err2.command = {
      name: command.name,
      args: command.args
    };
    return err2;
  }
  function abortIncompletePipelines(commandQueue) {
    var _a2;
    let expectedIndex = 0;
    for (let i = 0;i < commandQueue.length; ) {
      const command = (_a2 = commandQueue.peekAt(i)) === null || _a2 === undefined ? undefined : _a2.command;
      const pipelineIndex = command.pipelineIndex;
      if (pipelineIndex === undefined || pipelineIndex === 0) {
        expectedIndex = 0;
      }
      if (pipelineIndex !== undefined && pipelineIndex !== expectedIndex++) {
        commandQueue.remove(i, 1);
        command.reject(abortError(command));
        continue;
      }
      i++;
    }
  }
  function abortTransactionFragments(commandQueue) {
    var _a2;
    for (let i = 0;i < commandQueue.length; ) {
      const command = (_a2 = commandQueue.peekAt(i)) === null || _a2 === undefined ? undefined : _a2.command;
      if (command.name === "multi") {
        break;
      }
      if (command.name === "exec") {
        commandQueue.remove(i, 1);
        command.reject(abortError(command));
        break;
      }
      if (command.inTransaction) {
        commandQueue.remove(i, 1);
        command.reject(abortError(command));
      } else {
        i++;
      }
    }
  }
  function closeHandler(self) {
    return function() {
      const prevStatus = self.status;
      self.setStatus("close");
      if (self.commandQueue.length) {
        abortIncompletePipelines(self.commandQueue);
      }
      if (self.offlineQueue.length) {
        abortTransactionFragments(self.offlineQueue);
      }
      if (prevStatus === "ready") {
        if (!self.prevCondition) {
          self.prevCondition = self.condition;
        }
        if (self.commandQueue.length) {
          self.prevCommandQueue = self.commandQueue;
        }
      }
      if (self.manuallyClosing) {
        self.manuallyClosing = false;
        debug("skip reconnecting since the connection is manually closed.");
        return close();
      }
      if (typeof self.options.retryStrategy !== "function") {
        debug("skip reconnecting because `retryStrategy` is not a function");
        return close();
      }
      const retryDelay = self.options.retryStrategy(++self.retryAttempts);
      if (typeof retryDelay !== "number") {
        debug("skip reconnecting because `retryStrategy` doesn't return a number");
        return close();
      }
      debug("reconnect in %sms", retryDelay);
      self.setStatus("reconnecting", retryDelay);
      self.reconnectTimeout = setTimeout(function() {
        self.reconnectTimeout = null;
        self.connect().catch(utils_1.noop);
      }, retryDelay);
      const { maxRetriesPerRequest } = self.options;
      if (typeof maxRetriesPerRequest === "number") {
        if (maxRetriesPerRequest < 0) {
          debug("maxRetriesPerRequest is negative, ignoring...");
        } else {
          const remainder = self.retryAttempts % (maxRetriesPerRequest + 1);
          if (remainder === 0) {
            debug("reach maxRetriesPerRequest limitation, flushing command queue...");
            self.flushQueue(new errors_1.MaxRetriesPerRequestError(maxRetriesPerRequest));
          }
        }
      }
    };
    function close() {
      self.setStatus("end");
      self.flushQueue(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
    }
  }
  exports.closeHandler = closeHandler;
  function errorHandler2(self) {
    return function(error) {
      debug("error: %s", error);
      self.silentEmit("error", error);
    };
  }
  exports.errorHandler = errorHandler2;
  function readyHandler(self) {
    return function() {
      self.setStatus("ready");
      self.retryAttempts = 0;
      if (self.options.monitor) {
        self.call("monitor").then(() => self.setStatus("monitoring"), (error) => self.emit("error", error));
        const { sendCommand } = self;
        self.sendCommand = function(command) {
          if (Command_1.default.checkFlag("VALID_IN_MONITOR_MODE", command.name)) {
            return sendCommand.call(self, command);
          }
          command.reject(new Error("Connection is in monitoring mode, can't process commands."));
          return command.promise;
        };
        self.once("close", function() {
          delete self.sendCommand;
        });
        return;
      }
      const finalSelect = self.prevCondition ? self.prevCondition.select : self.condition.select;
      if (self.options.readOnly) {
        debug("set the connection to readonly mode");
        self.readonly().catch(utils_1.noop);
      }
      if (self.prevCondition) {
        const condition = self.prevCondition;
        self.prevCondition = null;
        if (condition.subscriber && self.options.autoResubscribe) {
          if (self.condition.select !== finalSelect) {
            debug("connect to db [%d]", finalSelect);
            self.select(finalSelect);
          }
          const subscribeChannels = condition.subscriber.channels("subscribe");
          if (subscribeChannels.length) {
            debug("subscribe %d channels", subscribeChannels.length);
            self.subscribe(subscribeChannels);
          }
          const psubscribeChannels = condition.subscriber.channels("psubscribe");
          if (psubscribeChannels.length) {
            debug("psubscribe %d channels", psubscribeChannels.length);
            self.psubscribe(psubscribeChannels);
          }
          const ssubscribeChannels = condition.subscriber.channels("ssubscribe");
          if (ssubscribeChannels.length) {
            debug("ssubscribe %s", ssubscribeChannels.length);
            for (const channel of ssubscribeChannels) {
              self.ssubscribe(channel);
            }
          }
        }
      }
      if (self.prevCommandQueue) {
        if (self.options.autoResendUnfulfilledCommands) {
          debug("resend %d unfulfilled commands", self.prevCommandQueue.length);
          while (self.prevCommandQueue.length > 0) {
            const item = self.prevCommandQueue.shift();
            if (item.select !== self.condition.select && item.command.name !== "select") {
              self.select(item.select);
            }
            self.sendCommand(item.command, item.stream);
          }
        } else {
          self.prevCommandQueue = null;
        }
      }
      if (self.offlineQueue.length) {
        debug("send %d commands in offline queue", self.offlineQueue.length);
        const offlineQueue = self.offlineQueue;
        self.resetOfflineQueue();
        while (offlineQueue.length > 0) {
          const item = offlineQueue.shift();
          if (item.select !== self.condition.select && item.command.name !== "select") {
            self.select(item.select);
          }
          self.sendCommand(item.command, item.stream);
        }
      }
      if (self.condition.select !== finalSelect) {
        debug("connect to db [%d]", finalSelect);
        self.select(finalSelect);
      }
    };
  }
  exports.readyHandler = readyHandler;
});

// ../../../node_modules/ioredis/built/redis/RedisOptions.js
var require_RedisOptions = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DEFAULT_REDIS_OPTIONS = undefined;
  exports.DEFAULT_REDIS_OPTIONS = {
    port: 6379,
    host: "localhost",
    family: 0,
    connectTimeout: 1e4,
    disconnectTimeout: 2000,
    retryStrategy: function(times) {
      return Math.min(times * 50, 2000);
    },
    keepAlive: 0,
    noDelay: true,
    connectionName: null,
    disableClientInfo: false,
    clientInfoTag: undefined,
    sentinels: null,
    name: null,
    role: "master",
    sentinelRetryStrategy: function(times) {
      return Math.min(times * 10, 1000);
    },
    sentinelReconnectStrategy: function() {
      return 60000;
    },
    natMap: null,
    enableTLSForSentinelMode: false,
    updateSentinels: true,
    failoverDetector: false,
    username: null,
    password: null,
    db: 0,
    enableOfflineQueue: true,
    enableReadyCheck: true,
    autoResubscribe: true,
    autoResendUnfulfilledCommands: true,
    lazyConnect: false,
    keyPrefix: "",
    reconnectOnError: null,
    readOnly: false,
    stringNumbers: false,
    maxRetriesPerRequest: 20,
    maxLoadingRetryTime: 1e4,
    enableAutoPipelining: false,
    autoPipeliningIgnoredCommands: [],
    sentinelMaxConnections: 10
  };
});

// ../../../node_modules/ioredis/built/Redis.js
var require_Redis = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var commands_1 = require_built();
  var events_1 = __require("events");
  var standard_as_callback_1 = require_built2();
  var cluster_1 = require_cluster();
  var Command_1 = require_Command();
  var connectors_1 = require_connectors();
  var SentinelConnector_1 = require_SentinelConnector();
  var eventHandler = require_event_handler();
  var RedisOptions_1 = require_RedisOptions();
  var ScanStream_1 = require_ScanStream();
  var transaction_1 = require_transaction();
  var utils_1 = require_utils2();
  var applyMixin_1 = require_applyMixin();
  var Commander_1 = require_Commander();
  var lodash_1 = require_lodash3();
  var Deque = require_denque();
  var debug = (0, utils_1.Debug)("redis");

  class Redis extends Commander_1.default {
    constructor(arg1, arg2, arg3) {
      super();
      this.status = "wait";
      this.isCluster = false;
      this.reconnectTimeout = null;
      this.connectionEpoch = 0;
      this.retryAttempts = 0;
      this.manuallyClosing = false;
      this._autoPipelines = new Map;
      this._runningAutoPipelines = new Set;
      this.parseOptions(arg1, arg2, arg3);
      events_1.EventEmitter.call(this);
      this.resetCommandQueue();
      this.resetOfflineQueue();
      if (this.options.Connector) {
        this.connector = new this.options.Connector(this.options);
      } else if (this.options.sentinels) {
        const sentinelConnector = new SentinelConnector_1.default(this.options);
        sentinelConnector.emitter = this;
        this.connector = sentinelConnector;
      } else {
        this.connector = new connectors_1.StandaloneConnector(this.options);
      }
      if (this.options.scripts) {
        Object.entries(this.options.scripts).forEach(([name, definition]) => {
          this.defineCommand(name, definition);
        });
      }
      if (this.options.lazyConnect) {
        this.setStatus("wait");
      } else {
        this.connect().catch(lodash_1.noop);
      }
    }
    static createClient(...args) {
      return new Redis(...args);
    }
    get autoPipelineQueueSize() {
      let queued = 0;
      for (const pipeline of this._autoPipelines.values()) {
        queued += pipeline.length;
      }
      return queued;
    }
    connect(callback) {
      const promise = new Promise((resolve, reject) => {
        if (this.status === "connecting" || this.status === "connect" || this.status === "ready") {
          reject(new Error("Redis is already connecting/connected"));
          return;
        }
        this.connectionEpoch += 1;
        this.setStatus("connecting");
        const { options } = this;
        this.condition = {
          select: options.db,
          auth: options.username ? [options.username, options.password] : options.password,
          subscriber: false
        };
        const _this = this;
        (0, standard_as_callback_1.default)(this.connector.connect(function(type, err2) {
          _this.silentEmit(type, err2);
        }), function(err2, stream) {
          if (err2) {
            _this.flushQueue(err2);
            _this.silentEmit("error", err2);
            reject(err2);
            _this.setStatus("end");
            return;
          }
          let CONNECT_EVENT = options.tls ? "secureConnect" : "connect";
          if ("sentinels" in options && options.sentinels && !options.enableTLSForSentinelMode) {
            CONNECT_EVENT = "connect";
          }
          _this.stream = stream;
          if (options.noDelay) {
            stream.setNoDelay(true);
          }
          if (typeof options.keepAlive === "number") {
            if (stream.connecting) {
              stream.once(CONNECT_EVENT, () => {
                stream.setKeepAlive(true, options.keepAlive);
              });
            } else {
              stream.setKeepAlive(true, options.keepAlive);
            }
          }
          if (stream.connecting) {
            stream.once(CONNECT_EVENT, eventHandler.connectHandler(_this));
            if (options.connectTimeout) {
              let connectTimeoutCleared = false;
              stream.setTimeout(options.connectTimeout, function() {
                if (connectTimeoutCleared) {
                  return;
                }
                stream.setTimeout(0);
                stream.destroy();
                const err3 = new Error("connect ETIMEDOUT");
                err3.errorno = "ETIMEDOUT";
                err3.code = "ETIMEDOUT";
                err3.syscall = "connect";
                eventHandler.errorHandler(_this)(err3);
              });
              stream.once(CONNECT_EVENT, function() {
                connectTimeoutCleared = true;
                stream.setTimeout(0);
              });
            }
          } else if (stream.destroyed) {
            const firstError = _this.connector.firstError;
            if (firstError) {
              process.nextTick(() => {
                eventHandler.errorHandler(_this)(firstError);
              });
            }
            process.nextTick(eventHandler.closeHandler(_this));
          } else {
            process.nextTick(eventHandler.connectHandler(_this));
          }
          if (!stream.destroyed) {
            stream.once("error", eventHandler.errorHandler(_this));
            stream.once("close", eventHandler.closeHandler(_this));
          }
          const connectionReadyHandler = function() {
            _this.removeListener("close", connectionCloseHandler);
            resolve();
          };
          var connectionCloseHandler = function() {
            _this.removeListener("ready", connectionReadyHandler);
            reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
          };
          _this.once("ready", connectionReadyHandler);
          _this.once("close", connectionCloseHandler);
        });
      });
      return (0, standard_as_callback_1.default)(promise, callback);
    }
    disconnect(reconnect = false) {
      if (!reconnect) {
        this.manuallyClosing = true;
      }
      if (this.reconnectTimeout && !reconnect) {
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = null;
      }
      if (this.status === "wait") {
        eventHandler.closeHandler(this)();
      } else {
        this.connector.disconnect();
      }
    }
    end() {
      this.disconnect();
    }
    duplicate(override) {
      return new Redis({ ...this.options, ...override });
    }
    get mode() {
      var _a2;
      return this.options.monitor ? "monitor" : ((_a2 = this.condition) === null || _a2 === undefined ? undefined : _a2.subscriber) ? "subscriber" : "normal";
    }
    monitor(callback) {
      const monitorInstance = this.duplicate({
        monitor: true,
        lazyConnect: false
      });
      return (0, standard_as_callback_1.default)(new Promise(function(resolve, reject) {
        monitorInstance.once("error", reject);
        monitorInstance.once("monitoring", function() {
          resolve(monitorInstance);
        });
      }), callback);
    }
    sendCommand(command, stream) {
      var _a2, _b;
      if (this.status === "wait") {
        this.connect().catch(lodash_1.noop);
      }
      if (this.status === "end") {
        command.reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
        return command.promise;
      }
      if (((_a2 = this.condition) === null || _a2 === undefined ? undefined : _a2.subscriber) && !Command_1.default.checkFlag("VALID_IN_SUBSCRIBER_MODE", command.name)) {
        command.reject(new Error("Connection in subscriber mode, only subscriber commands may be used"));
        return command.promise;
      }
      if (typeof this.options.commandTimeout === "number") {
        command.setTimeout(this.options.commandTimeout);
      }
      let writable = this.status === "ready" || !stream && this.status === "connect" && (0, commands_1.exists)(command.name) && ((0, commands_1.hasFlag)(command.name, "loading") || Command_1.default.checkFlag("HANDSHAKE_COMMANDS", command.name));
      if (!this.stream) {
        writable = false;
      } else if (!this.stream.writable) {
        writable = false;
      } else if (this.stream._writableState && this.stream._writableState.ended) {
        writable = false;
      }
      if (!writable) {
        if (!this.options.enableOfflineQueue) {
          command.reject(new Error("Stream isn't writeable and enableOfflineQueue options is false"));
          return command.promise;
        }
        if (command.name === "quit" && this.offlineQueue.length === 0) {
          this.disconnect();
          command.resolve(Buffer.from("OK"));
          return command.promise;
        }
        if (debug.enabled) {
          debug("queue command[%s]: %d -> %s(%o)", this._getDescription(), this.condition.select, command.name, command.args);
        }
        this.offlineQueue.push({
          command,
          stream,
          select: this.condition.select
        });
      } else {
        if (debug.enabled) {
          debug("write command[%s]: %d -> %s(%o)", this._getDescription(), (_b = this.condition) === null || _b === undefined ? undefined : _b.select, command.name, command.args);
        }
        if (stream) {
          if ("isPipeline" in stream && stream.isPipeline) {
            stream.write(command.toWritable(stream.destination.redis.stream));
          } else {
            stream.write(command.toWritable(stream));
          }
        } else {
          this.stream.write(command.toWritable(this.stream));
        }
        this.commandQueue.push({
          command,
          stream,
          select: this.condition.select
        });
        if (Command_1.default.checkFlag("WILL_DISCONNECT", command.name)) {
          this.manuallyClosing = true;
        }
        if (this.options.socketTimeout !== undefined && this.socketTimeoutTimer === undefined) {
          this.setSocketTimeout();
        }
      }
      if (command.name === "select" && (0, utils_1.isInt)(command.args[0])) {
        const db2 = parseInt(command.args[0], 10);
        if (this.condition.select !== db2) {
          this.condition.select = db2;
          this.emit("select", db2);
          debug("switch to db [%d]", this.condition.select);
        }
      }
      return command.promise;
    }
    setSocketTimeout() {
      this.socketTimeoutTimer = setTimeout(() => {
        this.stream.destroy(new Error(`Socket timeout. Expecting data, but didn't receive any in ${this.options.socketTimeout}ms.`));
        this.socketTimeoutTimer = undefined;
      }, this.options.socketTimeout);
      this.stream.once("data", () => {
        clearTimeout(this.socketTimeoutTimer);
        this.socketTimeoutTimer = undefined;
        if (this.commandQueue.length === 0)
          return;
        this.setSocketTimeout();
      });
    }
    scanStream(options) {
      return this.createScanStream("scan", { options });
    }
    scanBufferStream(options) {
      return this.createScanStream("scanBuffer", { options });
    }
    sscanStream(key, options) {
      return this.createScanStream("sscan", { key, options });
    }
    sscanBufferStream(key, options) {
      return this.createScanStream("sscanBuffer", { key, options });
    }
    hscanStream(key, options) {
      return this.createScanStream("hscan", { key, options });
    }
    hscanBufferStream(key, options) {
      return this.createScanStream("hscanBuffer", { key, options });
    }
    zscanStream(key, options) {
      return this.createScanStream("zscan", { key, options });
    }
    zscanBufferStream(key, options) {
      return this.createScanStream("zscanBuffer", { key, options });
    }
    silentEmit(eventName, arg) {
      let error;
      if (eventName === "error") {
        error = arg;
        if (this.status === "end") {
          return;
        }
        if (this.manuallyClosing) {
          if (error instanceof Error && (error.message === utils_1.CONNECTION_CLOSED_ERROR_MSG || error.syscall === "connect" || error.syscall === "read")) {
            return;
          }
        }
      }
      if (this.listeners(eventName).length > 0) {
        return this.emit.apply(this, arguments);
      }
      if (error && error instanceof Error) {
        console.error("[ioredis] Unhandled error event:", error.stack);
      }
      return false;
    }
    recoverFromFatalError(_commandError, err2, options) {
      this.flushQueue(err2, options);
      this.silentEmit("error", err2);
      this.disconnect(true);
    }
    handleReconnection(err2, item) {
      var _a2;
      let needReconnect = false;
      if (this.options.reconnectOnError && !Command_1.default.checkFlag("IGNORE_RECONNECT_ON_ERROR", item.command.name)) {
        needReconnect = this.options.reconnectOnError(err2);
      }
      switch (needReconnect) {
        case 1:
        case true:
          if (this.status !== "reconnecting") {
            this.disconnect(true);
          }
          item.command.reject(err2);
          break;
        case 2:
          if (this.status !== "reconnecting") {
            this.disconnect(true);
          }
          if (((_a2 = this.condition) === null || _a2 === undefined ? undefined : _a2.select) !== item.select && item.command.name !== "select") {
            this.select(item.select);
          }
          this.sendCommand(item.command);
          break;
        default:
          item.command.reject(err2);
      }
    }
    _getDescription() {
      let description;
      if ("path" in this.options && this.options.path) {
        description = this.options.path;
      } else if (this.stream && this.stream.remoteAddress && this.stream.remotePort) {
        description = this.stream.remoteAddress + ":" + this.stream.remotePort;
      } else if ("host" in this.options && this.options.host) {
        description = this.options.host + ":" + this.options.port;
      } else {
        description = "";
      }
      if (this.options.connectionName) {
        description += ` (${this.options.connectionName})`;
      }
      return description;
    }
    resetCommandQueue() {
      this.commandQueue = new Deque;
    }
    resetOfflineQueue() {
      this.offlineQueue = new Deque;
    }
    parseOptions(...args) {
      const options = {};
      let isTls = false;
      for (let i = 0;i < args.length; ++i) {
        const arg = args[i];
        if (arg === null || typeof arg === "undefined") {
          continue;
        }
        if (typeof arg === "object") {
          (0, lodash_1.defaults)(options, arg);
        } else if (typeof arg === "string") {
          (0, lodash_1.defaults)(options, (0, utils_1.parseURL)(arg));
          if (arg.startsWith("rediss://")) {
            isTls = true;
          }
        } else if (typeof arg === "number") {
          options.port = arg;
        } else {
          throw new Error("Invalid argument " + arg);
        }
      }
      if (isTls) {
        (0, lodash_1.defaults)(options, { tls: true });
      }
      (0, lodash_1.defaults)(options, Redis.defaultOptions);
      if (typeof options.port === "string") {
        options.port = parseInt(options.port, 10);
      }
      if (typeof options.db === "string") {
        options.db = parseInt(options.db, 10);
      }
      this.options = (0, utils_1.resolveTLSProfile)(options);
    }
    setStatus(status, arg) {
      if (debug.enabled) {
        debug("status[%s]: %s -> %s", this._getDescription(), this.status || "[empty]", status);
      }
      this.status = status;
      process.nextTick(this.emit.bind(this, status, arg));
    }
    createScanStream(command, { key, options = {} }) {
      return new ScanStream_1.default({
        objectMode: true,
        key,
        redis: this,
        command,
        ...options
      });
    }
    flushQueue(error, options) {
      options = (0, lodash_1.defaults)({}, options, {
        offlineQueue: true,
        commandQueue: true
      });
      let item;
      if (options.offlineQueue) {
        while (item = this.offlineQueue.shift()) {
          item.command.reject(error);
        }
      }
      if (options.commandQueue) {
        if (this.commandQueue.length > 0) {
          if (this.stream) {
            this.stream.removeAllListeners("data");
          }
          while (item = this.commandQueue.shift()) {
            item.command.reject(error);
          }
        }
      }
    }
    _readyCheck(callback) {
      const _this = this;
      this.info(function(err2, res) {
        if (err2) {
          if (err2.message && err2.message.includes("NOPERM")) {
            console.warn(`Skipping the ready check because INFO command fails: "${err2.message}". You can disable ready check with "enableReadyCheck". More: https://github.com/luin/ioredis/wiki/Disable-ready-check.`);
            return callback(null, {});
          }
          return callback(err2);
        }
        if (typeof res !== "string") {
          return callback(null, res);
        }
        const info = {};
        const lines = res.split(`\r
`);
        for (let i = 0;i < lines.length; ++i) {
          const [fieldName, ...fieldValueParts] = lines[i].split(":");
          const fieldValue = fieldValueParts.join(":");
          if (fieldValue) {
            info[fieldName] = fieldValue;
          }
        }
        if (!info.loading || info.loading === "0") {
          callback(null, info);
        } else {
          const loadingEtaMs = (info.loading_eta_seconds || 1) * 1000;
          const retryTime = _this.options.maxLoadingRetryTime && _this.options.maxLoadingRetryTime < loadingEtaMs ? _this.options.maxLoadingRetryTime : loadingEtaMs;
          debug("Redis server still loading, trying again in " + retryTime + "ms");
          setTimeout(function() {
            _this._readyCheck(callback);
          }, retryTime);
        }
      }).catch(lodash_1.noop);
    }
  }
  Redis.Cluster = cluster_1.default;
  Redis.Command = Command_1.default;
  Redis.defaultOptions = RedisOptions_1.DEFAULT_REDIS_OPTIONS;
  (0, applyMixin_1.default)(Redis, events_1.EventEmitter);
  (0, transaction_1.addTransactionSupport)(Redis.prototype);
  exports.default = Redis;
});

// ../../../node_modules/ioredis/built/index.js
var require_built3 = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.print = exports.ReplyError = exports.SentinelIterator = exports.SentinelConnector = exports.AbstractConnector = exports.Pipeline = exports.ScanStream = exports.Command = exports.Cluster = exports.Redis = exports.default = undefined;
  exports = module.exports = require_Redis().default;
  var Redis_1 = require_Redis();
  Object.defineProperty(exports, "default", { enumerable: true, get: function() {
    return Redis_1.default;
  } });
  var Redis_2 = require_Redis();
  Object.defineProperty(exports, "Redis", { enumerable: true, get: function() {
    return Redis_2.default;
  } });
  var cluster_1 = require_cluster();
  Object.defineProperty(exports, "Cluster", { enumerable: true, get: function() {
    return cluster_1.default;
  } });
  var Command_1 = require_Command();
  Object.defineProperty(exports, "Command", { enumerable: true, get: function() {
    return Command_1.default;
  } });
  var ScanStream_1 = require_ScanStream();
  Object.defineProperty(exports, "ScanStream", { enumerable: true, get: function() {
    return ScanStream_1.default;
  } });
  var Pipeline_1 = require_Pipeline();
  Object.defineProperty(exports, "Pipeline", { enumerable: true, get: function() {
    return Pipeline_1.default;
  } });
  var AbstractConnector_1 = require_AbstractConnector();
  Object.defineProperty(exports, "AbstractConnector", { enumerable: true, get: function() {
    return AbstractConnector_1.default;
  } });
  var SentinelConnector_1 = require_SentinelConnector();
  Object.defineProperty(exports, "SentinelConnector", { enumerable: true, get: function() {
    return SentinelConnector_1.default;
  } });
  Object.defineProperty(exports, "SentinelIterator", { enumerable: true, get: function() {
    return SentinelConnector_1.SentinelIterator;
  } });
  exports.ReplyError = require_redis_errors().ReplyError;
  Object.defineProperty(exports, "Promise", {
    get() {
      console.warn("ioredis v5 does not support plugging third-party Promise library anymore. Native Promise will be used.");
      return Promise;
    },
    set(_lib) {
      console.warn("ioredis v5 does not support plugging third-party Promise library anymore. Native Promise will be used.");
    }
  });
  function print(err2, reply) {
    if (err2) {
      console.log("Error: " + err2);
    } else {
      console.log("Reply: " + reply);
    }
  }
  exports.print = print;
});

// ../../node_modules/hono/dist/compose.js
var compose = (middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || undefined;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
  };
};

// ../../node_modules/hono/dist/http-exception.js
var HTTPException = class extends Error {
  res;
  status;
  constructor(status = 500, options) {
    super(options?.message, { cause: options?.cause });
    this.res = options?.res;
    this.status = status;
  }
  getResponse() {
    if (this.res) {
      const newResponse = new Response(this.res.body, {
        status: this.status,
        headers: this.res.headers
      });
      return newResponse;
    }
    return new Response(this.message, {
      status: this.status
    });
  }
};

// ../../node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT = Symbol();

// ../../node_modules/hono/dist/utils/body.js
var parseBody = async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
};
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
var handleParsingAllValues = (form, key, value) => {
  if (form[key] !== undefined) {
    if (Array.isArray(form[key])) {
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
};
var handleParsingNestedValues = (form, key, value) => {
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
};

// ../../node_modules/hono/dist/utils/url.js
var splitPath = (path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
};
var splitRoutingPath = (routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
};
var extractGroupsFromPath = (path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match, index) => {
    const mark = `@${index}`;
    groups.push([mark, match]);
    return mark;
  });
  return { groups, path };
};
var replaceGroupMarks = (paths, groups) => {
  for (let i = groups.length - 1;i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1;j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
};
var patternCache = {};
var getPattern = (label, next) => {
  if (label === "*") {
    return "*";
  }
  const match = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match[1], new RegExp(`^${match[2]}(?=/${next})`)] : [label, match[1], new RegExp(`^${match[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
};
var tryDecode = (str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match) => {
      try {
        return decoder(match);
      } catch {
        return match;
      }
    });
  }
};
var tryDecodeURI = (str) => tryDecode(str, decodeURI);
var getPath = (request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (;i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const path = url.slice(start, queryIndex === -1 ? undefined : queryIndex);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63) {
      break;
    }
  }
  return url.slice(start, i);
};
var getPathNoStrict = (request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
};
var mergePath = (base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
};
var checkOptionalParameter = (path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
};
var _decodeURI = (value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
};
var _getQueryParam = (url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? undefined : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(keyIndex + 1, valueIndex === -1 ? nextKeyIndex === -1 ? undefined : nextKeyIndex : valueIndex);
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? undefined : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
  return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;

// ../../node_modules/hono/dist/request.js
var tryDecodeURIComponent = (str) => tryDecode(str, decodeURIComponent_);
var HonoRequest = class {
  raw;
  #validatedData;
  #matchResult;
  routeIndex = 0;
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== undefined) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? undefined;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return this.bodyCache.parsedBody ??= await parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw[key]();
  };
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  text() {
    return this.#cachedBody("text");
  }
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  blob() {
    return this.#cachedBody("blob");
  }
  formData() {
    return this.#cachedBody("formData");
  }
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// ../../node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = (value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
};
var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then((res) => Promise.all(res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))).then(() => buffer[0]));
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
};

// ../../node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = (contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
};
var Context = class {
  #rawRequest;
  #req;
  env = {};
  #var;
  finalized = false;
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  get res() {
    return this.#res ||= new Response(null, {
      headers: this.#preparedHeaders ??= new Headers
    });
  }
  set res(_res) {
    if (this.#res && _res) {
      _res = new Response(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  setLayout = (layout) => this.#layout = layout;
  getLayout = () => this.#layout;
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = new Response(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers;
    if (value === undefined) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  };
  status = (status) => {
    this.#status = status;
  };
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map;
    this.#var.set(key, value);
  };
  get = (key) => {
    return this.#var ? this.#var.get(key) : undefined;
  };
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers;
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return new Response(data, { status, headers: responseHeaders });
  }
  newResponse = (...args) => this.#newResponse(...args);
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(text, arg, setDefaultContentType(TEXT_PLAIN, headers));
  };
  json = (object, arg, headers) => {
    return this.#newResponse(JSON.stringify(object), arg, setDefaultContentType("application/json", headers));
  };
  html = (html, arg, headers) => {
    const res = (html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers));
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  };
  redirect = (location, status) => {
    const locationString = String(location);
    this.header("Location", !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString));
    return this.newResponse(null, status ?? 302);
  };
  notFound = () => {
    this.#notFoundHandler ??= () => new Response;
    return this.#notFoundHandler(this);
  };
};

// ../../node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
};

// ../../node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// ../../node_modules/hono/dist/hono-base.js
var notFoundHandler = (c) => {
  return c.text("404 Not Found", 404);
};
var errorHandler = (err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
};
var Hono = class {
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  router;
  getPath;
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  errorHandler = errorHandler;
  route(path, app) {
    const subApp = this.basePath(path);
    app.routes.map((r) => {
      let handler;
      if (app.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = async (c, next) => (await compose([], app.errorHandler)(c, () => r.handler(c, next))).res;
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler);
    });
    return this;
  }
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = (request) => request;
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = undefined;
      try {
        executionContext = c.executionCtx;
      } catch {}
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    };
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { basePath: this._basePath, path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request, { env });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then((resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(new Request(/^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`, requestInit), Env, executionCtx);
  };
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, undefined, event.request.method));
    });
  };
};

// ../../node_modules/hono/dist/router/reg-exp-router/matcher.js
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = (method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  };
  this.match = match2;
  return match2(method, path);
}

// ../../node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
var Node = class {
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== undefined) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some((k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR)) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new Node;
        if (name !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some((k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR)) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new Node;
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// ../../node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = class {
  #context = { varIndex: 0 };
  #root = new Node;
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0;; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1;i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1;j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== undefined) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== undefined) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// ../../node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(path === "*" ? "" : `^${path.replace(/\/\*$|([.\\+*[^\]$()])/g, (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)")}$`);
}
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie;
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map((route) => [!/\*|\/:/.test(route[0]), ...route]).sort(([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length);
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length;i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (;paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length;i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length;j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length;k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
function findMiddleware(middleware, path) {
  if (!middleware) {
    return;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return;
}
var RegExpRouter = class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach((p) => re.test(p) && routes[m][p].push([handler, paramCount]));
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length;i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = undefined;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]]));
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// ../../node_modules/hono/dist/router/reg-exp-router/prepared-router.js
var PreparedRegExpRouter = class {
  name = "PreparedRegExpRouter";
  #matchers;
  #relocateMap;
  constructor(matchers, relocateMap) {
    this.#matchers = matchers;
    this.#relocateMap = relocateMap;
  }
  #addWildcard(method, handlerData) {
    const matcher = this.#matchers[method];
    matcher[1].forEach((list) => list && list.push(handlerData));
    Object.values(matcher[2]).forEach((list) => list[0].push(handlerData));
  }
  #addPath(method, path, handler, indexes, map) {
    const matcher = this.#matchers[method];
    if (!map) {
      matcher[2][path][0].push([handler, {}]);
    } else {
      indexes.forEach((index) => {
        if (typeof index === "number") {
          matcher[1][index].push([handler, map]);
        } else {
          matcher[2][index || path][0].push([handler, map]);
        }
      });
    }
  }
  add(method, path, handler) {
    if (!this.#matchers[method]) {
      const all = this.#matchers[METHOD_NAME_ALL];
      const staticMap = {};
      for (const key in all[2]) {
        staticMap[key] = [all[2][key][0].slice(), emptyParam];
      }
      this.#matchers[method] = [
        all[0],
        all[1].map((list) => Array.isArray(list) ? list.slice() : 0),
        staticMap
      ];
    }
    if (path === "/*" || path === "*") {
      const handlerData = [handler, {}];
      if (method === METHOD_NAME_ALL) {
        for (const m in this.#matchers) {
          this.#addWildcard(m, handlerData);
        }
      } else {
        this.#addWildcard(method, handlerData);
      }
      return;
    }
    const data = this.#relocateMap[path];
    if (!data) {
      throw new Error(`Path ${path} is not registered`);
    }
    for (const [indexes, map] of data) {
      if (method === METHOD_NAME_ALL) {
        for (const m in this.#matchers) {
          this.#addPath(m, path, handler, indexes, map);
        }
      } else {
        this.#addPath(method, path, handler, indexes, map);
      }
    }
  }
  buildAllMatchers() {
    return this.#matchers;
  }
  match = match;
};

// ../../node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (;i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length;i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = undefined;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// ../../node_modules/hono/dist/router/trie-router/node.js
var emptyParams = /* @__PURE__ */ Object.create(null);
var Node2 = class {
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length;i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new Node2;
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #getHandlerSets(node, method, nodeParams, params) {
    const handlerSets = [];
    for (let i = 0, len = node.#methods.length;i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== undefined) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length;i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
    return handlerSets;
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    for (let i = 0, len = parts.length;i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length;j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              handlerSets.push(...this.#getHandlerSets(nextNode.#children["*"], method, node.#params));
            }
            handlerSets.push(...this.#getHandlerSets(nextNode, method, node.#params));
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length;k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              handlerSets.push(...this.#getHandlerSets(astNode, method, node.#params));
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          const restPathString = parts.slice(i).join("/");
          if (matcher instanceof RegExp) {
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              handlerSets.push(...this.#getHandlerSets(child, method, node.#params, params));
              if (Object.keys(child.#children).length) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              handlerSets.push(...this.#getHandlerSets(child, method, params, node.#params));
              if (child.#children["*"]) {
                handlerSets.push(...this.#getHandlerSets(child.#children["*"], method, params, node.#params));
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      curNodes = tempNodes.concat(curNodesQueue.shift() ?? []);
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// ../../node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2;
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length;i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};

// ../../node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter, new TrieRouter]
    });
  }
};

// ../../node_modules/hono/dist/middleware/cors/index.js
var cors = (options) => {
  const defaults = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    allowHeaders: [],
    exposeHeaders: []
  };
  const opts = {
    ...defaults,
    ...options
  };
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function") {
      return optsAllowMethods;
    } else if (Array.isArray(optsAllowMethods)) {
      return () => optsAllowMethods;
    } else {
      return () => [];
    }
  })(opts.allowMethods);
  return async function cors2(c, next) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    const allowOrigin = await findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (opts.exposeHeaders?.length) {
      set("Access-Control-Expose-Headers", opts.exposeHeaders.join(","));
    }
    if (c.req.method === "OPTIONS") {
      if (opts.origin !== "*") {
        set("Vary", "Origin");
      }
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      const allowMethods = await findAllowMethods(c.req.header("origin") || "", c);
      if (allowMethods.length) {
        set("Access-Control-Allow-Methods", allowMethods.join(","));
      }
      let headers = opts.allowHeaders;
      if (!headers?.length) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headers = requestHeaders.split(/\s*,\s*/);
        }
      }
      if (headers?.length) {
        set("Access-Control-Allow-Headers", headers.join(","));
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c.res.headers.delete("Content-Length");
      c.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
    if (opts.origin !== "*") {
      c.header("Vary", "Origin", { append: true });
    }
  };
};

// ../../node_modules/hono/dist/utils/color.js
function getColorEnabled() {
  const { process: process2, Deno } = globalThis;
  const isNoColor = typeof Deno?.noColor === "boolean" ? Deno.noColor : process2 !== undefined ? "NO_COLOR" in process2?.env : false;
  return !isNoColor;
}
async function getColorEnabledAsync() {
  const { navigator: navigator2 } = globalThis;
  const cfWorkers = "cloudflare:workers";
  const isNoColor = navigator2 !== undefined && navigator2.userAgent === "Cloudflare-Workers" ? await (async () => {
    try {
      return "NO_COLOR" in ((await import(cfWorkers)).env ?? {});
    } catch {
      return false;
    }
  })() : !getColorEnabled();
  return !isNoColor;
}

// ../../node_modules/hono/dist/middleware/logger/index.js
var humanize = (times) => {
  const [delimiter, separator] = [",", "."];
  const orderTimes = times.map((v) => v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delimiter));
  return orderTimes.join(separator);
};
var time = (start) => {
  const delta = Date.now() - start;
  return humanize([delta < 1000 ? delta + "ms" : Math.round(delta / 1000) + "s"]);
};
var colorStatus = async (status) => {
  const colorEnabled = await getColorEnabledAsync();
  if (colorEnabled) {
    switch (status / 100 | 0) {
      case 5:
        return `\x1B[31m${status}\x1B[0m`;
      case 4:
        return `\x1B[33m${status}\x1B[0m`;
      case 3:
        return `\x1B[36m${status}\x1B[0m`;
      case 2:
        return `\x1B[32m${status}\x1B[0m`;
    }
  }
  return `${status}`;
};
async function log(fn, prefix, method, path, status = 0, elapsed) {
  const out = prefix === "<--" ? `${prefix} ${method} ${path}` : `${prefix} ${method} ${path} ${await colorStatus(status)} ${elapsed}`;
  fn(out);
}
var logger = (fn = console.log) => {
  return async function logger2(c, next) {
    const { method, url } = c.req;
    const path = url.slice(url.indexOf("/", 8));
    await log(fn, "<--", method, path);
    const start = Date.now();
    await next();
    await log(fn, "-->", method, path, c.res.status, time(start));
  };
};

// ../../node_modules/hono/dist/middleware/pretty-json/index.js
var prettyJSON = (options) => {
  const targetQuery = options?.query ?? "pretty";
  return async function prettyJSON2(c, next) {
    const pretty = c.req.query(targetQuery) || c.req.query(targetQuery) === "";
    await next();
    if (pretty && c.res.headers.get("Content-Type")?.startsWith("application/json")) {
      const obj = await c.res.json();
      c.res = new Response(JSON.stringify(obj, null, options?.space ?? 2), c.res);
    }
  };
};

// ../../node_modules/hono/dist/utils/cookie.js
var validCookieNameRegEx = /^[\w!#$%&'*.^`|~+-]+$/;
var validCookieValueRegEx = /^[ !#-:<-[\]-~]*$/;
var parse = (cookie, name) => {
  if (name && cookie.indexOf(name) === -1) {
    return {};
  }
  const pairs = cookie.trim().split(";");
  const parsedCookie = {};
  for (let pairStr of pairs) {
    pairStr = pairStr.trim();
    const valueStartPos = pairStr.indexOf("=");
    if (valueStartPos === -1) {
      continue;
    }
    const cookieName = pairStr.substring(0, valueStartPos).trim();
    if (name && name !== cookieName || !validCookieNameRegEx.test(cookieName)) {
      continue;
    }
    let cookieValue = pairStr.substring(valueStartPos + 1).trim();
    if (cookieValue.startsWith('"') && cookieValue.endsWith('"')) {
      cookieValue = cookieValue.slice(1, -1);
    }
    if (validCookieValueRegEx.test(cookieValue)) {
      parsedCookie[cookieName] = cookieValue.indexOf("%") !== -1 ? tryDecode(cookieValue, decodeURIComponent_) : cookieValue;
      if (name) {
        break;
      }
    }
  }
  return parsedCookie;
};

// ../../node_modules/hono/dist/helper/cookie/index.js
var getCookie = (c, key, prefix) => {
  const cookie = c.req.raw.headers.get("Cookie");
  if (typeof key === "string") {
    if (!cookie) {
      return;
    }
    let finalKey = key;
    if (prefix === "secure") {
      finalKey = "__Secure-" + key;
    } else if (prefix === "host") {
      finalKey = "__Host-" + key;
    }
    const obj2 = parse(cookie, finalKey);
    return obj2[finalKey];
  }
  if (!cookie) {
    return {};
  }
  const obj = parse(cookie);
  return obj;
};

// ../../node_modules/hono/dist/utils/buffer.js
var bufferToFormData = (arrayBuffer, contentType) => {
  const response = new Response(arrayBuffer, {
    headers: {
      "Content-Type": contentType
    }
  });
  return response.formData();
};

// ../../node_modules/hono/dist/validator/validator.js
var jsonRegex = /^application\/([a-z-\.]+\+)?json(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/;
var multipartRegex = /^multipart\/form-data(;\s?boundary=[a-zA-Z0-9'"()+_,\-./:=?]+)?$/;
var urlencodedRegex = /^application\/x-www-form-urlencoded(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/;
var validator = (target, validationFunc) => {
  return async (c, next) => {
    let value = {};
    const contentType = c.req.header("Content-Type");
    switch (target) {
      case "json":
        if (!contentType || !jsonRegex.test(contentType)) {
          break;
        }
        try {
          value = await c.req.json();
        } catch {
          const message = "Malformed JSON in request body";
          throw new HTTPException(400, { message });
        }
        break;
      case "form": {
        if (!contentType || !(multipartRegex.test(contentType) || urlencodedRegex.test(contentType))) {
          break;
        }
        let formData;
        if (c.req.bodyCache.formData) {
          formData = await c.req.bodyCache.formData;
        } else {
          try {
            const arrayBuffer = await c.req.arrayBuffer();
            formData = await bufferToFormData(arrayBuffer, contentType);
            c.req.bodyCache.formData = formData;
          } catch (e) {
            let message = "Malformed FormData request.";
            message += e instanceof Error ? ` ${e.message}` : ` ${String(e)}`;
            throw new HTTPException(400, { message });
          }
        }
        const form = {};
        formData.forEach((value2, key) => {
          if (key.endsWith("[]")) {
            (form[key] ??= []).push(value2);
          } else if (Array.isArray(form[key])) {
            form[key].push(value2);
          } else if (key in form) {
            form[key] = [form[key], value2];
          } else {
            form[key] = value2;
          }
        });
        value = form;
        break;
      }
      case "query":
        value = Object.fromEntries(Object.entries(c.req.queries()).map(([k, v]) => {
          return v.length === 1 ? [k, v[0]] : [k, v];
        }));
        break;
      case "param":
        value = c.req.param();
        break;
      case "header":
        value = c.req.header();
        break;
      case "cookie":
        value = getCookie(c);
        break;
    }
    const res = await validationFunc(value, c);
    if (res instanceof Response) {
      return res;
    }
    c.req.addValidatedData(target, res);
    return await next();
  };
};

// ../../node_modules/@hono/zod-validator/dist/esm/index.js
var zValidator = (target, schema, hook) => validator(target, async (value, c) => {
  const result = await schema.safeParseAsync(value);
  if (hook) {
    const hookResult = await hook({ data: value, ...result }, c);
    if (hookResult) {
      if (hookResult instanceof Response) {
        return hookResult;
      }
      if ("response" in hookResult) {
        return hookResult.response;
      }
    }
  }
  if (!result.success) {
    return c.json(result, 400);
  }
  return result.data;
});

// ../../node_modules/drizzle-orm/entity.js
var entityKind = Symbol.for("drizzle:entityKind");
var hasOwnEntityKind = Symbol.for("drizzle:hasOwnEntityKind");
function is(value, type) {
  if (!value || typeof value !== "object") {
    return false;
  }
  if (value instanceof type) {
    return true;
  }
  if (!Object.prototype.hasOwnProperty.call(type, entityKind)) {
    throw new Error(`Class "${type.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`);
  }
  let cls = value.constructor;
  if (cls) {
    while (cls) {
      if (entityKind in cls && cls[entityKind] === type[entityKind]) {
        return true;
      }
      cls = Object.getPrototypeOf(cls);
    }
  }
  return false;
}

// ../../node_modules/drizzle-orm/column.js
class Column {
  constructor(table, config) {
    this.table = table;
    this.config = config;
    this.name = config.name;
    this.notNull = config.notNull;
    this.default = config.default;
    this.defaultFn = config.defaultFn;
    this.onUpdateFn = config.onUpdateFn;
    this.hasDefault = config.hasDefault;
    this.primary = config.primaryKey;
    this.isUnique = config.isUnique;
    this.uniqueName = config.uniqueName;
    this.uniqueType = config.uniqueType;
    this.dataType = config.dataType;
    this.columnType = config.columnType;
  }
  static [entityKind] = "Column";
  name;
  primary;
  notNull;
  default;
  defaultFn;
  onUpdateFn;
  hasDefault;
  isUnique;
  uniqueName;
  uniqueType;
  dataType;
  columnType;
  enumValues = undefined;
  config;
  mapFromDriverValue(value) {
    return value;
  }
  mapToDriverValue(value) {
    return value;
  }
}

// ../../node_modules/drizzle-orm/column-builder.js
class ColumnBuilder {
  static [entityKind] = "ColumnBuilder";
  config;
  constructor(name, dataType, columnType) {
    this.config = {
      name,
      notNull: false,
      default: undefined,
      hasDefault: false,
      primaryKey: false,
      isUnique: false,
      uniqueName: undefined,
      uniqueType: undefined,
      dataType,
      columnType
    };
  }
  $type() {
    return this;
  }
  notNull() {
    this.config.notNull = true;
    return this;
  }
  default(value) {
    this.config.default = value;
    this.config.hasDefault = true;
    return this;
  }
  $defaultFn(fn) {
    this.config.defaultFn = fn;
    this.config.hasDefault = true;
    return this;
  }
  $default = this.$defaultFn;
  $onUpdateFn(fn) {
    this.config.onUpdateFn = fn;
    this.config.hasDefault = true;
    return this;
  }
  $onUpdate = this.$onUpdateFn;
  primaryKey() {
    this.config.primaryKey = true;
    this.config.notNull = true;
    return this;
  }
}

// ../../node_modules/drizzle-orm/table.js
var TableName = Symbol.for("drizzle:Name");
var Schema = Symbol.for("drizzle:Schema");
var Columns = Symbol.for("drizzle:Columns");
var OriginalName = Symbol.for("drizzle:OriginalName");
var BaseName = Symbol.for("drizzle:BaseName");
var IsAlias = Symbol.for("drizzle:IsAlias");
var ExtraConfigBuilder = Symbol.for("drizzle:ExtraConfigBuilder");
var IsDrizzleTable = Symbol.for("drizzle:IsDrizzleTable");

class Table {
  static [entityKind] = "Table";
  static Symbol = {
    Name: TableName,
    Schema,
    OriginalName,
    Columns,
    BaseName,
    IsAlias,
    ExtraConfigBuilder
  };
  [TableName];
  [OriginalName];
  [Schema];
  [Columns];
  [BaseName];
  [IsAlias] = false;
  [ExtraConfigBuilder] = undefined;
  [IsDrizzleTable] = true;
  constructor(name, schema, baseName) {
    this[TableName] = this[OriginalName] = name;
    this[Schema] = schema;
    this[BaseName] = baseName;
  }
}
function isTable(table) {
  return typeof table === "object" && table !== null && IsDrizzleTable in table;
}
function getTableName(table) {
  return table[TableName];
}

// ../../node_modules/drizzle-orm/pg-core/table.js
var InlineForeignKeys = Symbol.for("drizzle:PgInlineForeignKeys");

class PgTable extends Table {
  static [entityKind] = "PgTable";
  static Symbol = Object.assign({}, Table.Symbol, {
    InlineForeignKeys
  });
  [InlineForeignKeys] = [];
  [Table.Symbol.ExtraConfigBuilder] = undefined;
}
function pgTableWithSchema(name, columns, extraConfig, schema, baseName = name) {
  const rawTable = new PgTable(name, schema, baseName);
  const builtColumns = Object.fromEntries(Object.entries(columns).map(([name2, colBuilderBase]) => {
    const colBuilder = colBuilderBase;
    const column = colBuilder.build(rawTable);
    rawTable[InlineForeignKeys].push(...colBuilder.buildForeignKeys(column, rawTable));
    return [name2, column];
  }));
  const table = Object.assign(rawTable, builtColumns);
  table[Table.Symbol.Columns] = builtColumns;
  if (extraConfig) {
    table[PgTable.Symbol.ExtraConfigBuilder] = extraConfig;
  }
  return table;
}
var pgTable = (name, columns, extraConfig) => {
  return pgTableWithSchema(name, columns, extraConfig, undefined);
};

// ../../node_modules/drizzle-orm/pg-core/foreign-keys.js
class ForeignKeyBuilder {
  static [entityKind] = "PgForeignKeyBuilder";
  reference;
  _onUpdate = "no action";
  _onDelete = "no action";
  constructor(config, actions) {
    this.reference = () => {
      const { name, columns, foreignColumns } = config();
      return { name, columns, foreignTable: foreignColumns[0].table, foreignColumns };
    };
    if (actions) {
      this._onUpdate = actions.onUpdate;
      this._onDelete = actions.onDelete;
    }
  }
  onUpdate(action) {
    this._onUpdate = action === undefined ? "no action" : action;
    return this;
  }
  onDelete(action) {
    this._onDelete = action === undefined ? "no action" : action;
    return this;
  }
  build(table) {
    return new ForeignKey(table, this);
  }
}

class ForeignKey {
  constructor(table, builder) {
    this.table = table;
    this.reference = builder.reference;
    this.onUpdate = builder._onUpdate;
    this.onDelete = builder._onDelete;
  }
  static [entityKind] = "PgForeignKey";
  reference;
  onUpdate;
  onDelete;
  getName() {
    const { name, columns, foreignColumns } = this.reference();
    const columnNames = columns.map((column) => column.name);
    const foreignColumnNames = foreignColumns.map((column) => column.name);
    const chunks = [
      this.table[PgTable.Symbol.Name],
      ...columnNames,
      foreignColumns[0].table[PgTable.Symbol.Name],
      ...foreignColumnNames
    ];
    return name ?? `${chunks.join("_")}_fk`;
  }
}

// ../../node_modules/drizzle-orm/tracing-utils.js
function iife(fn, ...args) {
  return fn(...args);
}

// ../../node_modules/drizzle-orm/pg-core/unique-constraint.js
function uniqueKeyName(table, columns) {
  return `${table[PgTable.Symbol.Name]}_${columns.join("_")}_unique`;
}

// ../../node_modules/drizzle-orm/pg-core/utils/array.js
function parsePgArrayValue(arrayString, startFrom, inQuotes) {
  for (let i = startFrom;i < arrayString.length; i++) {
    const char = arrayString[i];
    if (char === "\\") {
      i++;
      continue;
    }
    if (char === '"') {
      return [arrayString.slice(startFrom, i).replace(/\\/g, ""), i + 1];
    }
    if (inQuotes) {
      continue;
    }
    if (char === "," || char === "}") {
      return [arrayString.slice(startFrom, i).replace(/\\/g, ""), i];
    }
  }
  return [arrayString.slice(startFrom).replace(/\\/g, ""), arrayString.length];
}
function parsePgNestedArray(arrayString, startFrom = 0) {
  const result = [];
  let i = startFrom;
  let lastCharIsComma = false;
  while (i < arrayString.length) {
    const char = arrayString[i];
    if (char === ",") {
      if (lastCharIsComma || i === startFrom) {
        result.push("");
      }
      lastCharIsComma = true;
      i++;
      continue;
    }
    lastCharIsComma = false;
    if (char === "\\") {
      i += 2;
      continue;
    }
    if (char === '"') {
      const [value2, startFrom2] = parsePgArrayValue(arrayString, i + 1, true);
      result.push(value2);
      i = startFrom2;
      continue;
    }
    if (char === "}") {
      return [result, i + 1];
    }
    if (char === "{") {
      const [value2, startFrom2] = parsePgNestedArray(arrayString, i + 1);
      result.push(value2);
      i = startFrom2;
      continue;
    }
    const [value, newStartFrom] = parsePgArrayValue(arrayString, i, false);
    result.push(value);
    i = newStartFrom;
  }
  return [result, i];
}
function parsePgArray(arrayString) {
  const [result] = parsePgNestedArray(arrayString, 1);
  return result;
}
function makePgArray(array) {
  return `{${array.map((item) => {
    if (Array.isArray(item)) {
      return makePgArray(item);
    }
    if (typeof item === "string") {
      return `"${item.replace(/\\/g, "\\\\").replace(/"/g, "\\\"")}"`;
    }
    return `${item}`;
  }).join(",")}}`;
}

// ../../node_modules/drizzle-orm/pg-core/columns/common.js
class PgColumnBuilder extends ColumnBuilder {
  foreignKeyConfigs = [];
  static [entityKind] = "PgColumnBuilder";
  array(size) {
    return new PgArrayBuilder(this.config.name, this, size);
  }
  references(ref, actions = {}) {
    this.foreignKeyConfigs.push({ ref, actions });
    return this;
  }
  unique(name, config) {
    this.config.isUnique = true;
    this.config.uniqueName = name;
    this.config.uniqueType = config?.nulls;
    return this;
  }
  buildForeignKeys(column, table) {
    return this.foreignKeyConfigs.map(({ ref, actions }) => {
      return iife((ref2, actions2) => {
        const builder = new ForeignKeyBuilder(() => {
          const foreignColumn = ref2();
          return { columns: [column], foreignColumns: [foreignColumn] };
        });
        if (actions2.onUpdate) {
          builder.onUpdate(actions2.onUpdate);
        }
        if (actions2.onDelete) {
          builder.onDelete(actions2.onDelete);
        }
        return builder.build(table);
      }, ref, actions);
    });
  }
}

class PgColumn extends Column {
  constructor(table, config) {
    if (!config.uniqueName) {
      config.uniqueName = uniqueKeyName(table, [config.name]);
    }
    super(table, config);
    this.table = table;
  }
  static [entityKind] = "PgColumn";
}

class PgArrayBuilder extends PgColumnBuilder {
  static [entityKind] = "PgArrayBuilder";
  constructor(name, baseBuilder, size) {
    super(name, "array", "PgArray");
    this.config.baseBuilder = baseBuilder;
    this.config.size = size;
  }
  build(table) {
    const baseColumn = this.config.baseBuilder.build(table);
    return new PgArray(table, this.config, baseColumn);
  }
}

class PgArray extends PgColumn {
  constructor(table, config, baseColumn, range) {
    super(table, config);
    this.baseColumn = baseColumn;
    this.range = range;
    this.size = config.size;
  }
  size;
  static [entityKind] = "PgArray";
  getSQLType() {
    return `${this.baseColumn.getSQLType()}[${typeof this.size === "number" ? this.size : ""}]`;
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") {
      value = parsePgArray(value);
    }
    return value.map((v) => this.baseColumn.mapFromDriverValue(v));
  }
  mapToDriverValue(value, isNestedArray = false) {
    const a = value.map((v) => v === null ? null : is(this.baseColumn, PgArray) ? this.baseColumn.mapToDriverValue(v, true) : this.baseColumn.mapToDriverValue(v));
    if (isNestedArray)
      return a;
    return makePgArray(a);
  }
}

// ../../node_modules/drizzle-orm/pg-core/columns/enum.js
var isPgEnumSym = Symbol.for("drizzle:isPgEnum");
function isPgEnum(obj) {
  return !!obj && typeof obj === "function" && isPgEnumSym in obj && obj[isPgEnumSym] === true;
}

class PgEnumColumnBuilder extends PgColumnBuilder {
  static [entityKind] = "PgEnumColumnBuilder";
  constructor(name, enumInstance) {
    super(name, "string", "PgEnumColumn");
    this.config.enum = enumInstance;
  }
  build(table) {
    return new PgEnumColumn(table, this.config);
  }
}

class PgEnumColumn extends PgColumn {
  static [entityKind] = "PgEnumColumn";
  enum = this.config.enum;
  enumValues = this.config.enum.enumValues;
  constructor(table, config) {
    super(table, config);
    this.enum = config.enum;
  }
  getSQLType() {
    return this.enum.enumName;
  }
}
function pgEnum(enumName, values) {
  return pgEnumWithSchema(enumName, values, undefined);
}
function pgEnumWithSchema(enumName, values, schema) {
  const enumInstance = Object.assign((name) => new PgEnumColumnBuilder(name, enumInstance), {
    enumName,
    enumValues: values,
    schema,
    [isPgEnumSym]: true
  });
  return enumInstance;
}

// ../../node_modules/drizzle-orm/subquery.js
class Subquery {
  static [entityKind] = "Subquery";
  constructor(sql, selection, alias, isWith = false) {
    this._ = {
      brand: "Subquery",
      sql,
      selectedFields: selection,
      alias,
      isWith
    };
  }
}

class WithSubquery extends Subquery {
  static [entityKind] = "WithSubquery";
}

// ../../node_modules/drizzle-orm/version.js
var version = "0.30.10";

// ../../node_modules/drizzle-orm/tracing.js
var otel;
var rawTracer;
var tracer = {
  startActiveSpan(name, fn) {
    if (!otel) {
      return fn();
    }
    if (!rawTracer) {
      rawTracer = otel.trace.getTracer("drizzle-orm", version);
    }
    return iife((otel2, rawTracer2) => rawTracer2.startActiveSpan(name, (span) => {
      try {
        return fn(span);
      } catch (e) {
        span.setStatus({
          code: otel2.SpanStatusCode.ERROR,
          message: e instanceof Error ? e.message : "Unknown error"
        });
        throw e;
      } finally {
        span.end();
      }
    }), otel, rawTracer);
  }
};

// ../../node_modules/drizzle-orm/view-common.js
var ViewBaseConfig = Symbol.for("drizzle:ViewBaseConfig");

// ../../node_modules/drizzle-orm/sql/sql.js
function isSQLWrapper(value) {
  return value !== null && value !== undefined && typeof value.getSQL === "function";
}
function mergeQueries(queries) {
  const result = { sql: "", params: [] };
  for (const query of queries) {
    result.sql += query.sql;
    result.params.push(...query.params);
    if (query.typings?.length) {
      if (!result.typings) {
        result.typings = [];
      }
      result.typings.push(...query.typings);
    }
  }
  return result;
}

class StringChunk {
  static [entityKind] = "StringChunk";
  value;
  constructor(value) {
    this.value = Array.isArray(value) ? value : [value];
  }
  getSQL() {
    return new SQL([this]);
  }
}

class SQL {
  constructor(queryChunks) {
    this.queryChunks = queryChunks;
  }
  static [entityKind] = "SQL";
  decoder = noopDecoder;
  shouldInlineParams = false;
  append(query) {
    this.queryChunks.push(...query.queryChunks);
    return this;
  }
  toQuery(config) {
    return tracer.startActiveSpan("drizzle.buildSQL", (span) => {
      const query = this.buildQueryFromSourceParams(this.queryChunks, config);
      span?.setAttributes({
        "drizzle.query.text": query.sql,
        "drizzle.query.params": JSON.stringify(query.params)
      });
      return query;
    });
  }
  buildQueryFromSourceParams(chunks, _config) {
    const config = Object.assign({}, _config, {
      inlineParams: _config.inlineParams || this.shouldInlineParams,
      paramStartIndex: _config.paramStartIndex || { value: 0 }
    });
    const {
      escapeName,
      escapeParam,
      prepareTyping,
      inlineParams,
      paramStartIndex
    } = config;
    return mergeQueries(chunks.map((chunk) => {
      if (is(chunk, StringChunk)) {
        return { sql: chunk.value.join(""), params: [] };
      }
      if (is(chunk, Name)) {
        return { sql: escapeName(chunk.value), params: [] };
      }
      if (chunk === undefined) {
        return { sql: "", params: [] };
      }
      if (Array.isArray(chunk)) {
        const result = [new StringChunk("(")];
        for (const [i, p] of chunk.entries()) {
          result.push(p);
          if (i < chunk.length - 1) {
            result.push(new StringChunk(", "));
          }
        }
        result.push(new StringChunk(")"));
        return this.buildQueryFromSourceParams(result, config);
      }
      if (is(chunk, SQL)) {
        return this.buildQueryFromSourceParams(chunk.queryChunks, {
          ...config,
          inlineParams: inlineParams || chunk.shouldInlineParams
        });
      }
      if (is(chunk, Table)) {
        const schemaName = chunk[Table.Symbol.Schema];
        const tableName = chunk[Table.Symbol.Name];
        return {
          sql: schemaName === undefined ? escapeName(tableName) : escapeName(schemaName) + "." + escapeName(tableName),
          params: []
        };
      }
      if (is(chunk, Column)) {
        return { sql: escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(chunk.name), params: [] };
      }
      if (is(chunk, View)) {
        const schemaName = chunk[ViewBaseConfig].schema;
        const viewName = chunk[ViewBaseConfig].name;
        return {
          sql: schemaName === undefined ? escapeName(viewName) : escapeName(schemaName) + "." + escapeName(viewName),
          params: []
        };
      }
      if (is(chunk, Param)) {
        const mappedValue = chunk.value === null ? null : chunk.encoder.mapToDriverValue(chunk.value);
        if (is(mappedValue, SQL)) {
          return this.buildQueryFromSourceParams([mappedValue], config);
        }
        if (inlineParams) {
          return { sql: this.mapInlineParam(mappedValue, config), params: [] };
        }
        let typings;
        if (prepareTyping !== undefined) {
          typings = [prepareTyping(chunk.encoder)];
        }
        return { sql: escapeParam(paramStartIndex.value++, mappedValue), params: [mappedValue], typings };
      }
      if (is(chunk, Placeholder)) {
        return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk] };
      }
      if (is(chunk, SQL.Aliased) && chunk.fieldAlias !== undefined) {
        return { sql: escapeName(chunk.fieldAlias), params: [] };
      }
      if (is(chunk, Subquery)) {
        if (chunk._.isWith) {
          return { sql: escapeName(chunk._.alias), params: [] };
        }
        return this.buildQueryFromSourceParams([
          new StringChunk("("),
          chunk._.sql,
          new StringChunk(") "),
          new Name(chunk._.alias)
        ], config);
      }
      if (isPgEnum(chunk)) {
        if (chunk.schema) {
          return { sql: escapeName(chunk.schema) + "." + escapeName(chunk.enumName), params: [] };
        }
        return { sql: escapeName(chunk.enumName), params: [] };
      }
      if (isSQLWrapper(chunk)) {
        return this.buildQueryFromSourceParams([
          new StringChunk("("),
          chunk.getSQL(),
          new StringChunk(")")
        ], config);
      }
      if (inlineParams) {
        return { sql: this.mapInlineParam(chunk, config), params: [] };
      }
      return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk] };
    }));
  }
  mapInlineParam(chunk, { escapeString }) {
    if (chunk === null) {
      return "null";
    }
    if (typeof chunk === "number" || typeof chunk === "boolean") {
      return chunk.toString();
    }
    if (typeof chunk === "string") {
      return escapeString(chunk);
    }
    if (typeof chunk === "object") {
      const mappedValueAsString = chunk.toString();
      if (mappedValueAsString === "[object Object]") {
        return escapeString(JSON.stringify(chunk));
      }
      return escapeString(mappedValueAsString);
    }
    throw new Error("Unexpected param value: " + chunk);
  }
  getSQL() {
    return this;
  }
  as(alias) {
    if (alias === undefined) {
      return this;
    }
    return new SQL.Aliased(this, alias);
  }
  mapWith(decoder) {
    this.decoder = typeof decoder === "function" ? { mapFromDriverValue: decoder } : decoder;
    return this;
  }
  inlineParams() {
    this.shouldInlineParams = true;
    return this;
  }
  if(condition) {
    return condition ? this : undefined;
  }
}

class Name {
  constructor(value) {
    this.value = value;
  }
  static [entityKind] = "Name";
  brand;
  getSQL() {
    return new SQL([this]);
  }
}
function isDriverValueEncoder(value) {
  return typeof value === "object" && value !== null && "mapToDriverValue" in value && typeof value.mapToDriverValue === "function";
}
var noopDecoder = {
  mapFromDriverValue: (value) => value
};
var noopEncoder = {
  mapToDriverValue: (value) => value
};
var noopMapper = {
  ...noopDecoder,
  ...noopEncoder
};

class Param {
  constructor(value, encoder = noopEncoder) {
    this.value = value;
    this.encoder = encoder;
  }
  static [entityKind] = "Param";
  brand;
  getSQL() {
    return new SQL([this]);
  }
}
function sql(strings, ...params) {
  const queryChunks = [];
  if (params.length > 0 || strings.length > 0 && strings[0] !== "") {
    queryChunks.push(new StringChunk(strings[0]));
  }
  for (const [paramIndex, param2] of params.entries()) {
    queryChunks.push(param2, new StringChunk(strings[paramIndex + 1]));
  }
  return new SQL(queryChunks);
}
((sql2) => {
  function empty() {
    return new SQL([]);
  }
  sql2.empty = empty;
  function fromList(list) {
    return new SQL(list);
  }
  sql2.fromList = fromList;
  function raw2(str) {
    return new SQL([new StringChunk(str)]);
  }
  sql2.raw = raw2;
  function join(chunks, separator) {
    const result = [];
    for (const [i, chunk] of chunks.entries()) {
      if (i > 0 && separator !== undefined) {
        result.push(separator);
      }
      result.push(chunk);
    }
    return new SQL(result);
  }
  sql2.join = join;
  function identifier(value) {
    return new Name(value);
  }
  sql2.identifier = identifier;
  function placeholder2(name2) {
    return new Placeholder(name2);
  }
  sql2.placeholder = placeholder2;
  function param2(value, encoder) {
    return new Param(value, encoder);
  }
  sql2.param = param2;
})(sql || (sql = {}));
((SQL2) => {

  class Aliased {
    constructor(sql2, fieldAlias) {
      this.sql = sql2;
      this.fieldAlias = fieldAlias;
    }
    static [entityKind] = "SQL.Aliased";
    isSelectionField = false;
    getSQL() {
      return this.sql;
    }
    clone() {
      return new Aliased(this.sql, this.fieldAlias);
    }
  }
  SQL2.Aliased = Aliased;
})(SQL || (SQL = {}));

class Placeholder {
  constructor(name2) {
    this.name = name2;
  }
  static [entityKind] = "Placeholder";
  getSQL() {
    return new SQL([this]);
  }
}
function fillPlaceholders(params, values) {
  return params.map((p) => {
    if (is(p, Placeholder)) {
      if (!(p.name in values)) {
        throw new Error(`No value for placeholder "${p.name}" was provided`);
      }
      return values[p.name];
    }
    return p;
  });
}

class View {
  static [entityKind] = "View";
  [ViewBaseConfig];
  constructor({ name: name2, schema, selectedFields, query }) {
    this[ViewBaseConfig] = {
      name: name2,
      originalName: name2,
      schema,
      selectedFields,
      query,
      isExisting: !query,
      isAlias: false
    };
  }
  getSQL() {
    return new SQL([this]);
  }
}
Column.prototype.getSQL = function() {
  return new SQL([this]);
};
Table.prototype.getSQL = function() {
  return new SQL([this]);
};
Subquery.prototype.getSQL = function() {
  return new SQL([this]);
};

// ../../node_modules/drizzle-orm/alias.js
class ColumnAliasProxyHandler {
  constructor(table) {
    this.table = table;
  }
  static [entityKind] = "ColumnAliasProxyHandler";
  get(columnObj, prop) {
    if (prop === "table") {
      return this.table;
    }
    return columnObj[prop];
  }
}

class TableAliasProxyHandler {
  constructor(alias, replaceOriginalName) {
    this.alias = alias;
    this.replaceOriginalName = replaceOriginalName;
  }
  static [entityKind] = "TableAliasProxyHandler";
  get(target, prop) {
    if (prop === Table.Symbol.IsAlias) {
      return true;
    }
    if (prop === Table.Symbol.Name) {
      return this.alias;
    }
    if (this.replaceOriginalName && prop === Table.Symbol.OriginalName) {
      return this.alias;
    }
    if (prop === ViewBaseConfig) {
      return {
        ...target[ViewBaseConfig],
        name: this.alias,
        isAlias: true
      };
    }
    if (prop === Table.Symbol.Columns) {
      const columns = target[Table.Symbol.Columns];
      if (!columns) {
        return columns;
      }
      const proxiedColumns = {};
      Object.keys(columns).map((key) => {
        proxiedColumns[key] = new Proxy(columns[key], new ColumnAliasProxyHandler(new Proxy(target, this)));
      });
      return proxiedColumns;
    }
    const value = target[prop];
    if (is(value, Column)) {
      return new Proxy(value, new ColumnAliasProxyHandler(new Proxy(target, this)));
    }
    return value;
  }
}
function aliasedTable(table, tableAlias) {
  return new Proxy(table, new TableAliasProxyHandler(tableAlias, false));
}
function aliasedTableColumn(column, tableAlias) {
  return new Proxy(column, new ColumnAliasProxyHandler(new Proxy(column.table, new TableAliasProxyHandler(tableAlias, false))));
}
function mapColumnsInAliasedSQLToAlias(query, alias) {
  return new SQL.Aliased(mapColumnsInSQLToAlias(query.sql, alias), query.fieldAlias);
}
function mapColumnsInSQLToAlias(query, alias) {
  return sql.join(query.queryChunks.map((c) => {
    if (is(c, Column)) {
      return aliasedTableColumn(c, alias);
    }
    if (is(c, SQL)) {
      return mapColumnsInSQLToAlias(c, alias);
    }
    if (is(c, SQL.Aliased)) {
      return mapColumnsInAliasedSQLToAlias(c, alias);
    }
    return c;
  }));
}

// ../../node_modules/drizzle-orm/errors.js
class DrizzleError extends Error {
  static [entityKind] = "DrizzleError";
  constructor({ message, cause }) {
    super(message);
    this.name = "DrizzleError";
    this.cause = cause;
  }
}

class TransactionRollbackError extends DrizzleError {
  static [entityKind] = "TransactionRollbackError";
  constructor() {
    super({ message: "Rollback" });
  }
}

// ../../node_modules/drizzle-orm/sql/expressions/conditions.js
function bindIfParam(value, column) {
  if (isDriverValueEncoder(column) && !isSQLWrapper(value) && !is(value, Param) && !is(value, Placeholder) && !is(value, Column) && !is(value, Table) && !is(value, View)) {
    return new Param(value, column);
  }
  return value;
}
var eq = (left, right) => {
  return sql`${left} = ${bindIfParam(right, left)}`;
};
var ne = (left, right) => {
  return sql`${left} <> ${bindIfParam(right, left)}`;
};
function and(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter((c) => c !== undefined);
  if (conditions.length === 0) {
    return;
  }
  if (conditions.length === 1) {
    return new SQL(conditions);
  }
  return new SQL([
    new StringChunk("("),
    sql.join(conditions, new StringChunk(" and ")),
    new StringChunk(")")
  ]);
}
function or(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter((c) => c !== undefined);
  if (conditions.length === 0) {
    return;
  }
  if (conditions.length === 1) {
    return new SQL(conditions);
  }
  return new SQL([
    new StringChunk("("),
    sql.join(conditions, new StringChunk(" or ")),
    new StringChunk(")")
  ]);
}
function not(condition) {
  return sql`not ${condition}`;
}
var gt = (left, right) => {
  return sql`${left} > ${bindIfParam(right, left)}`;
};
var gte = (left, right) => {
  return sql`${left} >= ${bindIfParam(right, left)}`;
};
var lt = (left, right) => {
  return sql`${left} < ${bindIfParam(right, left)}`;
};
var lte = (left, right) => {
  return sql`${left} <= ${bindIfParam(right, left)}`;
};
function inArray(column, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) {
      throw new Error("inArray requires at least one value");
    }
    return sql`${column} in ${values.map((v) => bindIfParam(v, column))}`;
  }
  return sql`${column} in ${bindIfParam(values, column)}`;
}
function notInArray(column, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) {
      throw new Error("notInArray requires at least one value");
    }
    return sql`${column} not in ${values.map((v) => bindIfParam(v, column))}`;
  }
  return sql`${column} not in ${bindIfParam(values, column)}`;
}
function isNull(value) {
  return sql`${value} is null`;
}
function isNotNull(value) {
  return sql`${value} is not null`;
}
function exists(subquery) {
  return sql`exists ${subquery}`;
}
function notExists(subquery) {
  return sql`not exists ${subquery}`;
}
function between(column, min, max) {
  return sql`${column} between ${bindIfParam(min, column)} and ${bindIfParam(max, column)}`;
}
function notBetween(column, min, max) {
  return sql`${column} not between ${bindIfParam(min, column)} and ${bindIfParam(max, column)}`;
}
function like(column, value) {
  return sql`${column} like ${value}`;
}
function notLike(column, value) {
  return sql`${column} not like ${value}`;
}
function ilike(column, value) {
  return sql`${column} ilike ${value}`;
}
function notIlike(column, value) {
  return sql`${column} not ilike ${value}`;
}

// ../../node_modules/drizzle-orm/sql/expressions/select.js
function asc(column) {
  return sql`${column} asc`;
}
function desc(column) {
  return sql`${column} desc`;
}

// ../../node_modules/drizzle-orm/logger.js
class ConsoleLogWriter {
  static [entityKind] = "ConsoleLogWriter";
  write(message) {
    console.log(message);
  }
}

class DefaultLogger {
  static [entityKind] = "DefaultLogger";
  writer;
  constructor(config) {
    this.writer = config?.writer ?? new ConsoleLogWriter;
  }
  logQuery(query, params) {
    const stringifiedParams = params.map((p) => {
      try {
        return JSON.stringify(p);
      } catch {
        return String(p);
      }
    });
    const paramsStr = stringifiedParams.length ? ` -- params: [${stringifiedParams.join(", ")}]` : "";
    this.writer.write(`Query: ${query}${paramsStr}`);
  }
}

class NoopLogger {
  static [entityKind] = "NoopLogger";
  logQuery() {}
}

// ../../node_modules/drizzle-orm/query-promise.js
class QueryPromise {
  static [entityKind] = "QueryPromise";
  [Symbol.toStringTag] = "QueryPromise";
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  finally(onFinally) {
    return this.then((value) => {
      onFinally?.();
      return value;
    }, (reason) => {
      onFinally?.();
      throw reason;
    });
  }
  then(onFulfilled, onRejected) {
    return this.execute().then(onFulfilled, onRejected);
  }
}

// ../../node_modules/drizzle-orm/pg-core/primary-keys.js
class PrimaryKeyBuilder {
  static [entityKind] = "PgPrimaryKeyBuilder";
  columns;
  name;
  constructor(columns, name) {
    this.columns = columns;
    this.name = name;
  }
  build(table) {
    return new PrimaryKey(table, this.columns, this.name);
  }
}

class PrimaryKey {
  constructor(table, columns, name) {
    this.table = table;
    this.columns = columns;
    this.name = name;
  }
  static [entityKind] = "PgPrimaryKey";
  columns;
  name;
  getName() {
    return this.name ?? `${this.table[PgTable.Symbol.Name]}_${this.columns.map((column) => column.name).join("_")}_pk`;
  }
}

// ../../node_modules/drizzle-orm/relations.js
class Relation {
  constructor(sourceTable, referencedTable, relationName) {
    this.sourceTable = sourceTable;
    this.referencedTable = referencedTable;
    this.relationName = relationName;
    this.referencedTableName = referencedTable[Table.Symbol.Name];
  }
  static [entityKind] = "Relation";
  referencedTableName;
  fieldName;
}

class Relations {
  constructor(table, config) {
    this.table = table;
    this.config = config;
  }
  static [entityKind] = "Relations";
}

class One extends Relation {
  constructor(sourceTable, referencedTable, config, isNullable) {
    super(sourceTable, referencedTable, config?.relationName);
    this.config = config;
    this.isNullable = isNullable;
  }
  static [entityKind] = "One";
  withFieldName(fieldName) {
    const relation = new One(this.sourceTable, this.referencedTable, this.config, this.isNullable);
    relation.fieldName = fieldName;
    return relation;
  }
}

class Many extends Relation {
  constructor(sourceTable, referencedTable, config) {
    super(sourceTable, referencedTable, config?.relationName);
    this.config = config;
  }
  static [entityKind] = "Many";
  withFieldName(fieldName) {
    const relation = new Many(this.sourceTable, this.referencedTable, this.config);
    relation.fieldName = fieldName;
    return relation;
  }
}
function getOperators() {
  return {
    and,
    between,
    eq,
    exists,
    gt,
    gte,
    ilike,
    inArray,
    isNull,
    isNotNull,
    like,
    lt,
    lte,
    ne,
    not,
    notBetween,
    notExists,
    notLike,
    notIlike,
    notInArray,
    or,
    sql
  };
}
function getOrderByOperators() {
  return {
    sql,
    asc,
    desc
  };
}
function extractTablesRelationalConfig(schema, configHelpers) {
  if (Object.keys(schema).length === 1 && "default" in schema && !is(schema["default"], Table)) {
    schema = schema["default"];
  }
  const tableNamesMap = {};
  const relationsBuffer = {};
  const tablesConfig = {};
  for (const [key, value] of Object.entries(schema)) {
    if (isTable(value)) {
      const dbName = value[Table.Symbol.Name];
      const bufferedRelations = relationsBuffer[dbName];
      tableNamesMap[dbName] = key;
      tablesConfig[key] = {
        tsName: key,
        dbName: value[Table.Symbol.Name],
        schema: value[Table.Symbol.Schema],
        columns: value[Table.Symbol.Columns],
        relations: bufferedRelations?.relations ?? {},
        primaryKey: bufferedRelations?.primaryKey ?? []
      };
      for (const column of Object.values(value[Table.Symbol.Columns])) {
        if (column.primary) {
          tablesConfig[key].primaryKey.push(column);
        }
      }
      const extraConfig = value[Table.Symbol.ExtraConfigBuilder]?.(value);
      if (extraConfig) {
        for (const configEntry of Object.values(extraConfig)) {
          if (is(configEntry, PrimaryKeyBuilder)) {
            tablesConfig[key].primaryKey.push(...configEntry.columns);
          }
        }
      }
    } else if (is(value, Relations)) {
      const dbName = value.table[Table.Symbol.Name];
      const tableName = tableNamesMap[dbName];
      const relations2 = value.config(configHelpers(value.table));
      let primaryKey;
      for (const [relationName, relation] of Object.entries(relations2)) {
        if (tableName) {
          const tableConfig = tablesConfig[tableName];
          tableConfig.relations[relationName] = relation;
          if (primaryKey) {
            tableConfig.primaryKey.push(...primaryKey);
          }
        } else {
          if (!(dbName in relationsBuffer)) {
            relationsBuffer[dbName] = {
              relations: {},
              primaryKey
            };
          }
          relationsBuffer[dbName].relations[relationName] = relation;
        }
      }
    }
  }
  return { tables: tablesConfig, tableNamesMap };
}
function relations(table, relations2) {
  return new Relations(table, (helpers) => Object.fromEntries(Object.entries(relations2(helpers)).map(([key, value]) => [
    key,
    value.withFieldName(key)
  ])));
}
function createOne(sourceTable) {
  return function one(table, config) {
    return new One(sourceTable, table, config, config?.fields.reduce((res, f) => res && f.notNull, true) ?? false);
  };
}
function createMany(sourceTable) {
  return function many(referencedTable, config) {
    return new Many(sourceTable, referencedTable, config);
  };
}
function normalizeRelation(schema, tableNamesMap, relation) {
  if (is(relation, One) && relation.config) {
    return {
      fields: relation.config.fields,
      references: relation.config.references
    };
  }
  const referencedTableTsName = tableNamesMap[relation.referencedTable[Table.Symbol.Name]];
  if (!referencedTableTsName) {
    throw new Error(`Table "${relation.referencedTable[Table.Symbol.Name]}" not found in schema`);
  }
  const referencedTableConfig = schema[referencedTableTsName];
  if (!referencedTableConfig) {
    throw new Error(`Table "${referencedTableTsName}" not found in schema`);
  }
  const sourceTable = relation.sourceTable;
  const sourceTableTsName = tableNamesMap[sourceTable[Table.Symbol.Name]];
  if (!sourceTableTsName) {
    throw new Error(`Table "${sourceTable[Table.Symbol.Name]}" not found in schema`);
  }
  const reverseRelations = [];
  for (const referencedTableRelation of Object.values(referencedTableConfig.relations)) {
    if (relation.relationName && relation !== referencedTableRelation && referencedTableRelation.relationName === relation.relationName || !relation.relationName && referencedTableRelation.referencedTable === relation.sourceTable) {
      reverseRelations.push(referencedTableRelation);
    }
  }
  if (reverseRelations.length > 1) {
    throw relation.relationName ? new Error(`There are multiple relations with name "${relation.relationName}" in table "${referencedTableTsName}"`) : new Error(`There are multiple relations between "${referencedTableTsName}" and "${relation.sourceTable[Table.Symbol.Name]}". Please specify relation name`);
  }
  if (reverseRelations[0] && is(reverseRelations[0], One) && reverseRelations[0].config) {
    return {
      fields: reverseRelations[0].config.references,
      references: reverseRelations[0].config.fields
    };
  }
  throw new Error(`There is not enough information to infer relation "${sourceTableTsName}.${relation.fieldName}"`);
}
function createTableRelationsHelpers(sourceTable) {
  return {
    one: createOne(sourceTable),
    many: createMany(sourceTable)
  };
}
function mapRelationalRow(tablesConfig, tableConfig, row, buildQueryResultSelection, mapColumnValue = (value) => value) {
  const result = {};
  for (const [
    selectionItemIndex,
    selectionItem
  ] of buildQueryResultSelection.entries()) {
    if (selectionItem.isJson) {
      const relation = tableConfig.relations[selectionItem.tsKey];
      const rawSubRows = row[selectionItemIndex];
      const subRows = typeof rawSubRows === "string" ? JSON.parse(rawSubRows) : rawSubRows;
      result[selectionItem.tsKey] = is(relation, One) ? subRows && mapRelationalRow(tablesConfig, tablesConfig[selectionItem.relationTableTsKey], subRows, selectionItem.selection, mapColumnValue) : subRows.map((subRow) => mapRelationalRow(tablesConfig, tablesConfig[selectionItem.relationTableTsKey], subRow, selectionItem.selection, mapColumnValue));
    } else {
      const value = mapColumnValue(row[selectionItemIndex]);
      const field = selectionItem.field;
      let decoder;
      if (is(field, Column)) {
        decoder = field;
      } else if (is(field, SQL)) {
        decoder = field.decoder;
      } else {
        decoder = field.sql.decoder;
      }
      result[selectionItem.tsKey] = value === null ? null : decoder.mapFromDriverValue(value);
    }
  }
  return result;
}

// ../../node_modules/drizzle-orm/utils.js
function mapResultRow(columns, row, joinsNotNullableMap) {
  const nullifyMap = {};
  const result = columns.reduce((result2, { path, field }, columnIndex) => {
    let decoder;
    if (is(field, Column)) {
      decoder = field;
    } else if (is(field, SQL)) {
      decoder = field.decoder;
    } else {
      decoder = field.sql.decoder;
    }
    let node = result2;
    for (const [pathChunkIndex, pathChunk] of path.entries()) {
      if (pathChunkIndex < path.length - 1) {
        if (!(pathChunk in node)) {
          node[pathChunk] = {};
        }
        node = node[pathChunk];
      } else {
        const rawValue = row[columnIndex];
        const value = node[pathChunk] = rawValue === null ? null : decoder.mapFromDriverValue(rawValue);
        if (joinsNotNullableMap && is(field, Column) && path.length === 2) {
          const objectName = path[0];
          if (!(objectName in nullifyMap)) {
            nullifyMap[objectName] = value === null ? getTableName(field.table) : false;
          } else if (typeof nullifyMap[objectName] === "string" && nullifyMap[objectName] !== getTableName(field.table)) {
            nullifyMap[objectName] = false;
          }
        }
      }
    }
    return result2;
  }, {});
  if (joinsNotNullableMap && Object.keys(nullifyMap).length > 0) {
    for (const [objectName, tableName] of Object.entries(nullifyMap)) {
      if (typeof tableName === "string" && !joinsNotNullableMap[tableName]) {
        result[objectName] = null;
      }
    }
  }
  return result;
}
function orderSelectedFields(fields, pathPrefix) {
  return Object.entries(fields).reduce((result, [name, field]) => {
    if (typeof name !== "string") {
      return result;
    }
    const newPath = pathPrefix ? [...pathPrefix, name] : [name];
    if (is(field, Column) || is(field, SQL) || is(field, SQL.Aliased)) {
      result.push({ path: newPath, field });
    } else if (is(field, Table)) {
      result.push(...orderSelectedFields(field[Table.Symbol.Columns], newPath));
    } else {
      result.push(...orderSelectedFields(field, newPath));
    }
    return result;
  }, []);
}
function haveSameKeys(left, right) {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) {
    return false;
  }
  for (const [index, key] of leftKeys.entries()) {
    if (key !== rightKeys[index]) {
      return false;
    }
  }
  return true;
}
function mapUpdateSet(table, values) {
  const entries = Object.entries(values).filter(([, value]) => value !== undefined).map(([key, value]) => {
    if (is(value, SQL)) {
      return [key, value];
    } else {
      return [key, new Param(value, table[Table.Symbol.Columns][key])];
    }
  });
  if (entries.length === 0) {
    throw new Error("No values to set");
  }
  return Object.fromEntries(entries);
}
function applyMixins(baseClass, extendedClasses) {
  for (const extendedClass of extendedClasses) {
    for (const name of Object.getOwnPropertyNames(extendedClass.prototype)) {
      if (name === "constructor")
        continue;
      Object.defineProperty(baseClass.prototype, name, Object.getOwnPropertyDescriptor(extendedClass.prototype, name) || /* @__PURE__ */ Object.create(null));
    }
  }
}
function getTableColumns(table) {
  return table[Table.Symbol.Columns];
}
function getTableLikeName(table) {
  return is(table, Subquery) ? table._.alias : is(table, View) ? table[ViewBaseConfig].name : is(table, SQL) ? undefined : table[Table.Symbol.IsAlias] ? table[Table.Symbol.Name] : table[Table.Symbol.BaseName];
}

// ../../node_modules/drizzle-orm/pg-core/query-builders/delete.js
class PgDeleteBase extends QueryPromise {
  constructor(table, session, dialect, withList) {
    super();
    this.session = session;
    this.dialect = dialect;
    this.config = { table, withList };
  }
  static [entityKind] = "PgDelete";
  config;
  where(where) {
    this.config.where = where;
    return this;
  }
  returning(fields = this.config.table[Table.Symbol.Columns]) {
    this.config.returning = orderSelectedFields(fields);
    return this;
  }
  getSQL() {
    return this.dialect.buildDeleteQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
    return rest;
  }
  _prepare(name) {
    return tracer.startActiveSpan("drizzle.prepareQuery", () => {
      return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning, name, true);
    });
  }
  prepare(name) {
    return this._prepare(name);
  }
  execute = (placeholderValues) => {
    return tracer.startActiveSpan("drizzle.operation", () => {
      return this._prepare().execute(placeholderValues);
    });
  };
  $dynamic() {
    return this;
  }
}

// ../../node_modules/drizzle-orm/pg-core/query-builders/insert.js
class PgInsertBuilder {
  constructor(table, session, dialect, withList) {
    this.table = table;
    this.session = session;
    this.dialect = dialect;
    this.withList = withList;
  }
  static [entityKind] = "PgInsertBuilder";
  values(values) {
    values = Array.isArray(values) ? values : [values];
    if (values.length === 0) {
      throw new Error("values() must be called with at least one value");
    }
    const mappedValues = values.map((entry) => {
      const result = {};
      const cols = this.table[Table.Symbol.Columns];
      for (const colKey of Object.keys(entry)) {
        const colValue = entry[colKey];
        result[colKey] = is(colValue, SQL) ? colValue : new Param(colValue, cols[colKey]);
      }
      return result;
    });
    return new PgInsertBase(this.table, mappedValues, this.session, this.dialect, this.withList);
  }
}

class PgInsertBase extends QueryPromise {
  constructor(table, values, session, dialect, withList) {
    super();
    this.session = session;
    this.dialect = dialect;
    this.config = { table, values, withList };
  }
  static [entityKind] = "PgInsert";
  config;
  returning(fields = this.config.table[Table.Symbol.Columns]) {
    this.config.returning = orderSelectedFields(fields);
    return this;
  }
  onConflictDoNothing(config = {}) {
    if (config.target === undefined) {
      this.config.onConflict = sql`do nothing`;
    } else {
      let targetColumn = "";
      targetColumn = Array.isArray(config.target) ? config.target.map((it) => this.dialect.escapeName(it.name)).join(",") : this.dialect.escapeName(config.target.name);
      const whereSql = config.where ? sql` where ${config.where}` : undefined;
      this.config.onConflict = sql`(${sql.raw(targetColumn)})${whereSql} do nothing`;
    }
    return this;
  }
  onConflictDoUpdate(config) {
    if (config.where && (config.targetWhere || config.setWhere)) {
      throw new Error('You cannot use both "where" and "targetWhere"/"setWhere" at the same time - "where" is deprecated, use "targetWhere" or "setWhere" instead.');
    }
    const whereSql = config.where ? sql` where ${config.where}` : undefined;
    const targetWhereSql = config.targetWhere ? sql` where ${config.targetWhere}` : undefined;
    const setWhereSql = config.setWhere ? sql` where ${config.setWhere}` : undefined;
    const setSql = this.dialect.buildUpdateSet(this.config.table, mapUpdateSet(this.config.table, config.set));
    let targetColumn = "";
    targetColumn = Array.isArray(config.target) ? config.target.map((it) => this.dialect.escapeName(it.name)).join(",") : this.dialect.escapeName(config.target.name);
    this.config.onConflict = sql`(${sql.raw(targetColumn)})${targetWhereSql} do update set ${setSql}${whereSql}${setWhereSql}`;
    return this;
  }
  getSQL() {
    return this.dialect.buildInsertQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
    return rest;
  }
  _prepare(name) {
    return tracer.startActiveSpan("drizzle.prepareQuery", () => {
      return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning, name, true);
    });
  }
  prepare(name) {
    return this._prepare(name);
  }
  execute = (placeholderValues) => {
    return tracer.startActiveSpan("drizzle.operation", () => {
      return this._prepare().execute(placeholderValues);
    });
  };
  $dynamic() {
    return this;
  }
}

// ../../node_modules/drizzle-orm/pg-core/columns/bigint.js
class PgBigInt53Builder extends PgColumnBuilder {
  static [entityKind] = "PgBigInt53Builder";
  constructor(name) {
    super(name, "number", "PgBigInt53");
  }
  build(table) {
    return new PgBigInt53(table, this.config);
  }
}

class PgBigInt53 extends PgColumn {
  static [entityKind] = "PgBigInt53";
  getSQLType() {
    return "bigint";
  }
  mapFromDriverValue(value) {
    if (typeof value === "number") {
      return value;
    }
    return Number(value);
  }
}

class PgBigInt64Builder extends PgColumnBuilder {
  static [entityKind] = "PgBigInt64Builder";
  constructor(name) {
    super(name, "bigint", "PgBigInt64");
  }
  build(table) {
    return new PgBigInt64(table, this.config);
  }
}

class PgBigInt64 extends PgColumn {
  static [entityKind] = "PgBigInt64";
  getSQLType() {
    return "bigint";
  }
  mapFromDriverValue(value) {
    return BigInt(value);
  }
}
function bigint(name, config) {
  if (config.mode === "number") {
    return new PgBigInt53Builder(name);
  }
  return new PgBigInt64Builder(name);
}

// ../../node_modules/drizzle-orm/pg-core/columns/boolean.js
class PgBooleanBuilder extends PgColumnBuilder {
  static [entityKind] = "PgBooleanBuilder";
  constructor(name) {
    super(name, "boolean", "PgBoolean");
  }
  build(table) {
    return new PgBoolean(table, this.config);
  }
}

class PgBoolean extends PgColumn {
  static [entityKind] = "PgBoolean";
  getSQLType() {
    return "boolean";
  }
}
function boolean(name) {
  return new PgBooleanBuilder(name);
}

// ../../node_modules/drizzle-orm/pg-core/columns/date.common.js
class PgDateColumnBaseBuilder extends PgColumnBuilder {
  static [entityKind] = "PgDateColumnBaseBuilder";
  defaultNow() {
    return this.default(sql`now()`);
  }
}

// ../../node_modules/drizzle-orm/pg-core/columns/date.js
class PgDate extends PgColumn {
  static [entityKind] = "PgDate";
  getSQLType() {
    return "date";
  }
  mapFromDriverValue(value) {
    return new Date(value);
  }
  mapToDriverValue(value) {
    return value.toISOString();
  }
}
class PgDateString extends PgColumn {
  static [entityKind] = "PgDateString";
  getSQLType() {
    return "date";
  }
}

// ../../node_modules/drizzle-orm/pg-core/columns/json.js
class PgJson extends PgColumn {
  static [entityKind] = "PgJson";
  constructor(table, config) {
    super(table, config);
  }
  getSQLType() {
    return "json";
  }
  mapToDriverValue(value) {
    return JSON.stringify(value);
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  }
}

// ../../node_modules/drizzle-orm/pg-core/columns/jsonb.js
class PgJsonbBuilder extends PgColumnBuilder {
  static [entityKind] = "PgJsonbBuilder";
  constructor(name) {
    super(name, "json", "PgJsonb");
  }
  build(table) {
    return new PgJsonb(table, this.config);
  }
}

class PgJsonb extends PgColumn {
  static [entityKind] = "PgJsonb";
  constructor(table, config) {
    super(table, config);
  }
  getSQLType() {
    return "jsonb";
  }
  mapToDriverValue(value) {
    return JSON.stringify(value);
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  }
}
function jsonb(name) {
  return new PgJsonbBuilder(name);
}

// ../../node_modules/drizzle-orm/pg-core/columns/numeric.js
class PgNumericBuilder extends PgColumnBuilder {
  static [entityKind] = "PgNumericBuilder";
  constructor(name, precision, scale) {
    super(name, "string", "PgNumeric");
    this.config.precision = precision;
    this.config.scale = scale;
  }
  build(table) {
    return new PgNumeric(table, this.config);
  }
}

class PgNumeric extends PgColumn {
  static [entityKind] = "PgNumeric";
  precision;
  scale;
  constructor(table, config) {
    super(table, config);
    this.precision = config.precision;
    this.scale = config.scale;
  }
  getSQLType() {
    if (this.precision !== undefined && this.scale !== undefined) {
      return `numeric(${this.precision}, ${this.scale})`;
    } else if (this.precision === undefined) {
      return "numeric";
    } else {
      return `numeric(${this.precision})`;
    }
  }
}
function numeric(name, config) {
  return new PgNumericBuilder(name, config?.precision, config?.scale);
}
var decimal = numeric;

// ../../node_modules/drizzle-orm/pg-core/columns/text.js
class PgTextBuilder extends PgColumnBuilder {
  static [entityKind] = "PgTextBuilder";
  constructor(name, config) {
    super(name, "string", "PgText");
    this.config.enumValues = config.enum;
  }
  build(table) {
    return new PgText(table, this.config);
  }
}

class PgText extends PgColumn {
  static [entityKind] = "PgText";
  enumValues = this.config.enumValues;
  getSQLType() {
    return "text";
  }
}
function text(name, config = {}) {
  return new PgTextBuilder(name, config);
}

// ../../node_modules/drizzle-orm/pg-core/columns/time.js
class PgTime extends PgColumn {
  static [entityKind] = "PgTime";
  withTimezone;
  precision;
  constructor(table, config) {
    super(table, config);
    this.withTimezone = config.withTimezone;
    this.precision = config.precision;
  }
  getSQLType() {
    const precision = this.precision === undefined ? "" : `(${this.precision})`;
    return `time${precision}${this.withTimezone ? " with time zone" : ""}`;
  }
}

// ../../node_modules/drizzle-orm/pg-core/columns/timestamp.js
class PgTimestampBuilder extends PgDateColumnBaseBuilder {
  static [entityKind] = "PgTimestampBuilder";
  constructor(name, withTimezone, precision) {
    super(name, "date", "PgTimestamp");
    this.config.withTimezone = withTimezone;
    this.config.precision = precision;
  }
  build(table) {
    return new PgTimestamp(table, this.config);
  }
}

class PgTimestamp extends PgColumn {
  static [entityKind] = "PgTimestamp";
  withTimezone;
  precision;
  constructor(table, config) {
    super(table, config);
    this.withTimezone = config.withTimezone;
    this.precision = config.precision;
  }
  getSQLType() {
    const precision = this.precision === undefined ? "" : ` (${this.precision})`;
    return `timestamp${precision}${this.withTimezone ? " with time zone" : ""}`;
  }
  mapFromDriverValue = (value) => {
    return new Date(this.withTimezone ? value : value + "+0000");
  };
  mapToDriverValue = (value) => {
    return value.toISOString();
  };
}

class PgTimestampStringBuilder extends PgDateColumnBaseBuilder {
  static [entityKind] = "PgTimestampStringBuilder";
  constructor(name, withTimezone, precision) {
    super(name, "string", "PgTimestampString");
    this.config.withTimezone = withTimezone;
    this.config.precision = precision;
  }
  build(table) {
    return new PgTimestampString(table, this.config);
  }
}

class PgTimestampString extends PgColumn {
  static [entityKind] = "PgTimestampString";
  withTimezone;
  precision;
  constructor(table, config) {
    super(table, config);
    this.withTimezone = config.withTimezone;
    this.precision = config.precision;
  }
  getSQLType() {
    const precision = this.precision === undefined ? "" : `(${this.precision})`;
    return `timestamp${precision}${this.withTimezone ? " with time zone" : ""}`;
  }
}
function timestamp(name, config = {}) {
  if (config.mode === "string") {
    return new PgTimestampStringBuilder(name, config.withTimezone ?? false, config.precision);
  }
  return new PgTimestampBuilder(name, config.withTimezone ?? false, config.precision);
}

// ../../node_modules/drizzle-orm/pg-core/columns/uuid.js
class PgUUIDBuilder extends PgColumnBuilder {
  static [entityKind] = "PgUUIDBuilder";
  constructor(name) {
    super(name, "string", "PgUUID");
  }
  defaultRandom() {
    return this.default(sql`gen_random_uuid()`);
  }
  build(table) {
    return new PgUUID(table, this.config);
  }
}

class PgUUID extends PgColumn {
  static [entityKind] = "PgUUID";
  getSQLType() {
    return "uuid";
  }
}
function uuid(name) {
  return new PgUUIDBuilder(name);
}

// ../../node_modules/drizzle-orm/pg-core/columns/varchar.js
class PgVarcharBuilder extends PgColumnBuilder {
  static [entityKind] = "PgVarcharBuilder";
  constructor(name, config) {
    super(name, "string", "PgVarchar");
    this.config.length = config.length;
    this.config.enumValues = config.enum;
  }
  build(table) {
    return new PgVarchar(table, this.config);
  }
}

class PgVarchar extends PgColumn {
  static [entityKind] = "PgVarchar";
  length = this.config.length;
  enumValues = this.config.enumValues;
  getSQLType() {
    return this.length === undefined ? `varchar` : `varchar(${this.length})`;
  }
}
function varchar(name, config = {}) {
  return new PgVarcharBuilder(name, config);
}

// ../../node_modules/drizzle-orm/pg-core/view-base.js
class PgViewBase extends View {
  static [entityKind] = "PgViewBase";
}

// ../../node_modules/drizzle-orm/pg-core/dialect.js
class PgDialect {
  static [entityKind] = "PgDialect";
  async migrate(migrations, session, config) {
    const migrationsTable = typeof config === "string" ? "__drizzle_migrations" : config.migrationsTable ?? "__drizzle_migrations";
    const migrationsSchema = typeof config === "string" ? "drizzle" : config.migrationsSchema ?? "drizzle";
    const migrationTableCreate = sql`
			CREATE TABLE IF NOT EXISTS ${sql.identifier(migrationsSchema)}.${sql.identifier(migrationsTable)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at bigint
			)
		`;
    await session.execute(sql`CREATE SCHEMA IF NOT EXISTS ${sql.identifier(migrationsSchema)}`);
    await session.execute(migrationTableCreate);
    const dbMigrations = await session.all(sql`select id, hash, created_at from ${sql.identifier(migrationsSchema)}.${sql.identifier(migrationsTable)} order by created_at desc limit 1`);
    const lastDbMigration = dbMigrations[0];
    await session.transaction(async (tx) => {
      for await (const migration of migrations) {
        if (!lastDbMigration || Number(lastDbMigration.created_at) < migration.folderMillis) {
          for (const stmt of migration.sql) {
            await tx.execute(sql.raw(stmt));
          }
          await tx.execute(sql`insert into ${sql.identifier(migrationsSchema)}.${sql.identifier(migrationsTable)} ("hash", "created_at") values(${migration.hash}, ${migration.folderMillis})`);
        }
      }
    });
  }
  escapeName(name) {
    return `"${name}"`;
  }
  escapeParam(num) {
    return `$${num + 1}`;
  }
  escapeString(str) {
    return `'${str.replace(/'/g, "''")}'`;
  }
  buildWithCTE(queries) {
    if (!queries?.length)
      return;
    const withSqlChunks = [sql`with `];
    for (const [i, w] of queries.entries()) {
      withSqlChunks.push(sql`${sql.identifier(w._.alias)} as (${w._.sql})`);
      if (i < queries.length - 1) {
        withSqlChunks.push(sql`, `);
      }
    }
    withSqlChunks.push(sql` `);
    return sql.join(withSqlChunks);
  }
  buildDeleteQuery({ table, where, returning, withList }) {
    const withSql = this.buildWithCTE(withList);
    const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : undefined;
    const whereSql = where ? sql` where ${where}` : undefined;
    return sql`${withSql}delete from ${table}${whereSql}${returningSql}`;
  }
  buildUpdateSet(table, set) {
    const tableColumns = table[Table.Symbol.Columns];
    const columnNames = Object.keys(tableColumns).filter((colName) => set[colName] !== undefined || tableColumns[colName]?.onUpdateFn !== undefined);
    const setSize = columnNames.length;
    return sql.join(columnNames.flatMap((colName, i) => {
      const col = tableColumns[colName];
      const value = set[colName] ?? sql.param(col.onUpdateFn(), col);
      const res = sql`${sql.identifier(col.name)} = ${value}`;
      if (i < setSize - 1) {
        return [res, sql.raw(", ")];
      }
      return [res];
    }));
  }
  buildUpdateQuery({ table, set, where, returning, withList }) {
    const withSql = this.buildWithCTE(withList);
    const setSql = this.buildUpdateSet(table, set);
    const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : undefined;
    const whereSql = where ? sql` where ${where}` : undefined;
    return sql`${withSql}update ${table} set ${setSql}${whereSql}${returningSql}`;
  }
  buildSelection(fields, { isSingleTable = false } = {}) {
    const columnsLen = fields.length;
    const chunks = fields.flatMap(({ field }, i) => {
      const chunk = [];
      if (is(field, SQL.Aliased) && field.isSelectionField) {
        chunk.push(sql.identifier(field.fieldAlias));
      } else if (is(field, SQL.Aliased) || is(field, SQL)) {
        const query = is(field, SQL.Aliased) ? field.sql : field;
        if (isSingleTable) {
          chunk.push(new SQL(query.queryChunks.map((c) => {
            if (is(c, PgColumn)) {
              return sql.identifier(c.name);
            }
            return c;
          })));
        } else {
          chunk.push(query);
        }
        if (is(field, SQL.Aliased)) {
          chunk.push(sql` as ${sql.identifier(field.fieldAlias)}`);
        }
      } else if (is(field, Column)) {
        if (isSingleTable) {
          chunk.push(sql.identifier(field.name));
        } else {
          chunk.push(field);
        }
      }
      if (i < columnsLen - 1) {
        chunk.push(sql`, `);
      }
      return chunk;
    });
    return sql.join(chunks);
  }
  buildSelectQuery({
    withList,
    fields,
    fieldsFlat,
    where,
    having,
    table,
    joins,
    orderBy,
    groupBy,
    limit,
    offset,
    lockingClause,
    distinct,
    setOperators
  }) {
    const fieldsList = fieldsFlat ?? orderSelectedFields(fields);
    for (const f of fieldsList) {
      if (is(f.field, Column) && getTableName(f.field.table) !== (is(table, Subquery) ? table._.alias : is(table, PgViewBase) ? table[ViewBaseConfig].name : is(table, SQL) ? undefined : getTableName(table)) && !((table2) => joins?.some(({ alias }) => alias === (table2[Table.Symbol.IsAlias] ? getTableName(table2) : table2[Table.Symbol.BaseName])))(f.field.table)) {
        const tableName = getTableName(f.field.table);
        throw new Error(`Your "${f.path.join("->")}" field references a column "${tableName}"."${f.field.name}", but the table "${tableName}" is not part of the query! Did you forget to join it?`);
      }
    }
    const isSingleTable = !joins || joins.length === 0;
    const withSql = this.buildWithCTE(withList);
    let distinctSql;
    if (distinct) {
      distinctSql = distinct === true ? sql` distinct` : sql` distinct on (${sql.join(distinct.on, sql`, `)})`;
    }
    const selection = this.buildSelection(fieldsList, { isSingleTable });
    const tableSql = (() => {
      if (is(table, Table) && table[Table.Symbol.OriginalName] !== table[Table.Symbol.Name]) {
        let fullName = sql`${sql.identifier(table[Table.Symbol.OriginalName])}`;
        if (table[Table.Symbol.Schema]) {
          fullName = sql`${sql.identifier(table[Table.Symbol.Schema])}.${fullName}`;
        }
        return sql`${fullName} ${sql.identifier(table[Table.Symbol.Name])}`;
      }
      return table;
    })();
    const joinsArray = [];
    if (joins) {
      for (const [index, joinMeta] of joins.entries()) {
        if (index === 0) {
          joinsArray.push(sql` `);
        }
        const table2 = joinMeta.table;
        const lateralSql = joinMeta.lateral ? sql` lateral` : undefined;
        if (is(table2, PgTable)) {
          const tableName = table2[PgTable.Symbol.Name];
          const tableSchema = table2[PgTable.Symbol.Schema];
          const origTableName = table2[PgTable.Symbol.OriginalName];
          const alias = tableName === origTableName ? undefined : joinMeta.alias;
          joinsArray.push(sql`${sql.raw(joinMeta.joinType)} join${lateralSql} ${tableSchema ? sql`${sql.identifier(tableSchema)}.` : undefined}${sql.identifier(origTableName)}${alias && sql` ${sql.identifier(alias)}`} on ${joinMeta.on}`);
        } else if (is(table2, View)) {
          const viewName = table2[ViewBaseConfig].name;
          const viewSchema = table2[ViewBaseConfig].schema;
          const origViewName = table2[ViewBaseConfig].originalName;
          const alias = viewName === origViewName ? undefined : joinMeta.alias;
          joinsArray.push(sql`${sql.raw(joinMeta.joinType)} join${lateralSql} ${viewSchema ? sql`${sql.identifier(viewSchema)}.` : undefined}${sql.identifier(origViewName)}${alias && sql` ${sql.identifier(alias)}`} on ${joinMeta.on}`);
        } else {
          joinsArray.push(sql`${sql.raw(joinMeta.joinType)} join${lateralSql} ${table2} on ${joinMeta.on}`);
        }
        if (index < joins.length - 1) {
          joinsArray.push(sql` `);
        }
      }
    }
    const joinsSql = sql.join(joinsArray);
    const whereSql = where ? sql` where ${where}` : undefined;
    const havingSql = having ? sql` having ${having}` : undefined;
    let orderBySql;
    if (orderBy && orderBy.length > 0) {
      orderBySql = sql` order by ${sql.join(orderBy, sql`, `)}`;
    }
    let groupBySql;
    if (groupBy && groupBy.length > 0) {
      groupBySql = sql` group by ${sql.join(groupBy, sql`, `)}`;
    }
    const limitSql = limit ? sql` limit ${limit}` : undefined;
    const offsetSql = offset ? sql` offset ${offset}` : undefined;
    const lockingClauseSql = sql.empty();
    if (lockingClause) {
      const clauseSql = sql` for ${sql.raw(lockingClause.strength)}`;
      if (lockingClause.config.of) {
        clauseSql.append(sql` of ${sql.join(Array.isArray(lockingClause.config.of) ? lockingClause.config.of : [lockingClause.config.of], sql`, `)}`);
      }
      if (lockingClause.config.noWait) {
        clauseSql.append(sql` no wait`);
      } else if (lockingClause.config.skipLocked) {
        clauseSql.append(sql` skip locked`);
      }
      lockingClauseSql.append(clauseSql);
    }
    const finalQuery = sql`${withSql}select${distinctSql} ${selection} from ${tableSql}${joinsSql}${whereSql}${groupBySql}${havingSql}${orderBySql}${limitSql}${offsetSql}${lockingClauseSql}`;
    if (setOperators.length > 0) {
      return this.buildSetOperations(finalQuery, setOperators);
    }
    return finalQuery;
  }
  buildSetOperations(leftSelect, setOperators) {
    const [setOperator, ...rest] = setOperators;
    if (!setOperator) {
      throw new Error("Cannot pass undefined values to any set operator");
    }
    if (rest.length === 0) {
      return this.buildSetOperationQuery({ leftSelect, setOperator });
    }
    return this.buildSetOperations(this.buildSetOperationQuery({ leftSelect, setOperator }), rest);
  }
  buildSetOperationQuery({
    leftSelect,
    setOperator: { type, isAll, rightSelect, limit, orderBy, offset }
  }) {
    const leftChunk = sql`(${leftSelect.getSQL()}) `;
    const rightChunk = sql`(${rightSelect.getSQL()})`;
    let orderBySql;
    if (orderBy && orderBy.length > 0) {
      const orderByValues = [];
      for (const singleOrderBy of orderBy) {
        if (is(singleOrderBy, PgColumn)) {
          orderByValues.push(sql.identifier(singleOrderBy.name));
        } else if (is(singleOrderBy, SQL)) {
          for (let i = 0;i < singleOrderBy.queryChunks.length; i++) {
            const chunk = singleOrderBy.queryChunks[i];
            if (is(chunk, PgColumn)) {
              singleOrderBy.queryChunks[i] = sql.identifier(chunk.name);
            }
          }
          orderByValues.push(sql`${singleOrderBy}`);
        } else {
          orderByValues.push(sql`${singleOrderBy}`);
        }
      }
      orderBySql = sql` order by ${sql.join(orderByValues, sql`, `)} `;
    }
    const limitSql = limit ? sql` limit ${limit}` : undefined;
    const operatorChunk = sql.raw(`${type} ${isAll ? "all " : ""}`);
    const offsetSql = offset ? sql` offset ${offset}` : undefined;
    return sql`${leftChunk}${operatorChunk}${rightChunk}${orderBySql}${limitSql}${offsetSql}`;
  }
  buildInsertQuery({ table, values, onConflict, returning, withList }) {
    const valuesSqlList = [];
    const columns = table[Table.Symbol.Columns];
    const colEntries = Object.entries(columns);
    const insertOrder = colEntries.map(([, column]) => sql.identifier(column.name));
    for (const [valueIndex, value] of values.entries()) {
      const valueList = [];
      for (const [fieldName, col] of colEntries) {
        const colValue = value[fieldName];
        if (colValue === undefined || is(colValue, Param) && colValue.value === undefined) {
          if (col.defaultFn !== undefined) {
            const defaultFnResult = col.defaultFn();
            const defaultValue = is(defaultFnResult, SQL) ? defaultFnResult : sql.param(defaultFnResult, col);
            valueList.push(defaultValue);
          } else if (!col.default && col.onUpdateFn !== undefined) {
            const onUpdateFnResult = col.onUpdateFn();
            const newValue = is(onUpdateFnResult, SQL) ? onUpdateFnResult : sql.param(onUpdateFnResult, col);
            valueList.push(newValue);
          } else {
            valueList.push(sql`default`);
          }
        } else {
          valueList.push(colValue);
        }
      }
      valuesSqlList.push(valueList);
      if (valueIndex < values.length - 1) {
        valuesSqlList.push(sql`, `);
      }
    }
    const withSql = this.buildWithCTE(withList);
    const valuesSql = sql.join(valuesSqlList);
    const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : undefined;
    const onConflictSql = onConflict ? sql` on conflict ${onConflict}` : undefined;
    return sql`${withSql}insert into ${table} ${insertOrder} values ${valuesSql}${onConflictSql}${returningSql}`;
  }
  buildRefreshMaterializedViewQuery({ view, concurrently, withNoData }) {
    const concurrentlySql = concurrently ? sql` concurrently` : undefined;
    const withNoDataSql = withNoData ? sql` with no data` : undefined;
    return sql`refresh materialized view${concurrentlySql} ${view}${withNoDataSql}`;
  }
  prepareTyping(encoder) {
    if (is(encoder, PgJsonb) || is(encoder, PgJson)) {
      return "json";
    } else if (is(encoder, PgNumeric)) {
      return "decimal";
    } else if (is(encoder, PgTime)) {
      return "time";
    } else if (is(encoder, PgTimestamp) || is(encoder, PgTimestampString)) {
      return "timestamp";
    } else if (is(encoder, PgDate) || is(encoder, PgDateString)) {
      return "date";
    } else if (is(encoder, PgUUID)) {
      return "uuid";
    } else {
      return "none";
    }
  }
  sqlToQuery(sql2) {
    return sql2.toQuery({
      escapeName: this.escapeName,
      escapeParam: this.escapeParam,
      escapeString: this.escapeString,
      prepareTyping: this.prepareTyping
    });
  }
  buildRelationalQueryWithoutPK({
    fullSchema,
    schema,
    tableNamesMap,
    table,
    tableConfig,
    queryConfig: config,
    tableAlias,
    nestedQueryRelation,
    joinOn
  }) {
    let selection = [];
    let limit, offset, orderBy = [], where;
    const joins = [];
    if (config === true) {
      const selectionEntries = Object.entries(tableConfig.columns);
      selection = selectionEntries.map(([key, value]) => ({
        dbKey: value.name,
        tsKey: key,
        field: aliasedTableColumn(value, tableAlias),
        relationTableTsKey: undefined,
        isJson: false,
        selection: []
      }));
    } else {
      const aliasedColumns = Object.fromEntries(Object.entries(tableConfig.columns).map(([key, value]) => [key, aliasedTableColumn(value, tableAlias)]));
      if (config.where) {
        const whereSql = typeof config.where === "function" ? config.where(aliasedColumns, getOperators()) : config.where;
        where = whereSql && mapColumnsInSQLToAlias(whereSql, tableAlias);
      }
      const fieldsSelection = [];
      let selectedColumns = [];
      if (config.columns) {
        let isIncludeMode = false;
        for (const [field, value] of Object.entries(config.columns)) {
          if (value === undefined) {
            continue;
          }
          if (field in tableConfig.columns) {
            if (!isIncludeMode && value === true) {
              isIncludeMode = true;
            }
            selectedColumns.push(field);
          }
        }
        if (selectedColumns.length > 0) {
          selectedColumns = isIncludeMode ? selectedColumns.filter((c) => config.columns?.[c] === true) : Object.keys(tableConfig.columns).filter((key) => !selectedColumns.includes(key));
        }
      } else {
        selectedColumns = Object.keys(tableConfig.columns);
      }
      for (const field of selectedColumns) {
        const column = tableConfig.columns[field];
        fieldsSelection.push({ tsKey: field, value: column });
      }
      let selectedRelations = [];
      if (config.with) {
        selectedRelations = Object.entries(config.with).filter((entry) => !!entry[1]).map(([tsKey, queryConfig]) => ({ tsKey, queryConfig, relation: tableConfig.relations[tsKey] }));
      }
      let extras;
      if (config.extras) {
        extras = typeof config.extras === "function" ? config.extras(aliasedColumns, { sql }) : config.extras;
        for (const [tsKey, value] of Object.entries(extras)) {
          fieldsSelection.push({
            tsKey,
            value: mapColumnsInAliasedSQLToAlias(value, tableAlias)
          });
        }
      }
      for (const { tsKey, value } of fieldsSelection) {
        selection.push({
          dbKey: is(value, SQL.Aliased) ? value.fieldAlias : tableConfig.columns[tsKey].name,
          tsKey,
          field: is(value, Column) ? aliasedTableColumn(value, tableAlias) : value,
          relationTableTsKey: undefined,
          isJson: false,
          selection: []
        });
      }
      let orderByOrig = typeof config.orderBy === "function" ? config.orderBy(aliasedColumns, getOrderByOperators()) : config.orderBy ?? [];
      if (!Array.isArray(orderByOrig)) {
        orderByOrig = [orderByOrig];
      }
      orderBy = orderByOrig.map((orderByValue) => {
        if (is(orderByValue, Column)) {
          return aliasedTableColumn(orderByValue, tableAlias);
        }
        return mapColumnsInSQLToAlias(orderByValue, tableAlias);
      });
      limit = config.limit;
      offset = config.offset;
      for (const {
        tsKey: selectedRelationTsKey,
        queryConfig: selectedRelationConfigValue,
        relation
      } of selectedRelations) {
        const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
        const relationTableName = relation.referencedTable[Table.Symbol.Name];
        const relationTableTsName = tableNamesMap[relationTableName];
        const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
        const joinOn2 = and(...normalizedRelation.fields.map((field2, i) => eq(aliasedTableColumn(normalizedRelation.references[i], relationTableAlias), aliasedTableColumn(field2, tableAlias))));
        const builtRelation = this.buildRelationalQueryWithoutPK({
          fullSchema,
          schema,
          tableNamesMap,
          table: fullSchema[relationTableTsName],
          tableConfig: schema[relationTableTsName],
          queryConfig: is(relation, One) ? selectedRelationConfigValue === true ? { limit: 1 } : { ...selectedRelationConfigValue, limit: 1 } : selectedRelationConfigValue,
          tableAlias: relationTableAlias,
          joinOn: joinOn2,
          nestedQueryRelation: relation
        });
        const field = sql`${sql.identifier(relationTableAlias)}.${sql.identifier("data")}`.as(selectedRelationTsKey);
        joins.push({
          on: sql`true`,
          table: new Subquery(builtRelation.sql, {}, relationTableAlias),
          alias: relationTableAlias,
          joinType: "left",
          lateral: true
        });
        selection.push({
          dbKey: selectedRelationTsKey,
          tsKey: selectedRelationTsKey,
          field,
          relationTableTsKey: relationTableTsName,
          isJson: true,
          selection: builtRelation.selection
        });
      }
    }
    if (selection.length === 0) {
      throw new DrizzleError({ message: `No fields selected for table "${tableConfig.tsName}" ("${tableAlias}")` });
    }
    let result;
    where = and(joinOn, where);
    if (nestedQueryRelation) {
      let field = sql`json_build_array(${sql.join(selection.map(({ field: field2, tsKey, isJson }) => isJson ? sql`${sql.identifier(`${tableAlias}_${tsKey}`)}.${sql.identifier("data")}` : is(field2, SQL.Aliased) ? field2.sql : field2), sql`, `)})`;
      if (is(nestedQueryRelation, Many)) {
        field = sql`coalesce(json_agg(${field}${orderBy.length > 0 ? sql` order by ${sql.join(orderBy, sql`, `)}` : undefined}), '[]'::json)`;
      }
      const nestedSelection = [{
        dbKey: "data",
        tsKey: "data",
        field: field.as("data"),
        isJson: true,
        relationTableTsKey: tableConfig.tsName,
        selection
      }];
      const needsSubquery = limit !== undefined || offset !== undefined || orderBy.length > 0;
      if (needsSubquery) {
        result = this.buildSelectQuery({
          table: aliasedTable(table, tableAlias),
          fields: {},
          fieldsFlat: [{
            path: [],
            field: sql.raw("*")
          }],
          where,
          limit,
          offset,
          orderBy,
          setOperators: []
        });
        where = undefined;
        limit = undefined;
        offset = undefined;
        orderBy = [];
      } else {
        result = aliasedTable(table, tableAlias);
      }
      result = this.buildSelectQuery({
        table: is(result, PgTable) ? result : new Subquery(result, {}, tableAlias),
        fields: {},
        fieldsFlat: nestedSelection.map(({ field: field2 }) => ({
          path: [],
          field: is(field2, Column) ? aliasedTableColumn(field2, tableAlias) : field2
        })),
        joins,
        where,
        limit,
        offset,
        orderBy,
        setOperators: []
      });
    } else {
      result = this.buildSelectQuery({
        table: aliasedTable(table, tableAlias),
        fields: {},
        fieldsFlat: selection.map(({ field }) => ({
          path: [],
          field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field
        })),
        joins,
        where,
        limit,
        offset,
        orderBy,
        setOperators: []
      });
    }
    return {
      tableTsKey: tableConfig.tsName,
      sql: result,
      selection
    };
  }
}

// ../../node_modules/drizzle-orm/selection-proxy.js
class SelectionProxyHandler {
  static [entityKind] = "SelectionProxyHandler";
  config;
  constructor(config) {
    this.config = { ...config };
  }
  get(subquery, prop) {
    if (prop === "_") {
      return {
        ...subquery["_"],
        selectedFields: new Proxy(subquery._.selectedFields, this)
      };
    }
    if (prop === ViewBaseConfig) {
      return {
        ...subquery[ViewBaseConfig],
        selectedFields: new Proxy(subquery[ViewBaseConfig].selectedFields, this)
      };
    }
    if (typeof prop === "symbol") {
      return subquery[prop];
    }
    const columns = is(subquery, Subquery) ? subquery._.selectedFields : is(subquery, View) ? subquery[ViewBaseConfig].selectedFields : subquery;
    const value = columns[prop];
    if (is(value, SQL.Aliased)) {
      if (this.config.sqlAliasedBehavior === "sql" && !value.isSelectionField) {
        return value.sql;
      }
      const newValue = value.clone();
      newValue.isSelectionField = true;
      return newValue;
    }
    if (is(value, SQL)) {
      if (this.config.sqlBehavior === "sql") {
        return value;
      }
      throw new Error(`You tried to reference "${prop}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`);
    }
    if (is(value, Column)) {
      if (this.config.alias) {
        return new Proxy(value, new ColumnAliasProxyHandler(new Proxy(value.table, new TableAliasProxyHandler(this.config.alias, this.config.replaceOriginalName ?? false))));
      }
      return value;
    }
    if (typeof value !== "object" || value === null) {
      return value;
    }
    return new Proxy(value, new SelectionProxyHandler(this.config));
  }
}

// ../../node_modules/drizzle-orm/query-builders/query-builder.js
class TypedQueryBuilder {
  static [entityKind] = "TypedQueryBuilder";
  getSelectedFields() {
    return this._.selectedFields;
  }
}

// ../../node_modules/drizzle-orm/pg-core/query-builders/select.js
class PgSelectBuilder {
  static [entityKind] = "PgSelectBuilder";
  fields;
  session;
  dialect;
  withList = [];
  distinct;
  constructor(config) {
    this.fields = config.fields;
    this.session = config.session;
    this.dialect = config.dialect;
    if (config.withList) {
      this.withList = config.withList;
    }
    this.distinct = config.distinct;
  }
  from(source) {
    const isPartialSelect = !!this.fields;
    let fields;
    if (this.fields) {
      fields = this.fields;
    } else if (is(source, Subquery)) {
      fields = Object.fromEntries(Object.keys(source._.selectedFields).map((key) => [key, source[key]]));
    } else if (is(source, PgViewBase)) {
      fields = source[ViewBaseConfig].selectedFields;
    } else if (is(source, SQL)) {
      fields = {};
    } else {
      fields = getTableColumns(source);
    }
    return new PgSelectBase({
      table: source,
      fields,
      isPartialSelect,
      session: this.session,
      dialect: this.dialect,
      withList: this.withList,
      distinct: this.distinct
    });
  }
}

class PgSelectQueryBuilderBase extends TypedQueryBuilder {
  static [entityKind] = "PgSelectQueryBuilder";
  _;
  config;
  joinsNotNullableMap;
  tableName;
  isPartialSelect;
  session;
  dialect;
  constructor({ table, fields, isPartialSelect, session, dialect, withList, distinct }) {
    super();
    this.config = {
      withList,
      table,
      fields: { ...fields },
      distinct,
      setOperators: []
    };
    this.isPartialSelect = isPartialSelect;
    this.session = session;
    this.dialect = dialect;
    this._ = {
      selectedFields: fields
    };
    this.tableName = getTableLikeName(table);
    this.joinsNotNullableMap = typeof this.tableName === "string" ? { [this.tableName]: true } : {};
  }
  createJoin(joinType) {
    return (table, on) => {
      const baseTableName = this.tableName;
      const tableName = getTableLikeName(table);
      if (typeof tableName === "string" && this.config.joins?.some((join) => join.alias === tableName)) {
        throw new Error(`Alias "${tableName}" is already used in this query`);
      }
      if (!this.isPartialSelect) {
        if (Object.keys(this.joinsNotNullableMap).length === 1 && typeof baseTableName === "string") {
          this.config.fields = {
            [baseTableName]: this.config.fields
          };
        }
        if (typeof tableName === "string" && !is(table, SQL)) {
          const selection = is(table, Subquery) ? table._.selectedFields : is(table, View) ? table[ViewBaseConfig].selectedFields : table[Table.Symbol.Columns];
          this.config.fields[tableName] = selection;
        }
      }
      if (typeof on === "function") {
        on = on(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
      }
      if (!this.config.joins) {
        this.config.joins = [];
      }
      this.config.joins.push({ on, table, joinType, alias: tableName });
      if (typeof tableName === "string") {
        switch (joinType) {
          case "left": {
            this.joinsNotNullableMap[tableName] = false;
            break;
          }
          case "right": {
            this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false]));
            this.joinsNotNullableMap[tableName] = true;
            break;
          }
          case "inner": {
            this.joinsNotNullableMap[tableName] = true;
            break;
          }
          case "full": {
            this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false]));
            this.joinsNotNullableMap[tableName] = false;
            break;
          }
        }
      }
      return this;
    };
  }
  leftJoin = this.createJoin("left");
  rightJoin = this.createJoin("right");
  innerJoin = this.createJoin("inner");
  fullJoin = this.createJoin("full");
  createSetOperator(type, isAll) {
    return (rightSelection) => {
      const rightSelect = typeof rightSelection === "function" ? rightSelection(getPgSetOperators()) : rightSelection;
      if (!haveSameKeys(this.getSelectedFields(), rightSelect.getSelectedFields())) {
        throw new Error("Set operator error (union / intersect / except): selected fields are not the same or are in a different order");
      }
      this.config.setOperators.push({ type, isAll, rightSelect });
      return this;
    };
  }
  union = this.createSetOperator("union", false);
  unionAll = this.createSetOperator("union", true);
  intersect = this.createSetOperator("intersect", false);
  intersectAll = this.createSetOperator("intersect", true);
  except = this.createSetOperator("except", false);
  exceptAll = this.createSetOperator("except", true);
  addSetOperators(setOperators) {
    this.config.setOperators.push(...setOperators);
    return this;
  }
  where(where) {
    if (typeof where === "function") {
      where = where(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
    }
    this.config.where = where;
    return this;
  }
  having(having) {
    if (typeof having === "function") {
      having = having(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
    }
    this.config.having = having;
    return this;
  }
  groupBy(...columns) {
    if (typeof columns[0] === "function") {
      const groupBy = columns[0](new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })));
      this.config.groupBy = Array.isArray(groupBy) ? groupBy : [groupBy];
    } else {
      this.config.groupBy = columns;
    }
    return this;
  }
  orderBy(...columns) {
    if (typeof columns[0] === "function") {
      const orderBy = columns[0](new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })));
      const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
      if (this.config.setOperators.length > 0) {
        this.config.setOperators.at(-1).orderBy = orderByArray;
      } else {
        this.config.orderBy = orderByArray;
      }
    } else {
      const orderByArray = columns;
      if (this.config.setOperators.length > 0) {
        this.config.setOperators.at(-1).orderBy = orderByArray;
      } else {
        this.config.orderBy = orderByArray;
      }
    }
    return this;
  }
  limit(limit) {
    if (this.config.setOperators.length > 0) {
      this.config.setOperators.at(-1).limit = limit;
    } else {
      this.config.limit = limit;
    }
    return this;
  }
  offset(offset) {
    if (this.config.setOperators.length > 0) {
      this.config.setOperators.at(-1).offset = offset;
    } else {
      this.config.offset = offset;
    }
    return this;
  }
  for(strength, config = {}) {
    this.config.lockingClause = { strength, config };
    return this;
  }
  getSQL() {
    return this.dialect.buildSelectQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
    return rest;
  }
  as(alias) {
    return new Proxy(new Subquery(this.getSQL(), this.config.fields, alias), new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
  }
  getSelectedFields() {
    return new Proxy(this.config.fields, new SelectionProxyHandler({ alias: this.tableName, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
  }
  $dynamic() {
    return this;
  }
}

class PgSelectBase extends PgSelectQueryBuilderBase {
  static [entityKind] = "PgSelect";
  _prepare(name) {
    const { session, config, dialect, joinsNotNullableMap } = this;
    if (!session) {
      throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
    }
    return tracer.startActiveSpan("drizzle.prepareQuery", () => {
      const fieldsList = orderSelectedFields(config.fields);
      const query = session.prepareQuery(dialect.sqlToQuery(this.getSQL()), fieldsList, name, true);
      query.joinsNotNullableMap = joinsNotNullableMap;
      return query;
    });
  }
  prepare(name) {
    return this._prepare(name);
  }
  execute = (placeholderValues) => {
    return tracer.startActiveSpan("drizzle.operation", () => {
      return this._prepare().execute(placeholderValues);
    });
  };
}
applyMixins(PgSelectBase, [QueryPromise]);
function createSetOperator(type, isAll) {
  return (leftSelect, rightSelect, ...restSelects) => {
    const setOperators = [rightSelect, ...restSelects].map((select) => ({
      type,
      isAll,
      rightSelect: select
    }));
    for (const setOperator of setOperators) {
      if (!haveSameKeys(leftSelect.getSelectedFields(), setOperator.rightSelect.getSelectedFields())) {
        throw new Error("Set operator error (union / intersect / except): selected fields are not the same or are in a different order");
      }
    }
    return leftSelect.addSetOperators(setOperators);
  };
}
var getPgSetOperators = () => ({
  union,
  unionAll,
  intersect,
  intersectAll,
  except,
  exceptAll
});
var union = createSetOperator("union", false);
var unionAll = createSetOperator("union", true);
var intersect = createSetOperator("intersect", false);
var intersectAll = createSetOperator("intersect", true);
var except = createSetOperator("except", false);
var exceptAll = createSetOperator("except", true);

// ../../node_modules/drizzle-orm/pg-core/query-builders/query-builder.js
class QueryBuilder {
  static [entityKind] = "PgQueryBuilder";
  dialect;
  $with(alias) {
    const queryBuilder = this;
    return {
      as(qb) {
        if (typeof qb === "function") {
          qb = qb(queryBuilder);
        }
        return new Proxy(new WithSubquery(qb.getSQL(), qb.getSelectedFields(), alias, true), new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
      }
    };
  }
  with(...queries) {
    const self = this;
    function select(fields) {
      return new PgSelectBuilder({
        fields: fields ?? undefined,
        session: undefined,
        dialect: self.getDialect(),
        withList: queries
      });
    }
    function selectDistinct(fields) {
      return new PgSelectBuilder({
        fields: fields ?? undefined,
        session: undefined,
        dialect: self.getDialect(),
        distinct: true
      });
    }
    function selectDistinctOn(on, fields) {
      return new PgSelectBuilder({
        fields: fields ?? undefined,
        session: undefined,
        dialect: self.getDialect(),
        distinct: { on }
      });
    }
    return { select, selectDistinct, selectDistinctOn };
  }
  select(fields) {
    return new PgSelectBuilder({
      fields: fields ?? undefined,
      session: undefined,
      dialect: this.getDialect()
    });
  }
  selectDistinct(fields) {
    return new PgSelectBuilder({
      fields: fields ?? undefined,
      session: undefined,
      dialect: this.getDialect(),
      distinct: true
    });
  }
  selectDistinctOn(on, fields) {
    return new PgSelectBuilder({
      fields: fields ?? undefined,
      session: undefined,
      dialect: this.getDialect(),
      distinct: { on }
    });
  }
  getDialect() {
    if (!this.dialect) {
      this.dialect = new PgDialect;
    }
    return this.dialect;
  }
}

// ../../node_modules/drizzle-orm/pg-core/query-builders/refresh-materialized-view.js
class PgRefreshMaterializedView extends QueryPromise {
  constructor(view, session, dialect) {
    super();
    this.session = session;
    this.dialect = dialect;
    this.config = { view };
  }
  static [entityKind] = "PgRefreshMaterializedView";
  config;
  concurrently() {
    if (this.config.withNoData !== undefined) {
      throw new Error("Cannot use concurrently and withNoData together");
    }
    this.config.concurrently = true;
    return this;
  }
  withNoData() {
    if (this.config.concurrently !== undefined) {
      throw new Error("Cannot use concurrently and withNoData together");
    }
    this.config.withNoData = true;
    return this;
  }
  getSQL() {
    return this.dialect.buildRefreshMaterializedViewQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
    return rest;
  }
  _prepare(name) {
    return tracer.startActiveSpan("drizzle.prepareQuery", () => {
      return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), undefined, name, true);
    });
  }
  prepare(name) {
    return this._prepare(name);
  }
  execute = (placeholderValues) => {
    return tracer.startActiveSpan("drizzle.operation", () => {
      return this._prepare().execute(placeholderValues);
    });
  };
}

// ../../node_modules/drizzle-orm/pg-core/query-builders/update.js
class PgUpdateBuilder {
  constructor(table, session, dialect, withList) {
    this.table = table;
    this.session = session;
    this.dialect = dialect;
    this.withList = withList;
  }
  static [entityKind] = "PgUpdateBuilder";
  set(values) {
    return new PgUpdateBase(this.table, mapUpdateSet(this.table, values), this.session, this.dialect, this.withList);
  }
}

class PgUpdateBase extends QueryPromise {
  constructor(table, set, session, dialect, withList) {
    super();
    this.session = session;
    this.dialect = dialect;
    this.config = { set, table, withList };
  }
  static [entityKind] = "PgUpdate";
  config;
  where(where) {
    this.config.where = where;
    return this;
  }
  returning(fields = this.config.table[Table.Symbol.Columns]) {
    this.config.returning = orderSelectedFields(fields);
    return this;
  }
  getSQL() {
    return this.dialect.buildUpdateQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
    return rest;
  }
  _prepare(name) {
    return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning, name, true);
  }
  prepare(name) {
    return this._prepare(name);
  }
  execute = (placeholderValues) => {
    return this._prepare().execute(placeholderValues);
  };
  $dynamic() {
    return this;
  }
}

// ../../node_modules/drizzle-orm/pg-core/query-builders/query.js
class RelationalQueryBuilder {
  constructor(fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session) {
    this.fullSchema = fullSchema;
    this.schema = schema;
    this.tableNamesMap = tableNamesMap;
    this.table = table;
    this.tableConfig = tableConfig;
    this.dialect = dialect;
    this.session = session;
  }
  static [entityKind] = "PgRelationalQueryBuilder";
  findMany(config) {
    return new PgRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? config : {}, "many");
  }
  findFirst(config) {
    return new PgRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? { ...config, limit: 1 } : { limit: 1 }, "first");
  }
}

class PgRelationalQuery extends QueryPromise {
  constructor(fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session, config, mode) {
    super();
    this.fullSchema = fullSchema;
    this.schema = schema;
    this.tableNamesMap = tableNamesMap;
    this.table = table;
    this.tableConfig = tableConfig;
    this.dialect = dialect;
    this.session = session;
    this.config = config;
    this.mode = mode;
  }
  static [entityKind] = "PgRelationalQuery";
  _prepare(name) {
    return tracer.startActiveSpan("drizzle.prepareQuery", () => {
      const { query, builtQuery } = this._toSQL();
      return this.session.prepareQuery(builtQuery, undefined, name, true, (rawRows, mapColumnValue) => {
        const rows = rawRows.map((row) => mapRelationalRow(this.schema, this.tableConfig, row, query.selection, mapColumnValue));
        if (this.mode === "first") {
          return rows[0];
        }
        return rows;
      });
    });
  }
  prepare(name) {
    return this._prepare(name);
  }
  _getQuery() {
    return this.dialect.buildRelationalQueryWithoutPK({
      fullSchema: this.fullSchema,
      schema: this.schema,
      tableNamesMap: this.tableNamesMap,
      table: this.table,
      tableConfig: this.tableConfig,
      queryConfig: this.config,
      tableAlias: this.tableConfig.tsName
    });
  }
  getSQL() {
    return this._getQuery().sql;
  }
  _toSQL() {
    const query = this._getQuery();
    const builtQuery = this.dialect.sqlToQuery(query.sql);
    return { query, builtQuery };
  }
  toSQL() {
    return this._toSQL().builtQuery;
  }
  execute() {
    return tracer.startActiveSpan("drizzle.operation", () => {
      return this._prepare().execute();
    });
  }
}

// ../../node_modules/drizzle-orm/pg-core/query-builders/raw.js
class PgRaw extends QueryPromise {
  constructor(execute, sql2, query, mapBatchResult) {
    super();
    this.execute = execute;
    this.sql = sql2;
    this.query = query;
    this.mapBatchResult = mapBatchResult;
  }
  static [entityKind] = "PgRaw";
  getSQL() {
    return this.sql;
  }
  getQuery() {
    return this.query;
  }
  mapResult(result, isFromBatch) {
    return isFromBatch ? this.mapBatchResult(result) : result;
  }
  _prepare() {
    return this;
  }
  isResponseInArrayMode() {
    return false;
  }
}

// ../../node_modules/drizzle-orm/pg-core/db.js
class PgDatabase {
  constructor(dialect, session, schema) {
    this.dialect = dialect;
    this.session = session;
    this._ = schema ? {
      schema: schema.schema,
      fullSchema: schema.fullSchema,
      tableNamesMap: schema.tableNamesMap,
      session
    } : {
      schema: undefined,
      fullSchema: {},
      tableNamesMap: {},
      session
    };
    this.query = {};
    if (this._.schema) {
      for (const [tableName, columns] of Object.entries(this._.schema)) {
        this.query[tableName] = new RelationalQueryBuilder(schema.fullSchema, this._.schema, this._.tableNamesMap, schema.fullSchema[tableName], columns, dialect, session);
      }
    }
  }
  static [entityKind] = "PgDatabase";
  query;
  $with(alias) {
    return {
      as(qb) {
        if (typeof qb === "function") {
          qb = qb(new QueryBuilder);
        }
        return new Proxy(new WithSubquery(qb.getSQL(), qb.getSelectedFields(), alias, true), new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
      }
    };
  }
  with(...queries) {
    const self = this;
    function select(fields) {
      return new PgSelectBuilder({
        fields: fields ?? undefined,
        session: self.session,
        dialect: self.dialect,
        withList: queries
      });
    }
    function selectDistinct(fields) {
      return new PgSelectBuilder({
        fields: fields ?? undefined,
        session: self.session,
        dialect: self.dialect,
        withList: queries,
        distinct: true
      });
    }
    function selectDistinctOn(on, fields) {
      return new PgSelectBuilder({
        fields: fields ?? undefined,
        session: self.session,
        dialect: self.dialect,
        withList: queries,
        distinct: { on }
      });
    }
    function update(table) {
      return new PgUpdateBuilder(table, self.session, self.dialect, queries);
    }
    function insert(table) {
      return new PgInsertBuilder(table, self.session, self.dialect, queries);
    }
    function delete_(table) {
      return new PgDeleteBase(table, self.session, self.dialect, queries);
    }
    return { select, selectDistinct, selectDistinctOn, update, insert, delete: delete_ };
  }
  select(fields) {
    return new PgSelectBuilder({
      fields: fields ?? undefined,
      session: this.session,
      dialect: this.dialect
    });
  }
  selectDistinct(fields) {
    return new PgSelectBuilder({
      fields: fields ?? undefined,
      session: this.session,
      dialect: this.dialect,
      distinct: true
    });
  }
  selectDistinctOn(on, fields) {
    return new PgSelectBuilder({
      fields: fields ?? undefined,
      session: this.session,
      dialect: this.dialect,
      distinct: { on }
    });
  }
  update(table) {
    return new PgUpdateBuilder(table, this.session, this.dialect);
  }
  insert(table) {
    return new PgInsertBuilder(table, this.session, this.dialect);
  }
  delete(table) {
    return new PgDeleteBase(table, this.session, this.dialect);
  }
  refreshMaterializedView(view) {
    return new PgRefreshMaterializedView(view, this.session, this.dialect);
  }
  execute(query) {
    const sql2 = query.getSQL();
    const builtQuery = this.dialect.sqlToQuery(sql2);
    const prepared = this.session.prepareQuery(builtQuery, undefined, undefined, false);
    return new PgRaw(() => prepared.execute(), sql2, builtQuery, (result) => prepared.mapResult(result, true));
  }
  transaction(transaction, config) {
    return this.session.transaction(transaction, config);
  }
}

// ../../node_modules/drizzle-orm/pg-core/session.js
class PgPreparedQuery {
  constructor(query) {
    this.query = query;
  }
  getQuery() {
    return this.query;
  }
  mapResult(response, _isFromBatch) {
    return response;
  }
  static [entityKind] = "PgPreparedQuery";
  joinsNotNullableMap;
}

class PgSession {
  constructor(dialect) {
    this.dialect = dialect;
  }
  static [entityKind] = "PgSession";
  execute(query) {
    return tracer.startActiveSpan("drizzle.operation", () => {
      const prepared = tracer.startActiveSpan("drizzle.prepareQuery", () => {
        return this.prepareQuery(this.dialect.sqlToQuery(query), undefined, undefined, false);
      });
      return prepared.execute();
    });
  }
  all(query) {
    return this.prepareQuery(this.dialect.sqlToQuery(query), undefined, undefined, false).all();
  }
}

class PgTransaction extends PgDatabase {
  constructor(dialect, session, schema, nestedIndex = 0) {
    super(dialect, session, schema);
    this.schema = schema;
    this.nestedIndex = nestedIndex;
  }
  static [entityKind] = "PgTransaction";
  rollback() {
    throw new TransactionRollbackError;
  }
  getTransactionConfigSQL(config) {
    const chunks = [];
    if (config.isolationLevel) {
      chunks.push(`isolation level ${config.isolationLevel}`);
    }
    if (config.accessMode) {
      chunks.push(config.accessMode);
    }
    if (typeof config.deferrable === "boolean") {
      chunks.push(config.deferrable ? "deferrable" : "not deferrable");
    }
    return sql.raw(chunks.join(" "));
  }
  setTransaction(config) {
    return this.session.execute(sql`set transaction ${this.getTransactionConfigSQL(config)}`);
  }
}

// ../../node_modules/drizzle-orm/postgres-js/session.js
class PostgresJsPreparedQuery extends PgPreparedQuery {
  constructor(client, queryString, params, logger2, fields, _isResponseInArrayMode, customResultMapper) {
    super({ sql: queryString, params });
    this.client = client;
    this.queryString = queryString;
    this.params = params;
    this.logger = logger2;
    this.fields = fields;
    this._isResponseInArrayMode = _isResponseInArrayMode;
    this.customResultMapper = customResultMapper;
  }
  static [entityKind] = "PostgresJsPreparedQuery";
  async execute(placeholderValues = {}) {
    return tracer.startActiveSpan("drizzle.execute", async (span) => {
      const params = fillPlaceholders(this.params, placeholderValues);
      span?.setAttributes({
        "drizzle.query.text": this.queryString,
        "drizzle.query.params": JSON.stringify(params)
      });
      this.logger.logQuery(this.queryString, params);
      const { fields, queryString: query, client, joinsNotNullableMap, customResultMapper } = this;
      if (!fields && !customResultMapper) {
        return tracer.startActiveSpan("drizzle.driver.execute", () => {
          return client.unsafe(query, params);
        });
      }
      const rows = await tracer.startActiveSpan("drizzle.driver.execute", () => {
        span?.setAttributes({
          "drizzle.query.text": query,
          "drizzle.query.params": JSON.stringify(params)
        });
        return client.unsafe(query, params).values();
      });
      return tracer.startActiveSpan("drizzle.mapResponse", () => {
        return customResultMapper ? customResultMapper(rows) : rows.map((row) => mapResultRow(fields, row, joinsNotNullableMap));
      });
    });
  }
  all(placeholderValues = {}) {
    return tracer.startActiveSpan("drizzle.execute", async (span) => {
      const params = fillPlaceholders(this.params, placeholderValues);
      span?.setAttributes({
        "drizzle.query.text": this.queryString,
        "drizzle.query.params": JSON.stringify(params)
      });
      this.logger.logQuery(this.queryString, params);
      return tracer.startActiveSpan("drizzle.driver.execute", () => {
        span?.setAttributes({
          "drizzle.query.text": this.queryString,
          "drizzle.query.params": JSON.stringify(params)
        });
        return this.client.unsafe(this.queryString, params);
      });
    });
  }
  isResponseInArrayMode() {
    return this._isResponseInArrayMode;
  }
}

class PostgresJsSession extends PgSession {
  constructor(client, dialect, schema, options = {}) {
    super(dialect);
    this.client = client;
    this.schema = schema;
    this.options = options;
    this.logger = options.logger ?? new NoopLogger;
  }
  static [entityKind] = "PostgresJsSession";
  logger;
  prepareQuery(query, fields, name, isResponseInArrayMode, customResultMapper) {
    return new PostgresJsPreparedQuery(this.client, query.sql, query.params, this.logger, fields, isResponseInArrayMode, customResultMapper);
  }
  query(query, params) {
    this.logger.logQuery(query, params);
    return this.client.unsafe(query, params).values();
  }
  queryObjects(query, params) {
    return this.client.unsafe(query, params);
  }
  transaction(transaction, config) {
    return this.client.begin(async (client) => {
      const session = new PostgresJsSession(client, this.dialect, this.schema, this.options);
      const tx = new PostgresJsTransaction(this.dialect, session, this.schema);
      if (config) {
        await tx.setTransaction(config);
      }
      return transaction(tx);
    });
  }
}

class PostgresJsTransaction extends PgTransaction {
  constructor(dialect, session, schema, nestedIndex = 0) {
    super(dialect, session, schema, nestedIndex);
    this.session = session;
  }
  static [entityKind] = "PostgresJsTransaction";
  transaction(transaction) {
    return this.session.client.savepoint((client) => {
      const session = new PostgresJsSession(client, this.dialect, this.schema, this.session.options);
      const tx = new PostgresJsTransaction(this.dialect, session, this.schema);
      return transaction(tx);
    });
  }
}

// ../../node_modules/drizzle-orm/postgres-js/driver.js
function drizzle(client, config = {}) {
  const transparentParser = (val) => val;
  for (const type of ["1184", "1082", "1083", "1114"]) {
    client.options.parsers[type] = transparentParser;
    client.options.serializers[type] = transparentParser;
  }
  const dialect = new PgDialect;
  let logger2;
  if (config.logger === true) {
    logger2 = new DefaultLogger;
  } else if (config.logger !== false) {
    logger2 = config.logger;
  }
  let schema;
  if (config.schema) {
    const tablesConfig = extractTablesRelationalConfig(config.schema, createTableRelationsHelpers);
    schema = {
      fullSchema: config.schema,
      schema: tablesConfig.tables,
      tableNamesMap: tablesConfig.tableNamesMap
    };
  }
  const session = new PostgresJsSession(client, dialect, schema, { logger: logger2 });
  return new PgDatabase(dialect, session, schema);
}

// ../../node_modules/postgres/src/index.js
import os from "os";
import fs from "fs";

// ../../node_modules/postgres/src/query.js
var originCache = new Map;
var originStackCache = new Map;
var originError = Symbol("OriginError");
var CLOSE = {};

class Query extends Promise {
  constructor(strings, args, handler, canceller, options = {}) {
    let resolve, reject;
    super((a, b) => {
      resolve = a;
      reject = b;
    });
    this.tagged = Array.isArray(strings.raw);
    this.strings = strings;
    this.args = args;
    this.handler = handler;
    this.canceller = canceller;
    this.options = options;
    this.state = null;
    this.statement = null;
    this.resolve = (x) => (this.active = false, resolve(x));
    this.reject = (x) => (this.active = false, reject(x));
    this.active = false;
    this.cancelled = null;
    this.executed = false;
    this.signature = "";
    this[originError] = this.handler.debug ? new Error : this.tagged && cachedError(this.strings);
  }
  get origin() {
    return (this.handler.debug ? this[originError].stack : this.tagged && originStackCache.has(this.strings) ? originStackCache.get(this.strings) : originStackCache.set(this.strings, this[originError].stack).get(this.strings)) || "";
  }
  static get [Symbol.species]() {
    return Promise;
  }
  cancel() {
    return this.canceller && (this.canceller(this), this.canceller = null);
  }
  simple() {
    this.options.simple = true;
    this.options.prepare = false;
    return this;
  }
  async readable() {
    this.simple();
    this.streaming = true;
    return this;
  }
  async writable() {
    this.simple();
    this.streaming = true;
    return this;
  }
  cursor(rows = 1, fn) {
    this.options.simple = false;
    if (typeof rows === "function") {
      fn = rows;
      rows = 1;
    }
    this.cursorRows = rows;
    if (typeof fn === "function")
      return this.cursorFn = fn, this;
    let prev;
    return {
      [Symbol.asyncIterator]: () => ({
        next: () => {
          if (this.executed && !this.active)
            return { done: true };
          prev && prev();
          const promise = new Promise((resolve, reject) => {
            this.cursorFn = (value) => {
              resolve({ value, done: false });
              return new Promise((r) => prev = r);
            };
            this.resolve = () => (this.active = false, resolve({ done: true }));
            this.reject = (x) => (this.active = false, reject(x));
          });
          this.execute();
          return promise;
        },
        return() {
          prev && prev(CLOSE);
          return { done: true };
        }
      })
    };
  }
  describe() {
    this.options.simple = false;
    this.onlyDescribe = this.options.prepare = true;
    return this;
  }
  stream() {
    throw new Error(".stream has been renamed to .forEach");
  }
  forEach(fn) {
    this.forEachFn = fn;
    this.handle();
    return this;
  }
  raw() {
    this.isRaw = true;
    return this;
  }
  values() {
    this.isRaw = "values";
    return this;
  }
  async handle() {
    !this.executed && (this.executed = true) && await 1 && this.handler(this);
  }
  execute() {
    this.handle();
    return this;
  }
  then() {
    this.handle();
    return super.then.apply(this, arguments);
  }
  catch() {
    this.handle();
    return super.catch.apply(this, arguments);
  }
  finally() {
    this.handle();
    return super.finally.apply(this, arguments);
  }
}
function cachedError(xs) {
  if (originCache.has(xs))
    return originCache.get(xs);
  const x = Error.stackTraceLimit;
  Error.stackTraceLimit = 4;
  originCache.set(xs, new Error);
  Error.stackTraceLimit = x;
  return originCache.get(xs);
}

// ../../node_modules/postgres/src/errors.js
class PostgresError extends Error {
  constructor(x) {
    super(x.message);
    this.name = this.constructor.name;
    Object.assign(this, x);
  }
}
var Errors = {
  connection,
  postgres,
  generic,
  notSupported
};
function connection(x, options, socket) {
  const { host, port } = socket || options;
  const error = Object.assign(new Error("write " + x + " " + (options.path || host + ":" + port)), {
    code: x,
    errno: x,
    address: options.path || host
  }, options.path ? {} : { port });
  Error.captureStackTrace(error, connection);
  return error;
}
function postgres(x) {
  const error = new PostgresError(x);
  Error.captureStackTrace(error, postgres);
  return error;
}
function generic(code, message) {
  const error = Object.assign(new Error(code + ": " + message), { code });
  Error.captureStackTrace(error, generic);
  return error;
}
function notSupported(x) {
  const error = Object.assign(new Error(x + " (B) is not supported"), {
    code: "MESSAGE_NOT_SUPPORTED",
    name: x
  });
  Error.captureStackTrace(error, notSupported);
  return error;
}

// ../../node_modules/postgres/src/types.js
var types = {
  string: {
    to: 25,
    from: null,
    serialize: (x) => "" + x
  },
  number: {
    to: 0,
    from: [21, 23, 26, 700, 701],
    serialize: (x) => "" + x,
    parse: (x) => +x
  },
  json: {
    to: 114,
    from: [114, 3802],
    serialize: (x) => JSON.stringify(x),
    parse: (x) => JSON.parse(x)
  },
  boolean: {
    to: 16,
    from: 16,
    serialize: (x) => x === true ? "t" : "f",
    parse: (x) => x === "t"
  },
  date: {
    to: 1184,
    from: [1082, 1114, 1184],
    serialize: (x) => (x instanceof Date ? x : new Date(x)).toISOString(),
    parse: (x) => new Date(x)
  },
  bytea: {
    to: 17,
    from: 17,
    serialize: (x) => "\\x" + Buffer.from(x).toString("hex"),
    parse: (x) => Buffer.from(x.slice(2), "hex")
  }
};

class NotTagged {
  then() {
    notTagged();
  }
  catch() {
    notTagged();
  }
  finally() {
    notTagged();
  }
}

class Identifier extends NotTagged {
  constructor(value) {
    super();
    this.value = escapeIdentifier(value);
  }
}

class Parameter extends NotTagged {
  constructor(value, type, array) {
    super();
    this.value = value;
    this.type = type;
    this.array = array;
  }
}

class Builder extends NotTagged {
  constructor(first, rest) {
    super();
    this.first = first;
    this.rest = rest;
  }
  build(before, parameters, types2, options) {
    const keyword = builders.map(([x, fn]) => ({ fn, i: before.search(x) })).sort((a, b) => a.i - b.i).pop();
    return keyword.i === -1 ? escapeIdentifiers(this.first, options) : keyword.fn(this.first, this.rest, parameters, types2, options);
  }
}
function handleValue(x, parameters, types2, options) {
  let value = x instanceof Parameter ? x.value : x;
  if (value === undefined) {
    x instanceof Parameter ? x.value = options.transform.undefined : value = x = options.transform.undefined;
    if (value === undefined)
      throw Errors.generic("UNDEFINED_VALUE", "Undefined values are not allowed");
  }
  return "$" + types2.push(x instanceof Parameter ? (parameters.push(x.value), x.array ? x.array[x.type || inferType(x.value)] || x.type || firstIsString(x.value) : x.type) : (parameters.push(x), inferType(x)));
}
var defaultHandlers = typeHandlers(types);
function stringify(q, string, value, parameters, types2, options) {
  for (let i = 1;i < q.strings.length; i++) {
    string += stringifyValue(string, value, parameters, types2, options) + q.strings[i];
    value = q.args[i];
  }
  return string;
}
function stringifyValue(string, value, parameters, types2, o) {
  return value instanceof Builder ? value.build(string, parameters, types2, o) : value instanceof Query ? fragment(value, parameters, types2, o) : value instanceof Identifier ? value.value : value && value[0] instanceof Query ? value.reduce((acc, x) => acc + " " + fragment(x, parameters, types2, o), "") : handleValue(value, parameters, types2, o);
}
function fragment(q, parameters, types2, options) {
  q.fragment = true;
  return stringify(q, q.strings[0], q.args[0], parameters, types2, options);
}
function valuesBuilder(first, parameters, types2, columns, options) {
  return first.map((row) => "(" + columns.map((column) => stringifyValue("values", row[column], parameters, types2, options)).join(",") + ")").join(",");
}
function values(first, rest, parameters, types2, options) {
  const multi = Array.isArray(first[0]);
  const columns = rest.length ? rest.flat() : Object.keys(multi ? first[0] : first);
  return valuesBuilder(multi ? first : [first], parameters, types2, columns, options);
}
function select(first, rest, parameters, types2, options) {
  typeof first === "string" && (first = [first].concat(rest));
  if (Array.isArray(first))
    return escapeIdentifiers(first, options);
  let value;
  const columns = rest.length ? rest.flat() : Object.keys(first);
  return columns.map((x) => {
    value = first[x];
    return (value instanceof Query ? fragment(value, parameters, types2, options) : value instanceof Identifier ? value.value : handleValue(value, parameters, types2, options)) + " as " + escapeIdentifier(options.transform.column.to ? options.transform.column.to(x) : x);
  }).join(",");
}
var builders = Object.entries({
  values,
  in: (...xs) => {
    const x = values(...xs);
    return x === "()" ? "(null)" : x;
  },
  select,
  as: select,
  returning: select,
  "\\(": select,
  update(first, rest, parameters, types2, options) {
    return (rest.length ? rest.flat() : Object.keys(first)).map((x) => escapeIdentifier(options.transform.column.to ? options.transform.column.to(x) : x) + "=" + stringifyValue("values", first[x], parameters, types2, options));
  },
  insert(first, rest, parameters, types2, options) {
    const columns = rest.length ? rest.flat() : Object.keys(Array.isArray(first) ? first[0] : first);
    return "(" + escapeIdentifiers(columns, options) + ")values" + valuesBuilder(Array.isArray(first) ? first : [first], parameters, types2, columns, options);
  }
}).map(([x, fn]) => [new RegExp("((?:^|[\\s(])" + x + "(?:$|[\\s(]))(?![\\s\\S]*\\1)", "i"), fn]);
function notTagged() {
  throw Errors.generic("NOT_TAGGED_CALL", "Query not called as a tagged template literal");
}
var serializers = defaultHandlers.serializers;
var parsers = defaultHandlers.parsers;
function firstIsString(x) {
  if (Array.isArray(x))
    return firstIsString(x[0]);
  return typeof x === "string" ? 1009 : 0;
}
var mergeUserTypes = function(types2) {
  const user = typeHandlers(types2 || {});
  return {
    serializers: Object.assign({}, serializers, user.serializers),
    parsers: Object.assign({}, parsers, user.parsers)
  };
};
function typeHandlers(types2) {
  return Object.keys(types2).reduce((acc, k) => {
    types2[k].from && [].concat(types2[k].from).forEach((x) => acc.parsers[x] = types2[k].parse);
    if (types2[k].serialize) {
      acc.serializers[types2[k].to] = types2[k].serialize;
      types2[k].from && [].concat(types2[k].from).forEach((x) => acc.serializers[x] = types2[k].serialize);
    }
    return acc;
  }, { parsers: {}, serializers: {} });
}
function escapeIdentifiers(xs, { transform: { column } }) {
  return xs.map((x) => escapeIdentifier(column.to ? column.to(x) : x)).join(",");
}
var escapeIdentifier = function escape(str) {
  return '"' + str.replace(/"/g, '""').replace(/\./g, '"."') + '"';
};
var inferType = function inferType2(x) {
  return x instanceof Parameter ? x.type : x instanceof Date ? 1184 : x instanceof Uint8Array ? 17 : x === true || x === false ? 16 : typeof x === "bigint" ? 20 : Array.isArray(x) ? inferType2(x[0]) : 0;
};
var escapeBackslash = /\\/g;
var escapeQuote = /"/g;
function arrayEscape(x) {
  return x.replace(escapeBackslash, "\\\\").replace(escapeQuote, "\\\"");
}
var arraySerializer = function arraySerializer2(xs, serializer, options, typarray) {
  if (Array.isArray(xs) === false)
    return xs;
  if (!xs.length)
    return "{}";
  const first = xs[0];
  const delimiter = typarray === 1020 ? ";" : ",";
  if (Array.isArray(first) && !first.type)
    return "{" + xs.map((x) => arraySerializer2(x, serializer, options, typarray)).join(delimiter) + "}";
  return "{" + xs.map((x) => {
    if (x === undefined) {
      x = options.transform.undefined;
      if (x === undefined)
        throw Errors.generic("UNDEFINED_VALUE", "Undefined values are not allowed");
    }
    return x === null ? "null" : '"' + arrayEscape(serializer ? serializer(x.type ? x.value : x) : "" + x) + '"';
  }).join(delimiter) + "}";
};
var arrayParserState = {
  i: 0,
  char: null,
  str: "",
  quoted: false,
  last: 0
};
var arrayParser = function arrayParser2(x, parser, typarray) {
  arrayParserState.i = arrayParserState.last = 0;
  return arrayParserLoop(arrayParserState, x, parser, typarray);
};
function arrayParserLoop(s, x, parser, typarray) {
  const xs = [];
  const delimiter = typarray === 1020 ? ";" : ",";
  for (;s.i < x.length; s.i++) {
    s.char = x[s.i];
    if (s.quoted) {
      if (s.char === "\\") {
        s.str += x[++s.i];
      } else if (s.char === '"') {
        xs.push(parser ? parser(s.str) : s.str);
        s.str = "";
        s.quoted = x[s.i + 1] === '"';
        s.last = s.i + 2;
      } else {
        s.str += s.char;
      }
    } else if (s.char === '"') {
      s.quoted = true;
    } else if (s.char === "{") {
      s.last = ++s.i;
      xs.push(arrayParserLoop(s, x, parser, typarray));
    } else if (s.char === "}") {
      s.quoted = false;
      s.last < s.i && xs.push(parser ? parser(x.slice(s.last, s.i)) : x.slice(s.last, s.i));
      s.last = s.i + 1;
      break;
    } else if (s.char === delimiter && s.p !== "}" && s.p !== '"') {
      xs.push(parser ? parser(x.slice(s.last, s.i)) : x.slice(s.last, s.i));
      s.last = s.i + 1;
    }
    s.p = s.char;
  }
  s.last < s.i && xs.push(parser ? parser(x.slice(s.last, s.i + 1)) : x.slice(s.last, s.i + 1));
  return xs;
}
var toCamel = (x) => {
  let str = x[0];
  for (let i = 1;i < x.length; i++)
    str += x[i] === "_" ? x[++i].toUpperCase() : x[i];
  return str;
};
var toPascal = (x) => {
  let str = x[0].toUpperCase();
  for (let i = 1;i < x.length; i++)
    str += x[i] === "_" ? x[++i].toUpperCase() : x[i];
  return str;
};
var toKebab = (x) => x.replace(/_/g, "-");
var fromCamel = (x) => x.replace(/([A-Z])/g, "_$1").toLowerCase();
var fromPascal = (x) => (x.slice(0, 1) + x.slice(1).replace(/([A-Z])/g, "_$1")).toLowerCase();
var fromKebab = (x) => x.replace(/-/g, "_");
function createJsonTransform(fn) {
  return function jsonTransform(x, column) {
    return typeof x === "object" && x !== null && (column.type === 114 || column.type === 3802) ? Array.isArray(x) ? x.map((x2) => jsonTransform(x2, column)) : Object.entries(x).reduce((acc, [k, v]) => Object.assign(acc, { [fn(k)]: jsonTransform(v, column) }), {}) : x;
  };
}
toCamel.column = { from: toCamel };
toCamel.value = { from: createJsonTransform(toCamel) };
fromCamel.column = { to: fromCamel };
var camel = { ...toCamel };
camel.column.to = fromCamel;
toPascal.column = { from: toPascal };
toPascal.value = { from: createJsonTransform(toPascal) };
fromPascal.column = { to: fromPascal };
var pascal = { ...toPascal };
pascal.column.to = fromPascal;
toKebab.column = { from: toKebab };
toKebab.value = { from: createJsonTransform(toKebab) };
fromKebab.column = { to: fromKebab };
var kebab = { ...toKebab };
kebab.column.to = fromKebab;

// ../../node_modules/postgres/src/connection.js
import net from "net";
import tls from "tls";
import crypto2 from "crypto";
import Stream from "stream";
import { performance } from "perf_hooks";

// ../../node_modules/postgres/src/result.js
class Result extends Array {
  constructor() {
    super();
    Object.defineProperties(this, {
      count: { value: null, writable: true },
      state: { value: null, writable: true },
      command: { value: null, writable: true },
      columns: { value: null, writable: true },
      statement: { value: null, writable: true }
    });
  }
  static get [Symbol.species]() {
    return Array;
  }
}

// ../../node_modules/postgres/src/queue.js
var queue_default = Queue;
function Queue(initial = []) {
  let xs = initial.slice();
  let index = 0;
  return {
    get length() {
      return xs.length - index;
    },
    remove: (x) => {
      const index2 = xs.indexOf(x);
      return index2 === -1 ? null : (xs.splice(index2, 1), x);
    },
    push: (x) => (xs.push(x), x),
    shift: () => {
      const out = xs[index++];
      if (index === xs.length) {
        index = 0;
        xs = [];
      } else {
        xs[index - 1] = undefined;
      }
      return out;
    }
  };
}

// ../../node_modules/postgres/src/bytes.js
var size = 256;
var buffer = Buffer.allocUnsafe(size);
var messages = "BCcDdEFfHPpQSX".split("").reduce((acc, x) => {
  const v = x.charCodeAt(0);
  acc[x] = () => {
    buffer[0] = v;
    b.i = 5;
    return b;
  };
  return acc;
}, {});
var b = Object.assign(reset, messages, {
  N: String.fromCharCode(0),
  i: 0,
  inc(x) {
    b.i += x;
    return b;
  },
  str(x) {
    const length = Buffer.byteLength(x);
    fit(length);
    b.i += buffer.write(x, b.i, length, "utf8");
    return b;
  },
  i16(x) {
    fit(2);
    buffer.writeUInt16BE(x, b.i);
    b.i += 2;
    return b;
  },
  i32(x, i) {
    if (i || i === 0) {
      buffer.writeUInt32BE(x, i);
      return b;
    }
    fit(4);
    buffer.writeUInt32BE(x, b.i);
    b.i += 4;
    return b;
  },
  z(x) {
    fit(x);
    buffer.fill(0, b.i, b.i + x);
    b.i += x;
    return b;
  },
  raw(x) {
    buffer = Buffer.concat([buffer.subarray(0, b.i), x]);
    b.i = buffer.length;
    return b;
  },
  end(at = 1) {
    buffer.writeUInt32BE(b.i - at, at);
    const out = buffer.subarray(0, b.i);
    b.i = 0;
    buffer = Buffer.allocUnsafe(size);
    return out;
  }
});
var bytes_default = b;
function fit(x) {
  if (buffer.length - b.i < x) {
    const prev = buffer, length = prev.length;
    buffer = Buffer.allocUnsafe(length + (length >> 1) + x);
    prev.copy(buffer);
  }
}
function reset() {
  b.i = 0;
  return b;
}

// ../../node_modules/postgres/src/connection.js
var connection_default = Connection;
var uid = 1;
var Sync = bytes_default().S().end();
var Flush = bytes_default().H().end();
var SSLRequest = bytes_default().i32(8).i32(80877103).end(8);
var ExecuteUnnamed = Buffer.concat([bytes_default().E().str(bytes_default.N).i32(0).end(), Sync]);
var DescribeUnnamed = bytes_default().D().str("S").str(bytes_default.N).end();
var noop = () => {};
var retryRoutines = new Set([
  "FetchPreparedStatement",
  "RevalidateCachedQuery",
  "transformAssignedExpr"
]);
var errorFields = {
  83: "severity_local",
  86: "severity",
  67: "code",
  77: "message",
  68: "detail",
  72: "hint",
  80: "position",
  112: "internal_position",
  113: "internal_query",
  87: "where",
  115: "schema_name",
  116: "table_name",
  99: "column_name",
  100: "data type_name",
  110: "constraint_name",
  70: "file",
  76: "line",
  82: "routine"
};
function Connection(options, queues = {}, { onopen = noop, onend = noop, onclose = noop } = {}) {
  const {
    ssl,
    max,
    user,
    host,
    port,
    database,
    parsers: parsers2,
    transform,
    onnotice,
    onnotify,
    onparameter,
    max_pipeline,
    keep_alive,
    backoff,
    target_session_attrs
  } = options;
  const sent = queue_default(), id = uid++, backend = { pid: null, secret: null }, idleTimer = timer(end, options.idle_timeout), lifeTimer = timer(end, options.max_lifetime), connectTimer = timer(connectTimedOut, options.connect_timeout);
  let socket = null, cancelMessage, result = new Result, incoming = Buffer.alloc(0), needsTypes = options.fetch_types, backendParameters = {}, statements = {}, statementId = Math.random().toString(36).slice(2), statementCount = 1, closedDate = 0, remaining = 0, hostIndex = 0, retries = 0, length = 0, delay = 0, rows = 0, serverSignature = null, nextWriteTimer = null, terminated = false, incomings = null, results = null, initial = null, ending = null, stream = null, chunk = null, ended = null, nonce = null, query = null, final = null;
  const connection2 = {
    queue: queues.closed,
    idleTimer,
    connect(query2) {
      initial = query2;
      reconnect();
    },
    terminate,
    execute,
    cancel,
    end,
    count: 0,
    id
  };
  queues.closed && queues.closed.push(connection2);
  return connection2;
  async function createSocket() {
    let x;
    try {
      x = options.socket ? await Promise.resolve(options.socket(options)) : new net.Socket;
    } catch (e) {
      error(e);
      return;
    }
    x.on("error", error);
    x.on("close", closed);
    x.on("drain", drain);
    return x;
  }
  async function cancel({ pid, secret }, resolve, reject) {
    try {
      cancelMessage = bytes_default().i32(16).i32(80877102).i32(pid).i32(secret).end(16);
      await connect();
      socket.once("error", reject);
      socket.once("close", resolve);
    } catch (error2) {
      reject(error2);
    }
  }
  function execute(q) {
    if (terminated)
      return queryError(q, Errors.connection("CONNECTION_DESTROYED", options));
    if (q.cancelled)
      return;
    try {
      q.state = backend;
      query ? sent.push(q) : (query = q, query.active = true);
      build(q);
      return write(toBuffer(q)) && !q.describeFirst && !q.cursorFn && sent.length < max_pipeline && (!q.options.onexecute || q.options.onexecute(connection2));
    } catch (error2) {
      sent.length === 0 && write(Sync);
      errored(error2);
      return true;
    }
  }
  function toBuffer(q) {
    if (q.parameters.length >= 65534)
      throw Errors.generic("MAX_PARAMETERS_EXCEEDED", "Max number of parameters (65534) exceeded");
    return q.options.simple ? bytes_default().Q().str(q.statement.string + bytes_default.N).end() : q.describeFirst ? Buffer.concat([describe(q), Flush]) : q.prepare ? q.prepared ? prepared(q) : Buffer.concat([describe(q), prepared(q)]) : unnamed(q);
  }
  function describe(q) {
    return Buffer.concat([
      Parse(q.statement.string, q.parameters, q.statement.types, q.statement.name),
      Describe("S", q.statement.name)
    ]);
  }
  function prepared(q) {
    return Buffer.concat([
      Bind(q.parameters, q.statement.types, q.statement.name, q.cursorName),
      q.cursorFn ? Execute("", q.cursorRows) : ExecuteUnnamed
    ]);
  }
  function unnamed(q) {
    return Buffer.concat([
      Parse(q.statement.string, q.parameters, q.statement.types),
      DescribeUnnamed,
      prepared(q)
    ]);
  }
  function build(q) {
    const parameters = [], types2 = [];
    const string = stringify(q, q.strings[0], q.args[0], parameters, types2, options);
    !q.tagged && q.args.forEach((x) => handleValue(x, parameters, types2, options));
    q.prepare = options.prepare && ("prepare" in q.options ? q.options.prepare : true);
    q.string = string;
    q.signature = q.prepare && types2 + string;
    q.onlyDescribe && delete statements[q.signature];
    q.parameters = q.parameters || parameters;
    q.prepared = q.prepare && q.signature in statements;
    q.describeFirst = q.onlyDescribe || parameters.length && !q.prepared;
    q.statement = q.prepared ? statements[q.signature] : { string, types: types2, name: q.prepare ? statementId + statementCount++ : "" };
    typeof options.debug === "function" && options.debug(id, string, parameters, types2);
  }
  function write(x, fn) {
    chunk = chunk ? Buffer.concat([chunk, x]) : Buffer.from(x);
    if (fn || chunk.length >= 1024)
      return nextWrite(fn);
    nextWriteTimer === null && (nextWriteTimer = setImmediate(nextWrite));
    return true;
  }
  function nextWrite(fn) {
    const x = socket.write(chunk, fn);
    nextWriteTimer !== null && clearImmediate(nextWriteTimer);
    chunk = nextWriteTimer = null;
    return x;
  }
  function connectTimedOut() {
    errored(Errors.connection("CONNECT_TIMEOUT", options, socket));
    socket.destroy();
  }
  async function secure() {
    write(SSLRequest);
    const canSSL = await new Promise((r) => socket.once("data", (x) => r(x[0] === 83)));
    if (!canSSL && ssl === "prefer")
      return connected();
    socket.removeAllListeners();
    socket = tls.connect({
      socket,
      servername: net.isIP(socket.host) ? undefined : socket.host,
      ...ssl === "require" || ssl === "allow" || ssl === "prefer" ? { rejectUnauthorized: false } : ssl === "verify-full" ? {} : typeof ssl === "object" ? ssl : {}
    });
    socket.on("secureConnect", connected);
    socket.on("error", error);
    socket.on("close", closed);
    socket.on("drain", drain);
  }
  function drain() {
    !query && onopen(connection2);
  }
  function data(x) {
    if (incomings) {
      incomings.push(x);
      remaining -= x.length;
      if (remaining > 0)
        return;
    }
    incoming = incomings ? Buffer.concat(incomings, length - remaining) : incoming.length === 0 ? x : Buffer.concat([incoming, x], incoming.length + x.length);
    while (incoming.length > 4) {
      length = incoming.readUInt32BE(1);
      if (length >= incoming.length) {
        remaining = length - incoming.length;
        incomings = [incoming];
        break;
      }
      try {
        handle(incoming.subarray(0, length + 1));
      } catch (e) {
        query && (query.cursorFn || query.describeFirst) && write(Sync);
        errored(e);
      }
      incoming = incoming.subarray(length + 1);
      remaining = 0;
      incomings = null;
    }
  }
  async function connect() {
    terminated = false;
    backendParameters = {};
    socket || (socket = await createSocket());
    if (!socket)
      return;
    connectTimer.start();
    if (options.socket)
      return ssl ? secure() : connected();
    socket.on("connect", ssl ? secure : connected);
    if (options.path)
      return socket.connect(options.path);
    socket.ssl = ssl;
    socket.connect(port[hostIndex], host[hostIndex]);
    socket.host = host[hostIndex];
    socket.port = port[hostIndex];
    hostIndex = (hostIndex + 1) % port.length;
  }
  function reconnect() {
    setTimeout(connect, closedDate ? closedDate + delay - performance.now() : 0);
  }
  function connected() {
    try {
      statements = {};
      needsTypes = options.fetch_types;
      statementId = Math.random().toString(36).slice(2);
      statementCount = 1;
      lifeTimer.start();
      socket.on("data", data);
      keep_alive && socket.setKeepAlive && socket.setKeepAlive(true, 1000 * keep_alive);
      const s = StartupMessage();
      write(s);
    } catch (err) {
      error(err);
    }
  }
  function error(err) {
    if (connection2.queue === queues.connecting && options.host[retries + 1])
      return;
    errored(err);
    while (sent.length)
      queryError(sent.shift(), err);
  }
  function errored(err) {
    stream && (stream.destroy(err), stream = null);
    query && queryError(query, err);
    initial && (queryError(initial, err), initial = null);
  }
  function queryError(query2, err) {
    if (query2.reserve)
      return query2.reject(err);
    if (!err || typeof err !== "object")
      err = new Error(err);
    "query" in err || "parameters" in err || Object.defineProperties(err, {
      stack: { value: err.stack + query2.origin.replace(/.*\n/, `
`), enumerable: options.debug },
      query: { value: query2.string, enumerable: options.debug },
      parameters: { value: query2.parameters, enumerable: options.debug },
      args: { value: query2.args, enumerable: options.debug },
      types: { value: query2.statement && query2.statement.types, enumerable: options.debug }
    });
    query2.reject(err);
  }
  function end() {
    return ending || (!connection2.reserved && onend(connection2), !connection2.reserved && !initial && !query && sent.length === 0 ? (terminate(), new Promise((r) => socket && socket.readyState !== "closed" ? socket.once("close", r) : r())) : ending = new Promise((r) => ended = r));
  }
  function terminate() {
    terminated = true;
    if (stream || query || initial || sent.length)
      error(Errors.connection("CONNECTION_DESTROYED", options));
    clearImmediate(nextWriteTimer);
    if (socket) {
      socket.removeListener("data", data);
      socket.removeListener("connect", connected);
      socket.readyState === "open" && socket.end(bytes_default().X().end());
    }
    ended && (ended(), ending = ended = null);
  }
  async function closed(hadError) {
    incoming = Buffer.alloc(0);
    remaining = 0;
    incomings = null;
    clearImmediate(nextWriteTimer);
    socket.removeListener("data", data);
    socket.removeListener("connect", connected);
    idleTimer.cancel();
    lifeTimer.cancel();
    connectTimer.cancel();
    socket.removeAllListeners();
    socket = null;
    if (initial)
      return reconnect();
    !hadError && (query || sent.length) && error(Errors.connection("CONNECTION_CLOSED", options, socket));
    closedDate = performance.now();
    hadError && options.shared.retries++;
    delay = (typeof backoff === "function" ? backoff(options.shared.retries) : backoff) * 1000;
    onclose(connection2, Errors.connection("CONNECTION_CLOSED", options, socket));
  }
  function handle(xs, x = xs[0]) {
    (x === 68 ? DataRow : x === 100 ? CopyData : x === 65 ? NotificationResponse : x === 83 ? ParameterStatus : x === 90 ? ReadyForQuery : x === 67 ? CommandComplete : x === 50 ? BindComplete : x === 49 ? ParseComplete : x === 116 ? ParameterDescription : x === 84 ? RowDescription : x === 82 ? Authentication : x === 110 ? NoData : x === 75 ? BackendKeyData : x === 69 ? ErrorResponse : x === 115 ? PortalSuspended : x === 51 ? CloseComplete : x === 71 ? CopyInResponse : x === 78 ? NoticeResponse : x === 72 ? CopyOutResponse : x === 99 ? CopyDone : x === 73 ? EmptyQueryResponse : x === 86 ? FunctionCallResponse : x === 118 ? NegotiateProtocolVersion : x === 87 ? CopyBothResponse : UnknownMessage)(xs);
  }
  function DataRow(x) {
    let index = 7;
    let length2;
    let column;
    let value;
    const row = query.isRaw ? new Array(query.statement.columns.length) : {};
    for (let i = 0;i < query.statement.columns.length; i++) {
      column = query.statement.columns[i];
      length2 = x.readInt32BE(index);
      index += 4;
      value = length2 === -1 ? null : query.isRaw === true ? x.subarray(index, index += length2) : column.parser === undefined ? x.toString("utf8", index, index += length2) : column.parser.array === true ? column.parser(x.toString("utf8", index + 1, index += length2)) : column.parser(x.toString("utf8", index, index += length2));
      query.isRaw ? row[i] = query.isRaw === true ? value : transform.value.from ? transform.value.from(value, column) : value : row[column.name] = transform.value.from ? transform.value.from(value, column) : value;
    }
    query.forEachFn ? query.forEachFn(transform.row.from ? transform.row.from(row) : row, result) : result[rows++] = transform.row.from ? transform.row.from(row) : row;
  }
  function ParameterStatus(x) {
    const [k, v] = x.toString("utf8", 5, x.length - 1).split(bytes_default.N);
    backendParameters[k] = v;
    if (options.parameters[k] !== v) {
      options.parameters[k] = v;
      onparameter && onparameter(k, v);
    }
  }
  function ReadyForQuery(x) {
    query && query.options.simple && query.resolve(results || result);
    query = results = null;
    result = new Result;
    connectTimer.cancel();
    if (initial) {
      if (target_session_attrs) {
        if (!backendParameters.in_hot_standby || !backendParameters.default_transaction_read_only)
          return fetchState();
        else if (tryNext(target_session_attrs, backendParameters))
          return terminate();
      }
      if (needsTypes) {
        initial.reserve && (initial = null);
        return fetchArrayTypes();
      }
      initial && !initial.reserve && execute(initial);
      options.shared.retries = retries = 0;
      initial = null;
      return;
    }
    while (sent.length && (query = sent.shift()) && (query.active = true, query.cancelled))
      Connection(options).cancel(query.state, query.cancelled.resolve, query.cancelled.reject);
    if (query)
      return;
    connection2.reserved ? !connection2.reserved.release && x[5] === 73 ? ending ? terminate() : (connection2.reserved = null, onopen(connection2)) : connection2.reserved() : ending ? terminate() : onopen(connection2);
  }
  function CommandComplete(x) {
    rows = 0;
    for (let i = x.length - 1;i > 0; i--) {
      if (x[i] === 32 && x[i + 1] < 58 && result.count === null)
        result.count = +x.toString("utf8", i + 1, x.length - 1);
      if (x[i - 1] >= 65) {
        result.command = x.toString("utf8", 5, i);
        result.state = backend;
        break;
      }
    }
    final && (final(), final = null);
    if (result.command === "BEGIN" && max !== 1 && !connection2.reserved)
      return errored(Errors.generic("UNSAFE_TRANSACTION", "Only use sql.begin, sql.reserved or max: 1"));
    if (query.options.simple)
      return BindComplete();
    if (query.cursorFn) {
      result.count && query.cursorFn(result);
      write(Sync);
    }
    query.resolve(result);
  }
  function ParseComplete() {
    query.parsing = false;
  }
  function BindComplete() {
    !result.statement && (result.statement = query.statement);
    result.columns = query.statement.columns;
  }
  function ParameterDescription(x) {
    const length2 = x.readUInt16BE(5);
    for (let i = 0;i < length2; ++i)
      !query.statement.types[i] && (query.statement.types[i] = x.readUInt32BE(7 + i * 4));
    query.prepare && (statements[query.signature] = query.statement);
    query.describeFirst && !query.onlyDescribe && (write(prepared(query)), query.describeFirst = false);
  }
  function RowDescription(x) {
    if (result.command) {
      results = results || [result];
      results.push(result = new Result);
      result.count = null;
      query.statement.columns = null;
    }
    const length2 = x.readUInt16BE(5);
    let index = 7;
    let start;
    query.statement.columns = Array(length2);
    for (let i = 0;i < length2; ++i) {
      start = index;
      while (x[index++] !== 0)
        ;
      const table = x.readUInt32BE(index);
      const number = x.readUInt16BE(index + 4);
      const type = x.readUInt32BE(index + 6);
      query.statement.columns[i] = {
        name: transform.column.from ? transform.column.from(x.toString("utf8", start, index - 1)) : x.toString("utf8", start, index - 1),
        parser: parsers2[type],
        table,
        number,
        type
      };
      index += 18;
    }
    result.statement = query.statement;
    if (query.onlyDescribe)
      return query.resolve(query.statement), write(Sync);
  }
  async function Authentication(x, type = x.readUInt32BE(5)) {
    (type === 3 ? AuthenticationCleartextPassword : type === 5 ? AuthenticationMD5Password : type === 10 ? SASL : type === 11 ? SASLContinue : type === 12 ? SASLFinal : type !== 0 ? UnknownAuth : noop)(x, type);
  }
  async function AuthenticationCleartextPassword() {
    const payload = await Pass();
    write(bytes_default().p().str(payload).z(1).end());
  }
  async function AuthenticationMD5Password(x) {
    const payload = "md5" + await md5(Buffer.concat([
      Buffer.from(await md5(await Pass() + user)),
      x.subarray(9)
    ]));
    write(bytes_default().p().str(payload).z(1).end());
  }
  async function SASL() {
    nonce = (await crypto2.randomBytes(18)).toString("base64");
    bytes_default().p().str("SCRAM-SHA-256" + bytes_default.N);
    const i = bytes_default.i;
    write(bytes_default.inc(4).str("n,,n=*,r=" + nonce).i32(bytes_default.i - i - 4, i).end());
  }
  async function SASLContinue(x) {
    const res = x.toString("utf8", 9).split(",").reduce((acc, x2) => (acc[x2[0]] = x2.slice(2), acc), {});
    const saltedPassword = await crypto2.pbkdf2Sync(await Pass(), Buffer.from(res.s, "base64"), parseInt(res.i), 32, "sha256");
    const clientKey = await hmac(saltedPassword, "Client Key");
    const auth = "n=*,r=" + nonce + "," + "r=" + res.r + ",s=" + res.s + ",i=" + res.i + ",c=biws,r=" + res.r;
    serverSignature = (await hmac(await hmac(saltedPassword, "Server Key"), auth)).toString("base64");
    const payload = "c=biws,r=" + res.r + ",p=" + xor(clientKey, Buffer.from(await hmac(await sha2562(clientKey), auth))).toString("base64");
    write(bytes_default().p().str(payload).end());
  }
  function SASLFinal(x) {
    if (x.toString("utf8", 9).split(bytes_default.N, 1)[0].slice(2) === serverSignature)
      return;
    errored(Errors.generic("SASL_SIGNATURE_MISMATCH", "The server did not return the correct signature"));
    socket.destroy();
  }
  function Pass() {
    return Promise.resolve(typeof options.pass === "function" ? options.pass() : options.pass);
  }
  function NoData() {
    result.statement = query.statement;
    result.statement.columns = [];
    if (query.onlyDescribe)
      return query.resolve(query.statement), write(Sync);
  }
  function BackendKeyData(x) {
    backend.pid = x.readUInt32BE(5);
    backend.secret = x.readUInt32BE(9);
  }
  async function fetchArrayTypes() {
    needsTypes = false;
    const types2 = await new Query([`
      select b.oid, b.typarray
      from pg_catalog.pg_type a
      left join pg_catalog.pg_type b on b.oid = a.typelem
      where a.typcategory = 'A'
      group by b.oid, b.typarray
      order by b.oid
    `], [], execute);
    types2.forEach(({ oid, typarray }) => addArrayType(oid, typarray));
  }
  function addArrayType(oid, typarray) {
    if (!!options.parsers[typarray] && !!options.serializers[typarray])
      return;
    const parser = options.parsers[oid];
    options.shared.typeArrayMap[oid] = typarray;
    options.parsers[typarray] = (xs) => arrayParser(xs, parser, typarray);
    options.parsers[typarray].array = true;
    options.serializers[typarray] = (xs) => arraySerializer(xs, options.serializers[oid], options, typarray);
  }
  function tryNext(x, xs) {
    return x === "read-write" && xs.default_transaction_read_only === "on" || x === "read-only" && xs.default_transaction_read_only === "off" || x === "primary" && xs.in_hot_standby === "on" || x === "standby" && xs.in_hot_standby === "off" || x === "prefer-standby" && xs.in_hot_standby === "off" && options.host[retries];
  }
  function fetchState() {
    const query2 = new Query([`
      show transaction_read_only;
      select pg_catalog.pg_is_in_recovery()
    `], [], execute, null, { simple: true });
    query2.resolve = ([[a], [b2]]) => {
      backendParameters.default_transaction_read_only = a.transaction_read_only;
      backendParameters.in_hot_standby = b2.pg_is_in_recovery ? "on" : "off";
    };
    query2.execute();
  }
  function ErrorResponse(x) {
    query && (query.cursorFn || query.describeFirst) && write(Sync);
    const error2 = Errors.postgres(parseError(x));
    query && query.retried ? errored(query.retried) : query && query.prepared && retryRoutines.has(error2.routine) ? retry(query, error2) : errored(error2);
  }
  function retry(q, error2) {
    delete statements[q.signature];
    q.retried = error2;
    execute(q);
  }
  function NotificationResponse(x) {
    if (!onnotify)
      return;
    let index = 9;
    while (x[index++] !== 0)
      ;
    onnotify(x.toString("utf8", 9, index - 1), x.toString("utf8", index, x.length - 1));
  }
  async function PortalSuspended() {
    try {
      const x = await Promise.resolve(query.cursorFn(result));
      rows = 0;
      x === CLOSE ? write(Close(query.portal)) : (result = new Result, write(Execute("", query.cursorRows)));
    } catch (err) {
      write(Sync);
      query.reject(err);
    }
  }
  function CloseComplete() {
    result.count && query.cursorFn(result);
    query.resolve(result);
  }
  function CopyInResponse() {
    stream = new Stream.Writable({
      autoDestroy: true,
      write(chunk2, encoding, callback) {
        socket.write(bytes_default().d().raw(chunk2).end(), callback);
      },
      destroy(error2, callback) {
        callback(error2);
        socket.write(bytes_default().f().str(error2 + bytes_default.N).end());
        stream = null;
      },
      final(callback) {
        socket.write(bytes_default().c().end());
        final = callback;
      }
    });
    query.resolve(stream);
  }
  function CopyOutResponse() {
    stream = new Stream.Readable({
      read() {
        socket.resume();
      }
    });
    query.resolve(stream);
  }
  function CopyBothResponse() {
    stream = new Stream.Duplex({
      autoDestroy: true,
      read() {
        socket.resume();
      },
      write(chunk2, encoding, callback) {
        socket.write(bytes_default().d().raw(chunk2).end(), callback);
      },
      destroy(error2, callback) {
        callback(error2);
        socket.write(bytes_default().f().str(error2 + bytes_default.N).end());
        stream = null;
      },
      final(callback) {
        socket.write(bytes_default().c().end());
        final = callback;
      }
    });
    query.resolve(stream);
  }
  function CopyData(x) {
    stream && (stream.push(x.subarray(5)) || socket.pause());
  }
  function CopyDone() {
    stream && stream.push(null);
    stream = null;
  }
  function NoticeResponse(x) {
    onnotice ? onnotice(parseError(x)) : console.log(parseError(x));
  }
  function EmptyQueryResponse() {}
  function FunctionCallResponse() {
    errored(Errors.notSupported("FunctionCallResponse"));
  }
  function NegotiateProtocolVersion() {
    errored(Errors.notSupported("NegotiateProtocolVersion"));
  }
  function UnknownMessage(x) {
    console.error("Postgres.js : Unknown Message:", x[0]);
  }
  function UnknownAuth(x, type) {
    console.error("Postgres.js : Unknown Auth:", type);
  }
  function Bind(parameters, types2, statement = "", portal = "") {
    let prev, type;
    bytes_default().B().str(portal + bytes_default.N).str(statement + bytes_default.N).i16(0).i16(parameters.length);
    parameters.forEach((x, i) => {
      if (x === null)
        return bytes_default.i32(4294967295);
      type = types2[i];
      parameters[i] = x = type in options.serializers ? options.serializers[type](x) : "" + x;
      prev = bytes_default.i;
      bytes_default.inc(4).str(x).i32(bytes_default.i - prev - 4, prev);
    });
    bytes_default.i16(0);
    return bytes_default.end();
  }
  function Parse(str, parameters, types2, name = "") {
    bytes_default().P().str(name + bytes_default.N).str(str + bytes_default.N).i16(parameters.length);
    parameters.forEach((x, i) => bytes_default.i32(types2[i] || 0));
    return bytes_default.end();
  }
  function Describe(x, name = "") {
    return bytes_default().D().str(x).str(name + bytes_default.N).end();
  }
  function Execute(portal = "", rows2 = 0) {
    return Buffer.concat([
      bytes_default().E().str(portal + bytes_default.N).i32(rows2).end(),
      Flush
    ]);
  }
  function Close(portal = "") {
    return Buffer.concat([
      bytes_default().C().str("P").str(portal + bytes_default.N).end(),
      bytes_default().S().end()
    ]);
  }
  function StartupMessage() {
    return cancelMessage || bytes_default().inc(4).i16(3).z(2).str(Object.entries(Object.assign({
      user,
      database,
      client_encoding: "UTF8"
    }, options.connection)).filter(([, v]) => v).map(([k, v]) => k + bytes_default.N + v).join(bytes_default.N)).z(2).end(0);
  }
}
function parseError(x) {
  const error = {};
  let start = 5;
  for (let i = 5;i < x.length - 1; i++) {
    if (x[i] === 0) {
      error[errorFields[x[start]]] = x.toString("utf8", start + 1, i);
      start = i + 1;
    }
  }
  return error;
}
function md5(x) {
  return crypto2.createHash("md5").update(x).digest("hex");
}
function hmac(key, x) {
  return crypto2.createHmac("sha256", key).update(x).digest();
}
function sha2562(x) {
  return crypto2.createHash("sha256").update(x).digest();
}
function xor(a, b2) {
  const length = Math.max(a.length, b2.length);
  const buffer2 = Buffer.allocUnsafe(length);
  for (let i = 0;i < length; i++)
    buffer2[i] = a[i] ^ b2[i];
  return buffer2;
}
function timer(fn, seconds) {
  seconds = typeof seconds === "function" ? seconds() : seconds;
  if (!seconds)
    return { cancel: noop, start: noop };
  let timer2;
  return {
    cancel() {
      timer2 && (clearTimeout(timer2), timer2 = null);
    },
    start() {
      timer2 && clearTimeout(timer2);
      timer2 = setTimeout(done, seconds * 1000, arguments);
    }
  };
  function done(args) {
    fn.apply(null, args);
    timer2 = null;
  }
}

// ../../node_modules/postgres/src/subscribe.js
var noop2 = () => {};
function Subscribe(postgres2, options) {
  const subscribers = new Map, slot = "postgresjs_" + Math.random().toString(36).slice(2), state = {};
  let connection2, stream, ended = false;
  const sql2 = subscribe.sql = postgres2({
    ...options,
    transform: { column: {}, value: {}, row: {} },
    max: 1,
    fetch_types: false,
    idle_timeout: null,
    max_lifetime: null,
    connection: {
      ...options.connection,
      replication: "database"
    },
    onclose: async function() {
      if (ended)
        return;
      stream = null;
      state.pid = state.secret = undefined;
      connected(await init(sql2, slot, options.publications));
      subscribers.forEach((event) => event.forEach(({ onsubscribe }) => onsubscribe()));
    },
    no_subscribe: true
  });
  const { end, close } = sql2;
  sql2.end = async () => {
    ended = true;
    stream && await new Promise((r) => (stream.once("close", r), stream.end()));
    return end();
  };
  sql2.close = async () => {
    stream && await new Promise((r) => (stream.once("close", r), stream.end()));
    return close();
  };
  return subscribe;
  async function subscribe(event, fn, onsubscribe = noop2, onerror = noop2) {
    event = parseEvent(event);
    if (!connection2)
      connection2 = init(sql2, slot, options.publications);
    const subscriber = { fn, onsubscribe };
    const fns = subscribers.has(event) ? subscribers.get(event).add(subscriber) : subscribers.set(event, new Set([subscriber])).get(event);
    const unsubscribe = () => {
      fns.delete(subscriber);
      fns.size === 0 && subscribers.delete(event);
    };
    return connection2.then((x) => {
      connected(x);
      onsubscribe();
      stream && stream.on("error", onerror);
      return { unsubscribe, state, sql: sql2 };
    });
  }
  function connected(x) {
    stream = x.stream;
    state.pid = x.state.pid;
    state.secret = x.state.secret;
  }
  async function init(sql3, slot2, publications) {
    if (!publications)
      throw new Error("Missing publication names");
    const xs = await sql3.unsafe(`CREATE_REPLICATION_SLOT ${slot2} TEMPORARY LOGICAL pgoutput NOEXPORT_SNAPSHOT`);
    const [x] = xs;
    const stream2 = await sql3.unsafe(`START_REPLICATION SLOT ${slot2} LOGICAL ${x.consistent_point} (proto_version '1', publication_names '${publications}')`).writable();
    const state2 = {
      lsn: Buffer.concat(x.consistent_point.split("/").map((x2) => Buffer.from(("00000000" + x2).slice(-8), "hex")))
    };
    stream2.on("data", data);
    stream2.on("error", error);
    stream2.on("close", sql3.close);
    return { stream: stream2, state: xs.state };
    function error(e) {
      console.error("Unexpected error during logical streaming - reconnecting", e);
    }
    function data(x2) {
      if (x2[0] === 119) {
        parse2(x2.subarray(25), state2, sql3.options.parsers, handle, options.transform);
      } else if (x2[0] === 107 && x2[17]) {
        state2.lsn = x2.subarray(1, 9);
        pong();
      }
    }
    function handle(a, b2) {
      const path = b2.relation.schema + "." + b2.relation.table;
      call("*", a, b2);
      call("*:" + path, a, b2);
      b2.relation.keys.length && call("*:" + path + "=" + b2.relation.keys.map((x2) => a[x2.name]), a, b2);
      call(b2.command, a, b2);
      call(b2.command + ":" + path, a, b2);
      b2.relation.keys.length && call(b2.command + ":" + path + "=" + b2.relation.keys.map((x2) => a[x2.name]), a, b2);
    }
    function pong() {
      const x2 = Buffer.alloc(34);
      x2[0] = 114;
      x2.fill(state2.lsn, 1);
      x2.writeBigInt64BE(BigInt(Date.now() - Date.UTC(2000, 0, 1)) * BigInt(1000), 25);
      stream2.write(x2);
    }
  }
  function call(x, a, b2) {
    subscribers.has(x) && subscribers.get(x).forEach(({ fn }) => fn(a, b2, x));
  }
}
function Time(x) {
  return new Date(Date.UTC(2000, 0, 1) + Number(x / BigInt(1000)));
}
function parse2(x, state, parsers2, handle, transform) {
  const char = (acc, [k, v]) => (acc[k.charCodeAt(0)] = v, acc);
  Object.entries({
    R: (x2) => {
      let i = 1;
      const r = state[x2.readUInt32BE(i)] = {
        schema: x2.toString("utf8", i += 4, i = x2.indexOf(0, i)) || "pg_catalog",
        table: x2.toString("utf8", i + 1, i = x2.indexOf(0, i + 1)),
        columns: Array(x2.readUInt16BE(i += 2)),
        keys: []
      };
      i += 2;
      let columnIndex = 0, column;
      while (i < x2.length) {
        column = r.columns[columnIndex++] = {
          key: x2[i++],
          name: transform.column.from ? transform.column.from(x2.toString("utf8", i, i = x2.indexOf(0, i))) : x2.toString("utf8", i, i = x2.indexOf(0, i)),
          type: x2.readUInt32BE(i += 1),
          parser: parsers2[x2.readUInt32BE(i)],
          atttypmod: x2.readUInt32BE(i += 4)
        };
        column.key && r.keys.push(column);
        i += 4;
      }
    },
    Y: () => {},
    O: () => {},
    B: (x2) => {
      state.date = Time(x2.readBigInt64BE(9));
      state.lsn = x2.subarray(1, 9);
    },
    I: (x2) => {
      let i = 1;
      const relation = state[x2.readUInt32BE(i)];
      const { row } = tuples(x2, relation.columns, i += 7, transform);
      handle(row, {
        command: "insert",
        relation
      });
    },
    D: (x2) => {
      let i = 1;
      const relation = state[x2.readUInt32BE(i)];
      i += 4;
      const key = x2[i] === 75;
      handle(key || x2[i] === 79 ? tuples(x2, relation.columns, i += 3, transform).row : null, {
        command: "delete",
        relation,
        key
      });
    },
    U: (x2) => {
      let i = 1;
      const relation = state[x2.readUInt32BE(i)];
      i += 4;
      const key = x2[i] === 75;
      const xs = key || x2[i] === 79 ? tuples(x2, relation.columns, i += 3, transform) : null;
      xs && (i = xs.i);
      const { row } = tuples(x2, relation.columns, i + 3, transform);
      handle(row, {
        command: "update",
        relation,
        key,
        old: xs && xs.row
      });
    },
    T: () => {},
    C: () => {}
  }).reduce(char, {})[x[0]](x);
}
function tuples(x, columns, xi, transform) {
  let type, column, value;
  const row = transform.raw ? new Array(columns.length) : {};
  for (let i = 0;i < columns.length; i++) {
    type = x[xi++];
    column = columns[i];
    value = type === 110 ? null : type === 117 ? undefined : column.parser === undefined ? x.toString("utf8", xi + 4, xi += 4 + x.readUInt32BE(xi)) : column.parser.array === true ? column.parser(x.toString("utf8", xi + 5, xi += 4 + x.readUInt32BE(xi))) : column.parser(x.toString("utf8", xi + 4, xi += 4 + x.readUInt32BE(xi)));
    transform.raw ? row[i] = transform.raw === true ? value : transform.value.from ? transform.value.from(value, column) : value : row[column.name] = transform.value.from ? transform.value.from(value, column) : value;
  }
  return { i: xi, row: transform.row.from ? transform.row.from(row) : row };
}
function parseEvent(x) {
  const xs = x.match(/^(\*|insert|update|delete)?:?([^.]+?\.?[^=]+)?=?(.+)?/i) || [];
  if (!xs)
    throw new Error("Malformed subscribe pattern: " + x);
  const [, command, path, key] = xs;
  return (command || "*") + (path ? ":" + (path.indexOf(".") === -1 ? "public." + path : path) : "") + (key ? "=" + key : "");
}

// ../../node_modules/postgres/src/large.js
import Stream2 from "stream";
function largeObject(sql2, oid, mode = 131072 | 262144) {
  return new Promise(async (resolve, reject) => {
    await sql2.begin(async (sql3) => {
      let finish;
      !oid && ([{ oid }] = await sql3`select lo_creat(-1) as oid`);
      const [{ fd }] = await sql3`select lo_open(${oid}, ${mode}) as fd`;
      const lo = {
        writable,
        readable,
        close: () => sql3`select lo_close(${fd})`.then(finish),
        tell: () => sql3`select lo_tell64(${fd})`,
        read: (x) => sql3`select loread(${fd}, ${x}) as data`,
        write: (x) => sql3`select lowrite(${fd}, ${x})`,
        truncate: (x) => sql3`select lo_truncate64(${fd}, ${x})`,
        seek: (x, whence = 0) => sql3`select lo_lseek64(${fd}, ${x}, ${whence})`,
        size: () => sql3`
          select
            lo_lseek64(${fd}, location, 0) as position,
            seek.size
          from (
            select
              lo_lseek64($1, 0, 2) as size,
              tell.location
            from (select lo_tell64($1) as location) tell
          ) seek
        `
      };
      resolve(lo);
      return new Promise(async (r) => finish = r);
      async function readable({
        highWaterMark = 2048 * 8,
        start = 0,
        end = Infinity
      } = {}) {
        let max = end - start;
        start && await lo.seek(start);
        return new Stream2.Readable({
          highWaterMark,
          async read(size2) {
            const l = size2 > max ? size2 - max : size2;
            max -= size2;
            const [{ data }] = await lo.read(l);
            this.push(data);
            if (data.length < size2)
              this.push(null);
          }
        });
      }
      async function writable({
        highWaterMark = 2048 * 8,
        start = 0
      } = {}) {
        start && await lo.seek(start);
        return new Stream2.Writable({
          highWaterMark,
          write(chunk, encoding, callback) {
            lo.write(chunk).then(() => callback(), callback);
          }
        });
      }
    }).catch(reject);
  });
}

// ../../node_modules/postgres/src/index.js
Object.assign(Postgres, {
  PostgresError,
  toPascal,
  pascal,
  toCamel,
  camel,
  toKebab,
  kebab,
  fromPascal,
  fromCamel,
  fromKebab,
  BigInt: {
    to: 20,
    from: [20],
    parse: (x) => BigInt(x),
    serialize: (x) => x.toString()
  }
});
var src_default = Postgres;
function Postgres(a, b2) {
  const options = parseOptions(a, b2), subscribe = options.no_subscribe || Subscribe(Postgres, { ...options });
  let ending = false;
  const queries = queue_default(), connecting = queue_default(), reserved = queue_default(), closed = queue_default(), ended = queue_default(), open = queue_default(), busy = queue_default(), full = queue_default(), queues = { connecting, reserved, closed, ended, open, busy, full };
  const connections = [...Array(options.max)].map(() => connection_default(options, queues, { onopen, onend, onclose }));
  const sql2 = Sql(handler);
  Object.assign(sql2, {
    get parameters() {
      return options.parameters;
    },
    largeObject: largeObject.bind(null, sql2),
    subscribe,
    CLOSE,
    END: CLOSE,
    PostgresError,
    options,
    reserve,
    listen,
    begin,
    close,
    end
  });
  return sql2;
  function Sql(handler2) {
    handler2.debug = options.debug;
    Object.entries(options.types).reduce((acc, [name, type]) => {
      acc[name] = (x) => new Parameter(x, type.to);
      return acc;
    }, typed);
    Object.assign(sql3, {
      types: typed,
      typed,
      unsafe,
      notify,
      array,
      json,
      file
    });
    return sql3;
    function typed(value, type) {
      return new Parameter(value, type);
    }
    function sql3(strings, ...args) {
      const query = strings && Array.isArray(strings.raw) ? new Query(strings, args, handler2, cancel) : typeof strings === "string" && !args.length ? new Identifier(options.transform.column.to ? options.transform.column.to(strings) : strings) : new Builder(strings, args);
      return query;
    }
    function unsafe(string, args = [], options2 = {}) {
      arguments.length === 2 && !Array.isArray(args) && (options2 = args, args = []);
      const query = new Query([string], args, handler2, cancel, {
        prepare: false,
        ...options2,
        simple: "simple" in options2 ? options2.simple : args.length === 0
      });
      return query;
    }
    function file(path, args = [], options2 = {}) {
      arguments.length === 2 && !Array.isArray(args) && (options2 = args, args = []);
      const query = new Query([], args, (query2) => {
        fs.readFile(path, "utf8", (err, string) => {
          if (err)
            return query2.reject(err);
          query2.strings = [string];
          handler2(query2);
        });
      }, cancel, {
        ...options2,
        simple: "simple" in options2 ? options2.simple : args.length === 0
      });
      return query;
    }
  }
  async function listen(name, fn, onlisten) {
    const listener = { fn, onlisten };
    const sql3 = listen.sql || (listen.sql = Postgres({
      ...options,
      max: 1,
      idle_timeout: null,
      max_lifetime: null,
      fetch_types: false,
      onclose() {
        Object.entries(listen.channels).forEach(([name2, { listeners }]) => {
          delete listen.channels[name2];
          Promise.all(listeners.map((l) => listen(name2, l.fn, l.onlisten).catch(() => {})));
        });
      },
      onnotify(c, x) {
        c in listen.channels && listen.channels[c].listeners.forEach((l) => l.fn(x));
      }
    }));
    const channels = listen.channels || (listen.channels = {}), exists2 = name in channels;
    if (exists2) {
      channels[name].listeners.push(listener);
      const result2 = await channels[name].result;
      listener.onlisten && listener.onlisten();
      return { state: result2.state, unlisten };
    }
    channels[name] = { result: sql3`listen ${sql3.unsafe('"' + name.replace(/"/g, '""') + '"')}`, listeners: [listener] };
    const result = await channels[name].result;
    listener.onlisten && listener.onlisten();
    return { state: result.state, unlisten };
    async function unlisten() {
      if (name in channels === false)
        return;
      channels[name].listeners = channels[name].listeners.filter((x) => x !== listener);
      if (channels[name].listeners.length)
        return;
      delete channels[name];
      return sql3`unlisten ${sql3.unsafe('"' + name.replace(/"/g, '""') + '"')}`;
    }
  }
  async function notify(channel, payload) {
    return await sql2`select pg_notify(${channel}, ${"" + payload})`;
  }
  async function reserve() {
    const queue = queue_default();
    const c = open.length ? open.shift() : await new Promise((resolve, reject) => {
      const query = { reserve: resolve, reject };
      queries.push(query);
      closed.length && connect(closed.shift(), query);
    });
    move(c, reserved);
    c.reserved = () => queue.length ? c.execute(queue.shift()) : move(c, reserved);
    c.reserved.release = true;
    const sql3 = Sql(handler2);
    sql3.release = () => {
      c.reserved = null;
      onopen(c);
    };
    return sql3;
    function handler2(q) {
      c.queue === full ? queue.push(q) : c.execute(q) || move(c, full);
    }
  }
  async function begin(options2, fn) {
    !fn && (fn = options2, options2 = "");
    const queries2 = queue_default();
    let savepoints = 0, connection2, prepare = null;
    try {
      await sql2.unsafe("begin " + options2.replace(/[^a-z ]/ig, ""), [], { onexecute }).execute();
      return await Promise.race([
        scope(connection2, fn),
        new Promise((_, reject) => connection2.onclose = reject)
      ]);
    } catch (error) {
      throw error;
    }
    async function scope(c, fn2, name) {
      const sql3 = Sql(handler2);
      sql3.savepoint = savepoint;
      sql3.prepare = (x) => prepare = x.replace(/[^a-z0-9$-_. ]/gi);
      let uncaughtError, result;
      name && await sql3`savepoint ${sql3(name)}`;
      try {
        result = await new Promise((resolve, reject) => {
          const x = fn2(sql3);
          Promise.resolve(Array.isArray(x) ? Promise.all(x) : x).then(resolve, reject);
        });
        if (uncaughtError)
          throw uncaughtError;
      } catch (e) {
        await (name ? sql3`rollback to ${sql3(name)}` : sql3`rollback`);
        throw e instanceof PostgresError && e.code === "25P02" && uncaughtError || e;
      }
      if (!name) {
        prepare ? await sql3`prepare transaction '${sql3.unsafe(prepare)}'` : await sql3`commit`;
      }
      return result;
      function savepoint(name2, fn3) {
        if (name2 && Array.isArray(name2.raw))
          return savepoint((sql4) => sql4.apply(sql4, arguments));
        arguments.length === 1 && (fn3 = name2, name2 = null);
        return scope(c, fn3, "s" + savepoints++ + (name2 ? "_" + name2 : ""));
      }
      function handler2(q) {
        q.catch((e) => uncaughtError || (uncaughtError = e));
        c.queue === full ? queries2.push(q) : c.execute(q) || move(c, full);
      }
    }
    function onexecute(c) {
      connection2 = c;
      move(c, reserved);
      c.reserved = () => queries2.length ? c.execute(queries2.shift()) : move(c, reserved);
    }
  }
  function move(c, queue) {
    c.queue.remove(c);
    queue.push(c);
    c.queue = queue;
    queue === open ? c.idleTimer.start() : c.idleTimer.cancel();
    return c;
  }
  function json(x) {
    return new Parameter(x, 3802);
  }
  function array(x, type) {
    if (!Array.isArray(x))
      return array(Array.from(arguments));
    return new Parameter(x, type || (x.length ? inferType(x) || 25 : 0), options.shared.typeArrayMap);
  }
  function handler(query) {
    if (ending)
      return query.reject(Errors.connection("CONNECTION_ENDED", options, options));
    if (open.length)
      return go(open.shift(), query);
    if (closed.length)
      return connect(closed.shift(), query);
    busy.length ? go(busy.shift(), query) : queries.push(query);
  }
  function go(c, query) {
    return c.execute(query) ? move(c, busy) : move(c, full);
  }
  function cancel(query) {
    return new Promise((resolve, reject) => {
      query.state ? query.active ? connection_default(options).cancel(query.state, resolve, reject) : query.cancelled = { resolve, reject } : (queries.remove(query), query.cancelled = true, query.reject(Errors.generic("57014", "canceling statement due to user request")), resolve());
    });
  }
  async function end({ timeout = null } = {}) {
    if (ending)
      return ending;
    await 1;
    let timer2;
    return ending = Promise.race([
      new Promise((r) => timeout !== null && (timer2 = setTimeout(destroy, timeout * 1000, r))),
      Promise.all(connections.map((c) => c.end()).concat(listen.sql ? listen.sql.end({ timeout: 0 }) : [], subscribe.sql ? subscribe.sql.end({ timeout: 0 }) : []))
    ]).then(() => clearTimeout(timer2));
  }
  async function close() {
    await Promise.all(connections.map((c) => c.end()));
  }
  async function destroy(resolve) {
    await Promise.all(connections.map((c) => c.terminate()));
    while (queries.length)
      queries.shift().reject(Errors.connection("CONNECTION_DESTROYED", options));
    resolve();
  }
  function connect(c, query) {
    move(c, connecting);
    c.connect(query);
    return c;
  }
  function onend(c) {
    move(c, ended);
  }
  function onopen(c) {
    if (queries.length === 0)
      return move(c, open);
    let max = Math.ceil(queries.length / (connecting.length + 1)), ready = true;
    while (ready && queries.length && max-- > 0) {
      const query = queries.shift();
      if (query.reserve)
        return query.reserve(c);
      ready = c.execute(query);
    }
    ready ? move(c, busy) : move(c, full);
  }
  function onclose(c, e) {
    move(c, closed);
    c.reserved = null;
    c.onclose && (c.onclose(e), c.onclose = null);
    options.onclose && options.onclose(c.id);
    queries.length && connect(c, queries.shift());
  }
}
function parseOptions(a, b2) {
  if (a && a.shared)
    return a;
  const env = process.env, o = (!a || typeof a === "string" ? b2 : a) || {}, { url, multihost } = parseUrl(a), query = [...url.searchParams].reduce((a2, [b3, c]) => (a2[b3] = c, a2), {}), host = o.hostname || o.host || multihost || url.hostname || env.PGHOST || "localhost", port = o.port || url.port || env.PGPORT || 5432, user = o.user || o.username || url.username || env.PGUSERNAME || env.PGUSER || osUsername();
  o.no_prepare && (o.prepare = false);
  query.sslmode && (query.ssl = query.sslmode, delete query.sslmode);
  "timeout" in o && (console.log("The timeout option is deprecated, use idle_timeout instead"), o.idle_timeout = o.timeout);
  query.sslrootcert === "system" && (query.ssl = "verify-full");
  const ints = ["idle_timeout", "connect_timeout", "max_lifetime", "max_pipeline", "backoff", "keep_alive"];
  const defaults = {
    max: 10,
    ssl: false,
    idle_timeout: null,
    connect_timeout: 30,
    max_lifetime,
    max_pipeline: 100,
    backoff,
    keep_alive: 60,
    prepare: true,
    debug: false,
    fetch_types: true,
    publications: "alltables",
    target_session_attrs: null
  };
  return {
    host: Array.isArray(host) ? host : host.split(",").map((x) => x.split(":")[0]),
    port: Array.isArray(port) ? port : host.split(",").map((x) => parseInt(x.split(":")[1] || port)),
    path: o.path || host.indexOf("/") > -1 && host + "/.s.PGSQL." + port,
    database: o.database || o.db || (url.pathname || "").slice(1) || env.PGDATABASE || user,
    user,
    pass: o.pass || o.password || url.password || env.PGPASSWORD || "",
    ...Object.entries(defaults).reduce((acc, [k, d]) => {
      const value = k in o ? o[k] : (k in query) ? query[k] === "disable" || query[k] === "false" ? false : query[k] : env["PG" + k.toUpperCase()] || d;
      acc[k] = typeof value === "string" && ints.includes(k) ? +value : value;
      return acc;
    }, {}),
    connection: {
      application_name: env.PGAPPNAME || "postgres.js",
      ...o.connection,
      ...Object.entries(query).reduce((acc, [k, v]) => ((k in defaults) || (acc[k] = v), acc), {})
    },
    types: o.types || {},
    target_session_attrs: tsa(o, url, env),
    onnotice: o.onnotice,
    onnotify: o.onnotify,
    onclose: o.onclose,
    onparameter: o.onparameter,
    socket: o.socket,
    transform: parseTransform(o.transform || { undefined: undefined }),
    parameters: {},
    shared: { retries: 0, typeArrayMap: {} },
    ...mergeUserTypes(o.types)
  };
}
function tsa(o, url, env) {
  const x = o.target_session_attrs || url.searchParams.get("target_session_attrs") || env.PGTARGETSESSIONATTRS;
  if (!x || ["read-write", "read-only", "primary", "standby", "prefer-standby"].includes(x))
    return x;
  throw new Error("target_session_attrs " + x + " is not supported");
}
function backoff(retries) {
  return (0.5 + Math.random() / 2) * Math.min(3 ** retries / 100, 20);
}
function max_lifetime() {
  return 60 * (30 + Math.random() * 30);
}
function parseTransform(x) {
  return {
    undefined: x.undefined,
    column: {
      from: typeof x.column === "function" ? x.column : x.column && x.column.from,
      to: x.column && x.column.to
    },
    value: {
      from: typeof x.value === "function" ? x.value : x.value && x.value.from,
      to: x.value && x.value.to
    },
    row: {
      from: typeof x.row === "function" ? x.row : x.row && x.row.from,
      to: x.row && x.row.to
    }
  };
}
function parseUrl(url) {
  if (!url || typeof url !== "string")
    return { url: { searchParams: new Map } };
  let host = url;
  host = host.slice(host.indexOf("://") + 3).split(/[?/]/)[0];
  host = decodeURIComponent(host.slice(host.indexOf("@") + 1));
  const urlObj = new URL(url.replace(host, host.split(",")[0]));
  return {
    url: {
      username: decodeURIComponent(urlObj.username),
      password: decodeURIComponent(urlObj.password),
      host: urlObj.host,
      hostname: urlObj.hostname,
      port: urlObj.port,
      pathname: urlObj.pathname,
      searchParams: urlObj.searchParams
    },
    multihost: host.indexOf(",") > -1 && host
  };
}
function osUsername() {
  try {
    return os.userInfo().username;
  } catch (_) {
    return process.env.USERNAME || process.env.USER || process.env.LOGNAME;
  }
}

// src/db/schema.ts
var exports_schema = {};
__export(exports_schema, {
  usersRelations: () => usersRelations,
  users: () => users,
  userRoleEnum: () => userRoleEnum,
  transactionsRelations: () => transactionsRelations,
  transactions: () => transactions,
  transactionTypeEnum: () => transactionTypeEnum,
  transactionStatusEnum: () => transactionStatusEnum,
  teamsRelations: () => teamsRelations,
  teams: () => teams,
  teamRoleEnum: () => teamRoleEnum,
  teamMembers: () => teamMembers,
  messages: () => messages2,
  landingPages: () => landingPages,
  currencyTypeEnum: () => currencyTypeEnum,
  currencies: () => currencies,
  contracts: () => contracts,
  channelsRelations: () => channelsRelations,
  channels: () => channels,
  channelVisibilityEnum: () => channelVisibilityEnum,
  channelMembers: () => channelMembers,
  blocks: () => blocks,
  balances: () => balances,
  authSessions: () => authSessions,
  authSessionStatusEnum: () => authSessionStatusEnum
});
var currencyTypeEnum = pgEnum("currency_type", ["fiat", "crypto"]);
var userRoleEnum = pgEnum("user_role", ["sovereign", "staff", "user"]);
var teamRoleEnum = pgEnum("team_role", ["owner", "admin", "member"]);
var channelVisibilityEnum = pgEnum("channel_visibility", ["public", "private", "team"]);
var transactionTypeEnum = pgEnum("transaction_type", ["transfer", "deposit", "withdraw", "contract_call", "user_creation", "contract_deployment", "role_change"]);
var transactionStatusEnum = pgEnum("transaction_status", ["pending", "confirmed", "failed"]);
var authSessionStatusEnum = pgEnum("auth_session_status", ["waiting", "scanned", "approved", "rejected", "expired"]);
var users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  publicKey: text("public_key").notNull().unique(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  displayName: varchar("display_name", { length: 100 }).notNull(),
  role: userRoleEnum("role").notNull().default("user"),
  bio: text("bio"),
  avatarData: text("avatar_data"),
  avatarHash: varchar("avatar_hash", { length: 64 }),
  landingPageId: uuid("landing_page_id"),
  nonce: bigint("nonce", { mode: "number" }).notNull().default(0),
  stateHash: varchar("state_hash", { length: 64 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});
var teams = pgTable("teams", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),
  description: text("description"),
  avatarData: text("avatar_data"),
  landingPageId: uuid("landing_page_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});
var teamMembers = pgTable("team_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  teamId: uuid("team_id").notNull().references(() => teams.id, { onDelete: "cascade" }),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  role: teamRoleEnum("role").notNull().default("member"),
  joinedAt: timestamp("joined_at").notNull().defaultNow()
});
var channels = pgTable("channels", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 50 }).notNull(),
  teamId: uuid("team_id").references(() => teams.id, { onDelete: "cascade" }),
  visibility: channelVisibilityEnum("visibility").notNull().default("public"),
  description: text("description"),
  landingPageId: uuid("landing_page_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});
var channelMembers = pgTable("channel_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  channelId: uuid("channel_id").notNull().references(() => channels.id, { onDelete: "cascade" }),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  joinedAt: timestamp("joined_at").notNull().defaultNow()
});
var messages2 = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  channelId: uuid("channel_id").notNull().references(() => channels.id, { onDelete: "cascade" }),
  authorId: uuid("author_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  signature: text("signature").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var currencies = pgTable("currencies", {
  code: varchar("code", { length: 10 }).primaryKey(),
  type: currencyTypeEnum("type").notNull(),
  decimals: decimal("decimals", { precision: 2 }).notNull(),
  verified: boolean("verified").notNull().default(false),
  name: varchar("name", { length: 100 }),
  symbol: varchar("symbol", { length: 10 }),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var balances = pgTable("balances", {
  id: uuid("id").primaryKey().defaultRandom(),
  ownerId: uuid("owner_id").notNull(),
  ownerType: varchar("owner_type", { length: 10 }).notNull(),
  currencyCode: varchar("currency_code", { length: 10 }).notNull().references(() => currencies.code),
  amount: decimal("amount", { precision: 20, scale: 8 }).notNull().default("0"),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});
var transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  from: uuid("from").notNull(),
  to: uuid("to").notNull(),
  amount: decimal("amount", { precision: 20, scale: 8 }),
  currencyCode: varchar("currency_code", { length: 10 }).references(() => currencies.code),
  type: transactionTypeEnum("type").notNull(),
  contractId: uuid("contract_id"),
  contractInput: jsonb("contract_input"),
  metadata: jsonb("metadata"),
  signature: text("signature").notNull(),
  status: transactionStatusEnum("status").notNull().default("pending"),
  blockHeight: bigint("block_height", { mode: "number" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  confirmedAt: timestamp("confirmed_at")
});
var blocks = pgTable("blocks", {
  height: bigint("height", { mode: "number" }).primaryKey(),
  hash: varchar("hash", { length: 64 }).notNull().unique(),
  previousHash: varchar("previous_hash", { length: 64 }).notNull(),
  timestamp: timestamp("timestamp").notNull(),
  producer: uuid("producer").notNull(),
  txCount: decimal("tx_count", { precision: 10 }).notNull().default("0"),
  stateRoot: varchar("state_root", { length: 64 }).notNull(),
  txRoot: varchar("tx_root", { length: 64 }),
  gasUsed: bigint("gas_used", { mode: "number" }).notNull().default(0),
  gasLimit: bigint("gas_limit", { mode: "number" }).notNull(),
  metadata: jsonb("metadata"),
  signature: text("signature").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  finalizedAt: timestamp("finalized_at")
});
var contracts = pgTable("contracts", {
  id: uuid("id").primaryKey().defaultRandom(),
  ownerId: uuid("owner_id").notNull().references(() => users.id),
  name: varchar("name", { length: 100 }).notNull(),
  sourceCode: text("source_code").notNull(),
  initCode: text("init_code"),
  contractCode: text("contract_code").notNull(),
  getCode: text("get_code"),
  postCode: text("post_code"),
  hasInit: boolean("has_init").notNull().default(false),
  hasGet: boolean("has_get").notNull().default(false),
  hasPost: boolean("has_post").notNull().default(false),
  version: varchar("version", { length: 20 }).notNull().default("1.0.0"),
  isActive: boolean("is_active").notNull().default(true),
  deployedInBlock: bigint("deployed_in_block", { mode: "number" }).notNull(),
  deploymentTxId: uuid("deployment_tx_id").notNull(),
  description: text("description"),
  metadata: jsonb("metadata"),
  codeHash: varchar("code_hash", { length: 64 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});
var landingPages = pgTable("landing_pages", {
  id: uuid("id").primaryKey().defaultRandom(),
  ownerId: uuid("owner_id").notNull(),
  version: decimal("version", { precision: 10 }).notNull().default("1"),
  sourceHTML: text("source_html").notNull(),
  sourceCSS: text("source_css"),
  sourceTypeScript: text("source_typescript"),
  compiledJS: text("compiled_js"),
  islands: jsonb("islands"),
  title: varchar("title", { length: 200 }),
  description: text("description"),
  customDomain: varchar("custom_domain", { length: 100 }),
  buildHash: varchar("build_hash", { length: 64 }).notNull(),
  deployedBy: uuid("deployed_by").notNull().references(() => users.id),
  deployedAt: timestamp("deployed_at").notNull().defaultNow()
});
var authSessions = pgTable("auth_sessions", {
  id: text("id").primaryKey(),
  challenge: text("challenge").notNull().unique(),
  status: authSessionStatusEnum("status").notNull().default("waiting"),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  username: text("username"),
  publicKey: text("public_key"),
  sessionToken: text("session_token").unique(),
  returnUrl: text("return_url").notNull(),
  appName: text("app_name"),
  appIcon: text("app_icon"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
  approvedAt: timestamp("approved_at"),
  scannedAt: timestamp("scanned_at")
});
var usersRelations = relations(users, ({ many }) => ({
  teamMemberships: many(teamMembers),
  channelMemberships: many(channelMembers),
  messages: many(messages2),
  deployedPages: many(landingPages)
}));
var teamsRelations = relations(teams, ({ many }) => ({
  members: many(teamMembers),
  channels: many(channels)
}));
var channelsRelations = relations(channels, ({ many, one }) => ({
  team: one(teams, {
    fields: [channels.teamId],
    references: [teams.id]
  }),
  members: many(channelMembers),
  messages: many(messages2)
}));
var transactionsRelations = relations(transactions, ({ one }) => ({
  currency: one(currencies, {
    fields: [transactions.currencyCode],
    references: [currencies.code]
  })
}));

// src/db/index.ts
var connectionString = process.env.DATABASE_URL || "postgres://tana:tana_dev_password@localhost:5432/tana";
var client = src_default(connectionString);
var db = drizzle(client, { schema: exports_schema });

// src/accounts/users.ts
import { createHash as createHash2, randomUUID } from "crypto";

// ../../node_modules/@noble/ed25519/index.js
/*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) */
var ed25519_CURVE = {
  p: 0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,
  n: 0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,
  h: 8n,
  a: 0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,
  d: 0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,
  Gx: 0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,
  Gy: 0x6666666666666666666666666666666666666666666666666666666666666658n
};
var { p: P, n: N, Gx, Gy, a: _a, d: _d, h } = ed25519_CURVE;
var L = 32;
var L2 = 64;
var captureTrace = (...args) => {
  if ("captureStackTrace" in Error && typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(...args);
  }
};
var err = (message = "") => {
  const e = new Error(message);
  captureTrace(e, err);
  throw e;
};
var isBig = (n) => typeof n === "bigint";
var isStr = (s) => typeof s === "string";
var isBytes = (a) => a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
var abytes = (value, length, title = "") => {
  const bytes = isBytes(value);
  const len = value?.length;
  const needsLen = length !== undefined;
  if (!bytes || needsLen && len !== length) {
    const prefix = title && `"${title}" `;
    const ofLen = needsLen ? ` of length ${length}` : "";
    const got = bytes ? `length=${len}` : `type=${typeof value}`;
    err(prefix + "expected Uint8Array" + ofLen + ", got " + got);
  }
  return value;
};
var u8n = (len) => new Uint8Array(len);
var u8fr = (buf) => Uint8Array.from(buf);
var padh = (n, pad) => n.toString(16).padStart(pad, "0");
var bytesToHex = (b2) => Array.from(abytes(b2)).map((e) => padh(e, 2)).join("");
var C = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
var _ch = (ch) => {
  if (ch >= C._0 && ch <= C._9)
    return ch - C._0;
  if (ch >= C.A && ch <= C.F)
    return ch - (C.A - 10);
  if (ch >= C.a && ch <= C.f)
    return ch - (C.a - 10);
  return;
};
var hexToBytes = (hex) => {
  const e = "hex invalid";
  if (!isStr(hex))
    return err(e);
  const hl = hex.length;
  const al = hl / 2;
  if (hl % 2)
    return err(e);
  const array = u8n(al);
  for (let ai = 0, hi = 0;ai < al; ai++, hi += 2) {
    const n1 = _ch(hex.charCodeAt(hi));
    const n2 = _ch(hex.charCodeAt(hi + 1));
    if (n1 === undefined || n2 === undefined)
      return err(e);
    array[ai] = n1 * 16 + n2;
  }
  return array;
};
var cr = () => globalThis?.crypto;
var subtle = () => cr()?.subtle ?? err("crypto.subtle must be defined, consider polyfill");
var concatBytes = (...arrs) => {
  const r = u8n(arrs.reduce((sum, a) => sum + abytes(a).length, 0));
  let pad = 0;
  arrs.forEach((a) => {
    r.set(a, pad);
    pad += a.length;
  });
  return r;
};
var big = BigInt;
var assertRange = (n, min, max, msg = "bad number: out of range") => isBig(n) && min <= n && n < max ? n : err(msg);
var M = (a, b2 = P) => {
  const r = a % b2;
  return r >= 0n ? r : b2 + r;
};
var modN = (a) => M(a, N);
var invert = (num, md) => {
  if (num === 0n || md <= 0n)
    err("no inverse n=" + num + " mod=" + md);
  let a = M(num, md), b2 = md, x = 0n, y = 1n, u = 1n, v = 0n;
  while (a !== 0n) {
    const q = b2 / a, r = b2 % a;
    const m = x - u * q, n = y - v * q;
    b2 = a, a = r, x = u, y = v, u = m, v = n;
  }
  return b2 === 1n ? M(x, md) : err("no inverse");
};
var apoint = (p) => p instanceof Point ? p : err("Point expected");
var B256 = 2n ** 256n;

class Point {
  static BASE;
  static ZERO;
  X;
  Y;
  Z;
  T;
  constructor(X, Y, Z, T) {
    const max = B256;
    this.X = assertRange(X, 0n, max);
    this.Y = assertRange(Y, 0n, max);
    this.Z = assertRange(Z, 1n, max);
    this.T = assertRange(T, 0n, max);
    Object.freeze(this);
  }
  static CURVE() {
    return ed25519_CURVE;
  }
  static fromAffine(p) {
    return new Point(p.x, p.y, 1n, M(p.x * p.y));
  }
  static fromBytes(hex, zip215 = false) {
    const d = _d;
    const normed = u8fr(abytes(hex, L));
    const lastByte = hex[31];
    normed[31] = lastByte & ~128;
    const y = bytesToNumLE(normed);
    const max = zip215 ? B256 : P;
    assertRange(y, 0n, max);
    const y2 = M(y * y);
    const u = M(y2 - 1n);
    const v = M(d * y2 + 1n);
    let { isValid, value: x } = uvRatio(u, v);
    if (!isValid)
      err("bad point: y not sqrt");
    const isXOdd = (x & 1n) === 1n;
    const isLastByteOdd = (lastByte & 128) !== 0;
    if (!zip215 && x === 0n && isLastByteOdd)
      err("bad point: x==0, isLastByteOdd");
    if (isLastByteOdd !== isXOdd)
      x = M(-x);
    return new Point(x, y, 1n, M(x * y));
  }
  static fromHex(hex, zip215) {
    return Point.fromBytes(hexToBytes(hex), zip215);
  }
  get x() {
    return this.toAffine().x;
  }
  get y() {
    return this.toAffine().y;
  }
  assertValidity() {
    const a = _a;
    const d = _d;
    const p = this;
    if (p.is0())
      return err("bad point: ZERO");
    const { X, Y, Z, T } = p;
    const X2 = M(X * X);
    const Y2 = M(Y * Y);
    const Z2 = M(Z * Z);
    const Z4 = M(Z2 * Z2);
    const aX2 = M(X2 * a);
    const left = M(Z2 * M(aX2 + Y2));
    const right = M(Z4 + M(d * M(X2 * Y2)));
    if (left !== right)
      return err("bad point: equation left != right (1)");
    const XY = M(X * Y);
    const ZT = M(Z * T);
    if (XY !== ZT)
      return err("bad point: equation left != right (2)");
    return this;
  }
  equals(other) {
    const { X: X1, Y: Y1, Z: Z1 } = this;
    const { X: X2, Y: Y2, Z: Z2 } = apoint(other);
    const X1Z2 = M(X1 * Z2);
    const X2Z1 = M(X2 * Z1);
    const Y1Z2 = M(Y1 * Z2);
    const Y2Z1 = M(Y2 * Z1);
    return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
  }
  is0() {
    return this.equals(I);
  }
  negate() {
    return new Point(M(-this.X), this.Y, this.Z, M(-this.T));
  }
  double() {
    const { X: X1, Y: Y1, Z: Z1 } = this;
    const a = _a;
    const A = M(X1 * X1);
    const B = M(Y1 * Y1);
    const C2 = M(2n * M(Z1 * Z1));
    const D = M(a * A);
    const x1y1 = X1 + Y1;
    const E = M(M(x1y1 * x1y1) - A - B);
    const G = D + B;
    const F = G - C2;
    const H = D - B;
    const X3 = M(E * F);
    const Y3 = M(G * H);
    const T3 = M(E * H);
    const Z3 = M(F * G);
    return new Point(X3, Y3, Z3, T3);
  }
  add(other) {
    const { X: X1, Y: Y1, Z: Z1, T: T1 } = this;
    const { X: X2, Y: Y2, Z: Z2, T: T2 } = apoint(other);
    const a = _a;
    const d = _d;
    const A = M(X1 * X2);
    const B = M(Y1 * Y2);
    const C2 = M(T1 * d * T2);
    const D = M(Z1 * Z2);
    const E = M((X1 + Y1) * (X2 + Y2) - A - B);
    const F = M(D - C2);
    const G = M(D + C2);
    const H = M(B - a * A);
    const X3 = M(E * F);
    const Y3 = M(G * H);
    const T3 = M(E * H);
    const Z3 = M(F * G);
    return new Point(X3, Y3, Z3, T3);
  }
  subtract(other) {
    return this.add(apoint(other).negate());
  }
  multiply(n, safe = true) {
    if (!safe && (n === 0n || this.is0()))
      return I;
    assertRange(n, 1n, N);
    if (n === 1n)
      return this;
    if (this.equals(G))
      return wNAF(n).p;
    let p = I;
    let f = G;
    for (let d = this;n > 0n; d = d.double(), n >>= 1n) {
      if (n & 1n)
        p = p.add(d);
      else if (safe)
        f = f.add(d);
    }
    return p;
  }
  multiplyUnsafe(scalar) {
    return this.multiply(scalar, false);
  }
  toAffine() {
    const { X, Y, Z } = this;
    if (this.equals(I))
      return { x: 0n, y: 1n };
    const iz = invert(Z, P);
    if (M(Z * iz) !== 1n)
      err("invalid inverse");
    const x = M(X * iz);
    const y = M(Y * iz);
    return { x, y };
  }
  toBytes() {
    const { x, y } = this.assertValidity().toAffine();
    const b2 = numTo32bLE(y);
    b2[31] |= x & 1n ? 128 : 0;
    return b2;
  }
  toHex() {
    return bytesToHex(this.toBytes());
  }
  clearCofactor() {
    return this.multiply(big(h), false);
  }
  isSmallOrder() {
    return this.clearCofactor().is0();
  }
  isTorsionFree() {
    let p = this.multiply(N / 2n, false).double();
    if (N % 2n)
      p = p.add(this);
    return p.is0();
  }
}
var G = new Point(Gx, Gy, 1n, M(Gx * Gy));
var I = new Point(0n, 1n, 1n, 0n);
Point.BASE = G;
Point.ZERO = I;
var numTo32bLE = (num) => hexToBytes(padh(assertRange(num, 0n, B256), L2)).reverse();
var bytesToNumLE = (b2) => big("0x" + bytesToHex(u8fr(abytes(b2)).reverse()));
var pow2 = (x, power) => {
  let r = x;
  while (power-- > 0n) {
    r *= r;
    r %= P;
  }
  return r;
};
var pow_2_252_3 = (x) => {
  const x2 = x * x % P;
  const b2 = x2 * x % P;
  const b4 = pow2(b2, 2n) * b2 % P;
  const b5 = pow2(b4, 1n) * x % P;
  const b10 = pow2(b5, 5n) * b5 % P;
  const b20 = pow2(b10, 10n) * b10 % P;
  const b40 = pow2(b20, 20n) * b20 % P;
  const b80 = pow2(b40, 40n) * b40 % P;
  const b160 = pow2(b80, 80n) * b80 % P;
  const b240 = pow2(b160, 80n) * b80 % P;
  const b250 = pow2(b240, 10n) * b10 % P;
  const pow_p_5_8 = pow2(b250, 2n) * x % P;
  return { pow_p_5_8, b2 };
};
var RM1 = 0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n;
var uvRatio = (u, v) => {
  const v3 = M(v * v * v);
  const v7 = M(v3 * v3 * v);
  const pow = pow_2_252_3(u * v7).pow_p_5_8;
  let x = M(u * v3 * pow);
  const vx2 = M(v * x * x);
  const root1 = x;
  const root2 = M(x * RM1);
  const useRoot1 = vx2 === u;
  const useRoot2 = vx2 === M(-u);
  const noRoot = vx2 === M(-u * RM1);
  if (useRoot1)
    x = root1;
  if (useRoot2 || noRoot)
    x = root2;
  if ((M(x) & 1n) === 1n)
    x = M(-x);
  return { isValid: useRoot1 || useRoot2, value: x };
};
var modL_LE = (hash) => modN(bytesToNumLE(hash));
var sha512a = (...m) => hashes.sha512Async(concatBytes(...m));
var hashFinishA = (res) => sha512a(res.hashable).then(res.finish);
var defaultVerifyOpts = { zip215: true };
var _verify = (sig, msg, pub, opts = defaultVerifyOpts) => {
  sig = abytes(sig, L2);
  msg = abytes(msg);
  pub = abytes(pub, L);
  const { zip215 } = opts;
  let A;
  let R;
  let s;
  let SB;
  let hashable = Uint8Array.of();
  try {
    A = Point.fromBytes(pub, zip215);
    R = Point.fromBytes(sig.slice(0, L), zip215);
    s = bytesToNumLE(sig.slice(L, L2));
    SB = G.multiply(s, false);
    hashable = concatBytes(R.toBytes(), A.toBytes(), msg);
  } catch (error) {}
  const finish = (hashed) => {
    if (SB == null)
      return false;
    if (!zip215 && A.isSmallOrder())
      return false;
    const k = modL_LE(hashed);
    const RkA = R.add(A.multiply(k, false));
    return RkA.add(SB.negate()).clearCofactor().is0();
  };
  return { hashable, finish };
};
var verifyAsync = async (signature, message, publicKey, opts = defaultVerifyOpts) => hashFinishA(_verify(signature, message, publicKey, opts));
var hashes = {
  sha512Async: async (message) => {
    const s = subtle();
    const m = concatBytes(message);
    return u8n(await s.digest("SHA-512", m.buffer));
  },
  sha512: undefined
};
var W = 8;
var scalarBits = 256;
var pwindows = Math.ceil(scalarBits / W) + 1;
var pwindowSize = 2 ** (W - 1);
var precompute = () => {
  const points = [];
  let p = G;
  let b2 = p;
  for (let w = 0;w < pwindows; w++) {
    b2 = p;
    points.push(b2);
    for (let i = 1;i < pwindowSize; i++) {
      b2 = b2.add(p);
      points.push(b2);
    }
    p = b2.double();
  }
  return points;
};
var Gpows = undefined;
var ctneg = (cnd, p) => {
  const n = p.negate();
  return cnd ? n : p;
};
var wNAF = (n) => {
  const comp = Gpows || (Gpows = precompute());
  let p = I;
  let f = G;
  const pow_2_w = 2 ** W;
  const maxNum = pow_2_w;
  const mask = big(pow_2_w - 1);
  const shiftBy = big(W);
  for (let w = 0;w < pwindows; w++) {
    let wbits = Number(n & mask);
    n >>= shiftBy;
    if (wbits > pwindowSize) {
      wbits -= maxNum;
      n += 1n;
    }
    const off = w * pwindowSize;
    const offF = off;
    const offP = off + Math.abs(wbits) - 1;
    const isEven = w % 2 !== 0;
    const isNeg = wbits < 0;
    if (wbits === 0) {
      f = f.add(ctneg(isEven, comp[offF]));
    } else {
      p = p.add(ctneg(isNeg, comp[offP]));
    }
  }
  if (n !== 0n)
    err("invalid wnaf");
  return { p, f };
};

// src/utils/crypto.ts
import { createHash } from "crypto";
async function verifySignature(message, signatureHex, publicKeyHex) {
  try {
    const cleanSignature = signatureHex.startsWith("ed25519_") ? signatureHex.substring(8) : signatureHex;
    const cleanPublicKey = publicKeyHex.startsWith("ed25519_") ? publicKeyHex.substring(8) : publicKeyHex;
    const messageHash = createHash("sha256").update(message).digest();
    const signatureBytes = Buffer.from(cleanSignature, "hex");
    const publicKeyBytes = Buffer.from(cleanPublicKey, "hex");
    return await verifyAsync(signatureBytes, messageHash, publicKeyBytes);
  } catch (error) {
    return false;
  }
}
function createTransactionMessage(tx) {
  const canonical = {
    type: tx.type,
    from: tx.from,
    to: tx.to,
    timestamp: tx.timestamp,
    nonce: tx.nonce
  };
  if (tx.amount !== undefined && tx.amount !== null) {
    canonical.amount = tx.amount;
  }
  if (tx.currencyCode !== undefined && tx.currencyCode !== null) {
    canonical.currencyCode = tx.currencyCode;
  }
  if (tx.contractInput !== undefined) {
    canonical.contractInput = tx.contractInput;
  }
  if (tx.metadata !== undefined) {
    canonical.metadata = tx.metadata;
  }
  return JSON.stringify(canonical);
}
async function verifyUserCreationSignature(input) {
  const transactionData = {
    type: "user_creation",
    from: "00000000-0000-0000-0000-000000000000",
    to: "00000000-0000-0000-0000-000000000000",
    timestamp: input.timestamp,
    nonce: input.nonce,
    contractInput: {
      username: input.username,
      displayName: input.displayName,
      publicKey: input.publicKey,
      bio: input.bio || "",
      role: input.role || "user"
    }
  };
  const message = createTransactionMessage(transactionData);
  return await verifySignature(message, input.signature, input.publicKey);
}
async function verifyTransactionSignature(input, publicKey, signature) {
  const transactionData = {
    type: input.type,
    from: input.from,
    to: input.to,
    timestamp: input.timestamp,
    nonce: input.nonce,
    amount: input.amount,
    currencyCode: input.currencyCode,
    contractId: input.contractId,
    contractInput: input.contractInput,
    metadata: input.metadata
  };
  const message = createTransactionMessage(transactionData);
  return await verifySignature(message, signature, publicKey);
}

// src/accounts/users.ts
var SYSTEM_ID = "00000000-0000-0000-0000-000000000000";
async function createUser(input) {
  if (!input.username.startsWith("@")) {
    throw new Error("Username must start with @");
  }
  const now = Date.now();
  const timeDiff = Math.abs(now - input.timestamp);
  if (timeDiff > 5 * 60 * 1000) {
    throw new Error("Transaction timestamp is too old or too far in the future");
  }
  if (input.nonce !== 0) {
    throw new Error("Nonce must be 0 for user creation transactions");
  }
  const isValidSignature = await verifyUserCreationSignature(input);
  if (!isValidSignature) {
    throw new Error("Invalid transaction signature. Signature verification failed.");
  }
  const existingUser = await getUserByUsername(input.username);
  if (existingUser) {
    throw new Error(`Username ${input.username} is already taken`);
  }
  if (input.role === "sovereign") {
    const existingSovereigns = await getSovereigns();
    if (existingSovereigns.length > 0) {
      throw new Error("A sovereign already exists on this blockchain. " + "Only one sovereign is allowed. " + `Current sovereign: ${existingSovereigns[0].username}`);
    }
    const pendingTx2 = await db.select().from(transactions).where(eq(transactions.type, "user_creation")).where(eq(transactions.status, "pending"));
    for (const tx of pendingTx2) {
      const userData = tx.contractInput;
      if (userData?.role === "sovereign") {
        throw new Error("A sovereign user creation is already pending. " + "Only one sovereign is allowed per blockchain.");
      }
    }
  }
  const pendingTx = await db.select().from(transactions).where(eq(transactions.type, "user_creation")).where(eq(transactions.status, "pending"));
  for (const tx of pendingTx) {
    const userData = tx.contractInput;
    if (userData?.username === input.username) {
      throw new Error(`Username ${input.username} has a pending registration`);
    }
  }
  const userId = randomUUID();
  const signature = input.signature;
  const [transaction] = await db.insert(transactions).values({
    type: "user_creation",
    from: SYSTEM_ID,
    to: userId,
    amount: null,
    currencyCode: null,
    contractInput: {
      username: input.username,
      displayName: input.displayName,
      publicKey: input.publicKey,
      bio: input.bio,
      avatarData: input.avatarData,
      role: input.role || "user"
    },
    signature,
    status: "pending"
  }).returning();
  return {
    transactionId: transaction.id,
    userId,
    status: "pending",
    message: "User creation transaction created. User will be created when the next block is produced."
  };
}
async function getUserById(id) {
  const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return user || null;
}
async function getUserByUsername(username) {
  const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
  return user || null;
}
async function updateUser(id, input) {
  const [updated] = await db.update(users).set({
    ...input,
    updatedAt: new Date
  }).where(eq(users.id, id)).returning();
  return updated || null;
}
async function deleteUser(id) {
  const [deleted] = await db.delete(users).where(eq(users.id, id)).returning();
  return deleted || null;
}
async function listUsers(limit = 50, offset = 0) {
  return await db.select().from(users).limit(limit).offset(offset);
}
async function isSovereign(userId) {
  const user = await getUserById(userId);
  return user?.role === "sovereign";
}
async function getSovereigns() {
  return await db.select().from(users).where(eq(users.role, "sovereign"));
}

// src/balances/index.ts
async function createCurrency(input) {
  const [currency] = await db.insert(currencies).values({
    code: input.code.toUpperCase(),
    type: input.type,
    decimals: input.decimals.toString(),
    name: input.name,
    symbol: input.symbol,
    verified: input.verified || false
  }).returning();
  return currency;
}
async function getCurrency(code) {
  const [currency] = await db.select().from(currencies).where(eq(currencies.code, code.toUpperCase())).limit(1);
  return currency || null;
}
async function listCurrencies() {
  return await db.select().from(currencies);
}
async function seedCurrencies() {
  const defaultCurrencies = [
    { code: "USD", type: "fiat", decimals: 2, name: "US Dollar", symbol: "$", verified: true },
    { code: "EUR", type: "fiat", decimals: 2, name: "Euro", symbol: "\u20AC", verified: true },
    { code: "GBP", type: "fiat", decimals: 2, name: "British Pound", symbol: "\xA3", verified: true },
    { code: "BTC", type: "crypto", decimals: 8, name: "Bitcoin", symbol: "\u20BF", verified: true },
    { code: "ETH", type: "crypto", decimals: 18, name: "Ethereum", symbol: "\u039E", verified: true }
  ];
  for (const currency of defaultCurrencies) {
    const existing = await getCurrency(currency.code);
    if (!existing) {
      await createCurrency(currency);
    }
  }
}
async function getBalance(input) {
  const [balance] = await db.select().from(balances).where(and(eq(balances.ownerId, input.ownerId), eq(balances.ownerType, input.ownerType), eq(balances.currencyCode, input.currencyCode.toUpperCase()))).limit(1);
  return balance || null;
}
async function getBalances(ownerId, ownerType) {
  return await db.select().from(balances).where(and(eq(balances.ownerId, ownerId), eq(balances.ownerType, ownerType)));
}
async function getAllBalances() {
  return await db.select().from(balances);
}
async function setBalance(input) {
  const currency = await getCurrency(input.currencyCode);
  if (!currency) {
    throw new Error(`Currency ${input.currencyCode} not found`);
  }
  const existing = await getBalance(input);
  if (existing) {
    const [updated] = await db.update(balances).set({
      amount: input.amount,
      updatedAt: new Date
    }).where(eq(balances.id, existing.id)).returning();
    return updated;
  } else {
    const [created] = await db.insert(balances).values({
      ownerId: input.ownerId,
      ownerType: input.ownerType,
      currencyCode: input.currencyCode.toUpperCase(),
      amount: input.amount
    }).returning();
    return created;
  }
}
async function addToBalance(input) {
  const current = await getBalance(input);
  const currentAmount = current ? parseFloat(current.amount) : 0;
  const addAmount = parseFloat(input.amount);
  const newAmount = (currentAmount + addAmount).toString();
  return await setBalance({ ...input, amount: newAmount });
}
async function subtractFromBalance(input) {
  const current = await getBalance(input);
  const currentAmount = current ? parseFloat(current.amount) : 0;
  const subtractAmount = parseFloat(input.amount);
  if (currentAmount < subtractAmount) {
    throw new Error("Insufficient balance");
  }
  const newAmount = (currentAmount - subtractAmount).toString();
  return await setBalance({ ...input, amount: newAmount });
}
async function transferBalance(from, to, currencyCode, amount) {
  await subtractFromBalance({
    ownerId: from.ownerId,
    ownerType: from.ownerType,
    currencyCode,
    amount
  });
  await addToBalance({
    ownerId: to.ownerId,
    ownerType: to.ownerType,
    currencyCode,
    amount
  });
  return true;
}

// ../../node_modules/zod/v3/external.js
var exports_external = {};
__export(exports_external, {
  void: () => voidType,
  util: () => util,
  unknown: () => unknownType,
  union: () => unionType,
  undefined: () => undefinedType,
  tuple: () => tupleType,
  transformer: () => effectsType,
  symbol: () => symbolType,
  string: () => stringType,
  strictObject: () => strictObjectType,
  setErrorMap: () => setErrorMap,
  set: () => setType,
  record: () => recordType,
  quotelessJson: () => quotelessJson,
  promise: () => promiseType,
  preprocess: () => preprocessType,
  pipeline: () => pipelineType,
  ostring: () => ostring,
  optional: () => optionalType,
  onumber: () => onumber,
  oboolean: () => oboolean,
  objectUtil: () => objectUtil,
  object: () => objectType,
  number: () => numberType,
  nullable: () => nullableType,
  null: () => nullType,
  never: () => neverType,
  nativeEnum: () => nativeEnumType,
  nan: () => nanType,
  map: () => mapType,
  makeIssue: () => makeIssue,
  literal: () => literalType,
  lazy: () => lazyType,
  late: () => late,
  isValid: () => isValid,
  isDirty: () => isDirty,
  isAsync: () => isAsync,
  isAborted: () => isAborted,
  intersection: () => intersectionType,
  instanceof: () => instanceOfType,
  getParsedType: () => getParsedType,
  getErrorMap: () => getErrorMap,
  function: () => functionType,
  enum: () => enumType,
  effect: () => effectsType,
  discriminatedUnion: () => discriminatedUnionType,
  defaultErrorMap: () => en_default,
  datetimeRegex: () => datetimeRegex,
  date: () => dateType,
  custom: () => custom,
  coerce: () => coerce,
  boolean: () => booleanType,
  bigint: () => bigIntType,
  array: () => arrayType,
  any: () => anyType,
  addIssueToContext: () => addIssueToContext,
  ZodVoid: () => ZodVoid,
  ZodUnknown: () => ZodUnknown,
  ZodUnion: () => ZodUnion,
  ZodUndefined: () => ZodUndefined,
  ZodType: () => ZodType,
  ZodTuple: () => ZodTuple,
  ZodTransformer: () => ZodEffects,
  ZodSymbol: () => ZodSymbol,
  ZodString: () => ZodString,
  ZodSet: () => ZodSet,
  ZodSchema: () => ZodType,
  ZodRecord: () => ZodRecord,
  ZodReadonly: () => ZodReadonly,
  ZodPromise: () => ZodPromise,
  ZodPipeline: () => ZodPipeline,
  ZodParsedType: () => ZodParsedType,
  ZodOptional: () => ZodOptional,
  ZodObject: () => ZodObject,
  ZodNumber: () => ZodNumber,
  ZodNullable: () => ZodNullable,
  ZodNull: () => ZodNull,
  ZodNever: () => ZodNever,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNaN: () => ZodNaN,
  ZodMap: () => ZodMap,
  ZodLiteral: () => ZodLiteral,
  ZodLazy: () => ZodLazy,
  ZodIssueCode: () => ZodIssueCode,
  ZodIntersection: () => ZodIntersection,
  ZodFunction: () => ZodFunction,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodError: () => ZodError,
  ZodEnum: () => ZodEnum,
  ZodEffects: () => ZodEffects,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodDefault: () => ZodDefault,
  ZodDate: () => ZodDate,
  ZodCatch: () => ZodCatch,
  ZodBranded: () => ZodBranded,
  ZodBoolean: () => ZodBoolean,
  ZodBigInt: () => ZodBigInt,
  ZodArray: () => ZodArray,
  ZodAny: () => ZodAny,
  Schema: () => ZodType,
  ParseStatus: () => ParseStatus,
  OK: () => OK,
  NEVER: () => NEVER,
  INVALID: () => INVALID,
  EMPTY_PATH: () => EMPTY_PATH,
  DIRTY: () => DIRTY,
  BRAND: () => BRAND
});

// ../../node_modules/zod/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_) => {};
  function assertIs(_arg) {}
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error;
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};

// ../../node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};

class ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
}
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// ../../node_modules/zod/v3/locales/en.js
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var en_default = errorMap;

// ../../node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
// ../../node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== undefined) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      overrideMap,
      overrideMap === en_default ? undefined : en_default
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}

class ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
}
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
// ../../node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// ../../node_modules/zod/v3/types.js
class ParseInputLazyPath {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
}
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}

class ZodType {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus,
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err2) {
        if (err2?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(undefined).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version2) {
  if ((version2 === "v4" || !version2) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version2 === "v6" || !version2) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version2) {
  if ((version2 === "v4" || !version2) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version2 === "v6" || !version2) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}

class ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus;
    let ctx = undefined;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}

class ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = undefined;
    const status = new ParseStatus;
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
}
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};

class ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = undefined;
    const status = new ParseStatus;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};

class ZodBoolean extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};

class ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus;
    let ctx = undefined;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
}
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};

class ZodSymbol extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};

class ZodUndefined extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};

class ZodNull extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};

class ZodAny extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};

class ZodUnknown extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};

class ZodNever extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
}
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};

class ZodVoid extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};

class ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : undefined,
          maximum: tooBig ? def.exactLength.value : undefined,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodArray.create = (schema2, params) => {
  return new ZodArray({
    type: schema2,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema2) {
  if (schema2 instanceof ZodObject) {
    const newShape = {};
    for (const key in schema2.shape) {
      const fieldSchema = schema2.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema2._def,
      shape: () => newShape
    });
  } else if (schema2 instanceof ZodArray) {
    return new ZodArray({
      ...schema2._def,
      type: deepPartialify(schema2.element)
    });
  } else if (schema2 instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema2.unwrap()));
  } else if (schema2 instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema2.unwrap()));
  } else if (schema2 instanceof ZodTuple) {
    return ZodTuple.create(schema2.items.map((item) => deepPartialify(item)));
  } else {
    return schema2;
  }
}

class ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {} else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== undefined ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  extend(augmentation) {
    return new ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  setKey(key, schema2) {
    return this.augment({ [key]: schema2 });
  }
  catchall(index) {
    return new ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
}
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};

class ZodUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = undefined;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
}
ZodUnion.create = (types2, params) => {
  return new ZodUnion({
    options: types2,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [undefined];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [undefined, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};

class ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(discriminator, options, params) {
    const optionsMap = new Map;
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
}
function mergeValues(a, b2) {
  const aType = getParsedType(a);
  const bType = getParsedType(b2);
  if (a === b2) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b2);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b2 };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b2[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b2.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0;index < a.length; index++) {
      const itemA = a[index];
      const itemB = b2[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b2) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}

class ZodIntersection extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
}
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};

class ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema2 = this._def.items[itemIndex] || this._def.rest;
      if (!schema2)
        return null;
      return schema2._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest
    });
  }
}
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};

class ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
}

class ZodMap extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = new Map;
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = new Map;
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
}
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};

class ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = new Set;
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size2, message) {
    return this.min(size2, message).max(size2, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};

class ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
}

class ZodLazy extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
}
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};

class ZodLiteral extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
}
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values2, params) {
  return new ZodEnum({
    values: values2,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}

class ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values2, newDef = this._def) {
    return ZodEnum.create(values2, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values2, newDef = this._def) {
    return ZodEnum.create(this.options.filter((opt) => !values2.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
}
ZodEnum.create = createZodEnum;

class ZodNativeEnum extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
}
ZodNativeEnum.create = (values2, params) => {
  return new ZodNativeEnum({
    values: values2,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};

class ZodPromise extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
}
ZodPromise.create = (schema2, params) => {
  return new ZodPromise({
    type: schema2,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};

class ZodEffects extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
}
ZodEffects.create = (schema2, effect, params) => {
  return new ZodEffects({
    schema: schema2,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema2, params) => {
  return new ZodEffects({
    schema: schema2,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
class ZodOptional extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(undefined);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};

class ZodNullable extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};

class ZodDefault extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};

class ZodCatch extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};

class ZodNaN extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
}
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");

class ZodBranded extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
}

class ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b2) {
    return new ZodPipeline({
      in: a,
      out: b2,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
}

class ZodReadonly extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
var NEVER = INVALID;
// src/api/schemas.ts
var createUserSchema = exports_external.object({
  publicKey: exports_external.string().min(1),
  username: exports_external.string().regex(/^@[a-z0-9_-]+$/i, "Username must start with @ and contain only alphanumeric characters"),
  displayName: exports_external.string().min(1).max(100),
  bio: exports_external.string().max(1000).optional(),
  avatarData: exports_external.string().optional(),
  role: exports_external.enum(["sovereign", "staff", "user"]).optional().default("user"),
  signature: exports_external.string().min(1),
  timestamp: exports_external.number().int().positive(),
  nonce: exports_external.number().int().min(0).default(0)
});
var updateUserSchema = exports_external.object({
  displayName: exports_external.string().min(1).max(100).optional(),
  bio: exports_external.string().max(1000).optional(),
  avatarData: exports_external.string().optional(),
  landingPageId: exports_external.string().uuid().optional(),
  role: exports_external.enum(["sovereign", "staff", "user"]).optional()
});
var createTeamSchema = exports_external.object({
  name: exports_external.string().min(1).max(100),
  slug: exports_external.string().regex(/^@[a-z0-9_-]+$/i, "Team slug must start with @ and contain only alphanumeric characters"),
  description: exports_external.string().max(1000).optional(),
  ownerId: exports_external.string().uuid()
});
var updateTeamSchema = exports_external.object({
  name: exports_external.string().min(1).max(100).optional(),
  description: exports_external.string().max(1000).optional(),
  avatarData: exports_external.string().optional(),
  landingPageId: exports_external.string().uuid().optional()
});
var addTeamMemberSchema = exports_external.object({
  teamId: exports_external.string().uuid(),
  userId: exports_external.string().uuid(),
  role: exports_external.enum(["owner", "admin", "member"]).optional()
});
var createCurrencySchema = exports_external.object({
  code: exports_external.string().min(1).max(10).toUpperCase(),
  type: exports_external.enum(["fiat", "crypto"]),
  decimals: exports_external.number().int().min(0).max(18),
  name: exports_external.string().max(100).optional(),
  symbol: exports_external.string().max(10).optional(),
  verified: exports_external.boolean().optional()
});
var createTransactionSchema = exports_external.object({
  from: exports_external.string().uuid(),
  to: exports_external.string().uuid(),
  amount: exports_external.string().regex(/^\d+(\.\d+)?$/, "Amount must be a valid decimal number").optional(),
  currencyCode: exports_external.string().min(1).max(10).toUpperCase().optional(),
  type: exports_external.enum(["transfer", "deposit", "withdraw", "contract_call", "user_creation", "contract_deployment"]),
  signature: exports_external.string().min(1),
  timestamp: exports_external.number().int().positive(),
  nonce: exports_external.number().int().min(0),
  contractId: exports_external.string().uuid().optional(),
  contractInput: exports_external.record(exports_external.any()).optional(),
  metadata: exports_external.record(exports_external.any()).optional()
});
var confirmTransactionSchema = exports_external.object({
  id: exports_external.string().uuid(),
  blockId: exports_external.string().uuid().optional(),
  confirmerId: exports_external.string().uuid().optional()
});
var setBalanceSchema = exports_external.object({
  ownerId: exports_external.string().uuid(),
  ownerType: exports_external.enum(["user", "team"]),
  currencyCode: exports_external.string().min(1).max(10).toUpperCase(),
  amount: exports_external.string().regex(/^\d+(\.\d+)?$/, "Amount must be a valid decimal number")
});

// src/api/routes/users.ts
var app = new Hono2;
app.get("/", async (c) => {
  const limit = parseInt(c.req.query("limit") || "50");
  const offset = parseInt(c.req.query("offset") || "0");
  const users2 = await listUsers(limit, offset);
  return c.json(users2);
});
app.post("/", zValidator("json", createUserSchema), async (c) => {
  const body = c.req.valid("json");
  try {
    const user = await createUser(body);
    return c.json(user, 201);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});
app.get("/:id", async (c) => {
  const { id } = c.req.param();
  const user = await getUserById(id);
  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }
  return c.json(user);
});
app.get("/username/:username", async (c) => {
  const { username } = c.req.param();
  const user = await getUserByUsername(username);
  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }
  return c.json(user);
});
app.patch("/:id", zValidator("json", updateUserSchema), async (c) => {
  const { id } = c.req.param();
  const body = c.req.valid("json");
  try {
    const user = await updateUser(id, body);
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    return c.json(user);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});
app.delete("/:id", async (c) => {
  const { id } = c.req.param();
  const user = await deleteUser(id);
  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }
  return c.json({ message: "User deleted", user });
});
app.get("/:id/balances", async (c) => {
  const { id } = c.req.param();
  const user = await getUserById(id);
  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }
  const balances2 = await getBalances(id, "user");
  return c.json(balances2);
});
app.get("/:id/nonce", async (c) => {
  const { id } = c.req.param();
  const user = await getUserById(id);
  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }
  return c.json({
    userId: user.id,
    username: user.username,
    currentNonce: user.nonce,
    nextNonce: user.nonce + 1,
    message: "Use nextNonce for your next transaction"
  });
});
var users_default = app;

// src/api/routes/balances.ts
var app2 = new Hono2;
app2.get("/", async (c) => {
  const ownerId = c.req.query("ownerId");
  const ownerType = c.req.query("ownerType");
  const currencyCode = c.req.query("currencyCode");
  if (!ownerId && !ownerType && !currencyCode) {
    const balances2 = await getAllBalances();
    return c.json(balances2);
  }
  if (!ownerId || !ownerType || !currencyCode) {
    return c.json({ error: "Missing required query parameters: ownerId, ownerType, currencyCode" }, 400);
  }
  const balance = await getBalance({
    ownerId,
    ownerType,
    currencyCode
  });
  if (!balance) {
    return c.json({ balance: "0", currencyCode }, 200);
  }
  return c.json(balance);
});
app2.post("/", zValidator("json", setBalanceSchema), async (c) => {
  const body = c.req.valid("json");
  try {
    const balance = await setBalance(body);
    return c.json(balance, 201);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});
app2.get("/currencies", async (c) => {
  const currencies2 = await listCurrencies();
  return c.json(currencies2);
});
app2.post("/currencies", zValidator("json", createCurrencySchema), async (c) => {
  const body = c.req.valid("json");
  try {
    const currency = await createCurrency(body);
    return c.json(currency, 201);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});
app2.post("/currencies/seed", async (c) => {
  try {
    await seedCurrencies();
    return c.json({ message: "Default currencies seeded" });
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});
var balances_default = app2;

// src/api/routes/transactions.ts
import { randomUUID as randomUUID2 } from "crypto";

// src/transactions/index.ts
async function getTransaction(id) {
  const [transaction] = await db.select().from(transactions).where(eq(transactions.id, id)).limit(1);
  return transaction || null;
}
async function getAccountTransactions(accountId, limit = 50, offset = 0) {
  return await db.select().from(transactions).where(eq(transactions.from, accountId)).limit(limit).offset(offset);
}
async function confirmTransaction(input) {
  const transaction = await getTransaction(input.id);
  if (!transaction) {
    throw new Error("Transaction not found");
  }
  if (transaction.status !== "pending") {
    throw new Error(`Transaction already ${transaction.status}`);
  }
  try {
    if (transaction.type === "transfer") {
      await transferBalance({ ownerId: transaction.from, ownerType: "user" }, { ownerId: transaction.to, ownerType: "user" }, transaction.currencyCode, transaction.amount);
    } else if (transaction.type === "deposit") {
      if (!transaction.amount || !transaction.currencyCode) {
        throw new Error("Deposit requires amount and currency");
      }
      await addToBalance({
        ownerId: transaction.to,
        ownerType: "user",
        currencyCode: transaction.currencyCode,
        amount: transaction.amount
      });
    } else if (transaction.type === "withdraw") {
      if (!transaction.amount || !transaction.currencyCode) {
        throw new Error("Withdraw requires amount and currency");
      }
      await subtractFromBalance({
        ownerId: transaction.from,
        ownerType: "user",
        currencyCode: transaction.currencyCode,
        amount: transaction.amount
      });
    } else if (transaction.type === "contract_call") {
      throw new Error("Contract call not yet implemented");
    }
    const [confirmed] = await db.update(transactions).set({
      status: "confirmed",
      blockId: input.blockId,
      confirmedAt: new Date
    }).where(eq(transactions.id, input.id)).returning();
    return confirmed;
  } catch (error) {
    await db.update(transactions).set({
      status: "failed"
    }).where(eq(transactions.id, input.id));
    throw error;
  }
}
async function validateTransaction(input) {
  const now = Date.now();
  const timeDiff = Math.abs(now - input.timestamp);
  if (timeDiff > 5 * 60 * 1000) {
    return { valid: false, error: "Transaction timestamp is too old or too far in the future" };
  }
  if (input.type !== "user_creation") {
    const user = await getUserById(input.from);
    if (!user) {
      return { valid: false, error: "Sender user not found" };
    }
    const expectedNonce = user.nonce + 1;
    if (input.nonce !== expectedNonce) {
      return { valid: false, error: `Invalid nonce. Expected ${expectedNonce}, got ${input.nonce}` };
    }
    const isValidSignature = await verifyTransactionSignature(input, user.publicKey, input.signature);
    if (!isValidSignature) {
      return { valid: false, error: "Invalid transaction signature. Signature verification failed." };
    }
  }
  if (input.type === "user_creation" || input.type === "contract_deployment" || input.type === "contract_call") {
    return { valid: true };
  }
  if (input.type === "deposit" || input.type === "withdraw") {
    if (!input.amount || !input.currencyCode) {
      return { valid: false, error: "Amount and currency are required for deposit/withdraw requests" };
    }
    if (input.type === "withdraw") {
      const balance2 = await getBalance({
        ownerId: input.from,
        ownerType: "user",
        currencyCode: input.currencyCode
      });
      if (!balance2) {
        return { valid: false, error: "You have no balance for this currency" };
      }
      const currentBalance2 = parseFloat(balance2.amount);
      const withdrawAmount = parseFloat(input.amount);
      if (currentBalance2 < withdrawAmount) {
        return { valid: false, error: `Insufficient balance: ${currentBalance2} ${input.currencyCode}` };
      }
    }
    return { valid: true };
  }
  if (!input.amount || !input.currencyCode) {
    return { valid: false, error: "Amount and currency are required for transfer transactions" };
  }
  const balance = await getBalance({
    ownerId: input.from,
    ownerType: "user",
    currencyCode: input.currencyCode
  });
  if (!balance) {
    return { valid: false, error: "Sender has no balance for this currency" };
  }
  const currentBalance = parseFloat(balance.amount);
  const transferAmount = parseFloat(input.amount);
  if (currentBalance < transferAmount) {
    return { valid: false, error: `Insufficient balance: ${currentBalance} ${input.currencyCode}` };
  }
  return { valid: true };
}
async function getAllTransactions(limit = 100, offset = 0) {
  return await db.select().from(transactions).limit(limit).offset(offset);
}
async function getPendingTransactions(limit = 100) {
  return await db.select().from(transactions).where(eq(transactions.status, "pending")).limit(limit);
}
async function getPendingDeposits(limit = 100) {
  return await db.select().from(transactions).where(eq(transactions.type, "deposit")).where(eq(transactions.status, "pending")).limit(limit);
}
async function getPendingWithdraws(limit = 100) {
  return await db.select().from(transactions).where(eq(transactions.type, "withdraw")).where(eq(transactions.status, "pending")).limit(limit);
}
async function getPendingDepositWithdrawRequests(limit = 100) {
  return await db.select().from(transactions).where(eq(transactions.status, "pending")).limit(limit).then((txs) => txs.filter((tx) => tx.type === "deposit" || tx.type === "withdraw"));
}

// ../queue/src/index.ts
var import_ioredis = __toESM(require_built3(), 1);
var STREAM_PENDING_TX = "tx:pending";
var CONSUMER_GROUP = "validators";
var redisClient = null;
function getRedisClient() {
  if (!redisClient) {
    const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
    redisClient = new import_ioredis.default(redisUrl, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      enableOfflineQueue: true,
      lazyConnect: false,
      connectionName: "tana-ledger"
    });
    redisClient.on("error", (err2) => {
      console.error("Redis connection error:", err2);
    });
    redisClient.on("connect", () => {
      console.log("\u2713 Redis connected");
    });
  }
  return redisClient;
}
async function initializeRedisStreams() {
  const redis = getRedisClient();
  try {
    try {
      await redis.xgroup("CREATE", STREAM_PENDING_TX, CONSUMER_GROUP, "$", "MKSTREAM");
      console.log(`\u2713 Created consumer group: ${CONSUMER_GROUP}`);
    } catch (error) {
      if (!error.message.includes("BUSYGROUP")) {
        throw error;
      }
    }
    return true;
  } catch (error) {
    console.error("Failed to initialize Redis streams:", error);
    throw error;
  }
}
async function queueTransaction(transaction) {
  const redis = getRedisClient();
  const streamId = await redis.xadd(STREAM_PENDING_TX, "*", "txId", transaction.txId, "type", transaction.type, "from", transaction.from, "to", transaction.to, "amount", transaction.amount || "", "currencyCode", transaction.currencyCode || "", "contractId", transaction.contractId || "", "contractInput", transaction.contractInput ? JSON.stringify(transaction.contractInput) : "", "signature", transaction.signature, "timestamp", transaction.timestamp.toString(), "nonce", transaction.nonce.toString(), "payload", JSON.stringify(transaction.payload));
  return streamId;
}
async function publishNewTransaction(txId) {
  const redis = getRedisClient();
  return await redis.publish("tx:new", txId);
}

// src/api/routes/transactions.ts
var app3 = new Hono2;
app3.get("/", async (c) => {
  const limit = parseInt(c.req.query("limit") || "100");
  const offset = parseInt(c.req.query("offset") || "0");
  const transactions2 = await getAllTransactions(limit, offset);
  return c.json(transactions2);
});
app3.post("/", zValidator("json", createTransactionSchema), async (c) => {
  const body = c.req.valid("json");
  try {
    const validation = await validateTransaction(body);
    if (!validation.valid) {
      return c.json({ error: validation.error }, 400);
    }
    const txId = randomUUID2();
    const streamId = await queueTransaction({
      txId,
      type: body.type,
      from: body.from,
      to: body.to,
      amount: body.amount?.toString(),
      currencyCode: body.currencyCode,
      signature: body.signature,
      timestamp: body.timestamp,
      nonce: body.nonce,
      contractId: body.contractId,
      contractInput: body.contractInput,
      payload: body
    });
    await publishNewTransaction(txId);
    return c.json({
      id: txId,
      status: "queued",
      streamId,
      type: body.type,
      from: body.from,
      to: body.to,
      timestamp: body.timestamp,
      message: "Transaction queued for inclusion in next block"
    }, 201);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});
app3.get("/:id", async (c) => {
  const { id } = c.req.param();
  const transaction = await getTransaction(id);
  if (!transaction) {
    return c.json({ error: "Transaction not found" }, 404);
  }
  return c.json(transaction);
});
app3.post("/:id/confirm", zValidator("json", confirmTransactionSchema), async (c) => {
  const body = c.req.valid("json");
  try {
    const transaction = await getTransaction(body.id);
    if (!transaction) {
      return c.json({ error: "Transaction not found" }, 404);
    }
    if (transaction.type === "deposit" || transaction.type === "withdraw") {
      const confirmerId = body.confirmerId || transaction.from;
      const hasSovereignRole = await isSovereign(confirmerId);
      if (!hasSovereignRole) {
        return c.json({
          error: "Only sovereign users can confirm deposit/withdraw transactions"
        }, 403);
      }
    }
    const confirmedTransaction = await confirmTransaction(body);
    return c.json(confirmedTransaction);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});
app3.get("/pending", async (c) => {
  const limit = parseInt(c.req.query("limit") || "100");
  const transactions2 = await getPendingTransactions(limit);
  return c.json(transactions2);
});
app3.get("/pending/deposits", async (c) => {
  const limit = parseInt(c.req.query("limit") || "100");
  const deposits = await getPendingDeposits(limit);
  return c.json(deposits);
});
app3.get("/pending/withdraws", async (c) => {
  const limit = parseInt(c.req.query("limit") || "100");
  const withdraws = await getPendingWithdraws(limit);
  return c.json(withdraws);
});
app3.get("/pending/sovereign", async (c) => {
  const limit = parseInt(c.req.query("limit") || "100");
  const requests = await getPendingDepositWithdrawRequests(limit);
  return c.json(requests);
});
app3.get("/account/:accountId", async (c) => {
  const { accountId } = c.req.param();
  const limit = parseInt(c.req.query("limit") || "50");
  const offset = parseInt(c.req.query("offset") || "0");
  const transactions2 = await getAccountTransactions(accountId, limit, offset);
  return c.json(transactions2);
});
var transactions_default = app3;

// src/blockchain/blocks.ts
async function getBlockByHeight(height) {
  const [block] = await db.select().from(blocks).where(eq(blocks.height, height)).limit(1);
  return block || null;
}
async function getBlockByHash(hash) {
  const [block] = await db.select().from(blocks).where(eq(blocks.hash, hash)).limit(1);
  return block || null;
}
async function getLatestBlock() {
  const [block] = await db.select().from(blocks).orderBy(desc(blocks.height)).limit(1);
  return block || null;
}
async function listBlocks(limit = 10, offset = 0) {
  const results = await db.select().from(blocks).orderBy(desc(blocks.height)).limit(limit).offset(offset);
  return results;
}

// src/api/routes/blocks.ts
var app4 = new Hono2;
app4.get("/", async (c) => {
  const limit = parseInt(c.req.query("limit") || "10");
  const offset = parseInt(c.req.query("offset") || "0");
  const blocks2 = await listBlocks(limit, offset);
  return c.json(blocks2);
});
app4.get("/latest", async (c) => {
  const block = await getLatestBlock();
  if (!block) {
    return c.json({ error: "No blocks found" }, 404);
  }
  return c.json(block);
});
app4.get("/:height", async (c) => {
  const height = parseInt(c.req.param("height"));
  if (isNaN(height)) {
    return c.json({ error: "Invalid block height" }, 400);
  }
  const block = await getBlockByHeight(height);
  if (!block) {
    return c.json({ error: "Block not found" }, 404);
  }
  return c.json(block);
});
app4.get("/hash/:hash", async (c) => {
  const { hash } = c.req.param();
  const block = await getBlockByHash(hash);
  if (!block) {
    return c.json({ error: "Block not found" }, 404);
  }
  return c.json(block);
});
var blocks_default = app4;

// src/contracts/index.ts
import { randomUUID as randomUUID3, createHash as createHash3 } from "crypto";
var SYSTEM_ID2 = "00000000-0000-0000-0000-000000000000";
var MAX_CONTRACT_SIZE = 500 * 1024;
async function deployContract(input) {
  const now = Date.now();
  const timeDiff = Math.abs(now - input.timestamp);
  if (timeDiff > 5 * 60 * 1000) {
    throw new Error("Transaction timestamp is too old or too far in the future");
  }
  const sourceSize = Buffer.byteLength(input.sourceCode, "utf-8");
  if (sourceSize > MAX_CONTRACT_SIZE) {
    throw new Error(`Contract size ${sourceSize} bytes exceeds maximum ${MAX_CONTRACT_SIZE} bytes`);
  }
  const calculatedHash = createHash3("sha256").update(input.sourceCode).digest("hex");
  if (calculatedHash !== input.codeHash) {
    throw new Error("Code hash verification failed. Source code has been tampered with.");
  }
  const owner = await db.select().from(users).where(eq(users.username, input.ownerUsername)).limit(1);
  if (!owner || owner.length === 0) {
    throw new Error(`User ${input.ownerUsername} not found`);
  }
  const ownerUser = owner[0];
  const expectedNonce = ownerUser.nonce + 1;
  if (input.nonce !== expectedNonce) {
    throw new Error(`Invalid nonce. Expected ${expectedNonce}, got ${input.nonce}`);
  }
  const transactionData = {
    type: "contract_deployment",
    from: ownerUser.id,
    to: SYSTEM_ID2,
    timestamp: input.timestamp,
    nonce: input.nonce,
    contractInput: {
      name: input.name,
      sourceCode: input.sourceCode,
      codeHash: input.codeHash,
      initCode: input.initCode,
      contractCode: input.contractCode,
      getCode: input.getCode,
      postCode: input.postCode,
      hasInit: input.hasInit,
      hasGet: input.hasGet,
      hasPost: input.hasPost,
      version: input.version || "1.0.0",
      description: input.description,
      metadata: input.metadata,
      author: input.ownerUsername
    }
  };
  const isValidSignature = await verifyTransactionSignature(transactionData, ownerUser.publicKey, input.signature);
  if (!isValidSignature) {
    throw new Error("Invalid transaction signature. Signature verification failed.");
  }
  const existing = await db.select().from(contracts).where(eq(contracts.name, input.name)).where(eq(contracts.ownerId, ownerUser.id)).limit(1);
  if (existing.length > 0) {
    throw new Error(`Contract "${input.name}" already exists for this owner`);
  }
  const contractId = randomUUID3();
  const [transaction] = await db.insert(transactions).values({
    type: "contract_deployment",
    from: ownerUser.id,
    to: contractId,
    amount: null,
    currencyCode: null,
    contractId,
    contractInput: {
      name: input.name,
      sourceCode: input.sourceCode,
      codeHash: input.codeHash,
      initCode: input.initCode,
      contractCode: input.contractCode,
      getCode: input.getCode,
      postCode: input.postCode,
      hasInit: input.hasInit,
      hasGet: input.hasGet,
      hasPost: input.hasPost,
      version: input.version || "1.0.0",
      description: input.description,
      metadata: input.metadata,
      author: input.ownerUsername
    },
    signature: input.signature,
    status: "pending"
  }).returning();
  return {
    contractId,
    transactionId: transaction.id,
    status: "pending",
    message: "Contract deployment transaction created. Contract will be deployed when the next block is produced.",
    codeHash: input.codeHash,
    size: sourceSize
  };
}
async function getContract(id) {
  const [contract] = await db.select().from(contracts).where(eq(contracts.id, id)).limit(1);
  return contract || null;
}
async function getContractsByOwner(ownerId, limit = 50, offset = 0) {
  return await db.select().from(contracts).where(eq(contracts.ownerId, ownerId)).limit(limit).offset(offset);
}
async function listContracts(limit = 50, offset = 0) {
  return await db.select().from(contracts).limit(limit).offset(offset);
}
async function deactivateContract(id) {
  const [updated] = await db.update(contracts).set({ isActive: false, updatedAt: new Date }).where(eq(contracts.id, id)).returning();
  return updated || null;
}

// src/api/routes/contracts.ts
var app5 = new Hono2;
var deployContractSchema = exports_external.object({
  ownerUsername: exports_external.string().min(1),
  name: exports_external.string().min(1).max(100),
  sourceCode: exports_external.string().min(1),
  codeHash: exports_external.string().length(64),
  initCode: exports_external.string().nullable().optional(),
  contractCode: exports_external.string().min(1),
  getCode: exports_external.string().nullable().optional(),
  postCode: exports_external.string().nullable().optional(),
  hasInit: exports_external.boolean(),
  hasGet: exports_external.boolean(),
  hasPost: exports_external.boolean(),
  version: exports_external.string().optional(),
  description: exports_external.string().optional(),
  metadata: exports_external.record(exports_external.any()).optional(),
  signature: exports_external.string().min(1),
  timestamp: exports_external.number().int().positive(),
  nonce: exports_external.number().int().min(0)
});
app5.post("/", zValidator("json", deployContractSchema), async (c) => {
  const body = c.req.valid("json");
  try {
    const result = await deployContract(body);
    return c.json(result, 201);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});
app5.get("/", async (c) => {
  const limit = parseInt(c.req.query("limit") || "50");
  const offset = parseInt(c.req.query("offset") || "0");
  const contracts2 = await listContracts(limit, offset);
  return c.json(contracts2);
});
app5.get("/:id", async (c) => {
  const { id } = c.req.param();
  const contract = await getContract(id);
  if (!contract) {
    return c.json({ error: "Contract not found" }, 404);
  }
  return c.json(contract);
});
app5.get("/owner/:ownerId", async (c) => {
  const { ownerId } = c.req.param();
  const limit = parseInt(c.req.query("limit") || "50");
  const offset = parseInt(c.req.query("offset") || "0");
  const contracts2 = await getContractsByOwner(ownerId, limit, offset);
  return c.json(contracts2);
});
app5.post("/:id/deactivate", async (c) => {
  const { id } = c.req.param();
  try {
    const contract = await deactivateContract(id);
    if (!contract) {
      return c.json({ error: "Contract not found" }, 404);
    }
    return c.json(contract);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});
var contracts_default = app5;

// src/index.ts
var app6 = new Hono2;
app6.use("*", logger());
app6.use("*", prettyJSON());
app6.use("*", cors({
  origin: "*",
  credentials: true
}));
app6.get("/", (c) => {
  return c.json({
    service: "tana-ledger",
    version: "0.1.0",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});
app6.get("/health", (c) => {
  return c.json({ status: "ok" });
});
app6.route("/users", users_default);
app6.route("/balances", balances_default);
app6.route("/transactions", transactions_default);
app6.route("/blocks", blocks_default);
app6.route("/contracts", contracts_default);
app6.onError((err2, c) => {
  console.error(`Error: ${err2.message}`);
  console.error(err2.stack);
  return c.json({
    error: err2.message || "Internal Server Error",
    timestamp: new Date().toISOString()
  }, 500);
});
var port = parseInt(process.env.PORT || "8080");
console.log(`\uD83D\uDE80 Tana Ledger Service starting on port ${port}`);
console.log(`\uD83D\uDCCA Database: ${process.env.DATABASE_URL ? "Connected" : "Using default connection"}`);
initializeRedisStreams().then(() => {
  console.log(`\u2713 Transaction queue initialized`);
}).catch((err2) => {
  console.error("Failed to initialize Redis streams:", err2);
  console.error("Transactions will not be queued. Please check Redis connection.");
});
var src_default2 = {
  port,
  fetch: app6.fetch
};
export {
  src_default2 as default
};
