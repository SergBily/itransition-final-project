import React, { useEffect } from 'react';
import {
  Table, TableContainer, Paper, Box,
} from '@mui/material';
import classNames from 'classnames';
import gsap from 'gsap';
import {
  animationConfig, homeApi, refetchOptionsApi, skeletonHeightRows,
} from '../../../../shared';
import HeadCollectionsTable from '../head/HeadCollectionsTable';
import BodyCollectionsTable from '../body/BodyCollectionsTable';
import { SkeletonTable } from '../../../../common';
import styles from './styles.module.scss';

const CollectionsTable = () => {
  const { data: mainPageCollection } = homeApi.useLargestCollectionQuery(
    undefined,
    refetchOptionsApi,
  );

  useEffect(() => {
    gsap.to(
      '.animationTable',
      animationConfig.ANIMATION_HOME_TABLE,
    );
  }, []);

  return (
    <Box component="div" className={classNames(styles.root, 'animationTable')}>
      <TableContainer component={Paper}>
        {mainPageCollection ? (
          <Table className={styles.table} aria-label="caption table">
            <HeadCollectionsTable />
            <BodyCollectionsTable
              mainPageCollection={mainPageCollection}
            />
          </Table>
        )
          : (
            <SkeletonTable heightRows={skeletonHeightRows.LARGEST_COLLECTION} />
          )}
      </TableContainer>
    </Box>
  );
};

export default CollectionsTable;
