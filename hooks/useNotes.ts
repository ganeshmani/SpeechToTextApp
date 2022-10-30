import { useQuery } from "react-query";
import axios from "axios";

const fetchNotes = async () => {
  const { data } = await axios.get("http://localhost:3000/notes");
  return data;
};

const useNotes = () => useQuery("notes", fetchNotes);
export default useNotes;
