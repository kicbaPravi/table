import { useState } from 'react';
import { Formik } from 'formik';
import styles from './companiesListPage.module.scss';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import { Button } from '@mui/material';
import {
  GridActionsCellItem,
  GridActionsCellItemProps
} from '@mui/x-data-grid';
import DateInput from '../../components/DateInput/DateInput';

export const DeleteActionItem = ({
  deleteData,
  ...props
}: GridActionsCellItemProps & { deleteData: () => void }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GridActionsCellItem
        {...props}
        onClick={() => setOpen(true)}
        style={{
          width: '160px',
          padding: '6px 12px',
          color: '#718096',
          fontSize: '12px',
          fontWeight: 600,
          fontFamily: 'Manrope',
          lineHeight: '18px',
          marginBottom: '4px'
        }}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete this user?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setOpen(false);
              deleteData();
            }}
            color="warning"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const EditActionItem = ({
  editData,
  params,
  ...props
}: GridActionsCellItemProps & {
  editData: (values: any) => void;
  params: any;
}) => {
  const [open, setOpen] = useState(false);

  const getInitials = () => {
    if (params && params.row) {
      const { name, email, created, updated, date } = params.row;

      return {
        name,
        email,
        created,
        updated,
        date
      };
    }

    return { name: '', email: '', created: '', updated: '', date: '' };
  };

  return (
    <>
      <GridActionsCellItem
        {...props}
        onClick={() => setOpen(true)}
        style={{
          width: '160px',
          padding: '6px 12px',
          color: '#718096',
          fontSize: '12px',
          fontWeight: 600,
          fontFamily: 'Manrope',
          lineHeight: '18px',
          marginBottom: '4px'
        }}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit user data</DialogTitle>
        <DialogContent>
          <div className={styles.editDialogWrap}>
            <Formik initialValues={getInitials()} onSubmit={() => {}}>
              {({ values, handleChange, setFieldValue, handleSubmit }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '25px'
                      }}
                    >
                      <TextField
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        label="Preduzeće"
                      />
                      <TextField
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        label="Email"
                      />
                      <TextField
                        name="created"
                        value={values.created}
                        onChange={handleChange}
                        label="Kreirao"
                      />
                      <TextField
                        name="updated"
                        value={values.updated}
                        onChange={handleChange}
                        label="Azurirao"
                      />
                      <DateInput
                        name="date"
                        value={values.date}
                        label="Datum"
                        setState={setFieldValue}
                      />

                      <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button
                          onClick={() => {
                            setOpen(false);
                            editData(values);
                          }}
                          color="warning"
                          autoFocus
                        >
                          Apply
                        </Button>
                      </DialogActions>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const DownloadPDFActionItem = ({
  downloadData,
  ...props
}: GridActionsCellItemProps & { downloadData: () => void }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GridActionsCellItem
        {...props}
        onClick={() => setOpen(true)}
        style={{
          width: '160px',
          padding: '6px 12px',
          color: '#718096',
          fontSize: '12px',
          fontWeight: 600,
          fontFamily: 'Manrope',
          lineHeight: '18px',
          marginBottom: '4px'
        }}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete this user?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setOpen(false);
              downloadData();
            }}
            color="warning"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const PrintActionItem = ({
  printData,
  ...props
}: GridActionsCellItemProps & { printData: () => void }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GridActionsCellItem
        {...props}
        onClick={() => setOpen(true)}
        style={{
          width: '160px',
          padding: '6px 12px',
          color: '#718096',
          fontSize: '12px',
          fontWeight: 600,
          fontFamily: 'Manrope',
          lineHeight: '18px',
          marginBottom: '4px'
        }}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete this user?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setOpen(false);
              printData();
            }}
            color="warning"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
