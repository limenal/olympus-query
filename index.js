// const axios = require('axios')

import {getStakesInfo} from './stakes.js'

async function main()
{
    const data = await getStakesInfo(1632268840, 1400, 90)
    console.log(data)
    if(!!data)
    {
        for(let i =0; i < data.length; ++i)
        {
            console.log(data[i])
        }
    }
}

main()