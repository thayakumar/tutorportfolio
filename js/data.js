const DEFAULT_DATA = {
  hero: {
    name: "Aisha Rahman",
    title: "Online Tutor",
    tagline: "Bridging curiosity with confidence!",
    bio: "Passionate educator with over 8 years of experience helping students unlock their potential through interactive, personalised learning. I believe every student can excel when given the right guidance and encouragement.",
    photo: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&h=400&fit=crop&crop=face",
    stats: [
      { value: "8+", label: "Years Experience" },
      { value: "350+", label: "Students Helped" },
      { value: "4.9", label: "Rating", icon: "star" }
    ],
    ctaText: "Chat on WhatsApp",
    whatsappNumber: "60123456789",
    whatsappMessage: "Hi! I'm interested in tutoring sessions.",
    videoUrl: ""
  },
  brand: {
    logoText: "BRIGHT MINDS",
    logoIcon: "graduation-cap"
  },
  nav: {
    items: ["Home", "About", "Subjects", "Reviews", "Contact"]
  },
  philosophy: {
    heading: "My Teaching Philosophy",
    subheading: "How I Teach",
    description: "I create a supportive learning environment where mistakes are stepping stones, not setbacks. My lessons blend structured curriculum with real-world applications, ensuring students not only understand concepts but can apply them confidently.",
    approaches: [
      {
        title: "Interactive Lessons",
        description: "Engaging, two-way sessions where students actively participate through problem-solving, discussions, and hands-on exercises rather than passive listening.",
        icon: "lightbulb"
      },
      {
        title: "Tailored to You",
        description: "Every student learns differently. I adapt my teaching style, pace, and materials to match each student's unique strengths and areas for growth.",
        icon: "target"
      },
      {
        title: "Exam-Ready Prep",
        description: "Strategic revision techniques, past-paper practice, and time management skills to help students walk into exams feeling prepared and confident.",
        icon: "trophy"
      }
    ]
  },
  subjects: [
    {
      name: "Mathematics",
      levels: "IGCSE, SPM, A-Level",
      icon: "calculator",
      color: "#FFE082"
    },
    {
      name: "Science & Physics",
      levels: "Form 1-5, IGCSE",
      icon: "flask",
      color: "#A5D6A7"
    },
    {
      name: "English Literature",
      levels: "SPM, IGCSE, A-Level",
      icon: "book-open",
      color: "#EF9A9A"
    },
    {
      name: "Additional Maths",
      levels: "SPM, IGCSE",
      icon: "square-root",
      color: "#CE93D8"
    }
  ],
  reviews: [
    {
      quote: "A game-changer for my grades! Teacher Aisha explains things in a way that actually makes sense. Went from a C to an A in just two terms.",
      name: "Liam",
      detail: "Grade 10"
    },
    {
      quote: "My daughter used to dread maths homework. Now she actually looks forward to her sessions. The confidence boost has been incredible.",
      name: "Mrs. Tan",
      detail: "Parent"
    },
    {
      quote: "Best tutor I've ever had. She makes physics fun with real-life examples and never makes you feel silly for asking questions.",
      name: "Priya",
      detail: "Form 5"
    },
    {
      quote: "Teacher Aisha helped me prepare for my IGCSE exams with a clear study plan. I scored straight A*s in Maths and Physics!",
      name: "Daniel",
      detail: "IGCSE Student"
    },
    {
      quote: "Very patient and professional. She identified my son's weak areas quickly and worked on them systematically. Highly recommend!",
      name: "Mr. Ahmad",
      detail: "Parent"
    }
  ],
  cta: {
    heading: "Let's Get Started",
    description: "Ready to boost your grades and build real confidence in your studies? Book a free trial session and experience the difference personalised tutoring can make.",
    buttonText: "Chat on WhatsApp",
    whatsappNumber: "60123456789",
    whatsappMessage: "Hi! I'd like to book a free trial session."
  },
  contact: {
    email: "aisha@example.com",
    phone: "+60 12-345 6789",
    whatsapp: "60123456789",
    location: "Petaling Jaya, Selangor",
    social: {
      instagram: "#",
      facebook: "#",
      tiktok: "",
      linkedin: "",
      youtube: ""
    }
  },
  footer: {
    copyright: "Bright Minds Tutoring",
    year: "2024"
  }
};

function getSiteData() {
  try {
    const stored = localStorage.getItem('tutorPortfolioData');
    if (stored) {
      const parsed = JSON.parse(stored);
      return deepMerge(structuredClone(DEFAULT_DATA), parsed);
    }
  } catch (e) {}
  return structuredClone(DEFAULT_DATA);
}

function saveSiteData(data) {
  try {
    localStorage.setItem('tutorPortfolioData', JSON.stringify(data));
    return true;
  } catch (e) {
    return false;
  }
}

function resetSiteData() {
  try {
    localStorage.removeItem('tutorPortfolioData');
    return true;
  } catch (e) {
    return false;
  }
}

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])
        && target[key] && typeof target[key] === 'object' && !Array.isArray(target[key])) {
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

function exportData() {
  const data = getSiteData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'site-data.json';
  a.click();
  URL.revokeObjectURL(url);
}

function getWhatsAppUrl(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message || '')}`;
}
