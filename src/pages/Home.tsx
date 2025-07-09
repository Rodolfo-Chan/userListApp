import { useAppSelector, useAppDispatch } from '../app/hooks';
import UserList from '../Components/UserList';
import LoginForm from '../Components/LoginForm';
import { logout } from '../features/auth/authSlice';
import UserProfileCard from '../Components/UserProfileCard';

const Home = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated && user ? (
        <>
          <header className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              Bienvenido - {user.name.title} {user.name.first} 

            </h1>
            <button
              onClick={() => dispatch(logout())}
              className="text-sm text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Cerrar sesión
            </button>
          </header>

          <main className="p-6">
            <UserProfileCard />
            <UserList />
          </main>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default Home;