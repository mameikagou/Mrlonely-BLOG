# Go环境配置

## QA
### 在工作区会莫名其妙的pkg以及bin文件?

A: 在go.mod文件中声明了module后，go会自动创建一个go.sum文件，用于记录依赖的版本信息，以及一个go.mod文件，用于记录依赖的版本信息。

![gopath](./image/image.png)

需要配置gopath, 否则他在工作区一直添加该依赖，会莫名其妙的pkg以及bin文件。
使用`go env`查看环境后,如果已经配置了, 需要在你的ide中再次配置,比如vscode, 需要在setting中配置, 如下图所示:

![gopath](./images/image2.png)