import React, { useContext, useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import GlobalContext from '../../shared/contexts/GlobalContext';

const LanguageSwitch: React.FC = (): JSX.Element => {
  const { currentLocale, setCurrentLocale } = useContext(GlobalContext);
  const [alignment, setAlignment] = useState(currentLocale);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    if (newAlignment) {
      setCurrentLocale?.(newAlignment);
      setAlignment(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      color="secondary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="en" sx={{ width: '48px' }}>En</ToggleButton>
      <ToggleButton value="ru" sx={{ width: '48px' }}>Ru</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageSwitch;
