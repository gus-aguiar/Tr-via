export const getToken = async () => {
  const response = await fetch(
    'https://opentdb.com/api_token.php?command=request',
  );
  const { token } = await response.json();
  localStorage.setItem('token', token);
};
