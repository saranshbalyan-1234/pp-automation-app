import React from "react";
import QuestionAns from "./QuestionAns";

export default function Basic() {
  const data = [
    {
      header: "What is Test Case?",
      data: (
        <div>
          <p>Test Case is where your actual script will be executed.</p>
          <p>You have multiple sections in a TestCase.</p>
          <ul>
            <li>Process: A process it a collection of steps.</li>
            <li>
              Step: A step is the smallest entity in a TestCase. This is the
              actual part where the selenium steps are defined.
            </li>
            <li>
              Environment: The env values can be accessed anywhere in the
              script. You can also have your multiple environments so that you
              dont have to edit values again and again if you want to execute
              same script with different values.
            </li>
            <li>
              Object: A object is the part where you define the HTML element. A
              element is located with the help of locators which can be of type
              <ul>
                <li>ClassName</li>
                <li>CSS</li>
                <li>Id</li>
                <li>JS</li>
                <li>LinkText</li>
                <li>Name</li>
                <li>PartialLinkText</li>
                <li>TagName</li>
                <li>XPATH</li>
              </ul>
            </li>
          </ul>
        </div>
      ),
      linkName: "Test Case",
      linkPath: "/TestCase",
    },
    {
      header: "What is Reusable Process?",
      data: (
        <div>
          <p>
            Reusable Process is similar to a process in Test Case, but it can be
            reused in any of the Test Case.
            <br />
            <br /> Note* Reusable Process cannot be executed directly and it
            does support environments when used inside the Test Case only.
          </p>
        </div>
      ),
      linkName: "Reusable Process",
      linkPath: "/ReusableProcess",
    },
    {
      header: "What is Object Bank?",
      data: (
        <div>
          It basically consist a lot of objects.
          <br />
          <br /> For context, An object is the part where you define the HTML
          element. A element is located with the help of locators which can be
          of type
          <ul>
            <li>ClassName</li>
            <li>CSS</li>
            <li>Id</li>
            <li>JS</li>
            <li>LinkText</li>
            <li>Name</li>
            <li>PartialLinkText</li>
            <li>TagName</li>
            <li>XPATH</li>
          </ul>
        </div>
      ),
      linkName: "Object Bank",
      linkPath: "/ObjectBank",
    },
  ];
  return <QuestionAns data={data} />;
}
