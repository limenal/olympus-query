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
                for(let k = 0; k < daiDeposits.length; ++k)
                {
                    for(let j = 0; j < daiDeposits[k].dayDeposit.length; ++j)
                    {
                        if(beginTimestamp <= daiDeposits[k].dayDeposit[j].timestamp && daiDeposits[k].dayDeposit[j].timestamp < endTimestamp )
                        {
                            obj.amountDai = daiDeposits[k].dayDeposit[j].amount
                            obj.depositCountDai = daiDeposits[k].dayDeposit[j].depositCount
                            obj.redeemCountDai = daiDeposits[k].dayDeposit[j].redeemCount
                            obj.payoutDai = daiDeposits[k].dayDeposit[j].payout
                            if(daiDeposits[k].dayDeposit[j].depositCount != 0)
                            {
                                obj.amountDaiAvg = daiDeposits[k].dayDeposit[j].amount/ daiDeposits[k].dayDeposit[j].depositCount
                            }
                        }
                    
                    }
                }
                
            }
            
            if(ethDeposits.length != 0)
            {
                for(let k = 0; k < ethDeposits.length; ++k)
                {
                    for(let j = 0; j < ethDeposits[k].dayDeposit.length; ++j)
                    {
                        if(beginTimestamp <= ethDeposits[k].dayDeposit[j].timestamp && ethDeposits[0].dayDeposit[j].timestamp < endTimestamp )
                        {
                            obj.amountEth = ethDeposits[k].dayDeposit[j].amount
                            obj.depositCountEth = ethDeposits[k].dayDeposit[j].depositCount
                            obj.redeemCountEth = ethDeposits[k].dayDeposit[j].redeemCount
                            obj.payoutEth = ethDeposits[k].dayDeposit[j].payout
                            if(ethDeposits[k].dayDeposit[j].depositCount != 0)
                            {
                                obj.amountEthAvg = ethDeposits[k].dayDeposit[j].amount/ ethDeposits[k].dayDeposit[j].depositCount
                            }
                        }
                    
                    }
                }
                
            }
            if(fraxDeposits.length != 0)
            {
                for(let k = 0; k < fraxDeposits.length; ++k)
                {
                    for(let j = 0; j < fraxDeposits[k].dayDeposit.length; ++j)
                    {
                        if(beginTimestamp <= fraxDeposits[k].dayDeposit[j].timestamp && fraxDeposits[k].dayDeposit[j].timestamp < endTimestamp )
                        {
                            obj.amountFrax = fraxDeposits[k].dayDeposit[j].amount
                            obj.depositCountFrax = fraxDeposits[k].dayDeposit[j].depositCount
                            obj.redeemCountFrax = fraxDeposits[k].dayDeposit[j].redeemCount
                            obj.payoutFrax = fraxDeposits[k].dayDeposit[j].payout
                            if(fraxDeposits[0].dayDeposit[j].depositCount != 0)
                            {
                                obj.amountFraxAvg = fraxDeposits[k].dayDeposit[j].amount/ fraxDeposits[k].dayDeposit[j].depositCount
                            }
                        }
                    }
                }
            }
            
            if(lusdDeposits.length != 0)
            {
                for(let k = 0; k < lusdDeposits.length; ++k)
                {
                    for(let j = 0; j < lusdDeposits[k].dayDeposit.length; ++j)
                    {
                        if(beginTimestamp <= lusdDeposits[k].dayDeposit[j].timestamp && lusdDeposits[k].dayDeposit[j].timestamp < endTimestamp )
                        {
                            obj.amountLusd = lusdDeposits[k].dayDeposit[j].amount
                            obj.depositCountLusd = lusdDeposits[k].dayDeposit[j].depositCount
                            obj.redeemCountLusd = lusdDeposits[k].dayDeposit[j].redeemCount
                            obj.payoutLusd = lusdDeposits[k].dayDeposit[j].payout
                            if(lusdDeposits[k].dayDeposit[j].depositCount != 0)
                            {
                                obj.amountLusdAvg = lusdDeposits[k].dayDeposit[j].amount/ lusdDeposits[k].dayDeposit[j].depositCount
                            }
                        }
                    }
                }
            }
            if(ohmDaiDeposits.length != 0 )
            {
                for(let k = 0; k < ohmDaiDeposits.length; ++k)
                {
                    for(let j = 0; j < ohmDaiDeposits[k].dayDeposit.length; ++j)
                    {
                        if(beginTimestamp <= ohmDaiDeposits[k].dayDeposit[j].timestamp && ohmDaiDeposits[k].dayDeposit[j].timestamp < endTimestamp )
                        {
                            obj.amountOhmDai = ohmDaiDeposits[k].dayDeposit[j].amount
                            obj.depositCountOhmDai = ohmDaiDeposits[k].dayDeposit[j].depositCount
                            obj.redeemCountOhmDai = ohmDaiDeposits[k].dayDeposit[j].redeemCount
                            obj.payoutOhmDai = ohmDaiDeposits[k].dayDeposit[j].payout
                            if(ohmDaiDeposits[k].dayDeposit[j].depositCount != 0)
                            {
                                obj.amountOhmDaidAvg = ohmDaiDeposits[k].dayDeposit[j].amount/ ohmDaiDeposits[k].dayDeposit[j].depositCount
                            }
                        }
                    }
                }
                
            }
            
            if(ohmFraxDeposits.length != 0)
            {
                for(let k = 0; k < ohmFraxDeposits.length; ++k)
                {
                    for(let j = 0; j < ohmFraxDeposits[k].dayDeposit.length; ++j)
                    {
                        if(beginTimestamp <= ohmFraxDeposits[k].dayDeposit[j].timestamp && ohmFraxDeposits[k].dayDeposit[j].timestamp < endTimestamp )
                        {
                            obj.amountOhmFrax = ohmFraxDeposits[k].dayDeposit[j].amount
                            obj.depositCountOhmFrax = ohmFraxDeposits[k].dayDeposit[j].depositCount
                            obj.redeemCountOhmFrax = ohmFraxDeposits[k].dayDeposit[j].redeemCount
                            obj.payoutOhmFrax = ohmFraxDeposits[k].dayDeposit[j].payout
                            if(ohmFraxDeposits[k].dayDeposit[j].depositCount != 0)
                            {
                                obj.amountOhmFraxAvg = ohmFraxDeposits[k].dayDeposit[j].amount/ ohmFraxDeposits[k].dayDeposit[j].depositCount
                            }
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
            for(let c = 0; c < daiDeposits.length; ++c)
            {
                for(let i = 0; i < daiDeposits[0].dayDeposit.length; ++i)
                {
                    
                    for(let k = 0; k < daiDeposits[0].dayDeposit[i].hourDeposit.length; ++k)
                    {
                        let obj = {}
                        obj.amountDai = daiDeposits[c].dayDeposit[i].hourDeposit[k].amount
                        obj.payoutDai = daiDeposits[c].dayDeposit[i].hourDeposit[k].payout
                        obj.depositCountDai = daiDeposits[c].dayDeposit[i].hourDeposit[k].depositCount
                        obj.redeemCountDai = daiDeposits[c].dayDeposit[i].hourDeposit[k].redeemCount
                        obj.timestamp = daiDeposits[c].dayDeposit[i].hourDeposit[k].timestamp
                        daiArray.push(obj)
                    }
                }
            }
        }
        
        if(ethDeposits.length != 0)
        {
            for(let c = 0; c < ethDeposits.length; ++c)
            {
                for(let i = 0; i < ethDeposits[c].dayDeposit.length; ++i)
                {
                    for(let k = 0; k < ethDeposits[c].dayDeposit[i].hourDeposit.length; ++k)
                    {
                        let obj = {}
                        obj.amountEth = ethDeposits[c].dayDeposit[i].hourDeposit[k].amount
                        obj.payoutEth = ethDeposits[c].dayDeposit[i].hourDeposit[k].payout
                        obj.depositCountEth = ethDeposits[c].dayDeposit[i].hourDeposit[k].depositCount
                        obj.redeemCountEth = ethDeposits[c].dayDeposit[i].hourDeposit[k].redeemCount
                        obj.timestamp = ethDeposits[c].dayDeposit[i].hourDeposit[k].timestamp
                        ethArray.push(obj)
                    }
                }
            }
            
        }

        if(fraxDeposits.length != 0)
        {
            for(let c = 0; c < fraxDeposits.length; ++c)
            {
                for(let i = 0; i < fraxDeposits[c].dayDeposit.length; ++i)
                {
                    for(let k = 0; k < fraxDeposits[c].dayDeposit[i].hourDeposit.length; ++k)
                    {
                        let obj = {}
                        obj.amountFrax = fraxDeposits[c].dayDeposit[i].hourDeposit[k].amount
                        obj.payoutFrax = fraxDeposits[c].dayDeposit[i].hourDeposit[k].payout
                        obj.depositCountFrax = fraxDeposits[c].dayDeposit[i].hourDeposit[k].depositCount
                        obj.redeemCountFrax = fraxDeposits[c].dayDeposit[i].hourDeposit[k].redeemCount
                        obj.timestamp = fraxDeposits[c].dayDeposit[i].hourDeposit[k].timestamp
                        fraxArray.push(obj)
                    }
                }
            } 
        }
        
        if(lusdDeposits.length != 0)
        {
            for(let c = 0; c < lusdDeposits.length; ++c)
            {
                for(let i = 0; i < lusdDeposits[c].dayDeposit.length; ++i)
                {
                    for(let k = 0; k < lusdDeposits[c].dayDeposit[i].hourDeposit.length; ++k)
                    {
                        let obj = {}
                        obj.amountLusd = lusdDeposits[c].dayDeposit[i].hourDeposit[k].amount
                        obj.payoutLusd = lusdDeposits[c].dayDeposit[i].hourDeposit[k].payout
                        obj.depositCountLusd = lusdDeposits[c].dayDeposit[i].hourDeposit[k].depositCount
                        obj.redeemCountLusd = lusdDeposits[c].dayDeposit[i].hourDeposit[k].redeemCount
                        obj.timestamp = lusdDeposits[c].dayDeposit[i].hourDeposit[k].timestamp
                        lusdArray.push(obj)
                    }
                }
            }
            
        }
        
        if(ohmFraxDeposits.length != 0)
        {
            for(let c = 0; c < ohmDaiDeposits.length; ++c)
            {
                for(let i = 0; i < ohmDaiDeposits[c].dayDeposit.length; ++i)
                {
                    
                    for(let k = 0; k < ohmDaiDeposits[c].dayDeposit[i].hourDeposit.length; ++k)
                    {
                        let obj = {}
                        obj.amountOhmDai = ohmDaiDeposits[c].dayDeposit[i].hourDeposit[k].amount
                        obj.payoutOhmDai = ohmDaiDeposits[c].dayDeposit[i].hourDeposit[k].payout
                        obj.depositCountOhmDai = ohmDaiDeposits[c].dayDeposit[i].hourDeposit[k].depositCount
                        obj.redeemCountOhmDai = ohmDaiDeposits[c].dayDeposit[i].hourDeposit[k].redeemCount
                        obj.timestamp = ohmDaiDeposits[c].dayDeposit[i].hourDeposit[k].timestamp
                        ohmDaiArray.push(obj)
                    }
                }    
            }
        }
        
        if(ohmFraxDeposits.length != 0)
        {
            for(let c = 0; c < ohmFraxDeposits.length; ++c)
            {
                for(let i = 0; i < ohmFraxDeposits[c].dayDeposit.length; ++i)
                {
                    
                    for(let k = 0; k < ohmFraxDeposits[c].dayDeposit[i].hourDeposit.length; ++k)
                    {
                        let obj = {}
                        obj.amountOhmFrax = ohmFraxDeposits[c].dayDeposit[i].hourDeposit[k].amount
                        obj.payoutOhmFrax = ohmFraxDeposits[c].dayDeposit[i].hourDeposit[k].payout
                        obj.depositCountOhmFrax = ohmFraxDeposits[c].dayDeposit[i].hourDeposit[k].depositCount
                        obj.redeemCountOhmFrax = ohmFraxDeposits[c].dayDeposit[i].hourDeposit[k].redeemCount
                        obj.timestamp = ohmFraxDeposits[c].dayDeposit[i].hourDeposit[k].timestamp
                        ohmFraxArray.push(obj)
                    }
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
            for(let c = 0; c < daiDeposits.length; ++c)
            {
                for(let i = 0; i < daiDeposits[c].dayDeposit.length; ++i)
                {
                    for(let j = 0; j < daiDeposits[c].dayDeposit[i].hourDeposit.length; ++j)
                    {
                        for(let k = 0; k < daiDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit.length; ++k)
                        {
                            
                            let obj = {}
                            obj.amountDai = daiDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                            obj.depositCountDai = daiDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                            obj.redeemCountDai = daiDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].redeemCount
                            obj.payoutDai = daiDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].payout
                            obj.timestamp = daiDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].timestamp
                            daiArray.push(obj)
            
                        }
                    }
                }    
            }
        }
        
        if(ethDeposits.length != 0)
        {
            for(let c = 0; c < ethDeposits.length; ++c)
            {
                for(let i = 0; i < ethDeposits[c].dayDeposit.length; ++i)
                {
                    for(let j = 0; j < ethDeposits[c].dayDeposit[i].hourDeposit.length; ++j)
                    {
                        for(let k = 0; k < ethDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit.length; ++k)
                        {
                            
                            let obj = {}
                            obj.amountEth = ethDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                            obj.depositCountEth = ethDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                            obj.redeemCountEth = ethDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].redeemCount
                            obj.payoutEth = ethDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].payout
                            obj.timestamp = ethDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].timestamp
                            ethArray.push(obj)
                        }
                    }
                }
            }
        }
        
        if(fraxDeposits.length != 0)
        {
            for(let c = 0; c < fraxDeposits.length; ++c)
            {
                for(let i = 0; i < fraxDeposits[c].dayDeposit.length; ++i)
                {
                    for(let j = 0; j < fraxDeposits[c].dayDeposit[i].hourDeposit.length; ++j)
                    {
                        for(let k = 0; k < fraxDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit.length; ++k)
                        {
                            
                            let obj = {}
                            obj.amountFrax = fraxDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                            obj.depositCountFrax = fraxDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                            obj.redeemCountFrax = fraxDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].redeemCount
                            obj.payoutFrax = fraxDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].payout
                            obj.timestamp = fraxDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].timestamp
                            fraxArray.push(obj)
            
                        }
                    }
                }
            }   
        }
        
        if(lusdDeposits.length != 0)
        {
            for(let c = 0; c < lusdDeposits.length; ++c)
            {
                for(let i = 0; i < lusdDeposits[c].dayDeposit.length; ++i)
                {
                    for(let j = 0; j < lusdDeposits[c].dayDeposit[i].hourDeposit.length; ++j)
                    {
                        for(let k = 0; k < lusdDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit.length; ++k)
                        {
                            
                            let obj = {}
                            obj.amountLusd = lusdDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                            obj.depositCountLusd = lusdDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                            obj.redeemCountLusd = lusdDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].redeemCount
                            obj.payoutLusd = lusdDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].payout
                            obj.timestamp = lusdDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].timestamp
                            lusdArray.push(obj)
            
                        }
                    }
                }    
            }
        }

        if(ohmDaiDeposits.length != 0)
        {
            for(let c = 0; c < ohmDaiDeposits.length; ++c)
            {
                for(let i = 0; i < ohmDaiDeposits[c].dayDeposit.length; ++i)
                {
                    for(let j = 0; j < ohmDaiDeposits[c].dayDeposit[i].hourDeposit.length; ++j)
                    {
                        for(let k = 0; k < ohmDaiDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit.length; ++k)
                        {
                            
                            let obj = {}
                            obj.amountOhmDai = ohmDaiDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                            obj.depositCountOhmDai = ohmDaiDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                            obj.redeemCountOhmDai = ohmDaiDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].redeemCount
                            obj.payoutOhmDai = ohmDaiDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].payout
                            obj.timestamp = ohmDaiDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].timestamp
                            ohmDaiArray.push(obj)
            
                        }
                    }
                }    
            }
        }
        
        if(ohmFraxDeposits.length != 0)
        {
            for(let c = 0; c < ohmFraxDeposits.length; ++c)
            {
                for(let i = 0; i < ohmFraxDeposits[c].dayDeposit.length; ++i)
                {
                    for(let j = 0; j < ohmFraxDeposits[c].dayDeposit[i].hourDeposit.length; ++j)
                    {
                        for(let k = 0; k < ohmFraxDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit.length; ++k)
                        {
                            
                            let obj = {}
                            obj.amountOhmFrax = ohmFraxDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                            obj.depositCountOhmFrax = ohmFraxDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                            obj.redeemCountOhmFrax = ohmFraxDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].redeemCount
                            obj.payoutOhmFrax = ohmFraxDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].payout
                            obj.timestamp = ohmFraxDeposits[c].dayDeposit[i].hourDeposit[j].minuteDeposit[k].timestamp
                            ohmFraxArray.push(obj)
                        }
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