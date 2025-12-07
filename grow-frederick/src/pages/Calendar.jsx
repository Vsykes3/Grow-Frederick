import React, { useState, useEffect } from 'react';
import Navbar from '@/components/ui/Navbar';
// import Footer from '../components/Footer'; // Footer component not found, commented out
import './Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    type: 'planting',
    priority: 'medium'
  });

  // Gardening tasks for different months
  const seasonalTasks = {
    0: [ // January
      { title: 'Plan garden layout', type: 'planning', priority: 'low' },
      { title: 'Order seeds', type: 'planning', priority: 'medium' },
      { title: 'Check garden tools', type: 'maintenance', priority: 'low' }
    ],
    1: [ // February
      { title: 'Start indoor seeds', type: 'planting', priority: 'high' },
      { title: 'Prepare seed starting mix', type: 'preparation', priority: 'medium' },
      { title: 'Clean greenhouse', type: 'maintenance', priority: 'medium' }
    ],
    2: [ // March
      { title: 'Plant cool weather crops', type: 'planting', priority: 'high' },
      { title: 'Apply early spring fertilizer', type: 'feeding', priority: 'medium' },
      { title: 'Prune fruit trees', type: 'maintenance', priority: 'high' }
    ],
    3: [ // April
      { title: 'Plant warm weather crops', type: 'planting', priority: 'high' },
      { title: 'Mulch garden beds', type: 'maintenance', priority: 'medium' },
      { title: 'Install trellises', type: 'preparation', priority: 'medium' }
    ],
    4: [ // May
      { title: 'Plant summer vegetables', type: 'planting', priority: 'high' },
      { title: 'Water regularly', type: 'maintenance', priority: 'high' },
      { title: 'Monitor for pests', type: 'monitoring', priority: 'medium' }
    ],
    5: [ // June
      { title: 'Harvest early crops', type: 'harvesting', priority: 'medium' },
      { title: 'Fertilize growing plants', type: 'feeding', priority: 'medium' },
      { title: 'Weed control', type: 'maintenance', priority: 'high' }
    ],
    6: [ // July
      { title: 'Harvest summer crops', type: 'harvesting', priority: 'high' },
      { title: 'Water deeply', type: 'maintenance', priority: 'high' },
      { title: 'Deadhead flowers', type: 'maintenance', priority: 'low' }
    ],
    7: [ // August
      { title: 'Plant fall crops', type: 'planting', priority: 'medium' },
      { title: 'Harvest and preserve', type: 'harvesting', priority: 'high' },
      { title: 'Prepare for fall', type: 'planning', priority: 'medium' }
    ],
    8: [ // September
      { title: 'Harvest fall vegetables', type: 'harvesting', priority: 'high' },
      { title: 'Plant cover crops', type: 'planting', priority: 'medium' },
      { title: 'Clean up garden', type: 'maintenance', priority: 'medium' }
    ],
    9: [ // October
      { title: 'Plant garlic and onions', type: 'planting', priority: 'medium' },
      { title: 'Rake leaves for compost', type: 'maintenance', priority: 'low' },
      { title: 'Protect tender plants', type: 'maintenance', priority: 'high' }
    ],
    10: [ // November
      { title: 'Clean garden tools', type: 'maintenance', priority: 'medium' },
      { title: 'Add compost to beds', type: 'feeding', priority: 'medium' },
      { title: 'Plan next year', type: 'planning', priority: 'low' }
    ],
    11: [ // December
      { title: 'Review garden journal', type: 'planning', priority: 'low' },
      { title: 'Order next year seeds', type: 'planning', priority: 'medium' },
      { title: 'Rest and plan', type: 'planning', priority: 'low' }
    ]
  };

  useEffect(() => {
    // Load seasonal tasks for current month
    const currentMonthTasks = seasonalTasks[currentMonth.getMonth()] || [];
    setTasks(currentMonthTasks);
  }, [currentMonth]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'next') {
        newMonth.setMonth(prev.getMonth() + 1);
      } else {
        newMonth.setMonth(prev.getMonth() - 1);
      }
      return newMonth;
    });
  };

  const getTaskTypeIcon = (type) => {
    const icons = {
      planting: 'ðŸŒ±',
      harvesting: 'ðŸŒ¾',
      maintenance: 'ðŸ”§',
      feeding: 'ðŸŒ¿',
      monitoring: 'ðŸ‘ï¸',
      planning: 'ðŸ“‹',
      preparation: 'âš™ï¸'
    };
    return icons[type] || 'ðŸ“';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: '#28a745',
      medium: '#ffc107',
      high: '#dc3545'
    };
    return colors[priority] || '#6c757d';
  };

  const addTask = () => {
    if (newTask.title.trim()) {
      const task = {
        ...newTask,
        id: Date.now(),
        date: selectedDate || new Date()
      };
      setTasks(prev => [...prev, task]);
      setNewTask({ title: '', description: '', type: 'planting', priority: 'medium' });
      setShowTaskModal(false);
    }
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      
      days.push(
        <div 
          key={day} 
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <span className="day-number">{day}</span>
          {isToday && <span className="today-indicator">Today</span>}
        </div>
      );
    }
    
    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="stack">
      <Navbar />
      
      <div className="calendar-container">
        <div className="calendar-header">
          <h1>Gardening Calendar</h1>
          <p>Plan your garden activities throughout the year</p>
        </div>

        <div className="calendar-main">
          {/* Calendar Navigation */}
          <div className="calendar-navigation">
            <button onClick={() => navigateMonth('prev')} className="nav-btn">
              â† Previous Month
            </button>
            <h2>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
            <button onClick={() => navigateMonth('next')} className="nav-btn">
              Next Month â†’
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="calendar-grid">
            <div className="calendar-weekdays">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div className="calendar-days">
              {renderCalendar()}
            </div>
          </div>

          {/* Task Management */}
          <div className="task-management">
            <div className="task-header">
              <h3>Garden Tasks</h3>
              <button 
                onClick={() => setShowTaskModal(true)}
                className="add-task-btn"
              >
                + Add Task
              </button>
            </div>
            
            <div className="tasks-list">
              {tasks.map(task => (
                <div key={task.id} className="task-item">
                  <div className="task-icon">
                    {getTaskTypeIcon(task.type)}
                  </div>
                  <div className="task-content">
                    <h4>{task.title}</h4>
                    {task.description && <p>{task.description}</p>}
                  </div>
                  <div className="task-priority" style={{ backgroundColor: getPriorityColor(task.priority) }}>
                    {task.priority}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Seasonal Tips */}
        <div className="seasonal-tips">
          <h3>Seasonal Gardening Tips</h3>
          <div className="tips-content">
            <div className="tip-card">
              <h4>ðŸŒ± Spring (March - May)</h4>
              <p>Focus on soil preparation, early planting, and pest prevention. Start seeds indoors for warm-weather crops.</p>
            </div>
            <div className="tip-card">
              <h4>â˜€ï¸ Summer (June - August)</h4>
              <p>Maintain consistent watering, monitor for pests and diseases, and harvest regularly to encourage continued production.</p>
            </div>
            <div className="tip-card">
              <h4>ðŸ‚ Fall (September - November)</h4>
              <p>Plant cool-weather crops, prepare garden for winter, and add compost to improve soil for next season.</p>
            </div>
            <div className="tip-card">
              <h4>â„ï¸ Winter (December - February)</h4>
              <p>Plan next year's garden, order seeds, maintain tools, and protect any overwintering plants.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showTaskModal && (
        <div className="modal-overlay" onClick={() => setShowTaskModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Add New Task</h3>
            <div className="form-group">
              <label>Task Title</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                placeholder="Enter task title"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                placeholder="Enter task description"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Type</label>
                <select
                  value={newTask.type}
                  onChange={(e) => setNewTask({...newTask, type: e.target.value})}
                >
                  <option value="planting">Planting</option>
                  <option value="harvesting">Harvesting</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="feeding">Feeding</option>
                  <option value="monitoring">Monitoring</option>
                  <option value="planning">Planning</option>
                  <option value="preparation">Preparation</option>
                </select>
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button onClick={() => setShowTaskModal(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={addTask} className="btn-primary">
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Calendar;

