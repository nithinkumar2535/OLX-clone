import React, { useContext, useEffect, useId, useState } from 'react';

import './View.css';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
function View() {

  const [userDetails,setUserDetails] = useState();
  const {db} = useContext(FirebaseContext);
  const {postDetails} = useContext(PostContext);

  useEffect(()=>{
    const {userId} = postDetails;
    getDocs(query(collection(db, "users"), where("id", "==",userId)))
    .then(
      (res) => {
        res.forEach((doc) => {
          setUserDetails(doc.data());
        });
      }
    )
    .catch((err)=>{
      console.log(err);
    })
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.imageurl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.productName}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
       {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.name}</p>
          <p>{userDetails.phone}</p>
        </div>
        }
      </div>
    </div>
  );
}
export default View;
