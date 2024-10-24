import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [ruleString, setRuleString] = useState('');
  const [rules, setRules] = useState([]);
  const [jsonData, setJsonData] = useState('');
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const createRule = async () => {
    setErrorMessage(''); 
    try {
      const response = await axios.post('http://localhost:5000/create_rule', { rule: ruleString });
      setRules([...rules, response.data.rule_node]); 
      setRuleString(''); 
    } catch (error) {
      setErrorMessage('Error creating rule: ' + (error.response?.data?.error || error.message));
    }
  };

  const combineRules = async () => {
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:5000/combine_rules', { rules });
      alert('Rules combined successfully');
    } catch (error) {
      setErrorMessage('Error combining rules: ' + (error.response?.data?.error || error.message));
    }
  };

  const evaluateRule = async () => {
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:5000/evaluate_rule', {
        rule_node: rules[0],
        data: JSON.parse(jsonData),
      });
      setEvaluationResult(response.data.evaluation_result);
    } catch (error) {
      setErrorMessage('Error evaluating rule: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="App">
      <h1>Rule Engine Application</h1>

      <div>
        <h3>Create Rule</h3>
        <input
          type="text"
          placeholder="Enter rule string"
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
        />
        <button onClick={createRule}>Create Rule</button>
      </div>

      <div>
        <h3>Rules</h3>
        <ul>
          {rules.map((rule, index) => (
            <li key={index}>{JSON.stringify(rule)}</li>
          ))}
        </ul>
      </div>

      <div>
        <button onClick={combineRules}>Combine Rules</button>
      </div>

      <div>
        <h3>Evaluate Rule</h3>
        <textarea
          placeholder='Enter JSON data (e.g. {"age": 35, "department": "Sales"})'
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          rows={4}
          cols={50}
        />
        <button onClick={evaluateRule}>Evaluate Rule</button>
      </div>

      <div>
        <h3>Evaluation Result</h3>
        {evaluationResult !== null && (
          <p>Result: {evaluationResult ? 'True' : 'False'}</p>
        )}
      </div>

      {errorMessage && (
        <div style={{ color: 'red' }}>
          <h3>Error</h3>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default App;
