const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');   // 这个是有什么用呢？


const app = express();
app.use(cors());   // 这里是清理所有的跨域问题
app.use(bodyParser.json());


// post 请求
app.post('/login', (req, res) => {
  const code = req.body.code;  // 所以客户端要把数据放进body里
  const spotifyApi = new SpotifyWebApi({
    redirectUri:'http://localhost:3000',
    clientId: 'f7d50426e1f2420faadf6e5527bdc7dd',
    clientSecret: 'f9c1d00a075349c8842ac1758de70ba7'
  });
  spotifyApi.authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
      }); // 解析为json格式的promise对象
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400)
    })
})

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri:'http://localhost:3000',
    clientId: 'f7d50426e1f2420faadf6e5527bdc7dd',
    clientSecret: 'f9c1d00a075349c8842ac1758de70ba7',
    refreshToken
  });
  spotifyApi.refreshAccessToken()
    .then(
    (data) => {
      res.json({
        accessToken:data.body.accessToken,
        expiresIn: data.body.expires_in
      })
    })
    .catch(() => {
      res.sendStatus(400);
    })
})

app.listen(3001);
