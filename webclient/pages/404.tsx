import Head from "next/head";
import Link from "next/link";
import { config } from "../constants/constants";
import styles from '../styles/Home.module.css'

export default function custom404() {
  return (
    <div className={styles.container}>
      <Head>
        <title>{config.HEAD_TITLE}</title>
        <meta name="description" content={config.HEAD_DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Page Not Found
        </h1>
        <p className={styles.description}><Link href={`/`}>👉 Link to Top page</Link></p>
      </main>
    </div>
  )
}
