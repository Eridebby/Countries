import { useState, useEffect } from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { Bars } from "react-loader-spinner";



const Currency = () => {

  const [error, setError] = useState("");
  const [loaderQuery, setLoaderQuery] = useState(false);
  const [query, setQuery] = useState("");
  const [dataQuery, setDataQuery] = useState([]);
  const [dataError, setDataError] = useState("");

  const handleInput = (e) => {
    setQuery(e.target.value);
  };



  useEffect(() => {
    async function findData() {
      try {
        setLoaderQuery(true);
        setDataError("");
        const res = await fetch(
          `https://restcountries.com/v3.1/currency/${query}`
        );
        if (!res.ok) throw new error("Currency can't be found !!!");
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

      {loaderQuery && <h5 style={{ color: "rgb(48, 48, 221)",paddingLeft: "10rem", paddingTop: "1.234rem"}}>LOADING RESULT ...</h5>}
      {!dataError && !loaderQuery && <Note note={dataQuery} />}
      {dataError && 
        <div
          style={{
            margin: "auto",
            alignItems: "center",
            paddingLeft: "10rem",
            paddingTop: "1.234rem",
          }}
        >
          <p style={{ color: "brown" }}>No result found</p>
        </div>
      }

    </div>
  );
};



function Note({ note }) {
  return (
    <div className="container">
      {note.map((item, index) => {
        return (
          <div key={index} className="card p-3 m-3" style={{ width: "22rem" }}>
            <img src={item.flags.png} className="card-img-top" alt="flag" />
            <div className="card-body">
              <h4  className="card-title"> {item.name.common} </h4>
              <h6  className="card-text"> {item.name.official}</h6>
              <h6 className="card-text">{item.region}</h6>
              <p className="card-text">{item.subregion}</p>
              <p className="card-text"> Population: {item.population}</p>
              <p className="card-text">Area: {item.area}</p>
              <p className="card-text">{item.startOfWeek}</p>
              <img
                src={item.coatOfArms.png}
                className="card"
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

export default Currency;
