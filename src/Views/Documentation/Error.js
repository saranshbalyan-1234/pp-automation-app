import React from "react";
import QuestionAns from "./QuestionAns";
import { Alert } from "antd";
export default function Errors() {
  const data = [
    {
      header: "System permission issue!",
      data: (
        <>
          <div>
            If you get this error on MacOs, kindly follow the below steps!
          </div>
          <ul>
            <li>Open Terminal</li>
            <li>Navigate to same folder as of application</li>
            <li>Execute the below command</li>
            <br />

            <Alert message="xattr -d com.apple.quarantine chromedriver" type="info" showIcon />
          </ul>
        </>
      ),
    },
    {
      header: "Invalid ChromeDriver version or ChromeDriver not found!",
      data: (
        <div>
          As the title says, your chromedriver version is not according to your
          chrome version or you dont have a valid chromedriver.
          <br /> To resolve this issue, kindly follow the below steps!
          <ul>
            <li>
              Kindly open chrome settings and navigate to
              "About Chrome" and note down your Chrome Version.
            </li>
            <li>

              Now click here to &nbsp;
              <a href="https://chromedriver.chromium.org/downloads">
                Download ChromeDriver
              </a> &nbsp; according to your Chrome Version that you got from the previous step.
            </li>
            <br />
          </ul>
        </div>
      ),
    },
  ];
  return <QuestionAns data={data} />;
}
