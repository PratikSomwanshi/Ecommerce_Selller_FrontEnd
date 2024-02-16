"use client";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Inputs = {
  name: string;
  image: string;
  price: Number;
  description: string;
  category: string;
};

type InputsBoolean = {
  name: boolean;
  image: boolean;
  price: boolean;
  description: boolean;
  category: boolean;
};

const categories = [
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
  { label: "Kids", value: "kids" },
];

function page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  async function getProduct() {
    try {
      setLoading(true);
      let response;
      response = await fetch(
        `http://localhost:5000/api/v1/products/${params.id}`,
      );
      if (response.ok) {
        const res = await response.json();
        setProduct(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      return {
        error: "Failed to fetch the data",
      };
    }
  }

  useEffect(() => {
    setLoading(true);
    getProduct();
  }, []);

  async function updateProduct(data: Inputs) {
    try {
      let response;
      response = await fetch(
        `http://localhost:5000/api/v1/products/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      if (response.ok) {
        const res = await response.json();
        console.log(res);
        router.push("/products");
        return res;
      }
    } catch (error) {
      console.log(error);
      return {
        error: "Failed to fetch the data",
      };
    }
  }

  const [customError, setCustomError] = React.useState({} as InputsBoolean);
  const [imageError, setImageError] = React.useState("");
  const [buffer, setBuffer] = React.useState<any>("");
  const [product, setProduct] = React.useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  function convertToBase64(data: any) {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = async function () {
      console.log(reader.result);
      setBuffer(reader.result);
    };
    reader.onerror = function (error) {
      console.log(error);
    };
  }

  if (product.name == "") {
    return (
      <div className="flex h-[44rem] w-[95rem] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <section className="flex h-[44rem] items-center justify-center">
      <div className="flex h-[80%] w-[40%] flex-col  ">
        <form
          onSubmit={(e) => console.log(e)}
          className="flex h-[90%] flex-col justify-between rounded-md bg-white px-4 py-8 shadow-md"
        >
          <div className="flex gap-4">
            <div className="w-1/2">
              <Input
                label="Name"
                type="text"
                value={product.name}
                onChange={(e) => {
                  if (e.target.value.length === 0) {
                    setProduct({ ...product, name: "" });
                    setCustomError({ ...customError, name: true });
                  } else {
                    setProduct({ ...product, name: e.target.value });
                    setCustomError({ ...customError, name: false });
                  }
                }}
              />
              <div className="h-4">
                {customError.name && <span>Name is Required</span>}
              </div>
            </div>
            <div className="w-1/2">
              <Input
                label="price"
                type="number"
                value={product.price}
                onChange={(e) => {
                  if (e.target.value.length === 0) {
                    setProduct({ ...product, price: "" });
                    setCustomError({ ...customError, price: true });
                  } else {
                    setProduct({ ...product, price: e.target.value });
                    setCustomError({ ...customError, price: false });
                  }
                }}
              />
              <div className="h-4">
                {customError.price && <span>Price is Required</span>}
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
              value={product.description}
              onChange={(e) => {
                if (e.target.value.length === 0) {
                  setProduct({ ...product, description: "" });
                  setCustomError({ ...customError, description: true });
                } else {
                  setProduct({ ...product, description: e.target.value });
                  setCustomError({ ...customError, description: false });
                }
              }}
            />
            <div className="h-4">
              {customError.description && <span>Description is Required</span>}
            </div>
          </div>
          <div className="flex gap-4">
            <div className=" w-1/2">
              <Select
                label="Select an animal"
                defaultSelectedKeys={[product.category]}
                onChange={(e) => {
                  if (e.target.value.length === 0) {
                    setProduct({ ...product, category: "" });
                    setCustomError({ ...customError, category: true });
                  } else {
                    setProduct({ ...product, category: e.target.value });
                    setCustomError({ ...customError, category: false });
                  }
                }}
              >
                {categories.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
              <div className="h-4">
                {customError.category && <span>Category is Required</span>}
              </div>
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                className="w-full"
                // value={product.image}
                onChange={(e) => {
                  if (e.target.files) {
                    try {
                      if (e.target.files[0].size > 500000) {
                        setImageError("Image size should be less than 500kb");
                        return;
                      }
                      setImageError("");
                      convertToBase64(e.target.files[0]);
                    } catch (error) {
                      setImageError("Image is Required");
                    }
                  } else {
                    console.log("no file");
                    setImageError("Image is Required");
                  }
                }}
              />
              <div className="h-4">
                {imageError != "" && <span>{imageError}</span>}
              </div>
            </div>
          </div>
          <Button
            disabled={
              customError.name ||
              customError.price ||
              customError.description ||
              customError.category ||
              imageError != "" ||
              buffer == ""
                ? true
                : false
            }
            color={
              customError.name ||
              customError.price ||
              customError.description ||
              customError.category ||
              imageError != "" ||
              buffer == ""
                ? "default"
                : "primary"
            }
            onClick={async () =>
              await updateProduct({
                name: product.name,
                price: parseInt(product.price),
                description: product.description,
                category: product.category,
                image: buffer,
              })
            }
          >
            {customError.name ||
            customError.price ||
            customError.description ||
            customError.category ||
            imageError != "" ||
            buffer == ""
              ? "something wrong in the form"
              : "Submit"}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default page;
