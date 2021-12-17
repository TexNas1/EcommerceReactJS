import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  saveProduct,
  listProducts,
  deleteProdcut,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [detailImage1, setDetailImage1] = useState("");
  const [detailImage2, setDetailImage2] = useState("");
  const [detailImage3, setDetailImage3] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [location, setLocation] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const [uploading, setUploading] = useState(false);
  const [uploading1, setUploading1] = useState(false);
  const [uploading2, setUploading2] = useState(false);
  const [uploading3, setUploading3] = useState(false);
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [dispatch, successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setDetailImage1(product.detailImage1);
    setDetailImage2(product.detailImage2);
    setDetailImage3(product.detailImage3);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setCondition(product.condition);
    setColor(product.color);
    setSize(product.size);
    setLocation(product.location);
    setSubCategory(product.subCategory);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        detailImage1,
        detailImage2,
        detailImage3,
        brand,
        category,
        countInStock,
        condition,
        color,
        size,
        location,
        subCategory,
      })
    );
  };
  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product._id));
  };
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploading(true);
    axios
      .post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  const uploadFileHandler1 = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploading1(true);
    axios
      .post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setDetailImage1(response.data);
        setUploading1(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading1(false);
      });
  };
  const uploadFileHandler2 = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploading2(true);
    axios
      .post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setDetailImage2(response.data);
        setUploading2(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading2(false);
      });
  };
  const uploadFileHandler3 = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploading3(true);
    axios
      .post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setDetailImage3(response.data);
        setUploading3(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading3(false);
      });
  };
  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create Product
        </button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Product</h2>
              </li>
              <li>
                {loadingSave && <LoadingBox></LoadingBox>}
                {errorSave && (
                  <MessageBox variant="danger">{errorSave}</MessageBox>
                )}
              </li>

              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <LoadingBox></LoadingBox>}
              </li>
              <li>
                <label htmlFor="image">Image 2</label>
                <input
                  type="text"
                  name="image"
                  value={detailImage1}
                  id="image"
                  onChange={(e) => setDetailImage1(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler1}></input>
                {uploading1 && <LoadingBox></LoadingBox>}
              </li>
              <li>
                <label htmlFor="image">Image 3</label>
                <input
                  type="text"
                  name="image"
                  value={detailImage2}
                  id="image"
                  onChange={(e) => setDetailImage2(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler2}></input>
                {uploading2 && <LoadingBox></LoadingBox>}
              </li>
              <li>
                <label htmlFor="image">Image 4</label>
                <input
                  type="text"
                  name="image"
                  value={detailImage3}
                  id="image"
                  onChange={(e) => setDetailImage3(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler3}></input>
                {uploading3 && <LoadingBox></LoadingBox>}
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={brand}
                  id="brand"
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="category">Category</label>
                <select
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="none">--Please choose a category--</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Unisex">Unisex</option>
                  <option value="Kids">Kids</option>
                </select>
              </li>
              <li>
                <label htmlFor="countInStock">CountInStock</label>
                <input
                  type="text"
                  name="countInStock"
                  value={countInStock}
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="condition">Condition</label>
                <input
                  type="text"
                  name="condition"
                  value={condition}
                  id="condition"
                  onChange={(e) => setCondition(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="color">Color</label>
                <input
                  type="text"
                  name="color"
                  value={color}
                  id="color"
                  onChange={(e) => setColor(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="size">Size </label>
                <select value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="none">--Please choose a category--</option>
                  <option value="XS">Extra Small (XS)</option>
                  <option value="S">Small (S)</option>
                  <option value="M">Medium (M)</option>
                  <option value="L">Large (L)</option>
                  <option value="XL">Extra Large (XL)</option>
                </select>
              </li>
              <li>
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  name="location"
                  value={location}
                  id="color"
                  onChange={(e) => setLocation(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="subcategory">Sub-Category</label>
                <input
                  type="text"
                  name="subcategory"
                  value={subCategory}
                  id="subcategory"
                  onChange={(e) => setSubCategory(e.target.value)}
                ></input>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? "Update" : "Create"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    className="button edit"
                    onClick={() => openModal(product)}
                  >
                    Edit
                  </button>{" "}
                  <button
                    className="button delete"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ProductsScreen;
