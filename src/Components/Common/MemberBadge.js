import React from "react";
import { Badge } from "antd";
export default function MemberBadge({ members }) {
  const statusBadge = () => {
    const activeMembers = members.filter((el) => {
      return el.active === true;
    }).length;

    const unverifiedMembers = members.filter((el) => {
      return el.verifiedAt === null;
    }).length;
    const inactiveMembers = members.length - activeMembers - unverifiedMembers;
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <Badge
          count={`Active: ${activeMembers}`}
          overflowCount={999}
          style={{ backgroundColor: "#52c41a" }}
        />
        <Badge overflowCount={999} count={`Inactive: ${inactiveMembers}`} />
        <Badge
          count={`Verification Pending: ${unverifiedMembers}`}
          overflowCount={999}
          style={{ backgroundColor: "grey" }}
        />
      </div>
    );
  };

  return <>{statusBadge()}</>;
}
