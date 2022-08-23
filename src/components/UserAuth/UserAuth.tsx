import React, { useEffect } from "react"
import useAuth from "../../hooks/useAuth"
import { supabase } from "../../utils/client"

const UserAuth = () => {
  const login = useAuth()

  return (
    <div className="flex justify-center items-center flex-col text-gray-900 space-y-3 text-center">
      <span className="text-xl font-bold">
        Login or Create a TierCreator Account
      </span>
      <p className="text-sm">
        Create an account on TierCreator to create your own template and save
        the tier lists. Twitter login is required for account creation. You do
        not need to create an account to download a tier list image created from
        an existing template.
      </p>
      <button
        className="bg-indigo-100 font-semibold px-4 text-gray-900 rounded border border-indigo-200/50 p-2"
        onClick={() => login.mutate()}
      >
        Login
      </button>
      <p className="text-sm">
        By creating an account you will automatically follow @TierCreator on
        Twitter and be subscribed to our Newsletter. You are free to unfollow us
        if you don't want amazing content. TierCreator.com uses cookies. You may
        read more about our policy here.
      </p>
      <span className="text-xl font-bold">Community Guidelines</span>
      <span className="text-lg font-bold">Our Mission</span>
      <p className="text-sm">
        At TierCreator, our mission is to help you rank everything you love in
        tiers. These guidelines are our acceptable use policy and clarify what
        we do and don’t allow on TierCreator. If you come across a Tier Maker
        template, images or copy that seems to break these rules please report
        it to us.
      </p>
      <span className="text-lg font-bold">Safety</span>
      <p className="text-sm">
        Our team works hard to keep divisive, disturbing or unsafe content off
        TierCreator but we rely on the community to report inappropriate
        content.
      </p>
      <p className="text-sm">
        We do not allow content related to: porn and overly sexually focused
        themes violence self-harm drug use race or hate speech promotion of
        regulated goods (drugs, tobacco, firearms, etc) personal use (my
        favorite, personal list, my discord crew)
      </p>
      <span className="text-lg font-bold">
        Intellectual property and other rights
      </span>
      <p className="text-sm">
        To respect the rights of people on and off TierCreator, please: Don’t
        infringe anyone's copyright, intellectual property, privacy or other
        rights. Don’t do anything or post any content that violates laws or
        regulations. By using TierCreator.com, you agree to our full Terms of
        Use.
      </p>
    </div>
  )
}

export default UserAuth
