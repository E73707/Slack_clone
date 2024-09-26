import React from "react";
import "../css/Popover.css";

export default function Popover({ members, isVisible, position }) {
  if (!isVisible) return null;

  return (
    <div className={`popover ${position}`}>
      <h3>Community Members</h3>
      {members.length > 0 ? (
        <ul>
          {members.map((member) => (
            <div key={member.id}>
              {member.User.displayName || member.User.email}
              {member.role}
            </div>
          ))}
        </ul>
      ) : (
        <p>No members found.</p>
      )}
    </div>
  );
}
