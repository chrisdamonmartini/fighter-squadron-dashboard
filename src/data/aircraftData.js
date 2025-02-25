export const aircraftData = [
  {
    id: "001",
    tailNumber: "F-35A-21-001",
    type: "F35",
    status: "Mission Ready",
    nextMission: "CAP 08:00",
    timeToNext: "1h 23m",
    systems: [
      { name: "Propulsion", status: "Operational" },
      { name: "Avionics", status: "Operational" },
      { name: "Weapons", status: "Operational" },
      { name: "Landing Gear", status: "Operational" },
      { name: "EOTS", status: "Operational" }
    ],
    errors: [],
    alerts: []
  },
  {
    id: "002",
    tailNumber: "F-35A-21-002",
    type: "F35",
    status: "Minor Issues",
    nextMission: "AI 14:30",
    timeToNext: "7h 53m",
    systems: [
      { name: "Propulsion", status: "Operational" },
      { name: "Avionics", status: "Operational" },
      { name: "Weapons", status: "Operational" },
      { name: "Landing Gear", status: "Operational" },
      { name: "Radar", status: "Degraded" }
    ],
    errors: [
      { id: "e001", system: "Radar", message: "Degraded performance - W-103-22" }
    ],
    alerts: [
      { id: "a001", message: "Radar operating with restrictions", level: "warning" }
    ]
  },
  {
    id: "003",
    tailNumber: "F-35A-21-003",
    type: "F35",
    status: "In Repair",
    nextMission: "CANCELLED",
    timeToNext: "N/A",
    systems: [
      { name: "Propulsion", status: "Operational" },
      { name: "Avionics", status: "Operational" },
      { name: "Weapons", status: "Operational" },
      { name: "Landing Gear", status: "Operational" },
      { name: "EOTS", status: "Failure" }
    ],
    errors: [
      { id: "e002", system: "EOTS", message: "Target tracking failure - E-235-11" }
    ],
    alerts: [
      { id: "a002", message: "EOTS system failure", level: "critical" },
      { id: "a003", message: "Parts delayed by 12 hours", level: "warning" }
    ]
  }
  // More aircraft data...
];
