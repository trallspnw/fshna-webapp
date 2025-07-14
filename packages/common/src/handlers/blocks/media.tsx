import { JSX } from 'react';
import { MediaBlock } from '@common/types/payload-types';
import { Media } from '../../components/Media';
import { normalizeMedia } from '../../lib/mediaUtil';

export function render(block: MediaBlock, index: number): JSX.Element {
  return (
    <Media
      key={index}
      media={normalizeMedia(block.media)}
      radius={true}
    />
  );
}
