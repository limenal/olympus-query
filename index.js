// const axios = require('axios')
import {getStakesInfoDays, getStakesInfoHour, getStakesInfoMinute, getStakesInfoNHour} from './stakes.js'
import {getDepositsInfoDays, getDepositsInfoHours, getDepositsInfoMinutes, getDepositsInfoNHours} from './deposits.js'
import {getRebasesInfoDays} from './rebases.js'

async function main()
{
    // const stakeData = await getStakesInfo(1632268840, 3600, 24)
    // const depositData = 
    const deposit = await getStakesInfoHour(1634342400, 1634774400)
    // if(!!depositMinute)
    // {
    for(let i = 0; i < deposit.length; ++i)
    {
        
            console.log(deposit[i])
        
    }
    console.log(deposit.length)

    // }
}

main()