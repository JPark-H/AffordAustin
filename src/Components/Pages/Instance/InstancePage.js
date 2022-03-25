import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

import JInstance from './Models/JInstance';
import HInstance from './Models/HInstance';
import CInstance from './Models/CInstance';

const InstancePage = ({model}) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [instanceData, setInstanceData] = useState([]);

  const getInstanceData = async () => {
    setLoading(true);
    axios.defaults.headers.common['Content-Type'] = 'application/vnd.api+json'
    axios.defaults.headers.common['Accept'] = 'application/vnd.api+json'
    const data = await axios.get(`http://localhost:5000/api/${model.toLowerCase()}/${id}`);
    // const data = await axios.get(`http://api.affordaustin.me/api/${model.toLowerCase()}/${id}`);
    setInstanceData(data.data.data.attributes);
    setLoading(false);
  };

  useEffect(() => {
    getInstanceData();
  }, [id])

  return (
    <div style={{ backgroundColor: "#f0f2f5" }}>
      {loading ? <h3 style={{color: "black"}}>Loading</h3> : <InstanceData model={model} attributes={instanceData} id={id}/>}
    </div>

  );
}

const InstanceData = ({model, id, attributes}) => {
    if (model === "Jobs") {
        return(<JInstance job={attributes} id={id} />);
    } else if (model === "Housing") {
        return(<HInstance housing={attributes} id={id} />);
    } else if (model === "Childcare") {
        return(<CInstance child_care={attributes} id={id} />);
    } else {
        console.log("Problem");
        return;
    }
}

export default InstancePage;