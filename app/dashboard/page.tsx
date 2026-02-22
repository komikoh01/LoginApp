"use client";

import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../../actions/notifications";

function Dashboard() {
  const {
    data: notifications,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () =>
      getNotifications().then((res) => {
        if (!res) throw new Error("Error al obtener notificaciones");
        return res;
    }),
    staleTime: 60000,
    refetchOnWindowFocus: true
  });


  return (
    <section className=" px-8 py-5 flex flex-col justify-center items-center gap-7">
      <h1 className=" custom-h1">Dashboard</h1>
      {isLoading ? (
        <h1 className=" text-4xl text-slate-700">Loading...</h1>
      ) : isError ? <h1 className=" text-2xl text-red-600">Error</h1> : (
        <ul className=" grid grid-cols-5 gap-4">
          {notifications &&
            notifications.map((not) => (
              <li key={not} className=" text-2xl text-rose-400">
                {not}
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}

export default Dashboard;
