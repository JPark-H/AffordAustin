// import './MarketChart.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect, useCallback } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { BarChart, XAxis, YAxis, ZAxis, Legend, Tooltip, Bar, CartesianGrid, ResponsiveContainer } from 'recharts';
  

const MarketChart = () => {
    const [data, setData] = useState([
        {'name': 'Texas', 'count': 0},
        {'name': 'California', 'count': 0},
        {'name': 'New York', 'count': 0},
        {'name': 'New Jersey', 'count': 0},
        {'name': 'Connecticut', 'count': 0},
        {'name': 'Rhode Island', 'count': 0}
    ]);
    const [loading, setLoading] = useState(true);

    const getMarketData = useCallback (async () => {
        let result =  await axios.get("https://api.stay-fresh.me/locations");
        result = result.data.page;
        let newData = data;
        result.map(location => {
            const address = location.location_address;
            if (address.includes("Texas")) {
                newData[0].count += 1;
            } else if (address.includes("California")) {
                newData[1].count += 1;
            } else if (address.includes("New York")) {
                newData[2].count += 1;
            } else if (address.includes("New Jersey")) {
                newData[3].count += 1;
            } else if (address.includes("Connecticut")) {
                newData[4].count += 1;
            } else if (address.includes("Rhode Island")) {
                newData[5].count += 1;
            }
        });
        setData(newData);
        setLoading(false);
    }, []);

    useEffect(() => {
        if(loading) {
            getMarketData();
        }
    }, [getMarketData]);

    return (   
        <>
            <h1>Market Locations</h1>
            <div>
                {!loading ? (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart /*width={700} height={600}*/ data={data} /*margin={{top: 10, right: 50, left: 50, bottom: 50}}*/>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" label="State"/>
                            <YAxis dataKey="count" label="Number of Markets" ticks={[5, 10, 15, 20, 25, 30, 35, 40]}/>
                            <Tooltip />
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                ) : <Spinner animation='border' role="status"/>}
            </div>
        </>
    );
    
};

export default MarketChart;
