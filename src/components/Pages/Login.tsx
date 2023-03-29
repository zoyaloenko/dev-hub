import { ClassAttributes, InputHTMLAttributes, useContext, useEffect, useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AppContext/AppContext";
import { onAuthStateChanged, auth } from "../firebase/firebase";
import { FormikConfig, FormikValues } from 'formik';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from '@material-tailwind/react';


const Login = () => {
    const [loading, setLoading] = useState(false);
    const { signInWithGoogle, loginWithEmailAndPassword } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        onAuthStateChanged(auth, (user) => {
          if(user) {
            navigate('/');
            setLoading(false)
          } else {
            setLoading(false)
          }
        })
    }, [navigate])


    let initialValues = {
        email: "",
        password: "",
      };

      const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .required("Required")
          .min(6, "Must be at least 6 characters long")
          .matches(/^[a-zA-Z]+$/, "Password can only contain letters"),
      });    


      const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const { email, password } = formik.values;
        if (formik.isValid === true) {
          loginWithEmailAndPassword(email, password);
          setLoading(true);
        } else {
          setLoading(false);
          alert("Check your input fields");
        }
    
        console.log("formik", formik);
      };


      interface CustomFormikConfig<Values> extends FormikConfig<Values> {
          values: { email: any; password: any; };
          isValid: boolean;
          getFieldProps(arg0: string): JSX.IntrinsicAttributes & import("react").ClassAttributes<HTMLInputElement> & import("react").InputHTMLAttributes<HTMLInputElement>;
          touched: any;
          errors: any;
          handleSubmit: (e: { preventDefault: () => void }) => void;
        }


      const formikCustom: CustomFormikConfig<FormikValues> = {
            initialValues,
            validationSchema,
            handleSubmit,
            values: {
              email: undefined,
              password: undefined
            },
            isValid: false,
            getFieldProps: function (arg0: string): JSX.IntrinsicAttributes & ClassAttributes<HTMLInputElement> & InputHTMLAttributes<HTMLInputElement> {
              throw new Error("Function not implemented.");
            },
            touched: undefined,
            errors: undefined,
            onSubmit: function (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>): void | Promise<any> {
              throw new Error("Function not implemented.");
            }
          };

      const formik = useFormik(formikCustom);

    
    
  return (
    // <>
    // {loading 
    // ? (<div>Loading...</div>)
    // : (<div>
    //     <h3>LOGIN</h3>
    //     <form onSubmit={handleSubmit}>
    //         <input type="email" {...formik.getFieldProps("email")}>
    //         </input>
    //         <div>{formik.touched.email && formik.errors.email && (<p>{formikCustom.errors.email}</p>)}</div>
    //         <input type="password" {...formik.getFieldProps("password")}>
    //         </input>
    //         <div>{formik.touched.password && formik.errors.password && (<p>{formikCustom.errors.password}</p>)}</div>
    //         <button type="submit">Login</button>
    //     </form>
    //     <button onClick={signInWithGoogle}>Sign In with Google</button>
    //     <Link to="/reset">Reset the password</Link>
    //     <div>
    //         <p>Don't have an account?</p>
    //         <Link to="/register">Register</Link>
    //     </div>
    //     </div>)
    // }
    // </>

    <div className="grid grid-cols-1 h-screen justify-items-center items-center">
    <Card className="w-96">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          LOGIN
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-2">
            <Input
              label="Email"
              type="email"
              size="lg"
              {...formik.getFieldProps('email')}
            />
            
          </div>
          <div>
            {formik.touched.email && formik.errors.email && (
              <Typography variant="small" color="red"></Typography>
            )}
          </div>

          <div className="mt-4 mb-2">
            <Input
              label="Password"
              type="password"
              size="lg"
              {...formik.getFieldProps('password')}
            />
            
          </div>
          <div>
            {formik.touched.password && formik.errors.password && (
              <Typography varient="small" color="red">
                {formik.errors.password}
              </Typography>
            )}
          </div>
          <Button variant="gradient" fullWidth className="mb-4" type="submit">
            Login
          </Button>
        </form>
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth className="mb-4" onClick={signInWithGoogle}>
          Sign In with Google
        </Button>
        <Link to={'/reset'}>
          <p className="ml-1 font-bold text-sm text-blue-500 text-center ">
            Reset your password
          </p>
        </Link>
        <div className="mt-6 flex items-center text-base justify-center">
          Don't have an account?
          <Link to={'/register'}>
            <p className="ml-1 font-bold text-sm text-blue-500 text-center ">
              Register
            </p>
          </Link>
        </div>
      </CardFooter>
    </Card>
  </div>

  )
}

export default Login