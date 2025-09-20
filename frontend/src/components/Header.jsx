import Logo from '../assets/logo.png'
//https://cdn-icons-png.flaticon.com/512/4647/4647563.png

export default function Header() {
    return (
        <header>
            <img className="logo" src={ Logo } alt="App Logo" />
            <h1 className="title">Best-price app</h1>
        </header>
    );
}