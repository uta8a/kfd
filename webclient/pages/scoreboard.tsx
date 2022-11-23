import Head from 'next/head'
import Image from 'next/image'
import { BASE_URL, config } from '../constants/constants'
import styles from '../styles/Home.module.css'
import dayjs from 'dayjs'

type Player = {
  username: string,
  score: number,
}
type Props = {
  players: Array<Player>
}

export default function Scoreboard(props: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{config.HEAD_TITLE}</title>
        <meta name="description" content={config.HEAD_DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {props.players.map((p) => {
          return <p key={p.username}>{ p.username} - { p.score }</p>
        })}
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${BASE_URL}/players`)
  const data = await res.json()
  return {props: data}
}
