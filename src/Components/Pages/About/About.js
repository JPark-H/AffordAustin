import { Row, Container, Button, Card, Col, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import MemberCards from "./MemberCards/MemberCards"
import GitTotals from "./GitTotals/GitTotals"
import './About.css'
import axios from "axios";
import { useEffect, useState } from 'react';
import teamInfo from './TeamData'
const tools = ["React", "Amplify", "GitLab", "NameCheap", "Postman"];

const tools_desc = ["Used to develop the frontend using UI components.", 
"Managed Amazon Web Services backend used for deploying frontend code.",
"Contains production site code. Used for seamless and collaborative integration.",
"Used to acquire a domain name for a useable URL and SSL authentication.",
"Helped design the backend RESTful API design and documentation."]

const apis = [
	["SerpAPI Jobs API", "Used to find job postings.", "https://serpapi.com/google-jobs-api"], 
	["data.texas.gov API", "Contains two disparate data sources used for finding metadata related to housing and childcare in Austin.", "https://data.texas.gov/"], 
	["Google Maps", "Provides an iframe to embed Google Maps data.", "https://www.google.com/maps"],
	["Google Images", "Used to retrieve related image data for model instances.", "https://www.google.com/imghp?hl=EN"]
];

let total_issues = 0;
let total_commits = 0;

const contributor_to_team_num = {
	"sca": 0,
	"din": 1,
	"jay": 2,
	"pre": 3,
	"phe": 3,
	"sab": 4,
	"sha": 4
}

function About() {
	const[ total_commits, setCommits ] = useState(0);
	const[ total_issues, setIssues ] = useState(0);
	useEffect(() => {
		async function getGitlabStats() {
			await axios.get('https://gitlab.com/api/v4/projects/33875511/repository/contributors').then(resp => {
				let c = 0;
				resp.data.forEach((contributor) => {
					const { name, email, commits } = contributor;
					let team_num = contributor_to_team_num[name.substring(0,3).toLowerCase()];
					teamInfo[team_num]["commits"] = commits;  
					c += commits;
				});
				setCommits(c);
			});
			let i = 0;
			Promise.all(teamInfo.map(async (member) => {
				let issues_api = "https://gitlab.com/api/v4/projects/33875511/issues_statistics?author_username=" + member.user;
				await axios.get(issues_api).then((resp) => {
					member["issues"] = resp["data"]["statistics"]["counts"]["closed"];
					i += resp["data"]["statistics"]["counts"]["closed"];
				});
			})).then(() => {
				setIssues(i);
			});
		};
		getGitlabStats();
	}, []);
	return (
		<div className="App" style={{ backgroundColor: "#f0f2f5", paddingBottom: "3em" }}>
			{/* About us block */}
			<h1 className="section_header">About Us</h1>
			<Container>
				<Card border="light" className='about_text mx-auto' style={{ borderRadius: "2rem" }}>
					<Card.Body className="" style={{ color: "black" }}>
						The cost of living in Austin has reportedly risen 17.8% since 2010. In the past 
						year alone, the listing prices for houses spiked 28%. At AffordAustin, we strive
						to provide plausible living situations in Austin amidst harsh inflation by streamlining 
						the process of finding economic housing, child care, and work. Users will be able to 
						search by any of the aforementioned categories based on their priority, then find nearby 
						instances of the other two categories.
					</Card.Body>
				</Card>
			</Container>

			{/* Member Cards */}
			<MemberCards teamInfo={teamInfo}/>

			{/*Git Total Stats*/}
			<h1 className="section_header">Git Statistics</h1>
			<GitTotals total_commits={total_commits} total_issues={total_issues}/>

			{/*Tool Info*/}
			<h1 className="section_header">Tools Used</h1>
			<Card border="light" className="instance_data mx-auto" style={{
				borderRadius: "2rem", borderTopLeftRadius: "2rem"
			}}>
				<ListGroup variant="flush" style={{
				}}>
					{tools.map((tool, index) => (<ListGroup.Item className="about_list" key={tool}><b>{tool}</b><br></br>{tools_desc[index]}</ListGroup.Item>
					))}
				</ListGroup>
			</Card>

			{/*API Info*/}
			<h1 className="section_header">Data Source Links</h1>
			<Card border="light" className="instance_data mx-auto" style={{
				borderRadius: "2rem", borderTopLeftRadius: "2rem"
			}}>
				<ListGroup variant="flush" style={{
					borderRadius: "2rem",
				}}>
					{apis.map(api => (<a href={ api[2] } target='_blank'><ListGroup.Item className='link about_list' key={api[0]}><b>{api[0]}</b><br></br>{ api[1] }</ListGroup.Item></a>
					))}
				</ListGroup>
			</Card>

			<h1 className="section_header">Interesting Results</h1>
			<ul>
				<li><h2 className="temp_interesting">The most affordable housing instances are located in Travis County.</h2></li>
				<li><h2 className="temp_interesting">The most daycare intances are located in Harris Country.</h2></li>
			</ul>
			


		</div>
	);
}

export default About;
