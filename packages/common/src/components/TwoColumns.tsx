'use client'

import { JSX } from "react"
import classes from './TwoColumns.module.scss'

export type TwoColumnsProps = {
  left: JSX.Element[]
  right: JSX.Element[]
  columnRatio?: '70-30' | '60-40' | '50-50' | '40-60' | '30-70'
}

/**
 * A layout componet for rendering two columns with a specified width ratio. Accepts left and right children.
 */
export function TwoColumns({ left, right, columnRatio = '60-40' }: TwoColumnsProps) {
  const [leftRatio, rightRatio] = columnRatio.split('-').map(Number)

  return (
    <div className={classes.container}>
      <div className={classes.column} style={{ flexGrow: leftRatio, flexBasis: 0 }}>
        {left}
      </div>
      <div className={classes.column} style={{ flexGrow: rightRatio, flexBasis: 0 }}>
        {right}
      </div>
    </div>
  )
}
