import Grid from '@mui/material/Grid';
import React from 'react';
import generateKey from '../../../shared/utils/UniqueKey';
import Collection from './Collection';
import image from '../../../assets/images/test.png';
import CollectionCreator from './CollectionCreator';

const testCollection = [
  {
    image,
    topic: 'Books',
    title: 'Lizard',
    description: `Mongoose also supports setting timestamps on subdocuments. 
    Keep in mind that createdAt and updatedAt for subdocuments represent`,
  },
  {
    image,
    topic: 'Alcohole',
    title: 'Wiski',
    description: `Mongoose also supports setting timestamps on subdocuments. 
    Keep in mind that createdAt and updatedAt for subdocuments represent
    Mongoose also supports setting timestamps on subdocuments. 
    Keep in mind that createdAt and updatedAt for subdocuments represent`,
  },
  {
    image,
    topic: 'Mark',
    title: 'PIlimmkk dkkdiifll',
    description: `Mongoose also supports setting timestamps on subdocuments. 
    Keep in mind that createdAt and updatedAt for subdocuments represent
    Mongoose also supports setting timestamps on subdocuments. 
    Keep in mind that createdAt and updatedAt for subdocuments represent
    Mongoose also supports setting timestamps on subdocuments. 
    Keep in mind that createdAt and updatedAt for subdocuments represent`,
  },
  {
    image,
    topic: 'Boots',
    title: 'Lizard quntty',
    description: `Mongoose also supports setting timestamps on subdocuments. 
    Keep in mind that createdAt and updatedAt for subdocuments represent
    Mongoose also supports setting timestamps on subdocuments. 
    Keep in mind that createdAt and updatedAt for subdocuments represent
    Mongoose also supports setting timestamps on subdocuments. 
    Keep in mind that createdAt and updatedAt for subdocuments represent
    Mongoose also supports setting timestamps on subdocuments. 
    Keep in mind that createdAt and updatedAt for subdocuments represent
    `,
  },
];

const CollectionTable = () => {
  console.log(1);

  return (
    <Grid container sx={{ gap: 2, justifyContent: 'center', mt: 4 }}>
      <Grid item>
        <CollectionCreator />
      </Grid>
      {testCollection.map((colection) => (
        <Grid item key={generateKey()}>
          <Collection payload={colection} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CollectionTable;
