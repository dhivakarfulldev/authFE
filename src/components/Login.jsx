import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"
import { useFormik } from "formik";
import * as Yup from "yup"
import axios from "axios";
import { toast } from "react-toastify";


const Login = ({setisLoading}) => {
      const navigate = useNavigate()
    const handleclick = () => {
        navigate("/forgot-password")
    }

    
   const formik =  useFormik({
        initialValues:{
           
            Email:"",
            Password:""

        },
        validationSchema:Yup.object({
           
            Email:Yup.string().required("Email is Required"),
            Password:Yup.string().required("Password is Required").min(6 , "Minimum 6 characters needed"),

        }),
        onSubmit: async (values) => {
            try {
                
                
                const response = await axios.post("/login" , {
                   
                    email:values.Email,
                    password:values.Password
                });
                console.log(response.data);
                toast.success(response.data.message);
                localStorage.setItem("isLoading" , true);
                setisLoading(true);
                formik.resetForm();
                navigate("/");




            } catch (error) {
                toast.error(error.response?.data?.message || "registration failed")
            }
        }
})
  return (
    <>
    <Navbar  />
    <div className="register-container">
        <form action="" onSubmit={formik.handleSubmit}>
            <h1>Login</h1>
          
           
            <div className="field">
                <label htmlFor="">Email</label>
                <input type="email" 
                {...formik.getFieldProps("Email")}/>
                  {formik.touched.Email&&formik.errors.Email ? <p className="error">{formik.errors.Email}</p>:null}
            </div>
            <div className="field">
                <label htmlFor="">Password</label>
                <input type="password" 
                {...formik.getFieldProps("Password")}/>
                {formik.touched.Password&&formik.errors.Password ? <p className="error">{formik.errors.Password }</p>:null}
            </div>

            <div className="field">
                <button type="submit">Login</button>
            </div>

            <p className="error-btn" onClick={handleclick}>forgotpassword</p>
        </form>

    </div>
    </>
  )
}

export default Login