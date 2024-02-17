import { useForm, SubmitHandler } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";

interface Inputs {
  name: string;
  email: string;
  password: string;
  conform_password: string;
  shop_name: string;
}

function Register() {
  const [iData, setIData] = useState(false);
  const [customError, setCustomError] = useState<any>();

  async function createUser(data: Inputs) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:2000/api/v1/sellers",
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          shop_name: data.shop_name,
        },
      });

      console.log(response.data);

      setCustomError("");
      setIData(true);
    } catch (error) {
      console.log(error);
      setCustomError(error);
    }
  }

  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await createUser(data);
    // console.log(data);
  };

  if (customError) {
    const error = customError.response.data.error.explanation;
    if (customError.response.data.error.explanation.code == 11000) {
      if (error.value.email) {
        return (
          <div className="text-2xl">
            <span>
              email :{" "}
              <span className="text-red-500">"{error.value.email}"</span>{" "}
              already register,{" "}
            </span>
            <span>retry with different email</span>
          </div>
        );
      } else {
        return (
          <div className="text-2xl">
            <span>
              shop :{" "}
              <span className="text-red-500">"{error.value.shop_name}"</span>{" "}
              already register,{" "}
            </span>
            <span>retry with different shop</span>
          </div>
        );
      }
    }
    return (
      <h1 className="text-xl">
        Error: {customError.response.data.data.message}
      </h1>
    );
    console.log(error);
  }

  if (!iData) {
    return (
      <section className="flex h-[44.4rem] w-full">
        <div className="flex w-1/2 items-center justify-end ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex h-[90%] w-3/4  flex-col items-center justify-center rounded-md bg-slate-50 
                        px-6 py-16 text-xl shadow-md "
          >
            <div className="h-[104px] w-10/12">
              <label htmlFor="email" className="mb-1 flex flex-col">
                Name:
                <input
                  className="w-full rounded-md border-b border-black bg-slate-50 px-4 py-2 outline-none"
                  type="text"
                  {...register("name", { required: true })}
                />
              </label>
              <div className="flex h-10 justify-end px-4">
                {errors.name && (
                  <span className="w-full text-end text-red-500">
                    name is Required
                  </span>
                )}
              </div>
            </div>
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
              <div className="flex h-10 justify-end px-4">
                {errors.email && (
                  <span className="w-full text-end text-red-500">
                    Email is Required
                  </span>
                )}
              </div>
            </div>
            <div className="h-[104px] w-10/12">
              <label htmlFor="shop" className="mb-1 flex flex-col">
                Shop Name :
                <input
                  className="w-full rounded-md border-b border-black bg-slate-50 px-4 py-2 outline-none"
                  type="text"
                  {...register("shop_name", { required: true })}
                />
              </label>
              <div className="flex h-10 justify-end px-4">
                {errors.shop_name && (
                  <span className="w-full text-end text-red-500">
                    Shop Name is Required
                  </span>
                )}
              </div>
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
              <div className="flex h-10 justify-end px-4">
                {errors.password && (
                  <span className="text-red-500">Password is Required</span>
                )}
              </div>
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
              <div className="flex h-10 justify-end px-4">
                {errors.conform_password && (
                  <span className="text-red-500">Password do not match</span>
                )}
              </div>
            </div>

            <div className="mt-3 w-80 ">
              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>
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
