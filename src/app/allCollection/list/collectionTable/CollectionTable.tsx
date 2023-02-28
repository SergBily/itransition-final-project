import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import gsap from 'gsap';
import classNames from 'classnames';
import Collection from '../collection/Collection';
import CollectionCreator from '../collectionCreator/CollectionCreator';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/hooks';
import { allCollectionReset, getAllCollection } from '../../../../redux/features/allCollectionSlice';
import { selectUser } from '../../../../redux/selectors/authSelectors';
import Spinner from '../../../../common/spinner/Spinner';

const CollectionTable = () => {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector(selectUser);
  const { status, allCollections } = useAppSelector(((state) => state.collections));

  useEffect(() => {
    dispatch(getAllCollection(userId));

    gsap.to(
      '.animationCollections',
      {
        x: '100%', opacity: 1, duration: 0.9, ease: 'circ',
      },
    );
  }, []);

  useEffect(() => {
    if (status === 'success' || status === 'failed') {
      dispatch(allCollectionReset());
    }
  }, [status]);

  return (
    <>
      <Grid container className={classNames(styles.root, 'animationCollections')}>
        <Grid item>
          <CollectionCreator />
        </Grid>
        {allCollections && allCollections.map((collection) => (
          <Grid item key={collection.id}>
            <Collection payload={collection} />
          </Grid>
        ))}
      </Grid>
      {status === 'loading' && <Spinner />}
    </>
  );
};

export default CollectionTable;
