import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import AddNotePage from './pages/AddNotePage.jsx';
import EditPage from './pages/EditPage.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import CategoryNotes from './pages/CategoryNotes.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "add-note",
        element: <AddNotePage />
      },
      {
        path: "notes/:slug",
        element: <EditPage />
      },
      {
        path: "category/:categoryId",
        element: <CategoryNotes />
      }

    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
      <RouterProvider router={router} />
     </Provider>
  </StrictMode>
)