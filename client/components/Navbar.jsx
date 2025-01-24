export default function Navbar({ logout, username, email }) {
  console.log(email);
  return (
    <div className="navbar bg-base-200 shadow-md px-4">
      <div className="navbar-start">
        {/* Dropdown for mobile */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-auto  shadow"
          >
            <li>
              <a className="hover:bg-primary hover:text-white">Item 1</a>
            </li>
            <li>
              <a className="hover:bg-primary hover:text-white">Parent</a>
              <ul className="p-2">
                <li>
                  <a className="hover:bg-primary hover:text-white">Submenu 1</a>
                </li>
                <li>
                  <a className="hover:bg-primary hover:text-white">Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a className="hover:bg-primary hover:text-white">Item 3</a>
            </li>
          </ul>
        </div>
        {/* Logo */}
        <a className="btn btn-ghost normal-case text-2xl font-bold text-primary">
          Website
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        {/* Horizontal menu for large screens */}
        <ul className="menu menu-horizontal px-1">
          <li>
            <a className="hover:bg-primary hover:text-white">Item 1</a>
          </li>
          <li tabIndex={0}>
            <details>
              <summary className="hover:bg-primary hover:text-white">
                Parent
              </summary>
              <ul className="p-2 bg-base-100 rounded-box shadow">
                <li>
                  <a className="hover:bg-primary hover:text-white">Submenu 1</a>
                </li>
                <li>
                  <a className="hover:bg-primary hover:text-white">Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a className="hover:bg-primary hover:text-white">Item 3</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end" role="button" tabIndex={0}>
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-12 rounded-full">
              <span>{username?.slice(0, 1).toUpperCase()}</span>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <a
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </a>
            </li>
            <li>
              <a>{email}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
