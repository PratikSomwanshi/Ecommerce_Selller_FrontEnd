import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";

interface Inputs {
  email: string;
  password: string;
  conform_password: string;
}

function Register() {
  const [iData, setIData] = useState(false);

  async function createUser(data: Inputs) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/api/v1/users/signup",
        data: {
          email: data.email,
          password: data.password,
        },
      });

      if (response.data.data) {
        setIData(true);
      }
    } catch (error) {}
  }

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await createUser(data);
  };

  if (!iData) {
    return (
      <section className="flex h-[44.4rem] w-full">
        <div className="flex w-1/2 items-center justify-end ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex h-3/4 w-3/4  flex-col items-center justify-center rounded-md bg-slate-50 
                        px-6 py-16 text-xl shadow-md "
          >
            <div className="h-[104px] w-10/12">
              <label htmlFor="email" className="mb-1 flex flex-col">
                Email :
                <input
                  className="w-full rounded-md border-b border-black bg-slate-50 px-4
                                    py-2 outline-none
                                    "
                  type="email"
                  {...register("email", { required: true })}
                />
              </label>
              {errors.email && (
                <div className="flex justify-end px-4">
                  <span className="w-full text-end text-red-500">
                    Email is Required
                  </span>
                </div>
              )}
            </div>
            <div className="h-[104px] w-10/12">
              <label htmlFor="password" className="mb-1 flex flex-col">
                Password :
                <input
                  className="w-full rounded-md border-b border-black bg-slate-50  px-4 py-2 outline-none"
                  type="password"
                  {...register("password", {
                    required: true,
                  })}
                />
              </label>
              {errors.password && (
                <div className="flex justify-end px-4">
                  <span className="text-red-500">Password is Required</span>
                </div>
              )}
            </div>
            <div className="h-[104px] w-10/12">
              <label htmlFor="conform_password" className="mb-1 flex flex-col">
                Conform Password :
                <input
                  className="w-full rounded-md border-b border-black bg-slate-50  px-4 py-2 outline-none"
                  type="password"
                  {...register("conform_password", {
                    required: true,
                    validate: (value: string) => {
                      if (watch("password") != value) {
                        return "Password does not match";
                      }
                    },
                  })}
                />
              </label>
              {errors.conform_password && (
                <div className="flex justify-end px-4">
                  <span className="text-red-500">Password do not match</span>
                </div>
              )}
            </div>

            <Button type="submit">Register</Button>
          </form>
        </div>
        <div className="flex w-1/2 items-end ">
          <img
            src="/register.png"
            alt="register"
            className="h-3/4 -translate-x-16"
          />
        </div>
      </section>
    );
  } else {
    return (
      <h1 className="text-2xl">
        Successfully register the Seller
        <Link className="text-blue-600" href="/accounts/login">
          {" "}
          click here to signin
        </Link>
      </h1>
    );
  }
}

export default Register;
