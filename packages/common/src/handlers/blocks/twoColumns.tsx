import { JSX } from 'react';
import { TwoColumns as TwoColumnsType } from '@common/types/payload-types';
import { TwoColumns } from '../../components/TwoColumns';
import { renderBlocks } from '../../lib/blockUtil';
import { Fetchers } from '../../fetchers/fetcher';

export function render(block: TwoColumnsType, index: number, fetchers: Fetchers): JSX.Element {
  return (
    <TwoColumns
      key={index}
      columnRatio={block.columnRatio ?? undefined}
      left={renderBlocks(block.leftColumn ?? [], fetchers)}
      right={renderBlocks(block.rightColumn ?? [], fetchers)}
    />
  );
}
