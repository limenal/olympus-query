import axios from 'axios'

/**

    * @dev : Get rebases (days)
    * @param startTimestamp - Start timestamp for query 
    * @param endTime - End timestamp for query

*/
export async function getRebasesInfoDays(startTimestamp, endTime)
{
    
    let rebaseQuery = `

    {
        rebaseYears(first: 3){
          dayRebase(first:365 orderBy:timestamp where:{timestamp_gte: ${startTimestamp}, timestamp_lt:${endTime} }){
            percentage
            id
            timestamp
          }
        }
        
      }
      
    `
      console.log(rebaseQuery)
    try
    {
      const rebaseData = await axios({
          url: 'https://api.thegraph.com/subgraphs/name/limenal/olympus-stake',
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
          obj.apy = Math.pow((1 + Number(rebasesData[k].dayRebase[i].percentage)), 1095)
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
