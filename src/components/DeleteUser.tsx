import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "./userApi";

type Props = {
  id: string;
};

const DeleteUser = ({ id }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteUser, {
    onSuccess: () => {
      console.log("Delete Success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const deleteHandler = () => {
    mutate(id);
  };

  return (
    <>
      <button
        onClick={deleteHandler}
        className="font-medium text-red-600 dark:text-red-500 hover:underline"
      >
        delete
      </button>
    </>
  );
};

export default DeleteUser;
