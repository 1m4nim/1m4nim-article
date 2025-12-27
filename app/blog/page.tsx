// app/blog/page.tsx
import { client } from "@/libs/client";
import styles from "../page.module.css";
import Image from "next/image";
import Link from "next/link";

export default async function BlogListPage() {
  const data = await client.get({
    endpoint: "blogs",
    queries: { limit: 10, orders: "-publishedAt" },
    customRequestInit: {
      cache: "no-store",
    },
  });

  return (
    <main className={styles.main}>
      <div className={styles.articleContainer}>
        <h1 className={styles.articleTitle}>すべての記事</h1>
        <ul className={styles.articleList}>
          {data.contents.map((article: any) => (
            <li key={article.id} className={styles.list}>
              <Link href={`/blog/${article.id}`} className={styles.link}>
                <Image
                  src={article.eyecatch?.url || "/no-image.png"}
                  alt=""
                  width={300}
                  height={200}
                  className={styles.image}
                />
                <div className={styles.content}>
                  {/* カテゴリ表示を追加 */}
                  {article.category && (
                    <span className={styles.category}>
                      {article.category.name}
                    </span>
                  )}
                  <p className={styles.articleItemTitle}>{article.title}</p>
                  <span className={styles.date}>
                    {new Date(article.publishedAt).toLocaleDateString("ja-JP")}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
