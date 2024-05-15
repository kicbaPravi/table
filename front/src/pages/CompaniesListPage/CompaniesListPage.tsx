import moment from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import DataTable from '../../components/DataTable.tsx/DataTable';
import styles from './companiesListPage.module.scss';
import api from '../../config/axios';
import { GridColDef } from '@mui/x-data-grid';
import { GridRowId } from '@mui/x-data-grid';
import editIcon from '../../assets/icons/edit_icon.svg';
import printIcon from '../../assets/icons/print_icon.svg';
import downloadPdfIcon from '../../assets/icons/download_pdf_icon.svg';
import deleteIcon from '../../assets/icons/delete_icon.svg';
import TableCell from '../../components/TableCells/TableCell';
import {
  DeleteActionItem,
  DownloadPDFActionItem,
  EditActionItem,
  PrintActionItem
} from './helper';
import TextField from '../../components/TextField/TextField';
import DateInput from '../../components/DateInput/DateInput';
import SelectField from '../../components/SelectField/SelectField';
import TableHeader from '../../components/TableCells/TableHeaders';

const CompaniesListPage = () => {
  const [data, setData] = useState<any>([]);

  // onClick actions

  const deleteData = useCallback(
    (id: GridRowId) => async () => {
      const deleteResponse = await api.delete(`/companies/delete/${id}`);

      if (deleteResponse && deleteResponse.data) {
        const {
          data: { companies }
        } = await api.get('/companies');
        setData(companies);
      }
    },
    []
  );

  const editData = useCallback(
    (params: any) => async (values: any) => {
      const response = await api.patch(`/companies/update/${params.id}`, {
        ...values
      });

      if (response && response.data) {
        const response = await api.get('/companies');

        if (response && response.data) {
          setData(response.data.companies);
        }
      }
    },
    []
  );

  const printData = useCallback(
    (id: GridRowId) => async () => {
      console.log('ID', id);
    },
    []
  );

  const downloadData = useCallback(
    (id: GridRowId) => async () => {
      console.log('ID', id);
    },
    []
  );

  // styling and setup columns

  const columnsSetup = useMemo<GridColDef<any>[]>(
    () => [
      {
        field: 'name',
        headerName: 'Preduzeće',
        renderHeader: TableHeader,
        renderCell: TableCell,
        flex: 1
      },
      {
        field: 'email',
        headerName: 'Email',
        renderHeader: TableHeader,
        flex: 1
      },
      {
        field: 'created',
        headerName: 'Kreirao',
        renderHeader: TableHeader,
        renderCell: TableCell,
        flex: 1
      },
      {
        field: 'updated',
        headerName: 'Ažurirao',
        renderHeader: TableHeader,
        renderCell: TableCell,
        flex: 1
      },
      {
        field: 'date',
        headerName: 'Datum',
        renderHeader: TableHeader,
        renderCell: (params: any) => {
          return moment(params.value).format('DD MMM YYYY, hh.mm A');
        },
        flex: 1
      },
      {
        field: 'actions',
        type: 'actions',
        width: 80,

        getActions: (params: any) => [
          <EditActionItem
            label="Edituj"
            showInMenu
            icon={<img src={editIcon} alt="editIcon" />}
            params={params}
            editData={editData(params)}
            closeMenuOnClick={false}
          />,
          <PrintActionItem
            label="Štampaj"
            showInMenu
            icon={<img src={printIcon} alt="printIcon" />}
            printData={printData(params.id)}
            closeMenuOnClick={false}
          />,
          <DownloadPDFActionItem
            label="Skini PDF"
            showInMenu
            icon={<img src={downloadPdfIcon} alt="downloadPdfIcon" />}
            downloadData={downloadData(params.id)}
            closeMenuOnClick={false}
          />,
          <DeleteActionItem
            label="Brisanje"
            showInMenu
            icon={<img src={deleteIcon} alt="deleteIcon" />}
            deleteData={deleteData(params.id)}
            closeMenuOnClick={false}
          />
        ]
      }
    ],
    [deleteData, editData, printData, downloadData]
  );

  useEffect(() => {
    (async () => {
      const response = await api.get('/companies');

      if (response && response.data) {
        setData(response.data.companies);
      }
    })();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1>Lista preduzeća</h1>

      <div className={styles.form_row}>
        <TextField />
        <DateInput label="Filtriraj po datumu" />
        <SelectField label="Prikaz" />
      </div>

      <DataTable columnsSetup={columnsSetup} data={data} />
    </div>
  );
};

export default CompaniesListPage;
