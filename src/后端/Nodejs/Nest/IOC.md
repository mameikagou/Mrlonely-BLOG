
### 面向切面编程 AOP
允许在不修改原有代码的情况下，动态添加功能；

比如添加一些功能：
- 日志记录
- 性能监控
- 事务管理

好处是降低耦合性，并且方便代码复用；

### 控制反转 IOC

使用容器来管理对象的生命周期和依赖关系以及对象的创建，注入依赖信息，开发者不需要手动创建和管理对象，框架会自动处理这些工作。
框架负责调度代码执行，开发者只需要定义逻辑；

比如这里直接通过装饰器来注入用户信息：
你只需要关注逻辑，获取用户的方法来自于框架。
```ts
@Get('profile')
getProfile(@UserInfo() user: User) { // 👈 这里通过装饰器自动注入用户信息
  return user;
}
```


#### 依赖注入 DIfg
依赖注入是控制反转的一种实现方式，框架负责创建对象并注入到需要的地方；

##### Nest
在 Nest 中，依赖注入是通过模块化的方式实现的，每个模块都可以定义自己的提供者和控制器，Nest 会自动解析依赖关系并注入到需要的地方；

装饰器驱动：通过 `@Injectable()`、`@Controller()` 等装饰器声明可注入的类。

##### Java
主要通过注解实现，Spring 框架是 Java 中最常用的依赖注入框架，使用 `@Autowired` 注解来自动注入依赖。

还有xml或者JavaConfig的方式来配置依赖注入。

### DTO以及VO文件

DTO：Data Transfer Object，用于传输数据，通常用于接收客户端请求的数据，并将其转换为业务逻辑所需的数据格式。
VO：Value Object，用于表示业务逻辑中的值对象，通常用于返回给客户端的数据。
DTO和VO的区别在于，DTO用于接收请求数据，VO用于返回响应数据。

一般情况，会分别创建DTO和VO；
但是在一些情况下，可以直接使用`@Exclude`来排除一些字段，从而直接返回实体类。
`@Expose`来指定一些字段，从而直接返回实体类。
`@Transform`来转换一些字段，从而直接返回实体类。
```ts
import { Exclude, Expose, Transform } from "class-transformer";

export class User {
    id: number;

    username: string;

    @Exclude()
    password: string;

    @Expose()
    get xxx(): string {
        return `${this.username} ${this.email}`;
    }

    @Transform(({value}) => '邮箱是：' + value)
    email: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}

```

为什么不使用VO对象？

Nest 文档里并没有提到 vo 对象，因为完全没有必要，可以直接用序列化的 entity。
entity 里加上 @Exclude 可以排除某些字段、@Expose 可以增加一些派生字段、@Transform 可以对已有字段的序列化结果做修改。
然后在 cotnroller 上加上 ClassSerializerInterceptor 的 interceptor，还可以用 @SerializeOptions 来添加 options。









