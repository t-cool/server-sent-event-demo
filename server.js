const http = require('http');

// Add a list of quotes
const quotes = [
  "Not how long, but how well you have lived is the main thing. - Seneca",
  "Life is really simple, but we insist on making it complicated. - Confucius",
  "The purpose of our lives is to be happy. - Dalai Lama",
  "Life is what happens when you're busy making other plans. - John Lennon",
  "The way to get started is to quit talking and begin doing. - Walt Disney",
  "Tell me and I forget. Teach me and I remember. Involve me and I learn. - Benjamin Franklin",
  "It is our choices that show what we truly are, far more than our abilities. - J.K. Rowling",
  "Life is what happens when you’re busy making other plans. - John Lennon",
  "Get busy living or get busy dying. - Stephen King",
  "You only live once, but if you do it right, once is enough. - Mae West",
  "Many of life’s failures are people who did not realize how close they were to success when they gave up. - Thomas A. Edison",
  "If you want to live a happy life, tie it to a goal, not to people or things. - Albert Einstein",
  "Never let the fear of striking out keep you from playing the game. - Babe Ruth",
  "Money and success don’t change people; they merely amplify what is already there. - Will Smith",
  "Your time is limited, don’t waste it living someone else’s life. - Steve Jobs",
];

let quoteIndex = 0;

http.createServer((req, res) => {
  //クライアントのリクエストが SSE 用のエンドポイントにするものであるか
  if (req.url === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      // CORS ヘッダーを追加: 必要に応じて '*' を適切なオリジンに置き換える
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });

    // クライアントに初期メッセージを送信（接続が成功したことを確認）
    res.write('data: Connection established\n\n');

    // 1秒おきにクライアントに現在時刻を送信
    const timer = setInterval(() => {
      const quote = quotes[quoteIndex];
      res.write(`data: ${quote}\n\n`);
      
      quoteIndex = (quoteIndex + 1) % quotes.length; // Move to the next quote, loop back to start when reaching the end
    }, 2000);

    //がじられた場合、タイマーをクリア
    req.on('close', () => {
      clearInterval(timer);
    });
  } else {
    // SSE 用のエンドポイント以外へのリクエストには 404 ステータスを返す
    res.writeHead(404);
    res.end();
  }
}).listen(8000, () => console.log('Server running on http://localhost:8000'));
