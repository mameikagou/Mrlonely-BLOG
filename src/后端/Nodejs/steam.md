
## Steam

##### const { PassThrough } = require('stream');

- 数据从输入到输出不做任何修改
- 可以用来监听或调试数据流
- 可以用来连接不同的流

监控数据流
```ts
const { PassThrough } = require('stream');
const fs = require('fs');

const pass = new PassThrough();

pass.on('data', ( chunk )=>{
    console.log(chunk)
})

fs.createReadStream('./steam.md').pipe(pass).pipe(process.stdout);
```


文件上传进度
```ts

function uploadWithProgress(fileStream, totalSize) {
    const pass = new PassThrough();
    let uploadedSize = 0;

    pass.on('data', (chunk) => {
        uploadedSize += chunk.length;
        const progress = (uploadedSize / totalSize) * 100;
        console.log(`上传进度: ${progress}%`);
    });
    return fileStream.pipe(pass);
}

```



### fs.pipe
用于连接可读流(fs.createReadStream)以及可写流(fs.createWriteStream), 使得数据可以自动从可读流中读取, 并写入到可写流中。

链式调用
```ts
const fs = require('fs');

fs.createReadStream('./steam.md')
    .pipe(zlib.createGzip()) // 压缩
    .pipe(fs.createWriteStream('./steam-copy.md'))
    .on('finish', () => {
        console.log('文件复制完成');
    });
```

```ts
const fs = require('fs');
const { PassThrough } = require('stream');

function uploadFile(sourceStream, filename){

    const pass = new PassThrough();

    const writeStream = fs.createWriteStream(filename);

    let totalSize = 0;

    pass.on('data', (chunk) => {
        totalSize += chunk.length;
        console.log(`上传进度: ${totalSize} bytes`);
    });

    return sourceStream.pipe(pass).pipe(writeStream);
}

```

背压处理
```ts
const fs = require('fs');

const readStream = fs.createReadStream('bigfile.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);

readStream.on('data', (chunk) => {
    if(writeStream.write(chunk) === false){
        console.log('背压了')  
        readStream.pause(); //  暂停数据流动，停止触发'data'事件
    }
});

writeStream.on('drain', () => {
    readStream.resume(); // 恢复数据流动，继续触发'data'事件
});
```

### data事件

data事件在流读取数据时触发，当流读取到数据时，会触发data事件，并传递读取到的数据。

暂停模式：
```ts
const fs = require('fs');

const readStream = fs.createReadStream('bigfile.txt');
// 不添加data监听器，流就会保持在暂停模式
```

已结束：
```ts
readStream.on('end', () => {
  // 流结束后，data事件不会再触发
  console.log('流已结束');
});
```

```ts
readStream.on('error', (err) => {
  console.error('读取错误:', err);
});
```

