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
                amountDaiDay: 0,
                amountEthDay: 0,
                amountFraxDay: 0,
                amountLusdDay: 0,
                amountOhmDaiDay: 0,
                amountOhmFraxDay: 0,
                amountDaiAvg: 0,
                amountEthAvg: 0,
                amountLusdAvg: 0,
                amountFraxAvg: 0,
                amountOhmDaiAvg: 0,
                amountOhmFraxAvg:0,
                payoutDaiDay: 0,
                payoutEthDay: 0,
                payoutFraxDay: 0,
                payoutLusdDay: 0,
                payoutOhmDaiDay: 0,
                payoutOhmFraxDay: 0,
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
                        obj.amountDaiDay = daiDeposits[0].dayDeposit[j].amount
                        obj.depositCountDai = daiDeposits[0].dayDeposit[j].depositCount
                        obj.redeemCountDai = daiDeposits[0].dayDeposit[j].redeemCount
                        obj.payoutDaiDay = daiDeposits[0].dayDeposit[j].payout
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
                        obj.amountEthDay = ethDeposits[0].dayDeposit[j].amount
                        obj.depositCountEth = ethDeposits[0].dayDeposit[j].depositCount
                        obj.redeemCountEth = ethDeposits[0].dayDeposit[j].redeemCount
                        obj.payoutEthDay = ethDeposits[0].dayDeposit[j].payout
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
                        obj.amountFraxDay = fraxDeposits[0].dayDeposit[j].amount
                        obj.depositCountFrax = fraxDeposits[0].dayDeposit[j].depositCount
                        obj.redeemCountFrax = fraxDeposits[0].dayDeposit[j].redeemCount
                        obj.payoutFraxDay = fraxDeposits[0].dayDeposit[j].payout
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
                        obj.amountLusdDay = lusdDeposits[0].dayDeposit[j].amount
                        obj.depositCountLusd = lusdDeposits[0].dayDeposit[j].depositCount
                        obj.redeemCountLusd = lusdDeposits[0].dayDeposit[j].redeemCount
                        obj.payoutLusdDay = lusdDeposits[0].dayDeposit[j].payout
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
                        obj.amountOhmdaiDay = ohmDaiDeposits[0].dayDeposit[j].amount
                        obj.depositCountOhmDai = ohmDaiDeposits[0].dayDeposit[j].depositCount
                        obj.redeemCountOhmDai = ohmDaiDeposits[0].dayDeposit[j].redeemCount
                        obj.payoutOhmDaiDay = ohmDaiDeposits[0].dayDeposit[j].payout
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
                        obj.amountOhmFraxDay = ohmFraxDeposits[0].dayDeposit[j].amount
                        obj.depositCountOhmFrax = ohmFraxDeposits[0].dayDeposit[j].depositCount
                        obj.redeemCountOhmFrax = ohmFraxDeposits[0].dayDeposit[j].redeemCount
                        obj.payoutOhmFraxDay = ohmFraxDeposits[0].dayDeposit[j].payout
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
                    obj.amountDaiHour = daiDeposits[0].dayDeposit[i].hourDeposit[k].amount
                    obj.payoutDaiHour = daiDeposits[0].dayDeposit[i].hourDeposit[k].payout
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
                    obj.amountEthHour = ethDeposits[0].dayDeposit[i].hourDeposit[k].amount
                    obj.payoutEthHour = ethDeposits[0].dayDeposit[i].hourDeposit[k].payout
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
                    obj.amountFraxHour = fraxDeposits[0].dayDeposit[i].hourDeposit[k].amount
                    obj.payoutFraxHour = fraxDeposits[0].dayDeposit[i].hourDeposit[k].payout
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
                    obj.amountLusdHour = lusdDeposits[0].dayDeposit[i].hourDeposit[k].amount
                    obj.payoutLusdHour = lusdDeposits[0].dayDeposit[i].hourDeposit[k].payout
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
                    obj.amountOhmDaiHour = ohmDaiDeposits[0].dayDeposit[i].hourDeposit[k].amount
                    obj.payoutOhmDaiHour = ohmDaiDeposits[0].dayDeposit[i].hourDeposit[k].payout
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
                    obj.amountOhmFraxHour = ohmFraxDeposits[0].dayDeposit[i].hourDeposit[k].amount
                    obj.payoutOhmFraxHour = ohmFraxDeposits[0].dayDeposit[i].hourDeposit[k].payout
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
                amountDaiHour: 0,
                amountEthHour: 0,
                amountFraxHour: 0,
                amountLusdHour: 0,
                amountOhmDaiHour: 0,
                amountOhmFraxHour: 0,
                amountDaiAvg: 0,
                amountEthAvg: 0,
                amountLusdAvg: 0,
                amountFraxAvg: 0,
                amountOhmDaiAvg: 0,
                amountOhmFraxAvg:0,
                payoutDaiHour: 0,
                payoutEthHour: 0,
                payoutFraxHour: 0,
                payoutLusdHour: 0,
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
                    
                    obj.amountDaiHour = daiArray[j].amountDaiHour
                    obj.depositCountDai = daiArray[j].depositCountDai
                    obj.redeemCountDai = daiArray[j].redeemCountDai
                    obj.payoutDaiHour = daiArray[j].payoutDaiHour
                }

            }
            for(let j = 0; j < ethArray.length; ++j)
            {  
                if(beginTimestamp <= ethArray[j].timestamp && ethArray[j].timestamp < endTimestamp)
                {
                    
                    obj.amountEthHour = ethArray[j].amountEthHour
                    obj.depositCountEth = ethArray[j].depositCountEth
                    obj.redeemCountEth = daiArray[j].redeemCountEth
                    obj.payoutEthHour = daiArray[j].payoutEthHour

                }

            }
            for(let j = 0; j < fraxArray.length; ++j)
            {  
                if(beginTimestamp <= fraxArray[j].timestamp && fraxArray[j].timestamp < endTimestamp)
                {
                    obj.amountFraxHour = fraxArray[j].amountFraxHour
                    obj.depositCountFrax = fraxArray[j].depositCountFrax
                    obj.redeemCountFrax = fraxArray[j].redeemCountFrax
                    obj.payoutFraxHour = fraxArray[j].payoutFraxHour
                }
            }
            for(let j = 0; j < lusdArray.length; ++j)
            {  
                if(beginTimestamp <= lusdArray[j].timestamp && lusdArray[j].timestamp < endTimestamp)
                {
                    obj.amountLusdHour = lusdArray[j].amountLusdHour
                    obj.depositCountLusd = lusdArray[j].depositCountLusd
                    obj.redeemCountLusd = lusdArray[j].redeemCountLusd
                    obj.payoutLusdHour = lusdArray[j].payoutLusdHour
                }
            }
            for(let j = 0; j < ohmDaiArray.length; ++j)
            {  
                if(beginTimestamp <= ohmDaiArray[j].timestamp && ohmDaiArray[j].timestamp < endTimestamp)
                {
                    obj.amountOhmDaiHour = ohmDaiArray[j].amountOhmDaiHour
                    obj.depositCountOhmDai = ohmDaiArray[j].depositCountOhmDai
                    obj.redeemCountOhmDai = ohmDaiArray[j].redeemCountOhmDai
                    obj.payoutOhmDaiHour = ohmDaiArray[j].payoutOhmDaiHour

                }
            }
            for(let j = 0; j < ohmFraxArray.length; ++j)
            {  
                if(beginTimestamp <= ohmFraxArray[j].timestamp && ohmFraxArray[j].timestamp < endTimestamp)
                {
                    obj.amountOhmFraxHour = ohmFraxArray[j].amountOhmFraxHour
                    obj.depositCountOhmFrax = ohmFraxArray[j].depositCountOhmFrax
                    obj.redeemCountOhmFrax = ohmFraxArray[j].redeemCountOhmFrax
                    obj.payoutOhmFraxHour = ohmFraxArray[j].payoutOhmFraxHour
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
                        obj.amountDaiMinute = daiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                        obj.depositCountDai = daiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                        obj.redeemCountDai = daiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].redeemCount
                        obj.payoutDaiMinute = daiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].payout
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
                        obj.amountEthMinute = ethDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                        obj.depositCountEth = ethDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                        obj.redeemCountEth = ethDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].redeemCount
                        obj.payoutEthMinute = ethDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].payout
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
                        obj.amountFraxMinute = fraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                        obj.depositCountFrax = fraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                        obj.redeemCountFrax = fraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].redeemCount
                        obj.payoutFraxMinute = fraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].payout
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
                        obj.amountLusdMinute = lusdDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                        obj.depositCountLusd = lusdDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                        obj.redeemCountLusd = lusdDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].redeemCount
                        obj.payoutLusdMinute = lusdDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].payout
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
                        obj.amountOhmDaiMinute = ohmDaiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                        obj.depositCountOhmDai = ohmDaiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                        obj.redeemCountOhmDai = ohmDaiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].redeemCount
                        obj.payoutOhmDaiMinute = ohmDaiDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].payout
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
                        obj.amountOhmFraxMinute = ohmFraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].amount
                        obj.depositCountOhmFrax = ohmFraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].depositCount
                        obj.redeemCountOhmFrax = ohmFraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].redeemCount
                        obj.payoutOhmFraxMinute = ohmFraxDeposits[0].dayDeposit[i].hourDeposit[j].minuteDeposit[k].payout
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
                amountDaiMinute: 0,
                amountEthMinute: 0,
                amountFraxMinute: 0,
                amountLusdMinute: 0,
                amountOhmDaiMinute: 0,
                amountOhmFraxMinute: 0,
                amountDaiAvg: 0,
                amountEthAvg: 0,
                amountLusdAvg: 0,
                amountFraxAvg: 0,
                amountOhmDaiAvg: 0,
                amountOhmFraxAvg:0,
                payoutDaiMinute: 0,
                payoutEthMinute: 0,
                payoutFraxMinute: 0,
                payoutLusdMinute: 0,
                payoutOhmDaiMinute: 0,
                payoutOhmFraxMinute: 0,
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
                    
                    obj.amountDaiMinute = daiArray[j].amountDaiMinute
                    obj.depositCountDai = daiArray[j].depositCountDai
                    obj.payoutDaiMinute = daiArray[j].payoutDaiMinute
                    obj.redeemCountDai = daiArray[j].redeemCountDai
                }

            }
            for(let j = 0; j < ethArray.length; ++j)
            {  
                if(beginTimestamp <= ethArray[j].timestamp && ethArray[j].timestamp < endTimestamp)
                {
                    
                    obj.amountEthMinute = ethArray[j].amountEthMinute
                    obj.depositCountEth = ethArray[j].depositCountEth
                    obj.payoutEthMinute = ethArray[j].payoutEthMinute
                    obj.redeemCountEth = ethArray[j].redeemCountEth

                }

            }
            for(let j = 0; j < fraxArray.length; ++j)
            {  
                if(beginTimestamp <= fraxArray[j].timestamp && fraxArray[j].timestamp < endTimestamp)
                {
                    obj.amountFraxMinute = fraxArray[j].amountFraxMinute
                    obj.depositCountFrax = fraxArray[j].depositCountFrax
                    obj.payoutFraxMinute = fraxArray[j].payoutFraxMinute
                    obj.redeemCountFrax = fraxArray[j].redeemCountFrax

                }
            }
            for(let j = 0; j < lusdArray.length; ++j)
            {  
                if(beginTimestamp <= lusdArray[j].timestamp && lusdArray[j].timestamp < endTimestamp)
                {
                    obj.amountLusdMinute = lusdArray[j].amountLusdMinute
                    obj.depositCountLusd = lusdArray[j].depositCountLusd
                    obj.payoutLusdMinute = lusdArray[j].payoutLusdMinute
                    obj.redeemCountLusd = lusdArray[j].redeemCountLusd

                }
            }
            for(let j = 0; j < ohmDaiArray.length; ++j)
            {  
                if(beginTimestamp <= ohmDaiArray[j].timestamp && ohmDaiArray[j].timestamp < endTimestamp)
                {
                    obj.amountOhmDaiMinute = ohmDaiArray[j].amountOhmDaiMinute
                    obj.depositCountOhmDai = ohmDaiArray[j].depositCountOhmDai
                    obj.payoutOhmDaiMinute = ohmDaiArray[j].payoutOhmDaiMinute
                    obj.redeemCountOhmDai = ohmDaiArray[j].redeemCountOhmDai

                }
            }
            for(let j = 0; j < ohmFraxArray.length; ++j)
            {  
                if(beginTimestamp <= ohmFraxArray[j].timestamp && ohmFraxArray[j].timestamp < endTimestamp)
                {
                    obj.amountOhmFraxMinute = ohmFraxArray[j].amountOhmFraxMinute
                    obj.depositCountOhmFrax = ohmFraxArray[j].depositCountOhmFrax
                    obj.payoutOhmFraxMinute = ohmFraxArray[j].payoutOhmFraxMinute
                    obj.redeemCountOhmFrax = ohmFraxArray[j].redeemCountOhmFrax
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