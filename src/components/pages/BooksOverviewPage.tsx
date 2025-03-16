import React from 'react'
import { motion } from 'framer-motion';

const books = [
    {
        title: "Epic of Gilgamesh",
        author: "Sin-leqi-unninni",
        approxDateYear: 1200,
        timeline: "bce",
        sources: [],
        notes: "",
        geography: {
            origin: {
                city: "Ur",
                country: "Sumer",
            },
            description: "Sumeria"
        }
    },
    {
        title: "Odyssey",
        author: "Homer",
        approxDateYear: 800,
        timeline: "bce",
        sources: [],
        notes: "",
        geography: {
            origin: {
                city: "Smyrna",
                country: "Greece",
            },
            description: "Ancient Greece; Eastern Greece; Smyrna or Chios; Modern day Turkey"
        }
    },
    {
        title: "Odyssey",
        author: "Illiad",
        approxDateYear: 800,
        timeline: "bce",
        sources: [],
        notes: "",
        geography: {
            origin: {
                city: "Smyrna",
                country: "Greece",
            },
            description: "Ancient Greece; Eastern Greece; Smyrna or Chios; Modern day Turkey"
        }
    },
    {
        title: "Works and Days",
        author: "Hesiod",
        approxDateYear: 700,
        timeline: "bce",
        sources: [],
        notes: "",
        geography: {
            origin: {
                city: "Boeotia",
                country: "Greece",
            },
            description: ""
        }
    },
    {
        title: "The Histories",
        author: "Herodotus",
        approxDateYear: 425,
        timeline: "bce",
        sources: [],
        notes: `
            So far discussing Croesus, King of Lydia, and how he lost his kingdom to Cryus the Great of Persia. 
            Discussed how Croesus thinks he is the most fortunate and tries to get Solon to agree to this. 
            Talks to the Oracle of Delphi and assumes an understanding of a prophecy he received.
            Unfortonately Croesus interpeted the prophecy incorrectly.
            Before the prophecy could fully come to pass Croesus newly wedded son gets killed on accident by Astratos (might be wrong about the name)
            Astratos is the son of King Gordias who is the son of King Midas (Golden Touch King Midas)
            Shortly after Croesus attempts to conquer Persia.
            Loses a battle with Persia and then they invade Lydia
            The Persians take Croesus captive.
            Cyrus and Croesus become friends
        `,
        geography: {
            origin: {
                city: "Athens",
                country: "Greece",
            },
            description: ""
        }
    },
    {
        title: "The Republic",
        author: "Plato",
        approxDateYear: 375,
        timeline: "bce",
        sources: [],
        notes: "",
        geography: {
            origin: {
                city: "Athens",
                country: "Greece",
            },
            description: ""
        }
    },
    {
        title: "Timaeus and Crities",
        author: "Plato",
        approxDateYear: 360,
        timeline: "bce",
        sources: [],
        notes: "",
        geography: {
            origin: {
                city: "Athens",
                country: "Greece",
            },
            description: ""
        }
    },
    {
        title: "The Golden Verses",
        author: "Pythagoras",
        approxDateYear: 300,
        timeline: "bce",
        sources: [],
        notes: "",
        geography: {
            origin: {
                city: "Samos",
                country: "Greece",
            },
            description: ""
        }
    },
    {
        title: "Complete Works",
        author: "Philo",
        approxDateYear: 10,
        timeline: "ce",
        sources: [],
        notes: "",
        geography: {
            origin: {
                city: "Alexandria",
                country: "Egypt",
            },
            description: ""
        }
    },
    {
        title: "New Testament",
        author: "",
        approxDateYear: 60,
        timeline: "ce",
        sources: [],
        notes: "Will break this out into individual books as well",
        geography: {
            origin: {
                city: "Mount Sinai",
                country: "Egypt",
            },
            description: "Codex Sinaiticus was Discovered at St. Catherine's Monastary on Mount Sinai late 4th century CE"
        }
    },
    {
        title: "Antiquities of the Jews",
        author: "Flavius Josephus",
        approxDateYear: 75,
        timeline: "ce",
        sources: [],
        notes: "Includes a library of literature by Josephus",
        geography: {
            origin: {
                city: "Rome",
                country: "Rome",
            },
            description: ""
        }
    },
    {
        title: "Nag Hammadi Library",
        author: "",
        approxDateYear: 100,
        timeline: "ce",
        sources: [],
        notes: "Will break this out into individual books as well",
        geography: {
            origin: {
                city: "Nag Hammadi",
                country: "Egypt",
            },
            description: "Early Gnostic Christian and Egyptian Hermetic literature"
        }
    },
    {
        title: "Plutarch's Lives",
        author: "Plutarch",
        approxDateYear: 100,
        timeline: "ce",
        sources: [],
        notes: "Priest of Apollo -> Worked closely with Oracle of Delphi",
        geography: {
            origin: {
                city: "Chaeronea",
                country: "Greece",
            },
            description: ""
        }
    },
    {
        title: "On Isis and Osiris",
        author: "Plutarch",
        approxDateYear: 100,
        timeline: "ce",
        sources: [],
        notes: "Priest of Apollo -> Worked closely with Oracle of Delphi",
        geography: {
            origin: {
                city: "Chaeronea",
                country: "Greece",
            },
            description: ""
        }
    },
    {
        title: "Meditations",
        author: "Marcus Aurelius",
        approxDateYear: 170,
        timeline: "ce",
        sources: [],
        notes: "Roman Emperor. Last of 5 Good Emperors.",
        geography: {
            origin: {
                city: "Sirmium",
                country: "Rome",
            },
            description: ""
        }
    },
    {
        title: "Against Heresies",
        author: "Iranaeus",
        approxDateYear: 180,
        timeline: "ce",
        sources: [],
        notes: "Bishop of Lyon",
        geography: {
            origin: {
                city: "Lyon",
                country: "Gaul",
            },
            description: "Modern day France"
        }
    },
    {
        title: "The Refutation of All Heresies",
        author: "Hippolytus",
        approxDateYear: 200,
        timeline: "ce",
        sources: [],
        notes: "Student of Iranaeus who was a student of Polycarp (Supposedly)",
        geography: {
            origin: {
                city: "Rome",
                country: "Rome",
            },
            description: ""
        }
    },
];

export const BooksOverviewPage = () => {
    return (
        <>
            <div>BooksOverviewPage</div>
            <div style={{
                // this is the line
                height: "4px",
                width: "100%",
                background: "#fff"
            }} />
            {/* These are the ticks */}
            <div style={{ display: "flex", gap: "24px" }}>
                {/* BCE */}
                {new Array(50)
                    .fill("")
                    .map((_, index) => index && ({
                        icon: (
                            <motion.div
                                whileHover={{ scale: 1.8 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div style={{height: "20px", width: "1px", background: "#fff"}} />
                                <p style={{fontSize: "smallest"}}>{index * (-50)} BCE</p>
                            </motion.div>
                        )
                    }))
                    .reverse()
                    .map((item: any) => item.icon)
                }
                {/* CE */}
                {new Array(20)
                    .fill("")
                    .map((_, index) => ({
                        icon: (
                            <motion.div
                                whileHover={{ scale: 1.8 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div style={{height: "20px", width: "1px", background: "#fff"}} />
                                <p style={{fontSize: "smallest"}}>{index * 50} CE</p>
                            </motion.div>
                        )
                    }))
                    .map((item) => item.icon)
                }
            </div>
        </>
    )
}
