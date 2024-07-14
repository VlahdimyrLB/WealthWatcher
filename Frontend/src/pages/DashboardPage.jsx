import React, { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Spinner from "@/components/Spinner";

const DashboardPage = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div>
          {user ? (
            <div>
              <p>Welcome {user.name}</p>
              <p>JWT Token: {user.token}</p>
            </div>
          ) : (
            <p>Not logged in</p>
          )}
        </div>
      )}
    </>
  );
};

export default DashboardPage;
