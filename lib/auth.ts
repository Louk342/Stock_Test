import axios from "axios";
/*
async function auth(appkey: string, secretkey: string) {
  try {
    const response = await axios({
      method: "post",
      url: "https://openapivts.koreainvestment.com:29443/oauth2/Approval",
      data: JSON.stringify({
        grant_type: "client_credentials",
        appkey: appkey,
        secretkey: secretkey,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.approval_key;
  } catch (error) {
    console.error(error);
    return 0;
  }
}
*/

const auth = async (key: string, secret: string): Promise<string> => {
  const URL = "https://openapivts.koreainvestment.com:29443/oauth2/Approval";
  const headers = { "Content-Type": "application/json" };
  const body = {
    grant_type: "client_credentials",
    appkey: key,
    secretkey: secret,
  };

  try {
    const response = await axios.post(URL, body, { headers });
    const approvalKey = response.data["approval_key"];
    return approvalKey;
  } catch (error) {
    console.error("Error fetching approval key:", error);
    throw error;
  }
};
export default auth;
