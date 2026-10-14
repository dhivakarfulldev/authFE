import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup"


const ForgotPassword = () => {
    const[isload , setisload] = useState(false);
   const navigate =  useNavigate()
    const formik =  useFormik({
        initialValues:{
            email:""
        },
        validationSchema:Yup.object(
            {
                email:Yup.string().required("email is required")
            }
        ),
        onSubmit: async (values) => {
           try {
            setisload(true)
            const response = await axios.post("/forgot-password" , values);
           toast.success(response.data?.message);
           formik.resetForm();
           navigate("/");
           
           
            
           } catch (error) {
            toast.error(error.response?.data?.message || "resetpassword failed");
           }
           finally{
            setisload(false);
           }
        }
    })
  return (
    <>
    <div className="register-container">
        <form action="" onSubmit={formik.handleSubmit}>
            <div className="field">
                <label htmlFor="">Email</label>
                <input type="email" {...formik.getFieldProps("email")}/>
                {formik.touched.email && formik.errors.email ? <p className="error">{formik.errors.email}</p>:null}
            </div>
            <div className="field">
                {
                    isload ? <button>Sending......</button>:<button type="submit"> send  Reset Link</button>
                }
            </div>
        </form>

    </div>
    </>
  )
}

export default ForgotPassword