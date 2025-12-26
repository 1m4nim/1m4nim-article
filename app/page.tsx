import styles from "./page.module.css";
import Image from "next/image";
import ButtonLink from "./_components/ButtonLink";
import { client } from "@/libs/client"; // 作成したクライアントをインポート

// microCMSの型定義に合わせる
type Article = {
  id: string;
  title: string;
  category: {
    name: string;
  };
  publishedAt: string;
  eyecatch?: {      // アイキャッチ画像がある場合
    url: string;
  };
};

export default async function Home() {
  // microCMSからデータを取得 (blogsはAPIエンドポイント名)
  const data = await client.get({ 
    endpoint: "blogs",
    queries: { limit: 3 } // 最新3件だけ取得する場合
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
        />
      </section>
      <section className={styles.article}>
        <h2 className={styles.articleTitle}>Blog</h2>
        <ul>
          {data.contents.map((article: Article) => (
            <li key={article.id} className={styles.list}>
              <div className={styles.link}>
                <Image
                  className={styles.image}
                  src={article.eyecatch?.url || "/no-image.png"}
                  alt={article.title}
                  width={1200}
                  height={630}
                />
                <dl className={styles.content}>
                  {/* タイトルを表示 */}
                  <dt className={styles.articleItemTitle}>
                    {article.title}
                  </dt>
                  <dd className={styles.meta}>
                    <span className={styles.date}>
                      <Image
                        src="/clock.svg"
                        alt=""
                        width={32}
                        height={32}
                        priority
                      />
                      {/* 日付を整形して表示 */}
                      {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
                    </span>
                  </dd>
                </dl>
              </div>
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