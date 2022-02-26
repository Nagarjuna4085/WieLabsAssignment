import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useParams,  } from "react-router-dom";
import { useEffect, } from "react";
// import { useHistory } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Edit = () => {
  // const [getuserdata, setUserdata] = useState([]);
  // console.log(getuserdata);

  // const history = useHistory("");

  const navigate = useNavigate();

  const [inpval, setInp] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    addr: "",
    desc: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setInp((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };
  // console.log(inpval);

  const { id } = useParams("");
  console.log(id);

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
      setInp(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();

    const { name, email, age, mobile, work, addr, desc } = inpval;

    const res2 = await fetch(`/updateuser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        age,
        mobile,
        work,
        addr,
        desc,
      }),
    });

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("fill the data");
    } else {
      alert("data updated successfully");
      // history.push("/");
      navigate("/");
    }
  }

  return (
    <div className="container">
      <NavLink to="/"><button className="btn btn-lg btn-primary">Home</button></NavLink>
      <form className="mt-5">
        <div className="row ">
          <div class="mb-3 col-lg-6 col-md-6 col-12 col-lg-6 col-md-6 col-12">
            <label for="name" class="form-label">
              Name
            </label>
            <input
              onChange={setdata}
              value={inpval.name}
              name="name"
              type="text"
              class="form-control"
              id="name"
              placeholder="Enter name"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="email" class="form-label">
              Email
            </label>
            <input
              onChange={setdata}
              value={inpval.email}
              name="email"
              type="email"
              class="form-control"
              id="email"
              placeholder="Enter email"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="age" class="form-label">
              age
            </label>
            <input
              onChange={setdata}
              value={inpval.age}
              name="age"
              type="number"
              class="form-control"
              id="age"
              placeholder="Enter age"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="mobile" class="form-label">
              Mobile
            </label>
            <input
              onChange={setdata}
              value={inpval.mobile}
              name="number"
              type="email"
              class="form-control"
              id="mobile"
              placeholder="Enter mobile number"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="work" class="form-label">
              Work
            </label>
            <input
              onChange={setdata}
              value={inpval.work}
              name="work"
              type="text"
              class="form-control"
              id="work"
              placeholder="Enter work"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="address" class="form-label">
              Address
            </label>
            <input
              onChange={setdata}
              value={inpval.addr}
              name="addr"
              type="text"
              class="form-control"
              id="address"
              placeholder="Enter your address"
            />
          </div>
          <div class="mb-3 col-lg-12 col-md-12 col-12">
            <label for="description" class="form-label">
              Description
            </label>
            <textarea
              type="text"
              onChange={setdata}
              value={inpval.desc}
              name="desc"
              className="form-control"
              id="address"
              cols="30"
              rows="4"
            ></textarea>
          </div>

          <button onClick={updateuser} type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
