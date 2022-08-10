import React from "react"
import { supabase } from "../../utils/client"

const UserAuth = () => {
  async function signInWithGoogle() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "google"
    })
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <span className="text-2xl">Login or Create a TierMaker Account</span>
      <p>
        Create an account on TierMaker to create your own template and save the
        tier lists. Twitter login is required for account creation. You do not
        need to create an account to download a tier list image created from an
        existing template.
      </p>
      <button className="bg-red-300 p-2" onClick={signInWithGoogle}>
        Login
      </button>
      <p>
        By creating an account you will automatically follow @TierMaker on
        Twitter and be subscribed to our Newsletter. You are free to unfollow us
        if you don't want amazing content. TierMaker.com uses cookies. You may
        read more about our policy here.
      </p>
      <span>Community Guidelines</span>
      <span>Our Mission</span>
      <p>
        At TierMaker, our mission is to help you rank everything you love in
        tiers. These guidelines are our acceptable use policy and clarify what
        we do and don’t allow on TierMaker. If you come across a Tier Maker
        template, images or copy that seems to break these rules please report
        it to us.
      </p>
      <span>Safety</span>
      <p>
        Our team works hard to keep divisive, disturbing or unsafe content off
        TierMaker but we rely on the community to report inappropriate content.
      </p>
      <p>
        We do not allow content related to: porn and overly sexually focused
        themes violence self-harm drug use race or hate speech promotion of
        regulated goods (drugs, tobacco, firearms, etc) personal use (my
        favorite, personal list, my discord crew)
      </p>
      <span>Intellectual property and other rights</span>
      <p>
        To respect the rights of people on and off TierMaker, please: Don’t
        infringe anyone's copyright, intellectual property, privacy or other
        rights. Don’t do anything or post any content that violates laws or
        regulations. By using TierMaker.com, you agree to our full Terms of Use.
      </p>
    </div>
  )
}

export default UserAuth
