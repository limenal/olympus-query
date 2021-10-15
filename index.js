// const axios = require('axios')
import {getStakesInfoDays, getStakesInfoHour, getStakesInfoMinute} from './stakes.js'
import {getDepositsInfoDays, getDepositsInfoHours, getDepositsInfoMinutes} from './deposits.js'
import {getRebasesInfoDays} from './rebases.js'

async function main()
{
    // const stakeData = await getStakesInfo(1632268840, 3600, 24)
    // const depositData = 
    const deposit = await getRebasesInfoDays(1615232988, 365)
    console.log(deposit.length)
    // if(!!depositMinute)
    // {
        for(let i = 0; i < deposit.length; ++i)
        {
            
            console.log(deposit[i])

            
 
        }
    // }
}

main()