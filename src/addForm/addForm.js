import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import MaskedInput from 'react-text-mask';


const useStyles = makeStyles((theme) =>
   createStyles({
      subButton: {
         marginTop: theme.spacing(3),
      },
      fieldsContainer: {
         "& > *:not(:last-child)": {
            marginRight: theme.spacing(2)
         }
      },
      field: {
         width: 100
      },
      errorBox: {
         maxHeight: 100
      },
      inputs: {
         height: 30
      }
   })
);

const useValidation = (value, validations) => {
   const [isEmpty, setEmpty] = useState(true);
   const [emailError, setEmailError] = useState(false)
   const [phoneError, setPhoneError] = useState(false)
   const [inputValid, setInputValid] = useState(false)
   const [nameError, setNameError] = useState(false)

   useEffect(() => {
      for (const validation in validations) {
         switch (validation) {
            case 'isEmpty':
               value ? setEmpty(false) : setEmpty(true)
               break;
            case 'isEmail':
               const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
               re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
               break;
            case 'isPhone':
               const rePh = /(?=(^([^\d]*?\d){10}$))/;
               rePh.test(String(value)) ? setPhoneError(false) : setPhoneError(true)
               break;
            case 'isName':
               const reNm = /^[a-zA-Z ]*$/;
               reNm.test(String(value).toLowerCase()) ? setNameError(false) : setNameError(true)
               break;
            default:
               break;
         }
      }
   }, [value, validations])

   useEffect(() => {
      if (isEmpty || emailError || phoneError || nameError) {
         setInputValid(false)
      } else {
         setInputValid(true)
      }
   }, [isEmpty, phoneError, emailError, nameError])

   return {
      isEmpty,
      phoneError,
      emailError,
      inputValid,
      nameError,
      validations
   }
}

const useInput = (initialValue, validations) => {
   const [value, setValue] = useState(initialValue)
   const [isDirty, setDirty] = useState(false)
   const valid = useValidation(value, validations)

   const onChange = (e) => {
      setValue(e.target.value)
   }

   const onBlur = (e) => {
      setDirty(true)
   }

   return {
      value,
      onChange,
      onBlur,
      isDirty,
      ...valid
   }
}

const AddForm = ({ addContactRow }) => {
   const [isFormOpen, setIsFormOpen] = useState(false);
   const classes = useStyles();

   const firstName = useInput('', { isEmpty: true, isName: true });
   const lastName = useInput('', { isEmpty: true, isName: true });
   const email = useInput('', { isEmpty: true, isEmail: true });
   const phone = useInput('', { isEmpty: true, isPhone: true });


   const submitHandler = (event) => {
      event.preventDefault();
      const form = event.target;
      const firstName = form.elements["firstName"].value;
      const lastName = form.elements["lastName"].value;
      const email = form.elements["email"].value;
      const phone = form.elements["phone"].value;
      addContactRow(firstName, lastName, email, phone);
      form.reset();
   }
   return (
      <div>
         { !isFormOpen ?
            <Button
               variant="contained"
               onClick={() => { setIsFormOpen(true) }}
            >Добавить</Button>
            :
            <form onSubmit={submitHandler}>
               <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center" className={classes.fieldsContainer}>
                  <Box className={classes.errorBox}>
                     <input
                        onChange={e => firstName.onChange(e)}
                        onBlur={e => firstName.onBlur(e)}
                        type="text"
                        placeholder="First name"
                        variant="outlined"
                        name="firstName"
                        className={classes.inputs}
                        value={firstName.value}
                     />
                     {(firstName.isDirty && firstName.nameError) && <div style={{ color: 'red', fontSize: '12px' }}>Допускаются только<br/> английские буквы</div>}
                     {(firstName.isDirty && firstName.isEmpty) && <div style={{ color: 'red', fontSize: '12px' }}>Поле не может быть пустым</div>}
                  </Box>
                  <Box className={classes.errorBox}>
                     <input
                        onChange={e => lastName.onChange(e)}
                        onBlur={e => lastName.onBlur(e)}
                        type="text"
                        placeholder="Last name"
                        variant="outlined"
                        name='lastName'
                        className={classes.inputs}
                        value={lastName.value}
                     />
                     {(lastName.isDirty && lastName.isEmpty) && <div style={{ color: 'red', fontSize: '12px' }}>Поле не может быть пустым</div>}
                     {(lastName.isDirty && lastName.nameError) && <div style={{ color: 'red', fontSize: '12px' }}>Допускаются только<br/> английские буквы</div>}
                  </Box>
                  <Box className={classes.errorBox}>
                     <input
                        onChange={e => email.onChange(e)}
                        onBlur={e => email.onBlur(e)}
                        type="email"
                        placeholder="email"
                        variant="outlined"
                        name="email"
                        className={classes.inputs}
                        value={email.value} />
                     {(email.isDirty && email.emailError) && <div style={{ color: 'red', fontSize: '12px' }}>Некорректный email</div>}
                  </Box>
                  <Box>
                     <MaskedInput
                        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        onChange={e => phone.onChange(e)}
                        onBlur={e => phone.onBlur(e)}
                        type="tel"
                        placeholder="phone"
                        variant="outlined"
                        name="phone"
                        style={{width: '100px'}}
                        className={classes.inputs}
                        showMask={true}
                        value={phone.value} />
                     {(phone.isDirty && phone.phoneError) && <div style={{ color: 'red', fontSize: '12px' }}>Некорректный номер телефона</div>}
                  </Box>
               </Box>
               <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center" className={classes.fieldsContainer}>
                  <Button
                     className={classes.subButton}
                     disabled={!firstName.inputValid || !lastName.inputValid || !email.inputValid || !phone.inputValid}
                     type="submit"
                     variant="contained"
                     color="primary"
                  >Добавить в таблицу</Button>
               </Box>
            </form>
         }
      </div>

   )
}

export default AddForm;