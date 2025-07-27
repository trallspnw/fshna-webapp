import Link from 'next/link'
import React from 'react'
import classes from './Links.module.scss'

export const LinkToDashboard: React.FC = () => {
  return <Link href='/admin' className={classes.link}>Dashboard</Link>
}

export const LinkToBroadcast: React.FC = () => {
  return <Link href='/admin/broadcast' className={classes.link}>Broadcast</Link>
}
