import { Routes, Route } from 'react-router-dom';
import { Home, DetailSeller } from 'pages';
import { Header } from 'components';
import 'rsuite-table/dist/css/rsuite-table.css';

const App = () => (
  <div>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail-seller" element={<DetailSeller />} />
    </Routes>
  </div>
);

export default App;
