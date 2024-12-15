import "./Header.css";

const Header = ({ title, leftBtn, rightBtn }) => {
  return (
    <div className="Header">
      <div className="header_leftBtn">{leftBtn}</div>
      <div className="header_title">
        <h4>{title}</h4>
      </div>
      <div className="header_rightBtn">{rightBtn}</div>
    </div>
  );
};

export default Header;
