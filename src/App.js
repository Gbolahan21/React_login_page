import React, { useState } from "react";
import validator from "validator";
import { Formik } from "formik";
import * as Yup from "yup";
import "./App.css";

var isMatch = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=[^!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]*[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~])(?=\D*\d)/
);

const a = isMatch.test('Frredom@1123')
console.log({a});


const Schema = Yup.object().shape({
  password: Yup.string().required("This field is required")
  .test('is-valid',
  (d) => `${d.path} should contain at least one Number, one upperCase and one lowercase letter and a special character`,
  (value) => isMatch.test(value) ),

  changepassword: Yup.string().when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    )
  })
});

function App() {
  const [emailError, setEmailError] = useState('');
    const validateEmail = (e) => {
      var email = e.target.value;
  
      if (validator.isEmail(email)) {
        setEmailError('Valid Email');
      } else {
        setEmailError('Enter Valid Email');
      }
    }
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        changepassword: ""
      }}
      validationSchema={Schema}
      onSubmit={() => {}}
    >
      {({ values, errors, handleSubmit, handleChange, handleBlur }) => {
        return (
          <div className="App">
          <form onSubmit={handleSubmit}>
          <h2>Login</h2>
            <input type='text' placeholder='Email' onChange={(e) => validateEmail(e)} /> <br />
            <span>{emailError}</span>
            <br /> <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
            /> <br />
            <span class="error">
              {errors.password}
            </span>
            <br /><br />
            <input
              type="password"
              name="changepassword"
              placeholder="Confirm Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.changepassword}
            /> <br />
            <span class="error">
              {errors.changepassword}
            </span>
            <br /><br/>
            <input type='submit' />
          </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default App
