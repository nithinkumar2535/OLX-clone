import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext} from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Posts() {

  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(true)
  const {db} = useContext(FirebaseContext);
  const {postDetails,setPostDetails} = useContext(PostContext);
  const navigate = useNavigate()

  useEffect(()=>{
    getDocs(collection(db,"products"))
    .then((snapshot)=>{
      const allposts = snapshot.docs.map((product)=>{
        return{
          ...product.data(),
          id: product.id
        }
      })
      setProducts(allposts);
      setLoading(false)
    })
    .catch((error)=>{
      console.log("error fetching product",error);
      setLoading(false)
    })
  },[])

  return (
    <div className="postParentDiv">
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="recommendations">
          <div className="heading">
            <span>Fresh recommendations</span>
          </div>
          <div className="cards">
            {products.map((product) => {
              return (
                <div key={product.id} className="card1">
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div
                    onClick={() => {
                      setPostDetails(product);
                      navigate("/view");
                    }}
                  >
                    <div className="image">
                      <img src={product.imageurl} alt="" />
                    </div>
                    <div className="content">
                      <p className="rate">&#x20B9; {product.price}</p>
                      <span className="pname">{product.productName}</span>
                      <p className="pcategory"> {product.category}</p>
                      <span>{product.createdAt}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Posts;
