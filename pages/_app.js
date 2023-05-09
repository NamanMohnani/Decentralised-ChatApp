import "../styles/global.css";

import { ChatAppProvider } from "../Context/ChatAppContext";
import { NavBar } from "../Components/index";

const myApp = ({ Component, pageDrops }) => (
  <div>
    <ChatAppProvider>
      <NavBar />
      <Component {...pageDrops} />
    </ChatAppProvider>
  </div>
);

export default myApp;
