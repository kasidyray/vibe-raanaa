// ─── Types ────────────────────────────────────────────────────────────────────

export type Student = {
  id:          number
  name:        string
  initials:    string
  gender:      "Male" | "Female"
  age:         number
  class:       string
  avgGrade:    number | null
  missingDays: number
}

// ─── Mock data ────────────────────────────────────────────────────────────────

export const STUDENTS: Student[] = [
  { id: 447, name: "Robert Fox",         initials: "RF", gender: "Male",   age: 17, class: "1A",  avgGrade: 9.3,  missingDays: 0  },
  { id: 877, name: "Marvin McKinney",    initials: "MM", gender: "Male",   age: 6,  class: "1B",  avgGrade: null, missingDays: 0  },
  { id: 556, name: "Darrell Steward",    initials: "DS", gender: "Female", age: 10, class: "4C",  avgGrade: 8.6,  missingDays: 6  },
  { id: 432, name: "Savannah Nguyen",    initials: "SN", gender: "Male",   age: 11, class: "4C",  avgGrade: 7.2,  missingDays: 6  },
  { id: 536, name: "Dianne Russell",     initials: "DR", gender: "Female", age: 16, class: "11B", avgGrade: 8.2,  missingDays: 10 },
  { id: 703, name: "Cody Fisher",        initials: "CF", gender: "Female", age: 11, class: "4A",  avgGrade: 5.2,  missingDays: 20 },
  { id: 922, name: "Leslie Alexander",   initials: "LA", gender: "Female", age: 12, class: "5A",  avgGrade: 6.5,  missingDays: 0  },
  { id: 540, name: "Albert Flores",      initials: "AF", gender: "Male",   age: 14, class: "7B",  avgGrade: 7.5,  missingDays: 0  },
  { id: 426, name: "Ralph Edwards",      initials: "RE", gender: "Male",   age: 17, class: "11C", avgGrade: 9.5,  missingDays: 1  },
  { id: 883, name: "Darlene Robertson",  initials: "DR", gender: "Female", age: 18, class: "1A",  avgGrade: 10.0, missingDays: 0  },
  { id: 312, name: "Jerome Bell",        initials: "JB", gender: "Male",   age: 15, class: "9B",  avgGrade: 8.1,  missingDays: 3  },
  { id: 654, name: "Kathryn Murphy",     initials: "KM", gender: "Female", age: 13, class: "6A",  avgGrade: 9.0,  missingDays: 2  },
  { id: 289, name: "Cameron Williamson", initials: "CW", gender: "Male",   age: 9,  class: "2B",  avgGrade: 7.8,  missingDays: 5  },
  { id: 751, name: "Brooklyn Simmons",   initials: "BS", gender: "Female", age: 14, class: "8C",  avgGrade: 6.3,  missingDays: 8  },
  { id: 498, name: "Theresa Webb",       initials: "TW", gender: "Female", age: 16, class: "10A", avgGrade: 8.9,  missingDays: 1  },
]
