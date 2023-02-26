import React, { useEffect, useState } from 'react';
import {
  Box,
  Checkbox, Grid, Paper, Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import MarkdownForm from '../../../../common/markdown/markdownForm/MarkdownForm';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/hooks';
import ItemFormField from '../../form/itemFormField/ItemFormField';
import StringField from '../../fields/stringField/StringField';
import NumberField from '../../fields/numberField/NumberField';
import DateField from '../../fields/dateField/DateField';
import generateKey from '../../../../shared/utils/UniqueKey';
import { getItem, itemsCollectionReset } from '../../../../redux/features/ItemsCollectionSlice';
import ItemStructure from '../../../../shared/models/items/itemStructure.model';
import TitleField from '../../fields/titleField/TitleField';
import TagsField from '../../fields/tagsField/TagsField';
import FormButtonGroup from '../../../../common/formButtonGroup/FormButtonGroup';
import { selectUser } from '../../../../redux/selectors/authSelectors';
import NewItemRequest from '../../../../shared/models/items/newItemRequest.model';
import Spinner from '../../../../common/spinner/Spinner';
import routes from '../../../../shared/constants/routes';
import toastConfig from '../../../../shared/toast/toastConfig';
import { editItem, newItemReset } from '../../../../redux/features/itemSlice';

const createField = (label: string, size: string, children: JSX.Element): JSX.Element => (
  <ItemFormField payload={{ label, size }} key={generateKey()}>
    {children}
  </ItemFormField>
);

const EditItem = () => {
  const {
    register, handleSubmit, getValues, setValue, formState: { errors },
  } = useForm<Record<string, string>>();
  const [tags, setTags] = useState<string[]>([]);
  const [fields, setFields] = useState<JSX.Element[] | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userId } = useAppSelector(selectUser);
  const { itemId, id } = useParams();
  const { getStatus, item, errors: errorsBD } = useAppSelector((state) => state.items);
  const { errorMessage, editStatus } = useAppSelector((state) => state.newItem);

  useEffect(() => {
    dispatch(getItem(itemId as string));
  }, []);

  useEffect(() => {
    if (editStatus === 'success') {
      toast.success(<FormattedMessage
        id="app.item.response.success"
        values={{ title: item?.title }}
      />, toastConfig);
      navigate(`${routes.COLLECTION}${id}`);
    }
    dispatch(newItemReset());
  }, [editStatus]);

  const onFormSubmit = (data: any): void => {
    const itemData: NewItemRequest = {
      ...data,
      tags,
      userId,
      collectionId: id,
    };
    dispatch(editItem({ itemId: itemId as string, payload: itemData }));
  };

  const getCustomFields = (i: ItemStructure): JSX.Element[] => {
    let res: JSX.Element[] = [];
    if (item) {
      const fieldsItem = Object.entries(i.customFields).map((e) => Object.entries(e[1])
        .map((v) => {
          let m: JSX.Element;
          switch (e[0]) {
            case 'string':
              m = (
                createField(
                  v[0],
                  '',
                  <StringField payload={{ key: v[0], value: v[1] as string, register }} />,
                )
              );
              break;
            case 'number':
              m = (
                createField(
                  v[0],
                  '',
                  <NumberField payload={{ key: v[0], value: v[1] as string, register }} />,
                )
              );
              break;
            case 'textarea':
              m = (
                createField(
                  v[0],
                  'full',
                  <MarkdownForm payload={{
                    label: v[0], value: v[1] as string, register, getValues, setValue,
                  }}
                  />,
                )
              );
              break;
            case 'date':
              m = (
                createField(
                  v[0],
                  '',
                  <DateField payload={{ key: v[0], value: v[1] as string, register }} />,
                )
              );
              break;
            default:
              m = (
                createField(
                  v[0],
                  '',
                  <Checkbox
                    checked={v[1] as boolean}
                    {...register(`customFields.checkbox.${v[0]}`)}
                  />,
                )
              );
              break;
          }
          return m;
        }));
      res = [...res, ...fieldsItem.flat()];
    }
    return res;
  };

  useEffect(() => {
    if (getStatus === 'success') {
      setFields(getCustomFields(item as ItemStructure));
      dispatch(itemsCollectionReset());
      setTags(item?.tags as string[]);
      setValue('title', item?.title as string);
    }
    if (errorsBD[0] === 'notFound') {
      toast.warn(<FormattedMessage
        id="app.item.notFound"
      />, toastConfig);
      navigate(`${routes.COLLECTION}${id}`);
    }
  }, [getStatus]);

  return (
    <Paper
      elevation={5}
      className={styles.wrapper}
    >
      <Typography
        variant="h3"
        className={styles.title}
      >
        <FormattedMessage id="app.item.edit" />
      </Typography>
      <Grid container>
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className={styles.form}
        >
          <ItemFormField payload={{ label: 'title', size: '' }}>
            <TitleField payload={{
              value: '', errorsBD, errorMessage, errors, register,
            }}
            />
          </ItemFormField>
          <ItemFormField payload={{ label: 'tags', size: '' }}>
            <TagsField setTags={setTags} tags={tags} />
          </ItemFormField>
          {fields && fields.map((e) => e)}
          <Box
            component="div"
            className={styles.buttonsBlock}
          >
            <FormButtonGroup type="item2" id={id as string} />
          </Box>
        </form>
        {editStatus === 'loading' && <Spinner />}
      </Grid>
    </Paper>
  );
};

export default EditItem;
