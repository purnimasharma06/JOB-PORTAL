import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    file: "",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsAcceptedAt, setTermsAcceptedAt] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, user } = useSelector((store) => store.auth);

  // Handle normal input fields
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // Handle profile image
  const ChangeFilehandler = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0],
    });
  };

  // Handle terms checkbox
  const handleTermsChange = (e) => {
    const isChecked = e.target.checked;

    setTermsAccepted(isChecked);

    setTermsAcceptedAt(
      isChecked ? new Date().toISOString() : null
    );
  };

  // Submit form
  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("SUBMIT BUTTON CLICKED");

    // Check terms
    if (!termsAccepted) {
      toast.error(
        "You must accept the Terms and Conditions to register."
      );
      return;
    }

    // Create FormData
    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);

    if (termsAcceptedAt) {
      formData.append(
        "termsAcceptedAt",
        termsAcceptedAt
      );
    }

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      console.log("SETTING LOADING TRUE");

      dispatch(setLoading(true));

      console.log("API URL:");
      console.log(`${USER_API_ENDPOINT}/register`);

      console.log("BEFORE API CALL");

      const res = await axios.post(
        `${USER_API_ENDPOINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("AFTER API CALL");
      console.log(res.data);

      if (res.data.success) {
        toast.success(res.data.message);

        navigate("/verify-otp", {
          state: {
            email: input.email,
          },
        });
      }

    } catch (error) {
      console.log("API ERROR:");
      console.log(error);

      console.log(
        error.response?.data
      );

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";

      toast.error(errorMessage);

    } finally {
      console.log("SETTING LOADING FALSE");

      dispatch(setLoading(false));
    }
  };

  // Redirect logged-in user
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 px-4">

        <form
          onSubmit={submitHandler}
          className="w-full max-w-2xl bg-white border border-gray-100 shadow-2xl rounded-2xl p-8 my-10"
        >

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="font-extrabold text-3xl text-[#6B3AC2]">
              Create an Account
            </h1>

            <p className="text-gray-500 text-sm mt-2">
              Join Job Hunt today
            </p>
          </div>


          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <Label className="text-gray-700 font-semibold">
                Fullname
              </Label>

              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="John Doe"
                className="mt-1 focus:ring-[#6B3AC2]"
              />
            </div>


            <div>
              <Label className="text-gray-700 font-semibold">
                Email
              </Label>

              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="johndoe@gmail.com"
                className="mt-1 focus:ring-[#6B3AC2]"
              />
            </div>


            <div>
              <Label className="text-gray-700 font-semibold">
                Password
              </Label>

              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="********"
                className="mt-1 focus:ring-[#6B3AC2]"
              />
            </div>


            <div>
              <Label className="text-gray-700 font-semibold">
                Phone Number
              </Label>

              <Input
                type="tel"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="+1234567890"
                className="mt-1 focus:ring-[#6B3AC2]"
              />
            </div>

          </div>


          {/* Role and Photo */}
          <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

            <div>
              <Label className="text-gray-700 font-semibold">
                Select Role
              </Label>

              <RadioGroup className="flex items-center gap-6 mt-2">

                <div className="flex items-center space-x-2">

                  <Input
                    id="student"
                    type="radio"
                    name="role"
                    value="Student"
                    checked={input.role === "Student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer w-4 h-4"
                  />

                  <Label
                    htmlFor="student"
                    className="cursor-pointer"
                  >
                    Student
                  </Label>

                </div>


                <div className="flex items-center space-x-2">

                  <Input
                    id="recruiter"
                    type="radio"
                    name="role"
                    value="Recruiter"
                    checked={input.role === "Recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer w-4 h-4"
                  />

                  <Label
                    htmlFor="recruiter"
                    className="cursor-pointer"
                  >
                    Recruiter
                  </Label>

                </div>

              </RadioGroup>
            </div>


            {/* Profile Photo */}
            <div className="w-full md:w-auto">

              <Label className="text-gray-700 font-semibold block mb-2">
                Profile Photo
              </Label>

              <Input
                type="file"
                accept="image/*"
                onChange={ChangeFilehandler}
                className="cursor-pointer w-full"
              />

            </div>

          </div>


          {/* Terms */}
          <div className="mt-8 flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">

            <Input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={handleTermsChange}
              className="mt-1 cursor-pointer w-4 h-4"
            />

            <Label
              htmlFor="terms"
              className="text-sm text-gray-700 leading-snug cursor-pointer font-normal"
            >

              I agree to the{" "}

              <Link
                to="/terms"
                target="_blank"
                className="text-[#6B3AC2] font-semibold hover:underline"
              >
                Terms and Conditions
              </Link>

              , including data privacy and user conduct policies. I
              understand my acceptance timestamp will be securely
              recorded.

            </Label>

          </div>


          {/* Submit Button */}
          <div className="mt-8">

            {loading ? (

              <button
                disabled
                type="button"
                className="w-full bg-[#6B3AC2] text-white py-3 rounded-lg flex justify-center items-center"
              >

                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

              </button>

            ) : (

              <button
                type="submit"
                disabled={!termsAccepted}
                className={`w-full py-3 rounded-lg font-semibold text-md transition-colors ${
                  termsAccepted
                    ? "bg-[#6B3AC2] hover:bg-[#5b30a6] text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Register
              </button>

            )}

          </div>


          {/* Login Link */}
          <div className="mt-6 text-center">

            <p className="text-gray-600 text-sm">

              Already have an account?{" "}

              <Link
                to="/login"
                className="text-[#FA4F09] hover:underline font-semibold"
              >
                Login here
              </Link>

            </p>

          </div>

        </form>

      </div>
    </div>
  );
};

export default Register;