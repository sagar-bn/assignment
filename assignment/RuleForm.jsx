import React, { useState } from 'react';

function RuleForm() {
  const [ruleString, setRuleString] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://localhost:8080/api/rule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ruleString }),
    });

    const data = await response.json();
    setResult(data.message);
  };

  return (
    <div>
      <h2>Create Rule</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rule String:</label>
          <input 
            type="text" 
            value={ruleString} 
            onChange={(e) => setRuleString(e.target.value)} 
            placeholder="Enter rule, e.g. (age > 30 AND department = 'Sales')" 
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {result && <p>Result: {result}</p>}
    </div>
  );
}

export default RuleForm;
