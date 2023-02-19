import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import Collection from '../collection/Collection';
import CollectionCreator from '../collectionCreator/CollectionCreator';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/hooks';
import { reset } from '../../../../redux/features/newCollectionSlice';
import localStorageKeys from '../../../../shared/constants/localStorageKeys';
import AllCollectionsResponse from '../../../../shared/models/allCollections/allCollectionsResponse';
import { getAllCollection } from '../../../../redux/features/allCollectionSlice';
import { selectAllCollections } from '../../../../redux/selectors/allCollectionSelectors';

const CollectionTable = () => {
  const [collections, setCollections] = useState<AllCollectionsResponse[]>();
  const allCollections = useAppSelector(selectAllCollections);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCollection(localStorage.getItem(localStorageKeys.USERId) as string));
    dispatch(reset());
  }, []);

  useEffect(() => {
    setCollections(allCollections);
  }, [allCollections]);

  return (
    <Grid container className={styles.root}>
      <Grid item>
        <CollectionCreator />
      </Grid>
      {collections && collections.map((collection) => (
        <Grid item key={collection.id}>
          <Collection payload={collection} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CollectionTable;
