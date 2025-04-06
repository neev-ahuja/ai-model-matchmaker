import AIModelMatchmaker from './AIModelMatchmaker';
import LandingPage from './LandingPage';
import {Routes , Route} from 'react-router-dom';
function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/chat' element={<AIModelMatchmaker />} />
      </Routes>
    </div>
  );
}


export default App;
