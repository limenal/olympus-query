import axios from 'axios'
export async function getStakesInfo(timestamp_start, delta_per_period, number_of_periods)
{
    
    let timestamps = []
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
                stakeCount
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
                unstakeCount
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
        let data = []
        for(let i = 0; i < timestamps.length - 1; ++i)
        {
            let staked, unstaked, stakeCount, unstakeCount, currentStaked
            let obj = {}
            obj.timestampBegin = timestamps[i]
            obj.timestampEnd = timestamps[i+1]
            obj.interval = delta_per_period
            let s1 = stakeData.data.data['t'+ timestamps[i].toString()]
            let s2 = stakeData.data.data['t'+ timestamps[i+1].toString()]
            if(!!s1 && !!s2)
            {
                if(s1.length != 0 && s2.length != 0)
                {
                    // Сумма стейков за последний интервал
                    staked = Number(s2[0].totalStaked) - Number(s1[0].totalStaked)
                    obj.staked = staked
                    stakeCount = Number(s2[0].stakeCount) - Number(s1[0].stakeCount)
                    currentStaked = Number(s2[0].currentStaked)
                    obj.currentStaked = currentStaked
                    obj.stakeCount = stakeCount
                }   
                
            }
            else{
                obj.staked = 0
                obj.stakeCount = 0

            }

            let u1 = unstakeData.data.data['t'+ timestamps[i].toString()]
            let u2 = unstakeData.data.data['t'+ timestamps[i+1].toString()]    
            if(!!u1 && !!u2)
            {
                if(u1.length != 0 && u2.length != 0)
                {
                    // Сумма анстейков за последний интервал
                    unstaked = Number(u2[0].totalUnstaked) - Number(u1[0].totalUnstaked)
                    obj.unstaked = unstaked
                    unstakeCount = Number(u2[0].unstakeCount) - Number(u1[0].unstakeCount)
                    obj.unstakeCount = unstakeCount
                }
                
            }
            else{
                obj.unstaked = 0
                obj.unstakeCount = 0
            }

            if(staked !== 0)
            {
                // console.log(unstaked, staked)
                obj.unstakedToStakedPercent = 100 * (obj.unstaked / obj.staked)
            }
            if(currentStaked !== 0)
            {
                obj.unstakedToTotalStakedPercent = 100 * (obj.unstaked / obj.currentStaked)
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

