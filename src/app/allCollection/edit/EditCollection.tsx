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
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';
import CollectionFormField from '../creation/collectionFormField/CollectionFormField ';
import TopicField from '../creation/topicField/TopicField';
import TitleField from '../../item/fields/titleField/TitleField';
import MarkdownForm from '../../../common/markdown/markdownForm/MarkdownForm';
import Dropzone from '../../../common/dropzone/Dropzone';
import ListCustomFields from '../../../common/customFields/ListCustomFields';
import FormButtonGroup from '../../../common/formButtonGroup/FormButtonGroup';
import Spinner from '../../../common/spinner/Spinner';
import DropImage from '../../../shared/models/newCollection/imageFile.model';
import CustomFields from '../../../shared/models/newCollection/customFields.model';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { selectUser } from '../../../redux/selectors/authSelectors';
import CollectionRequest from '../../../shared/models/newCollection/collectionRequest.model';
import DataForm from '../../../shared/models/allCollections/dataForm.type';
import { getCollection } from '../../../redux/features/collectionSlice';
import { editCollection, editReset } from '../../../redux/features/editCollectionSlice';
import toastConfig from '../../../shared/toast/toastConfig';
import routes from '../../../shared/constants/routes';
import getManager from '../../../shared/utils/getManager';
import ControlMode from '../../../common/controlMode/ControlMode';

const fields: CustomFields = {
  number: [],
  string: [],
  textarea: [],
  date: [],
  checkbox: [],
};

const EditCollection = () => {
  const {
    register, handleSubmit, getValues, setValue, watch, formState: { errors },
  } = useForm<Record<string, string>>();
  const [selectedImage, setSelectedImage] = useState<DropImage | null>(null);
  const [customItemFields, setCustomItemFields] = useState<CustomFields>(fields);
  const [fieldsCollection, setfieldsCollection] = useState<string[] | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector(selectUser);
  const { id, manageId } = useParams();

  const {
    errors: errorsBD, errorMessage, editStatus,
  } = useAppSelector((store) => store.editCollection);
  const {
    status: getCollectionStatus, collection,
  } = useAppSelector((store) => store.collection);

  useEffect(() => {
    dispatch(getCollection(id as string));
  }, []);

  useEffect(() => {
    if (getCollectionStatus === 'success') {
      setValue('title', collection?.title as string);
      setValue('descriptionCollection', collection?.description as string);
      setValue('topic', collection?.topic as string);
      setCustomItemFields({ ...collection?.customFields as CustomFields });
      setfieldsCollection(collection?.customFields
        ? Object.values(collection?.customFields as CustomFields).flat() : []);
    }
  }, [getCollectionStatus]);

  useEffect(() => {
    if (editStatus === 'success') {
      toast.success(<FormattedMessage
        id="app.item.response.success"
        values={{ title: collection?.title }}
      />, toastConfig);
      navigate(manageId ? `${routes.COLLECTIONS}/${manageId}` : routes.COLLECTIONS);
    }
    dispatch(editReset());
  }, [editStatus]);

  const onFormSubmit = (data: Record<string, string>): void => {
    const newData: Record<string, string> = { ...data, description: data.descriptionCollection };
    delete newData.descriptionCollection;
    const collectionData: CollectionRequest = {
      ...newData as DataForm,
      image: selectedImage ?? collection?.imageUrl as string,
      customFields: customItemFields as CustomFields,
      userId: getManager(manageId, userId),
    };
    dispatch(editCollection({ payload: collectionData, id: id as string }));
  };

  return (
    <>
      <Paper
        elevation={5}
        className={styles.wrapper}
      >
        <Typography
          variant="h3"
          className={styles.title}
        >
          <FormattedMessage id="app.collection.edit.title" />
        </Typography>
        <Grid container>
          <form
            onSubmit={handleSubmit(onFormSubmit)}
            className={styles.form}
          >
            <CollectionFormField label="topic" Icon={Filter1Icon}>
              <TopicField register={register} errors={errors} watch={watch} />
            </CollectionFormField>
            <CollectionFormField label="title" Icon={Filter2Icon}>
              <TitleField payload={{
                value: '', errors, errorsBD, errorMessage, register,
              }}
              />
            </CollectionFormField>
            <CollectionFormField label="description" Icon={Filter3Icon}>
              <MarkdownForm
                payload={{
                  label: 'descriptionCollection', value: '', register, getValues, setValue,
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
              {fieldsCollection
              && <ListCustomFields setCustomItemFields={setCustomItemFields} fields={fieldsCollection} />}
            </CollectionFormField>
            <Box
              component="div"
              className={styles.buttonsBlock}
            >
              <FormButtonGroup type="collection2" id="" manageId={manageId} />
            </Box>
          </form>
        </Grid>
        {editStatus === 'loading' && <Spinner />}
      </Paper>
      {manageId && (<ControlMode />)}
    </>
  );
};

export default EditCollection;
