import './InstanceCard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Koala from './../../About/MemberCards/imgs/Koallaaaaa.png'

const HInstanceCard = ({ housing, id }) => {
    const link = `/Housing/${id}`;
    return (
        <Link to={ link }>
            <Card className='inst_card'>
                <Card.Img variant='top' src={Koala} />
                <Card.Body>
                    <Card.Title className="text-truncate">{ housing.project_name }</Card.Title>
                    <Card.Text><b>Tenure :</b> { housing.tenure }</Card.Text>
                    <Card.Text><b>Unit-Type:</b> { housing.unit_type }</Card.Text>
                    <Card.Text><b>Num of Units:</b> { housing.total_units }</Card.Text>
                    <Card.Text><b>Ground Lease:</b> { housing.ground_lease }</Card.Text>
                    <Card.Text><b>Zip-Code:</b> { housing.zip_code }</Card.Text>
                    
                </Card.Body>
            </Card>
        </Link>
    )
};

export default HInstanceCard;