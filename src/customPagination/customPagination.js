import React from 'react';
import './customPaginationCSS.css';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

const CustomPagination = ({
   pages,
   currentPage,
   onNextClick,
   onPreviousClick,
   buttonNextDisabled,
   buttonPreviousDisabled,
   currentPageActive,
   currentPageNumber
}) => {
   const classes = useStyles();

   return (
      <Container className={classes.root}>
         <nav>
            <ul className="pagination">
               <li className={`item ${buttonPreviousDisabled}`}>
                  <a className="link" href="/#" tabIndex="-1" onClick={() => onPreviousClick()}>Previous</a>
               </li>
               {pages.map(p => {
                  return (
                     <li className={(currentPageNumber === p) ? `item ${currentPageActive}` : 'item'} key={p}>
                        <a className="link" href="/#" onClick={() => { currentPage(p) }}>{p}</a>
                     </li>
                  )
               })
               }
               <li className={`item ${buttonNextDisabled}`}>
                  <a className="link" href="/#" onClick={() => onNextClick()}>Next</a>
               </li>
            </ul>
         </nav>
      </Container>
   )
};

export default CustomPagination;