import Head from 'next/head'
import Image from 'next/image'
import { config } from '../constants/constants'
import styles from '../styles/Home.module.css'
import dayjs from 'dayjs'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>{config.HEAD_TITLE}</title>
        <meta name="description" content={config.HEAD_DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {config.CTF_TITLE}
        </h1>

        <p className={styles.description}>
          {config.CTF_DESCRIPTION}
        </p>
        <p className={styles.description}>
          {`${dayjs(config.CTF_START_TIME).format('YYYY/MM/DD HH:mm')} - ${dayjs(config.CTF_END_TIME).format('YYYY/MM/DD HH:mm')} (JST)`}
        </p>
        <p className={styles.description}>
          {config.CTF_RULE}
        </p>
      </main>
    </div>
  )
}
