import React from 'react';

const TestApp: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: '#333' }}>MNIT Live - System Test</h1>
      <p style={{ color: '#666' }}>✅ React is working!</p>
      <p style={{ color: '#666' }}>✅ TypeScript is compiling!</p>
      <p style={{ color: '#666' }}>✅ Vite dev server is running!</p>
      <p style={{ color: '#666' }}>Current time: {new Date().toLocaleTimeString()}</p>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e8f4f8', borderRadius: '5px' }}>
        <h3>Debug Information:</h3>
        <p>• Port: 5174</p>
        <p>• Environment: Development</p>
        <p>• React version: {React.version}</p>
      </div>
    </div>
  );
};

export default TestApp;
