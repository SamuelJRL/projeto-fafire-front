import notFoundImage from "../images/imageNotFound.png";
import { FiTrash, FiEdit } from "react-icons/fi";
import type { Subscription } from "../types/Subscription";
import formatDate from "../utils/formatDate";
import { Link } from "react-router-dom";

type Props = {
    subscription: Subscription;
};

export default function Card({ subscription }: Props) {
    return (
        <div className="sub-card">
            <div className="card-image">
                <img src={notFoundImage} />
            </div>
            <div className="card-texts">
                <div className="card-info">
                    <h2>{subscription.name}</h2>
                    <p> Preço: {subscription.price}</p>
                    <p> Método: {subscription.paymentMethod}</p>
                    <small>
                        {" "}
                        Início:
                        <br /> {formatDate(subscription.startDate)}
                    </small>
                </div>
            </div>
            <div className="sub-card2">
                <div className="card-buttons">
                    <FiTrash size={20} />
                    <Link to={`/subscriptions/${subscription.id}/edit`}>
                        <FiEdit size={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
