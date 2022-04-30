// import './RecipeChart.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect, useCallback } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { ScatterChart, XAxis, YAxis, ZAxis, Legend, Tooltip, Scatter, CartesianGrid, ResponsiveContainer } from 'recharts';
  

const ProduceChart = () => {
    const [data, setData] = useState([]);
    const [firstNutrientType, setFirstNutrientType] = useState("produce_carbs");
    const [secondNutrientType, setSecondNutrientType] = useState("produce_protein");
    const [loading, setLoading] = useState(true);

    const getProduceData = useCallback (async () => {
        const result =  await axios.get("https://api.stay-fresh.me/products");
        setData(result.data.page);
        setLoading(false);
    }, []);

    useEffect(() => {
        if(loading) {
            getProduceData();
        }
    }, [firstNutrientType, secondNutrientType, getProduceData]);

    return (   
        <>
            <h1>Produce Macronutrients</h1>
            <div>
                <Form>
                    <Form.Group controlId="FirstNutrientSelect">
                        <Form.Label>
                            Select Nutrient Type
                        </Form.Label>
                        <Form.Select onChange={(e) => setFirstNutrientType(e.target.value)}>
                            <option value="produce_carbs">Carbs</option>
                            <option value="produce_protein">Protein</option>
                            <option value="produce_fat">Fat</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="SecondNutrientSelect">
                        <Form.Label>
                            Select Nutrient Type
                        </Form.Label>
                        <Form.Select onChange={(e) => setSecondNutrientType(e.target.value)}>
                            <option value="produce_protein">Protein</option>
                            <option value="produce_carbs">Carbs</option>
                            <option value="produce_fat">Fat</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
    
            {!loading ? (
                <ResponsiveContainer width="100%" height={400}>
                    <ScatterChart
                        data={data}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey={firstNutrientType}
                            name={firstNutrientType.slice(8)}
                            unit="g"
                            type="number"
                            label={firstNutrientType.slice(8)}
                        />
                        <YAxis
                            dataKey={secondNutrientType}
                            unit="g"
                            name={secondNutrientType.slice(8)}
                            type="number"
                            label={secondNutrientType.slice(8)}
                        />
                        <ZAxis dataKey="produce_name" name="Produce Name"/>
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter
                            name="Produce"
                            fill={(firstNutrientType === 'produce_carbs') ? '#8884d8' : ((firstNutrientType === 'produce_protein') ? '#82ca9d' : "#4287f5")}
                        />
                    </ScatterChart>
                </ResponsiveContainer>
            ) : <Spinner animation='border' role="status"/>}
            </div>
        </>
    );
    
};

export default ProduceChart;
