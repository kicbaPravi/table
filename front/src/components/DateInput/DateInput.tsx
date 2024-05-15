import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import calendarIcon from '../../assets/icons/calendar_icon.svg';
import styles from './dateInput.module.scss';
import moment, { Moment } from 'moment';

const style = {
  width: '297px',
  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    border: '1px solid #E2E8F0',
    borderRadius: '12px'
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    border: '1px solid black'
  }, // at hover state
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: '1px solid #127973'
  },
  '& .MuiInputBase-input': {
    padding: '13.5px 16px',
    fontFamily: 'Manrope',
    fontSize: '14px',
    fontWeight: 800,
    lineHeight: '21px',
    letterSpacing: '0.20000000298023224px'
  }
};

const DateInput = ({ label, name, value, setState }: any): JSX.Element => {
  const formattedDate: Moment | null = value ? moment.utc(value) : null;

  return (
    <div className={styles.wrapper}>
      {label && <label>{label}</label>}
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          sx={style}
          slots={{
            openPickerIcon: () => (
              <img
                src={calendarIcon}
                style={{ marginRight: '8px' }}
                alt="dropdown_icon"
              />
            )
          }}
          format="MMM DD, YYYY"
          value={formattedDate}
          onChange={(e: any) => {
            if (setState) {
              const dateTimeValue = e.format('YYYY-MM-DD HH:mm:ss');
              setState(name, dateTimeValue);
            }
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DateInput;
