import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import './App.css';

function App() {

  // for email validation
  const [emailError, setEmailError] = useState('');
    const validateEmail = (e) => {
      var email = e.target.value;
  
      if (validator.isEmail(email)) {
        setEmailError('Valid Email');
      } else {
        setEmailError('Enter Valid Email');
      }
    }

  // for password validation and compare
  const { register, formState: { errors }, handleSubmit, watch } = useForm();
  const password = useRef({});
  const newpassword = useRef({});

  password.current = watch("password", "");
  newpassword.current = watch("password_repeat", "");
  const onSubmit = async (data) => {
    if (password.current.length === 0) {
      alert("You must specify a password");
      return;
    }
    var match = password.current.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=[^!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]*[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~])(?=\D*\d)/
    );
    if (!match) {
      alert(
        "Password Should contain at least one Number, one upperCase and one lowercase letter and a special character"
      );
      return;
    }

    if (password.current.length < 8) {
      alert("Password must have at least 8 characters");
      return;
    }

    if (newpassword.current !== password.current) {
      alert("The passwords do not match");
      return;
    }

    alert("The password is strong and safe");
  };

  return (
    <div className="App">
      <form onSubmit={(e) => e.preventDefault()}>
        <h2>Login</h2>

        <input type='text' placeholder='Email' onChange={(e) => validateEmail(e)} /> <br />
        <span>{emailError}</span> <br />

        <input placeholder="Password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
        <br /><br />

        <input placeholder="Confirm Password" {...register("password_repeat")} />
        {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
        <br /><br />

        <input type="submit" onClick={handleSubmit(onSubmit)} />
      </form>
    </div>
  );
}

export default App;