import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const Marketing = () => {
  const supabase = useSupabaseClient();

  return (
    <>
      <div>Path || Bridge</div>
      <p>👋 Hey.</p>
      <p>
        Whats up? If you're reading this, it means I think you're pretty swell.
        And I've asked for your help to build something that I can't make on my
        own.
      </p>
      <p>
        I'm not exactly sure what this is going to be, but I hope you come along
        for the ride ✌️.
      </p>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
      />
    </>
  );
};

export default Marketing;
