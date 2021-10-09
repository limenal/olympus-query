// const axios = require('axios')

import {getStakesInfoDays, getStakesInfoHour, getStakesInfoMinute} from './stakes.js'

import {getDepositsInfoDays, getDepositsInfoHours, getDepositsInfoMinutes} from './deposits.js'

async function main()
{
    // const stakeData = await getStakesInfo(1632268840, 3600, 24)
    // const depositData = 
    const depositMinute = await getStakesInfoDays(1615232988, 365)
    console.log(depositMinute.length)
    // if(!!depositMinute)
    // {
        for(let i = 0; i < depositMinute.length; ++i)
        {
            
                console.log(depositMinute[i])

            
            
        }
    // }
}

main()