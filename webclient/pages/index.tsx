import Head from 'next/head'
import Image from 'next/image'
import { config } from '../constants/constants'
import styles from '../styles/Home.module.css'
import dayjs from 'dayjs'

type Props = {
  period: string
}

export default function Home(props: Props) {
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
          {props.period}
        </p>
        <p className={styles.description}>
          {config.CTF_RULE}
        </p>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const period = `${dayjs(config.CTF_START_TIME).format('YYYY/MM/DD HH:mm')} - ${dayjs(config.CTF_END_TIME).format('YYYY/MM/DD HH:mm')} (JST)`
  return {
    props: {
      period
    }
  }
}
