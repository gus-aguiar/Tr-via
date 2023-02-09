import md5 from 'crypto-js/md5';

export const getToken = async () => {
  const response = await fetch(
    'https://opentdb.com/api_token.php?command=request',
  );
  const { token } = await response.json();
  localStorage.setItem('token', token);
};

export const getGravatar = async (email) => {
  const emailMd5 = md5(email).toString();
  const gravatarImage = `https://www.gravatar.com/avatar/${emailMd5}`;

  return gravatarImage;
};
