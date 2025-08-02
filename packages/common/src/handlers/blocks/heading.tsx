import { JSX } from 'react';
import { Heading as HeadingType } from '@common/types/payload-types';
import { Heading } from '../../components/Heading';

/**
 * Handles rendering of heading blocks.
 */
export function render(block: HeadingType, index: number): JSX.Element {
  return (
    <Heading
      key={index}
      text={block.text}
      level={block.level}
    />
  );
}
