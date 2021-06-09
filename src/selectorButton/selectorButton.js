import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
   fieldsContainer: {
      "& > *:not(:last-child)": {
         marginRight: theme.spacing(2)
      }
   },
 }));

const SelectorButton = ({buttonHandler}) => {
   const classes = useStyles();
   const smallDataUrl = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
   const bigDataUrl = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

   return (
      <Box 
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      className={classes.fieldsContainer}>
         <Button variant="contained"
          onClick={() => (buttonHandler(smallDataUrl))}>32 Data</Button>
         <Button variant="contained"
         onClick={() => (buttonHandler(bigDataUrl))}>1000 Data</Button>
      </Box>
   )
}

export default SelectorButton;