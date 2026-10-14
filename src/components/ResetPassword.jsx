import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ResetPassword = () => {

    const[isload , setisload] = useState(false);
  const { token } = useParams();

  const navigate = useNavigate();

  const [isloading, setisloading] = useState(true);
  const [istoken, setistoken] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
     

      try {
        await axios.get("/verify-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setistoken(true);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Invalid or Expired Token",
        );
        setistoken(false);
      } finally {
        setisloading(false)
      }
    };
    verifyToken();
  }, [token]);
  const formik = useFormik({
    initialValues: {
      newpassword: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      newpassword: Yup.string()
        .required("newPassword is required")
        .min(6, "atleast 6 characters needed"),
      confirmpassword: Yup.string()
        .required("confirm password is required")
        .oneOf([Yup.ref("newpassword")], "password must match"),
    }),
    onSubmit: async(values) => {
      try {
        setisload(true);
        const response = await axios.put("/change-password" , {
            newpassword:values.newpassword
        },
    {
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    toast.success(response.data.message);
    formik.resetForm();
    navigate("/login")
      } catch (error) {
        toast.error(error.response?.data?.message || "Password Change failed")
      }
      finally{
        setisload(false)
      }
    },
  });

  if (isloading) {
    return (
      <div className="register-container">
        <form action="">
           <h2>Please wait...</h2>
          
          <p>Verifying reset password link .......</p>
        </form>
      </div>
    );
  }

  if (!istoken) {
    return (
      <div className="register-container">
        <form action="">
          <h3>Invalid or Expired Link</h3>
          <div className="field">
            <button onClick={() => navigate("/forgot-password")}>
              Resend link
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="register-container">
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="field">
          <label htmlFor="">New Password</label>
          <input type="paasword" {...formik.getFieldProps("newpassword")} />
          {formik.touched.newpassword && formik.errors.newpassword ? (
            <p className="error">{formik.errors.newpassword}</p>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="">Confirm Password</label>
          <input type="password" {...formik.getFieldProps("confirmpassword")} />
          {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
            <p className="error">{formik.errors.confirmpassword}</p>
          ) : null}
        </div>
        <div className="field">
          {
            isload ? <button>Loading....</button>:<button type="submit">change Password</button>
          }
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
