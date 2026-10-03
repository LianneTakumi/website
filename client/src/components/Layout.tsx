import { Link, Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/dashboard"
            className="text-xl font-bold text-gray-900"
          >
            Task Manager
          </Link>

          <nav className="flex items-center gap-5 text-sm">
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-blue-600"
            >
              Dashboard
            </Link>

            <Link
              to="/tasks"
              className="text-gray-600 hover:text-blue-600"
            >
              Tasks
            </Link>

            <Link
              to="/profile"
              className="text-gray-600 hover:text-blue-600"
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="font-medium text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;