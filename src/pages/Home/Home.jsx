import "./home.css";
import SearchForm from "../../components/SearchForm/SearchForm";
import { Outlet } from "react-router-dom";


const Home = () => {
  return (
    <>
      <div className="header">
            <SearchForm/>
      </div>
            <Outlet/>
    </>
  );
};

export default Home;
