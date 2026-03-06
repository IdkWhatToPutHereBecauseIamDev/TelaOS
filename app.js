const { useState, useEffect } = React;

const App = () => {
    const [apps, setApps] = useState([]);
    const [activeApp, setActiveApp] = useState(null);
    const [battery, setBattery] = useState(100);
    const [keyboard, setKeyboard] = useState(false);
    const [input, setInput] = useState("");

    useEffect(() => {
        fetch('apps.json').then(r => r.json()).then(setApps);
        window.Drivers.getBattery().then(setBattery);
        const timer = setInterval(() => lucide.createIcons(), 500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="tela-os-root">
            <div className="status-bar">
                <span>{window.Drivers.getNetwork()}</span>
                <span>{battery}%</span>
            </div>

            <div className="home-screen">
                {apps.map(app => (
                    <div key={app.id} className="app-entry" onClick={() => window.AppHandler.launch(app.id, apps, setActiveApp)}>
                        <div className="app-icon glass" style={{background: app.color}}>
                            <i data-lucide={app.icon}></i>
                        </div>
                        {app.name}
                    </div>
                ))}
            </div>

            {activeApp && (
                <div className="app-window glass">
                    <div className="window-header">
                        <button className="btn-back" onClick={() => window.AppHandler.close(setActiveApp, setKeyboard)}>Done</button>
                        <div className="address-bar glass" onClick={() => setKeyboard(true)}>{input || activeApp.name}</div>
                    </div>
                    <iframe src={activeApp.url} className="app-frame" />
                </div>
            )}

            {keyboard && (
                <div className="keyboard glass">
                    {["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M"].map(k => (
                        <button key={k} className="key glass" onClick={() => setInput(v => v+k)}>{k}</button>
                    ))}
                    <button className="key glass" style={{gridColumn:'span 2'}} onClick={() => setInput(v => v.slice(0,-1))}>DEL</button>
                    <button className="key glass" style={{gridColumn:'span 2'}} onClick={() => setKeyboard(false)}>DONE</button>
                </div>
            )}
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
