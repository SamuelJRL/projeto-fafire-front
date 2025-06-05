import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Subscriptions from "./routes/subscriptions/index";
import SubscriptionNew from "./routes/subscriptions/new";
import EditSubscriptionPage from "./routes/subscriptions/edit";

function App() {
    return (
        <Router>
            <div className="wrapper">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/subscriptions">
                        <Route index element={<Subscriptions />} />
                        <Route path="new" element={<SubscriptionNew />} />
                        <Route path=":id/edit" element={<EditSubscriptionPage/>}/>
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
