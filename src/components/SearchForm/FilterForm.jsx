import "./FilterForm";
import { useGlobalContext } from "../../context";

const FilterForm = () => {
  const { handleFilterChange, filterValue, filteredCategories } =
    useGlobalContext();
  return (
    <>
      <div>
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
