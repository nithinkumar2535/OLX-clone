import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext, FirebaseContext } from "../../store/Context";
import {
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ref } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [loading,setLoading] = useState(false)


  const [image, setImage] = useState("");

  const {db,storage } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const date = new Date();
  const navigate = useNavigate()

  const handleSubmit = () => {
    setLoading(true);
    if(! productName || !category || !price || !image){
      setLoading(false)
      alert("All fields required");
      return
    }
      const storageRef = ref(storage, `images/${image.name}`);
      uploadBytes(storageRef, image).then((snapshot) => {
         getDownloadURL(snapshot.ref)
         .then((url)=>{
          addDoc(collection(db,"products"),{
            userId: user.uid,
            productName,
            category,
            price,
            imageurl: url,
            createdAt: date.toDateString()
          })
          .then(()=>{
            setLoading(false)
            navigate('/')
          })
          .catch((error)=>{
            setLoading(false)
            console.log("error in adding product",error);
          })
         })
      })
  };

  return (
    <Fragment>
      <Header />
      <div>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="productname"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              name="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />
          </form>
          <br />
          <img
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
            alt="image preview"
          ></img>
          <br />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <br />
          {loading ? (
            <button class="uploadBtn" type="button" disabled>
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Uploading...
            </button>
          ) : (
            <button className="uploadBtn" onClick={handleSubmit}>
              upload and Submit
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
