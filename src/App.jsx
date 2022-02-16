import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import request, { listenerCount } from 'superagent';
// import { useCookies } from 'react-cookie';

export default function App() {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [sparkles, setSparkles] = useState([]);
  const [sparkle, setSparkle] = useState('');
  // const [cookies, setCookie] = useCookies();

  const getSparkles = async () => {
    const res = await request
      .get('http://localhost:7890/api/v1/sparkles')
      .withCredentials();
    setSparkles(res.body.reverse());
  };

  const handleLogin = async () => {
    window.location.assign('http://localhost:7890/api/v1/github/login');
  };

  const handleSparkle = async (e) => {
    e.preventDefault();
    const res = await request
      .post('http://localhost:7890/api/v1/sparkles')
      .withCredentials()
      .send({ text: sparkle });
    setSparkle('');
    await getSparkles();
  };

  const handleLogOut = async () => {
    const res = await request.delete(
      'http://localhost:7890/api/v1/github/sessions'
    );
    console.log(res);
  };

  useEffect(() => {
    (async () => {
      const res = await request
        .get('http://localhost:7890/api/v1/github/dashboard')
        .withCredentials();
      setUser(res.body);
    })();
    (async () => await getSparkles())();
  }, []);

  return !user ? (
    <button onClick={handleLogin}>login with github</button>
  ) : (
    <main>
      <form onSubmit={handleSparkle}>
        <fieldset>
          <legend>welcome to glitter</legend>
          <input
            type="text"
            placeholder="type yr thots"
            value={sparkle}
            onChange={(e) => setSparkle(e.target.value)}
          />
          <button type="submit">sparkle</button>
        </fieldset>
      </form>
      <ul>
        {sparkles.map((sparkle) => (
          <li key={sparkle.id + sparkle.userId}>{sparkle.text}</li>
        ))}
      </ul>
      <button onClick={handleLogOut}>log out</button>
    </main>
  );
}
