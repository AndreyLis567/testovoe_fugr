import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AddForm from '../addForm/addForm';
import ContactsTable from '../contactsTable/contactsTable';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) =>
   createStyles({
      root: {
         marginTop: theme.spacing(4),
      },
      inputsContainer: {
         marginBottom: theme.spacing(3)
      }
   })
);

const ContactsTableBody = ({
   contactData,
   sortData,
   directionSort,
   detailRow,
   rowContact,
   isLoading,
   rowIsClick,
   onSearchSend,
   addContactRow }) => {

   const classes = useStyles();

   return (
      isLoading ?
         <Container className={classes.root}>
            <CircularProgress />
         </Container> :
         <Container className={classes.root}>
            <Grid container spacing={3}>
               <Grid item xs={12} className={classes.inputsContainer}>
                  <AddForm addContactRow={addContactRow} />
               </Grid>
               <Grid item xs={12}>
                  <ContactsTable
                     contactData={contactData}
                     sortData={sortData}
                     directionSort={directionSort}
                     detailRow={detailRow}
                     rowContact={rowContact}
                     rowIsClick={rowIsClick}
                     onSearchSend={onSearchSend} />
               </Grid>
            </Grid>
         </Container>
   )

}

export default ContactsTableBody;