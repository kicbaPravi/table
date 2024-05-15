import styles from './signinPage.module.scss';
import signinImg from '../../assets/imgs/signing_img.svg';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputAdornment,
  InputLabel
} from '@mui/material';
import { Formik } from 'formik';
import api from '../../config/axios';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import passwordIcon from '../../assets/icons/password_icon.svg';
import mailIcon from '../../assets/icons/mail_icon.svg';

const SigninPage = (): JSX.Element => {
  const navigate = useNavigate();
  const loggedUser = localStorage.getItem('loggedUser');
  const [showPassword] = useState(false);

  useEffect(() => {
    loggedUser && navigate('/companies');
  }, [loggedUser, navigate]);

  const submitForm = async (values: {
    name: string;
    password: string;
    remember: boolean;
  }) => {
    const response = await api.post('/auth/signin', values);

    if (response && response.status === 200) {
      if (values.remember)
        localStorage.setItem('loggedUser', response.data.name);

      navigate('/companies');
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.left}>
            <img src={signinImg} alt="" />
            <p>Registar</p>
          </div>
          <div className={styles.right}>
            <div className={styles.formWrapper}>
              <p className={styles.headline}>Prijava na sistem</p>

              <Formik
                initialValues={{
                  name: 'avianrizkyprasetya@mail.com',
                  password: 'Hello World',
                  remember: true
                }}
                onSubmit={submitForm}
              >
                {({ values, handleChange, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <FormControl
                      sx={{ mb: '30px', width: '100%' }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="standard-adornment-password">
                        Korisničko Ime
                      </InputLabel>
                      <Input
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        id="standard-adornment-name"
                        endAdornment={
                          <InputAdornment
                            position="end"
                            style={{ marginBottom: '8px' }}
                          >
                            <img src={mailIcon} alt="mail_icon" />
                          </InputAdornment>
                        }
                      />
                    </FormControl>

                    <FormControl
                      sx={{ mb: '30px', width: '100%' }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="standard-adornment-password">
                        Lozinka
                      </InputLabel>
                      <Input
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment
                            position="end"
                            style={{ marginBottom: '8px' }}
                          >
                            <img src={passwordIcon} alt="password_icon" />
                          </InputAdornment>
                        }
                      />
                    </FormControl>

                    <div className={styles.remember_me_section}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.remember}
                            name="remember"
                            onChange={handleChange}
                          />
                        }
                        label="Zapamti me"
                      />
                      <p>Zaboravili ste lozinku?</p>
                    </div>

                    <button type="submit" className={styles.submit}>
                      Uloguj Se
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninPage;
