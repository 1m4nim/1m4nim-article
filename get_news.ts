import axios from 'axios';
import * as fs from 'fs';

// microCMSの記事データの型定義
interface BlogItem {
  id: string;
  title: string;
  content: string; 
  publishedAt: string;
}

interface MicroCMSResponse {
  contents: BlogItem[];
  totalCount: number;
  offset: number;
  limit: number;
}

async function fetchNews(): Promise<void> {
  const serviceDomain: string = '1m4nim-blog';
  const endpoint: string = 'blogs';
  
  // 環境変数からAPIキーを取得
  const apiKey = process.env.MICROCMS_API_KEY;

  if (!apiKey) {
    console.error('Error: MICROCMS_API_KEY is not defined in environment variables.');
    process.exit(1);
  }

  try {
    const res = await axios.get<MicroCMSResponse>(
      `https://${serviceDomain}.microcms.io/api/v1/${endpoint}`,
      {
        headers: { 'X-MICROCMS-API-KEY': apiKey }
      }
    );
    
    // Markdown形式に整形
    const markdownContent: string = res.data.contents
      .map((item: BlogItem) => {
        const date = new Date(item.publishedAt).toLocaleDateString('ja-JP');
        return `## ${item.title} (${date})\n\n${item.content}\n\n---\n`;
      })
      .join('\n');

    // ファイル書き出し
    fs.writeFileSync('UPDATE.md', markdownContent);
    console.log('Successfully updated UPDATE.md');
  } catch (error) {
    console.error('Error fetching data from microCMS:', error);
    process.exit(1);
  }
}

fetchNews();