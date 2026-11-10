import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  Flame, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft,
  CalendarDays,
  UtensilsCrossed
} from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ReservationData {
  id: string;
  partySize: number;
  date: string;
  time: string;
  seatingArea: string;
  fullName: string;
  email: string;
  phone: string;
  occasion: string;
  specialRequests: string;
  createdAt: string;
}

const TIME_SLOTS = [
  { time: '5:00 PM', type: 'Early Dinner' },
  { time: '5:45 PM', type: 'Early Dinner' },
  { time: '6:30 PM', type: 'Prime Dinner' },
  { time: '7:15 PM', type: 'Prime Dinner' },
  { time: '8:00 PM', type: 'Prime Dinner' },
  { time: '8:45 PM', type: 'Late Seating' },
  { time: '9:30 PM', type: 'Late Seating' },
];

const SEATING_AREAS = [
  {
    id: 'hearth',
    name: 'Main Hearth Room',
    desc: 'Surrounded by ambient warmth and open brick fire',
  },
  {
    id: 'chef',
    name: "Chef's Counter",
    desc: 'Direct view of live ember grills and kitchen artistry',
  },
  {
    id: 'courtyard',
    name: 'Veranda & Courtyard',
    desc: 'Intimate candlelit seating under open night skies',
  },
];

const OCCASIONS = [
  'Casual Dining',
  'Birthday',
  'Anniversary',
  'Date Night',
  'Business Dinner',
  'Special Celebration',
];

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  // Booking state
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1 = Table & Time, 2 = Guest Info, 3 = Confirmed
  const [partySize, setPartySize] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    // Default to tomorrow or today's date formatted as YYYY-MM-DD
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState<string>('7:15 PM');
  const [seatingArea, setSeatingArea] = useState<string>('Main Hearth Room');

  // Guest details state
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('Casual Dining');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Active / Confirmed booking
  const [confirmedBooking, setConfirmedBooking] = useState<ReservationData | null>(null);
  const [existingBookings, setExistingBookings] = useState<ReservationData[]>([]);
  const [viewingExisting, setViewingExisting] = useState<boolean>(false);

  // Load existing bookings on mount or open
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ember_salt_reservations');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setExistingBookings(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, [isOpen]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  // Validate step 2 inputs
  const validateGuestDetails = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Please enter your name.';
    if (!email.trim()) {
      newErrors.email = 'Please enter an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please provide a valid email.';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Please provide a contact number.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitReservation = (e: FormEvent) => {
    e.preventDefault();
    if (!validateGuestDetails()) return;

    // Create reservation record
    const refId = `ES-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: ReservationData = {
      id: refId,
      partySize,
      date: selectedDate,
      time: selectedTime,
      seatingArea,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      occasion,
      specialRequests: specialRequests.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      const updated = [newBooking, ...existingBookings];
      setExistingBookings(updated);
      localStorage.setItem('ember_salt_reservations', JSON.stringify(updated));
    } catch {
      // Local storage fallback
    }

    setConfirmedBooking(newBooking);
    setStep(3);
  };

  const handleDownloadCalendar = (booking: ReservationData) => {
    // Generate .ics calendar file
    const dateFormatted = booking.date.replace(/-/g, '');
    const startTimeParts = booking.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
    let hour = 19;
    let min = 0;
    if (startTimeParts) {
      hour = parseInt(startTimeParts[1], 10);
      if (startTimeParts[3].toUpperCase() === 'PM' && hour !== 12) hour += 12;
      if (startTimeParts[3].toUpperCase() === 'AM' && hour === 12) hour = 0;
      min = parseInt(startTimeParts[2], 10);
    }
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const dtStart = `${dateFormatted}T${pad(hour)}${pad(min)}00`;
    const dtEnd = `${dateFormatted}T${pad(hour + 2)}${pad(min)}00`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Ember & Salt//Reservation//EN',
      'BEGIN:VEVENT',
      `UID:${booking.id}@emberandsalt.com`,
      `DTSTAMP:${dtStart}Z`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      'SUMMARY:Dinner at Ember & Salt',
      `DESCRIPTION:Reservation Reference: ${booking.id}\\nParty Size: ${booking.partySize} Guests\\nSeating: ${booking.seatingArea}\\nGuest: ${booking.fullName}`,
      'LOCATION:Ember & Salt, 24 Ember Lane',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Ember-Salt-Reservation-${booking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetForNew = () => {
    setStep(1);
    setConfirmedBooking(null);
    setViewingExisting(false);
  };

  const handleCancelBooking = (id: string) => {
    const updated = existingBookings.filter((b) => b.id !== id);
    setExistingBookings(updated);
    try {
      localStorage.setItem('ember_salt_reservations', JSON.stringify(updated));
    } catch {
      // ignore
    }
    if (confirmedBooking?.id === id) {
      setConfirmedBooking(null);
      setStep(1);
    }
  };

  // Helper date display
  const formatDateDisplay = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return d.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      }
    } catch {
      return dateStr;
    }
    return dateStr;
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#141414] border border-white/10 rounded-none shadow-2xl overflow-hidden my-auto z-10 text-cream max-h-[92vh] flex flex-col"
          >
            {/* Top decorative ember bar */}
            <div className="h-1 w-full bg-gradient-to-r from-burnt-orange via-muted-gold to-burnt-orange" />

            {/* Header */}
            <div className="p-6 md:p-8 pb-4 flex items-start justify-between border-b border-white/5 relative">
              <div>
                <div className="flex items-center space-x-2 text-burnt-orange mb-1">
                  <Flame size={16} className="animate-pulse" />
                  <span className="font-sans text-xs tracking-[0.25em] uppercase text-muted-gold">
                    Table Reservation
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl text-cream tracking-wide">
                  Ember & Salt
                </h3>
                <p className="font-sans text-xs text-cream/60 tracking-wider mt-1 font-light">
                  Open-fire dining & communal hospitality.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                {existingBookings.length > 0 && step !== 3 && (
                  <button
                    type="button"
                    onClick={() => setViewingExisting(!viewingExisting)}
                    className="text-xs uppercase tracking-widest text-muted-gold hover:text-burnt-orange px-3 py-1.5 border border-white/10 transition-colors mr-2"
                  >
                    {viewingExisting ? 'Book Table' : `My Bookings (${existingBookings.length})`}
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close reservation form"
                  className="w-10 h-10 border border-white/10 hover:border-burnt-orange hover:text-burnt-orange flex items-center justify-center transition-colors text-cream/70"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body / Scrollable Area */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
              {viewingExisting ? (
                /* Existing Bookings List */
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-2xl text-cream">Your Active Reservations</h4>
                    <button
                      onClick={() => setViewingExisting(false)}
                      className="text-xs font-sans uppercase tracking-widest text-burnt-orange hover:underline"
                    >
                      + Make New Reservation
                    </button>
                  </div>

                  <div className="space-y-4">
                    {existingBookings.map((b) => (
                      <div
                        key={b.id}
                        className="bg-charcoal/80 border border-white/10 p-5 flex flex-col md:flex-row justify-between md:items-center gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center space-x-3">
                            <span className="text-burnt-orange font-mono text-sm tracking-wider font-semibold">
                              {b.id}
                            </span>
                            <span className="text-xs bg-white/5 px-2 py-0.5 text-muted-gold uppercase tracking-wider">
                              {b.seatingArea}
                            </span>
                          </div>
                          <div className="font-serif text-xl text-cream">
                            {formatDateDisplay(b.date)} at {b.time}
                          </div>
                          <div className="text-xs text-cream/60 font-sans">
                            Party of {b.partySize} guests • {b.fullName}
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                          <button
                            type="button"
                            onClick={() => handleDownloadCalendar(b)}
                            className="text-xs font-sans tracking-wider uppercase border border-white/15 px-3 py-2 hover:border-muted-gold hover:text-muted-gold transition-colors flex items-center space-x-1.5"
                          >
                            <CalendarDays size={13} />
                            <span>Calendar</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCancelBooking(b.id)}
                            className="text-xs font-sans tracking-wider uppercase text-red-400/80 hover:text-red-400 px-2 py-2 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : step === 3 && confirmedBooking ? (
                /* Step 3: Confirmation */
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-burnt-orange/15 border border-burnt-orange/40 text-burnt-orange flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-[0.25em] text-muted-gold font-sans">
                      Table Confirmed
                    </span>
                    <h4 className="font-serif text-3xl md:text-4xl text-cream mt-1 mb-2">
                      We Look Forward to Welcoming You
                    </h4>
                    <p className="text-sm font-sans text-cream/70 max-w-md mx-auto font-light">
                      A confirmation has been sent to{' '}
                      <span className="text-cream font-medium">{confirmedBooking.email}</span>.
                    </p>
                  </div>

                  {/* Summary ticket card */}
                  <div className="bg-charcoal border border-white/10 p-6 text-left max-w-lg mx-auto space-y-4 relative">
                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                      <div>
                        <span className="text-[11px] tracking-widest uppercase text-white/40 block">
                          Booking Reference
                        </span>
                        <span className="font-mono text-lg text-burnt-orange tracking-widest font-semibold">
                          {confirmedBooking.id}
                        </span>
                      </div>
                      <span className="text-xs font-sans uppercase tracking-widest bg-burnt-orange/20 text-burnt-orange px-2.5 py-1">
                        Confirmed
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm font-sans pt-1">
                      <div>
                        <span className="text-white/40 text-xs block mb-1">Date</span>
                        <span className="text-cream font-medium">
                          {formatDateDisplay(confirmedBooking.date)}
                        </span>
                      </div>
                      <div>
                        <span className="text-white/40 text-xs block mb-1">Time</span>
                        <span className="text-cream font-medium">{confirmedBooking.time}</span>
                      </div>
                      <div>
                        <span className="text-white/40 text-xs block mb-1">Party Size</span>
                        <span className="text-cream font-medium">
                          {confirmedBooking.partySize} {confirmedBooking.partySize === 1 ? 'Guest' : 'Guests'}
                        </span>
                      </div>
                      <div>
                        <span className="text-white/40 text-xs block mb-1">Seating Area</span>
                        <span className="text-cream font-medium">{confirmedBooking.seatingArea}</span>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-3 text-xs text-cream/60 flex items-center justify-between">
                      <span>Guest: {confirmedBooking.fullName}</span>
                      <span>{confirmedBooking.phone}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => handleDownloadCalendar(confirmedBooking)}
                      className="w-full sm:w-auto border border-burnt-orange/50 hover:border-burnt-orange text-cream px-6 py-3.5 text-xs uppercase tracking-widest font-sans transition-colors flex items-center justify-center space-x-2"
                    >
                      <CalendarDays size={14} className="text-burnt-orange" />
                      <span>Add to Calendar (.ics)</span>
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full sm:w-auto bg-burnt-orange hover:bg-ember-red text-cream px-8 py-3.5 text-xs uppercase tracking-widest font-sans transition-colors"
                    >
                      Close & Finish
                    </button>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleResetForNew}
                      className="text-xs font-sans text-white/50 hover:text-white uppercase tracking-wider transition-colors"
                    >
                      Book Another Date
                    </button>
                  </div>
                </motion.div>
              ) : step === 1 ? (
                /* Step 1: Table & Timing */
                <div className="space-y-6">
                  {/* Party Size Selector */}
                  <div>
                    <label className="flex items-center space-x-2 text-xs font-sans uppercase tracking-widest text-muted-gold mb-3">
                      <Users size={14} />
                      <span>Number of Guests</span>
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setPartySize(num)}
                          className={`py-3 text-sm font-sans transition-all duration-200 border ${
                            partySize === num
                              ? 'bg-burnt-orange text-cream border-burnt-orange font-medium'
                              : 'bg-white/5 hover:bg-white/10 text-cream/80 border-white/10'
                          }`}
                        >
                          {num} {num === 8 ? '+' : ''}
                        </button>
                      ))}
                    </div>
                    {partySize >= 7 && (
                      <p className="text-[11px] text-muted-gold/80 mt-2 italic font-sans">
                        For parties larger than 8, our private fire room is reserved. Tasting menu will apply.
                      </p>
                    )}
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="flex items-center space-x-2 text-xs font-sans uppercase tracking-widest text-muted-gold mb-3">
                      <Calendar size={14} />
                      <span>Date</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        min={todayStr}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/15 px-4 py-3.5 text-sm font-sans text-cream focus:outline-none focus:border-burnt-orange transition-colors cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Seating Times */}
                  <div>
                    <label className="flex items-center space-x-2 text-xs font-sans uppercase tracking-widest text-muted-gold mb-3">
                      <Clock size={14} />
                      <span>Available Seating Times</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => setSelectedTime(slot.time)}
                          className={`p-3 text-left border transition-all duration-200 ${
                            selectedTime === slot.time
                              ? 'bg-burnt-orange text-cream border-burnt-orange'
                              : 'bg-white/5 hover:bg-white/10 border-white/10 text-cream/80'
                          }`}
                        >
                          <div className="font-serif text-lg leading-tight">{slot.time}</div>
                          <div className="text-[10px] tracking-wider uppercase opacity-75 mt-0.5">
                            {slot.type}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Seating Preference */}
                  <div>
                    <label className="flex items-center space-x-2 text-xs font-sans uppercase tracking-widest text-muted-gold mb-3">
                      <UtensilsCrossed size={14} />
                      <span>Seating Preference</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {SEATING_AREAS.map((area) => (
                        <button
                          key={area.id}
                          type="button"
                          onClick={() => setSeatingArea(area.name)}
                          className={`p-4 text-left border transition-all duration-200 flex flex-col justify-between ${
                            seatingArea === area.name
                              ? 'bg-burnt-orange/15 border-burnt-orange text-cream ring-1 ring-burnt-orange'
                              : 'bg-white/5 hover:bg-white/10 border-white/10 text-cream/70'
                          }`}
                        >
                          <div>
                            <span className="font-serif text-lg text-cream block mb-1">
                              {area.name}
                            </span>
                            <span className="text-[11px] font-sans text-cream/60 leading-relaxed block">
                              {area.desc}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Step 2: Guest Details Form */
                <form id="reservation-guest-form" onSubmit={handleSubmitReservation} className="space-y-5">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center space-x-1.5 text-xs uppercase tracking-widest text-muted-gold hover:text-burnt-orange transition-colors"
                    >
                      <ArrowLeft size={14} />
                      <span>Back to Time & Date</span>
                    </button>
                    <span className="text-xs font-sans text-cream/60">
                      {partySize} Guests • {formatDateDisplay(selectedDate)} at {selectedTime}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-cream/70 font-sans mb-1.5">
                        Full Name <span className="text-burnt-orange">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Julian Montgomery"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors({ ...errors, fullName: '' });
                        }}
                        className={`w-full bg-white/5 border ${
                          errors.fullName ? 'border-red-500' : 'border-white/15'
                        } px-4 py-3 text-sm font-sans text-cream focus:outline-none focus:border-burnt-orange transition-colors`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-red-400 mt-1 font-sans">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-cream/70 font-sans mb-1.5">
                        Email Address <span className="text-burnt-orange">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. julian@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        className={`w-full bg-white/5 border ${
                          errors.email ? 'border-red-500' : 'border-white/15'
                        } px-4 py-3 text-sm font-sans text-cream focus:outline-none focus:border-burnt-orange transition-colors`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-400 mt-1 font-sans">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-cream/70 font-sans mb-1.5">
                        Phone Number <span className="text-burnt-orange">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        className={`w-full bg-white/5 border ${
                          errors.phone ? 'border-red-500' : 'border-white/15'
                        } px-4 py-3 text-sm font-sans text-cream focus:outline-none focus:border-burnt-orange transition-colors`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-red-400 mt-1 font-sans">{errors.phone}</p>
                      )}
                    </div>

                    {/* Occasion */}
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-cream/70 font-sans mb-1.5">
                        Occasion
                      </label>
                      <select
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="w-full bg-[#1c1c1c] border border-white/15 px-4 py-3 text-sm font-sans text-cream focus:outline-none focus:border-burnt-orange transition-colors cursor-pointer"
                      >
                        {OCCASIONS.map((occ) => (
                          <option key={occ} value={occ} className="bg-[#1c1c1c] text-cream">
                            {occ}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-cream/70 font-sans mb-1.5">
                      Dietary Restrictions or Special Requests <span className="text-white/40 text-[10px]">(Optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Allergies, high chair request, anniversary toast, or seating notes..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 px-4 py-3 text-sm font-sans text-cream focus:outline-none focus:border-burnt-orange transition-colors resize-none"
                    />
                  </div>

                  <div className="bg-white/5 p-4 border border-white/5 text-xs text-cream/70 font-sans flex items-start space-x-3">
                    <Sparkles size={16} className="text-muted-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-cream">Cancellation Policy:</span> Reservations may be cancelled or rescheduled up to 4 hours in advance at no charge. We hold tables for 15 minutes past reservation time.
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Modal Footer Controls */}
            {step !== 3 && !viewingExisting && (
              <div className="p-6 md:p-8 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#121212]">
                <div className="hidden sm:block text-xs font-sans text-cream/60">
                  {step === 1 ? (
                    <span>
                      Selected: <strong className="text-cream">{partySize} Guests</strong> on{' '}
                      <strong className="text-cream">{formatDateDisplay(selectedDate)}</strong> at{' '}
                      <strong className="text-burnt-orange">{selectedTime}</strong>
                    </span>
                  ) : (
                    <span>Step 2 of 2: Guest Details</span>
                  )}
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                  {step === 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full sm:w-auto bg-burnt-orange hover:bg-ember-red text-cream px-8 py-3.5 text-xs uppercase tracking-widest font-sans transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Continue to Details</span>
                      <ChevronRight size={15} />
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="border border-white/15 hover:border-white text-cream px-5 py-3.5 text-xs uppercase tracking-widest font-sans transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        form="reservation-guest-form"
                        className="bg-burnt-orange hover:bg-ember-red text-cream px-8 py-3.5 text-xs uppercase tracking-widest font-sans transition-colors flex items-center justify-center space-x-2"
                      >
                        <span>Confirm Reservation</span>
                        <CheckCircle2 size={15} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
