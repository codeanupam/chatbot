import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import './App.css';  // Import the App.css file

const App = () => {
    const [codeFile, setCodeFile] = useState(null);
    const [language, setLanguage] = useState('Java');
    const [testCases, setTestCases] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setCodeFile(e.target.files[0]);
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!codeFile) {
            setError('Please upload a code file.');
            return;
        }

        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('codeFile', codeFile);
        formData.append('language', language);

        try {
            const response = await axios.post('http://localhost:5000/generate-tests', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setTestCases(response.data.testCases);
        } catch (error) {
            setError('Error generating test cases');
        } finally {
            setLoading(false);
        }
    };

    return (
      <Container>
        <Row className="justify-content-center">
          <Col className="middle" xs={12} sm={10} md={8}>
            <Card>
              <Card.Body>
                <h1 style={{ color: " #ff00ff" }}>Code Test Case Generator</h1>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="fileInput">
                    <Form.Label>Upload Code File</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} />
                  </Form.Group>

                  <Form.Group controlId="languageSelect">
                    <Form.Label>Select Language</Form.Label>
                    <Form.Control
                      as="select"
                      value={language}
                      onChange={handleLanguageChange}
                    >
                      <option>Java</option>
                      <option>C#</option>
                      <option>Python</option>
                    </Form.Control>
                  </Form.Group>

                  <Button variant="primary" type="submit" disabled={loading} >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Generate Test Cases"
                    )}
                  </Button>
                </Form>

                {error && (
                  <Alert variant="danger" className="mt-3">
                    {error}
                  </Alert>
                )}
                {testCases && (
                  <div className="mt-4">
                    <h4>Generated Test Cases</h4>
                    <div className="test-cases-box">
                      <pre>{testCases}</pre>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
};

export default App;
