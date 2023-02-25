import React from 'react';
import {
  Checkbox, Paper, Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import MarkdownForm from '../../../../common/markdown/markdownForm/MarkdownForm';
import styles from './styles.module.scss';
import { useAppSelector } from '../../../../shared/hooks/hooks';
import ItemFormField from '../../form/itemFormField/ItemFormField';
import StringField from '../../fields/stringField/StringField';
import NumberField from '../../fields/numberField/NumberField';
import DateField from '../../fields/dateField/DateField';
import generateKey from '../../../../shared/utils/UniqueKey';
import { } from '../../../../redux/selectors/authSelectors';
import ItemForm from '../../form/itemForm/ItemForm';

const test = {
  string: { str: 'Blanccc' },
  number: { num1: 12, num2: 15 },
  textarea: { text1: '_HVE_ (Haute Valeur Environnementale)', test2: 'tutu' },
  date: { dat: '2020-11-12' },
  checkbox: { check: true },
};

const createField = (label: string, size: string, children: JSX.Element): JSX.Element => (
  <ItemFormField payload={{ label, size }} key={generateKey()}>
    {children}
  </ItemFormField>
);

const EditItem = () => {
  const {
    register, handleSubmit, getValues, setValue, formState: { errors },
  } = useForm<Record<string, string>>();
  // const dispatch = useAppDispatch();
  const { id } = useParams();
  const { collection } = useAppSelector((state) => state.items);

  console.log(collection);

  const getCustomFields = (): JSX.Element[] => {
    let res: JSX.Element[] = [];
    const fields = Object.entries(test).map((e) => Object.entries(e[1]).map((v) => {
      let m: JSX.Element;
      switch (e[0]) {
        case 'string':
          m = (
            createField(
              v[0],
              '',
              <StringField payload={{ key: v[0], value: v[1], register }} />,
            )
          );
          break;
        case 'number':
          m = (
            createField(
              v[0],
              '',
              <NumberField payload={{ key: v[0], value: v[1], register }} />,
            )
          );
          break;
        case 'textarea':
          m = (
            createField(
              v[0],
              'full',
              <MarkdownForm payload={{
                label: v[0], value: v[1], register, getValues, setValue,
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
              <DateField payload={{ key: v[0], value: v[1], register }} />,
            )
          );
          break;
        default:
          m = (
            createField(
              v[0],
              '',
              <Checkbox {...register(`customFields.checkbox.${v[0]}`)} />,
            )
          );
          break;
      }
      return m;
    }));
    res = [...res, ...fields.flat()];
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

export default EditItem;
