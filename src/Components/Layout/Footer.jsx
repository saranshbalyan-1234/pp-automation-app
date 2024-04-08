import React from "react";
import { Layout } from "antd";
import {
  GithubOutlined,
  InstagramOutlined,
  FacebookOutlined,
  PhoneOutlined,
  MailOutlined,
  WhatsAppOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
const { Content } = Layout;
export default function Footer() {
  return (
    <Content style={{ marginTop: "15px" }}>
      <div
        style={{
          padding: 24,
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#001529",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", gap: "7px" }}>
          <GithubOutlined
            onClick={() => {
              window.open("https://github.com/saranshbalyan-1234");
            }}
          />
          <PhoneOutlined
            onClick={() => {
              window.open("tel:+91-9999075909", "_blank");
            }}
          />
          <MailOutlined
            onClick={() => {
              window.open("mailto:saranshbalyan123@gmail.com", "_blank");
            }}
          />
          <WhatsAppOutlined
            onClick={() => {
              window.open("https://api.whatsapp.com/send?phone=919868598141");
            }}
          />

          <LinkedinOutlined
            onClick={() => {
              window.open(
                "https://www.linkedin.com/in/saransh-balyan-49a14b11b/"
              );
            }}
          />
          <InstagramOutlined />
          <FacebookOutlined />
        </div>
        <div style={{ marginTop: "10px" }}>
          © {new Date().getFullYear()} Made with Love By SaranCe
        </div>
      </div>
    </Content>
  );
}
