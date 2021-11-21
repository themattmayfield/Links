const testButton = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    member: {
      first: "Matt",
      last: "Mayfield",
      username: "theMattMayfield",
      email: "mattmayf411@gmail.com",
      homePhone: "4044444444",
      password: "qqqqqqqq",
      mobilePhone: "4044444444",
      address: "1234 Fake st",
      city: "Houston",
      state: "Texas",
      zip: "77477",
      countryCode: "001",
    },
    promotion: {
      selectedProduct: 0,
      code: "",
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://185.176.42.51/action/users/register", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
export default function Home() {
  return <button onClick={() => testButton()}>test button</button>;
}
