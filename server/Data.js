const Products = [
    {
        "model": "Bosch GSB 450",
        "capacity": "10 mm",
        "speed": "2600 RPM",
        "price": 1999,
        category: {
            name: "DrillingMachine (main)",
            alias: "drillingmachine_main",
            type: "drillingmachine"
        }

    },
    {
        "model": "Black+Decker KR554RE",
        "capacity": "13 mm",
        "speed": "2800 RPM",
        "price": 2499,
        category: {
            name: "DrillingMachine (main)",
            alias: "drillingmachine_main",
            type: "drillingmachine"
        }
    },
    {
        "model": "Makita HP1640",
        "capacity": "16 mm",
        "speed": "2800 RPM",
        "price": 3499,
        category: {
            name: "DrillingMachine (extra)",
            alias: "drillingmachine_extra",
            type: "drillingmachine"
        }
    },
    {
        "model": "Dewalt DWD024",
        "capacity": "13 mm",
        "speed": "2800 RPM",
        "price": 3999,
        category: {
            name: "DrillingMachine (extra)",
            alias: "drillingmachine_extra",
            type: "drillingmachine"
        }
    },
    {
        "model": "iBell ICD13-10",
        "capacity": "10 mm",
        "speed": "3000 RPM",
        "price": 1899,
        category: {
            name: "DrillingMachine (extra)",
            alias: "drillingmachine_extra",
            type: "drillingmachine"
        }
    },
    {
        "model": "Cheston CH-HD",
        "capacity": "13 mm",
        "speed": "2800 RPM",
        "price": 1599,
        category: {
            name: "DrillingMachine (extra)",
            alias: "drillingmachine_extra",
            type: "drillingmachine"
        }
    },
    {
        "model": "Stanley SDH600",
        "capacity": "13 mm",
        "speed": "2900 RPM",
        "price": 2799,
        category: {
            name: "DrillingMachine (extra)",
            alias: "drillingmachine_extra",
            type: "drillingmachine"
        }
    },
    {
        "model": "Skil 6513 JD",
        "capacity": "13 mm",
        "speed": "3000 RPM",
        "price": 2299,
        category: {
            name: "DrillingMachine (extra)",
            alias: "drillingmachine_extra",
            type: "drillingmachine"
        }
    },
    {
        "model": "Hitachi DV13VSS",
        "capacity": "13 mm",
        "speed": "2900 RPM",
        "price": 3199,
        category: {
            name: "DrillingMachine (extra)",
            alias: "drillingmachine_extra",
            type: "drillingmachine"
        }
    },
    {
        "model": "PowerHouse PHMD13",
        "capacity": "13 mm",
        "speed": "2800 RPM",
        "price": 1999,
        category: {
            name: "DrillingMachine (extra)",
            alias: "drillingmachine_extra",
            type: "drillingmachine"
        }
    },
    {
        model: "Bosch GSH 11 E",
        capacity: "11 kg",
        speed: "1890 BPM",
        price: 22500,
        category: {
            name: "Breaker (main)",
            alias: "breaker_main",
            type: "breaker"
        }
    },
    {
        model: "Makita HM0810T",
        capacity: "5 kg",
        speed: "2900 BPM",
        price: 18700,
        category: {
            name: "Breaker (main)",
            alias: "breaker_main",
            type: "breaker"
        }
    },
    {
        model: "Hilti TE 800-AVR",
        capacity: "10 kg",
        speed: "1950 BPM",
        price: 49500,
        category: {
            name: "Breaker (extra)",
            alias: "breaker_extra",
            type: "breaker"
        }
    },
    {
        model: "Dewalt D25901K",
        capacity: "10 kg",
        speed: "1450 BPM",
        price: 38200,
        category: {
            name: "Breaker (extra)",
            alias: "breaker_extra",
            type: "breaker"
        }
    },
    {
        model: "Cheston CMB13",
        capacity: "6 kg",
        speed: "1400 BPM",
        price: 8699,
        category: {
            name: "Breaker (extra)",
            alias: "breaker_extra",
            type: "breaker"
        }
    },
    {
        model: "iBell DH10-1010",
        capacity: "10 kg",
        speed: "2900 BPM",
        price: 11200,
        category: {
            name: "Breaker (extra)",
            alias: "breaker_extra",
            type: "breaker"
        }
    },
    {
        model: "Hitachi H41MB",
        capacity: "5 kg",
        speed: "3000 BPM",
        price: 16900,
        category: {
            name: "Breaker (extra)",
            alias: "breaker_extra",
            type: "breaker"
        }
    },
    {
        model: "Foster FDK-65",
        capacity: "6.5 kg",
        speed: "2700 BPM",
        price: 10250,
        category: {
            name: "Breaker (extra)",
            alias: "breaker_extra",
            type: "breaker"
        }
    },
    {
        model: "Xtra Power XPT-492",
        capacity: "6.5 kg",
        speed: "2800 BPM",
        price: 7650,
        category: {
            name: "Breaker (extra)",
            alias: "breaker_extra",
            type: "breaker"
        }
    },
    {
        model: "Trumax TMX-DH65",
        capacity: "10 kg",
        speed: "1500 BPM",
        price: 8990,
        category: {
            name: "Breaker (extra)",
            alias: "breaker_extra",
            type: "breaker"
        }
    },
    {
        "model": "Bosch GRW 12 E",
        "capacity": "50 liters",
        "speed": "550 RPM",
        "price": 18999,
        category: {
            name: "PaintMixer (main)",
            alias: "paintmixer_main",
            type: "paintmixer"
        }
    },
    {
        "model": "Makita UT1600",
        "capacity": "40 liters",
        "speed": "600 RPM",
        "price": 17499,
        category: {
            name: "PaintMixer (main)",
            alias: "paintmixer_main",
            type: "paintmixer"
        }
    },
    {
        "model": "Dewalt DW130V",
        "capacity": "45 liters",
        "speed": "550 RPM",
        "price": 15999,
        category: {
            name: "PaintMixer (extra)",
            alias: "paintmixer_extra",
            type: "paintmixer"
        }
    },
    {
        "model": "iBELL PM14580",
        "capacity": "35 liters",
        "speed": "800 RPM",
        "price": 5999,
        category: {
            name: "PaintMixer (extra)",
            alias: "paintmixer_extra",
            type: "paintmixer"
        }
    },
    {
        "model": "Ingco MX214008",
        "capacity": "40 liters",
        "speed": "850 RPM",
        "price": 5299,
        category: {
            name: "PaintMixer (extra)",
            alias: "paintmixer_extra",
            type: "paintmixer"
        }
    },
    {
        "model": "Powertex PM 1200",
        "capacity": "30 liters",
        "speed": "900 RPM",
        "price": 4799,
        category: {
            name: "PaintMixer (extra)",
            alias: "paintmixer_extra",
            type: "paintmixer"
        }
    },
    {
        "model": "Xtra Power XPM-446",
        "capacity": "35 liters",
        "speed": "850 RPM",
        "price": 5290,
        category: {
            name: "PaintMixer (extra)",
            alias: "paintmixer_extra",
            type: "paintmixer"
        }
    },
    {
        "model": "Ferm PMM1006",
        "capacity": "45 liters",
        "speed": "900 RPM",
        "price": 7990,
        category: {
            name: "PaintMixer (extra)",
            alias: "paintmixer_extra",
            type: "paintmixer"
        }
    },
    {
        "model": "Endico MX-02",
        "capacity": "55 liters",
        "speed": "770 RPM",
        "price": 7250,
        category: {
            name: "PaintMixer (extra)",
            alias: "paintmixer_extra",
            type: "paintmixer"
        }
    },
    {
        "model": "KPT PMX1200",
        "capacity": "40 liters",
        "speed": "800 RPM",
        "price": 6999,
        category: {
            name: "PaintMixer (extra)",
            alias: "paintmixer_extra",
            type: "paintmixer"
        }
    },
    {
        model: "Metabo KS 55 FS",
        capacity: "165 mm",
        speed: "5700 RPM",
        price: 8800,
        category: {
            name: "Cutter (main)",
            alias: "cutter_main",
            type: "cutter"
        }
    },
    {
        model: "KPT KC14",
        capacity: "355 mm",
        speed: "3800 RPM",
        price: 7250,
        category: {
            name: "Cutter (main)",
            alias: "cutter_main",
            type: "cutter"
        }
    },
    {
        model: "Festool HK 55 EB",
        capacity: "165 mm",
        speed: "6500 RPM",
        price: 15000,
        category: {
            name: "Cutter (extra)",
            alias: "cutter_extra",
            type: "cutter"
        }
    },
    {
        model: "Hilti SCW 22-A",
        capacity: "230 mm",
        speed: "5400 RPM",
        price: 17000,
        category: {
            name: "Cutter (extra)",
            alias: "cutter_extra",
            type: "cutter"
        }
    },
    {
        model: "Dongcheng DZE02-110",
        capacity: "110 mm",
        speed: "13000 RPM",
        price: 1890,
        category: {
            name: "Cutter (extra)",
            alias: "cutter_extra",
            type: "cutter"
        }
    },
    {
        model: "Metabo WEV15-125 Quick",
        capacity: "125 mm",
        speed: "11000 RPM",
        price: 6800,
        category: {
            name: "Cutter (extra)",
            alias: "cutter_extra",
            type: "cutter"
        }
    },
    {
        model: "Milwaukee AGV 10-125 EK",
        capacity: "125 mm",
        speed: "11000 RPM",
        price: 7200,
        category: {
            name: "Cutter (extra)",
            alias: "cutter_extra",
            type: "cutter"
        }
    },
    {
        model: "KPT KAG 180",
        capacity: "180 mm",
        speed: "8500 RPM",
        price: 4900,
        category: {
            name: "Cutter (extra)",
            alias: "cutter_extra",
            type: "cutter"
        }
    },
    {
        model: "Stanley STGS6100",
        capacity: "100 mm",
        speed: "12000 RPM",
        price: 3500,
        category: {
            name: "Cutter (extra)",
            alias: "cutter_extra",
            type: "cutter"
        }
    },
    {
        model: "Ryobi RAG800-125",
        capacity: "125 mm",
        speed: "11000 RPM",
        price: 4600,
        category: {
            name: "Cutter (extra)",
            alias: "cutter_extra",
            type: "cutter"
        }
    },
    {
        model: "Bosch GCO 220",
        capacity: "355 mm",
        speed: "3800 RPM",
        price: 12500,
        category: {
            name: "CutOffMachines (main)",
            alias: "cutoffmachines_main",
            type: "cutoffmachines"
        }
    },
    {
        model: "Makita LC1230",
        capacity: "305 mm",
        speed: "3600 RPM",
        price: 11000,
        category: {
            name: "CutOffMachines (main)",
            alias: "cutoffmachines_main",
            type: "cutoffmachines"
        }
    },
    {
        model: "DeWalt D28710",
        capacity: "355 mm",
        speed: "4000 RPM",
        price: 13000,
        category: {
            name: "CutOffMachines (extra)",
            alias: "cutoffmachines_extra",
            type: "cutoffmachines"
        }
    },
    {
        model: "Hitachi CC14SF",
        capacity: "355 mm",
        speed: "3500 RPM",
        price: 10500,
        category: {
            name: "CutOffMachines (extra)",
            alias: "cutoffmachines_extra",
            type: "cutoffmachines"
        }
    },
    {
        model: "Ralli Wolf RC14D",
        capacity: "355 mm",
        speed: "3500 RPM",
        price: 9850,
        category: {
            name: "CutOffMachines (extra)",
            alias: "cutoffmachines_extra",
            type: "cutoffmachines"
        }
    },
    {
        model: "Metabo KGS 216 M",
        capacity: "216 mm",
        speed: "5800 RPM",
        price: 8500,
        category: {
            name: "CutOffMachines (extra)",
            alias: "cutoffmachines_extra",
            type: "cutoffmachines"
        }
    },
    {
        model: "KPT KC355",
        capacity: "355 mm",
        speed: "3800 RPM",
        price: 9900,
        category: {
            name: "CutOffMachines (extra)",
            alias: "cutoffmachines_extra",
            type: "cutoffmachines"
        }
    },
    {
        model: "Cumi CCM 355 E",
        capacity: "355 mm",
        speed: "3700 RPM",
        price: 10450,
        category: {
            name: "CutOffMachines (extra)",
            alias: "cutoffmachines_extra",
            type: "cutoffmachines"
        }
    },
    {
        model: "Metabo CS 23-355",
        capacity: "355 mm",
        speed: "4000 RPM",
        price: 12200,
        category: {
            name: "CutOffMachines (extra)",
            alias: "cutoffmachines_extra",
            type: "cutoffmachines"
        }
    },
    {
        model: "Yuri KJG02 355",
        capacity: "355 mm",
        speed: "3500 RPM",
        price: 9300,
        category: {
            name: "CutOffMachines (extra)",
            alias: "cutoffmachines_extra",
            type: "cutoffmachines"
        }
    },
    {
        model: "Makita UB1103",
        capacity: "3.1 m³/min",
        speed: "12000 RPM",
        price: 5200,
        category: {
            name: "Blowers (main)",
            alias: "blowers_main",
            type: "blowers"
        }
    },
    {
        model: "Bosch GBL 82",
        capacity: "3.2 m³/min",
        speed: "13000 RPM",
        price: 5800,
        category: {
            name: "Blowers (main)",
            alias: "blowers_main",
            type: "blowers"
        }
    },
    {
        model: "Hitachi RB24EAP",
        capacity: "3.3 m³/min",
        speed: "11000 RPM",
        price: 4900,
        category: {
            name: "Blowers (extra)",
            alias: "blowers_extra",
            type: "blowers"
        }
    },
    {
        model: "Black+Decker GW2500",
        capacity: "3.0 m³/min",
        speed: "13500 RPM",
        price: 4500,
        category: {
            name: "Blowers (extra)",
            alias: "blowers_extra",
            type: "blowers"
        }
    },
    {
        model: "DeWalt DWB6800-B1",
        capacity: "4.3 m³/min",
        speed: "16000 RPM",
        price: 7500,
        category: {
            name: "Blowers (extra)",
            alias: "blowers_extra",
            type: "blowers"
        }
    },
    {
        model: "Ryobi RBV3000CES",
        capacity: "3.6 m³/min",
        speed: "13000 RPM",
        price: 5200,
        category: {
            name: "Blowers (extra)",
            alias: "blowers_extra",
            type: "blowers"
        }
    },
    {
        model: "Stihl BG 56 C-E",
        capacity: "5.2 m³/min",
        speed: "13000 RPM",
        price: 8900,
        category: {
            name: "Blowers (extra)",
            alias: "blowers_extra",
            type: "blowers"
        }
    },
    {
        model: "Echo PB-2520",
        capacity: "4.5 m³/min",
        speed: "15000 RPM",
        price: 8400,
        category: {
            name: "Blowers (extra)",
            alias: "blowers_extra",
            type: "blowers"
        }
    },
    {
        model: "Toro Ultra Blower",
        capacity: "5.0 m³/min",
        speed: "14000 RPM",
        price: 9200,
        category: {
            name: "Blowers (extra)",
            alias: "blowers_extra",
            type: "blowers"
        }
    },
    {
        model: "Husqvarna 580BTS",
        capacity: "4.6 m³/min",
        speed: "13500 RPM",
        price: 9800,
        category: {
            name: "Blowers (extra)",
            alias: "blowers_extra",
            type: "blowers"
        }
    },
    {
        model: "Miller Millermatic 211",
        capacity: "40-230 A",
        speed: "MIG",
        price: 120000,
        category: {
            name: "WeldingMachines (main)",
            alias: "weldingmachines_main",
            type: "weldingmachines"
        }
    },
    {
        model: "Lincoln Electric K2185-1",
        capacity: "30-140 A",
        speed: "Flux-cored",
        price: 65000,
        category: {
            name: "WeldingMachines (main)",
            alias: "weldingmachines_main",
            type: "weldingmachines"
        }
    },
    {
        model: "ESAB Rebel EMP 215ic",
        capacity: "5-230 A",
        speed: "MIG/TIG/Stick",
        price: 115000,
        category: {
            name: "WeldingMachines (extra)",
            alias: "weldingmachines_extra",
            type: "weldingmachines"
        }
    },
    {
        model: "Hobart Handler 140",
        capacity: "25-140 A",
        speed: "MIG",
        price: 45000,
        category: {
            name: "WeldingMachines (extra)",
            alias: "weldingmachines_extra",
            type: "weldingmachines"
        }
    },
    {
        model: "Forney Easy Weld 261",
        capacity: "120 A",
        speed: "Stick",
        price: 32000,
        category: {
            name: "WeldingMachines (extra)",
            alias: "weldingmachines_extra",
            type: "weldingmachines"
        }
    },
    {
        model: "Rilon ARC 235",
        capacity: "250 A",
        speed: "60% Duty Cycle",
        price: 13500,
        category: {
            name: "WeldingMachines (extra)",
            alias: "weldingmachines_extra",
            type: "weldingmachines"
        }
    },
    {
        model: "MIGATRONIC Focus Stick 161",
        capacity: "160 A",
        speed: "60% Duty Cycle",
        price: 14200,
        category: {
            name: "WeldingMachines (extra)",
            alias: "weldingmachines_extra",
            type: "weldingmachines"
        }
    },
    {
        model: "Lotos LTPDC2000D",
        capacity: "200 A",
        speed: "TIG/Stick",
        price: 70000,
        category: {
            name: "WeldingMachines (extra)",
            alias: "weldingmachines_extra",
            type: "weldingmachines"
        }
    },
    {
        model: "YESWELDER MIG-205DS",
        capacity: "30-200 A",
        speed: "MIG/TIG/Stick",
        price: 55000,
        category: {
            name: "WeldingMachines (extra)",
            alias: "weldingmachines_extra",
            type: "weldingmachines"
        }
    },
    {
        model: "Kemppi Minarc 150",
        capacity: "150 A",
        speed: "35% Duty Cycle",
        price: 19500,
        category: {
            name: "WeldingMachines (extra)",
            alias: "weldingmachines_extra",
            type: "weldingmachines"
        }
    }
]

const Category = [
    {
        name: "DrillingMachine (main)",
        alias: "drillingmachine_main",
        type: "drillingmachine"

    },
    {
        name: "DrillingMachine (extra)",
        alias: "drillingmachine_extra",
        type: "drillingmachine"
    },

    {
        name: "Breaker (main)",
        alias: "breaker_main",
        type: "breaker"
    },
    {
        name: "Breaker (extra)",
        alias: "breaker_extra",
        type: "breaker"
    },

    {
        name: "PaintMixer (main)",
        alias: "paintmixer_main",
        type: "paintmixer"
    },
    {
        name: "PaintMixer (extra)",
        alias: "paintmixer_extra",
        type: "paintmixer"
    },
    {
        name: "Cutter (main)",
        alias: "cutter_main",
        type: "cutter"
    },
    {
        name: "Cutter (extra)",
        alias: "cutter_extra",
        type: "cutter"
    },
    {
        name: "CutOffMachines (main)",
        alias: "cutoffmachines_main",
        type: "cutoffmachines"
    },
    {
        name: "CutOffMachines (extra)",
        alias: "cutoffmachines_extra",
        type: "cutoffmachines"
    },
    {
        name: "Blowers (main)",
        alias: "blowers_main",
        type: "blowers"
    },
    {
        name: "Blowers (extra)",
        alias: "blowers_extra",
        type: "blowers"
    },
    {
        name: "WeldingMachines (main)",
        alias: "weldingmachines_main",
        type: "weldingmachines"
    },
    {
        name: "WeldingMachines (extra)",
        alias: "weldingmachines_extra",
        type: "weldingmachines"
    }

]
module.exports = { Products, Category }
