import React, { useState } from 'react';

function EvaluateForm() {
  const [data, setData] = useState({ age: '', department: '', salary: '', experience: '' });
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://localhost:8080/api/evaluate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    setResult(responseData.result);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Evaluate Data</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" name="age" placeholder="Age" onChange={handleChange} />
        <input type="text" name="department" placeholder="Department" onChange={handleChange} />
        <input type="number" name="salary" placeholder="Salary" onChange={handleChange} />
        <input type="number" name="experience" placeholder="Experience" onChange={handleChange} />
        <button type="submit">Evaluate</button>
      </form>
      {result && <p>Evaluation Result: {result}</p>}
    </div>
  );
}

export default EvaluateForm;
