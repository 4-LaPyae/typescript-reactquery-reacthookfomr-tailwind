import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { createUser } from "./userApi";
import { userProps } from "./UserList";

export default function Form() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<userProps>();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      console.log("Error occured", err);
    },
  });
  const onSubmit: SubmitHandler<userProps> = (data) => {
    mutate(data);
  };

  return (
    <div className="flex  flex-col w-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Creat User
        </h2>
      </div>
      <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                placeholder="enter name"
                {...register("name", { required: true })}
                className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-400 sm:text-sm sm:leading-6"
              />
              {errors.name && (
                <span className="text-rose-600">This field is required</span>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
            </div>
            <div className="mt-2">
              <input
                placeholder="enter city"
                {...register("city", { required: true })}
                className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-400 sm:text-sm sm:leading-6"
              />
              {errors.city && (
                <span className="text-rose-600">This field is required</span>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-cyan-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
