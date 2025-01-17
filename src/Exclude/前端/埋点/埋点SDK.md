## 埋点SDK

### 技术选型：

因为主要是nodejs的功能需求

SDK方面，pnpm + Monorepo 管理，使用Vite构建，使用Typescript开发。
后端方面使用 nestjs开发，使用 prisma 进行数据库操作。

部署方面，使用 docker 部署， 使用docker-compose 管理，前端使用caddy代理静态文件。

埋点 SDK
1. 埋点事件的上报：实现基本的埋点事件上报功能，能将指定的事件名称及对应参数发送到服务端。

设置一个基本函数，用于埋点事件的上报
```ts
class Track {
    constructor(options) {
        this.options = options;
        this.commonParams = {};
        // 存储上报队列
        this.queue = [];
    }
    uploadEvent(eventName, eventParams = {}) {
        const data = {
            // 一些基础信息，比如事件名，时间用户id，事件id等等
            eventName,
            eventId:this.generateEventId(),
            userId: this.options.userId,
            timestamp: Date.now(),
            // 其他参数
            ...this.commonParams,
            ...eventParams,
        }
        // 上报数据
        this.upload(data);
    }

    // 生成事件id的函数, 因为是前端生成的，所以需要保证唯一性
    generateEventId() {
        return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }

    // 获取会话ID
    getSessionId() {
        let sessionId = sessionStorage.getItem('track_session_id');
        if (!sessionId) {
            sessionId = this.generateEventId();
            sessionStorage.setItem('track_session_id', sessionId);
        }
        return sessionId;
    }

    // 发送数据
    send(data) {
        // 添加到队列
        this.queue.push(data);
        
        // 判断是否需要立即上报
        if (this.shouldUploadImmediately()) {
            this.flush();
        }
    }
    async flush() {
        if (this.queue.length === 0) return;

        const events = [...this.queue];
        this.queue = [];

       try {
            await fetch(this.options.uploadUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    events,
                    timestamp: Date.now()
                })
            });
        } catch (error) {
            // 上报失败，重新加入队列
            this.queue.unshift(...events);
            console.error('Track upload failed:', error);
        }
    }
}
```

2. 页面初始化：在页面加载初始化阶段，注册项目相关的埋点基础信息，为后续数据上报提供配置依据。

配置一些基本信息，比如设备信息，通用参数，上报时间等。
```ts
// 初始化SDK
    init() {
        // 初始化设备信息
        this.initDeviceInfo();
        
        // 设置通用参数
        this.setCommonParams({
            app_id: this.options.appId,
            user_id: this.options.userId,
            sdk_version: '1.0.0',
            environment: this.options.env,
            device_info: this.deviceInfo,
            session_id: this.getSessionId()
        });

        // 启动定时上报
        this.startTimer();

        // 注册页面离开事件
        this.registerBeforeUnload();

        // 调试模式输出信息
        if (this.options.debug) {
            console.log('Track SDK initialized with options:', this.options);
        }
    }
```

3. 添加通用参数：允许在任意时刻为埋点上报添加默认携带的通用参数，增强数据的丰富性和关联性。

见2，已写明；

4. 获取用户环境信息：在初始化时自动读取用户的环境信息，如浏览器版本、操作系统、uid、上报时间等，随埋点数据一同上报，帮助更全面地分析用户行为。

见2，已写明；

5. 错误信息捕获：当接入项目出现报错时，自动捕获相关错误信息并上报给服务端，便于及时发现和排查问题。

统一封装一个错误捕获函数，用于捕获错误信息并上报，以及错误信息上报的函数。

```ts
import { Track } from './index';

interface ErrorInfo {
    message: string;
    stack?: string;
    filename?: string;
    lineno?: number;
    colno?: number;
    type: 'error' | 'unhandledrejection';
    timestamp: number;
}

export class ErrorTracker {
    private track: Track;

    constructor(track: Track) {
        this.track = track;
        this.initErrorListener();
    }

    private initErrorListener() {
        // 捕获运行时错误
        window.addEventListener('error', (event) => {
            const errorInfo: ErrorInfo = {
                message: event.message,
                // 错误堆栈
                stack: event.error?.stack,
                filename: event.filename,
                // 错误行号
                lineno: event.lineno,
                // 错误列号
                colno: event.colno,
                type: 'error',
                timestamp: Date.now()
            };
            this.reportError(errorInfo);
        }, true);

        // 捕获Promise未处理的rejection
        window.addEventListener('unhandledrejection', (event) => {
            const errorInfo: ErrorInfo = {
                message: event.reason?.message || String(event.reason),
                stack: event.reason?.stack,
                type: 'unhandledrejection',
                timestamp: Date.now()
            };
            this.reportError(errorInfo);
        });

        // TODO：对其余类型的错误进行监听
    }

    // 手动上报错误的方法
    public captureError(error: Error) {
        const errorInfo: ErrorInfo = {
            message: error.message,
            stack: error.stack,
            type: 'error',
            timestamp: Date.now()
        };
        this.reportError(errorInfo);
    }

    private reportError(errorInfo: ErrorInfo) {
        this.track.uploadEvent('error', {
            ...errorInfo,
            url: window.location.href,
            userAgent: navigator.userAgent
        });
    }
}

```

埋点数据服务（server）
1. 数据库表结构设计：设计合理完善的数据库表结构，满足对埋点数据的高效存储以及方便后续的查询、分析等操作需求
2. 索引设计：通过合理创建索引，加速对埋点数据的查询操作，提高系统整体性能。
3. 埋点事件 CRUD 设计：基于事件埋点的多样性，运用合适的设计模式打造易于拓展、低耦合的埋点事件增删改查功能，方便对数据进行管理和维护
埋点平台（数据看板、埋点管理）
1. 埋点数据的查询：能够获取指定埋点事件的 PV（访问次数）、UV（独立访客人数）等关键数据指标，为分析用户行为提供基础数据支持。
2. 事件信息的增删改查：提供对埋点事件的基本管理功能，包括新增、删除、修改、查询事件相关信息，方便对埋点规则和配置进行维护。
3. 埋点数据的筛选：实现对埋点事件按照特定条件进行筛选查询，比如查询满足某个参数条件的事件的 PV 等，满足更精细化的数据分析需求。

并不熟悉后端，以上待补充



4. 看板搭建：搭建可视化的数据图表，支持折线图、饼图等多种样式，同时能基于日期、事件、用户行为等维度进行筛选展示，直观呈现数据分析结果。 

这个相对简单，使用React及其相关生态 + Echarts 切图。
如果是后台看板的话，直接umijs即可，它是antd + 路由 + 状态管理 + ahooks + 请求库等等，这样最简单高效实用；



