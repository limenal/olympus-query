// const axios = require('axios')
import {getStakesInfoDays, getStakesInfoHour, getStakesInfoMinute, getStakesInfo4Hour} from './stakes.js'
import {getDepositsInfoDays, getDepositsInfoHours, getDepositsInfoMinutes, getDepositsInfo4Hours} from './deposits.js'
import {getRebasesInfoDays} from './rebases.js'

async function main()
{
    // const stakeData = await getStakesInfo(1632268840, 3600, 24)
    // const depositData = 
    const deposit = await getDepositsInfo4Hours(1634360085, 1)
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