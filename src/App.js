import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./App.css";

var isMatch = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=[^!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]*[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~])(?=\D*\d)/
);

const Schema = Yup.object().shape({
  email: Yup.string().email('Email must be valid email').required(),
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

          <div className="row justify-content-center">
          <div className="col-md-6">
            <span className="anchor" id="formLogin"></span> 
            <div className="card card-outline-secondary">
              <div className="card-header">
                <h3 className="mb-0">Login</h3>
              </div>
              <div className="card-body">
                  <div className="form-group">
                    <label for="uname1">Email</label> 
										<input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    className="form-control" 
                    id="uname1" required="" />
                    <br />
                    <span class="error">
                      {errors.email}
                    </span>
                  </div>
                  <div class="form-group">
                    <label>Password</label> 
										<input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    autocomplete="new-password" 
                    class="form-control" id="pwd1" required="" />
                    <br />
                    <span class="error">
                      {errors.password}
                    </span>
                  </div>
                  <div class="form-group">
                    <label>Confirm Password</label> 
										<input 
                    type="password"
                    name="changepassword"
                    placeholder="Confirm Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.changepassword}
                    autocomplete="new-password" 
                    class="form-control" id="pwd1" required="" />
                     <span class="error">
                      {errors.changepassword}
                    </span>
                  </div>
                  <div className="form-check small">
                    <label className="form-check-label">
											<input className="form-check-input" type="checkbox" /> 
											<span>Remember me</span>
                    </label>
                  </div>
									<button className="btn btn-success btn-lg float-right" type="button">Login</button>
              </div>
            </div>
          </div>
        </div>
          </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default App
