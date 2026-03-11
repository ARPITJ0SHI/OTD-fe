// ========== LANDING PAGE DATA CONSTANTS ==========

export const HOMEPAGE_CONSTANTS = {
  BANNERS: {
    TOP: "THE STREETS ARE CALLING",
  },
  
  UPCOMING_MATCHES: [
    {
      id: "m1",
      playerA: "Zion Phantom",
      playerB: "Marcus Steel",
      date: "MARCH 24, 2026",
      location: "RUCKER PARK, NYC",
      status: "upcoming" as const,
    },
    {
      id: "m2",
      playerA: "Tyrese Flow",
      playerB: "Darnell ICE",
      date: "MARCH 28, 2026",
      location: "VENICE BEACH, CA",
      status: "upcoming" as const,
    },
    {
      id: "m3",
      playerA: "Jamal Apex",
      playerB: "Chris Viper",
      date: "APRIL 02, 2026",
      location: "DYCKMAN, NYC",
      status: "upcoming" as const,
    },
  ],

  RECENT_RESULTS: [
    {
      id: "r1",
      playerA: "Deandre Flash",
      playerB: "Terrell Bounce",
      date: "MARCH 10, 2026",
      location: "THE DUNGEON, CHI",
      status: "completed" as const,
      scoreA: 21,
      scoreB: 18,
    },
    {
      id: "r2",
      playerA: "Elijah Ghost",
      playerB: "Kevin Clutch",
      date: "MARCH 05, 2026",
      location: "WEST 4TH ST, NYC",
      status: "completed" as const,
      scoreA: 15,
      scoreB: 21,
    },
  ],

  FEATURED_PLAYERS: [
    { id: "p1", name: "Zion", nickname: "The Ghost", wins: 42, losses: 5 },
    { id: "p2", name: "Marcus", nickname: "Steel", wins: 38, losses: 12 },
    { id: "p3", name: "Tyrese", nickname: "Flow", wins: 29, losses: 4 },
    { id: "p4", name: "Darnell", nickname: "ICE", wins: 45, losses: 18 },
  ],

  NEWS: [
    { id: "n1", title: "Darnell ICE Extends Winning Streak to 15 Games", category: "Highlights", date: "MARCH 20, 2026", featured: true },
    { id: "n2", title: "New York Summer League Announced", category: "Announcements", date: "MARCH 18, 2026" },
    { id: "n3", title: "Zion vs Steel: The Rematch We've Been Waiting For", category: "Announcements", date: "MARCH 15, 2026" },
    { id: "n4", title: "Flash Takes the Crown at The Dungeon", category: "Results", date: "MARCH 11, 2026" },
    { id: "n5", title: "Sponsorship Deals Open for 2026 Season", category: "Announcements", date: "MARCH 01, 2026" },
  ],

  MERCH: [
    { id: "i1", title: "OTD Classic Hoodie", price: "$65.00", available: true },
    { id: "i2", title: "Ghost Signature Jersey", price: "$45.00", available: true },
    { id: "i3", title: "Street Court Cap", price: "$25.00", available: true },
    { id: "i4", title: "Steel Collection X", price: "TBD", available: false },
  ],

  FLYTHROUGH_CARDS: [
    { id: 1, playerA: "NAS", playerB: "SKOOB", date: "March 28th", location: "San Francisco" },
    { id: 2, playerA: "ZION", playerB: "STEEL", date: "April 5th", location: "Rucker Park, NYC" },
    { id: 3, playerA: "FLOW", playerB: "ICE", date: "April 12th", location: "Venice Beach, LA" },
    { id: 4, playerA: "APEX", playerB: "VIPER", date: "April 20th", location: "Dyckman, NYC" },
    { id: 5, playerA: "GHOST", playerB: "CLUTCH", date: "May 1st", location: "The Cage, West 4th" },
  ]
};
