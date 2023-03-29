import "./SortForm";
import { useGlobalContext } from "../../context";

const SelectForm = () => {
  const { handleSortChange, sortValue} = useGlobalContext();


  return (
    <>
      <div>
        <select
          className="form-control"
          value={ sortValue }
          onChange={ handleSortChange }
          multiple={false}
        >
          <option value="relevance">Relevance</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </>
  );
};

export default SelectForm;
