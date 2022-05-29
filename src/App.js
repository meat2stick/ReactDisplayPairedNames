import { React, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [ApiData, setData] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [pairedNames, setPairedNames] = useState([]);
  const getApiData = async () => {
    await fetch('data.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        setData(result);
        setDataIsLoaded(true);
      },
        (error) => {
          console.log(`Error loading data, Error:${error}`);
        })
  }
  const pairNamesWithTwoOrMoreTags = () => {
    //Loop through every recipients (A)
    for (let i = 0; i < ApiData.recipients.length; i++) {
      let tagSet = new Set();
      let tagMatchCount = 0;
      //Add tags to set to be used for comparison. tagSet will be reset after every iteration of recipients
      ApiData.recipients[i].tags.forEach(tag => {
        tagSet.add(tag);
      });
      //Instead of looping and compare against all elements. Elements are skipped.
      for (let j = i + 1; j < ApiData.recipients.length; j++) {
        //Compare the tags with the tagSet
        for (let x = 0; x < ApiData.recipients[j].tags.length; x++) {
          if (tagSet.has(ApiData.recipients[j].tags[x])) {
            tagMatchCount++;
          }
        }
        //if 2 or more tags are matched then the names are added to the state
        if (tagMatchCount >= 2) {
          setPairedNames(prevPairedNames => [...prevPairedNames, [ApiData.recipients[i].name, ApiData.recipients[j].name]]);
        }
        tagMatchCount = 0;
      }
    }
  }

  //Executes when the function is first initialised
  useEffect(() => {
    getApiData();
  }, []);

  //Executes when there is changes towards dataIsLoaded
  useEffect(() => {
    if (dataIsLoaded) {
      pairNamesWithTwoOrMoreTags();
    }
  }, [dataIsLoaded]);

  return (
    <div className="App">
      <header className="App-header">
        <div className='PairedNameList'>
          <h3>Pair of names which have 2 or more tags in common</h3>
          <ol>
            {
              pairedNames.map((pN, index) => {
                return (
                  <li key={"PairedName" + index} id={"PairedName" + (index + 1)}>
                    {pN[0] + ', ' + pN[1]}
                  </li>
                )
              })
            }
          </ol>
        </div>
      </header>
    </div>
  );
}

export default App;
