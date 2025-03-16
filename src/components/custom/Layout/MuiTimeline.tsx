import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

// Define the type for the timeline event object
interface TimelineEvent {
    label: string;
    dotColor?: 'primary' | 'secondary' | 'error' | 'default'; // Customize as needed
    hasConnector?: boolean; // Whether the TimelineConnector should be included
    position?: 'alternate' | 'left' | 'right'; // Optional position for TimelineItem
}

interface AlternateTimelineProps {
    timelineEvents: TimelineEvent[]; // Array of timeline events
}

const AlternateTimeline: React.FC<AlternateTimelineProps> = ({ timelineEvents }) => {
    return (
        <Timeline position="alternate">
            {timelineEvents.map((event, index) => (
                <TimelineItem key={index} position={event.position || 'alternate'}>
                    <TimelineSeparator>
                        <TimelineDot />
                        {event.hasConnector !== false && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>{event.label}</TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
};

export default AlternateTimeline;
