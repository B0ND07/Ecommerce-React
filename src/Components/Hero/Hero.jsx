import "./Hero.css";
import hand_icon from "../../Assets/hand_icon.png";
import arrow_icon from "../../Assets/arrow.png";
import newcol from "../../Assets/newcol.png";

import { scrollToComponent } from "../scrollUtils";

const Hero = () => {
  const handleClick = () => {
    scrollToComponent("NewCollection");
  };
  return (
    <div className="hero">
      <div className="left">
        {/* <h2 className='arrivals'>NEW ARRIVALS</h2> */}

        <div className="hand-icon">
          <p>new</p>
          <img src={hand_icon} alt="" />
        </div>
        <p>collections </p>
        <p>for everyone</p>

        <div className="hero-latest-btn">
          <div>
            <button onClick={handleClick}>Latest Collection</button>
            {/* <NewCollection ref={ref}/> */}
          </div>

          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="right">
        <img className="image" src={newcol} alt="" />
      </div>
    </div>
  );
};

export default Hero;
