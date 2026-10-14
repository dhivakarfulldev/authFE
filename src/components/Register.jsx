import { useFormik } from "formik"
import Navbar from "./Navbar"
import * as Yup from "yup"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


const Register = ({ setisLoading }) => {

    const[isload , setisload] = useState(false);
     const navigate = useNavigate()
   const formik =  useFormik({
        initialValues:{
            Name:"",
            Email:"",
            Password:""

        },
        validationSchema:Yup.object({
            Name:Yup.string().required("Name is Required"),
            Email:Yup.string().required("Email is Required"),
            Password:Yup.string().required("Password is Required").min(6 , "Minimum 6 characters needed"),

        }),
        onSubmit: async (values) => {
            try {
                
                setisload(true)
                const response = await axios.post("/register" , {
                    name:values.Name,
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
            finally{
                setisload(false);
            }
        }

        
    })
    
    
  return (
    <>
    <Navbar     />
    <div className="register-container">
        <form action="" onSubmit={formik.handleSubmit}>
            <h1>Register</h1>
            <p>Create your account</p>
            <div  className="field">
                <label htmlFor="">Name</label>
                <input type="text" 
                {...formik.getFieldProps("Name")}
                />
                {formik.touched.Name&&formik.errors.Name ? <p className="error">{formik.errors.Name}</p>:null}
                
            </div>
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
                {
                    isload ? <button>Loading.....</button>:<button type="submit">Register</button>
                }
            </div>
        </form>

    </div>
    </>
  )
}

export default Register