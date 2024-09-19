import React, { useState } from "react";

export default function CommunitySignin() {
  return (
    <div className="community-signin-wrapper">
      <div className="community-signin-content">
        <h1>Sign In to a Community</h1>
        <p>
          Enter the code provided by your community admin to sign in to the
          community.
        </p>
        <form>
          <label htmlFor="community-code">Community Code</label>
          <input type="text" id="community-code" />
          <button>Sign In to Community</button>
        </form>
      </div>
    </div>
  );
}
