import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import classNames from 'classnames';
import Collection from '../collection/Collection';
import CollectionCreator from '../collectionCreator/CollectionCreator';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/hooks';
import { reset } from '../../../../redux/features/newCollectionSlice';
import AllCollectionsResponse from '../../../../shared/models/allCollections/allCollectionsResponse';
import { getAllCollection } from '../../../../redux/features/allCollectionSlice';
import { selectAllCollections, selectStatus } from '../../../../redux/selectors/allCollectionSelectors';
import { selectUser } from '../../../../redux/selectors/authSelectors';
import Spinner from '../../../../common/spinner/Spinner';

const CollectionTable = () => {
  const [collections, setCollections] = useState<AllCollectionsResponse[]>();
  const allCollections = useAppSelector(selectAllCollections);
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector(selectUser);
  const status = useAppSelector(selectStatus);
  useEffect(() => {
    dispatch(getAllCollection(userId));
    dispatch(reset());
    gsap.to(
      '.animationCollections',
      { transform: 'translate(0,0)', duration: 0.3, ease: 'power1.inOut' },
    );
  }, []);

  useEffect(() => {
    setCollections(allCollections);
  }, [allCollections]);

  return (
    <>
      <Grid container className={classNames(styles.root, 'animationCollections')}>
        <Grid item>
          <CollectionCreator />
        </Grid>
        {collections && collections.map((collection) => (
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
