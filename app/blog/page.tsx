// app/blog/page.tsx
export const revalidate = 60;
import { client } from "@/libs/client";
import styles from "../page.module.css";
import Image from "next/image";
import Link from "next/link";

export default async function BlogListPage() {
  const data = await client.get({
    endpoint: "blogs",
    queries: { limit: 10, orders: "-publishedAt" },
  });

  return (
    <main className={styles.main}>
      {/* 右上のバツボタン（styles.closeButton）をここから完全に削除しました。
         左上の自作画像ボタンのみを残しています。
      */}
      <div style={{ padding: "20px 0" }}>
        <Link href="/">
          <Image
            src="/back-button.png"
            alt="トップページへ戻る"
            width={100}
            height={50}
            style={{
              cursor: "pointer",
              backgroundColor: "white",
              borderRadius: "20%",
            }}
          />
        </Link>
      </div>

      <section className={styles.article}>
        <h1 className={styles.articleTitle}>すべての記事</h1>
        <ul>
          {data.contents.map((article: any) => (
            <li key={article.id} className={styles.list}>
              <Link href={`/blog/${article.id}`} className={styles.link}>
                <Image
                  src={article.eyecatch?.url || "/no-image.png"}
                  alt=""
                  width={1200}
                  height={630}
                  className={styles.image}
                />
                <dl className={styles.content}>
                  {article.category && (
                    <span
                      className={styles.category}
                      style={{
                        fontSize: "0.8rem",
                        color: "#666",
                        display: "block",
                      }}
                    >
                      {article.category.name}
                    </span>
                  )}
                  <dt className={styles.articleItemTitle}>{article.title}</dt>
                  <dd className={styles.meta}>
                    <span className={styles.date}>
                      {new Date(article.publishedAt).toLocaleDateString(
                        "ja-JP"
                      )}
                    </span>
                  </dd>
                </dl>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
