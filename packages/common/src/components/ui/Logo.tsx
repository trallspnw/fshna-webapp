import Link from 'next/link'
import styles from './Logo.module.scss'
import Image from 'next/image'

export interface LogoProps {
  imageUrl: string
  altText: string
}

export default function Logo(props: LogoProps) {
  return (
    <Link href="/" className={styles.logo} aria-label={props.altText}>
      <Image
        src={props.imageUrl}
        alt={props.altText}
        width='120'
        height='40'
        unoptimized
        className={styles.logoImage}
      />
    </Link>
  )
}
