import axios from "axios";
import { useEffect, useState } from "react";

const useData = ({url, isButtonClick}) => {
  const [contactData, setContactData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if(!isButtonClick) {
      return
    }
     setIsLoading(true)
   axios.get(url)
     .then(
       (res) => {
         setContactData(res.data);
         setIsLoading(false);
         setIsLoaded(true);
       }
     )
 }, [url, isButtonClick])
  return {contactData, isLoading, isLoaded, setContactData, setIsLoading}
}

export default useData;