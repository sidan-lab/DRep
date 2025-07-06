export interface EventData {
    title: string;
    organiser: string;
    date: string;
    location: string;
    attendees: string;
    twitter: string;
    category: string;
}

export interface EventCategory {
    name: string;
    events: EventData[];
}

// Parse the markdown content and extract event data
export function parseEventsData(markdownContent: string): EventCategory[] {
    const lines = markdownContent.split('\n');
    const categories: EventCategory[] = [];
    let currentCategory: EventCategory | null = null;
    let currentEvent: Partial<EventData> = {};

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Check for category headers (## CategoryName)
        if (line.startsWith('## ') && !line.includes('Event Schema')) {
            // Save previous event if exists
            if (currentEvent.title && currentCategory) {
                currentCategory.events.push(currentEvent as EventData);
                currentEvent = {};
            }

            // Create new category
            const categoryName = line.replace('## ', '').trim();
            currentCategory = {
                name: categoryName,
                events: []
            };
            categories.push(currentCategory);
        }
        // Check for event properties
        else if (line.startsWith('Title:') && currentCategory) {
            // Save previous event if exists
            if (currentEvent.title && currentCategory) {
                currentCategory.events.push(currentEvent as EventData);
            }

            // Start new event
            currentEvent = {
                title: line.replace('Title:', '').trim(),
                category: currentCategory.name
            };
        }
        else if (line.startsWith('Organiser:')) {
            currentEvent.organiser = line.replace('Organiser:', '').trim();
        }
        else if (line.startsWith('Date:')) {
            currentEvent.date = line.replace('Date:', '').trim();
        }
        else if (line.startsWith('Location:')) {
            currentEvent.location = line.replace('Location:', '').trim();
        }
        else if (line.startsWith('Attendees:')) {
            currentEvent.attendees = line.replace('Attendees:', '').trim();
        }
        else if (line.startsWith('Twitter:')) {
            currentEvent.twitter = line.replace('Twitter:', '').trim();
        }
    }

    // Save last event
    if (currentEvent.title && currentCategory) {
        currentCategory.events.push(currentEvent as EventData);
    }

    return categories;
}

// Get total number of events across all categories
export function getTotalEventsCount(categories: EventCategory[]): number {
    return categories.reduce((total, category) => total + category.events.length, 0);
}

// Get total attendees (excluding N/A values)
export function getTotalAttendeesCount(categories: EventCategory[]): number {
    let total = 0;
    categories.forEach(category => {
        category.events.forEach(event => {
            if (event.attendees && event.attendees !== 'N/A' && !event.attendees.includes('~')) {
                const count = parseInt(event.attendees.replace(/[^0-9]/g, ''));
                if (!isNaN(count)) {
                    total += count;
                }
            }
        });
    });
    return total;
}

// Filter events by category
export function getEventsByCategory(categories: EventCategory[], categoryName: string): EventData[] {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.events : [];
}

// Sort events by date (newest first)
export function sortEventsByDate(events: EventData[]): EventData[] {
    return events.sort((a, b) => {
        // Simple date comparison - you might want to improve this for different date formats
        const dateA = new Date(a.date + ' 2024'); // Default to 2024 if no year
        const dateB = new Date(b.date + ' 2024');
        return dateB.getTime() - dateA.getTime();
    });
} 