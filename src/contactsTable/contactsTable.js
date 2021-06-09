import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputFilters from '../inputFilters/inputFilters';
import DetailedItem from './detailItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles({
   tableCellId: {
      width: 50,
   },
   tableCellName: {
      width: 200
   },
   tableCellemail: {
      width: 400
   },
   thead: {
      height: 40
   }
});


const ContactsTable = ({
   sortData,
   contactData,
   directionSort,
   detailRow,
   rowContact,
   rowIsClick,
   onSearchSend }) => {
   const [fieldData, setFieldData] = useState('');
   const classes = useStyles();

   const Arrow = () => {
      return (
         directionSort ? (<div style={{ display: 'inline', verticalAlign: 'middle' }}>
            <ArrowDownwardIcon fontSize="small" />
         </div>)
            : (<div style={{ display: 'inline', verticalAlign: 'middle' }}>
               <ArrowUpwardIcon fontSize="small" />
            </div>)
      )
   }
   const fieldSortData = (field) => {
      sortData(field);
      setFieldData(field)
   }
   return (
      <div>
         <InputFilters onSearchSend={onSearchSend} />
         <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
               <TableHead className={classes.thead}>
                  <TableRow>
                     <TableCell
                        className={classes.tableCellId}
                        onClick={() => fieldSortData('id')}>
                        id {fieldData === 'id' ? <Arrow /> : null}
                     </TableCell>
                     <TableCell
                        className={classes.tableCellName}
                        onClick={() => fieldSortData('firstName')}>
                        FirstName {fieldData === 'firstName' ? <Arrow /> : null}
                     </TableCell>
                     <TableCell
                        className={classes.tableCellName}
                        onClick={() => fieldSortData('lastName')}>
                        LastName {fieldData === 'lastName' ? <Arrow /> : null}
                     </TableCell>
                     <TableCell
                        className={classes.tableCellemail}
                        onClick={() => fieldSortData('email')}>
                        email {fieldData === 'email' ? <Arrow /> : null}
                     </TableCell>
                     <TableCell onClick={() => fieldSortData('phone')}>
                        phone {fieldData === 'phone' ? <Arrow /> : null}
                     </TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {contactData.map(
                     item => (
                        <TableRow key={item.id + item.email}
                           onClick={() => detailRow(item)}>
                           <TableCell>{item.id}</TableCell>
                           <TableCell>{item.firstName}</TableCell>
                           <TableCell>{item.lastName}</TableCell>
                           <TableCell><Typography>{item.email}</Typography></TableCell>
                           <TableCell><Typography>{item.phone}</Typography></TableCell>
                        </TableRow>
                     )
                  )}
               </TableBody>
            </Table>
            {rowIsClick ? <DetailedItem rowContact={rowContact} /> : null}
         </TableContainer>
      </div>
   )
}

export default ContactsTable;