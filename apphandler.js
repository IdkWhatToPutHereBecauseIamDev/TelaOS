window.AppHandler = {
    launch: (appId, apps, setActiveApp) => {
        const target = apps.find(a => a.id === appId);
        if (target) {
            console.log(`TelaOS: Launching ${target.name}`);
            setActiveApp(target);
            // Trigger Lucide refresh for new icons in the window
            setTimeout(() => lucide.createIcons(), 50);
        }
    },
    close: (setActiveApp, setKeyboard) => {
        setActiveApp(null);
        setKeyboard(false);
    }
};
