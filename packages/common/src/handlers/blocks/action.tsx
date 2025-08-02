import { JSX } from 'react'
import { Action } from '../../components/Action'
import { Action as ActionType } from '@common/types/payload-types'

/**
 * Handles rendering of action blocks.
 */
export function render(block: ActionType, index: number): JSX.Element {
  return (
    <Action
      key={index}
      label={block.label}
      style={block.style}
      actionType={block.actionType}
      url={block.url ?? undefined}
      customActionKey={block.customActionKey ?? undefined}
    />
  )
}
