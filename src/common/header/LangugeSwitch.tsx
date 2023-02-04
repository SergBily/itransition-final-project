import React, { useContext, useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import GlobalContext from '../../shared/contexts/GlobalContext';

const LanguageSwitch = () => {
  const { currentLocale, setCurrentLocale } = useContext(GlobalContext);
  const [alignment, setAlignment] = useState(currentLocale);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setCurrentLocale?.(newAlignment);
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="secondary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="ru">Ru</ToggleButton>
      <ToggleButton value="en">En</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageSwitch;
