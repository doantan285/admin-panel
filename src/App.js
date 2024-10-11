import './App.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider, Page } from '@shopify/polaris';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigator from './components/Navigator';
import Content from './components/Content';

function App() {
  return (
    <AppProvider i18n={enTranslations}>
      {/* <Card sectioned>
        asdasdkasd
      </Card>
      <Page title="Example app">
        <Card sectioned>
          <Button variant="primary" tone="critical" onClick={() => alert('Button clicked!')}>Example button</Button>
        </Card>
        <Card sectioned>
          <Button icon={PlusIcon}>Example button</Button>
        </Card>
      </Page> */}
      <Router>
        <div className='flex h-screen'>
          <Navigator />
          <Content />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
