import { client } from "@/libs/client";
import styles from "../../page.module.css";
import Image from "next/image";

// 1. 公開後、データが変わったら60秒ごとに更新を試みる設定（ISR）
export const revalidate = 60;

type Blog = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  category: { name: string };
  eyecatch?: { url: string };
};

export async function generateStaticParams() {
  const data = await client.get({ endpoint: "blogs" });
  return data.contents.map((blog: { id: string }) => ({ id: blog.id }));
}

export default async function BlogPage({ params }: { params: { id: string } }) {
  const blog: Blog = await client.get({
    endpoint: "blogs",
    contentId: params.id,
  });

  return (
    <main className={styles.main}>
      <article className={styles.articleContainer}>
        {blog.category && (
          <span className={styles.category}>{blog.category.name}</span>
        )}
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
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          </div>
        )}
        <div
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: `${blog.content}` }}
        />
      </article>
    </main>
  );
}
