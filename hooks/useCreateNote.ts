import { QueryClient, useMutation } from "react-query";
import axios from "axios";

const createNote = async (note: string) => {
  const { data } = await axios.post("http://localhost:3000/notes", {
    note,
  });
  return data;
};

const useCreateNote = () =>
  useMutation(createNote, {
    onSuccess: (response) => {
      // queryClient.invalidateQueries(["notes"]);
    },
  });

export default useCreateNote;
