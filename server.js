import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());                 // 允许前端跨域
app.use(express.static('.'));    // 把同目录下的 index.html 也一起托管

let transport;

// AI 平台会先 GET /sse 建立 SSE 通道
app.get('/sse', async (req, res) => {
  transport = new SSEServerTransport('/message', res);
  const server = new Server(
    { name: 'demo-server', version: '1.0.0' },
    { capabilities: { tools: {}, prompts: {}, resources: {} } }
  );
  // 随便加一个工具，让平台能测通
  server.setRequestHandler('tools/call', async (params) => {
    if (params.name === 'hello') {
      return { content: [{ type: 'text', text: 'Hello from my own MCP!' }] };
    }
  });
  await server.connect(transport);
});

// POST /message 是 SSE 回包通道
app.post('/message', (req, res) => transport.handlePost(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`MCP-SSE listening on :${PORT}`));