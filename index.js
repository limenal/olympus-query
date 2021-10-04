const axios = require('axios')

async function main()
{
    
    timestamp_start = 1632873621
                                
    delta_per_period = 600
    number_of_periods = 100  

    timestamps = []
    for (let i = 0; i < number_of_periods; ++i)
    {
        timestamps.push(
            (timestamp_start + i * delta_per_period)
        )
    }
    let stakeQuery = '{'
    for (let i = 0; i < timestamps.length - 1; ++i)
    {
        stakeQuery += `
            t${timestamps[i]}:stakes(first: 1, orderBy: timestamp, where:{timestamp_gte: ${timestamps[i]}, timestamp_lt: ${timestamps[i+1]}}) {
                id
                totalStaked
                currentStaked
                amount
                timestamp
            }
        `
    }

    stakeQuery += '}'
    
    let unstakeQuery = '{'
    for (let i = 0; i < timestamps.length - 1; ++i)
    {
        unstakeQuery += `
            t${timestamps[i]}:unstakes(first: 1, orderBy: timestamp, where:{timestamp_gte: ${timestamps[i]}, timestamp_lt: ${timestamps[i+1]}}) {
                id
                totalUnstaked
                currentStaked
                amount
                timestamp
            }
        `
    }
    unstakeQuery+= '}'

    try{
        const stakeData = await axios({
            url: 'https://api.thegraph.com/subgraphs/name/limenal/olympus-stake',
            method: 'post',
            data: {
              query: stakeQuery
            }
          })
        
        const unstakeData = await axios({
            url: 'https://api.thegraph.com/subgraphs/name/limenal/olympus-stake',
            method: 'post',
            data: {
              query: unstakeQuery
            }
          })
        
        for(let i = 0; i < timestamps.length - 1; ++i)
        {
            let s1 = stakeData.data.data['t'+ timestamps[i].toString()]
            let s2 = stakeData.data.data['t'+ timestamps[i+1].toString()]
            if(s1[0] != undefined && s2[0] != undefined)
            {
                // Сумма стейков за последний интервал
                var staked = Number(s2[0].totalStaked) - Number(s1[0].totalStaked)
            }
            else{
                var staked = 0
            }

            let unstaked1 = unstakeData.data.data['t'+ timestamps[i].toString()]
            let unstaked2 = unstakeData.data.data['t'+ timestamps[i + 1].toString()]
            if(unstaked1[0] != undefined && unstaked2[0] != undefined)
            {
                // Сумма анстейков за последний интервал
                var unstaked = Number(unstaked2[0].totalUnstaked) - Number(unstaked1[0].totalUnstaked)
            }
            else 
            {
                var unstaked = 0
            }

            if(staked !== 0)
            {
                console.log('UNSTAKED / STAKED:', unstaked/staked)
            }
        }
    }
    catch(err)
    {
        // console.log(err)
    }
    
}

main()