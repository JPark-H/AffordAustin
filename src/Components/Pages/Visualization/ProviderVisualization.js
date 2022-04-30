import './ProviderVisualization.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import RecipeChart from './Charts/RecipeChart';
import ProduceChart from './Charts/ProduceChart';
import MarketChart from './Charts/MarketChart';


const ProviderVisualization = () => {
    return (
        <div style={{ backgroundColor: "#f0f2f5" }}>
            <RecipeChart />
            <ProduceChart />
            <MarketChart />
        </div>
    );
};

export default ProviderVisualization;