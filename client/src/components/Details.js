import React from 'react';
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Details = () => {


   const [getuserdata, setUserdata] = useState([]);
   console.log(getuserdata);


  const {id} = useParams("");
  console.log(id);
  // const history = useHistory()
  const navigate = useNavigate();

    const getdata = async (e) => {
      const res = await fetch(`/getuser/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);

      if (res.status === 422 || !data) {
        console.log("error");
      } else {
        setUserdata(data);
        console.log("get data");
      }
    };

   useEffect(() => {
     getdata();
   }, []);

       const deleteuser = async (id) => {
         const res2 = await fetch(`/deleteuser/${id}`, {
           method: "DELETE",
           headers: {
             "Content-Type": "application/json",
           },
         });

         const deletedata = await res2.json();
         console.log(deletedata);

         if (res2.status === 442 || !deletedata) {
           console.log("error");
         } else {
           console.log("user deleted");
           getdata();
           navigate("/");
         }
       };
  



  return (
    <div className="container mt-3">
      <div>
        <NavLink to="/">
          <button className="btn btn-lg btn-primary">Home</button>
        </NavLink>
      </div>
      <h1 style={{ fontWeight: 400 }}>Welcome to {getuserdata.name}</h1>
      <Card sx={{ maxWidth: 800 }}>
        <CardContent>
          <div className="row">
            <div className="add_btn">
              <NavLink to={`/edit/${getuserdata._id}`}>
                <button className="btn btn-primary mx-3">
                  <ModeEditOutlineIcon />
                </button>
              </NavLink>
              <button
                className="btn btn-danger"
                onClick={() => deleteuser(getuserdata._id)}
              >
                <AutoDeleteIcon />
              </button>
            </div>
            <div className="left_view col-lg-6 col-md-6 col-12">
              <h3>
                Name : <span> {getuserdata.name}</span>
              </h3>
              <h3>
                Age:<span>{getuserdata.age}</span>
              </h3>
              <h3>
                Email : <span>{getuserdata.email}</span>
              </h3>
              <h3>
                Ocuupation: <span>{getuserdata.work}</span>
              </h3>
            </div>

            <div className="right_view col-lg-6 col-md-6 col-12">
              <h3>
                Mobile: <span>{getuserdata.mobile}</span>
              </h3>
              <h3>
                Location:<span>{getuserdata.addr}</span>
              </h3>
              <h3>
                Description:<span>{getuserdata.desc}</span>
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Details;
