import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: '1m4nim-blog', 
  apiKey: process.env.MICROCMS_API_KEY || '',
});