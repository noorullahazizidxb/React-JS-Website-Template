// Layout.jsx
function Layout({ children }) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        {children}
      </div>
    );
  }
  
  export default Layout;
  