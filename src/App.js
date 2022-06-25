import React, { useState, useEffect } from 'react';
import qs from 'qs';

const CLIENT_ID =
'1056979466539-eersuk4n7v3mpg6bv5tbijrcn0fm704s.apps.googleusercontent.com';
  
const AUTHORIZE_URI = 'https://accounts.google.com/o/oauth2/v2/auth';
// const PEOPLE_URI = 'https://people.googleapis.com/v1/contactGroups';
// const PEOPLE_URI = 'https://people.googleapis.com/v1/profile';
const PEOPLE_URI = 'https://people.googleapis.com/v1/people/me?personFields=emailAddresses';
// const PEOPLE_URI = 'https://people.googleapis.com/v1/people/me?personFields=genders&key=AIzaSyCqgxth6b3VvUXnuraYcrA56WgXkURU9oo';

const queryStr = qs.stringify({
  client_id: CLIENT_ID,
  redirect_uri: window.location.href,
  response_type: 'token',
  // scope: 'https://www.googleapis.com/auth/contacts.readonly',
  
  // scope: "https://www.googleapis.com/auth/userinfo.email",
  // scope: "https://www.googleapis.com/auth/userinfo.profile",
  scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
});

// console.log(queryStr)

const loginUrl = AUTHORIZE_URI + '?' + queryStr;

export default () => {
  const { access_token } = qs.parse(window.location.hash.substr(1));
  // console.log(access_token);
  if (!access_token) {
    window.location.assign(loginUrl);
    return null;
  }

  // const [contactGroups, setContactGroups] = useState([]);

  useEffect(() => {
    fetch(PEOPLE_URI, {
      headers: { Authorization: 'Bearer ' + access_token, Accept: 'application/json' },
    })
    .then((response) => response.json())
      // .then((response) => {  console.log(response.data)})
      .then((data) => {console.log(data); console.log(data.emailAddresses[0]['value'])})  // setContactGroups(data.contactGroups)});
  }, [access_token]);

  return (
    <>
      <h2>Contact Groups</h2>
      <ul>
        {/* {contactGroups &&
          contactGroups.map(({ resourceName, name, memberCount }) => (
            <li key={resourceName}>
              {name} ({memberCount})
            </li>
          ))} */}
      </ul>
    </>
  );
};
