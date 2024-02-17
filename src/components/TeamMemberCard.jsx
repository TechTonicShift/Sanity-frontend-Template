import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BasicExample() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const PROJECT_ID = "la7e5sle"; // Replace with your Sanity project ID
        const DATASET = "production";
        const QUERY = encodeURIComponent('*[_type == "teammember"]');
        const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

        const response = await fetch(URL);
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data.result)) {
          setTeamMembers(data.result);
        } else {
          console.error('Data received from the API does not contain an array of team members.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div>
      {teamMembers.map((member, index) => (
        <Card key={index} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={member.URL} />
          <Card.Body>
            <Card.Title>{member.title}</Card.Title>
            <Card.Text>
              {/* Leave other fields blank */}
            </Card.Text>
            <Button variant="primary" href={member.linkedin} target="_blank">LinkedIn</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default BasicExample;
