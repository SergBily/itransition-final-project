import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import gsap from 'gsap';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import Collection from '../collection/Collection';
import CollectionCreator from '../collectionCreator/CollectionCreator';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/hooks';
import { allCollectionReset, getAllCollection } from '../../../../redux/features/allCollectionSlice';
import { selectUser } from '../../../../redux/selectors/authSelectors';
import Spinner from '../../../../common/spinner/Spinner';
import getManager from '../../../../shared/utils/getManager';
import ControlMode from '../../../../common/controlMode/ControlMode';

const CollectionTable = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { userId } = useAppSelector(selectUser);
  const { status, allCollections } = useAppSelector(((state) => state.collections));

  useEffect(() => {
    dispatch(getAllCollection(getManager(id, userId)));
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
          <CollectionCreator id={id} />
        </Grid>
        {allCollections && allCollections.map((collection) => (
          <Grid item key={collection.id}>
            <Collection payload={collection} manageId={id} />
          </Grid>
        ))}
      </Grid>
      {id && (<ControlMode />)}
      {status === 'loading' && <Spinner />}
    </>
  );
};

export default CollectionTable;
