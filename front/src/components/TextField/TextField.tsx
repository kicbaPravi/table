import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import searchIcon from '../../assets/icons/search_Icon.svg';
import Box from '@mui/material/Box';
import { useState } from 'react';

const TextField = ({ label }: any): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {label && <label>{label}</label>}
      <Box
        sx={{
          border: isHovered ? '1px solid black' : '1px solid #E2E8F0',
          display: 'inline-block',
          borderRadius: '12px',
          transition: 'border-color 0.3s ease-in-out'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <IconButton
          type="button"
          sx={{ padding: '14px 12px 14px 16px' }}
          aria-label="search"
        >
          <img src={searchIcon} alt="" />
        </IconButton>
        <InputBase
          sx={{ width: '295px' }}
          placeholder="Pretraga po nazivu"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
      </Box>
    </>
  );
};

export default TextField;
