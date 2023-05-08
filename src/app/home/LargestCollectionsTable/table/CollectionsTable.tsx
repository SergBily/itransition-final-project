import React from 'react';
import {
  Table, TableContainer, Paper, Skeleton,
} from '@mui/material';
import { collectionApi } from '../../../../shared';
import HeadCollectionsTable from '../head/HeadCollectionsTable';
import BodyCollectionsTable from '../body/BodyCollectionsTable';
import styles from './styles.module.scss';

const countRowsSkeleton: number[] = [1, 2, 3, 4, 5];

const CollectionsTable = () => {
  const { data: mainPageCollection } = collectionApi.useLargestCollectionQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );

  return (
    <TableContainer component={Paper} className={styles.root}>
      {mainPageCollection ? (
        <Table className={styles.table} aria-label="caption table">
          <HeadCollectionsTable />
          <BodyCollectionsTable
            mainPageCollection={mainPageCollection}
          />
        </Table>
      )
        : (
          <>
            <Skeleton animation="wave" height={50} />
            {countRowsSkeleton.map((n) => (
              <Skeleton key={n} animation="wave" height={128} />
            ))}
          </>
        )}
    </TableContainer>
  );
};

export default CollectionsTable;
