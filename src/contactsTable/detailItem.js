import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) =>
   createStyles({
      root: {
         marginTop: theme.spacing(4),
      },
   })
);

const DetailedItem = ({ rowContact }) => {
   const classes = useStyles();

   const city = rowContact && rowContact.address ? rowContact.address.city : null;
   const streetAddress = rowContact && rowContact.address ? rowContact.address.streetAddress : null;
   const state = rowContact && rowContact.address ? rowContact.address.state : null;
   const zip = rowContact && rowContact.address ? rowContact.address.zip : null;

   return (
      <Container className={classes.root}>
         <Typography>
            id: {rowContact.id}
         </Typography>
         <Typography>
            firstName: {rowContact.firstName}
         </Typography>
         <Typography>
            lastName: {rowContact.lastName}
         </Typography>
         <Typography>
            email: {rowContact.email}
         </Typography>
         <Typography>
            streetAddress: {streetAddress}
         </Typography>
         <Typography>
            city: {city}
         </Typography>
         <Typography>
            state: {state}
         </Typography>
         <Typography>
            zip: {zip}
         </Typography>
         <Typography>
            {rowContact.description}
         </Typography>
      </Container>
   )
};

export default DetailedItem;