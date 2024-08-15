"use client";
import React, { useEffect, useState } from "react";
import { Camera, Lock } from "lucide-react";
import faceIO from "@faceio/fiojs";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { LoginFormInputData } from "@/formdata";
import toast from "react-hot-toast";
let LoginFormInputData = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your Email",
  },
  {
    name: "pin",
    type: "password",
    label: "Password",
    placeholder: "Enter your Password"
  }
]
const Login = () => {
  return (
    <div className="w-full">
      <Navbar />
      <MainContent />
      {/* <Footer/> */}
    </div>
  );
};

const Navbar = () => {
  const navbarlist = ["About", "Contact"];

  return (
    <div className="w-full py-6 bg-[#000] flex">
      <div className="w-full px-8 flex items-center justify-between">
        <span className="text-2xl font-bold flex items-center gap-3 text-white">
          <Lock />
          Secure Voting
        </span>
        <div className="flex items-center gap-8 justify-end">
          <div className="hidden lg:flex items-center gap-8">
            {navbarlist?.map((nav, index) => {
              return (
                <Link
                  key={index}
                  className="text-base font-normal text-[#fff]"
                  href={"/"}
                >
                  {nav}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const MainContent = () => {
  const router = useRouter();
  // console.log(process.env.NEXT_PUBLIC_FACE_IO_ID)
  const faceio = new faceIO(process.env.NEXT_PUBLIC_KEY);
  // console.log(faceio);
  const [payload, setPayload] = useState({ email: "", pin: "" });
  const [isSigningUp, setIsSigningUp] = useState(false); // New state variable
  // console.log(payload)
  const onChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  let faceInfo;
  if (typeof window !== "undefined") {
    faceInfo = localStorage.getItem("faceId")
  }

  const toggleSignUpPage = () => {
    setIsSigningUp((prevState) => !prevState);
  };
  const registerNewUser = async () => {
    try {
      const userInfo = await faceio.enroll({
        locale: "auto",
        token: "fioaf212",

        payload: {
          email: payload.emainl,
          pin: payload.pin,
        },
      });

      localStorage.setItem("userinfo", JSON.stringify(userInfo));
      if (userInfo) {
        router.push("/");
      }
      // router.push("/dashboard");

      console.log(userInfo);
    } catch (error) {
      console.error("Enrollment failed:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!payload?.emainl && !payload?.pin) {
      toast.error("Please fill in the user crendentials");
    } else {
      registerNewUser();
    }
  };

  let userinfo;
  if (typeof window !== "undefined") {
    userinfo = localStorage.getItem("userinfo")
  }
  // console.log(userinfo)
  useEffect(() => {
    if (userinfo !== null) {
      router.push('/')
    }
  }, [userinfo])
  return (
    <div className="w-full min-h-[100vh] items-center justify-center py-24 flex flex-col gap-4">
      <div className="w-[90%] rounded-2xl md:w-[500px] mx-auto border py-12 px-8 flex flex-col gap-8 ">
        <span className="text-3xl md:text-4xl font-bold gap-3 text-[#000]">
          Sign In
          <span className="block font-normal text-base pt-2 text-grey">
            {/* Create an account */}
            Login to your account
          </span>
        </span>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {LoginFormInputData.map((form, index) => {
            return (
              <label
                htmlFor={form?.label}
                className="text-base flex flex-col gap-2 font-semibold"
              >
                {form?.label}
                <input
                  type={form?.type}
                  onChange={onChange}
                  name={form?.name}
                  value={payload[form?.name]}
                  placeholder={form?.placeholder}
                  className="font-normal px-6 rounded-md w-full h-[50px] border outline-none"
                />
              </label>
            );
          })}

          <button
            type="submit"
            className="p-3 hover:opacity-[.6] cursor-pointer px-4 rounded-sm text-base text-center font-semibold text-[#fff] bg-[#000]"
          >
            Sign up
          </button>
        </form>
        <div className="flex justify-center">
          <span className="underline mt-4" onClick={toggleSignUpPage}>
            {isSigningUp ? "Login instead" : "Sign Up instead"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
