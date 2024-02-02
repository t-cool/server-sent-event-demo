const http = require('http');

http.createServer((req, res) => {
  // クライアントのリクエストが SSE 用のエンドポイントに対するものであるか確認
  if (req.url === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      // CORS ヘッダーを追加: 必要に応じて '*' を適切なオリジンに置き換えてください
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });

    // クライアントに初期メッセージを送信（接続が成功したことを確認）
    res.write('data: Connection established\n\n');

    // 5秒おきにクライアントに現在時刻を送信
    const timer = setInterval(() => {
      res.write(`data: ${new Date().toLocaleTimeString()}\n\n`);
    }, 1000);

    // 接続が閉じられた場合、タイマーをクリア
    req.on('close', () => {
      clearInterval(timer);
    });
  } else {
    // SSE 用のエンドポイント以外へのリクエストには 404 ステータスを返す
    res.writeHead(404);
    res.end();
  }
}).listen(8000, () => console.log('Server running on http://localhost:8000'));
