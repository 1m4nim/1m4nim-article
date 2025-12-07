import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <section className={styles.top}>
      <div>
        <h1 className={styles.title}>1m4nimのblog</h1>
      </div>
      <Image
        className={styles.bgimg}
        // Next.jsのpublicフォルダ内の画像は、ルートパス (/) からアクセスします
        src="/angel.jpg"
        alt="赤いキノコの帽子をかぶった天使"
      />
    </section>
  );
}
