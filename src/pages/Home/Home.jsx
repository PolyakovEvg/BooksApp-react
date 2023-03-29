import "./home.css";
import SortForm from "../../components/SearchForm/SortForm";
import SearchForm from "../../components/SearchForm/SearchForm";
import FilterForm from "../../components/SearchForm/FilterForm";
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
