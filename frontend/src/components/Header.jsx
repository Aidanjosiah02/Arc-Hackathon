import Logo from '../assets/pricesleugh_logo.png'

export default function Header() {
    return (
        <header>
            <img className="logo" src={ Logo } alt="App Logo" />
            <h1 className="title">Best-price app</h1>
        </header>
    );
}