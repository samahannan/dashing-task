import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { Product } from "../Table/Table";
import "./ProductForm.scss";
import { BASE_URL } from "../../constants";

export default function ProductForm({
  classes,
  type = "",
  defaultData = {
    title: "",
    category: "",
    brand: "",
    price: "",
    id: "",
  },
  successCallback,
}: {
  classes?: string;
  type: "edit" | "add" | "";
  defaultData?: Product | null;
  successCallback: (data: Product) => void;
}) {
  const [formState, setFormState] = useState(
    defaultData || {
      title: "",
      category: "",
      brand: "",
      price: "",
    }
  );
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    // make sure we reset default data on form type change
    if (type === "add") {
      setFormState({
        title: "",
        category: "",
        brand: "",
        price: "",
      });
    }
  }, [type]);

  const updateFormState = (key: string, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { title, brand, category, price } = formState;
    setFormLoading(true);

    const fetchURL =
      type === "edit" && defaultData
        ? `${BASE_URL}/${defaultData.id}`
        : `${BASE_URL}/add`;
    const method = type === "edit" && defaultData ? "PUT" : "POST";
    // editing existing product
    try {
      const response = await fetch(fetchURL, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          brand,
          category,
          price,
        }),
      });
      if (!response.ok) throw new Error(response.statusText);
      const json = await response.json();
      setFormLoading(false);
      successCallback(json);
    } catch (error) {
      // alert user
    }
  };

  return (
    <>
      <form
        className={`product_form ${classes} ${formLoading ? "loading" : ""}`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="form_inputs">
          <div className="input_holder">
            <input
              type="text"
              placeholder="Title"
              value={formState.title}
              onChange={(e) => updateFormState("title", e.target.value)}
            />
          </div>
          <div className="input_holder">
            <input
              type="text"
              placeholder="Brand"
              value={formState.brand}
              onChange={(e) => updateFormState("brand", e.target.value)}
            />
          </div>
          <div className="input_holder">
            <input
              type="text"
              placeholder="Category"
              value={formState.category}
              onChange={(e) => updateFormState("category", e.target.value)}
            />
          </div>
          <div className="input_holder">
            <input
              type="text"
              placeholder="Price"
              value={formState.price}
              onChange={(e) => updateFormState("price", e.target.value)}
            />
          </div>
        </div>
        <div className="form_actions">
          <Button text="Save" type="submit" />
        </div>
      </form>
    </>
  );
}
