
import { useRouteError, Link } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-gray-600 mb-4">
          {error.statusText || error.message}
        </p>
        <Link 
          to="/" 
          className="text-blue-500 hover:text-blue-600 underline"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}