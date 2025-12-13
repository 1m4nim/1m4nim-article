import styles from "./page.module.css";
import Image from "next/image";

type Article = {
  id: string;
  title: string;
  category: {
    name: string;
  };
  publishedAt: string;
  createdAt: string;
};

const data: {
  contents: Article[];
} = {
  contents: [
    {
      id: "1",
      title: "Hello",
      category: {
        name: "更新情報",
      },
      publishedAt: "2025/12/12",
      createdAt: "2025/12/12",
    },
    {
      id: "2",
      title: "test",
      category: {
        name: "更新情報",
      },
      publishedAt: "2025/12/13",
      createdAt: "2025/12/13",
    },
  ],
};

export default function Home() {
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
          {data.contents.map((article) => (
            <li key={article.id} className={styles.list}>
              <div className={styles.link}>
                <Image
                  className={styles.image}
                  src="/no-image.png"
                  alt="No Image"
                  width={1200}
                  height={630}
                />
                <dl className={styles.content}>
                  <dt className={styles.articleItemTitle}>
                    {article.category.name}
                  </dt>
                  <dd className={styles.meta}>
                    {/* <span className={styles.tag}>{article.category.name}</span> */}
                    <span className={styles.date}>
                      <Image
                        src="/clock.svg"
                        alt=""
                        width={32}
                        height={32}
                        priority
                      />
                      {article.publishedAt}
                    </span>
                  </dd>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
