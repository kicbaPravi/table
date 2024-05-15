import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import greenDropdownIcon from '../../assets/icons/green_dropdown_icon.svg';
import styless from './selectField.module.scss';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 222
    }
  }
};

const names = ['Oliver Hansen', 'Van Henry', 'April Tucker', 'Ralph Hubbard'];

const getStyles = (
  name: string,
  personName: readonly string[],
  theme: Theme
) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    fontFamily: 'Manrope, sans-serif'
  };
};

const styles: any = {
  select: {
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: '#E2E8F0',
      borderRadius: '12px'
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #127973'
    },
    '& .MuiSelect-icon': {
      color: '#127973'
    },
    '& .MuiSelect-select': {
      padding: '13.5px 16px'
    }
  }
};

const SelectField = ({ label }: any): JSX.Element => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value }
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  const styleSelected = {
    fontFamily: 'Manrope, sans-serif',
    fontSize: '14px',
    fontWeight: 800,
    lineHeight: '21px',
    letterSpacing: '0.20000000298023224px',
    color: '#1A202C'
  };

  return (
    <div className={styless.wrapper}>
      {label && <label>{label}</label>}

      <FormControl sx={{ width: 222 }}>
        <Select
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => (
            <span style={styleSelected}>
              {selected.length === 0 ? 'Sve' : selected}
            </span>
          )}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
          sx={styles.select}
          IconComponent={() => (
            <img
              src={greenDropdownIcon}
              style={{ marginRight: '16px' }}
              alt="dropdown_icon"
            />
          )}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectField;
