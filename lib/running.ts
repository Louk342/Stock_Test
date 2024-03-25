import WebSocket from "ws";

function checkTime(): boolean {
  const currentDate = new Date();
  return currentDate.getHours() >= 15; //3시 이후 인지
}

function running(token: string) {
  const ws = new WebSocket("ws://ops.koreainvestment.com:31000", {});
  const jsonData = {
    header: {
      approval_key: token,
      custtype: "P",
      tr_type: "1",
      "content-type": "utf-8",
    },
    body: {
      input: {
        tr_id: "H0STASP0",
        tr_key: "005930",
      },
    },
  };
  ws.on("error", console.error);
  ws.on("open", async function open() {
    console.log("Connection opened");
    const intervalId = setInterval(() => {
      ws.send(JSON.stringify(jsonData));
    }, 10000);
    if (checkTime()) {
      console.log("Connection closed");
      clearInterval(intervalId);
      ws.close();
    }
  });
  ws.on("message", (data) => {
    const message = data.toString();
    console.log("Received message:", message);
  });
  ws.on("close", function close() {
    console.log("Disconnected from the server");
    return;
  });
}

export default running;
