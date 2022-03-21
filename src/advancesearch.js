
import { useState, useEffect } from 'react';
import './advancesearch.css';
function ASearch() {
  // State
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('Delhi');
  const [state, setState] = useState('');
  var abc=[];
  const [def,setdef]=useState({});

  const apiUrl = `http://localhost:3010/comments/`;
  // Side effect
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data)).then((apiData) => setdef(apiData=>apiData))
  }, [apiUrl,state]);
  const inputHandler = (event) => {
    setGetState(event.target.value);
  };
  const submitHandler = () => {
    setState(getState);
    //console.log(getState)
   // console.log(apiData.filter(api1=>api1.display.includes(getState)));
    abc=apiData.filter(api1=>api1.comment.includes(getState))
    console.log(abc.map(apd=>apd.comment));
    setdef((abc.map(apd=>apd.comment)));
   // console.log(def)
  };

  

  return (
    <div className="Search">
        
    
            <label for="location-name" class="col-form-label">
              Search Comment :
            </label>
          
          <div class="col-auto">
            <input
              type="text"
              id="location-name"
              class="form-control"
              onChange={inputHandler}
              value={getState}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={submitHandler}>
            Search
          </button>
      
        
   </div>
  );
}

export default ASearch;