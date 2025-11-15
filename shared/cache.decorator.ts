import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
const cacheMap = new Map<string, any>();

export function Cache(ttl: number = 0) {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
      const cacheKey = `${propertyKey.toString()}:${JSON.stringify(args)}`;
      
      if (cacheMap.has(cacheKey)) {
        const cachedItem = cacheMap.get(cacheKey);
        if (ttl > 0 && Date.now() - cachedItem.timestamp > ttl) {
          cacheMap.delete(cacheKey);
        } else {
          return cachedItem.value;
        }
      }
      
      const result = originalMethod.apply(this, args);
      if (result instanceof Observable) {
        const shared = result.pipe(
          shareReplay(1)
        );

        cacheMap.set(cacheKey, {
          value: shared,
          timestamp: Date.now()
        });

        return shared;
      } else if (result && typeof result.then === 'function') {
        return result.then((resolvedValue: any) => {
          cacheMap.set(cacheKey, {
            value: Promise.resolve(resolvedValue),
            timestamp: Date.now()
          });
          return resolvedValue;
        });
      } else {
        cacheMap.set(cacheKey, {
          value: result,
          timestamp: Date.now()
        });
        return result;
      }
    };
  };
}

Cache.clear = () => {
  cacheMap.clear();
};