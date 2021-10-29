// const axios = require('axios')
import {getStakesInfoDays, getStakesInfoHour, getStakesInfoMinute, getStakesInfoNHour} from './stakes.js'
import {getDepositsInfoDays, getDepositsInfoHours, getDepositsInfoMinutes, getDepositsInfoNHours} from './deposits.js'
import {getRebasesInfoDays, getRebasesInfoHours, getRebasesInfoMinutes, getRebasesInfoNHours} from './rebases.js'

async function main()
{
    // const stakeData = await getStakesInfo(1632268840, 3600, 24)
    // const depositData = 
    const deposit = await getRebasesInfoDays(1616371200, 1616803200)
    // if(!!depositMinute)
    // {
    for(let i = 0; i < deposit.length; ++i)
    {

        console.log(deposit[i])
        
    }
    console.log(deposit.length)

    
}

main()