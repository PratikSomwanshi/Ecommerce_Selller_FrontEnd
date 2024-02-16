"use client";
import { Button, Input } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCookies } from "react-cookie";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

interface Inputs {
  email: string;
  password: string;
}

function Register() {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const time = moment(new Date()).add(1, "d").toDate();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (user: Inputs) => {
      return await fetch("http://localhost:8000/api/v1/users/signin", {
        method: "post",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((res) => res.json());
    },
  });

  useEffect(() => {
    if (mutation.data && mutation.data.data.token) {
      setCookie("accessToken", mutation.data.data.token, {
        expires: time,
      });

      router.push("/");
    }
  }, [mutation.data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => mutation.mutate(data);

  // if (cookies["accessToken"])

  if (mutation.isError && mutation.error.name == "TypeError") {
    return (
      <div className="center__screen__text">
        <h2>Failed to Connect to Server, Please Try Again after some time</h2>
      </div>
    );
  }

  return (
    <section className="flex h-[44.4rem] w-full overflow-hidden">
      <div className="flex w-1/2 items-end justify-end">
        <img
          src="/login.png"
          alt="register"
          className="z-10 h-[90%] -translate-x-20 translate-y-14"
        />
      </div>
      <div className="flex w-1/2 items-center justify-start ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex h-3/4 w-3/4  -translate-x-24 flex-col items-center justify-center rounded-md 
                        bg-slate-50 px-6 py-16 text-xl 
                        shadow-md
                        "
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
                {...register("password", { required: true })}
              />
            </label>
            {errors.password && (
              <div className="flex justify-end px-4">
                <span className="text-red-500">Password is Required</span>
              </div>
            )}
          </div>
          {mutation.data && <span>{mutation.data.error.explanation}</span>}
          <Button type="submit">Login</Button>
        </form>
      </div>
    </section>
  );
}

export default Register;
