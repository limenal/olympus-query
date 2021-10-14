import axios from 'axios'

/**

    * @dev : Get stakes (days)

*/
export async function getStakesInfoDays(startTimestamp, days)
{
    
    let stakeQuery = `

    {
        stakeYears(first: 100 orderBy:timestamp) {
      
          dayStake(first: 365 orderBy:timestamp) {
      
            id
            amountStaked
            amountUnstaked
            currentStaked
            timestamp
            stakeCount
            unstakeCount
            stakeMax
            unstakeMax
          }
        }
      }
    `

    try
    {
      const stakeData = await axios({
          url: 'https://api.thegraph.com/subgraphs/id/QmPR96VPnd3y4zrtaEJ2bttPffC6VHt971UVKorEn5qM2w',
          method: 'post',
          data: {
            query: stakeQuery
          }
      }) 
      const stakesData = stakeData.data.data.stakeYears
      let data = []
      let stakes = []
      for(let k = 0; k < stakesData.length; ++k)
      {
        for(let i = 0; i < stakesData[0].dayStake.length; ++i)
        {
          let obj = {}
          obj.stakeCount = stakesData[k].dayStake[i].stakeCount
          obj.unstakeCount = stakesData[k].dayStake[i].unstakeCount
          obj.amountStaked = stakesData[k].dayStake[i].amountStaked
          obj.amountUnstaked = stakesData[k].dayStake[i].amountUnstaked
          obj.timestamp = stakesData[k].dayStake[i].timestamp
          obj.currentStaked = stakesData[k].dayStake[i].currentStaked
          obj.stakeMax = stakesData[k].dayStake[i].stakeMax
          obj.unstakeMax = stakesData[k].dayStake[i].unstakeMax
          stakes.push(obj)
        }
      }
      
      for(let i = 0; i < days-1; ++i)
      {
        let beginTimestamp = startTimestamp + i * 86400
        let endTimestamp = startTimestamp + (i+1) * 86400

        let obj = {
          beginTimestamp: beginTimestamp,
          endTimestamp: endTimestamp,
          stakeCount: 0,
          unstakeCount: 0,
          amountStaked: 0,
          amountUnstaked: 0,
          currentStaked: 0,
          stakeMax: 0,
          unstakeMax: 0,
          stakeAvg: 0,
          unstakeAvg: 0,
          unstakedToStakedPercent: 0,
          unstakedToTotalStakedPercent: 0
        }
        for(let j = 0; j < stakes.length; ++j)
        {
          
          if(beginTimestamp <= stakes[j].timestamp && stakes[j].timestamp < endTimestamp)
          {
            obj.stakeCount = stakes[j].stakeCount
            obj.unstakeCount = stakes[j].unstakeCount
            obj.amountStaked = stakes[j].amountStaked
            obj.amountUnstaked = stakes[j].amountUnstaked
            obj.currentStaked = stakes[j].currentStaked
            obj.stakeMax = stakes[j].stakeMax
            obj.unstakeMax = stakes[j].unstakeMax
            obj.stakeAvg = stakes[j].amountStaked / stakes[j].stakeCount
            obj.unstakeAvg = stakes[j].amountUnstaked / stakes[j].unstakeCount
            obj.unstakedToStakedPercent = 100 * (stakes[j].amountUnstaked/stakes[j].amountStaked)
            obj.unstakedToTotalStakedPercent = 100 * (stakes[j].amountUnstaked / stakes[j].currentStaked)
          }
        }
        data.push(obj)
      }
      return data
    }
    catch(err)
    {
        console.log(err)
    }
}
/**

    * @dev : Get stakes (hours)

*/
export async function getStakesInfoHour(startTimestamp, days)
{
  let stakeQuery = `

  {
      stakeYears(first: 100 orderBy:timestamp) {
    
        dayStake(first: 365 orderBy:timestamp) {
          hourStake(first: 24, orderBy:timestamp)
          {
            id
            amountStaked
            amountUnstaked
            currentStaked
            timestamp
            stakeCount
            unstakeCount
            stakeMax
            unstakeMax
          }
          
        }
      }
    }
  `

  try
  {
    const stakeData = await axios({
        url: 'https://api.thegraph.com/subgraphs/id/QmPR96VPnd3y4zrtaEJ2bttPffC6VHt971UVKorEn5qM2w',
        method: 'post',
        data: {
          query: stakeQuery
        }
    }) 
    const stakesData = stakeData.data.data.stakeYears
    let data = []
    let stakes = []
    for(let k = 0; k < stakesData.length; ++k)
    {
      for(let i = 0; i < stakesData[0].dayStake.length; ++i)
      {
        for(let j = 0; j < stakesData[0].dayStake[i].hourStake.length; ++j)
        {
          let obj = {}
          obj.stakeCount = stakesData[0].dayStake[i].hourStake[j].stakeCount
          obj.unstakeCount = stakesData[0].dayStake[i].hourStake[j].unstakeCount
          obj.amountStaked = stakesData[0].dayStake[i].hourStake[j].amountStaked
          obj.amountUnstaked = stakesData[0].dayStake[i].hourStake[j].amountUnstaked
          obj.timestamp = stakesData[0].dayStake[i].hourStake[j].timestamp
          obj.currentStaked = stakesData[0].dayStake[i].hourStake[j].currentStaked
          obj.stakeMax = stakesData[0].dayStake[i].hourStake[j].stakeMax
          obj.unstakeMax = stakesData[0].dayStake[i].hourStake[j].unstakeMax
          stakes.push(obj)
        }
      }
    }
    
    for(let i = 0; i < 24*days; ++i)
    {
      let beginTimestamp = startTimestamp + i * 3600
      let endTimestamp = startTimestamp + (i+1) * 3600

      let obj = {
        beginTimestamp: beginTimestamp,
        endTimestamp: endTimestamp,
        stakeCount: 0,
        unstakeCount: 0,
        amountStaked: 0,
        amountUnstaked: 0,
        currentStaked: 0,
        stakeMax: 0,
        unstakeMax: 0,
        stakeAvg: 0,
        unstakeAvg: 0,
        unstakedToStakedPercent: 0,
        unstakedToTotalStakedPercent: 0
      }
      for(let j = 0; j < stakes.length; ++j)
      {
        
        if(beginTimestamp <= stakes[j].timestamp && stakes[j].timestamp < endTimestamp)
        {
          obj.stakeCount = stakes[j].stakeCount
          obj.unstakeCount = stakes[j].unstakeCount
          obj.amountStaked = stakes[j].amountStaked
          obj.amountUnstaked = stakes[j].amountUnstaked
          obj.currentStaked = stakes[j].currentStaked
          obj.stakeMax = stakes[j].stakeMax
          obj.unstakeMax = stakes[j].unstakeMax
          obj.stakeAvg = stakes[j].amountStaked / stakes[j].stakeCount
          obj.unstakeAvg = stakes[j].amountUnstaked / stakes[j].unstakeCount
          obj.unstakedToStakedPercent = 100 * (stakes[j].amountUnstaked/stakes[j].amountStaked)
          obj.unstakedToTotalStakedPercent = 100 * (stakes[j].amountUnstaked / stakes[j].currentStaked)
        }
      }
      data.push(obj)
    }
    return data
  }
  catch(err)
  {
      console.log(err)
  }
    
}
/**

    * @dev : Get stakes (minutes)

*/
export async function getStakesInfoMinute(startTimestamp, days)
{
  let stakeQuery = `

  {
      stakeYears(first: 100 orderBy:timestamp) {
    
        dayStake(first: 365 orderBy:timestamp) {
          hourStake(first: 24, orderBy:timestamp)
          {
            minuteStake(first:60 orderBy:timestamp)
            {
              id
              amountStaked
              amountUnstaked
              currentStaked
              timestamp
              stakeCount
              unstakeCount
              stakeMax
              unstakeMax
            }
          }
          
        }
      }
    }
  `

  try
  {
    const stakeData = await axios({
      url: 'https://api.thegraph.com/subgraphs/id/QmPR96VPnd3y4zrtaEJ2bttPffC6VHt971UVKorEn5qM2w',
      method: 'post',
      data: {
        query: stakeQuery
      }
    }) 
    const stakesData = stakeData.data.data.stakeYears
    let data = []
    let stakes = []
    for(let k = 0; k < stakesData.length; ++k)
    {
      for(let i = 0; i < stakesData[k].dayStake.length; ++i)
      {
        for(let j = 0; j < stakesData[k].dayStake[i].hourStake.length; ++j)
        {
          for(let c = 0; c < stakesData[k].dayStake[i].hourStake[j].minuteStake.length; ++c)
          {
            let obj = {}
            obj.stakeCount = stakesData[k].dayStake[i].hourStake[j].minuteStake[c].stakeCount
            obj.unstakeCount = stakesData[k].dayStake[i].hourStake[j].minuteStake[c].unstakeCount
            obj.amountStaked = stakesData[k].dayStake[i].hourStake[j].minuteStake[c].amountStaked
            obj.amountUnstaked = stakesData[k].dayStake[i].hourStake[j].minuteStake[c].amountUnstaked
            obj.timestamp = stakesData[k].dayStake[i].hourStake[j].minuteStake[c].timestamp
            obj.currentStaked = stakesData[k].dayStake[i].hourStake[j].minuteStake[c].currentStaked
            obj.stakeMax = stakesData[k].dayStake[i].hourStake[j].minuteStake[c].stakeMax
            obj.unstakeMax = stakesData[k].dayStake[i].hourStake[j].minuteStake[c].unstakeMax
            stakes.push(obj)
          }
        }
      }
    }
    
    for(let i = 0; i < 60*24*days; ++i)
    {
      let beginTimestamp = startTimestamp + i * 60
      let endTimestamp = startTimestamp + (i+1) * 60
      let obj = {
        beginTimestamp: beginTimestamp,
        endTimestamp: endTimestamp,
        stakeCount: 0,
        unstakeCount: 0,
        amountStaked: 0,
        amountUnstaked: 0,
        currentStaked: 0,
        stakeMax: 0,
        unstakeMax: 0,
        stakeAvg: 0,
        unstakeAvg: 0,
        unstakedToStakedPercent: 0,
        unstakedToTotalStakedPercent: 0
      }
      for(let j = 0; j < stakes.length; ++j)
      {
        if(beginTimestamp <= stakes[j].timestamp && stakes[j].timestamp < endTimestamp)
        {
          obj.stakeCount = stakes[j].stakeCount
          obj.unstakeCount = stakes[j].unstakeCount
          obj.amountStaked = stakes[j].amountStaked
          obj.amountUnstaked = stakes[j].amountUnstaked
          obj.currentStaked = stakes[j].currentStaked
          obj.timestamp = stakes[j].timestamp
          obj.stakeMax = stakes[j].stakeMax
          obj.unstakeMax = stakes[j].unstakeMax
          obj.stakeAvg = stakes[j].amountStaked / stakes[j].stakeCount
          obj.unstakeAvg = stakes[j].amountUnstaked / stakes[j].unstakeCount
          obj.unstakedToStakedPercent = 100 * (stakes[j].amountUnstaked/stakes[j].amountStaked)
          obj.unstakedToTotalStakedPercent = 100 * (stakes[j].amountUnstaked / stakes[j].currentStaked)
        }
      }
      data.push(obj)
    }
    return data
  }
  catch(err)
  {
    console.log(err)
  }
    
}