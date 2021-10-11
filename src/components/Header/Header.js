import "./Header.css"

const Header = () => {
    return (
        <div>
             <span onClick={()=>window.scrollTo(0,0)} className="header">🎥Entertaintment Hub🎥</span>
        </div>
    )
}

export default Header
