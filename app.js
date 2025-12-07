const clientId = "YOUR_CLIENT_ID";
const domain = "YOUR_COGNITO_DOMAIN";
const region = "us-east-2";
const redirectUri = "YOUR_S3_URL/callback.html"; 

document.getElementById("loginBtn").addEventListener("click", () => {
  const loginUrl =
    `https://${domain}.auth.${region}.amazoncognito.com/login?` +
    `client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;

  window.location.href = loginUrl;
});
