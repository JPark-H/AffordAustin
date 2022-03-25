import './InstanceCard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Koala from './../../About/MemberCards/imgs/Koallaaaaa.png'

const CInstanceCard = ({ child_care, id }) => {
    const link = `/ChildCare/${ id }`;
    let ages = child_care.licensed_to_serve_ages.replaceAll(",", ", ");
    return (
        <Link to={ link }>
            <Card className='c_inst_card'>
                {/* Replace */}
                <Card.Img variant='top' src={Koala} />
                <Card.Body>
                    <Card.Title className="text-truncate">{ child_care.operation_name }</Card.Title>
                    <Card.Text><b>Address:</b> { child_care.location_address }</Card.Text>
                    <Card.Text><b>County:</b> { child_care.county }</Card.Text>
                    <Card.Text><b>Days of Operation:</b> { child_care.days_of_operation }</Card.Text>
                    <Card.Text><b>Hours of Operation:</b> { child_care.hours_of_operation }</Card.Text>
                    <Card.Text><b>Ages Served:</b> { ages }</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
};

export default CInstanceCard;