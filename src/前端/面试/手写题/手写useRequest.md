

#### useRequest

```js
import { useState, useCallback, useEffect } from 'react';

export default function useRequest(service) {
  // ... (useState 和 useCallback 的代码和上面一样)
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const run = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await service(...args);
      setData(response);
      return response;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, [service]);
  
  // 在组件挂载时，自动执行一次 run
  useEffect(() => {
    run();
  }, [run]); // 依赖于 run 函数

  return { data, error, loading, run };
}
```

请求防抖/节流：防止用户过快地重复触发请求。
轮询：按固定间隔重复请求。
缓存：缓存上一次的请求结果。
处理竞态 (Race Condition)：如果快速连续触发两次请求，要确保只有最后一次请求的结果会被采用。这通常通过在每次 run 时生成一个唯一的 flag 或计数器来实现。