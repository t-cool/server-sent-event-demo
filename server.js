const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  // 5秒おきにクライアントにメッセージを送信
  const timer = setInterval(() => {
    res.write(`data: ${new Date().toLocaleTimeString()}\n\n`);
  }, 5000);

  // クライアントが接続を閉じた場合、タイマーをクリア
  req.on('close', () => {
    clearInterval(timer);
  });
}).listen(8000);
