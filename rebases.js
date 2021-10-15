import axios from 'axios'

export async function getRebasesInfoDays(startTimestamp, days)
{
    
    let rebaseQuery = `

    {
        rebaseYears(first: 3){
          dayRebase(first:365 orderBy:timestamp, orderDirection:asc){
            percentage
            id
            timestamp
          }
        }
        
      }
      
    `

    try
    {
      const rebaseData = await axios({
          url: 'https://api.thegraph.com/subgraphs/id/Qmf9iRTGY3fWmsr1m9qsnJdMD9MYw1g9He8aJdtu3fNSiX',
          method: 'post',
          data: {
            query: rebaseQuery
          }
      }) 
      const rebasesData = rebaseData.data.data.rebaseYears
      let data = []
      for(let k = 0; k < rebasesData.length; ++k)
      {
        for(let i = 0; i < rebasesData[k].dayRebase.length; ++i)
        {
          let obj = {}
          obj.percentage = rebasesData[k].dayRebase[i].percentage
          obj.apy = Math.pow((1 + Number(rebasesData[k].dayRebase[i].percentage)),1095)
          obj.timestamp = rebasesData[k].dayRebase[i].timestamp
          data.push(obj)
        }
      }
      
      return data
    }
    catch(err)
    {
        console.log(err)
    }
}
