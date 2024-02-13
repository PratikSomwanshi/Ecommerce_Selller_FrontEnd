"use client";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  image: string;
  price: Number;
  description: string;
  category: string;
};

const categories = [
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
  { label: "Kids", value: "kids" },
];

function page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <section className="flex h-[44rem] items-center justify-center">
      <div className="flex h-[80%] w-[40%] flex-col  ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-[90%] flex-col justify-between rounded-md bg-white px-4 py-8 shadow-md"
        >
          <div className="flex gap-4">
            <div className="w-1/2">
              <Input
                label="Name"
                type="text"
                {...register("name", { required: true })}
              />
              <div className="h-4">
                {errors.name && <span>Name is Required</span>}
              </div>
            </div>
            <div className="w-1/2">
              <Input
                label="price"
                type="number"
                {...register("price", { required: true })}
              />
              <div className="h-4">
                {errors.price && <span>Price is Required</span>}
              </div>
            </div>
          </div>
          <div>
            <Textarea
              label="description"
              placeholder="Enter your description"
              classNames={{
                base: "min-w-xs min-h-[6rem] max-h-[10rem] ",
                input: "min-h-[6rem] max-h-[10rem]",
              }}
              {...register("description", { required: true })}
            />
            <div className="h-4">
              {errors.description && <span>Description is Required</span>}
            </div>
          </div>
          <div className="flex gap-4">
            <div className=" w-1/2">
              <Select
                label="Select an animal"
                {...register("category", { required: true })}
              >
                {categories.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
              <div className="h-4">
                {errors.category && <span>Category is Required</span>}
              </div>
            </div>
            <div>
              <Input
                type="file"
                accept="image/*"
                {...register("image", { required: true })}
              />
              <div className="h-4">
                {errors.image && <span>Image is Required</span>}
              </div>
            </div>
          </div>
          <Button type="submit">click</Button>
        </form>
      </div>
    </section>
  );
}

export default page;
