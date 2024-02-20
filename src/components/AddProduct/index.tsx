"use client";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import useStore from "@/store/seller";

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

function AddProduct() {
  const { seller_id } = useStore();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const [buffer, setBuffer] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [customError, setCustomError] = useState("");

  // function convertToBase64(data: any) {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(data);
  //   reader.onload = async function () {
  //     console.log(reader.result);
  //     setBuffer(reader.result);
  //   };
  //   reader.onerror = function (error) {
  //     setError("image", {
  //       type: "manual",
  //       message: "Invalid Image",
  //     });
  //     return;
  //   };

  //   return reader.result;
  // }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!data.image[0]) {
      setError("image", {
        type: "manual",
        message: "Image is Required",
      });
      return;
    }

    const d: any = data.image[0];

    if (d.size >= 500000) {
      setError("image", {
        type: "manual",
        message: "Image size should be less than 500kb",
      });
    } else {
      try {
        setLoading(true);

        let formData = new FormData();
        formData.append("product", d);

        const res = await axios({
          method: "post",
          url: "http://localhost:5000/api/v1/products/upload",
          data: formData,
        });

        const response = await axios.post(
          "http://localhost:2000/api/v1/sellers/product",
          {
            name: data.name,
            price: data.price,
            description: data.description,
            category: data.category,
            seller: seller_id,
            image: res.data.data.image_url,
          },
        );

        setLoading(false);
        // console.log(response);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setCustomError("Failed to add the product");
      }
    }
  };

  if (customError) {
    return (
      <div className="flex h-[44rem] w-full items-center justify-center">
        <h3 className="text-2xl">{customError}</h3>
        <Link href="/">Home Page</Link>
      </div>
    );
  }

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
                isInvalid={errors.name ? true : false}
                errorMessage={
                  errors.name && (
                    <div className="h-4 text-base">
                      {errors.name && <span>Name is Required</span>}
                    </div>
                  )
                }
                {...register("name", { required: true })}
              />
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
            <div className="w-1/2">
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
            <div className="w-1/2 ">
              <div className="flex h-[77%] w-72 flex-col  items-start justify-center  overflow-hidden rounded-md bg-[#f4f4f5] px-2 hover:bg-[#e4e4e7] active:bg-[#e4e4e7]">
                <input
                  type="file"
                  accept="image/*"
                  className="w-full"
                  {...register("image", {
                    required: true,
                  })}
                />
              </div>
              <div className="h-4">
                {errors.image && <span>{errors.image.message}</span>}
              </div>
            </div>
          </div>
          <Button type="submit">
            {loading ? <Spinner size="sm" /> : "ADD PRODUCT"}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default AddProduct;
