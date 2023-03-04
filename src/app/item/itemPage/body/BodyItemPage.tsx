import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import gsap from 'gsap';
import ItemStructure from '../../../../shared/models/items/itemStructure.model';
import generateKey from '../../../../shared/utils/UniqueKey';
import styles from './styles.module.scss';

interface BodyItemPagePrors {
  item: ItemStructure
}

const createElement = (
  field: [string, unknown],
  nameStyle: string,
  message?: JSX.Element,
): JSX.Element => (
  <Box
    component="div"
    className={styles.boxCustomFields}
    key={generateKey()}
  >
    <Typography
      variant="h5"
      className={classNames(styles[nameStyle], nameStyle)}
    >
      {field[0]}
    </Typography>
    <Box
      className={styles.text}
      component="div"
    >
      {message || (
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {field[1] as string}
      </ReactMarkdown>
      )}
    </Box>
  </Box>
);

const customFieldslayout = (item: ItemStructure): JSX.Element[] => {
  const elementsJsx = Object.entries(item.customFields)
    .map((field) => Object.entries(field[1])
      .map((v) => {
        let m: JSX.Element;
        switch (field[0]) {
          case 'string':
            m = createElement(v, 'string');
            break;
          case 'number':
            m = createElement(v, 'number');
            break;
          case 'textarea':
            m = createElement(v, 'textarea');
            break;
          case 'date':
            m = createElement(v, 'date');
            break;
          default:
            m = createElement(
              v,
              'checkbox',
              v[1] ? <FormattedMessage id="app.item.custom.fields.checkbox" />
                : <FormattedMessage id="app.item.custom.fields.checkbox1" />,
            );
            break;
        }
        return m;
      }));
  return elementsJsx.flat();
};

const BodyItemPage = ({ item }: BodyItemPagePrors) => {
  useEffect(() => {
    gsap.to('.styles_root__90aPB', {
      y: '-250px', opacity: 1, duration: 0.9, ease: 'circ',
    });
  });

  return (
    <Box className={styles.root}>
      {customFieldslayout(item).map((e) => e)}
    </Box>
  );
};

export default BodyItemPage;
