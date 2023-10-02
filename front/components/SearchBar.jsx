import { useDispatch } from "react-redux";
import { useState } from "react";
import { getProjectByName } from "../redux/actions/actions";
import { Input, Button } from "@nextui-org/react";

function SearchBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getProjectByName(search));
    setSearch("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Si se presiona la tecla Enter, realiza la búsqueda
      handleSearch();
    }
  };

  return (
    <div className="flex items-center space-x-2 w-full">
    <Input
      variant="bordered"
      placeholder="Buscar proyecto, categoria, tags...."
      type="text"
      color="background"
      className="w-5/12"
      value={search}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
    <Button
      onClick={(e) => handleSearch(e)}
      value={search}
      className="indigo-light bg-primary text-background"
    >
      Buscar
    </Button>
  </div>
  );
}

export default SearchBar;
