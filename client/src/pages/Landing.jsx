import * as React from 'react';

const Landing = () => {
  return (
    <div className="vh_full w_100 ">
      <div>{process.env.SERVER_URL}</div>
    </div>
  );
};

export default Landing;
