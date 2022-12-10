import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/Account";
import Marketing from "../components/ViewMarketing";

const Home = () => {
  const session = useSession();

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? <Marketing /> : <Account session={session} />}
    </div>
  );
};

export default Home;
