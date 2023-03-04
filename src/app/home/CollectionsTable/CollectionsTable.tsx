import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box/Box';
import { Skeleton, TableHead } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import gsap from 'gsap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  allCollectionReset,
  getLargestCollections,
} from '../../../redux/features/allCollectionSlice';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import styles from './styles.module.scss';
import routes from '../../../shared/constants/routes';

const CollectionsTable = () => {
  const dispatch = useAppDispatch();
  const {
    mainPageCollection, status,
  } = useAppSelector((store) => store.collections);

  useEffect(() => {
    dispatch(getLargestCollections());
  }, []);

  useEffect(() => {
    if (status === 'success') {
      const animation = gsap.timeline();
      animation.to('.table__root', {
        height: 'auto', opacity: 1, duration: 1, ease: 'circ',
      });
    }
    dispatch(allCollectionReset());
  }, [status]);

  return (
    <TableContainer component={Paper} className={classNames(styles.root, 'table__root')}>
      <Table className={styles.table} aria-label="caption table">
        <TableHead>
          <TableRow className={styles.tableHead}>
            <TableCell className={styles.tableHeadCell}>
              <FormattedMessage id="app.collection.new.field.image" />
            </TableCell>
            <TableCell align="right" className={styles.tableHeadCell}>
              <FormattedMessage id="app.collection.new.field.topic" />
            </TableCell>
            <TableCell align="right" className={styles.tableHeadCell}>
              <FormattedMessage id="app.collection.new.field.title" />
            </TableCell>
            <TableCell align="right" className={styles.tableHeadCell}>
              <FormattedMessage id="app.collection.new.field.description" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classNames(styles.tableBody, 'table__body')}>
          {mainPageCollection && mainPageCollection.map((row) => (
            <TableRow key={row.id} className={styles.blockLink}>
              <TableCell align="right">
                {status === 'loading'
                  ? (
                    <Skeleton
                      width={170}
                      height={90}
                    />
                  )
                  : (
                    <Box
                      component="img"
                      src={row.imageUrl}
                      width={170}
                      height={90}
                    />
                  )}

              </TableCell>
              <TableCell component="th" scope="row">
                {row.topic}
              </TableCell>
              <TableCell align="right">
                {row.title}
              </TableCell>
              <TableCell align="right">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {row.description}
                </ReactMarkdown>
              </TableCell>
              <Box component="td" className={styles.link}>
                <Link
                  to={`${routes.COLLECTION}read/${row.id}`}
                  className={styles.link}
                />
              </Box>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollectionsTable;
