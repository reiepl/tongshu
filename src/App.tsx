//import React, { useState } from 'react';
import { useState } from 'react';
// @ts-ignore
import { Solar } from 'lunar-javascript';
import './App.css'; 

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const todayObj = new Date();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => setCurrentDate(new Date());

  const renderDays = () => {
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="empty-cell"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${month + 1}-${day}`;
      const isWeekend = new Date(year, month, day).getDay() === 0 || new Date(year, month, day).getDay() === 6;
      const isToday = year === todayObj.getFullYear() && month === todayObj.getMonth() && day === todayObj.getDate();
      
      const solar = Solar.fromYmd(year, month + 1, day);
      const lunar = solar.getLunar();
      
      const dailyGanZhi = lunar.getDayInGanZhi();
      const monthlyGanZhi = lunar.getMonthInGanZhiExact(); 
      
      // -- NEW: Fetch the 12 Day Officer --
      const dayOfficer = lunar.getZhiXing(); 
      
      let lunarDisplay = lunar.getDayInChinese();
      let isHighlight = false;
      let highlightColor = '#64748b'; 

      const festivals = lunar.getFestivals();
      const jieQi = lunar.getJieQi();
      const isFirstDayOfLunarMonth = lunar.getDay() === 1;

      if (festivals.length > 0) {
        lunarDisplay = festivals[0];
        isHighlight = true;
        highlightColor = '#ef4444'; 
      } else if (jieQi) {
        lunarDisplay = jieQi;
        isHighlight = true;
        highlightColor = '#059669'; 
      } else if (isFirstDayOfLunarMonth) {
        lunarDisplay = `${lunar.getMonthInChinese()}月`;
        isHighlight = true;
        highlightColor = '#d97706'; 
      }

      days.push(
        <div key={dateStr} className={`day-cell ${isWeekend ? 'weekend' : ''} ${isToday ? 'today' : ''}`}>
          
          <div className="date-header">
            <span className="gregorian-date">{day}</span>
            <div className="ganzhi-group">
              <span className="ganzhi-text" title="Month Pillar">月: {monthlyGanZhi}</span>
              <span className="ganzhi-text" title="Day Pillar">日: {dailyGanZhi}</span>
            </div>
          </div>
          
          {/* NEW: Bottom row container to align Lunar Date and Officer Badge */}
          <div className="date-footer">
            <span 
              className="lunar-date" 
              style={{ 
                color: highlightColor, 
                fontWeight: isHighlight ? '600' : 'normal'
              }}
            >
              {lunarDisplay}
            </span>
            <span className="officer-tag" title="12 Day Officer">
              {dayOfficer}
            </span>
          </div>

        </div>
      );
    }
    return days;
  };

  return (
    if (showPrivacy) {
      return (
        <div className="app-wrapper">
           <button onClick={() => setShowPrivacy(false)} style={{ margin: '20px', padding: '8px 16px', cursor: 'pointer' }}>
             &larr; Back to Calendar
           </button>
           {/* Import your new component here */}
           <PrivacyPolicy /> 
        </div>
      )
    }
    <div className="app-wrapper">
      <div className="calendar-container">
        <header className="calendar-header">
          <button onClick={prevMonth}>◀</button>
          <div className="header-title">
              <h2 onClick={goToToday} style={{cursor: 'pointer'}} title="Return to Today">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
          </div>
          <button onClick={nextMonth}>▶</button>
        </header>

        <div className="weekdays-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>

        <div className="days-grid">
          {renderDays()}
        </div>
      </div>

      {/* NEW: SEO and AdSense "Thick Content" Section */}
      <section className="educational-content">
        <div className="content-card">
          <h3>Understanding the Modern Tong Shu</h3>
          <p>
            The Tong Shu (Chinese Almanac) is an ancient metaphysical tool used to calculate the energy of time. 
            By mapping the precise transitions of the 24 Solar Terms (Jie Qi), this daily calendar calculates the exact 
            Heavenly Stems and Earthly Branches governing each day, month, and year.
          </p>
          
          <h3>The 12 Day Officers (Jian Chu 12 Shen)</h3>
          <p>
            A core feature of this calendar is the plotting of the 12 Day Officers (建除十二神). These officers dictate the specific 
            actionable energy of a given day. By anchoring the calculation to the exact exact minute the Solar Term transitions, 
            practitioners can accurately identify days for establishing new ventures (建), seeking stability (定), or avoiding hazards (危).
          </p>
        </div>
      </section>

      {/* NEW: Mandatory AdSense Footer */}
      const [showPrivacy, setShowPrivacy] = useState(false);
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} DailyQi. All rights reserved.</p>
        <div className="footer-links">
          <button 
            onClick={() => setShowPrivacy(true)} 
            className="footer-link" 
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            Privacy Policy
          </button>
        </div>
      </footer>

    </div>
  );
};

export default App;