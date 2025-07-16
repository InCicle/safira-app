import { ISetState } from '@/interfaces/SetState';
import { Link } from '@mui/material';

interface HomeViewProps {
  count: number;
  setCount: ISetState<number>;
}

export const HomeView: React.FC<HomeViewProps> = ({ count, setCount }) => {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={'/react.svg'} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <Link href="/404" underline="none">
        <h1>404</h1>
      </Link>
    </>
  );
};
