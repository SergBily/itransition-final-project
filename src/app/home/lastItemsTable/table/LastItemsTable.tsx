import React, { useEffect, useState } from 'react';
import {
  Table, TableContainer,
  Paper, Box,
} from '@mui/material';
import gsap from 'gsap';
import classNames from 'classnames';
import HeadLastItemsTable from '../head/HeadLastItemsTable';
import BodyLastItemsTable from '../body/BodyLastItemsTable';
import {
  animationConfig, homeApi, refetchOptionsApi, skeletonHeightRows,
} from '../../../../shared';
import { FooterTable, SkeletonTable } from '../../../../common';
import styles from './styles.module.scss';

const LastItemsTable: React.FC = (): JSX.Element => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const { data: lastItems } = homeApi.useLastItemsQuery(
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
        {lastItems ? (
          <Table className={styles.table} aria-label="custom pagination table">
            <HeadLastItemsTable />
            <BodyLastItemsTable
              lastItems={lastItems}
              page={page}
              rowsPerPage={rowsPerPage}
            />
            <FooterTable
              page={page}
              rowsPerPage={rowsPerPage}
              setPage={setPage}
              setRowsPerPage={setRowsPerPage}
            />
          </Table>
        )
          : (
            <SkeletonTable heightRows={skeletonHeightRows.LAST_ITEMS} />
          )}

      </TableContainer>
    </Box>
  );
};

export default LastItemsTable;
