import React, { useState } from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SchoolList } from './components/SchoolList';
import { SchoolForm } from './components/SchoolForm';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [activeTab, setActiveTab] = useState('list');

  const handleSchoolCreated = () => {
    setRefresh(!refresh);
    setActiveTab('list');
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Реєстр шкільних закладів</h1>
      
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || 'list')}
        className="mb-4"
      >
        <Tab eventKey="list" title="Список закладів">
          <SchoolList 
            refresh={refresh} 
            onRefresh={() => setRefresh(!refresh)} 
          />
        </Tab>
        
        <Tab eventKey="create" title="Створити новий заклад">
          <SchoolForm onSuccess={handleSchoolCreated} />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default App;
