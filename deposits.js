import axios from 'axios'

export async function getDepositsInfoDays(startTimestamp, days)
{
    let depositQuery = `
    {
        depositYearDaiEntities(first: 100 orderBy:timestamp) {
          
          dayDeposit(first: 365 orderBy:timestamp) {
            
            id
            amount
            depositCount
            timestamp
          }
        }
        depositYearETHEntities(first: 100 orderBy:timestamp) {
          
          dayDeposit(first: 365 orderBy:timestamp) {
            
            id
            amount
            depositCount
            timestamp
          }
        }
        depositYearFraxEntities(first: 100 orderBy:timestamp) {
          
          dayDeposit(first: 365 orderBy:timestamp) {
            
            id
                  amount
                  depositCount
                  timestamp
          }
        }
        
        depositYearLusdEntities(first: 100 orderBy:timestamp) {
          
          dayDeposit(first: 365 orderBy:timestamp) {
            
            id
                  amount
                  depositCount
                  timestamp
          }
        }
        
        depositYearOHMDAIEntities(first: 100 orderBy:timestamp) {
          
          dayDeposit(first: 365 orderBy:timestamp) {
            
            id
                  amount
                  depositCount
                  timestamp
          }
        }
        
        depositYearOHMFRAXEntities(first: 100 orderBy:timestamp) {
          
          dayDeposit(first: 365 orderBy:timestamp) {
            
            id
                  amount
                  depositCount
                  timestamp
          }
        }
      }

    `

    try
    {
        const depositData = await axios({
            url: 'https://api.thegraph.com/subgraphs/name/limenal/olympus-stake',
            method: 'post',
            data: {
              query: depositQuery
            }
        }) 
        const daiDeposits = depositData.data.data.depositYearDaiEntities
        const ethDeposits = depositData.data.data.depositYearETHEntities
        const fraxDeposits = depositData.data.data.depositYearFraxEntities
        const lusdDeposits = depositData.data.data.depositYearLusdEntities
        const ohmDaiDeposits = depositData.data.data.depositYearOHMDAIEntities
        const ohmFraxDeposits = depositData.data.data.depositYearOHMFRAXEntities
        let data = []
        for(let i = 0; i < days - 1; ++i)
        {
            
            let beginTimestamp = startTimestamp + i * 86400
            let endTimestamp = startTimestamp + (i+1) * 86400
            let obj = {
                amountDaiDay: 0,
                amountEthDay: 0,
                amountFraxDay: 0,
                amountLusdDay: 0,
                amountOhmdaiDay: 0,
                amountOhmFraxDay: 0,
                depositCountDai: 0,
                depositCountEth: 0,
                depositCountFrax: 0,
                depositCountOhmDai: 0,
                depositCountOhmFrax: 0,
                beginTimestamp: beginTimestamp,
                endTimestamp: endTimestamp

            }
            for(let j = 0; j < daiDeposits[0].dayDeposit.length; ++j)
            {
                if(beginTimestamp <= daiDeposits[0].dayDeposit[j].timestamp && daiDeposits[0].dayDeposit[j].timestamp < endTimestamp )
                {
                    obj.amountDaiDay = daiDeposits[0].dayDeposit[j].amount
                    obj.depositCountDai = daiDeposits[0].dayDeposit[j].depositCount
                }
            
            }

            for(let j = 0; j < ethDeposits[0].dayDeposit.length; ++j)
            {
                if(beginTimestamp <= ethDeposits[0].dayDeposit[j].timestamp && ethDeposits[0].dayDeposit[j].timestamp < endTimestamp )
                {
                    obj.amountEthDay = ethDeposits[0].dayDeposit[j].amount
                    obj.depositCountEth = ethDeposits[0].dayDeposit[j].depositCount
                }
            
            }

            for(let j = 0; j < fraxDeposits[0].dayDeposit.length; ++j)
            {
                if(beginTimestamp <= fraxDeposits[0].dayDeposit[j].timestamp && fraxDeposits[0].dayDeposit[j].timestamp < endTimestamp )
                {
                    obj.amountFraxDay = fraxDeposits[0].dayDeposit[j].amount
                    obj.depositCountFrax = fraxDeposits[0].dayDeposit[j].depositCount
                }
            }

            for(let j = 0; j < lusdDeposits[0].dayDeposit.length; ++j)
            {
                if(beginTimestamp <= lusdDeposits[0].dayDeposit[j].timestamp && lusdDeposits[0].dayDeposit[j].timestamp < endTimestamp )
                {
                    obj.amountLusdDay = lusdDeposits[0].dayDeposit[j].amount
                    obj.depositCountLusd = lusdDeposits[0].dayDeposit[j].depositCount
                }
            }

            for(let j = 0; j < ohmDaiDeposits[0].dayDeposit.length; ++j)
            {
                if(beginTimestamp <= ohmDaiDeposits[0].dayDeposit[j].timestamp && ohmDaiDeposits[0].dayDeposit[j].timestamp < endTimestamp )
                {
                    obj.amountOhmdaiDay = ohmDaiDeposits[0].dayDeposit[j].amount
                    obj.depositCountOhmDai = ohmDaiDeposits[0].dayDeposit[j].depositCount
                }
            }
            for(let j = 0; j < ohmFraxDeposits[0].dayDeposit.length; ++j)
            {
                if(beginTimestamp <= ohmFraxDeposits[0].dayDeposit[j].timestamp && ohmFraxDeposits[0].dayDeposit[j].timestamp < endTimestamp )
                {
                    obj.amountOhmFraxDay = ohmFraxDeposits[0].dayDeposit[j].amount
                    obj.depositCountOhmFrax = ohmFraxDeposits[0].dayDeposit[j].depositCount
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

export async function getDepositsInfoHours(startTimestamp, days)
{
    let depositQuery = `
    {
        depositYearDaiEntities(first: 100 orderBy:timestamp) {
          
          dayDeposit(first: 365 orderBy:timestamp) {
            
            hourDeposit(first: 24 orderBy:timestamp) {
              id
                  amount
                  timestamp
                  depositCount
              
            }
          }
        }
        depositYearETHEntities(first: 100 orderBy:timestamp) {
          
            dayDeposit(first: 365 orderBy:timestamp) {
                
              hourDeposit(first: 24 orderBy:timestamp) {
                id
                    amount
                    timestamp
                    depositCount
                
              }
            }
          }
          depositYearFraxEntities(first: 100 orderBy:timestamp) {
          
            dayDeposit(first: 365 orderBy:timestamp) {
                
              hourDeposit(first: 24 orderBy:timestamp) {
                id
                    amount
                    timestamp
                    depositCount
                
              }
            }
          }
          depositYearLusdEntities(first: 100 orderBy:timestamp) {
          
            dayDeposit(first: 365 orderBy:timestamp) {
                
              hourDeposit(first: 24 orderBy:timestamp) {
                id
                    amount
                    timestamp
                    depositCount
                
              }
            }
          }
          depositYearOHMDAIEntities(first: 100 orderBy:timestamp) {
          
            dayDeposit(first: 365 orderBy:timestamp) {
                
              hourDeposit(first: 24 orderBy:timestamp) {
                id
                    amount
                    timestamp
                    depositCount
                
              }
            }
          }
          depositYearOHMFRAXEntities(first: 100 orderBy:timestamp) {
          
            dayDeposit(first: 365 orderBy:timestamp) {
                
              hourDeposit(first: 24 orderBy:timestamp) {
                id
                    amount
                    timestamp
                    depositCount
                
              }
            }
          }

      }
    
    `
    try{
        const depositData = await axios({
            url: 'https://api.thegraph.com/subgraphs/name/limenal/olympus-stake',
            method: 'post',
            data: {
              query: depositQuery
            }
        }) 
        const daiDeposits = depositData.data.data.depositYearDaiEntities
        const ethDeposits = depositData.data.data.depositYearETHEntities
        const fraxDeposits = depositData.data.data.depositYearFraxEntities
        const lusdDeposits = depositData.data.data.depositYearLusdEntities
        const ohmDaiDeposits = depositData.data.data.depositYearOHMDAIEntities
        const ohmFraxDeposits = depositData.data.data.depositYearOHMFRAXEntities
        let data = []
        
        let daiArray = []
        let ethArray = []
        let fraxArray = []
        let lusdArray = []
        let ohmDaiArray = []
        let ohmFraxArray = []
        for(let i = 0; i < daiDeposits[0].dayDeposit.length; ++i)
        {
            
            for(let k = 0; k < daiDeposits[0].dayDeposit[i].hourDeposit.length; ++k)
            {
                let obj = {}
                obj.amountDaiHour = daiDeposits[0].dayDeposit[i].hourDeposit[k].amount
                obj.depositCountDai = daiDeposits[0].dayDeposit[i].hourDeposit[k].depositCount
                obj.timestamp = daiDeposits[0].dayDeposit[i].hourDeposit[k].timestamp
                daiArray.push(obj)
            }
        }
        for(let i = 0; i < ethDeposits[0].dayDeposit.length; ++i)
        {
            
            for(let k = 0; k < ethDeposits[0].dayDeposit[i].hourDeposit.length; ++k)
            {
                let obj = {}
                obj.amountEthHour = ethDeposits[0].dayDeposit[i].hourDeposit[k].amount
                obj.depositCountEth = ethDeposits[0].dayDeposit[i].hourDeposit[k].depositCount
                obj.timestamp = ethDeposits[0].dayDeposit[i].hourDeposit[k].timestamp
                ethArray.push(obj)
            }
        }

        for(let i = 0; i < fraxDeposits[0].dayDeposit.length; ++i)
        {
            
            for(let k = 0; k < fraxDeposits[0].dayDeposit[i].hourDeposit.length; ++k)
            {
                let obj = {}
                obj.amountFraxHour = fraxDeposits[0].dayDeposit[i].hourDeposit[k].amount
                obj.depositCountFrax = fraxDeposits[0].dayDeposit[i].hourDeposit[k].depositCount
                obj.timestamp = fraxDeposits[0].dayDeposit[i].hourDeposit[k].timestamp
                fraxArray.push(obj)
            }
        }

        for(let i = 0; i < lusdDeposits[0].dayDeposit.length; ++i)
        {
            
            for(let k = 0; k < lusdDeposits[0].dayDeposit[i].hourDeposit.length; ++k)
            {
                let obj = {}
                obj.amountLusdHour = lusdDeposits[0].dayDeposit[i].hourDeposit[k].amount
                obj.depositCountLusd = lusdDeposits[0].dayDeposit[i].hourDeposit[k].depositCount
                obj.timestamp = lusdDeposits[0].dayDeposit[i].hourDeposit[k].timestamp
                lusdArray.push(obj)
            }
        }
        for(let i = 0; i < ohmDaiDeposits[0].dayDeposit.length; ++i)
        {
            
            for(let k = 0; k < ohmDaiDeposits[0].dayDeposit[i].hourDeposit.length; ++k)
            {
                let obj = {}
                obj.amountOhmDaiHour = ohmDaiDeposits[0].dayDeposit[i].hourDeposit[k].amount
                obj.depositCountOhmDai = ohmDaiDeposits[0].dayDeposit[i].hourDeposit[k].depositCount
                obj.timestamp = ohmDaiDeposits[0].dayDeposit[i].hourDeposit[k].timestamp
                ohmDaiArray.push(obj)
            }
        }
        for(let i = 0; i < ohmFraxDeposits[0].dayDeposit.length; ++i)
        {
            
            for(let k = 0; k < ohmFraxDeposits[0].dayDeposit[i].hourDeposit.length; ++k)
            {
                let obj = {}
                obj.amountOhmFraxHour = ohmFraxDeposits[0].dayDeposit[i].hourDeposit[k].amount
                obj.depositCountOhmFrax = ohmFraxDeposits[0].dayDeposit[i].hourDeposit[k].depositCount
                obj.timestamp = ohmFraxDeposits[0].dayDeposit[i].hourDeposit[k].timestamp
                ohmFraxArray.push(obj)
            }
        }

        for(let i = 0; i < 24*days; ++i)
        {
            let beginTimestamp = startTimestamp + i * 3600
            let endTimestamp = startTimestamp + (i+1) * 3600
            let obj = {
                amountDaiHour: 0,
                amountEthHour: 0,
                amountFraxHour: 0,
                amountLusdHour: 0,
                amountOhmDaiHour: 0,
                amountOhmFraxHour: 0,
                depositCountDai: 0,
                depositCountEth: 0,
                depositCountFrax: 0,
                depositCountOhmDai: 0,
                depositCountOhmFrax: 0,
                beginTimestamp: beginTimestamp,
                endTimestamp: endTimestamp
            }
            for(let j = 0; j < daiArray.length; ++j)
            {  
                if(beginTimestamp <= daiArray[j].timestamp && daiArray[j].timestamp < endTimestamp)
                {
                    
                    obj.amountDaiHour = daiArray[j].amountDaiHour
                    obj.depositCountDai = daiArray[j].depositCountDai    
                }

            }
            for(let j = 0; j < ethArray.length; ++j)
            {  
                if(beginTimestamp <= ethArray[j].timestamp && ethArray[j].timestamp < endTimestamp)
                {
                    
                    obj.amountEthHour = ethArray[j].amountEthHour
                    obj.depositCountEth = ethArray[j].depositCountEth    
                }

            }
            for(let j = 0; j < fraxArray.length; ++j)
            {  
                if(beginTimestamp <= fraxArray[j].timestamp && fraxArray[j].timestamp < endTimestamp)
                {
                    obj.amountFraxHour = fraxArray[j].amountFraxHour
                    obj.depositCountFrax = fraxArray[j].depositCountFrax
                }
            }
            for(let j = 0; j < lusdArray.length; ++j)
            {  
                if(beginTimestamp <= lusdArray[j].timestamp && lusdArray[j].timestamp < endTimestamp)
                {
                    obj.amountLusdHour = lusdArray[j].amountLusdHour
                    obj.depositCountLusd = lusdArray[j].depositCountLusd   
                }
            }
            for(let j = 0; j < ohmDaiArray.length; ++j)
            {  
                if(beginTimestamp <= ohmDaiArray[j].timestamp && ohmDaiArray[j].timestamp < endTimestamp)
                {
                    obj.amountOhmDaiHour = ohmDaiArray[j].amountOhmDaiHour
                    obj.depositCountOhmDai = ohmDaiArray[j].depositCountOhmDai
                }
            }
            for(let j = 0; j < ohmFraxArray.length; ++j)
            {  
                if(beginTimestamp <= ohmFraxArray[j].timestamp && ohmFraxArray[j].timestamp < endTimestamp)
                {
                    obj.amountOhmFraxHour = ohmFraxArray[j].amountOhmFraxHour
                    obj.depositCountOhmFrax = ohmFraxArray[j].depositCountOhmFrax
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

export async function getDepositsInfoMinutes(startTimestamp, days)
{
    let depositQueryDai = `
    {
        depositYearDaiEntities(first: 100 orderBy:timestamp) {
          
          dayDeposit(first: 365 orderBy:timestamp) {
            
            hourDeposit(first: 24 orderBy:timestamp) {
                minuteDeposit(first: 60 orderBy:timestamp)
                {
                    id
                    amount
                    depositCount
                    timestamp
                }
              
            }
          }
        }
      }
    
    `
    let depositQueryEth = `
    {
        depositYearETHEntities(first: 100 orderBy:timestamp) {
          
          dayDeposit(first: 365 orderBy:timestamp) {
            
            hourDeposit(first: 24 orderBy:timestamp) {
                minuteDeposit(first: 60 orderBy:timestamp)
                {
                    id
                    amount
                    depositCount
                    timestamp
                }
              
            }
          }
        }
      }
    
    `
    let depositQueryFrax = `
    {
        depositYearFraxEntities(first: 100 orderBy:timestamp) {
          
          dayDeposit(first: 365 orderBy:timestamp) {
            
            hourDeposit(first: 24 orderBy:timestamp) {
                minuteDeposit(first: 60 orderBy:timestamp)
                {
                    id
                    amount
                    depositCount
                    timestamp
                }
              
            }
          }
        }
      }
    `
    let depositQueryLusd = `
    {
        depositYearLusdEntities(first: 100 orderBy:timestamp) {
          
          dayDeposit(first: 365 orderBy:timestamp) {
            
            hourDeposit(first: 24 orderBy:timestamp) {
                minuteDeposit(first: 60 orderBy:timestamp)
                {
                    id
                    amount
                    depositCount
                    timestamp
                }
              
            }
          }
        }
      }
    `

    let depositQueryOhmDai = `
    {
        depositYearOHMDAIEntities(first: 100 orderBy:timestamp) {
          
          dayDeposit(first: 365 orderBy:timestamp) {
            
            hourDeposit(first: 24 orderBy:timestamp) {
                minuteDeposit(first: 60 orderBy:timestamp)
                {
                    id
                    amount
                    depositCount
                    timestamp
                }
              
            }
          }
        }
      }
    `

    let depositQueryOhmFrax = `
    {
        depositYearOHMFRAXEntities(first: 100 orderBy:timestamp) {
          
          dayDeposit(first: 365 orderBy:timestamp) {
            
            hourDeposit(first: 24 orderBy:timestamp) {
                minuteDeposit(first: 60 orderBy:timestamp)
                {
                    id
                    amount
                    depositCount
                    timestamp
                }
              
            }
          }
        }
      }
    `

    try
    {
        const depositDataDai = await axios({
            url: 'https://api.thegraph.com/subgraphs/name/limenal/olympus-stake',
            method: 'post',
            data: {
              query: depositQueryDai
            }
        }) 
        const depositDataEth = await axios({
            url: 'https://api.thegraph.com/subgraphs/name/limenal/olympus-stake',
            method: 'post',
            data: {
              query: depositQueryEth
            }
        })
        const depositDataFrax = await axios({
            url: 'https://api.thegraph.com/subgraphs/name/limenal/olympus-stake',
            method: 'post',
            data: {
              query: depositQueryFrax
            }
        })

        const depositDataLusd = await axios({
            url: 'https://api.thegraph.com/subgraphs/name/limenal/olympus-stake',
            method: 'post',
            data: {
              query: depositQueryLusd
            }
        })
        const depositDataOhmDai = await axios({
            url: 'https://api.thegraph.com/subgraphs/name/limenal/olympus-stake',
            method: 'post',
            data: {
              query: depositQueryOhmDai
            }
        })
        const depositDataOhmFrax = await axios({
            url: 'https://api.thegraph.com/subgraphs/name/limenal/olympus-stake',
            method: 'post',
            data: {
              query: depositQueryOhmFrax
            }
        })
        const daiDeposits = depositDataDai.data.data.depositYearDaiEntities
        const ethDeposits = depositDataEth.data.data.depositYearETHEntities
        const fraxDeposits = depositDataFrax.data.data.depositYearFraxEntities
        const lusdDeposits = depositDataLusd.data.data.depositYearLusdEntities
        const ohmDaiDeposits = depositDataOhmDai.data.data.depositYearOHMDAIEntities
        const ohmFraxDeposits = depositDataOhmFrax.data.data.depositYearOHMFRAXEntities
        let data = []
        
        let daiArray = []
        let ethArray = []
        let fraxArray = []
        let lusdArray = []
        let ohmDaiArray = []
        let ohmFraxArray = []

        for(let i = 0; i < daiDeposits[0].dayDeposit.length; ++i)
        {
            for(let j = 0; j < daiDeposits[0].dayDeposit[i].hourDeposit.length; ++j)
            {
                for(let k = 0; k < daiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit.length; ++k)
                {
                    
                    let obj = {}
                    obj.amountDaiMinute = daiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                    obj.depositCountDai = daiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                    obj.timestamp = daiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].timestamp
                    daiArray.push(obj)
    
                }
            }
        }

        for(let i = 0; i < ethDeposits[0].dayDeposit.length; ++i)
        {
            for(let j = 0; j < ethDeposits[0].dayDeposit[i].hourDeposit.length; ++j)
            {
                for(let k = 0; k < ethDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit.length; ++k)
                {
                    
                    let obj = {}
                    obj.amountEthMinute = ethDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                    obj.depositCountEth = ethDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                    obj.timestamp = ethDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].timestamp
                    ethArray.push(obj)
    
                }
            }
        }

        for(let i = 0; i < fraxDeposits[0].dayDeposit.length; ++i)
        {
            for(let j = 0; j < fraxDeposits[0].dayDeposit[i].hourDeposit.length; ++j)
            {
                for(let k = 0; k < fraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit.length; ++k)
                {
                    
                    let obj = {}
                    obj.amountFraxMinute = fraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                    obj.depositCountFrax = fraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                    obj.timestamp = fraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].timestamp
                    fraxArray.push(obj)
    
                }
            }
        }
        for(let i = 0; i < lusdDeposits[0].dayDeposit.length; ++i)
        {
            for(let j = 0; j < lusdDeposits[0].dayDeposit[i].hourDeposit.length; ++j)
            {
                for(let k = 0; k < lusdDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit.length; ++k)
                {
                    
                    let obj = {}
                    obj.amountLusdMinute = lusdDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                    obj.depositCountLusd = lusdDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                    obj.timestamp = lusdDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].timestamp
                    lusdArray.push(obj)
    
                }
            }
        }
        for(let i = 0; i < ohmDaiDeposits[0].dayDeposit.length; ++i)
        {
            for(let j = 0; j < ohmDaiDeposits[0].dayDeposit[i].hourDeposit.length; ++j)
            {
                for(let k = 0; k < ohmDaiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit.length; ++k)
                {
                    
                    let obj = {}
                    obj.amountOhmDaiMinute = ohmDaiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                    obj.depositCountOhmDai = ohmDaiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                    obj.timestamp = ohmDaiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].timestamp
                    ohmDaiArray.push(obj)
    
                }
            }
        }
        for(let i = 0; i < ohmFraxDeposits[0].dayDeposit.length; ++i)
        {
            for(let j = 0; j < ohmFraxDeposits[0].dayDeposit[i].hourDeposit.length; ++j)
            {
                for(let k = 0; k < ohmFraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit.length; ++k)
                {
                    
                    let obj = {}
                    obj.amountOhmFraxMinute = ohmFraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                    obj.depositCountOhmFrax = ohmFraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                    obj.timestamp = ohmFraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].timestamp
                    ohmFraxArray.push(obj)
    
                }
            }
        }
        for(let i = 0; i < 60*24*days; ++i)
        {
            let beginTimestamp = startTimestamp + i * 60
            let endTimestamp = startTimestamp + (i+1) * 60
            let obj = {
                amountDaiHour: 0,
                amountEthHour: 0,
                amountFraxHour: 0,
                amountLusdHour: 0,
                amountOhmDaiHour: 0,
                amountOhmFraxHour: 0,
                depositCountDai: 0,
                depositCountEth: 0,
                depositCountFrax: 0,
                depositCountOhmDai: 0,
                depositCountOhmFrax: 0,
                beginTimestamp: beginTimestamp,
                endTimestamp: endTimestamp
            }
            for(let j = 0; j < daiArray.length; ++j)
            {  
                if(beginTimestamp <= daiArray[j].timestamp && daiArray[j].timestamp < endTimestamp)
                {
                    
                    obj.amountDaiMinute = daiArray[j].amountDaiMinute
                    obj.depositCountDai = daiArray[j].depositCountDai
                }

            }
            for(let j = 0; j < ethArray.length; ++j)
            {  
                if(beginTimestamp <= ethArray[j].timestamp && ethArray[j].timestamp < endTimestamp)
                {
                    
                    obj.amountEthMinute = ethArray[j].amountEthMinute
                    obj.depositCountEth = ethArray[j].depositCountEth    
                }

            }
            for(let j = 0; j < fraxArray.length; ++j)
            {  
                if(beginTimestamp <= fraxArray[j].timestamp && fraxArray[j].timestamp < endTimestamp)
                {
                    obj.amountFraxMinute = fraxArray[j].amountFraxMinute
                    obj.depositCountFrax = fraxArray[j].depositCountFrax
                }
            }
            for(let j = 0; j < lusdArray.length; ++j)
            {  
                if(beginTimestamp <= lusdArray[j].timestamp && lusdArray[j].timestamp < endTimestamp)
                {
                    obj.amountLusdMinute = lusdArray[j].amountLusdMinute
                    obj.depositCountLusd = lusdArray[j].depositCountLusd   
                }
            }
            for(let j = 0; j < ohmDaiArray.length; ++j)
            {  
                if(beginTimestamp <= ohmDaiArray[j].timestamp && ohmDaiArray[j].timestamp < endTimestamp)
                {
                    obj.amountOhmDaiMinute = ohmDaiArray[j].amountOhmDaiMinute
                    obj.depositCountOhmDai = ohmDaiArray[j].depositCountOhmDai
                }
            }
            for(let j = 0; j < ohmFraxArray.length; ++j)
            {  
                if(beginTimestamp <= ohmFraxArray[j].timestamp && ohmFraxArray[j].timestamp < endTimestamp)
                {
                    obj.amountOhmFraxMinute = ohmFraxArray[j].amountOhmFraxMinute
                    obj.depositCountOhmFrax = ohmFraxArray[j].depositCountOhmFrax
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