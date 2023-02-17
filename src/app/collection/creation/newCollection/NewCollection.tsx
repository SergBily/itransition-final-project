import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid, Paper, TextField, Typography,
} from '@mui/material';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import Filter4Icon from '@mui/icons-material/Filter4';
import Filter5Icon from '@mui/icons-material/Filter5';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import CollectionFormField from '../collectionFormField/CollectionFormField ';
import MarkdownForm from '../../../../common/markdown/markdownForm/MarkdownForm';
import Dropzone from '../../../../common/dropzone/Dropzone';
import DropImage from '../../../../shared/models/imageFile.model';
import { uploadImage } from '../../../../shared/apis/firebaseApi';
import ListCustomFields from '../../../../common/customFields/ListCustomFields';
import CustomFields from '../../../../shared/models/customFields.model';
import TopicField from '../topicField/TopicField';
import styles from './styles.module.scss';
import routes from '../../../../shared/constants/routes';

const fields: CustomFields = {
  number: [],
  string: [],
  textarea: [],
  data: [],
  checkbox: [],
};

const NewCollection = () => {
  const {
    register, handleSubmit, watch, setValue,
  } = useForm();
  const [selectedImage, setSelectedImage] = useState<DropImage>();
  const [customItemFields, setCustomItemFields] = useState<CustomFields>(fields);

  const onFormSubmit = async (data: any): Promise<void> => {
    const imageUrl = await uploadImage(selectedImage as DropImage);
    console.log(data);
    const dataOfCollection = { ...data, imageUrl, itemFields: customItemFields };
    console.log(dataOfCollection);
  };

  return (
    <Paper
      elevation={5}
      className={styles.wrapper}
    >
      <Typography
        variant="h3"
        className={styles.title}
      >
        <FormattedMessage id="app.collection.title" />
      </Typography>
      <Grid container>
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className={styles.form}
        >
          <CollectionFormField label="topic" Icon={Filter1Icon}>
            <TopicField register={register} />
          </CollectionFormField>
          <CollectionFormField label="title" Icon={Filter2Icon}>
            <TextField
              className={styles.textField}
              fullWidth
              id="title"
              type="text"
              size="small"
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
          <CollectionFormField label="image" Icon={Filter4Icon}>
            <Dropzone
              setSelectedImage={setSelectedImage}
              selectedImage={selectedImage as DropImage}
            />
          </CollectionFormField>
          <CollectionFormField label="itemFields" Icon={Filter5Icon}>
            <ListCustomFields setCustomItemFields={setCustomItemFields} />
          </CollectionFormField>
          <Box
            component="div"
            className={styles.buttonsBlock}
          >
            <Grid item xs={8} sm={2}>
              <Button
                fullWidth
                color="info"
                type="submit"
                variant="contained"
              >
                <FormattedMessage id="app.collection.button.create" />
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Link
                to={routes.COLLECTIONS}
                className={styles.link}
              >
                <Typography variant="button">
                  <FormattedMessage id="app.collection.button.cancel" />
                </Typography>
              </Link>
            </Grid>
          </Box>
        </form>
      </Grid>
    </Paper>
  );
};

export default NewCollection;
