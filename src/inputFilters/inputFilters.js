import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) =>
   createStyles({
      fieldsContainer: {
         "& > *:not(:last-child)": {
            marginRight: theme.spacing(3),
            marginBottom: theme.spacing(4)
         }
      },
      inputBtn: {
         marginTop: 18,
         marginBottom: 50,
         height: 30,
   }
   })
);


const InputFilters = ({ onSearchSend }) => {
   const [searchValue, setSearchValue] = useState('')
   const classes = useStyles();

   return (
      <Box className={classes.fieldsContainer}>
         <TextField
            label="Введите текст"
            id="standard-basic"
            value={searchValue}
            onChange={(event) => { setSearchValue(event.target.value) }} />
         <Button
            className={classes.inputBtn}
            variant="contained"
            color="primary"
            onClick={() => onSearchSend(searchValue)}>Найти</Button>
      </Box>
   )
}

export default InputFilters;