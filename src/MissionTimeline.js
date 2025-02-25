import React, { useState, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { format, addHours, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import '../styles/Timeline.css';

const MissionTimeline = ({ missions }) => {
  const [timeRange, setTimeRange] = useState({
    start: startOfDay(new Date()),
    end: endOfDay(new Date())
  });
  const [visibleMissions, setVisibleMissions] = useState([]);
  const timelineRef = useRef(null);
  
  useEffect(() => {
    // Filter missions within visible time range
    const filtered = missions.filter(mission => 
      isWithinInterval(new Date(mission.startTime), {
        start: timeRange.start,
        end: timeRange.end
      })
    );
    setVisibleMissions(filtered);
  }, [missions, timeRange]);
  
  const handleDragEnd = (result) => {
    // Handle aircraft reassignment logic
    if (!result.destination) return;
    
    console.log('Aircraft moved from', result.source.droppableId, 'to', result.destination.droppableId);
    // Here you would update the mission assignments
  };
  
  const scrollTimeline = (direction) => {
    const hoursToShift = 4;
    if (direction === 'left') {
      setTimeRange({
        start: addHours(timeRange.start, -hoursToShift),
        end: addHours(timeRange.end, -hoursToShift)
      });
    } else {
      setTimeRange({
        start: addHours(timeRange.start, hoursToShift),
        end: addHours(timeRange.end, hoursToShift)
      });
    }
  };
  
  // Calculate position and width based on mission time
  const getTimelineStyles = (mission) => {
    const timelineStart = timeRange.start.getTime();
    const timelineEnd = timeRange.end.getTime();
    const timelineWidth = timelineEnd - timelineStart;
    
    const missionStart = new Date(mission.startTime).getTime();
    const missionEnd = new Date(mission.endTime).getTime();
    
    const leftPosition = ((missionStart - timelineStart) / timelineWidth) * 100;
    const width = ((missionEnd - missionStart) / timelineWidth) * 100;
    
    return {
      left: `${leftPosition}%`,
      width: `${width}%`
    };
  };
  
  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <h2>Mission Timeline</h2>
        <div className="timeline-controls">
          <button className="control-btn" onClick={() => scrollTimeline('left')}>◀ Earlier</button>
          <span className="time-range">
            {format(timeRange.start, 'HH:mm')} - {format(timeRange.end, 'HH:mm')}
          </span>
          <button className="control-btn" onClick={() => scrollTimeline('right')}>Later ▶</button>
        </div>
      </div>
      
      <div className="timeline-view" ref={timelineRef}>
        <div className="time-markers">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="time-marker">
              <span className="marker-label">{String(i).padStart(2, '0')}:00</span>
            </div>
          ))}
        </div>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="timeline-lanes">
            {/* Each row represents an aircraft */}
            {missions.map((mission, index) => (
              <div key={mission.id} className="timeline-lane">
                <div className="lane-label">{mission.aircraft}</div>
                <Droppable droppableId={`lane-${index}`} direction="horizontal">
                  {(provided) => (
                    <div 
                      className="lane-content"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <Draggable draggableId={mission.id} index={index}>
                        {(provided) => (
                          <div
                            className={`timeline-block ${mission.type.toLowerCase()}`}
                            style={getTimelineStyles(mission)}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <span className="mission-type">{mission.type}</span>
                            <span className="mission-time">
                              {format(new Date(mission.startTime), 'HH:mm')}
                            </span>
                          </div>
                        )}
                      </Draggable>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default MissionTimeline;