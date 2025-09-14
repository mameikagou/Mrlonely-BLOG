

#### useRequest

```js
/**
 * 一个用于处理异步请求的自定义 Hook。
 * @param requestFn - 一个返回 Promise 的异步函数。
 * @param options - 配置选项，例如 { manual: true }。
 * @returns 返回包含 data, error, loading 状态以及 run 函数的对象。
 */
const useRequet = (requestFn:(...args)=>Promise, options) => {
  // 是否自动请求
  const { manual = false } = options;

  const [state, setState] = useState({
    data: undefined,
    error: undefined,
    loading: !manual,
  })

  const fetchData = async () =>{
    // 重置
    setState({data: undefined, error: undefined, loading: true});
    try{
      const result = await requestFn();
      setState({data: result, error: undefined, loading: false});
    }catch(err){
      setState({data: undefined, error: err, loading: false});
    }
  }

  useEffect(()=>{
    fetchData();
  }, options)

  const run = () => {
    fetchData();
  }

  return {...state, run}
}

```

请求防抖/节流：防止用户过快地重复触发请求。
轮询：按固定间隔重复请求。
缓存：缓存上一次的请求结果。
处理竞态 (Race Condition)：如果快速连续触发两次请求，要确保只有最后一次请求的结果会被采用。这通常通过在每次 run 时生成一个唯一的 flag 或计数器来实现。