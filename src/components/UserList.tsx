import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "./userApi";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

export interface userProps {
  _id: string;
  name: string;
  city: string;
}

const UserList = () => {
  const { data } = useQuery({ queryKey: ["users"], queryFn: getAllUser });

  return (
    <div className="flex flex-start justify-self-center items-center  w-full">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <h2 className="text-xl font-bold">User Lists</h2>
          <div className="overflow-hidden">
            <table className=" text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    city
                  </th>
                  <th scope="col" className="px-6 py-4">
                    action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((d: userProps, id: any) => (
                  <tr key={d._id} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {++id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">{d.name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{d.city}</td>
                    <td className="px-6 py-4 flex">
                      <EditUser user={d} />
                      <DeleteUser id={d._id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
