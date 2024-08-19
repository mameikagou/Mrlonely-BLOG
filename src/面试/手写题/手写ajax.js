// 1,创建实例; 2,发出http请求; 3,接收服务器传回的数据; 4,更新网页数据

function handleGet(url) {
  let response = "";
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        response = xhr.responseText;
        console.log(response, "1");
      } else {
        return "Error" + xhr.status;
      }
    }
  };
}
