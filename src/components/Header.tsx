import { FC } from 'react'
import Link from 'next/link'
import css from './Header.module.scss'

export const Header: FC<{}> = () => {
  return (
    <h1 className={css.h1}>
      <Link href="/">
        <a>odiak's log</a>
      </Link>
    </h1>
  )
}
