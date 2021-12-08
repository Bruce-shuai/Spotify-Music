import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    // 登录注册老样子，使用 post 请求
    axios
      .post('http://localhost:3001/login', {
        code
      })
      .then(res => {
        // console.log(res.data);
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, '/');
      })
      .catch(() => {
        window.location = '/'
      })
  }, [code])

  useEffect(() => {
    if (!refreshToken) return;  // 排除 refreshToken还未出现的情况.这样请求会发送失败
    const interval = setInterval(() =>{
      axios
        .post('http://localhost:3001/refresh', {
          refreshToken
        })
        .then(res => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          window.location = '/'
        })
    }, (expiresIn - 60) * 1000)
  
    return () => clearInterval(interval)
  }, [refreshToken, expiresIn]) // 防止accessToken 过期... 过期后重新刷新数据...
  
  return accessToken;
}
