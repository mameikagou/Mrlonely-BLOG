

### OnModuleInit
NestJS 中的 OnModuleInit 是一个生命周期钩子（lifecycle hook）接口，它主要用于：

- 初始化时机：在应用程序完全初始化之后执行
- 在所有模块都已经加载完成后触发
- 在所有依赖注入都完成之后执行


### @Injectable() 装饰器是 NestJS 中非常重要的一个装饰器，它的主要作用是：
- 标记依赖注入
- 声明一个类可以被 NestJS 的依赖注入系统管理
- 允许该类被注入到其他类中
- 使类成为可注入的服务（Service）

### 控制器
```ts
// 服务类
@Injectable()
class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }
}

// 控制器中使用
@Controller('cats')
class CatsController {
  // 通过构造函数注入服务
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() cat: Cat) {
    return this.catsService.create(cat);
  }
}
```

'cats' 作为路由前缀，会自动为该控制器下的所有路由添加 /cats 前缀
例如：create() 方法的完整路由会是 POST /cats

```ts
@Controller('cats')
class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()  // GET /cats
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')  // GET /cats/:id
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(id);
  }

  @Post()  // POST /cats
  create(@Body() cat: Cat) {
    return this.catsService.create(cat);
  }
}
```

### 装饰器的好处
```ts
@Controller('cats')
class CatsController {
  @Get()
  @UseGuards(AuthGuard)  // 添加认证守卫
  @UseInterceptors(LoggingInterceptor)  // 添加日志拦截器
  findAll() {
    return this.catsService.findAll();
  }
}
```
声明式代码，优雅的添加中间件、拦截器、守卫等