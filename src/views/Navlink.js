import {Link,  Outlet } from "react-router-dom"



const Navlink = () =>  {
    return (
        <div className="bar">
      <ul className="nav justify-content-center mt-5  text-sm ">
  <li className="nav-item">
    <Link className="nav-link active" aria-current="page" to="/">HOME</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/Currency">CURRENCY</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/Capital">CAPITAL</Link>
  </li>
  <li className="nav-item ">
    <Link className="nav-link text-secondary"  to="/Language" >LANGUAGE</Link>
  </li>
</ul>
 <Outlet/>
 </div>
    )
}

export default Navlink;