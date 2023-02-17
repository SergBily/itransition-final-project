import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, MenuItem, Tooltip } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import styles from './styles.module.scss';

type Icons = {
  name: React.ReactNode,
  type: string
};

const ITEM_HEIGHT = 48;

interface MarkdownToolbarMobileProps {
  icons: Icons[],
  onInsetSymbol: (e: React.MouseEvent) => void
}

const MarkdownToolbarMobile = ({ icons, onInsetSymbol }: MarkdownToolbarMobileProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '10ch',
          },
        }}
      >
        {icons.map((i) => (
          <MenuItem key={i.type} onClick={handleClose}>
            <Tooltip
              title={<FormattedMessage id={`app.collection.markdown.${i.type}`} />}
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
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default MarkdownToolbarMobile;
