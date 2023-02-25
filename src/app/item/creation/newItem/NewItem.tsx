import React, { useEffect } from 'react';
import {
  Checkbox, Paper, Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import MarkdownForm from '../../../../common/markdown/markdownForm/MarkdownForm';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/hooks';
import ItemFormField from '../../form/itemFormField/ItemFormField';
import StringField from '../../fields/stringField/StringField';
import NumberField from '../../fields/numberField/NumberField';
import DateField from '../../fields/dateField/DateField';
import generateKey from '../../../../shared/utils/UniqueKey';
import { } from '../../../../redux/selectors/authSelectors';
import ItemForm from '../../form/itemForm/ItemForm';
import { getItemsCollection } from '../../../../redux/features/ItemsCollectionSlice';
import checkTitleIsNan from '../../../../shared/utils/checkTitleIsNan';

const createField = (label: string, size: string, children: JSX.Element): JSX.Element => (
  <ItemFormField payload={{ label, size }} key={generateKey()}>
    {children}
  </ItemFormField>
);

const NewItem = () => {
  const {
    register, handleSubmit, getValues, setValue, formState: { errors },
  } = useForm<Record<string, string>>();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { collection } = useAppSelector((state) => state.items);

  useEffect(() => {
    dispatch(getItemsCollection(id as string));
  }, []);

  const getCustomFields = (): JSX.Element[] => {
    let res: JSX.Element[] = [];
    if (collection) {
      const fields = Object.entries(collection.customFields).map(
        (e) => e[1].map((v: string) => {
          let m: JSX.Element;
          switch (e[0]) {
            case 'string':
              m = (
                createField(
                  v,
                  '',
                  <StringField payload={{ key: v, register }} />,
                )
              );
              break;
            case 'number':
              m = (
                createField(
                  v,
                  '',
                  <NumberField payload={{ key: v, register }} />,
                )
              );
              break;
            case 'textarea':
              m = (
                createField(
                  v,
                  'full',
                  <MarkdownForm payload={{
                    label: v, register, getValues, setValue,
                  }}
                  />,
                )
              );
              break;
            case 'date':
              m = (
                createField(
                  v,
                  '',
                  <DateField payload={{ key: v, register }} />,
                )
              );
              break;
            default:
              m = (
                createField(
                  v,
                  '',
                  <Checkbox {...register(`customFields.checkbox.${checkTitleIsNan(v)}`)} />,
                )
              );
              break;
          }
          return m;
        }),
      );
      res = [...res, ...fields.flat()];
    }
    return res;
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
        <FormattedMessage id="app.item.creator.header" />
      </Typography>
      <ItemForm
        getCustomFields={getCustomFields}
        handleSubmit={handleSubmit}
        errors={errors}
        id={id as string}
        register={register}
      />
    </Paper>
  );
};

export default NewItem;
