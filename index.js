// const axios = require('axios')

import {getStakesInfo} from './stakes.js'

import {getDepositsInfo} from './deposits.js'

async function main()
{
    // const stakeData = await getStakesInfo(1632268840, 3600, 24)
    const depositData = await getDepositsInfo(1632268840, 3600, 24)
    if(!!depositData)
    {
        for(let i = 0; i < depositData.length-1; ++i)
        {
            if(depositData[i].depositCount != 0)
            {
                console.log(depositData[i])
            }
        }
    }
    console.log(depositData.length)
}

main()