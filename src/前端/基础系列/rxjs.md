

# RxJS Observable 完全指南

Observable 是 RxJS 的核心概念，它代表一个异步数据流，可以随时间推送多个值。让我深入解释：

## 1. 核心概念

```typescript
// 基本定义
import { Observable } from 'rxjs';

// 创建 Observable
const observable = new Observable(subscriber => {
  subscriber.next(1);     // 发出值
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();  // 完成流
});

// 订阅 Observable
observable.subscribe({
  next: value => console.log('值:', value),
  error: err => console.error('错误:', err),
  complete: () => console.log('完成')
});

// 输出:
// 值: 1
// 值: 2
// 值: 3
// 完成
```

## 2. Observable 与其他异步模式的比较

| 特性 | Observable | Promise | 回调函数 |
|------|------------|---------|---------|
| 多值 | ✅ | ❌ | ✅ |
| 可取消 | ✅ | ❌ | ❌ |
| 延迟执行 | ✅ | ❌ | ✅ |
| 操作符 | ✅ | ❌ | ❌ |
| 错误处理 | ✅ | ✅ | ❌ |

```typescript
// Promise: 只能发出一个值
const promise = Promise.resolve(1);

// Observable: 可以发出多个值
const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  // 可以在未来任何时间点继续发出值
  setTimeout(() => {
    subscriber.next(3);
    subscriber.complete();
  }, 1000);
});
```

## 3. 创建 Observable 的方式

```typescript
// 从值创建
import { of, from, fromEvent, interval } from 'rxjs';

// 1. of - 从固定值创建
of(1, 2, 3).subscribe(console.log);  // 1, 2, 3

// 2. from - 从数组或Promise创建
from([4, 5, 6]).subscribe(console.log);  // 4, 5, 6
from(Promise.resolve(7)).subscribe(console.log);  // 7

// 3. fromEvent - 从事件创建
fromEvent(document, 'click').subscribe(event => console.log('点击:', event));

// 4. interval - 定时器
interval(1000).subscribe(count => console.log(`${count}秒过去了`));
```

## 4. Observable 操作符示例

```typescript
import { of, from } from 'rxjs';
import { map, filter, tap, switchMap, catchError } from 'rxjs/operators';

// 原始数据流
const numbers$ = of(1, 2, 3, 4, 5);

// 转换流
numbers$.pipe(
  tap(n => console.log('原始值:', n)),  // 调试
  filter(n => n % 2 === 0),            // 过滤
  map(n => n * 10),                    // 转换
  tap(n => console.log('结果值:', n))   // 调试
).subscribe();

// 输出:
// 原始值: 1
// 原始值: 2
// 结果值: 20
// 原始值: 3
// 原始值: 4
// 结果值: 40
// 原始值: 5
```

## 5. 高级流操作

```typescript
import { of, throwError, timer } from 'rxjs';
import { mergeMap, switchMap, catchError, retry, timeout } from 'rxjs/operators';

// HTTP 请求示例
function getUser(id: number) {
  return of({ id, name: `User ${id}` }).pipe(
    // 模拟延迟
    switchMap(user => timer(1000).pipe(
      map(() => user)
    ))
  );
}

// 错误处理
of(1, 2, 3).pipe(
  mergeMap(id => getUser(id).pipe(
    timeout(2000),                                // 添加超时
    catchError(err => of({ id, error: true })),  // 处理错误
    retry(3)                                      // 重试机制
  ))
).subscribe(console.log);
```

## 6. NestJS 中的应用

```typescript
// 控制器中的使用
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(): Observable<User[]> {
    return this.usersService.findAll();
  }
}

// 服务中的实现
@Injectable()
export class UsersService {
  findAll(): Observable<User[]> {
    return of([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ]).pipe(
      delay(100),  // 模拟异步
      tap(users => console.log(`Found ${users.length} users`))
    );
  }
}
```

## 7. 常见实际应用场景

```typescript
// 1. 自动完成搜索
fromEvent(searchInput, 'input').pipe(
  map(e => (e.target as HTMLInputElement).value),
  debounceTime(300),  // 等待用户停止输入
  distinctUntilChanged(),  // 只在值变化时触发
  switchMap(term => searchService.search(term))
).subscribe(results => {
  // 更新UI显示结果
});

// 2. 轮询API
timer(0, 10000).pipe(
  switchMap(() => http.get('/api/status')),
  retry()
).subscribe(status => {
  // 更新状态显示
});

// 3. 并发请求
forkJoin([
  http.get('/api/users'),
  http.get('/api/products'),
  http.get('/api/orders')
]).subscribe(([users, products, orders]) => {
  // 所有请求完成后处理数据
});
```

## 8. 内存管理和取消订阅

```typescript
// 1. 手动取消
const subscription = interval(1000).subscribe(console.log);
// 稍后取消
setTimeout(() => {
  subscription.unsubscribe();
  console.log('已取消订阅');
}, 5000);

// 2. 自动完成
of(1, 2, 3).subscribe({
  next: console.log,
  complete: () => console.log('自动完成，无需手动取消')
});

// 3. 在Angular中使用takeUntil模式
@Component({...})
export class MyComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  ngOnInit() {
    interval(1000).pipe(
      takeUntil(this.destroy$)  // 在组件销毁时自动取消
    ).subscribe(console.log);
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

## 9. 高级模式

```typescript
// 1. 缓存结果
function getCachedData(): Observable<Data> {
  return this.data$.pipe(
    shareReplay(1)  // 缓存并共享最后一个结果
  );
}

// 2. 重试带回退策略
http.get('/api/data').pipe(
  retryWhen(errors => errors.pipe(
    scan((attempts, error) => attempts + 1, 0),
    takeWhile(attempts => attempts < 5),
    delay(1000)  // 每次重试间隔1秒
  ))
).subscribe();

// 3. 组合多个来源
const clicks$ = fromEvent(document, 'click');
const timer$ = interval(1000);

// 将点击事件转换为带计时器的流
clicks$.pipe(
  exhaustMap(() => timer$.pipe(
    take(5)  // 每次点击后发出5个计时值
  ))
).subscribe(console.log);
```

Observable 是一个强大的概念，掌握它可以优雅地处理各种异步和事件驱动的场景，无论是前端用户交互、HTTP请求还是后端的数据流处理。

```

