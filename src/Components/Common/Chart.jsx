import React from 'react'
import { Line } from '@ant-design/charts';

const Chart = ({transactions}) => {
    let config = {};
    if(Array.isArray(transactions))
    { 
        const chartData = [
           transactions.map((tran) => {
                return {date: tran.date, amount: tran.amount}
            })
        ];

        const data = chartData[0];
        config = {
            data,
            autoFit: true,
            xField: 'date',
            yField: 'amount',
        };
    
    }
    return <Line {...config} style={{width: "100%", height: "100%"}}/>;
}

export default Chart
