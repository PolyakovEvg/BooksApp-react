import "./FilterForm";
import { useGlobalContext } from "../../context";

const FilterForm = () => {
  const { setFilterValue, filterValue, filteredCategories, setBooks } =
    useGlobalContext();

    const handleFilterChange = (e) => {
      setBooks([]);
      setFilterValue(e.target.value);
    };


  return (
    <>
      <div className="filter-form select">
        <label className="select-label"> Filter </label>
        <select
          className="form-control"
          value={filterValue}
          onChange={handleFilterChange}
          multiple={false}
        >
          {filteredCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default FilterForm;
