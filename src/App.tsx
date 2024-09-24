import DropZone from './components/DropZone/DropZone';
import Form from './components/Form';

function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <DropZone zoneName='zone1' />
      <DropZone zoneName='zone2' />
      <Form />
    </div>
  );
}

export default App;
