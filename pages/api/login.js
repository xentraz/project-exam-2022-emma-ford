import axios from 'axios';
import { setCookie } from 'nookies'

export default async (req, res) => {
  const { password, identifier } = req.body;

  try {
    const postRes = await axios.post('https://project-exam-2022.herokuapp.com/auth/local', {
      identifier,
      password,
    })

    setCookie({ res }, 'jwt', postRes.data.jwt, {
      httpOnly: false,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    res.status(200).end();
  } catch (e) {
    res.status(400).send(e.response.data.message[0].messages[0]);
  }
};

// HttpOnly disabled because getInitialProps did not work after deploying to netlify