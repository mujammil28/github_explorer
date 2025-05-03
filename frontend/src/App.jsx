import { Route, Routes } from 'react-router-dom';
import UserProfile from './components/userProfile';
import FollowersWrapper from '../src/components/followersWrapper'
import Home from './components/home';
import RepoDetails from './components/repoDetails';
import './App.css';
const App = () => {
  return (
    <Routes>
     <Route path="/" element={<Home />} />
  <Route path="/user/:username" element={<UserProfile />} />
  <Route path="/followers/:username" element={<FollowersWrapper />} />
  <Route path="/repos/:username" element={<RepoDetails />} /> {/* ✅ Add this */}
    </Routes>
  );
};

export default App;
