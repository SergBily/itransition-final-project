import { Box, Tooltip, Typography } from '@mui/material';
import React from 'react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import LinkIcon from '@mui/icons-material/Link';
import CodeIcon from '@mui/icons-material/Code';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { FormattedMessage } from 'react-intl';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import insertMarkup from '../../shared/utils/insertMarkdownSymbol';
// import insertMarkup from '../../shared/utils/insertMarkdownSymbol';

const buttonStyle = {
  width: 28,
  height: 31,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  border: 0,
};

const buttonHover = {
  '&:hover': { color: 'blue' },
  cursor: 'pointer',
  backgroundColor: 'transparent',
};

interface MarkdownToolbarProps {
  setValueTextArea: UseFormSetValue<FieldValues>,
  setChoosedList: (a: string) => void
}

const MarkdownToolbar = ({ setValueTextArea, setChoosedList }:MarkdownToolbarProps) => {
  const onInsetSymbol = (e: React.MouseEvent) => {
    const action = (e.currentTarget as HTMLButtonElement).dataset.type as string;
    setChoosedList(action);
    setValueTextArea('description', insertMarkup('description__textarea', action));
  };

  return (
    <Box
      component="div"
      sx={{
        alignSelf: 'center', display: 'flex', ml: 'auto', gap: 2,
      }}
    >
      <Box component="div" sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title={<FormattedMessage id="app.collection.markdown.toolbar" />}>
          <Box component="button" sx={buttonStyle} data-type="heading" onClick={onInsetSymbol}>
            <Typography variant="h6" color="initial" sx={buttonHover}>H</Typography>
          </Box>
        </Tooltip>
        <Tooltip title={<FormattedMessage id="app.collection.markdown.toolbar2" />}>
          <Box component="button" sx={buttonStyle} data-type="bold" onClick={onInsetSymbol}>
            <FormatBoldIcon sx={buttonHover} />
          </Box>
        </Tooltip>
        <Tooltip title={<FormattedMessage id="app.collection.markdown.toolbar3" />}>
          <Box component="button" sx={buttonStyle} data-type="italic" onClick={onInsetSymbol}>
            <FormatItalicIcon sx={buttonHover} />
          </Box>
        </Tooltip>
      </Box>
      <Box component="div" sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title={<FormattedMessage id="app.collection.markdown.toolbar4" />}>
          <Box component="button" sx={buttonStyle} data-type="code" onClick={onInsetSymbol}>
            <CodeIcon sx={buttonHover} />
          </Box>
        </Tooltip>
        <Tooltip title={<FormattedMessage id="app.collection.markdown.toolbar5" />}>
          <Box component="button" sx={buttonStyle} data-type="link" onClick={onInsetSymbol}>
            <LinkIcon sx={buttonHover} />
          </Box>
        </Tooltip>
      </Box>
      <Box component="div" sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title={<FormattedMessage id="app.collection.markdown.toolbar6" />}>
          <Box component="button" sx={buttonStyle} data-type="bullet" onClick={onInsetSymbol}>
            <FormatListBulletedIcon sx={buttonHover} />
          </Box>
        </Tooltip>
        <Tooltip title={<FormattedMessage id="app.collection.markdown.toolbar7" />}>
          <Box component="button" sx={buttonStyle} data-type="number" onClick={onInsetSymbol}>
            <FormatListNumberedIcon sx={buttonHover} />
          </Box>
        </Tooltip>
        <Tooltip title={<FormattedMessage id="app.collection.markdown.toolbar8" />}>
          <Box component="button" sx={buttonStyle} data-type="task" onClick={onInsetSymbol}>
            <PlaylistAddCheckIcon sx={buttonHover} />
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default MarkdownToolbar;
