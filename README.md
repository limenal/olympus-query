# olympus-query

## Install

    $ git clone https://github.com/limenal/olympus-query
    $ cd olympus-query
    $ npm install
    
## Running the project

    $ node index.js
## getStakesInfoNHour() / getDepositsInfoNHours() functions

    Note that functions for N minutes or N days can also be implemented. After fetching data we need to iterate all time intervals like that:
    
    for(let beginTimestamp = startTimestamp, endTimestamp = startTimestamp + N * timeInterval; beginTimestamp < endTime; beginTimestamp += N*timeInterval, endTimestamp+= N * timeInterval)
    {
      
      let obj = {
        beginTimestamp: beginTimestamp,
        endTimestamp: endTimestamp,
        //other data
      }
      for(let j = 0; j < data.length; ++j)
      {
        
        if(beginTimestamp <= stakes[j].timestamp && stakes[j].timestamp < endTimestamp)
        {

            // add items to object
        }
      }
      data.push(obj)
    }