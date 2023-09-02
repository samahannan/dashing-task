import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import "./Table.scss";
import Loader from "../Loader/Loader";
import SortIcon from "../SortIcon/SortIcon";
import Modal from "../Modal/Modal";
import { BASE_URL } from "../../constants";
import ProductForm from "../ProductForm/ProductForm";

export type Product = {
  brand: string;
  category: string;
  id: string;
  price: string;
  title: string;
};

export default function Table({ isAdmin }: { isAdmin: boolean }) {
  const [fetchUrl, setFetchUrl] = useState(`${BASE_URL}?limit=10`);
  const [fetchOptions, setFetchOptions] = useState({});

  // Custom Hook for fetching APIs
  const { data, isLoading, error } = useFetch(fetchUrl, fetchOptions);

  // shapedProduct will always have the visible products (what the user sees, ex: sorted)
  const [shapedProducts, setShapedProducts] = useState<Product[]>([]);

  // Modal popup for editing/adding form
  const [modalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<"add" | "edit" | "">("");

  const [tableHeaders, setTableHeaders] = useState([
    { title: { label: "Title", order: "" } },
    { brand: { label: "Brand", order: "" } },
    { category: { label: "Category", order: "" } },
    { price: { label: "Price", order: "" } },
  ]);

  useEffect(() => {
    if (data && data.products) {
      setShapedProducts(data.products);
    } else {
      if (data && data.id) {
        const newArray = shapedProducts.filter(({ id }) => id !== data.id);
        setShapedProducts(newArray);
      }
    }
  }, [data]);

  // Sorting Function
  const handleSort = (
    value: string,
    shapedProducts: Product[],
    direction: "ascending" | "descending"
  ) => {
    // toggle this field's direction
    setTableHeaders((prevHeaders: any) => {
      return prevHeaders.map((header: any) => {
        const [key] = Object.keys(header);
        if (key === value) {
          return {
            [key]: {
              ...header[key],
              order: direction,
            },
          };
        }
        return {
          [key]: {
            ...header[key],
            order: "",
          },
        };
      });
    });

    const sortedArray = [...shapedProducts].sort((a, b) => {
      const titleA = (a as any)[value];
      const titleB = (b as any)[value];
      if (direction === "ascending") {
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
      }

      if (direction === "descending") {
        if (titleA > titleB) {
          return -1;
        }
        if (titleA < titleB) {
          return 1;
        }
      }

      return 0;
    });
    setShapedProducts(sortedArray);
  };

  // active product is whatever product we are currently editing
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  if (error) {
    return <>Something went wrong</>;
  }

  const handleSearch = (searchTerm: string) => {
    const searchArray: any = data.products.filter(
      (o: any) =>
        o.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setShapedProducts(searchArray);
  };

  const handleEdit = ({ brand, category, id, price, title }: Product) => {
    setIsModalOpen(true);
    setStatus("edit");
    setActiveProduct({ brand, category, id, price, title });
  };

  const handleDelete = (id: string) => {
    setFetchUrl(`${BASE_URL}/${id}`);
    setFetchOptions({
      method: "DELETE",
    });
  };

  const handleAdd = () => {
    setIsModalOpen(true);
    setStatus("add");
  };

  if (isLoading && !data) {
    return (
      <div className="table_loader">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="table">
        <div className="table_header">
          <div>
            <h2 className="page_title">Inventory</h2>
            {!isAdmin && (
              <div className="page_subtitle">
                Login as administrator to be able to edit products.
              </div>
            )}
          </div>

          <div className="input_holder search_input">
            <label>Search</label>
            <input
              onChange={(e) => handleSearch(e.target.value)}
              type="text"
              placeholder="Enter category, brand, name..."
            />
          </div>
        </div>
        <div className="card table_card">
          <div className="row heading hide_mobile">
            {tableHeaders.map((item: any) => {
              const key = Object.keys(item)[0];
              const title = item[key].label;
              const direction = item[key].order;
              return (
                <div className="col" key={key}>
                  {title}
                  <SortIcon
                    classes={`${direction !== "" ? "active" : ""} ${direction}`}
                    onClick={() => {
                      handleSort(
                        key,
                        shapedProducts,
                        direction === "ascending" ? "descending" : "ascending"
                      );
                    }}
                  />
                </div>
              );
            })}
          </div>
          {isLoading && (
            <div className="table_loader">
              <Loader />
            </div>
          )}
          {shapedProducts.length > 0 &&
            shapedProducts.map(({ brand, category, id, price, title }) => (
              <div className="row" key={`product-${id}`}>
                <div className="col" data-title="Title">
                  {title}
                </div>
                <div className="col" data-title="Brand">
                  {brand}
                </div>
                <div className="col" data-title="Category">
                  {category}
                </div>
                <div className="col" data-title="Price">
                  ${price}
                </div>
                {isAdmin && (
                  <div className="col row_actions">
                    <span
                      onClick={() =>
                        handleEdit({ brand, category, id, price, title })
                      }
                    >
                      <img src="/edit.svg" alt="edit" />
                    </span>
                    <span onClick={() => handleDelete(id)}>
                      <img src="/delete.svg" alt="delete" />
                    </span>
                  </div>
                )}
              </div>
            ))}
          {data && shapedProducts.length === 0 && (
            <div className="row no_result">No products available.</div>
          )}
          {isAdmin && (
            <div className="row table_add" onClick={() => handleAdd()}>
              <span>Add Product</span>
              <svg
                className="add_icon"
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                />
                <path
                  d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      <Modal
        classes={modalOpen ? "open" : ""}
        isOpen={modalOpen}
        title={status === "add" ? "Add New Product" : "Edit Product"}
        closeModal={() => setIsModalOpen(false)}
      >
        <ProductForm
          successCallback={(data: Product) => {
            // handle add or edit
            if (status === "add") {
              // add new product
              setShapedProducts((prevProducts) => [data, ...prevProducts]);
            } else {
              // replace edited product
              const { id } = data;
              const updatedProducts = shapedProducts.map((product) =>
                product.id === id ? data : product
              );

              setShapedProducts(updatedProducts);
            }
            setIsModalOpen(false);
          }}
          defaultData={activeProduct}
          type={status}
        />
      </Modal>
    </>
  );
}
