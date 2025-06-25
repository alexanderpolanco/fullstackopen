import { addFilter } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

export default function Filter() {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(addFilter(event.target.value));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
}
