import { client } from "@/libs/client";
import styles from "../../page.module.css"; 
import Image from "next/image";
import Link from "next/link";

type Blog = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
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
      {/* トップへ戻る画像リンク */}
      <div style={{ padding: '20px 0' }}>
        <Link href="/">
          <Image
            src="/back-button.png"
            alt="トップページへ戻る"
            width={100}
            height={50}
            style={{ cursor: 'pointer' }}
          />
        </Link>
      </div>

      <article className={styles.article}>
        <h1 className={styles.articleTitle}>{blog.title}</h1>
        
        <div className={styles.meta}>
          <span className={styles.date}>
            {new Date(blog.publishedAt).toLocaleDateString("ja-JP")}
          </span>
        </div>

        {blog.eyecatch && (
          <div className={styles.eyecatchDetail} style={{ marginBottom: '20px' }}>
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