import axios from 'axios'
/**

    * @dev : Get deposits (days)

*/
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
            redeemCount
            payout
          }
        }
        depositYearETHEntities(first: 100 orderBy:timestamp) {
          
          dayDeposit(first: 365 orderBy:timestamp) {
            
            id
            amount
            depositCount
            timestamp
            redeemCount
            payout
          }
        }
        depositYearFraxEntities(first: 100 orderBy:timestamp) {
          
          dayDeposit(first: 365 orderBy:timestamp) {
            
            id
                  amount
                  depositCount
                  timestamp
                  redeemCount
                  payout
          }
        }
        
        depositYearLusdEntities(first: 100 orderBy:timestamp) {
          
          dayDeposit(first: 365 orderBy:timestamp) {
            
            id
                  amount
                  depositCount
                  timestamp
                  redeemCount
                  payout
          }
        }
        
        depositYearOHMDAIEntities(first: 100 orderBy:timestamp) {
          
          dayDeposit(first: 365 orderBy:timestamp) {
            
            id
                  amount
                  depositCount
                  timestamp
                  redeemCount
                  payout
          }
        }
        
        depositYearOHMFRAXEntities(first: 100 orderBy:timestamp) {
          
          dayDeposit(first: 365 orderBy:timestamp) {
            
            id
                  amount
                  depositCount
                  timestamp
                  redeemCount
                  payout
          }
        }
      }

    `

    try
    {
        const depositData = await axios({
            url: 'https://api.thegraph.com/subgraphs/id/QmPR96VPnd3y4zrtaEJ2bttPffC6VHt971UVKorEn5qM2w',
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
                amountDai: 0,
                amountEth: 0,
                amountFrax: 0,
                amountLusd: 0,
                amountOhmDai: 0,
                amountOhmFrax: 0,
                amountDaiAvg: 0,
                amountEthAvg: 0,
                amountLusdAvg: 0,
                amountFraxAvg: 0,
                amountOhmDaiAvg: 0,
                amountOhmFraxAvg:0,
                payoutDai: 0,
                payoutEth: 0,
                payoutFrax: 0,
                payoutLusd: 0,
                payoutOhmDai: 0,
                payoutOhmFrax: 0,
                depositCountDai: 0,
                depositCountEth: 0,
                depositCountLusd: 0,
                depositCountFrax: 0,
                depositCountOhmDai: 0,
                depositCountOhmFrax: 0,
                redeemCountDai: 0,
                redeemCountLusd: 0,
                redeemCountEth: 0,
                redeemCountFrax: 0,
                redeemCountOhmDai: 0,
                redeemCountOhmFrax: 0,
                beginTimestamp: beginTimestamp,
                endTimestamp: endTimestamp
            }
            if(daiDeposits.length != 0)
            {
                for(let j = 0; j < daiDeposits[0].dayDeposit.length; ++j)
                {
                    if(beginTimestamp <= daiDeposits[0].dayDeposit[j].timestamp && daiDeposits[0].dayDeposit[j].timestamp < endTimestamp )
                    {
                        obj.amountDai = daiDeposits[0].dayDeposit[j].amount
                        obj.depositCountDai = daiDeposits[0].dayDeposit[j].depositCount
                        obj.redeemCountDai = daiDeposits[0].dayDeposit[j].redeemCount
                        obj.payoutDai = daiDeposits[0].dayDeposit[j].payout
                        if(daiDeposits[0].dayDeposit[j].depositCount != 0)
                        {
                            obj.amountDaiAvg = daiDeposits[0].dayDeposit[j].amount/ daiDeposits[0].dayDeposit[j].depositCount
                        }
                    }
                
                }
            }
            
            if(ethDeposits.length != 0)
            {
                for(let j = 0; j < ethDeposits[0].dayDeposit.length; ++j)
                {
                    if(beginTimestamp <= ethDeposits[0].dayDeposit[j].timestamp && ethDeposits[0].dayDeposit[j].timestamp < endTimestamp )
                    {
                        obj.amountEth = ethDeposits[0].dayDeposit[j].amount
                        obj.depositCountEth = ethDeposits[0].dayDeposit[j].depositCount
                        obj.redeemCountEth = ethDeposits[0].dayDeposit[j].redeemCount
                        obj.payoutEth = ethDeposits[0].dayDeposit[j].payout
                        if(ethDeposits[0].dayDeposit[j].depositCount != 0)
                        {
                            obj.amountEthAvg = ethDeposits[0].dayDeposit[j].amount/ ethDeposits[0].dayDeposit[j].depositCount
                        }
                    }
                
                }
            }
            if(fraxDeposits.length != 0)
            {
                for(let j = 0; j < fraxDeposits[0].dayDeposit.length; ++j)
                {
                    if(beginTimestamp <= fraxDeposits[0].dayDeposit[j].timestamp && fraxDeposits[0].dayDeposit[j].timestamp < endTimestamp )
                    {
                        obj.amountFrax = fraxDeposits[0].dayDeposit[j].amount
                        obj.depositCountFrax = fraxDeposits[0].dayDeposit[j].depositCount
                        obj.redeemCountFrax = fraxDeposits[0].dayDeposit[j].redeemCount
                        obj.payoutFrax = fraxDeposits[0].dayDeposit[j].payout
                        if(fraxDeposits[0].dayDeposit[j].depositCount != 0)
                        {
                            obj.amountFraxAvg = fraxDeposits[0].dayDeposit[j].amount/ fraxDeposits[0].dayDeposit[j].depositCount
                        }
                    }
                }
            }
            
            if(lusdDeposits.length != 0)
            {
                for(let j = 0; j < lusdDeposits[0].dayDeposit.length; ++j)
                {
                    if(beginTimestamp <= lusdDeposits[0].dayDeposit[j].timestamp && lusdDeposits[0].dayDeposit[j].timestamp < endTimestamp )
                    {
                        obj.amountLusd = lusdDeposits[0].dayDeposit[j].amount
                        obj.depositCountLusd = lusdDeposits[0].dayDeposit[j].depositCount
                        obj.redeemCountLusd = lusdDeposits[0].dayDeposit[j].redeemCount
                        obj.payoutLusd = lusdDeposits[0].dayDeposit[j].payout
                        if(lusdDeposits[0].dayDeposit[j].depositCount != 0)
                        {
                            obj.amountLusdAvg = lusdDeposits[0].dayDeposit[j].amount/ lusdDeposits[0].dayDeposit[j].depositCount
                        }
                    }
                }
    
            }
            if(ohmDaiDeposits.length != 0 )
            {
                for(let j = 0; j < ohmDaiDeposits[0].dayDeposit.length; ++j)
                {
                    if(beginTimestamp <= ohmDaiDeposits[0].dayDeposit[j].timestamp && ohmDaiDeposits[0].dayDeposit[j].timestamp < endTimestamp )
                    {
                        obj.amountOhmDai = ohmDaiDeposits[0].dayDeposit[j].amount
                        obj.depositCountOhmDai = ohmDaiDeposits[0].dayDeposit[j].depositCount
                        obj.redeemCountOhmDai = ohmDaiDeposits[0].dayDeposit[j].redeemCount
                        obj.payoutOhmDai = ohmDaiDeposits[0].dayDeposit[j].payout
                        if(ohmDaiDeposits[0].dayDeposit[j].depositCount != 0)
                        {
                            obj.amountOhmDaidAvg = ohmDaiDeposits[0].dayDeposit[j].amount/ ohmDaiDeposits[0].dayDeposit[j].depositCount
                        }
                    }
                }
            }
            
            if(ohmFraxDeposits.length != 0)
            {
                for(let j = 0; j < ohmFraxDeposits[0].dayDeposit.length; ++j)
                {
                    if(beginTimestamp <= ohmFraxDeposits[0].dayDeposit[j].timestamp && ohmFraxDeposits[0].dayDeposit[j].timestamp < endTimestamp )
                    {
                        obj.amountOhmFrax = ohmFraxDeposits[0].dayDeposit[j].amount
                        obj.depositCountOhmFrax = ohmFraxDeposits[0].dayDeposit[j].depositCount
                        obj.redeemCountOhmFrax = ohmFraxDeposits[0].dayDeposit[j].redeemCount
                        obj.payoutOhmFrax = ohmFraxDeposits[0].dayDeposit[j].payout
                        if(ohmFraxDeposits[0].dayDeposit[j].depositCount != 0)
                        {
                            obj.amountOhmFraxAvg = ohmFraxDeposits[0].dayDeposit[j].amount/ ohmFraxDeposits[0].dayDeposit[j].depositCount
                        }
                    }
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

    * @dev : Get deposits (hours)

*/
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
                  redeemCount
                  payout
              
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
                    redeemCount
                    payout
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
                    redeemCount
                    payout
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
                    redeemCount
                    payout
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
                    redeemCount
                    payout
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
                    redeemCount
                    payout
              }
            }
          }

      }
    
    `
    try{
        const depositData = await axios({
            url: 'https://api.thegraph.com/subgraphs/id/QmPR96VPnd3y4zrtaEJ2bttPffC6VHt971UVKorEn5qM2w',
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

        if(daiDeposits.length != 0)
        {
            for(let i = 0; i < daiDeposits[0].dayDeposit.length; ++i)
            {
                
                for(let k = 0; k < daiDeposits[0].dayDeposit[i].hourDeposit.length; ++k)
                {
                    let obj = {}
                    obj.amountDai = daiDeposits[0].dayDeposit[i].hourDeposit[k].amount
                    obj.payoutDai = daiDeposits[0].dayDeposit[i].hourDeposit[k].payout
                    obj.depositCountDai = daiDeposits[0].dayDeposit[i].hourDeposit[k].depositCount
                    obj.redeemCountDai = daiDeposits[0].dayDeposit[i].hourDeposit[k].redeemCount
                    obj.timestamp = daiDeposits[0].dayDeposit[i].hourDeposit[k].timestamp
                    daiArray.push(obj)
                }
            }
        }
        
        if(ethDeposits.length != 0)
        {
            for(let i = 0; i < ethDeposits[0].dayDeposit.length; ++i)
            {
                
                for(let k = 0; k < ethDeposits[0].dayDeposit[i].hourDeposit.length; ++k)
                {
                    let obj = {}
                    obj.amountEth = ethDeposits[0].dayDeposit[i].hourDeposit[k].amount
                    obj.payoutEth = ethDeposits[0].dayDeposit[i].hourDeposit[k].payout
                    obj.depositCountEth = ethDeposits[0].dayDeposit[i].hourDeposit[k].depositCount
                    obj.redeemCountEth = ethDeposits[0].dayDeposit[i].hourDeposit[k].redeemCount
                    obj.timestamp = ethDeposits[0].dayDeposit[i].hourDeposit[k].timestamp
                    ethArray.push(obj)
                }
            }
        }

        if(fraxDeposits.length != 0)
        {
            for(let i = 0; i < fraxDeposits[0].dayDeposit.length; ++i)
            {
                
                for(let k = 0; k < fraxDeposits[0].dayDeposit[i].hourDeposit.length; ++k)
                {
                    let obj = {}
                    obj.amountFrax = fraxDeposits[0].dayDeposit[i].hourDeposit[k].amount
                    obj.payoutFrax = fraxDeposits[0].dayDeposit[i].hourDeposit[k].payout
                    obj.depositCountFrax = fraxDeposits[0].dayDeposit[i].hourDeposit[k].depositCount
                    obj.redeemCountFrax = fraxDeposits[0].dayDeposit[i].hourDeposit[k].redeemCount
                    obj.timestamp = fraxDeposits[0].dayDeposit[i].hourDeposit[k].timestamp
                    fraxArray.push(obj)
                }
            }
        }
        
        if(lusdDeposits.length != 0)
        {
            for(let i = 0; i < lusdDeposits[0].dayDeposit.length; ++i)
            {
                
                for(let k = 0; k < lusdDeposits[0].dayDeposit[i].hourDeposit.length; ++k)
                {
                    let obj = {}
                    obj.amountLusd = lusdDeposits[0].dayDeposit[i].hourDeposit[k].amount
                    obj.payoutLusd = lusdDeposits[0].dayDeposit[i].hourDeposit[k].payout
                    obj.depositCountLusd = lusdDeposits[0].dayDeposit[i].hourDeposit[k].depositCount
                    obj.redeemCountLusd = lusdDeposits[0].dayDeposit[i].hourDeposit[k].redeemCount
                    obj.timestamp = lusdDeposits[0].dayDeposit[i].hourDeposit[k].timestamp
                    lusdArray.push(obj)
                }
            }
        }
        
        if(ohmFraxDeposits.length != 0)
        {
            for(let i = 0; i < ohmDaiDeposits[0].dayDeposit.length; ++i)
            {
                
                for(let k = 0; k < ohmDaiDeposits[0].dayDeposit[i].hourDeposit.length; ++k)
                {
                    let obj = {}
                    obj.amountOhmDai = ohmDaiDeposits[0].dayDeposit[i].hourDeposit[k].amount
                    obj.payoutOhmDai = ohmDaiDeposits[0].dayDeposit[i].hourDeposit[k].payout
                    obj.depositCountOhmDai = ohmDaiDeposits[0].dayDeposit[i].hourDeposit[k].depositCount
                    obj.redeemCountOhmDai = ohmDaiDeposits[0].dayDeposit[i].hourDeposit[k].redeemCount
                    obj.timestamp = ohmDaiDeposits[0].dayDeposit[i].hourDeposit[k].timestamp
                    ohmDaiArray.push(obj)
                }
            }
        }
        
        if(ohmFraxDeposits.length != 0)
        {
            for(let i = 0; i < ohmFraxDeposits[0].dayDeposit.length; ++i)
            {
                
                for(let k = 0; k < ohmFraxDeposits[0].dayDeposit[i].hourDeposit.length; ++k)
                {
                    let obj = {}
                    obj.amountOhmFrax = ohmFraxDeposits[0].dayDeposit[i].hourDeposit[k].amount
                    obj.payoutOhmFrax = ohmFraxDeposits[0].dayDeposit[i].hourDeposit[k].payout
                    obj.depositCountOhmFrax = ohmFraxDeposits[0].dayDeposit[i].hourDeposit[k].depositCount
                    obj.redeemCountOhmFrax = ohmFraxDeposits[0].dayDeposit[i].hourDeposit[k].redeemCount
                    obj.timestamp = ohmFraxDeposits[0].dayDeposit[i].hourDeposit[k].timestamp
                    ohmFraxArray.push(obj)
                }
            }
        }
        
        for(let i = 0; i < 24*days; ++i)
        {
            let beginTimestamp = startTimestamp + i * 3600
            let endTimestamp = startTimestamp + (i+1) * 3600
            let obj = {
                amountDai: 0,
                amountEth: 0,
                amountFrax: 0,
                amountLusd: 0,
                amountOhmDai: 0,
                amountOhmFrax: 0,
                amountDaiAvg: 0,
                amountEthAvg: 0,
                amountLusdAvg: 0,
                amountFraxAvg: 0,
                amountOhmDaiAvg: 0,
                amountOhmFraxAvg:0,
                payoutDai: 0,
                payoutEth: 0,
                payoutFrax: 0,
                payoutLusd: 0,
                payoutOhmDai: 0,
                payoutOhmFrax: 0,
                depositCountDai: 0,
                depositCountEth: 0,
                depositCountLusd: 0,
                depositCountFrax: 0,
                depositCountOhmDai: 0,
                depositCountOhmFrax: 0,
                redeemCountDai: 0,
                redeemCountLusd: 0,
                redeemCountEth: 0,
                redeemCountFrax: 0,
                redeemCountOhmDai: 0,
                redeemCountOhmFrax: 0,
                beginTimestamp: beginTimestamp,
                endTimestamp: endTimestamp
            }
            for(let j = 0; j < daiArray.length; ++j)
            {  
                if(beginTimestamp <= daiArray[j].timestamp && daiArray[j].timestamp < endTimestamp)
                {
                    
                    obj.amountDai = daiArray[j].amountDai
                    obj.depositCountDai = daiArray[j].depositCountDai
                    obj.redeemCountDai = daiArray[j].redeemCountDai
                    obj.payoutDai = daiArray[j].payoutDai
                    if(daiArray[j].depositCountDai != 0)
                    {
                        obj.amountDaiAvg = daiArray[j].amountDai / daiArray[j].depositCountDai
                    }
                }

            }
            for(let j = 0; j < ethArray.length; ++j)
            {  
                if(beginTimestamp <= ethArray[j].timestamp && ethArray[j].timestamp < endTimestamp)
                {
                    
                    obj.amountEth = ethArray[j].amountEth
                    obj.depositCountEth = ethArray[j].depositCountEth
                    obj.redeemCountEth = ethArray[j].redeemCountEth
                    obj.payoutEth = ethArray[j].payoutEth
                    if(ethArray[j].depositCountEth != 0)
                    {
                        obj.amountEthAvg = ethArray[j].amountEth / ethArray[j].depositCountEth
                    }
                }

            }
            for(let j = 0; j < fraxArray.length; ++j)
            {  
                if(beginTimestamp <= fraxArray[j].timestamp && fraxArray[j].timestamp < endTimestamp)
                {
                    obj.amountFrax = fraxArray[j].amountFrax
                    obj.depositCountFrax = fraxArray[j].depositCountFrax
                    obj.redeemCountFrax = fraxArray[j].redeemCountFrax
                    obj.payoutFrax = fraxArray[j].payoutFrax
                    if(fraxArray[j].depositCountFrax != 0)
                    {
                        obj.amountFraxAvg = fraxArray[j].amountFrax / fraxArray[j].depositCountFrax
                    }
                }
            }
            for(let j = 0; j < lusdArray.length; ++j)
            {  
                if(beginTimestamp <= lusdArray[j].timestamp && lusdArray[j].timestamp < endTimestamp)
                {
                    obj.amountLusd = lusdArray[j].amountLusd
                    obj.depositCountLusd = lusdArray[j].depositCountLusd
                    obj.redeemCountLusd = lusdArray[j].redeemCountLusd
                    obj.payoutLusd = lusdArray[j].payoutLusd
                    if(lusdArray[j].depositCountLusd != 0)
                    {
                        obj.amountLusdAvg = lusdArray[j].amountLusd / lusdArray[j].depositCountLusd
                    }
                }
            }
            for(let j = 0; j < ohmDaiArray.length; ++j)
            {  
                if(beginTimestamp <= ohmDaiArray[j].timestamp && ohmDaiArray[j].timestamp < endTimestamp)
                {
                    obj.amountOhmDai = ohmDaiArray[j].amountOhmDai
                    obj.depositCountOhmDai = ohmDaiArray[j].depositCountOhmDai
                    obj.redeemCountOhmDai = ohmDaiArray[j].redeemCountOhmDai
                    obj.payoutOhmDai = ohmDaiArray[j].payoutOhmDai
                    if(ohmDaiArray[j].depositCountOhmDai != 0)
                    {
                        obj.amountOhmDaiAvg = ohmDaiArray[j].amountOhmDai / ohmDaiArray[j].depositCountOhmDai
                    }
                }
            }
            for(let j = 0; j < ohmFraxArray.length; ++j)
            {  
                if(beginTimestamp <= ohmFraxArray[j].timestamp && ohmFraxArray[j].timestamp < endTimestamp)
                {
                    obj.amountOhmFrax = ohmFraxArray[j].amountOhmFrax
                    obj.depositCountOhmFrax = ohmFraxArray[j].depositCountOhmFrax
                    obj.redeemCountOhmFrax = ohmFraxArray[j].redeemCountOhmFrax
                    obj.payoutOhmFrax = ohmFraxArray[j].payoutOhmFrax
                    if(ohmFraxArray[j].depositCountOhmFrax != 0)
                    {
                        obj.amountOhmFraxAvg = ohmFraxArray[j].amountOhmFrax / ohmFraxArray[j].depositCountOhmFrax
                    }
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

    * @dev : Get deposits (minutes)

*/
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
                    redeemCount
                    payout
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
                    redeemCount
                    payout
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
                    redeemCount
                    payout
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
                    redeemCount
                    payout
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
                    redeemCount
                    payout
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
                    redeemCount
                    payout
                }
              
            }
          }
        }
      }
    `

    try
    {
        const depositDataDai = await axios({
            url: 'https://api.thegraph.com/subgraphs/id/QmPR96VPnd3y4zrtaEJ2bttPffC6VHt971UVKorEn5qM2w',
            method: 'post',
            data: {
              query: depositQueryDai
            }
        }) 
        const depositDataEth = await axios({
            url: 'https://api.thegraph.com/subgraphs/id/QmPR96VPnd3y4zrtaEJ2bttPffC6VHt971UVKorEn5qM2w',
            method: 'post',
            data: {
              query: depositQueryEth
            }
        })
        const depositDataFrax = await axios({
            url: 'https://api.thegraph.com/subgraphs/id/QmPR96VPnd3y4zrtaEJ2bttPffC6VHt971UVKorEn5qM2w',
            method: 'post',
            data: {
              query: depositQueryFrax
            }
        })

        const depositDataLusd = await axios({
            url: 'https://api.thegraph.com/subgraphs/id/QmPR96VPnd3y4zrtaEJ2bttPffC6VHt971UVKorEn5qM2w',
            method: 'post',
            data: {
              query: depositQueryLusd
            }
        })
        const depositDataOhmDai = await axios({
            url: 'https://api.thegraph.com/subgraphs/id/QmPR96VPnd3y4zrtaEJ2bttPffC6VHt971UVKorEn5qM2w',
            method: 'post',
            data: {
              query: depositQueryOhmDai
            }
        })
        const depositDataOhmFrax = await axios({
            url: 'https://api.thegraph.com/subgraphs/id/QmPR96VPnd3y4zrtaEJ2bttPffC6VHt971UVKorEn5qM2w',
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

        if(daiDeposits.length != 0)
        {
            for(let i = 0; i < daiDeposits[0].dayDeposit.length; ++i)
            {
                for(let j = 0; j < daiDeposits[0].dayDeposit[i].hourDeposit.length; ++j)
                {
                    for(let k = 0; k < daiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit.length; ++k)
                    {
                        
                        let obj = {}
                        obj.amountDai = daiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                        obj.depositCountDai = daiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                        obj.redeemCountDai = daiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].redeemCount
                        obj.payoutDai = daiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].payout
                        obj.timestamp = daiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].timestamp
                        daiArray.push(obj)
        
                    }
                }
            }
        }
        
        if(ethDeposits.length != 0)
        {
            for(let i = 0; i < ethDeposits[0].dayDeposit.length; ++i)
            {
                for(let j = 0; j < ethDeposits[0].dayDeposit[i].hourDeposit.length; ++j)
                {
                    for(let k = 0; k < ethDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit.length; ++k)
                    {
                        
                        let obj = {}
                        obj.amountEth = ethDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                        obj.depositCountEth = ethDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                        obj.redeemCountEth = ethDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].redeemCount
                        obj.payoutEth = ethDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].payout
                        obj.timestamp = ethDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].timestamp
                        ethArray.push(obj)
        
                    }
                }
            }
        }
        
        if(fraxDeposits.length != 0)
        {
            for(let i = 0; i < fraxDeposits[0].dayDeposit.length; ++i)
            {
                for(let j = 0; j < fraxDeposits[0].dayDeposit[i].hourDeposit.length; ++j)
                {
                    for(let k = 0; k < fraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit.length; ++k)
                    {
                        
                        let obj = {}
                        obj.amountFrax = fraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                        obj.depositCountFrax = fraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                        obj.redeemCountFrax = fraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].redeemCount
                        obj.payoutFrax = fraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].payout
                        obj.timestamp = fraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].timestamp
                        fraxArray.push(obj)
        
                    }
                }
            }
        }
        
        if(lusdDeposits.length != 0)
        {
            for(let i = 0; i < lusdDeposits[0].dayDeposit.length; ++i)
            {
                for(let j = 0; j < lusdDeposits[0].dayDeposit[i].hourDeposit.length; ++j)
                {
                    for(let k = 0; k < lusdDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit.length; ++k)
                    {
                        
                        let obj = {}
                        obj.amountLusd = lusdDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                        obj.depositCountLusd = lusdDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                        obj.redeemCountLusd = lusdDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].redeemCount
                        obj.payoutLusd = lusdDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].payout
                        obj.timestamp = lusdDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].timestamp
                        lusdArray.push(obj)
        
                    }
                }
            }
        }

        if(ohmDaiDeposits.length != 0)
        {
            for(let i = 0; i < ohmDaiDeposits[0].dayDeposit.length; ++i)
            {
                for(let j = 0; j < ohmDaiDeposits[0].dayDeposit[i].hourDeposit.length; ++j)
                {
                    for(let k = 0; k < ohmDaiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit.length; ++k)
                    {
                        
                        let obj = {}
                        obj.amountOhmDai = ohmDaiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                        obj.depositCountOhmDai = ohmDaiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                        obj.redeemCountOhmDai = ohmDaiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].redeemCount
                        obj.payoutOhmDai = ohmDaiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].payout
                        obj.timestamp = ohmDaiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].timestamp
                        ohmDaiArray.push(obj)
        
                    }
                }
            }
        }
        
        if(ohmFraxDeposits.length != 0)
        {
            for(let i = 0; i < ohmFraxDeposits[0].dayDeposit.length; ++i)
            {
                for(let j = 0; j < ohmFraxDeposits[0].dayDeposit[i].hourDeposit.length; ++j)
                {
                    for(let k = 0; k < ohmFraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit.length; ++k)
                    {
                        
                        let obj = {}
                        obj.amountOhmFrax = ohmFraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                        obj.depositCountOhmFrax = ohmFraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                        obj.redeemCountOhmFrax = ohmFraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].redeemCount
                        obj.payoutOhmFrax = ohmFraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].payout
                        obj.timestamp = ohmFraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].timestamp
                        ohmFraxArray.push(obj)
                    }
                }
            }
        }
        
        for(let i = 0; i < 60*24*days; ++i)
        {
            let beginTimestamp = startTimestamp + i * 60
            let endTimestamp = startTimestamp + (i+1) * 60
            let obj = {
                amountDai: 0,
                amountEth: 0,
                amountFrax: 0,
                amountLusd: 0,
                amountOhmDai: 0,
                amountOhmFrax: 0,
                amountDaiAvg: 0,
                amountEthAvg: 0,
                amountLusdAvg: 0,
                amountFraxAvg: 0,
                amountOhmDaiAvg: 0,
                amountOhmFraxAvg:0,
                payoutDai: 0,
                payoutEth: 0,
                payoutFrax: 0,
                payoutLusd: 0,
                payoutOhmDai: 0,
                payoutOhmFrax: 0,
                depositCountDai: 0,
                depositCountEth: 0,
                depositCountLusd: 0,
                depositCountFrax: 0,
                depositCountOhmDai: 0,
                depositCountOhmFrax: 0,
                redeemCountDai: 0,
                redeemCountLusd: 0,
                redeemCountEth: 0,
                redeemCountFrax: 0,
                redeemCountOhmDai: 0,
                redeemCountOhmFrax: 0,
                beginTimestamp: beginTimestamp,
                endTimestamp: endTimestamp
            }
            for(let j = 0; j < daiArray.length; ++j)
            {  
                if(beginTimestamp <= daiArray[j].timestamp && daiArray[j].timestamp < endTimestamp)
                {
                    
                    obj.amountDai = daiArray[j].amountDai
                    obj.depositCountDai = daiArray[j].depositCountDai
                    obj.payoutDai = daiArray[j].payoutDai
                    obj.redeemCountDai = daiArray[j].redeemCountDai
                    if(daiArray[j].depositCountDai != 0)
                    {
                        obj.amountDaiAvg = daiArray[j].amountDai / daiArray[j].depositCountDai
                    }
                }

            }
            for(let j = 0; j < ethArray.length; ++j)
            {  
                if(beginTimestamp <= ethArray[j].timestamp && ethArray[j].timestamp < endTimestamp)
                {
                    
                    obj.amountEth = ethArray[j].amountEth
                    obj.depositCountEth = ethArray[j].depositCountEth
                    obj.payoutEth = ethArray[j].payoutEth
                    obj.redeemCountEth = ethArray[j].redeemCountEth
                    if(ethArray[j].depositCountEth != 0)
                    {
                        obj.amountEthAvg = ethArray[j].amountEth / ethArray[j].depositCountEth
                    }
                }

            }
            for(let j = 0; j < fraxArray.length; ++j)
            {  
                if(beginTimestamp <= fraxArray[j].timestamp && fraxArray[j].timestamp < endTimestamp)
                {
                    obj.amountFrax = fraxArray[j].amountFrax
                    obj.depositCountFrax = fraxArray[j].depositCountFrax
                    obj.payoutFrax = fraxArray[j].payoutFrax
                    obj.redeemCountFrax = fraxArray[j].redeemCountFrax
                    if(fraxArray[j].depositCountFrax != 0)
                    {
                        obj.amountFraxAvg = fraxArray[j].amountFrax / fraxArray[j].depositCountFrax
                    }
                }
            }
            for(let j = 0; j < lusdArray.length; ++j)
            {  
                if(beginTimestamp <= lusdArray[j].timestamp && lusdArray[j].timestamp < endTimestamp)
                {
                    obj.amountLusd = lusdArray[j].amountLusd
                    obj.depositCountLusd = lusdArray[j].depositCountLusd
                    obj.payoutLusd = lusdArray[j].payoutLusd
                    obj.redeemCountLusd = lusdArray[j].redeemCountLusd
                    if(lusdArray[j].depositCountLusd != 0)
                    {
                        obj.amountLusdAvg = lusdArray[j].amountLusd / lusdArray[j].depositCountLusd
                    }
                }
            }
            for(let j = 0; j < ohmDaiArray.length; ++j)
            {  
                if(beginTimestamp <= ohmDaiArray[j].timestamp && ohmDaiArray[j].timestamp < endTimestamp)
                {
                    obj.amountOhmDai = ohmDaiArray[j].amountOhmDai
                    obj.depositCountOhmDai = ohmDaiArray[j].depositCountOhmDai
                    obj.payoutOhmDai = ohmDaiArray[j].payoutOhmDai
                    obj.redeemCountOhmDai = ohmDaiArray[j].redeemCountOhmDai
                    if(ohmDaiArray[j].depositCountOhmDai != 0)
                    {
                        obj.amountOhmDaiAvg = ohmDaiArray[j].amountOhmDai / ohmDaiArray[j].depositCountOhmDai
                    }
                }
            }
            for(let j = 0; j < ohmFraxArray.length; ++j)
            {  
                if(beginTimestamp <= ohmFraxArray[j].timestamp && ohmFraxArray[j].timestamp < endTimestamp)
                {
                    obj.amountOhmFrax = ohmFraxArray[j].amountOhmFrax
                    obj.depositCountOhmFrax = ohmFraxArray[j].depositCountOhmFrax
                    obj.payoutOhmFrax = ohmFraxArray[j].payoutOhmFrax
                    obj.redeemCountOhmFrax = ohmFraxArray[j].redeemCountOhmFrax
                    if(ohmFraxArray[j].depositCountOhmFrax != 0)
                    {
                        obj.amountOhmFraxAvg = ohmFraxArray[j].amountOhmFrax / ohmFraxArray[j].depositCountOhmFrax
                    }
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