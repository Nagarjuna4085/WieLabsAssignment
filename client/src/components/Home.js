import React from 'react';
import { NavLink } from 'react-router-dom';

import PreviewIcon from "@mui/icons-material/Preview";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import { useState, useEffect } from "react";

const Home = () => {

  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

    const getdata = async (e) => { 

      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);

      if (res.status === 422 || !data) {
    
        console.log("error");
      }
       else {
        setUserdata(data);
        console.log("get data");
      }
    }

    useEffect(() => {
    getdata()
    }, []);

    const deleteuser = async(id) => {
      const res2 = await fetch(`/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

     const deletedata = await res2.json();
     console.log(deletedata);

      if(res2.status === 442 || !deletedata){
        console.log("error");
      }
      else{
        console.log("user deleted");
        getdata();
      }


    }
  
  return (
    <div className="mt-5">
      <div className="container">
        <div className="add_btn mb-10">
          <NavLink to="/register">
            <button className="btn btn-lg btn-primary ">AddUserData</button>
          </NavLink>
        </div>
        <table class="table mt-3">
          <thead>
            <tr className="table-dark">
              <th scope="col">db_id</th>
              <th scope="col">id</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Job</th>
              <th scope="col">Number</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getuserdata.map((element, id) => {
              return (
                <>
                  <tr>
                    <th scope="row">{element._id}</th>
                    <th scope="row">{id + 1}</th>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.work}</td>
                    <td>{element.mobile}</td>
                    <td className="d-flex justify-content-between">
                      <NavLink to={`view/${element._id}`}>
                        <button className="btn btn-success">
                          <PreviewIcon />
                        </button>
                      </NavLink>

                      <NavLink to={`edit/${element._id}`}>
                        <button className="btn btn-primary">
                          <ModeEditOutlineIcon />
                        </button>
                      </NavLink>

                      <button
                        onClick={() => deleteuser(element._id)}
                        className="btn btn-danger"
                      >
                        <AutoDeleteIcon />
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
