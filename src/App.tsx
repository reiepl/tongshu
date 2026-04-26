//import React, { useState } from 'react';
import { Solar } from 'lunar-javascript';
import './App.css'; 

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showHV, setShowHV] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const todayObj = new Date();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => setCurrentDate(new Date());

  // Heavenly Virtue (天德) Logic based on 002.jpg
  const getHVTarget = (monthZhi) => {
    const hvMap = {
      '寅': '丁', '卯': '申', '辰': '壬', '巳': '辛',
      '午': '亥', '未': '甲', '申': '癸', '酉': '寅',
      '戌': '丙', '亥': '乙', '子': '巳', '丑': '庚'
    };
    return hvMap[monthZhi] || null;
  };

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
      const monthZhi = lunar.getMonthZhiExact();
      const dayGan = lunar.getDayGan();
      const dayZhi = lunar.getDayZhi();

      // Check if Day is Heavenly Virtue
      const hvTarget = getHVTarget(monthZhi);
      const isHV = (dayGan === hvTarget || dayZhi === hvTarget);
      
      let lunarDisplay = lunar.getDayInChinese();
      let isHighlight = false;
      let highlightColor = '#64748b'; 

      const festivals = lunar.getFestivals();
      const jieQi = lunar.getJieQi();

      if (festivals.length > 0) {
        lunarDisplay = festivals[0];
        isHighlight = true;
        highlightColor = '#ef4444'; 
      } else if (jieQi) {
        lunarDisplay = jieQi;
        isHighlight = true;
        highlightColor = '#059669'; 
      } else if (lunar.getDay() === 1) {
        lunarDisplay = `${lunar.getMonthInChinese()}月`;
        isHighlight = true;
        highlightColor = '#d97706'; 
      }

      days.push(
        <div key={dateStr} className={`day-cell ${isWeekend ? 'weekend' : ''} ${isToday ? 'today' : ''}`}>
          <div className="date-header">
            <span className="gregorian-date">{day}</span>
            <div className="ganzhi-group">
              <span className="ganzhi-text">月: {monthlyGanZhi}</span>
              <span className="ganzhi-text">日: {dailyGanZhi}</span>
            </div>
          </div>
          
          <span className="lunar-date" style={{ color: highlightColor, fontWeight: isHighlight ? '600' : 'normal' }}>
            {lunarDisplay}
          </span>

          {showHV && isHV && (
            <div className="hv-tag">天德</div>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="app-wrapper">
      <div className="controls-bar">
        <label className="toggle-switch">
          <input 
            type="checkbox" 
            checked={showHV} 
            onChange={() => setShowHV(!showHV)} 
          />
          <span className="slider round"></span>
        </label>
        <span className="toggle-label">Show Heavenly Virtue (天德)</span>
      </div>

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
    </div>
  );
};

export default App;