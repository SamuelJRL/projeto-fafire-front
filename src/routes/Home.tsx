import { Link } from "react-router-dom";
import heroWallet from "../images/hero-wallet.svg";

export default function Home() {
    return (
        <div className="hero">
            <div className="hero-text">
                <h1>Gerenciamento de Inscrições</h1>
                <p>
                    Adicione, exclua e veja os seus gastos com incrições no
                    mês
                </p>
                <Link to={"/subscriptions"}><button> Ver inscrições </button></Link>
            </div>
            <div className="hero-image">
                <img src={heroWallet} />
            </div>
        </div>
    );
}
