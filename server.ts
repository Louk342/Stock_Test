import dotenv from "dotenv";
//import WebSocket from "ws";
//import axios from "axios";
import schedule from "node-schedule";
import auth from "./lib/auth";
import running from "./lib/running";

dotenv.config({ path: "info.env" });

interface Access {
  appkey: string;
  secretkey: string;
  token: string;
}

const access: Access = {
  appkey: process.env.appkey || "",
  secretkey: process.env.secretkey || "",
  token: "",
};

async function main() {
  if (!access.appkey || !access.secretkey) {
    console.log("appkey 또는 secretkey가 입력되 않았습니다");
    return;
  } else access.token = await auth(access.appkey, access.secretkey);

  console.log("AppKey : " + access.appkey);
  console.log("SecretKey : " + access.secretkey);
  console.log("Token : " + access.token);

  schedule.scheduleJob("0 00 09 * * *", () => {
    console.log("CLI start");
    running(access.token);
  });
  //console.log("out of range");
  //스케줄이 작동되지 않아도 out of range가 출력됨
}

main();
