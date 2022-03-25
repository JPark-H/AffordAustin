import './InstanceCard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Koala from './../../About/MemberCards/imgs/Koallaaaaa.png'

const JInstanceCard = ({ job, id }) => {
    const link = `/Jobs/${ id }`;
    return (
        <Link to={ link }>
            <Card className='inst_card'>
                {/* Replace */}
                <Card.Img variant='top' src={ Koala } />
                <Card.Body>
                    <Card.Title className="text-truncate">{ job.title }</Card.Title>
                    <Card.Text><b>Company:</b> { job.company_name }</Card.Text>
                    <Card.Text><b>Posted:</b> { job.posted_at }</Card.Text>
                    <Card.Text><b>Schedule:</b> { job.schedule_type }</Card.Text>
                    <Card.Text><b>Rating:</b> { job.rating }</Card.Text>
                    <Card.Text><b>Reviews:</b> { job.reviews }</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
};

export default JInstanceCard;