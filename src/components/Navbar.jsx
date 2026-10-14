import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = ({ isLoading , setisLoading }) => {
    const handleLogout = () => {
        localStorage.removeItem("isLoading");
        setisLoading(false);
        toast.success("Logout Successfully");
        
        
    }
  return (
    <div className="container">
      <div className="nav">
        <div className="nav-left">
          <h2>demo</h2>
        </div>
        <div className="nav-right">
          {isLoading ? (
            <>
              <button>Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/register">
                <button>Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
