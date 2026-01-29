
## RxJS

### firstValueFrom

firstValueFrom 是 RxJS 6.x 之后引入的一个工具函数，用于将 Observable 转换为 Promise，并获取第一个值。

```typescript
  // 服务间调用场景
  @Get()
  async getHello(): Promise<string> {
    const value = await firstValueFrom(this.examClient.send('sum', [1, 3, 5]));
    return `this.answerService.getHello() + ${value}`;
  }
  // HTTP 请求场景
    @Injectable()
    export class UserService {
  constructor(private httpClient: HttpClient) {}

  async getUser(id: number) {
    try {
      // 将 Observable<User> 转换为 Promise<User>
    //   这也是是个rpc调用
      const user = await firstValueFrom(
        this.httpClient.get<User>(`/api/users/${id}`)
      );
      return user;
    } catch (error) {
      throw new Error('Failed to fetch user');
    }
  }
}
```

### rpc流程

rpc流程：
```ts
// 1. 客户端发起请求
client.send('get_exam', { id: 1 })

// 2. TCP 传输
// [客户端] ----TCP----> [服务端]

// 3. 服务端处理
@MessagePattern('get_exam')
async getExam(data) { ... }

// 4. 返回结果
// [服务端] ----TCP----> [客户端]
```

```ts
// 服务端
@Controller()
export class ExamController {
  constructor(private examService: ExamService) {}

  @MessagePattern('get_exam')
  async getExam(data: { id: number }): Promise<Exam> {
    return this.examService.findOne(data.id);
  }

  @MessagePattern('create_exam')
  async createExam(data: CreateExamDto): Promise<Exam> {
    return this.examService.create(data);
  }
}

// 客户端
@Injectable()
export class ExamClientService {
  constructor(
    @Inject('EXAM_SERVICE') private client: ClientProxy
  ) {}

  async getExam(id: number): Promise<Exam> {
    return firstValueFrom(
      this.client.send<Exam>('get_exam', { id })
    );
  }

  async createExam(data: CreateExamDto): Promise<Exam> {
    return firstValueFrom(
      this.client.send<Exam>('create_exam', data)
    );
  }
}
```