import './App.css';
import React, { useEffect, useState } from 'react';
import useData from './useData/useData'
import SelectorButton from './selectorButton/selectorButton';
import ContactsTableBody from './ContactsTableBody/contactsTableBody';
import CustomPagination from './customPagination/customPagination';

class idGenerator{
  static id=1000;
  static next(){
    return ++this.id;
  }
}

function App() {
  const [isButtonClick, setIsButtonClick] = useState(false);
  const [url, setUrl] = useState('');
  const [directionSort, setDirectionSort] = useState(true);
  const [rowContact, setRowContact] = useState('');
  const [rowIsClick, setRowIsClick] = useState(false);
  const [totalCountRow, setTotalCountRow] = useState(0);
  const [totalCountPage, setTotalCountPage] = useState(0);
  const limitCountPage = 50;
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [buttonNextDisabled, setButtonNextDisabled] = useState('item');
  const [buttonPreviousDisabled, setButtonPreviousDisabled] = useState('item');
  const [currentPageActive, setCurrentPageActive] = useState('item');
  const [searchText, setSearchText] = useState('');

  const { contactData, isLoading, setContactData, isLoaded } = useData({ url, isButtonClick });
  
  const addContactRow = ( firstName, lastName, email, phone ) => {
    setContactData([{ id:idGenerator.next(), firstName, lastName, email, phone }, ...contactData])
  }

  const buttonHandler = (url) => {
    setUrl(url);
    setIsButtonClick(true);
  }

  const getFilteredData = () => {
    if (!searchText) {
      return contactData
    }
    return contactData.filter(
      el => {
        return (
          el['id'].toString().includes(searchText) ||
          el['firstName'].toLowerCase().includes(searchText.toLowerCase()) ||
          el['lastName'].toLowerCase().includes(searchText.toLowerCase()) ||
          el['email'].toLowerCase().includes(searchText.toLowerCase()) ||
          el['phone'].includes(searchText)
          )
      }
    )
  }
  
  const filteredData = getFilteredData();
  const lastBlockRow = currentPageNumber * limitCountPage;
  const firstBlockRow = lastBlockRow - limitCountPage;
  const currentBlockRows = filteredData.slice(firstBlockRow, lastBlockRow);

  const currentPage = (pg) => {
    setCurrentPageNumber(pg);
    setButtonPreviousDisabled('');
    setButtonNextDisabled('');
    setCurrentPageActive('active');
  }

  useEffect(() => {
    if (!isLoaded) {
      return
    }
    setTotalCountRow(filteredData.length);
    const getTotalCountPage = Math.ceil(totalCountRow / limitCountPage);
    setTotalCountPage(getTotalCountPage);

  }, [isLoaded, setTotalCountRow, filteredData.length, totalCountRow]);

  let pages = [];
  for (let i = 1; i <= totalCountPage; i++) {
    pages.push(i)
  }

  const onSearchSend = (text) => {
    setSearchText(text)
  }

  const sortData = (field) => {
    const copyData = contactData.concat();
    let sortData;
    if (directionSort) {
      sortData = copyData.sort(
        (a, b) => { return a[field].toLowerCase() > b[field].toLowerCase() ? 1 : -1 }
      )
    } sortData = copyData.reverse(
      (a, b) => { return a[field].toLowerCase() > b[field].toLowerCase() ? 1 : -1 }
    )

    setContactData(sortData)
    setDirectionSort(!directionSort)
  }

  const detailRow = (row) => {
    setRowIsClick(true);
    setRowContact(row);
  }

  const onNextClick = () => {
    if (currentPageNumber > totalCountPage - 1) {
      setButtonNextDisabled('disabled')
      return
    }
    setCurrentPageNumber(currentPageNumber + 1)
  }

  const onPreviousClick = () => {
    if (currentPageNumber < 2) {
      setButtonPreviousDisabled('disabled')
      return
    }
    setCurrentPageNumber(currentPageNumber - 1)
  }

  return (
    <div>
      {
        !isButtonClick ? <SelectorButton buttonHandler={buttonHandler} />
          :
          <ContactsTableBody
            contactData={currentBlockRows}
            sortData={sortData}
            directionSort={directionSort}
            detailRow={detailRow}
            rowContact={rowContact}
            isLoading={isLoading}
            rowIsClick={rowIsClick}
            onSearchSend={onSearchSend}
            addContactRow={addContactRow}/>
      }
      { isLoaded && (totalCountRow > limitCountPage) &&
        <CustomPagination
          pages={pages}
          onNextClick={onNextClick}
          currentPage={currentPage}
          onPreviousClick={onPreviousClick}
          buttonNextDisabled={buttonNextDisabled}
          buttonPreviousDisabled={buttonPreviousDisabled}
          currentPageActive={currentPageActive}
          currentPageNumber={currentPageNumber} />}
    </div>
  );
}

export default App;
