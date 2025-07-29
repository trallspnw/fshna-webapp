'use client'

import { ReactNode } from 'react'
import classes from './Modal.module.scss'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        {title && <h2>{title}</h2>}
        <button className={classes.closeButton} onClick={onClose}>×</button>
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  )
}
