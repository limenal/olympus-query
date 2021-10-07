import axios from 'axios'

export async function getDepositsInfo(timestamp_start, delta_per_period, number_of_periods)
{

    let timestamps = []
    for (let i = 0; i < number_of_periods; ++i)
    {
        timestamps.push(
            (timestamp_start + i * delta_per_period)
        )
    }

    let depositQuery = '{'

    for (let i = 0; i < timestamps.length - 1; ++i)
    {
        depositQuery += `
            t${timestamps[i]}:deposits(first: 1, orderBy: timestamp, where:{timestamp_gte: ${timestamps[i]}, timestamp_lt: ${timestamps[i+1]}}) {
                id
                token{id}
                depositCount
                totalDepositedDAI
                totalDepositedETH
                totalDepositedFRAX
                totalDepositedLUSD
                totalDepositedOHMDAI
                totalDepositedOHMFRAX
                amount
                timestamp
            }
        `
    }
    depositQuery += '}'

    try
    {
        const depositData = await axios({
            url: 'https://api.thegraph.com/subgraphs/id/QmNPyEj9Jxt7WevFLtjcQiaVFJa3D8Wb2ieSg97QfThcgx',
            method: 'post',
            data: {
              query: depositQuery
            }
        }) 
        console.log(depositData.data.data)
        let data = []
        for(let i = 0; i < timestamps.length - 1; ++i)
        {
            let depositCount, depositedDAI, depositedETH, depositedFRAX, depositedLUSD, depositedOHMDAI, depositedOHMFRAX
            let obj = {
                depositCount: 0,
                depositedDAI: 0,
                depositedETH: 0,
                depositedFRAX: 0,
                depositedLUSD: 0,
                depositedOHMDAI: 0,
                depositedOHMFRAX: 0
            }
            obj.timestampBegin = timestamps[i]
            obj.timestampEnd = timestamps[i+1]
            obj.interval = delta_per_period
            let d1 = depositData.data.data['t'+ timestamps[i].toString()]
            let d2 = depositData.data.data['t'+ timestamps[i+1].toString()]
            if(!!d1 && !!d2)
            {
                if(d1.length != 0 && d2.length != 0)
                {
                    depositedDAI = Number(d2[0].totalDepositedDAI) - Number(d1[0].totalDepositedDAI)
                    depositedETH = Number(d2[0].totalDepositedETH) - Number(d1[0].totalDepositedETH)
                    depositedFRAX = Number(d2[0].totalDepositedFRAX) - Number(d1[0].totalDepositedFRAX)
                    depositedLUSD = Number(d2[0].totalDepositedLUSD) - Number(d1[0].totalDepositedLUSD)
                    depositedOHMDAI = Number(d2[0].totalDepositedOHMDAI) - Number(d1[0].totalDepositedOHMDAI)
                    depositedOHMFRAX = Number(d2[0].totalDepositedOHMFRAX) - Number(d1[0].totalDepositedOHMFRAX)
                    depositCount = Number(d2[0].depositCount) - Number(d1[0].depositCount)

                    obj.depositedDAI = depositedDAI
                    obj.depositedETH = depositedETH
                    obj.depositedFRAX = depositedFRAX
                    obj.depositedLUSD = depositedLUSD
                    obj.depositedOHMDAI = depositedOHMDAI
                    obj.depositedOHMFRAX = depositedOHMFRAX
                    obj.depositCount = depositCount
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