import Link from 'next/link'
import React from 'react'
import classes from './Links.module.scss'

/**
 * Custom side panel links for the Payload admin UI.
 */

export const LinkToDashboard: React.FC = () => {
  return <Link href='/admin' className={classes.link}>Dashboard</Link>
}

export const LinkToPeople: React.FC = () => {
  return <Link href='/admin/people' className={classes.link}>People</Link>
}

export const LinkToMembers: React.FC = () => {
  return <Link href='/admin/members' className={classes.link}>Members</Link>
}

export const LinkToBroadcast: React.FC = () => {
  return <Link href='/admin/broadcast' className={classes.link}>Broadcast</Link>
}

export const LinkToCampaigns: React.FC = () => {
  return <Link href='/admin/campaigns' className={classes.link}>Campaigns</Link>
}

export const NavSpacer: React.FC = () => {
  return <hr />;
};