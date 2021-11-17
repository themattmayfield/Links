export const baseURL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "http://dangle.app";

export const postData = async ({ url, token, data = {} }) => {
  const res = await fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
    body: JSON.stringify(data),
  });

  if (res.error) {
    throw error;
  }

  return res.json();
};

// STRIPE
// export const redirectToCustomerPortal = async () => {
//     const { access_token } = supabase.auth.session();

//     const { url, error } = await postData({
//       url: "/api/create-portal-link",
//       token: access_token,
//     });
//     if (error) return alert(error.message);

//     window.location.assign(url);
//   };
