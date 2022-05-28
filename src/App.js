import { React, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [ApiData, setData] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [pairedNames, setPairedNames] = useState([]);
  const getApiData = async () => {
    await fetch('data.json',{
      headers : { 
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
    let pairedNamesArr = [];
    ApiData.recipients.forEach(a => {
      let tagSetA = new Set();
      a.tags.forEach(tag => {
        tagSetA.add(tag);
      });
      ApiData.recipients.forEach(b => {
        if (a === b) {
          return;
        }
        let tagMatchCount = 0;
        for (let i = 0; i < b.tags.length; i++) {
          if (tagSetA.has(b.tags[i])) {
            tagMatchCount++;
          }
          if (tagMatchCount >= 2) {
            if (isNotCommonPairs(pairedNamesArr, [a.name, b.name])) {
              pairedNamesArr.push([a.name, b.name]);
            }
          }
        }
      });
    });
    setPairedNames(pairedNamesArr);
  }
  const isNotCommonPairs = (pairedNamesArr, names) => {
    let nameSet = new Set(names);
    let result = false
    if (pairedNamesArr.length === 0) {
      return true;
    }
    pairedNamesArr.forEach(pairedNames => {
      if (!nameSet.has(pairedNames[0]) && !nameSet.has(pairedNames[1])) {
        result = true;
      } else {
        result = false;
      }
    });
    return result;
  }

  useEffect(() => {
    getApiData();
  }, []);

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
