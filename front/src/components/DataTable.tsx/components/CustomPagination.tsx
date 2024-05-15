import { MenuItem, Pagination, Select, SelectChangeEvent } from '@mui/material';
import {
  gridPageCountSelector,
  gridPaginationModelSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import styles from '../dataTable.module.scss';
import { useState } from 'react';

const styleSelect = {
  '& #demo-simple-select': {
    paddingTop: '10px',
    paddingBottom: '10px',
    marginRight: '15px',
    fontWeight: 800,
    fontSize: '14px',
    lineHeight: '21px',
    color: '#718096'
  }
};

export const CustomPagination = () => {
  const [noOfRows, setNoOfRows] = useState('8');
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const currentPage = useGridSelector(
    apiRef,
    gridPaginationModelSelector
  )?.page;

  const onChangeNoOfRows = (event: SelectChangeEvent) => {
    setNoOfRows(event.target.value as string);
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.select_rows_wrap}>
        <span className={styles.rows_number_wrap}>Broj redova po strani:</span>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={noOfRows}
          defaultValue="8"
          onChange={onChangeNoOfRows}
          sx={styleSelect}
        >
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
        </Select>
      </div>
      <Pagination
        count={pageCount}
        page={currentPage ? currentPage + 1 : 1}
        onChange={(event, value) => {
          apiRef.current.setPage(value - 1);
        }}
        sx={{
          '& .MuiPaginationItem-page': {
            color: '#718096',
            borderRadius: '0',
            border: '1px solid transparent',

            '&.Mui-selected': {
              border: '1px solid #127973',
              borderRadius: '8px',
              background: 'transparent'
            }
          },
          '& .MuiPaginationItem-ellipsis': { color: '#718096' },
          '& .MuiSvgIcon-root': { fill: '#718096' }
        }}
      />
    </div>
  );
};
