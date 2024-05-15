import { DataGrid } from '@mui/x-data-grid';
import threDots from '../../assets/icons/three_dots_icon.svg';
import { CustomPagination } from './components/CustomPagination';

const styleTable = {
  '&, [class^=MuiDataGrid]': { border: 'none' },
  '.MuiDataGrid-columnSeparator': {
    display: 'none'
  },
  '&.MuiDataGrid-root': {
    border: 'none'
  },
  '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
    fontFamily: 'Manrope',
    fontSize: '16px !important',
    fontWeight: 600,
    letterSpacing: '0.2px'
  },
  '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
    outline: 'none !important'
  },

  '.custom-row': {
    marginTop: '8px'
  },
  '.MuiDataGrid-container--top [role=row]': {
    backgroundColor: '#f6f8f3'
  },
  '.MuiDataGrid-container--top:after': {
    backgroundColor: '#EDF2F7',
    marginBottom: '8px'
  },
  '& .MuiDataGrid-footerContainer': {
    '& .MuiTablePagination-root': {
      borderBottom: 'none'
    },
    '& .dataTable_pagination__vMm8-': {
      width: '100%',
      marginTop: 0
    }
  },
  '& .MuiDataGrid-row': {
    fontSize: '16px'
  }
};

const getRowClassName = () => {
  return `custom-row`;
};

const DataTable = ({ columnsSetup, data }: any) => {
  return (
    <>
      <DataGrid
        slots={{
          moreActionsIcon: () => <img src={threDots} alt="threDots_icon" />,
          pagination: CustomPagination
        }}
        sx={styleTable}
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableColumnResize
        disableColumnSorting
        disableRowSelectionOnClick
        rowHeight={80}
        columns={columnsSetup}
        rows={data}
        getRowId={(row) => row._id}
        getRowClassName={getRowClassName}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8
            }
          }
        }}
        pageSizeOptions={[8, 10, 15]}
      />
    </>
  );
};

export default DataTable;
