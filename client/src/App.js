import './css/App.css';
import Login from './component/Login';
import Dashboard from './component/Dashboard';

// 直接获取url中 ? 后面的内容
const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return code ? <Dashboard code={code}/> : <Login />;
} 

export default App;
