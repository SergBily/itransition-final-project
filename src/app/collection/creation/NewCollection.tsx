import React from 'react';
import {
  Button,
  Grid, Paper, TextField,
} from '@mui/material';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import CollectionFormField from './CollectionFormField ';
import MarkdownForm from '../../../common/markdown/MarkdownForm';

const NewCollection = () => {
  const {
    register, handleSubmit, watch, setValue,
  } = useForm();

  const onFormSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Paper elevation={5} sx={{ mt: 3 }}>
      <Grid container>
        <form onSubmit={handleSubmit(onFormSubmit)} style={{ minWidth: '100%' }}>
          <CollectionFormField label="topic" Icon={Filter1Icon}>
            <TextField
              fullWidth
              id="topic"
              type="text"
              {...register('topic')}
            />
          </CollectionFormField>
          <CollectionFormField label="title" Icon={Filter2Icon}>
            <TextField
              fullWidth
              id="title"
              type="text"
              {...register('title')}
            />
          </CollectionFormField>
          <CollectionFormField label="description" Icon={Filter3Icon}>
            <MarkdownForm
              label="description"
              register={register}
              watch={watch}
              setValueTextArea={setValue}
            />
          </CollectionFormField>
          <Grid item xs={2}>
            <Button
              sx={{ mb: 2 }}
              color="info"
              type="submit"
              variant="contained"
              fullWidth
            >
              <FormattedMessage id="app.header.login" />
            </Button>
          </Grid>
        </form>
      </Grid>
    </Paper>
  );
};

export default NewCollection;
