// app/blog/[id]/page.tsx
import { client } from "@/libs/client";
import styles from "../../page.module.css";
import Image from "next/image";

type Blog = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  eyecatch?: { url: string };
};

// 全記事のパスを事前に生成する（静的エクスポート用）
export async function generateStaticParams() {
  const data = await client.get({ endpoint: "blogs" });
  return data.contents.map((blog: { id: string }) => ({ id: blog.id }));
}

export default async function BlogPage({ params }: { params: { id: string } }) {
  // 記事を1件取得
  const blog: Blog = await client.get({
    endpoint: "blogs",
    contentId: params.id,
  });

  return (
    <main className={styles.main}>
      {/* 記事全体を白背景のカードのように表示 */}
      <article className={styles.articleContainer}>
        <h1 className={styles.articleTitle}>{blog.title}</h1>
        
        <div className={styles.meta}>
          <span className={styles.date}>
            <Image src="/clock.svg" alt="" width={20} height={20} />
            {new Date(blog.publishedAt).toLocaleDateString("ja-JP")}
          </span>
        </div>

        {blog.eyecatch && (
          <div className={styles.eyecatchDetail}>
            <Image
              src={blog.eyecatch.url}
              alt={blog.title}
              width={1200}
              height={630}
              priority
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </div>
        )}

        {/* 本文（microCMSのHTMLを反映） */}
        <div
          className={styles.postContent}
          dangerouslySetInnerHTML={{
            __html: `${blog.content}`,
          }}
        />
      </article>
    </main>
  );
}