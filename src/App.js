import React from 'react';
import Navigation from './components/Navigation';
import Field from './components/Field';
import Button from './components/Button';
import ManipulationPanel from './components/ManipulationPanel';
import useSnakeGame from './hooks/useSnakeGame';


function App() {
  const {
    body,
    difficulty,
    fields,
    onStart,
    onStop,
    onRestart,
    status,
    onChangeDirection,
    onChangeDifficulty,
  } = useSnakeGame()

  return (
    <div className="App">
      <header className="header">
        <div className="title-container">
          <h1 className="title">Snake Game</h1>
        </div>
        <Navigation length={body.length} difficulty={difficulty}  onChangeDifficulty={onChangeDifficulty}/>
      </header>
      <main className="main">
        <Field fields={fields} />
      </main>
      <footer className="footer">
        <Button 
          status={status}
          onStop={onStop}
          onStart={onStart} 
          onRestart={onRestart}
        />
        <ManipulationPanel onChange={onChangeDirection}/>
      </footer>
    </div>
  );
}

export default App;
