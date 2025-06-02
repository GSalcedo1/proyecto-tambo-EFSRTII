import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { InventoryProvider } from './InventoryInf/InventoryInf';
import { Header } from './components/Header/Header';
import { InventoryPage } from './pages/InventoryPage';
import { ReportPage } from './pages/ReportPage';
import './App.css';

export function App() {
  return (
    <InventoryProvider>
      <BrowserRouter>
        <div className="tambo-app">
          <Header />

          <main>
            <Routes>
              <Route path="/" element={<InventoryPage />} />
              <Route path="/reports" element={<ReportPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </InventoryProvider>
  );
}

export default App;
