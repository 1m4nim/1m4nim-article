// app/page.tsx
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import ButtonLink from "./_components/ButtonLink";
import { client } from "@/libs/client";

type Article = {
  id: string;
  title: string;
  category: {
    name: string;
  };
  publishedAt: string;
  eyecatch?: {
    url: string;
  };
};

export default async function Home() {
  const data = await client.get({
    endpoint: "blogs",
    queries: {
      limit: 3,
      orders: "-publishedAt", // 新しい順に並べる
    },
    // 最新情報を取得するためのキャッシュ無効化設定
    customRequestInit: {
      cache: "no-store",
    },
  });

  return (
    <>
      <section className={styles.top}>
        <div>
          <h1 className={styles.title}>1m4nimのBlog</h1>
        </div>
        <Image
          className={styles.bgimg}
          src="/angel.jpg"
          alt="赤いキノコの帽子をかぶった天使"
          fill
          priority
        />
      </section>

      <section className={styles.article}>
        <h2 className={styles.articleTitle}>Blog</h2>
        <ul>
          {data.contents.map((article: Article) => (
            <li key={article.id} className={styles.list}>
              <Link href={`/blog/${article.id}`} className={styles.link}>
                <Image
                  className={styles.image}
                  src={article.eyecatch?.url || "/no-image.png"}
                  alt={article.title}
                  width={1200}
                  height={630}
                />
                <dl className={styles.content}>
                  {/* カテゴリ名の表示を追加 */}
                  {article.category && (
                    <dd>
                      <span className={styles.category}>
                        {article.category.name}
                      </span>
                    </dd>
                  )}
                  <dt className={styles.articleItemTitle}>{article.title}</dt>
                  <dd className={styles.meta}>
                    <span className={styles.date}>
                      <Image src="/clock.svg" alt="" width={32} height={32} />
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
        <div className={styles.articleLink}>
          <ButtonLink href="/blog">もっと見る</ButtonLink>
        </div>
      </section>
    </>
  );
}
