import { GridColumnHeaderParams } from '@mui/x-data-grid';
import sortIcon from '../../assets/icons/sort_icon.svg';

const headerStyle = {
  fontFamily: 'Manrope',
  fontSize: '16px',
  fontWeight: 800,
  lineHeight: '24px',
  letterSpacing: '0.20000000298023224px',
  color: '#718096',
  marginRight: '12px'
};

const TableHeader = (params: GridColumnHeaderParams): JSX.Element | null => {
  if (!params) return null;

  const { headerName } = params.colDef;

  return (
    <div className="flex">
      <p style={headerStyle}>{headerName}</p>
      <img src={sortIcon} alt="sort_icon" />
    </div>
  );
};

export default TableHeader;
