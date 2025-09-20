// Versão de debug - apenas texto simples
import React from 'react';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'black', 
      color: 'white', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>🎉 React está funcionando!</h1>
      <p>Se você está vendo isso, o problema não é o React.</p>
      <p>Testando componentes...</p>
      
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => alert('Botão funcionando!')}
          style={{
            backgroundColor: 'red',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Testar Botão
        </button>
      </div>
    </div>
  );
}

export default App;
