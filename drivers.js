window.Drivers = {
    systemName: "TelaOS",
    version: "1.0.0-Liquid",
    
    // Battery & Power
    getBattery: async () => {
        const bat = await navigator.getBattery?.() || { level: 1 };
        return Math.round(bat.level * 100);
    },

    // Real Volume/Brightness (ISO Bridge)
    // On GitHub Pages this just logs; on ISO it hits the Linux backend
    updateHardware: (type, val) => {
        const endpoint = `http://localhost:8080/hardware?type=${type}&val=${val}`;
        fetch(endpoint).catch(() => console.log(`TelaOS ${type} set to ${val}% (Simulation)`));
    },

    // Network Driver
    getNetworkInfo: () => {
        return navigator.onLine ? "4G/LTE" : "Offline";
    }
};
