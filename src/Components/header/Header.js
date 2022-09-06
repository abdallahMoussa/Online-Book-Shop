import Menu from "./Menu";
import Nav from "./Nav";

const Header= props =>(
    <div className="w-full h-48 header">
        <Nav isLogin={props.isLogin} Login={props.Login} />
        <Menu />
    </div>
);

export default Header;