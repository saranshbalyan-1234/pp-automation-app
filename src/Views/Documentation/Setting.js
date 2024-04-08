import React from "react";
import QuestionAns from "./QuestionAns";

export default function Setting() {
  const data = [
    {
      header: "How to Add or Remove Users?",
      data: <div></div>,
    },
    {
      header: "How to Resend User's Verification Email?",
      data: <div></div>,
    },
    {
      header: "How to Add or Remove Roles?",
      data: <div></div>,
    },
    {
      header: "How to Change Roles's Permission?",
      data: <div></div>,
    },
    {
      header: "How to Change User's Role?",
      data: <div></div>,
    },
    {
      header: "How to Assign User To Project?",
      data: <div></div>,
    },
    {
      header: "How to Change Your Password?",
      data: <div></div>,
    },
    {
      header: "How to Edit Your Details?",
      data: <div></div>,
    },
    {
      header: "How to Upload Your New Profile Picture?",
      data: <div></div>,
    },
    {
      header: "How to Delete Customer Account?",
      data: <div></div>,
    },
    {
      header: "How to Add or Remove Machine?",
      data: <div></div>,
    },
    {
      header: "How to Check Current Chrome and Chromedriver Version.",
      data: <div></div>,
    },
  ];
  return <QuestionAns data={data} />;
}
