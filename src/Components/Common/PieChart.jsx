import React from 'react'
import { Pie } from '@ant-design/charts';

const PieChart = ({transactions}) => {
    let config = {};
    if(Array.isArray(transactions))
    { 
        const chartData = [
           transactions.map((tran) => {
                return {date: tran.date, amount: tran.amount, type: tran.type}
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
    return <Pie {...config} style={{width: "100%", height: "100%"}}/>;
}

export default PieChart
