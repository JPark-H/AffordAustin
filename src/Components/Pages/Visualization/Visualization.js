import './Visualization.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import RecipeChart from './Charts/RecipeChart';
import ProduceChart from './Charts/ProduceChart';
import MarketChart from './Charts/MarketChart';
import ChildcareChart from './charts_temp/ChildcareChart';
import HousingChart from './charts_temp/HousingChart';
import JobsChart from './charts_temp/JobsChart'


const Visualization = () => {
    return (
        <div style={{ backgroundColor: "#f0f2f5" }}>
            <h1 className="v_header">Visualizations</h1>
            <h1>Afford Austin Data</h1>
            <ChildcareChart />
            <HousingChart />
            <JobsChart />
            <h1>Stay Fresh Data</h1>
            <RecipeChart />
            <MarketChart />
            <ProduceChart />
        </div>
    );
};

export default Visualization;