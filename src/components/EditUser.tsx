import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { updateUser } from "./userApi";
import { userProps } from "./UserList";
const EditUser = ({ user }: { user: userProps }) => {
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit } = useForm<userProps>();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setShowModal(false);
    },
    onError: (err) => {
      console.log("Error occured", err);
    },
  });
  console.log(user);

  const onSubmit: SubmitHandler<userProps> = (data) => {
    mutate(data);
  };
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);
  return (
    <>
      <div className="flex items-center justify-center">
        <button
          className="font-medium px-5 text-blue-600 dark:text-blue-500 hover:underline"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Edit
        </button>
      </div>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto ">
            <div
              className="fixed inset-0 w-full h-full bg-dark opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4">
              <div className="relative	 p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 flex">
                  <div className=" text-center md:text-left">
                    <div className="block rounded-lg ">
                      <div className="flex flex-wrap">
                        <div className="w-full shrink-0 grow-0 basis-auto ">
                          <div className="px-6 md:px-12">
                            <h2 className="mb-6 pb-2 text-3xl font-bold">
                              Edit User
                            </h2>
                            <form
                              className="space-y-6"
                              onSubmit={handleSubmit(onSubmit)}
                            >
                              <div>
                                <input
                                  hidden
                                  {...register("_id")}
                                  value={user._id}
                                />
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                  Name
                                </label>
                                <div className="mt-2">
                                  <input
                                    defaultValue={user.name}
                                    {...register("name", {
                                      required: true,
                                    })}
                                    className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-400 sm:text-sm sm:leading-6"
                                  />
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
                                    defaultValue={user.city}
                                    {...register("city", {
                                      required: true,
                                    })}
                                    className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-400 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                              <div>
                                <button
                                  type="submit"
                                  disabled={isLoading}
                                  className="flex w-full justify-center rounded-md bg-cyan-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  update
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
export default EditUser;
