import { Skeleton } from '@mui/material';
import React from 'react';
import styles from './styles.module.scss';

interface SkeletonTableProp {
  heightRows: number;
}

const SkeletonTable: React.FC<SkeletonTableProp> = (
  {
    heightRows,
  },
): JSX.Element => {
  const countRowsSkeleton: number[] = [1, 2, 3, 4, 5];
  return (
    <>
      <Skeleton
        className={styles.title}
        animation="wave"
        height={55}
      />
      {countRowsSkeleton.map((n) => (
        <Skeleton
          className={styles.row}
          key={n}
          animation="wave"
          height={heightRows}
        />
      ))}
    </>
  );
};
export default SkeletonTable;
