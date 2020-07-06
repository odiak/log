import { FC } from 'react'
import Head from 'next/head'

export const Title: FC<{}> = ({ children }) => {
  return (
    <Head>
      <title>
        {children}
        {children != null && ' | '}odiak's log
      </title>
    </Head>
  )
}
