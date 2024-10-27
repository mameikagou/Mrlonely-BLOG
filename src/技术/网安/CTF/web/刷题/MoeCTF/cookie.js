const http = require('http');

const options = {
  hostname: 'node5.anna.nssctf.cn',
  port: 27745,
  path: '/',
  method: 'GET',
  headers: {
    'Host': 'node5.anna.nssctf.cn:27745',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Cookie': 'VIP=1',
  }
};

const req = http.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);
  console.log(`响应头: ${JSON.stringify(res.headers)}`);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(`请求遇到问题: ${e.message}`);
});

req.end();