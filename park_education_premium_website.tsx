import React, { useState, useEffect, useMemo } from 'react';
import {
  GraduationCap,
  Award,
  BookOpen,
  ShieldCheck,
  Stethoscope,
  Compass,
  Briefcase,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Search,
  ExternalLink,
  X,
  Send,
  Calendar,
  User,
  ArrowRight,
  Sparkles,
  Filter,
  HeartHandshake,
  Scale,
  FlaskConical,
  Plane,
  Building2,
  Activity,
  FileText,
  MessageSquare,
  BadgeCheck,
  Menu,
  ShieldAlert,
  HelpCircle,
  PhoneCall,
  Check
} from 'lucide-react';

// --- DATA STRUCTURES ---

const ANNIVERSARY_YEARS = 18;
const FOUNDED_YEAR = 2008;
const CURRENT_YEAR = 2026;

// The 10 Mandated Academic Verticals with Verified Institutional Descriptions
const COURSE_CATEGORIES = [
  {
    id: 'medicine',
    title: 'Medicine',
    tag: 'MBBS / MD / International',
    icon: Stethoscope,
    badge: 'NMC / WHO Regulated',
    duration: '5.5 Years (Inc. Internship)',
    shortDesc: 'Comprehensive guidance for National & International medical pathways with zero misleading seat claims.',
    detailedOverview: 'Guiding aspiring doctors through transparent institutional options across certified medical colleges. We assist with NEET eligibility verification, state and central counselling documentation, and genuine advisory on curriculum standards.',
    specializations: ['General Medicine (MBBS)', 'Clinical Post-Graduation', 'Dental Surgery (BDS)', 'International Medical Track (WHO/ECFMG Listed)'],
    eligibility: '10+2 with Physics, Chemistry & Biology (NEET Qualified)',
    careerPaths: ['Hospital Resident', 'Clinical Specialist', 'Medical Researcher', 'Global Healthcare Practitioner'],
    regulatoryBody: 'National Medical Commission (NMC) & State Medical Councils',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    popularCategory: 'Healthcare'
  },
  {
    id: 'engineering',
    title: 'Engineering & Technology',
    tag: 'B.Tech / M.Tech / AI & CS',
    icon: Building2,
    badge: 'AICTE / NBA Accreditations',
    duration: '4 Years Full-Time',
    shortDesc: 'Emerging computing disciplines, robotics, core electronics, and autonomous engineering frameworks.',
    detailedOverview: 'Institutional mapping into premier technological institutes approved by AICTE. We benchmark laboratories, faculty credentials, industry research MoUs, and emerging specializations before counseling students.',
    specializations: ['Artificial Intelligence & Data Science', 'Computer Science & Cyber Security', 'Robotics & Automation', 'Mechanical & Autonomous Systems'],
    eligibility: '10+2 with Physics, Mathematics and Chemistry/Comp. Science',
    careerPaths: ['Systems Architect', 'Cloud Security Specialist', 'Robotics Engineer', 'Enterprise Tech Lead'],
    regulatoryBody: 'AICTE & Respective Technological Universities',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    popularCategory: 'Engineering'
  },
  {
    id: 'nursing',
    title: 'Nursing & Patient Care',
    tag: 'B.Sc / Post-Basic / M.Sc',
    icon: HeartHandshake,
    badge: 'INC & State Nursing Council',
    duration: '4 Years (B.Sc)',
    shortDesc: 'High-standard clinical training across multi-speciality tertiary care teaching hospitals.',
    detailedOverview: 'Navigating ethical admissions in hospital-attached nursing colleges offering mandatory clinical bed ratios. Certified under the Indian Nursing Council with immediate global portability.',
    specializations: ['B.Sc Nursing (Basic)', 'Critical Care Nursing', 'Pediatric & Neonatal Care', 'Community Healthcare Operations'],
    eligibility: '10+2 with PCB (Minimum 45-50% Aggregate as per council norms)',
    careerPaths: ['Registered Staff Nurse', 'Clinical Nurse Specialist', 'Hospital Nursing Director', 'International Healthcare Specialist (UK/OET/NCLEX)'],
    regulatoryBody: 'Indian Nursing Council (INC) & State Councils',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    popularCategory: 'Healthcare'
  },
  {
    id: 'law',
    title: 'Law & Legal Studies',
    tag: 'BA LLB / BBA LLB / LLM',
    icon: Scale,
    badge: 'Bar Council of India (BCI)',
    duration: '5 Years Integrated / 3 Years',
    shortDesc: 'Corporate litigation, constitutional jurisprudence, intellectual property, and arbitration advocacy.',
    detailedOverview: 'Guiding legal scholars into institutions boasting moot court heritage, judicial mentorship, and verified Bar Council of India recognition. We help identify colleges with strong corporate placement ties.',
    specializations: ['BA LLB (Honours)', 'BBA LLB (Corporate Focus)', 'Cyber & Intellectual Property Law', 'Constitutional Litigation'],
    eligibility: '10+2 in any stream (CLAT / State CET / Merit-based)',
    careerPaths: ['Corporate Counsel', 'Litigation Advocate', 'Judicial Services', 'Policy Analyst'],
    regulatoryBody: 'Bar Council of India (BCI)',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    popularCategory: 'Professional'
  },
  {
    id: 'paramedical',
    title: 'Paramedical Sciences',
    tag: 'MLT / Radiology / Emergency',
    icon: Activity,
    badge: 'State Paramedical Board',
    duration: '3 to 3.5 Years',
    shortDesc: 'Diagnostic laboratory technologies, medical imaging, and trauma operation assistance.',
    detailedOverview: 'Paramedical professionals form the backbone of modern clinical diagnostics. We connect students exclusively with institutions possessing operating diagnostic labs and CT/MRI training facilities.',
    specializations: ['Medical Laboratory Technology (BMLT)', 'Medical Imaging & Radiology (BRIT)', 'Emergency & Trauma Care Tech', 'Operation Theatre & Anesthesia Tech'],
    eligibility: '10+2 with Science (PCB/PCM)',
    careerPaths: ['Chief Radiology Technologist', 'Diagnostic Laboratory Manager', 'ICU Technologist', 'Clinical Diagnostic Consultant'],
    regulatoryBody: 'State Paramedical Faculty & Allied Health Councils',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    popularCategory: 'Healthcare'
  },
  {
    id: 'allied-health',
    title: 'Allied Health Science',
    tag: 'Cardiac / Perfusion / Neuro',
    icon: FlaskConical,
    badge: 'Clinical Affiliated Hubs',
    duration: '3 to 4 Years',
    shortDesc: 'Specialized healthcare operation including cardiovascular perfusion, dialysis, and neurology technology.',
    detailedOverview: 'Critical clinical specializations powering cardiac suites and critical care units. PARK Education vets clinical internship tie-ups and patient footfalls before recommending colleges.',
    specializations: ['Cardiac Perfusion Technology', 'Cardiovascular Technology', 'Renal Dialysis Technology', 'Neuro Science Technology'],
    eligibility: '10+2 with Biology, Physics & Chemistry',
    careerPaths: ['Cardiovascular Perfusionist', 'Cath Lab Technologist', 'Dialysis Supervisor', 'Clinical Neuro Technologist'],
    regulatoryBody: 'National Commission for Allied and Healthcare Professions (NCAHP)',
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
    popularCategory: 'Healthcare'
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy & Drug Research',
    tag: 'B.Pharm / Pharm.D / M.Pharm',
    icon: BookOpen,
    badge: 'Pharmacy Council of India (PCI)',
    duration: '4 Yrs (B.Pharm) / 6 Yrs (Pharm.D)',
    shortDesc: 'Pharmaceutical formulations, clinical pharmacy practice, regulatory drug affairs, and synthesis.',
    detailedOverview: 'From traditional pharmaceutical chemistry to high-impact Pharm.D clinical rounds, we advise on institutions with PCI-approved pilot plants and research publications.',
    specializations: ['Bachelor of Pharmacy (B.Pharm)', 'Doctor of Pharmacy (Pharm.D Clinical)', 'Pharmaceutical Chemistry', 'Pharmacology & Toxicology'],
    eligibility: '10+2 with PCM or PCB',
    careerPaths: ['Clinical Pharmacist', 'Drug Regulatory Affairs Specialist', 'Formulation Scientist', 'Quality Control Analyst'],
    regulatoryBody: 'Pharmacy Council of India (PCI)',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=800&q=80',
    popularCategory: 'Healthcare'
  },
  {
    id: 'aviation',
    title: 'Aviation & Aerospace',
    tag: 'Commercial Pilot / AME / Mgmt',
    icon: Plane,
    badge: 'DGCA Certified Syllabus',
    duration: '3 Years / CPL Flight Hours',
    shortDesc: 'Commercial flying ground theory, aircraft maintenance engineering, and airport operations.',
    detailedOverview: 'Dedicated career advisory for aviation careers. Guidance encompasses DGCA computer number paperwork, flight school flying fleet audits, type rating tie-ups, and airport logistics degrees.',
    specializations: ['Commercial Pilot License (CPL Ground)', 'B.Sc Aviation & Flight Systems', 'Aircraft Maintenance Engineering (AME)', 'Airport Operations & Air Cargo Mgmt'],
    eligibility: '10+2 with Physics & Mathematics (Mandatory for CPL/AME)',
    careerPaths: ['First Officer / Commercial Airline Pilot', 'Licensed Aircraft Maintenance Engineer', 'Air Traffic & Airport Operations Lead', 'Aviation Safety Inspector'],
    regulatoryBody: 'Directorate General of Civil Aviation (DGCA) & UGC',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    popularCategory: 'Professional'
  },
  {
    id: 'arts-science',
    title: 'Arts & Applied Sciences',
    tag: 'Data Science / Biotech / Media',
    icon: Compass,
    badge: 'UGC / NAAC Accredited',
    duration: '3 to 4 Years (NEP Mode)',
    shortDesc: 'Contemporary computational arts, corporate economics, biotechnology, and digital communications.',
    detailedOverview: 'Admissions mapped to research-grade liberal arts and science faculties. Structured around modern 4-year honors programs with multidisciplinary minors and corporate internships.',
    specializations: ['B.Sc Data Science & AI', 'Biotechnology & Bioinformatics', 'B.Com / BBA Professional Finance', 'Media Production & Visual Communication'],
    eligibility: '10+2 in relevant stream based on discipline',
    careerPaths: ['Data Analyst', 'Corporate Financial Strategist', 'Research Associate', 'Content & Creative Director'],
    regulatoryBody: 'University Grants Commission (UGC)',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    popularCategory: 'Professional'
  },
  {
    id: 'physiotherapy',
    title: 'Bachelor of Physiotherapy (BPT)',
    tag: 'BPT / Sports Rehab / Neuro',
    icon: Award,
    badge: 'Clinical Hospital Internship',
    duration: '4.5 Years (Inc. 6 Mos Internship)',
    shortDesc: 'Musculoskeletal rehabilitation, sports physiotherapy, pediatric recovery, and geriatric wellness.',
    detailedOverview: 'BPT combines intensive anatomical understanding with manual therapy and biomechanics. We shortlist colleges with comprehensive outpatient therapy departments and athletic recovery centers.',
    specializations: ['Orthopedic & Sports Physical Therapy', 'Neurological Rehabilitation', 'Cardiopulmonary Physiotherapy', 'Pediatric & Geriatric Therapy'],
    eligibility: '10+2 with Physics, Chemistry & Biology (Min 50%)',
    careerPaths: ['Consultant Physiotherapist', 'Sports Team Rehab Director', 'Cardio-Pulmonary Rehab Specialist', 'Ergonomic Health Consultant'],
    regulatoryBody: 'IAP & State Physiotherapy Councils',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    popularCategory: 'Healthcare'
  }
];

const MILESTONES = [
  {
    year: '2008',
    title: 'The Foundation of Integrity',
    desc: 'PARK Education was chartered with a strict promise: zero false claims, zero hidden donation rackets, and 100% verified institutional matching for South Indian families.'
  },
  {
    year: '2012',
    title: 'Dedicated Healthcare Advisory Cell',
    desc: 'Established dedicated verification protocols for Nursing, BDS, and Paramedical colleges, requiring verifiable bed-counts and active hospital affiliations.'
  },
  {
    year: '2016',
    title: 'STEM & Aviation Pathways',
    desc: 'Expanded into DGCA-aligned aviation guidance and advanced computing B.Tech specializations across accredited universities.'
  },
  {
    year: '2020',
    title: 'Digital Advisory Infrastructure',
    desc: 'Pioneered secure digital counseling sessions, enabling remote pan-India families and NRI students to undergo verified academic profile vetting safely.'
  },
  {
    year: '2023',
    title: '10,000+ Students Mentored',
    desc: 'Crossed the landmark milestone of 10,000 students guided without a single ethical discrepancy or unverified seat allocation.'
  },
  {
    year: '2026',
    title: '18 Years of Academic Excellence',
    desc: 'Celebrating our 18th anniversary with enhanced parent advisory tools, direct university auditing, and comprehensive multi-discipline support.'
  }
];

const FAQS = [
  {
    q: 'Does PARK Education charge any hidden fees or make false admission promises?',
    a: 'Absolutely not. In our 18 years of service since 2008, PARK Education has strictly adhered to ethical counseling. We charge zero concealed fees, never solicit unofficial "capitation" payments, and explicitly state that all final admissions depend strictly on official council eligibility and college validation.'
  },
  {
    q: 'How do you verify whether a college is genuinely accredited?',
    a: 'We independently audit college credentials directly against government gazettes: NMC for Medical, INC & State Councils for Nursing, PCI for Pharmacy, BCI for Law, and AICTE/UGC for Engineering and Sciences. We never suggest unapproved or derecognized institutions.'
  },
  {
    q: 'What is the role of PARK Education in the admission process?',
    a: 'We act as professional academic navigators. We assess student aptitude, filter accredited colleges fitting family budgets, verify clinical bed-strengths and laboratories, navigate documentation, and coordinate official institutional procedures.'
  },
  {
    q: 'Can parents schedule one-on-one counseling before visiting institutions?',
    a: 'Yes. In-person counselling and secure video sessions are available. We provide parent checklists covering hostel safety, clinical approvals, authentic fee structures, and transparent fee installment schedules.'
  },
  {
    q: 'Do you help with education loans and documentation verification?',
    a: 'Yes. We provide verified bonafide checklists, fee estimates on official institution letterheads, and complete documentation clearance required by nationalized and private banking institutions.'
  }
];

export default function App() {
  // Navigation & Mobile Drawer
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Course Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedCourseModal, setSelectedCourseModal] = useState(null);

  // Enquiry Form State
  const [formData, setFormData] = useState({
    studentName: '',
    mobileNumber: '',
    email: '',
    courseInterest: 'Medicine',
    studyDestination: 'South India (TN/KA/KL)',
    currentQualification: '12th Standard (Appeared/Completed)',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
    consent: false
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // General Enquiry Modal Trigger
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  // Filtered Courses
  const filteredCourses = useMemo(() => {
    return COURSE_CATEGORIES.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.specializations.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesFilter =
        selectedFilter === 'All' ||
        (selectedFilter === 'Healthcare' && course.popularCategory === 'Healthcare') ||
        (selectedFilter === 'Engineering' && course.popularCategory === 'Engineering') ||
        (selectedFilter === 'Professional' && course.popularCategory === 'Professional');

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFilter]);

  // Form submission handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // Validations
    if (!formData.studentName.trim()) {
      setFormError('Please provide the student’s full name.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.replace(/\s+/g, ''))) {
      setFormError('Please provide a valid 10-digit Indian contact number.');
      return;
    }
    if (!formData.consent) {
      setFormError('Please acknowledge consent to receive verified academic counseling.');
      return;
    }

    setFormSubmitting(true);
    // Simulate high-reliability API dispatch
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSubmitted(true);
    }, 900);
  };

  // WhatsApp formatted trigger
  const triggerDirectWhatsApp = (customCourse = null) => {
    const courseToAsk = customCourse || formData.courseInterest || 'Higher Education';
    const msg = encodeURIComponent(
      `Hello PARK Education Team, I am seeking genuine admission guidance regarding ${courseToAsk}. Please share accredited college criteria and counseling schedule. (Ref: 18th Anniversary Portal)`
    );
    window.open(`https://wa.me/919443210000?text=${msg}`, '_blank');
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#071324] text-slate-100 font-sans selection:bg-[#C59B27] selection:text-[#071324]">
      {/* --- TOP INSTITUTIONAL TRUST STRIP --- */}
      <div className="bg-[#050D19] border-b border-[#1A2E4B] text-xs py-2 px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#DFB75A]">
              <ShieldCheck className="w-4 h-4 text-[#C59B27]" />
              ESTABLISHED 2008 &bull; 18 YEARS OF ETHICAL ADVISORY (2008 – 2026)
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-400">
              Zero Unofficial Donation Advisory &bull; 100% Council Verified Affiliations
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300 font-medium">
            <a
              href="tel:+919443210000"
              className="hover:text-[#DFB75A] transition flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Direct Desk: +91 94432 10000</span>
            </a>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => triggerDirectWhatsApp()}
              className="text-[#25D366] hover:underline flex items-center gap-1 font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Official WhatsApp Desk</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- MAIN NAVIGATION --- */}
      <nav className="sticky top-0 z-40 bg-[#071324]/90 backdrop-blur-md border-b border-[#1A2E4B]/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo & Exact Identity */}
          <div
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            {/* Academic Crest Emblem Logo */}
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#102A4C] to-[#0A1A2F] border border-[#C59B27]/50 flex items-center justify-center shadow-lg shadow-black/40 group-hover:border-[#DFB75A] transition-all">
              <GraduationCap className="w-6 h-6 text-[#DFB75A]" />
              <div className="absolute -bottom-1 -right-1 bg-[#C59B27] text-[#071324] text-[9px] font-black px-1 rounded-sm tracking-tighter">
                18Y
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-[#DFB75A] transition">
                  PARK
                </span>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#DFB75A]">
                  Education
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                <span className="text-[#C59B27]">★</span> 18 Years Of Excellence &bull; Since 2008
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-200">
            <button
              onClick={() => scrollToSection('courses')}
              className="hover:text-[#DFB75A] transition py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#C59B27] after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              Academic Disciplines (10)
            </button>
            <button
              onClick={() => scrollToSection('legacy')}
              className="hover:text-[#DFB75A] transition py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#C59B27] after:absolute after:bottom-0 after:left-0 after:transition-all flex items-center gap-1.5"
            >
              <Award className="w-4 h-4 text-[#C59B27]" />
              18 Years Legacy
            </button>
            <button
              onClick={() => scrollToSection('why-park')}
              className="hover:text-[#DFB75A] transition py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#C59B27] after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              Why PARK
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className="hover:text-[#DFB75A] transition py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#C59B27] after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              Advisory Process
            </button>
            <button
              onClick={() => scrollToSection('parents-corner')}
              className="hover:text-[#DFB75A] transition py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#C59B27] after:absolute after:bottom-0 after:left-0 after:transition-all text-[#DFB75A]"
            >
              Parents Corner
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-[#DFB75A] transition py-1"
            >
              FAQ
            </button>
          </div>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setEnquiryModalOpen(true)}
              className="bg-gradient-to-r from-[#C59B27] via-[#DFB75A] to-[#C59B27] text-[#071324] font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Admission Guidance</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setEnquiryModalOpen(true)}
              className="bg-[#C59B27] text-[#071324] text-xs font-bold px-3 py-1.5 rounded"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A1A2F] border-b border-[#1A2E4B] px-6 py-5 space-y-4 shadow-2xl">
            <div className="py-2 border-b border-slate-800 text-xs text-[#DFB75A] font-semibold flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>18 Years of Excellence (Established 2008)</span>
            </div>
            <button
              onClick={() => scrollToSection('courses')}
              className="block w-full text-left py-2 font-medium text-slate-200 hover:text-[#DFB75A]"
            >
              All 10 Academic Verticals
            </button>
            <button
              onClick={() => scrollToSection('legacy')}
              className="block w-full text-left py-2 font-medium text-slate-200 hover:text-[#DFB75A]"
            >
              Our 18-Year Legacy (2008 - 2026)
            </button>
            <button
              onClick={() => scrollToSection('why-park')}
              className="block w-full text-left py-2 font-medium text-slate-200 hover:text-[#DFB75A]"
            >
              Why PARK Education
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className="block w-full text-left py-2 font-medium text-slate-200 hover:text-[#DFB75A]"
            >
              5-Step Admission Roadmap
            </button>
            <button
              onClick={() => scrollToSection('parents-corner')}
              className="block w-full text-left py-2 font-medium text-[#DFB75A]"
            >
              Parents Advisory & Accreditation
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="block w-full text-left py-2 font-medium text-slate-200"
            >
              Frequently Asked Questions
            </button>

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setEnquiryModalOpen(true);
                }}
                className="w-full bg-[#C59B27] text-[#071324] font-bold text-center py-3 rounded-lg text-sm"
              >
                Book Personal Counseling Slot
              </button>
              <button
                onClick={() => triggerDirectWhatsApp()}
                className="w-full bg-slate-800 text-[#25D366] font-semibold text-center py-2.5 rounded-lg text-sm border border-slate-700 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Chat with Senior Counselor
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section
        id="hero"
        className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-[#0A1A2F] via-[#071324] to-[#071324]"
      >
        {/* Subtle Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A2E4B15_1px,transparent_1px),linear-gradient(to_bottom,#1A2E4B15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[38rem] bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Prominent 18-Year Anniversary Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#102A4C]/80 border border-[#C59B27]/40 shadow-inner backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#DFB75A] animate-ping" />
                <span className="text-xs uppercase tracking-widest font-extrabold text-[#DFB75A]">
                  18 Years of Excellence &bull; Since 2008
                </span>
                <span className="hidden sm:inline bg-[#C59B27]/20 text-[#DFB75A] text-[10px] font-bold px-2 py-0.5 rounded">
                  2008 &ndash; 2026
                </span>
              </div>

              {/* Exact Mandated Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Your Future. <br className="hidden sm:inline" />
                Your Education. <br />
                <span className="bg-gradient-to-r from-amber-200 via-[#DFB75A] to-[#C59B27] bg-clip-text text-transparent">
                  Our Guidance.
                </span>
              </h1>

              {/* Exact Mandated Supporting Line */}
              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
                Guiding students towards the right academic opportunities since 2008. Dedicated,
                ethical mentorship across Medicine, Engineering, Healthcare, Law, and Allied disciplines.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => scrollToSection('courses')}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#C59B27] to-[#DFB75A] text-[#071324] font-bold text-sm tracking-wide px-8 py-4 rounded-xl shadow-lg shadow-[#C59B27]/20 hover:brightness-110 transition active:scale-95 flex items-center justify-center gap-2 group"
                >
                  <span>Explore Courses (10 Verticals)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => scrollToSection('enquiry')}
                  className="w-full sm:w-auto bg-[#0F243E] hover:bg-[#153256] text-white border border-[#23456F] font-semibold text-sm px-7 py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <FileText className="w-4 h-4 text-[#DFB75A]" />
                  <span>Get Admission Guidance</span>
                </button>
              </div>

              {/* Trust & Verified Highlights */}
              <div className="pt-6 border-t border-[#1A2E4B] grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                <div>
                  <div className="text-2xl font-serif font-bold text-white">18+ Yrs</div>
                  <div className="text-xs text-slate-400">Institutional Heritage</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#DFB75A]">10,000+</div>
                  <div className="text-xs text-slate-400">Aspirants Counseled</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-white">10 Major</div>
                  <div className="text-xs text-slate-400">Academic Disciplines</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-emerald-400">100%</div>
                  <div className="text-xs text-slate-400">Council Verified Audits</div>
                </div>
              </div>
            </div>

            {/* Right Visual Academic Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Showcase Card */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#C59B27]/40 shadow-2xl shadow-black/80 bg-[#0F243E]">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80"
                    alt="University Campus & Academic Scholars"
                    className="w-full h-80 sm:h-96 object-cover filter brightness-[0.9] contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-[#071324]/30 to-transparent" />

                  {/* Emblem Overlay */}
                  <div className="absolute top-4 right-4 bg-[#0A1A2F]/90 backdrop-blur-md border border-[#C59B27]/60 p-3 rounded-xl shadow-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C59B27]/20 border border-[#C59B27] flex items-center justify-center font-serif text-[#DFB75A] font-bold">
                      18
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] uppercase font-bold text-[#DFB75A] tracking-wider">
                        Anniversary
                      </div>
                      <div className="text-xs font-semibold text-white">2008 &ndash; 2026</div>
                    </div>
                  </div>

                  {/* Bottom Information Card Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0A1A2F]/95 backdrop-blur-md border border-[#1A2E4B] text-left">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#DFB75A] flex items-center gap-1">
                        <BadgeCheck className="w-4 h-4 text-[#C59B27]" />
                        Official Recognition Verification
                      </span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-semibold px-2 py-0.5 rounded border border-emerald-500/30">
                        Active 2026
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      We guide students exclusively into NMC, INC, PCI, BCI &amp; AICTE accredited
                      faculties with audited laboratory and clinical infrastructures.
                    </p>
                  </div>
                </div>

                {/* Floating Academic Badge */}
                <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 bg-[#0A1A2F] border border-[#C59B27]/40 p-3.5 rounded-xl shadow-2xl backdrop-blur-sm z-20">
                  <div className="p-2.5 rounded-lg bg-[#C59B27]/10 text-[#DFB75A]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">Strict Transparency Protocol</div>
                    <div className="text-[11px] text-slate-400">Zero Unofficial Capitations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 18 YEARS OF EXCELLENCE CELEBRATION BANNER --- */}
      <section className="bg-gradient-to-r from-[#0C1E36] via-[#122A4C] to-[#0C1E36] border-y border-[#C59B27]/30 py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#DFB75A] to-[#C59B27] text-[#071324] flex items-center justify-center font-serif text-2xl font-bold shadow-lg shadow-[#C59B27]/30 flex-shrink-0">
                18
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-white tracking-wide">
                  Celebrating 18 Years of Educational Mentorship
                </h3>
                <p className="text-sm text-slate-300">
                  Founded in 2008 &bull; Celebrating our Platinum Milestone in 2026 across Southern &amp; Pan-India Academics
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollToSection('legacy')}
                className="px-5 py-2.5 rounded-lg bg-[#071324] hover:bg-[#0A1A2F] text-[#DFB75A] border border-[#C59B27]/40 text-xs font-bold uppercase tracking-wider transition"
              >
                Read Milestone Journey
              </button>
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="px-5 py-2.5 rounded-lg bg-[#C59B27] hover:bg-[#DFB75A] text-[#071324] text-xs font-bold uppercase tracking-wider transition shadow"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- ALL 10 COURSE CATEGORIES GRID --- */}
      <section id="courses" className="py-20 bg-[#071324] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#DFB75A] uppercase">
              <BookOpen className="w-4 h-4 text-[#C59B27]" />
              Verified Academic Verticals
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Explore Our 10 Academic Pathways
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Every programme option adheres strictly to verified statutory accreditations including
              NMC, INC, PCI, BCI, and AICTE. Explore details, duration, career options, and consult our advisors.
            </p>

            {/* Filter Pills & Interactive Search Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              {/* Search input */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search discipline or degree..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0F243E] border border-[#1A2E4B] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#C59B27] transition"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {['All', 'Healthcare', 'Engineering', 'Professional'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedFilter(category)}
                    className={`text-xs font-medium px-4 py-2 rounded-xl transition ${
                      selectedFilter === category
                        ? 'bg-[#C59B27] text-[#071324] font-bold shadow'
                        : 'bg-[#0F243E] text-slate-300 hover:text-white border border-[#1A2E4B]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 10 Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const IconComponent = course.icon;
              return (
                <div
                  key={course.id}
                  className="group rounded-2xl bg-[#0F243E]/80 border border-[#1A2E4B] hover:border-[#C59B27]/60 overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
                >
                  {/* Card Image Banner */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F243E] via-[#0F243E]/40 to-transparent" />

                    <div className="absolute top-3 left-3 bg-[#071324]/90 backdrop-blur-sm border border-[#1A2E4B] text-[11px] font-semibold text-[#DFB75A] px-2.5 py-1 rounded-md flex items-center gap-1.5">
                      <IconComponent className="w-3.5 h-3.5 text-[#C59B27]" />
                      <span>{course.tag}</span>
                    </div>

                    <div className="absolute top-3 right-3 bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded">
                      {course.badge}
                    </div>

                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#C59B27]" />
                        {course.duration}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#DFB75A] transition">
                        {course.title}
                      </h3>
                      <p className="mt-2 text-xs text-slate-300 leading-relaxed line-clamp-2">
                        {course.shortDesc}
                      </p>

                      {/* Specialization tags preview */}
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {course.specializations.slice(0, 2).map((item, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-[#071324] text-slate-300 px-2 py-0.5 rounded border border-[#1A2E4B]"
                          >
                            {item}
                          </span>
                        ))}
                        {course.specializations.length > 2 && (
                          <span className="text-[10px] text-slate-400 self-center">
                            +{course.specializations.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-5 pt-4 border-t border-[#1A2E4B] flex items-center justify-between">
                      <button
                        onClick={() => setSelectedCourseModal(course)}
                        className="text-xs font-semibold text-[#DFB75A] hover:underline flex items-center gap-1"
                      >
                        Inspect Pathway <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, courseInterest: course.title }));
                          scrollToSection('enquiry');
                        }}
                        className="bg-[#1A2E4B] hover:bg-[#C59B27] hover:text-[#071324] text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg transition"
                      >
                        Enquire Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12 bg-[#0F243E] rounded-2xl border border-[#1A2E4B]">
              <HelpCircle className="w-10 h-10 text-slate-500 mx-auto mb-2" />
              <p className="text-slate-300 font-medium">No vertical matched your search query.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilter('All');
                }}
                className="mt-3 text-xs text-[#DFB75A] font-bold hover:underline"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* --- 18 YEARS OF EXCELLENCE TIMELINE --- */}
      <section id="legacy" className="py-20 bg-[#0A1A2F] border-t border-[#1A2E4B] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#DFB75A]">
              <Award className="w-4 h-4 text-[#C59B27]" />
              Institutional Evolution (2008 &ndash; 2026)
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              18 Years of Continuous Excellence
            </h2>
            <p className="text-slate-300 text-sm">
              Discover how PARK Education evolved into a premier ethical advisory for students and
              parents over nearly two decades.
            </p>
          </div>

          {/* Interactive Timeline Layout */}
          <div className="relative border-l-2 border-[#1E3A5F] ml-4 md:ml-32 pl-6 md:pl-12 space-y-12">
            {MILESTONES.map((item, index) => (
              <div key={index} className="relative group">
                {/* Year Marker Badge */}
                <div className="absolute -left-[35px] md:-left-[59px] top-0 w-8 h-8 rounded-full bg-[#071324] border-2 border-[#C59B27] flex items-center justify-center text-xs font-bold text-[#DFB75A] group-hover:bg-[#C59B27] group-hover:text-[#071324] transition-colors shadow">
                  ★
                </div>

                <div className="bg-[#0F243E] border border-[#1A2E4B] rounded-2xl p-6 hover:border-[#C59B27]/50 transition shadow-md">
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#C59B27]/20 text-[#DFB75A] border border-[#C59B27]/30 tracking-wider">
                    {item.year}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white mt-3">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE PARK EDUCATION (INSTITUTIONAL PILLARS) --- */}
      <section id="why-park" className="py-20 bg-[#071324] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#DFB75A]">
                <ShieldCheck className="w-4 h-4 text-[#C59B27]" />
                Institutional Standards
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                Why Thousands of Parents Trust PARK Education
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Higher education is a life-defining investment. Unlike commercial booking agents, PARK
                Education prioritizes verified accreditations, student welfare, clear fee structures,
                and legal validity.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0F243E] border border-[#1A2E4B]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Zero Misleading Seat Claims</h4>
                    <p className="text-xs text-slate-400">All institutional recommendations match council guidelines strictly.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0F243E] border border-[#1A2E4B]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Full Fee Schedule Transparency</h4>
                    <p className="text-xs text-slate-400">Clear breakdown of tuition, lab dues, university exam fees and authentic hostel deposits.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0F243E] border border-[#1A2E4B]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Physical Campus &amp; Clinical Vetting</h4>
                    <p className="text-xs text-slate-400">Regular on-ground audits of hospital bed counts, flight school aircrafts, and laboratories.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Matrix Table */}
            <div className="lg:col-span-7 bg-[#0F243E] border border-[#1A2E4B] rounded-2xl p-6 sm:p-8 shadow-2xl">
              <h3 className="font-serif text-xl font-bold text-white mb-6 text-center sm:text-left flex items-center justify-between">
                <span>The PARK Standard vs. Unregulated Agents</span>
                <span className="text-xs font-sans text-[#DFB75A] font-bold bg-[#DFB75A]/10 px-2.5 py-1 rounded">
                  Ethical Code
                </span>
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-3 pb-3 border-b border-slate-700 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <div className="col-span-5">Core Parameter</div>
                  <div className="col-span-4 text-emerald-400">PARK Education</div>
                  <div className="col-span-3 text-rose-400">Generic Agents</div>
                </div>

                <div className="grid grid-cols-12 gap-3 py-2 border-b border-slate-800 text-xs">
                  <div className="col-span-5 font-semibold text-slate-200">Regulatory Approvals</div>
                  <div className="col-span-4 text-emerald-300 font-medium">Independent council audits (NMC, INC, PCI, BCI)</div>
                  <div className="col-span-3 text-slate-400">Unverified brochures</div>
                </div>

                <div className="grid grid-cols-12 gap-3 py-2 border-b border-slate-800 text-xs">
                  <div className="col-span-5 font-semibold text-slate-200">Institutional Fees</div>
                  <div className="col-span-4 text-emerald-300 font-medium">Official university bank transactions only</div>
                  <div className="col-span-3 text-slate-400">Unofficial cash requests</div>
                </div>

                <div className="grid grid-cols-12 gap-3 py-2 border-b border-slate-800 text-xs">
                  <div className="col-span-5 font-semibold text-slate-200">Original Certificates</div>
                  <div className="col-span-4 text-emerald-300 font-medium">100% Student retained; never held hostage</div>
                  <div className="col-span-3 text-slate-400">Retained unlawfully</div>
                </div>

                <div className="grid grid-cols-12 gap-3 py-2 border-b border-slate-800 text-xs">
                  <div className="col-span-5 font-semibold text-slate-200">Parent Accessibility</div>
                  <div className="col-span-4 text-emerald-300 font-medium">Direct personal advisory desk with senior mentors</div>
                  <div className="col-span-3 text-slate-400">Untraceable call centers</div>
                </div>

                <div className="grid grid-cols-12 gap-3 py-2 text-xs">
                  <div className="col-span-5 font-semibold text-slate-200">Advisory Longevity</div>
                  <div className="col-span-4 text-[#DFB75A] font-bold">18 Continuous Years (2008 &ndash; 2026)</div>
                  <div className="col-span-3 text-slate-400">Seasonal startups</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ADMISSION GUIDANCE PROCESS (5 STEPS) --- */}
      <section id="process" className="py-20 bg-[#0A1A2F] border-t border-[#1A2E4B] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#DFB75A]">
              <Compass className="w-4 h-4 text-[#C59B27]" />
              Structured Pathway
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              The 5-Step Admission Guidance Process
            </h2>
            <p className="text-slate-300 text-sm">
              Our streamlined roadmap ensures peace of mind for both students and parents from initial
              profiling to day one on campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              {
                step: '01',
                title: 'Aptitude Profiling',
                desc: 'In-depth assessment of marks, entrance metrics, career passion, and family budget.'
              },
              {
                step: '02',
                title: 'College Auditing',
                desc: 'Shortlisting approved colleges with verifiable council standing, labs, and faculty ratios.'
              },
              {
                step: '03',
                title: 'Document Vetting',
                desc: 'Careful preparation of eligibility certificates, migration permits, and loan estimates.'
              },
              {
                step: '04',
                title: 'Official Allotment',
                desc: 'Accompanying or facilitating lawful admission confirmation through authorized institutional channels.'
              },
              {
                step: '05',
                title: 'Campus Onboarding',
                desc: 'Guidance on safe hostel allocation, orientation schedules, and initial semester mentorship.'
              }
            ].map((st, i) => (
              <div
                key={i}
                className="bg-[#0F243E] border border-[#1A2E4B] rounded-2xl p-5 relative flex flex-col justify-between hover:border-[#C59B27]/50 transition group"
              >
                <div>
                  <div className="text-3xl font-serif font-black text-[#DFB75A]/40 group-hover:text-[#DFB75A] transition">
                    {st.step}
                  </div>
                  <h3 className="font-serif text-base font-bold text-white mt-2 mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center justify-between">
                  <span>Phase {i + 1}</span>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- STUDENT & PARENT CORNER (ACCREDITATION & SAFETY) --- */}
      <section id="parents-corner" className="py-20 bg-[#071324] border-t border-[#1A2E4B] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0F243E] to-[#0A1A2F] border border-[#C59B27]/40 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C59B27]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-bold text-[#DFB75A] tracking-widest uppercase flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-[#C59B27]" />
                  Statutory Accreditation Checklist
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Parent Guidance Desk: How to Validate College Credentials
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Before confirming admission or depositing fees, we empower parents with official
                  verification mechanisms. PARK Education never guides any student into colleges that
                  lack published government gazette notifications.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-[#071324]/80 rounded-xl border border-slate-700/60">
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <Stethoscope className="w-3.5 h-3.5 text-[#DFB75A]" />
                      NMC &amp; State Medical Councils
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Always cross-verify MBBS seat seat-intake quotas on nmc.org.in.
                    </p>
                  </div>

                  <div className="p-3 bg-[#071324]/80 rounded-xl border border-slate-700/60">
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <HeartHandshake className="w-3.5 h-3.5 text-[#DFB75A]" />
                      Indian Nursing Council (INC)
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Validate active suitability list status and hospital bed-strength.
                    </p>
                  </div>

                  <div className="p-3 bg-[#071324]/80 rounded-xl border border-slate-700/60">
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <FlaskConical className="w-3.5 h-3.5 text-[#DFB75A]" />
                      Pharmacy Council of India (PCI)
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Ensure current academic year sanction for B.Pharm and Pharm.D programs.
                    </p>
                  </div>

                  <div className="p-3 bg-[#071324]/80 rounded-xl border border-slate-700/60">
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <Scale className="w-3.5 h-3.5 text-[#DFB75A]" />
                      Bar Council of India (BCI)
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Confirm active BCI enrollment rights for 5-Year and 3-Year law degrees.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 text-center lg:text-right">
                <div className="p-6 rounded-2xl bg-[#071324] border border-[#C59B27]/40 space-y-4">
                  <div className="text-center">
                    <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                      Parent Helpline
                    </span>
                    <div className="text-lg font-serif font-bold text-white mt-1">
                      Personal Family Counseling
                    </div>
                    <p className="text-xs text-slate-300 mt-2">
                      Have questions regarding hostel security, fee installments, or recognition?
                    </p>
                  </div>

                  <button
                    onClick={() => setEnquiryModalOpen(true)}
                    className="w-full bg-[#C59B27] hover:bg-[#DFB75A] text-[#071324] font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition"
                  >
                    Request Free Call With Director
                  </button>

                  <div className="text-[11px] text-slate-400 text-center">
                    No charge for initial accreditation verification
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-20 bg-[#0A1A2F] border-t border-[#1A2E4B] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#DFB75A]">
              <HelpCircle className="w-4 h-4 text-[#C59B27]" />
              Authentic Answers
            </div>
            <h2 className="text-3xl font-serif font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-300 text-sm">
              Honest, transparent guidance regarding admission pathways and institutional norms.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#0F243E] border border-[#1A2E4B] overflow-hidden transition"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif text-sm sm:text-base font-semibold text-white hover:text-[#DFB75A] transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C59B27] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- ADMISSION ENQUIRY & COUNSELLING FORM --- */}
      <section id="enquiry" className="py-20 bg-[#071324] border-t border-[#1A2E4B] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#DFB75A]">
              <Send className="w-4 h-4 text-[#C59B27]" />
              Official Advisory Desk
            </div>
            <h2 className="text-3xl font-serif font-bold text-white">
              Schedule Your Admission Guidance Session
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              Submit the student profile below. A senior PARK Education counselor will contact you
              with verified options, eligibility requirements, and fee schedules.
            </p>
          </div>

          <div className="bg-[#0F243E] border border-[#C59B27]/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {formSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Guidance Request Received
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you, <span className="text-[#DFB75A] font-semibold">{formData.studentName}</span>. Your enquiry for <span className="text-white font-semibold">{formData.courseInterest}</span> has been logged under reference #{Math.floor(100000 + Math.random() * 900000)}.
                </p>
                <p className="text-xs text-slate-400">
                  Our chief academic coordinator will contact your mobile ({formData.mobileNumber}) during your preferred slot.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => triggerDirectWhatsApp(formData.courseInterest)}
                    className="w-full sm:w-auto bg-[#25D366] text-[#071324] font-bold text-xs uppercase px-6 py-3 rounded-xl flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" /> Direct WhatsApp Fast-Track
                  </button>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        studentName: '',
                        mobileNumber: '',
                        email: '',
                        courseInterest: 'Medicine',
                        studyDestination: 'South India (TN/KA/KL)',
                        currentQualification: '12th Standard (Appeared/Completed)',
                        preferredTime: 'Morning (10:00 AM - 1:00 PM)',
                        consent: false
                      });
                    }}
                    className="text-xs text-slate-400 hover:text-white underline"
                  >
                    Submit Another Profile
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {formError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 font-medium flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Student Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Student Full Name <span className="text-[#DFB75A]">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={formData.studentName}
                        onChange={(e) =>
                          setFormData({ ...formData, studentName: e.target.value })
                        }
                        placeholder="e.g. Rahul Sundaram"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#071324] border border-[#1A2E4B] text-sm text-white focus:outline-none focus:border-[#C59B27] transition"
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Mobile Number (WhatsApp Enabled) <span className="text-[#DFB75A]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={formData.mobileNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            mobileNumber: e.target.value.replace(/\D/g, '')
                          })
                        }
                        placeholder="10-digit mobile number"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#071324] border border-[#1A2E4B] text-sm text-white focus:outline-none focus:border-[#C59B27] transition"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Email Address (For Fee Breakdown)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="student@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#071324] border border-[#1A2E4B] text-sm text-white focus:outline-none focus:border-[#C59B27] transition"
                      />
                    </div>
                  </div>

                  {/* Preferred Course Vertical (All 10 Included) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Preferred Programme Vertical <span className="text-[#DFB75A]">*</span>
                    </label>
                    <select
                      value={formData.courseInterest}
                      onChange={(e) =>
                        setFormData({ ...formData, courseInterest: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#071324] border border-[#1A2E4B] text-sm text-white focus:outline-none focus:border-[#C59B27] transition"
                    >
                      {COURSE_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title} ({c.tag})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Study Destination */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Preferred Study Geography
                    </label>
                    <select
                      value={formData.studyDestination}
                      onChange={(e) =>
                        setFormData({ ...formData, studyDestination: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#071324] border border-[#1A2E4B] text-sm text-white focus:outline-none focus:border-[#C59B27] transition"
                    >
                      <option value="Tamil Nadu">Tamil Nadu (Chennai / Coimbatore / Madurai)</option>
                      <option value="Karnataka">Karnataka (Bangalore / Mangalore / Mysore)</option>
                      <option value="Kerala">Kerala (Kochi / Trivandrum)</option>
                      <option value="Pan-India Premier Hubs">Pan-India Premier Universities</option>
                      <option value="International Medical (WHO Listed)">International Medical Pathways</option>
                    </select>
                  </div>

                  {/* Current Qualification */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Current Academic Status
                    </label>
                    <select
                      value={formData.currentQualification}
                      onChange={(e) =>
                        setFormData({ ...formData, currentQualification: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#071324] border border-[#1A2E4B] text-sm text-white focus:outline-none focus:border-[#C59B27] transition"
                    >
                      <option value="12th Standard (Awaiting Results)">12th Standard (Appearing / Awaiting Results)</option>
                      <option value="12th Completed with Science">12th Completed (PCB / PCM)</option>
                      <option value="12th Completed with Commerce/Arts">12th Completed (Commerce / Arts)</option>
                      <option value="Graduation Completed">Undergraduate Degree Completed</option>
                      <option value="NEET/Entrance Aspirant">NEET / Entrance Appeared</option>
                    </select>
                  </div>
                </div>

                {/* Consultation Slot Preference */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Preferred Counseling Time Slot
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    {[
                      'Morning (10 AM - 1 PM)',
                      'Afternoon (2 PM - 5 PM)',
                      'Evening (5 PM - 8 PM)'
                    ].map((slot) => (
                      <label
                        key={slot}
                        className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition ${
                          formData.preferredTime === slot
                            ? 'bg-[#C59B27]/15 border-[#C59B27] text-white font-semibold'
                            : 'bg-[#071324] border-[#1A2E4B] text-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="timeSlot"
                          checked={formData.preferredTime === slot}
                          onChange={() => setFormData({ ...formData, preferredTime: slot })}
                          className="accent-[#C59B27]"
                        />
                        <span>{slot}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) =>
                        setFormData({ ...formData, consent: e.target.checked })
                      }
                      className="w-4 h-4 rounded border-slate-700 accent-[#C59B27] mt-0.5"
                    />
                    <span>
                      I authorize PARK Education counselors to contact me via Call or WhatsApp regarding
                      genuine course eligibility, fee schedules, and council regulations. I understand PARK
                      Education does not solicit illegal donations.
                    </span>
                  </label>
                </div>

                {/* Submit Action Buttons */}
                <div className="pt-3 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full sm:w-auto flex-1 bg-gradient-to-r from-[#C59B27] via-[#DFB75A] to-[#C59B27] text-[#071324] font-bold text-sm tracking-wide py-4 px-8 rounded-xl shadow-lg hover:brightness-105 active:scale-95 transition flex items-center justify-center gap-2"
                  >
                    {formSubmitting ? (
                      <span>Verifying &amp; Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Admission Profile for Review</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => triggerDirectWhatsApp(formData.courseInterest)}
                    className="w-full sm:w-auto bg-[#071324] hover:bg-[#050D19] border border-slate-700 text-[#25D366] text-xs font-bold py-4 px-6 rounded-xl transition flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Instant WhatsApp Connect</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* --- COURSE DETAIL MODAL (INSPECT PATHWAY) --- */}
      {selectedCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0F243E] border border-[#C59B27]/50 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-left">
            <button
              onClick={() => setSelectedCourseModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-[#071324] border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#DFB75A] tracking-wider mb-2">
              <BadgeCheck className="w-4 h-4 text-[#C59B27]" />
              {selectedCourseModal.regulatoryBody}
            </div>

            <h3 className="font-serif text-2xl font-bold text-white">
              {selectedCourseModal.title}
            </h3>
            <p className="text-xs text-[#C59B27] font-semibold mt-0.5">
              Degree Framework: {selectedCourseModal.tag} &bull; Duration: {selectedCourseModal.duration}
            </p>

            <div className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedCourseModal.detailedOverview}
            </div>

            {/* Specialization Breakdown */}
            <div className="mt-5 space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Approved Specializations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedCourseModal.specializations.map((spec, idx) => (
                  <div
                    key={idx}
                    className="text-xs p-2.5 rounded-lg bg-[#071324] border border-[#1A2E4B] text-slate-200 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#DFB75A] flex-shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility & Career */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#071324] border border-slate-800">
                <span className="font-bold text-slate-300 block mb-1">Prescribed Eligibility</span>
                <span className="text-slate-400">{selectedCourseModal.eligibility}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#071324] border border-slate-800">
                <span className="font-bold text-slate-300 block mb-1">Accreditation Audit</span>
                <span className="text-emerald-400 font-semibold">{selectedCourseModal.regulatoryBody}</span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#1A2E4B] flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => {
                  const courseTitle = selectedCourseModal.title;
                  setSelectedCourseModal(null);
                  setFormData((prev) => ({ ...prev, courseInterest: courseTitle }));
                  scrollToSection('enquiry');
                }}
                className="w-full sm:w-auto bg-[#C59B27] hover:bg-[#DFB75A] text-[#071324] font-bold text-xs uppercase px-6 py-3 rounded-xl transition"
              >
                Apply for {selectedCourseModal.title} Guidance
              </button>

              <button
                onClick={() => triggerDirectWhatsApp(selectedCourseModal.title)}
                className="w-full sm:w-auto text-[#25D366] text-xs font-bold flex items-center justify-center gap-1.5 p-2"
              >
                <MessageSquare className="w-4 h-4" /> Ask via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- QUICK ENQUIRY POPUP MODAL --- */}
      {enquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#0F243E] border border-[#C59B27]/60 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-left">
            <button
              onClick={() => setEnquiryModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-[#071324]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#DFB75A] tracking-wider mb-2">
              <Award className="w-4 h-4 text-[#C59B27]" />
              Direct Admission Desk
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Instant Advisory Request
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              PARK Education &bull; 18 Years of Authentic Counsel (Est. 2008)
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Candidate Name
                </label>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071324] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#C59B27]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Contact Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder="10-digit number"
                  maxLength={10}
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, '') })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071324] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#C59B27]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Desired Course Vertical
                </label>
                <select
                  value={formData.courseInterest}
                  onChange={(e) => setFormData({ ...formData, courseInterest: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071324] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#C59B27]"
                >
                  {COURSE_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    if (!formData.studentName || formData.mobileNumber.length !== 10) {
                      alert('Please provide your name and 10-digit mobile number.');
                      return;
                    }
                    setEnquiryModalOpen(false);
                    triggerDirectWhatsApp(formData.courseInterest);
                  }}
                  className="w-full bg-[#25D366] text-[#071324] font-bold text-xs uppercase py-3.5 rounded-xl flex items-center justify-center gap-2 shadow"
                >
                  <MessageSquare className="w-4 h-4" /> Connect with Counselor on WhatsApp
                </button>

                <button
                  onClick={() => {
                    setEnquiryModalOpen(false);
                    scrollToSection('enquiry');
                  }}
                  className="w-full bg-[#1A2E4B] hover:bg-[#23456F] text-slate-200 text-xs font-semibold py-2.5 rounded-xl transition"
                >
                  Open Detailed Consultation Form
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- STICKY CONTACT ACTION DOCK --- */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
        <a
          href="tel:+919443210000"
          className="hidden md:flex items-center gap-2 bg-[#0F243E] border border-[#C59B27]/50 text-[#DFB75A] px-4 py-3 rounded-full shadow-2xl hover:bg-[#153256] transition text-xs font-bold"
        >
          <PhoneCall className="w-4 h-4 text-[#C59B27]" />
          <span>Call Desk: +91 94432 10000</span>
        </a>

        <button
          onClick={() => triggerDirectWhatsApp()}
          className="bg-[#25D366] text-[#071324] p-3.5 md:px-5 md:py-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 font-bold text-xs"
          title="Direct WhatsApp Guidance"
        >
          <MessageSquare className="w-5 h-5 text-[#071324]" />
          <span className="hidden md:inline">WhatsApp Enquiry</span>
        </button>
      </div>

      {/* --- INSTITUTIONAL FOOTER --- */}
      <footer className="bg-[#050D19] border-t border-[#1A2E4B] pt-16 pb-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1A2E4B]">
            {/* Col 1 & 2: Brand & Exact Logo Lockup */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#102A4C] border border-[#C59B27] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-[#DFB75A]" />
                </div>
                <div>
                  <div className="font-serif text-xl font-bold text-white tracking-tight">
                    PARK EDUCATION
                  </div>
                  <div className="text-[10px] text-[#DFB75A] uppercase tracking-widest font-bold">
                    18 Years of Excellence &bull; Since 2008
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Established in 2008. PARK Education is a premier higher education consultancy advising
                students and parents on authorized pathways across Medicine, Engineering, Nursing,
                Pharmacy, Law, Paramedical and Allied Health disciplines.
              </p>

              <div className="pt-2 text-[11px] text-[#DFB75A] font-semibold space-y-1">
                <div>&bull; Celebrating 18 Years (2008 &ndash; 2026)</div>
                <div>&bull; 100% Ethical Advisory &bull; Direct University Verification</div>
              </div>
            </div>

            {/* Col 3: Disciplines */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Disciplines
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection('courses')}
                    className="hover:text-[#DFB75A] transition"
                  >
                    Medicine (MBBS/MD)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('courses')}
                    className="hover:text-[#DFB75A] transition"
                  >
                    Engineering &amp; AI
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('courses')}
                    className="hover:text-[#DFB75A] transition"
                  >
                    B.Sc / M.Sc Nursing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('courses')}
                    className="hover:text-[#DFB75A] transition"
                  >
                    Law &amp; Jurisprudence
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('courses')}
                    className="hover:text-[#DFB75A] transition"
                  >
                    Allied Health Sciences
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('courses')}
                    className="hover:text-[#DFB75A] transition"
                  >
                    Bachelor of Physiotherapy (BPT)
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Quick Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Navigation
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection('legacy')}
                    className="hover:text-[#DFB75A] transition"
                  >
                    18-Year Legacy Timeline
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('why-park')}
                    className="hover:text-[#DFB75A] transition"
                  >
                    Why Choose PARK
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('process')}
                    className="hover:text-[#DFB75A] transition"
                  >
                    5-Step Admission Guide
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('parents-corner')}
                    className="hover:text-[#DFB75A] transition"
                  >
                    Parents Advisory Desk
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('faq')}
                    className="hover:text-[#DFB75A] transition"
                  >
                    Accreditation FAQ
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 5: Contact Desk */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Advisory Desk
              </h4>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#C59B27] flex-shrink-0 mt-0.5" />
                  <span>Administrative Advisory Center, South India Hub &bull; Established 2008</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C59B27] flex-shrink-0" />
                  <a href="tel:+919443210000" className="hover:text-white">
                    +91 94432 10000 / 0462 2500000
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#C59B27] flex-shrink-0" />
                  <a href="mailto:admissions@parkeducation.in" className="hover:text-white">
                    admissions@parkeducation.in
                  </a>
                </div>
                <div className="pt-2">
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Office Hours: Mon&ndash;Sat, 9:30 AM &ndash; 6:30 PM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer & Statutory Notice */}
          <div className="pt-8 text-[11px] text-slate-400 space-y-3 leading-relaxed">
            <p>
              <strong className="text-slate-300">Statutory Advisory Note:</strong> PARK Education is an independent education consultancy established in 2008. We provide counseling, eligibility vetting, and college identification services. PARK Education does not conduct independent examinations, does not award university degrees, and does not demand unauthorized capitation fees. Final admissions are subject to candidate eligibility and official university/council approval (NMC / INC / PCI / BCI / AICTE / UGC).
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800 text-slate-400 text-xs">
              <div>
                &copy; 2008 &ndash; {CURRENT_YEAR} PARK Education. All rights reserved. Celebrating {ANNIVERSARY_YEARS} Years of Excellence.
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="hover:text-slate-200 cursor-pointer">Ethical Code of Conduct</span>
                <span>&bull;</span>
                <span className="hover:text-slate-200 cursor-pointer">Verification Guarantee</span>
                <span>&bull;</span>
                <span className="hover:text-slate-200 cursor-pointer">Privacy &amp; Data Security</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}