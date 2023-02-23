import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Paper, Typography,
} from '@mui/material';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import Filter4Icon from '@mui/icons-material/Filter4';
import Filter5Icon from '@mui/icons-material/Filter5';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  selectCollection, selectErrorMessage, selectErrors, selectStatus,
} from '../../../../redux/selectors/newCollectionSelectors';
import CollectionFormField from '../collectionFormField/CollectionFormField ';
import MarkdownForm from '../../../../common/markdown/markdownForm/MarkdownForm';
import Dropzone from '../../../../common/dropzone/Dropzone';
import DropImage from '../../../../shared/models/newCollection/imageFile.model';
import ListCustomFields from '../../../../common/customFields/ListCustomFields';
import CustomFields from '../../../../shared/models/newCollection/customFields.model';
import TopicField from '../topicField/TopicField';
import styles from './styles.module.scss';
import routes from '../../../../shared/constants/routes';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/hooks';
import CollectionRequest from '../../../../shared/models/newCollection/collectionRequest';
import { createCollection, reset } from '../../../../redux/features/newCollectionSlice';
import Spinner from '../../../../common/spinner/Spinner';
import toastConfig from '../../../../shared/toast/toastConfig';
import { selectUser } from '../../../../redux/selectors/authSelectors';
import FormButtonGroup from '../../../../common/formButtonGroup/FormButtonGroup';
import TitleField from '../../../collection/creation/titleField/TitleField';

const fields: CustomFields = {
  number: [],
  string: [],
  textarea: [],
  date: [],
  checkbox: [],
};

const NewCollection = () => {
  const {
    register, handleSubmit, watch, setValue, formState: { errors },
  } = useForm<Record<string, string>>();
  const [selectedImage, setSelectedImage] = useState<DropImage | null>(null);
  const [customItemFields, setCustomItemFields] = useState<CustomFields>(fields);
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const errorMessage = useAppSelector(selectErrorMessage);
  const collection = useAppSelector(selectCollection);
  const error = useAppSelector(selectErrors);
  const { userId } = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'success') {
      toast.success(<FormattedMessage
        id="app.collection.response.success"
        values={{ title: collection?.title }}
      />, toastConfig);
      navigate(routes.COLLECTIONS);
      dispatch(reset());
    }
  }, [status]);

  const onFormSubmit = async (data: any): Promise<void> => {
    const collectionData: CollectionRequest = {
      ...data,
      image: selectedImage,
      customFields: customItemFields,
      userId,
    };
    dispatch(createCollection(collectionData));
    setSelectedImage(null);
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
            <TopicField register={register} errors={errors} />
          </CollectionFormField>
          <CollectionFormField label="title" Icon={Filter2Icon}>
            <TitleField payload={{
              value: '', errors, error, errorMessage, register,
            }}
            />
          </CollectionFormField>
          <CollectionFormField label="description" Icon={Filter3Icon}>
            <MarkdownForm
              payload={{
                label: 'description', value: '', register, watch, setValue,
              }}
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
            <FormButtonGroup type="collection" />
          </Box>
        </form>
      </Grid>
      {status === 'loading' && <Spinner />}
    </Paper>
  );
};

export default NewCollection;
