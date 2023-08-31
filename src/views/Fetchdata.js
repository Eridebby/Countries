import { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { RotatingLines } from "react-loader-spinner";
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap" rel="stylesheet"></link>



const api = "https://restcountries.com/v3.1/all";
const find = "https://restcountries.com/v3.1/name/";



const FetchData = () => {
  const [data, setData] = useState([]);
  const [callData, setCallData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [loaderQuery, setLoaderQuery] = useState(false);
  const [query, setQuery] = useState("");
  const [dataQuery, setDataQuery] = useState([]);
  const [dataError, setDataError] = useState("");

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const fetchdata = async () => {
    try {
      setError("");
      setLoader(true);
      const response = await fetch(api);
      if (!response.ok) {
        throw new error("something happened ");
      }
      const data = await response.json();
      setData(data);
      setLoader(false);
      setError("");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {
    async function findData() {
      try {
        setLoaderQuery(true);
        setDataError("");
        const res = await fetch(`${find}${query}`);
        if (!res.ok) throw new Error("can't find countries !!!");
        const data = await res.json();
        setDataQuery(data);
        setDataError("");
        console.log(data);
      } catch (err) {
        setDataError(err.message);
      } finally {
        setLoaderQuery(false);
      }
    }
    if (query.length < 3) {
      setDataQuery([]);
      setDataError("");
      return
    }
    findData();
  }, [query]);

  return (
    <div>
      {/* {query} */}
      <div className="d-flex align-items-center justify-content-center mt-5 ">
        <div className="input-group input w-75 ">
          <input
            type="text"
            className="form-control"
            onChange={handleInput}
            value={query}
            placeholder="search . . ."
          />
        </div>
      </div>

      {loaderQuery && <h5 style={{ color: "rgb(48, 48, 221)", paddingLeft: "10rem", paddingTop: "1.234rem"}}>LOADING RESULT...</h5>}
      {!dataError && !loaderQuery && <List list={dataQuery} />}

      {dataError && 
        <div
          style={{
            margin: "auto",
            alignItems: "center",
            paddingLeft: "10rem",
            paddingTop: "1.234rem",
          }}
        >
          <p style={{ color: "grey" }}>No result found</p>
        </div>
      }

      <Info info={callData} />

      {loader && <Loader />}
      {error && <Error message={error} />}
      {!error && !loader && <List list={data} />}
    </div>
  );
};

function Error({ message }) {
  return <h1 className="text-center text-danger">{message}</h1>;
}

function Loader() {
  return (
    <div style={{ margin: "auto", width: "78%" }}>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
}

function Info({ info }) {
  return (
    <div
      className="container">

      {info.map((item, index) => {
        return (
          <div key={index} className="card p-1" style={{ width: "22rem" }}>
            <img src={item.flags.png} className="card-img-top" alt="flag" />
            <div className="card-body">
              <h4> {item.name.common} </h4>
              <h6> {item.name.official}</h6>
              <h6 className="card-title">{item.region}</h6>
              <p className="card-text">{item.subregion}</p>
              <p className="card-text"> Population: {item.population}</p>
              <p className="card-text">Area: {item.area}</p>
              <p className="card-text">{item.startOfWeek}</p>
              <p className="card-text">
                {item.car.side === "right" ? (
                  <AiOutlineArrowRight />
                ) : (
                  <AiOutlineArrowLeft />
                )}
              </p>
              <img
                src={item.coatOfArms.png}
                className="card"
                style={{ width: "30px" }}
              />

              <a href="#" className="btn btn-primary">
                More info
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function List({ list }) {
  return (
    <div
      className="container  p-3">
      {list.map((item, index) => {
        return (
          <div key={index} className="card p-3 m-3" style={{ width: "22rem" }}>
         
            <img src={item.flags.png} className="card-img-top" alt="flag" />
            <div className="card-body p-3 ">
              <h4 className="card-title">{item.name.common} </h4>
              <h6 className="card-text">{item.name.official}</h6>
              <h6 className="card-text">{item.region}</h6>
              <p className="card-text">{item.subregion}</p>
              <p className="card-text"> Population: {item.population}</p>
              <p className="card-text">Area: {item.area}</p>
              <p className="card-text">{item.startOfWeek}</p>
              <img
                src={item.coatOfArms.png}
                className="card-img"
                style={{ width: "30px" }}
              />
              <p className="card-text">
                {item.car.side === "right" ? (
                  <AiOutlineArrowRight />
                ) : (
                  <AiOutlineArrowLeft />
                )}
              </p>

              <a href="#" className="btn btn-primary">
                More info
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FetchData;
