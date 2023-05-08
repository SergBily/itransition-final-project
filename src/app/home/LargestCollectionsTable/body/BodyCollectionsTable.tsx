import React, { useState } from 'react';
import {
  Box, Skeleton, TableBody, TableCell, TableRow,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import classNames from 'classnames';
import { routes } from '../../../../shared';
import { CollectionResponse } from '../../../../shared/models';
import styles from './styles.module.scss';

interface BodyCollectionsTableProps {
  mainPageCollection: CollectionResponse[];
}

const BodyCollectionsTable: React.FC<BodyCollectionsTableProps> = ({
  mainPageCollection,
}): JSX.Element => {
  const [loadedImage, setLoadedImage] = useState<boolean>(false);

  const handleLoadImage = () => {
    setLoadedImage(true);
  };

  return (
    <TableBody className={classNames(styles.tableBody, 'table__body')}>
      {mainPageCollection && mainPageCollection.map((row) => (
        <TableRow hover key={row.id} className={styles.blockLink}>
          <TableCell align="right">
            {!loadedImage
              && (
                <Skeleton
                  width={170}
                  height={75}
                />
              )}
            <Box
              component="img"
              src={row.imageUrl}
              width={loadedImage ? 170 : 0}
              height={loadedImage ? 90 : 0}
              onLoad={handleLoadImage}
            />
          </TableCell>
          <TableCell scope="row">
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
              to={routes.COLLECTION_READ(row.id)}
              className={styles.link}
            />
          </Box>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default BodyCollectionsTable;
