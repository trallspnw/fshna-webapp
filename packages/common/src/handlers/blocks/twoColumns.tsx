import { JSX } from 'react';
import { General, TwoColumns as TwoColumnsType } from '@common/types/payload-types';
import { TwoColumns } from '../../components/TwoColumns';
import { renderBlocks } from '../../lib/blockUtil';
import { Fetchers } from '../../fetchers/fetcher';

export function render(block: TwoColumnsType, index: number, fetchers: Fetchers, generalGlobals: General): JSX.Element {
  return (
    <TwoColumns
      key={index}
      columnRatio={block.columnRatio ?? undefined}
      left={renderBlocks(block.leftColumn ?? [], fetchers, generalGlobals)}
      right={renderBlocks(block.rightColumn ?? [], fetchers, generalGlobals)}
    />
  );
}
