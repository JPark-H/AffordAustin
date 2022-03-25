import "./Jobs.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Container,
  Row,
  Col,
  Stack,
  Image,
  ListGroup,
  Button,
  Nav,
} from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";

const Jobs = ({ job }) => {
  // TODO: Update REGEX, breaks IOS, seems to break
  // job.description = job.description.replace(/(?<!\n)\n(?!\n) /g, '')

  return (
    <div className="jobs">
      <Container className="instance">
        <Row>
          <Col className="header">{job.title}</Col>
        </Row>

        <Row className="align-items-center">
          <Col>
            <Image className="image" src={job.image_H}></Image>
          </Col>
          <Col>
            <div
              className="map"
              dangerouslySetInnerHTML={{ __html: job.map_H }}
            ></div>
          </Col>
        </Row>

        <Row className="info">
          <Col xs={8}>
            <Stack>
              <h3>Description</h3>
              <p>{job.description}</p>
            </Stack>
          </Col>
          <Col xs={3}>
            <Stack gap={3}>
              <div class="company">
                <h4>Company</h4>
                <p>{job.company_name}</p>
              </div>

              <div class="via">
                <h4>Via</h4>
                <Button variant="primary" href={job.via_link}>
                  {job.via}
                </Button>
              </div>

              <div class="features">
                <h4>Features</h4>
                <ListGroup>
                  {job.features.map((feature) => (
                    <ListGroup.Item key={feature}>{feature}</ListGroup.Item>
                  ))}
                </ListGroup>
              </div>

              <div class="rating">
                <h4>Rating</h4>
                <p>
                  <b>{job.rating}</b> / 5 | {job.reviews} Reviews
                </p>
              </div>

              <div class="housing">
                <h4>Nearby Housing</h4>
                <Nav>
                  <Nav.Link as={Link} to="/Housing/1">
                    Legacy Apartments
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Housing/2">
                    1905 E 9th Street
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Housing/3">
                    2009 Salina Street
                  </Nav.Link>
                </Nav>
              </div>

              <div class="childcare">
                <h4>Nearby Childcare Services</h4>
                <Nav>
                  <Nav.Link as={Link} to="/Childcare/1">
                    Zilker EAC YMCA
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Childcare/2">
                    Children's Center of Austin
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Childcare/3">
                    A+ Kids Playschool
                  </Nav.Link>
                </Nav>
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Jobs;

const Job1 = () => {
  const job = {
    title: "Sourcing Analyst",
    company_name: "Visa",
    via: "LinkedIn",
    via_link:
      "https://www.linkedin.com/jobs/view/senior-sourcing-analyst-procurement-operations-cep-corporate-employee-and-professional-services-at-visa-2928877775?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
    posted_at: "2 days ago",
    schedule_type: "Full-Time",
    features: ["Health Insurance"],
    rating: 3.7,
    reviews: 802,
    image_H:
      "https://media.bizj.us/view/img/11316712/research-park-plaza-1864*1200xx3000-1688-0-156.jpg",
    map_H:
      '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3440.256040458655!2d-97.75810648487582!3d30.428842881744096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644cce48b23786f%3A0x56ab8be37eb6c62c!2sVisa!5e0!3m2!1sen!2sus!4v1645922044910!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
    description:
      "Visa is a world leader in digital payments, facilitating more than 215 billion payments transactions between consumers, merchants, financial institutions and government entities across more than 200 countries and territories each year. Our mission is to connect the world through the most innovative, convenient, reliable and secure payments network, enabling individuals... businesses and economies to thrive.\n\nWhen you join Visa, you join a culture of purpose and belonging – where your growth is priority, your identity is embraced, and the work you do matters. We believe that economies that include everyone everywhere, uplift everyone everywhere. Your work will have a direct impact on billions of people around the world – helping unlock financial access to enable the future of money movement.\n\nJoin Visa: A Network Working for Everyone.\n\nJob Description\n\nThe primary purpose of this position is to procure corporate/facilities, employee/human resources, and professional services, and guide our internal business partners through the procurement process while ensuring adherence to compliance regulations in accordance with Global Sourcing and Procurement policies and procedures.\n\nResponsibilities\n• Creates, writes, negotiates, and reviews CEP contracts. Works with internal business partners to establish agreements that reflect the interests of the company.\n• Works with legal counsel and other stakeholders to negotiate terms and conditions of the contracts.\n• Ensures contract accuracy and rewrites or amends as necessary.\n• Works directly with suppliers/vendors to obtain materials/products/services through preparation and administration of Statements of Work/Quotes to validate favorable terms on quality, delivery and price and ensure end-user needs are met on a consistent basis.\n• Participates in supplier selection and moderately complex contract negotiations, involving Legal and other departments as necessary, to achieve favorable terms on quality, delivery, and price, and ensure end-user needs are met and deliver cost savings.\n• Works with internal customer groups to help establish specifications and validate pricing and terms.\n• Interacts with Legal and other company departments and agencies to analyze risks associated with agreements and develop language to minimize exposure whenever needed.\n• Reviews and approves contracts in accordance with company terms and conditions.\n• Guides internal customers and stakeholders through the end-to-end procurement process.\n• Coordinates with internal customers and category managers to assist in sourcing initiatives\n• Interacts with vendors and internal customers to resolve transactional issues.\n• Coordinates signature requirements, both internal and with Visa suppliers.\n• Addresses inquiries on order status of products and services\n• Resolves discrepancies related to procurement issues\n• Delivers support to internal customers in an effective and efficient manner.\n• Troubleshoots internal customer issues regarding the services provided by Procurement Operations.\n• Documents the problem and provide appropriate follow up to meet internal customer service levels.\n• Responds to queries from Internal Customers.\n• Processes purchase requisitions and update existing purchase orders as requested by business partners.\nQualifications\n\nBasic Qualifications\n• 2 or more years of work experience with a Bachelor’s Degree or an Advanced Degree (e.g. Masters,\n\nMBA, JD, MD, or PhD)\n\nPreferred Qualifications\n• 3 or more years of work experience with a Bachelor’s Degree or more than 2 years of work\n\nexperience with an Advanced Degree (e.g. Masters, MBA, JD, MD)\n\nOther Qualifications\n• At least 3+ years as a sourcing and/or procurement professional, preferably with a major financial\n\ninstitution or payment card company\n• Experience in procuring services in the corporate/facilities, employee, and professional services\n\ncategories.\n• Understanding of web technology; software models (i.e. Software Licensing and SaaS)\n• Knowledgeable of Procurement policies and procedures and their application to the processing of\n\npurchasing transactions (e.g., processing purchase requisitions, processing purchase orders,\n\nmodifying purchase orders, executing bidding for transactions). 3+ years of procurement\n\nexperience in shared services or centralized procurement operations center\n• Experience in negotiating and drafting low to moderately complex contracts (i.e., Statements of\n\nWork, Amendments, Master Agreements, Subscription Agreements, Consulting Agreements, SaaS\n\nand SLSAs)\n• Proven track record of successfully executing multiple types of transactions simultaneously\n• Excellent written, oral and presentation skills and an ability to synthesize information and make\n\nclear, concise recommendations on course of action\n• Knowledgeable about contract terms and conditions\n• Experience managing internal and external customers and users. Strong relationship management\n\nskills and ability to influence at a mid-management level both internally and externally\n• High level of self-motivation and initiative, and ability to operate as an effective team player\n• Understanding of process mapping and continuous improvement methodologies.\n• Proficiency in purchasing systems and organizational interfaces (including, Ariba, Coupa, DocuSign,\n\nand Oracle)\n• Proficiency in Microsoft Office: Outlook, Teams, Excel, Word, and PowerPoint\n• Professional accreditation in sourcing, procurement or purchasing a plus\n\nAdditional Information\n\nVisa has adopted a COVID-19 vaccination policy to safeguard the health and well-being of our employees and visitors. As a condition of employment, all employees based in the U.S. are required to be fully vaccinated for COVID-19, unless a reasonable accommodation is approved or as otherwise required by law\n\nWork Hours: Varies upon the needs of the department\n\nTravel Requirements: This position requires travel 5-10% of the time.\n\nMental/Physical Requirements: This position will be performed in an office setting. The position will require the incumbent to sit and stand at a desk, communicate in person and by telephone, frequently operate standard office equipment, such as telephones and computers.\n\nVisa is an EEO Employer. Qualified applicants will receive consideration for employment without regard to race, color, religion, sex, national origin, sexual orientation, gender identity, disability or protected veteran status. Visa will also consider for employment qualified applicants with criminal histories in a manner consistent with EEOC guidelines and applicable local law.\n\nVisa will consider for employment qualified applicants with criminal histories in a manner consistent with applicable local law, including the requirements of Article 49 of the San Francisco Police Code.\n\nJob Number: REF006082W",
  };

  return <Jobs job={job} />;
};

const Job2 = () => {
  const job = {
    title: "Server - Stella San Jac",
    company_name: "White Lodging",
    via: "White Lodging Jobs",
    via_link:
      "https://careers.whitelodging.com/server-stella-san-jac/job/18644810?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
    posted_at: "3 days ago",
    schedule_type: "Full-Time",
    features: [
      "No Degree Mentioned",
      "Health Insurance",
      "Dental Insurance",
      "Paid Time Off",
    ],
    rating: 4.2,
    reviews: 1385,
    image_H:
      "https://images.squarespace-cdn.com/content/v1/587658442e69cfaf7ca23e53/1484172984491-PMJQPBRFE423YGHCP5MQ/stella+san+jac-9047.jpg?format=2500w",
    map_H:
      '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.9634713727446!2d-97.74256368487964!3d30.266621981802032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b5a795fe1b77%3A0x10af9c03ddc6bb3c!2sStella%20San%20Jac!5e0!3m2!1sen!2sus!4v1645918711952!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
    description:
      "The restaurant server serves food and beverage to restaurant guests in a timely fashion ensuring excellent service and guest satisfaction every time. Must be willing to I.D all guests and monitor beverage consumption of guests as to not overserve...\n\nResponsibilities\n• Provide high quality service to all guests\n• Know and live the mission and the White Lodging/brand basics.\n• Complete all necessary set up, side work and closing duties as assigned\n• Check restaurant before, after and during shift for cleanliness and remove any debris\n• Be knowledgeable of all menu items, their garnish, contents and preparation methods. Be prepared to answer any guest questions about the menu in a direct, concise way.\n• Know any daily features and specials the restaurant is offering\n• Use suggestive selling and up sell items to increase the check average of the restaurant\n• Take guest orders correctly, read the order back to the guest and ring orders correctly into Micros. Check screen before sending order to make sure any modifications to order are correct.\n• Check food presentation before taking the food from the kitchen to the guest. Hot food hot and fresh.\n• Check guest satisfaction with food quality within two bites\n• Make sure check is presented correctly, free from errors and in a timely manner.\n• To follow and comply with all WL cash handling policies and end of shift paperwork\n• To follow all WL policies of work procedures and attendance\n• Learn and maintain all information regarding the hotel and engage in pre-shift\n• Promote teamwork and friendly safe work environment\n• Any other reasonable duties required\n• Follow all WL standards of uniform\n• Know all the bar products on offer to the guest\n• To make conversation with guests and create a personal connection\n\nOther Information\n\nCOMPETENCIES\n• Outgoing, sociable and personal\n• Eye for detail\n• Excellent oral and hearing skills\n• Passion for service\n• Positive can do attitude\n\nSKILLS\n• Can handle high volume and work under pressure\n• Multitasking\n• Reliability\n• Customer service skills\n• Organized\n• Teamwork\n• Flexible work schedule\n\nEDUCATION/EXPERIENCE\n• Previous restaurant or bar experience preferred but not essential\n• Previous customer service role preferred not essential\n\nWORKING CONDITIONS\n• Must be able to stand and move at fast pace for long periods of time\n• Must be able to work long hours when business needs require\n\nFULL TIME BENEFIT OVERVIEW\n• Medical, Dental, and Vision\n• Life Insurance\n• Employee Assistance Program (EAP)\n• 401(k)\n• Vacation and Paid Time Off (PTO)\n• Tuition Reimbursement\n• Complimentary and Discounted Rooms\n\nLocation Code: 3108",
  };

  return <Jobs job={job} />;
};

const Job3 = () => {
  const job = {
    title: "PRN Registered Nurse Weekends",
    company_name: "Brookdale Home Health",
    via: "Monster",
    via_link:
      "https://www.monster.com/job-openings/prn-registered-nurse-home-health-austin-tx--7bd81496-d0e8-41d0-a401-1c754a4944f4?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
    posted_at: "11 days ago",
    schedule_type: "Full-Time",
    features: ["Health Insurance"],
    rating: 1.0,
    reviews: 1,
    image_H:
      "https://www.brookdale.com/content/dam/brookdale/en/communities/photos/11109-brookdale-westlake-hills/brookdale-westlake-hills-entrance.jpg",
    map_H:
      '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3442.5929603948184!2d-97.75084868487737!3d30.3625159817677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644cb0c3dcb4331%3A0xaee70b450673cf86!2sBrookdale%20Home%20Health%20Austin!5e0!3m2!1sen!2sus!4v1645923847167!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
    description:
      "Introduction\n...\nDo you have the PRN career opportunities as a Registered Nurse you want with your current employer? We have an exciting opportunity for you to join Brookdale Home Health which is part of the nation's leading provider of healthcare services, HCA Healthcare. Now hiring PRN on the weekends in North and South Austin.\nBenefits\n\nWe are committed to providing our employees with the support they need. At Brookdale Home Health, we offer an array of benefits for PRN colleagues. Some of our unique benefits we offer include:\n• Medical Benefits designed to meet the requirements of the Affordable Care Act\n• Wellbeing Resources\n• 401K (100% annual match - 3% to 9% of pay based on years of service)\n• Employee Stock Purchase Program (ESPP)\n• HCA Healthcare Hope Fund\n• Disaster Relief Support\n\nLearn more about Employee Benefits\n\nOur teams are a committed, caring group of colleagues. Do you want to work as a(an) Registered Nurse PRN Weekends where your passion for creating positive patient interactions are valued? If you are dedicated to caring for the well-being of others, this could be your next opportunity. We want your knowledge and expertise!\nJob Summary and Qualifications\n\np>Provides coordinated skilled nursing care to patients of all age groups, in the home. Demonstrates accountability and responsibility in collaborating with the interdisciplinary team to establish and achieve patient goals and maintain high quality patient care. Performs in accordance with physician's orders and under the supervision of the Manager, Clinical Services.\n\nWhat you will do in this role:\n• Assesses home care patients identifying physical, psychosocial and environmental needs as evidenced by documentation, clinical records, case conferences, team reports, call-in logs and on-site evaluations.\n• Completes OASIS, assessment and visit paperwork according to agency policy. Assures clinical notes accurately indicate continuing communication and coordination of services with the physician, other interdisciplinary team members and patient/family/caregiver.\n• Communicates significant findings, problems and changes to Manager, Clinical Services and physician, and documents all findings, communications, and appropriate interventions.\n• Supervises and provides clinical direction to home health aides and LPNs/LVNs to ensure quality and continuity of services provided.\n• Responsible for participating in on-call rotation and emergency call according to agency policy.\n\nWhat qualifications you will need:\n• Graduate of an accredited school of professional nursing\n• Minimum of one or more years of home health, public nursing or acute hospital nursing experience\n• Familiar with Medicare home health regulations, documentation requirements, ICD-10 coding and PPS (Strongly preferred)\n• Reliable transportation and proof of valid automobile liability insurance\n• Must have valid driver's license\n• Current BCLS Certification prior to providing patient care.\n\nOur home health agency is committed to providing excellent, multidisciplinary services delivered by an experienced team of healthcare professionals. We offer skilled nursing, therapy, and social work services in the comfort of our patient's homes. Under the supervision of a physician, our team of professionals develop an individualized plan of care for patients with the goal of restoring independence as quickly as possible.\n\nHCA Healthcare has been named one of the World's Most Ethical Companies by Ethisphere Institute for over a decade. In recent years, HCA Healthcare spent an estimated $3.7 billion in cost for the delivery of charitable care, uninsured discounts, and other uncompensated expenses.\n\n\"Bricks and mortar do not make a hospital. People do.\"- Dr. Thomas Frist, Sr.\nHCA Healthcare Co-Founder\n\nIf you are looking for an opportunity that provides satisfaction and personal growth, we encourage you to apply for our Registered Nurse PRN Weekends opening. We review all applications. Qualified candidates will be contacted for interviews. Unlock the possibilities and apply today!\n\nWe are an equal opportunity employer and value diversity at our company. We do not discriminate on the basis of race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or disability status",
  };

  return <Jobs job={job} />;
};

export { Job1, Job2, Job3 };
