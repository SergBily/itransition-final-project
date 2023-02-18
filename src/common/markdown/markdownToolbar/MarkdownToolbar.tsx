import {
  Box, Tooltip, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import LinkIcon from '@mui/icons-material/Link';
import CodeIcon from '@mui/icons-material/Code';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { FormattedMessage } from 'react-intl';
import { UseFormSetValue } from 'react-hook-form';
import insertMarkup from '../../../shared/utils/insertMarkdownSymbol';
import styles from './styles.module.scss';
import MarkdownToolbarMobile from './MarkdownToolbarMobile';
import screenSize from '../../../shared/constants/screenSize';
import CollectionStructure from '../../../shared/models/newCollection/collectionStructure.model';

const icons = [
  { name: <Typography variant="h6" className={styles.icon}>H</Typography>, type: 'heading' },
  { name: <FormatBoldIcon className={styles.icon} />, type: 'bold' },
  { name: <FormatItalicIcon className={styles.icon} />, type: 'italic' },
  { name: <CodeIcon className={styles.icon} />, type: 'code' },
  { name: <LinkIcon className={styles.icon} />, type: 'link' },
  { name: <FormatListBulletedIcon className={styles.icon} />, type: 'bullet' },
  { name: <FormatListNumberedIcon className={styles.icon} />, type: 'number' },
  { name: <PlaylistAddCheckIcon className={styles.icon} />, type: 'task' },
];

interface MarkdownToolbarProps {
  setValueTextArea: UseFormSetValue<CollectionStructure>,
  setChoosedList: (a: string) => void
}

const MarkdownToolbar = ({ setValueTextArea, setChoosedList }: MarkdownToolbarProps) => {
  const [widthSize, setWidthSize] = useState<number>(screenSize.INITIAL);
  const onInsetSymbol = (e: React.MouseEvent) => {
    const action = (e.currentTarget as HTMLButtonElement).dataset.type as string;
    setChoosedList(action);
    setValueTextArea('description', insertMarkup('description__textarea', action));
  };
  const reportWindowSize = () => {
    setWidthSize(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', reportWindowSize);
    return () => window.removeEventListener('resize', reportWindowSize);
  }, []);

  return (
    <Box
      component="div"
      className={styles.wrapper}
    >
      {widthSize < screenSize[900] ? (
        <MarkdownToolbarMobile icons={icons} onInsetSymbol={onInsetSymbol} />
      )
        : (
          <Box
            component="div"
            className={styles.root}
          >
            {icons.map((i) => (
              <Tooltip
                title={<FormattedMessage id={`app.collection.markdown.${i.type}`} />}
                key={i.type}
              >
                <Box
                  component="button"
                  type="button"
                  className={styles.button}
                  data-type={i.type}
                  onClick={onInsetSymbol}
                >
                  {i.name}
                </Box>
              </Tooltip>
            ))}
          </Box>
        )}
    </Box>
  );
};

export default MarkdownToolbar;
