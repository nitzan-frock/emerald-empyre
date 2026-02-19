/**
 * Events database
 * Add events here with their date and location information
 */

export interface Event {
    date: Date;
    location: string;
    ticketUrl?: string;
    locationUrl?: string;
}

export const allEvents: Event[] = [
    {
        // Use Date constructor with year, month (0-indexed), day to avoid timezone issues
        date: new Date(2025, 11, 28), // December 28, 2025 (month 11 = December)
        location: 'Voodoo Brewing',
        locationUrl: 'https://voodoobrewery.vegas/',
    },
    {
        // Use Date constructor with year, month (0-indexed), day to avoid timezone issues
        date: new Date(2026, 1, 20),
        location: 'THE USUAL PLACE',
        ticketurl: 'https://www.eventbrite.com/e/chalmer-pull-up-reality-algorerhythm-and-emerald-empyre-at-tup-tickets-1982207361578?aff=EmeraldEmpyre',
        locationUrl: 'https://www.theusualplace.vegas/',
    },
    {
        // Use Date constructor with year, month (0-indexed), day to avoid timezone issues
        date: new Date(2026, 1, 27),
        location: 'Griffin',
        locationUrl: 'https://the-gr.weeblyte.com/',
    },
    // Add more events here
];

/**
 * Get only future events (events with dates in the future)
 */
export function getFutureEvents(): Event[] {
    const now = new Date();
    // Set time to start of day for accurate date comparison
    now.setHours(0, 0, 0, 0);

    return allEvents
        .filter((event) => {
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate >= now;
        })
        .sort((a, b) => a.date.getTime() - b.date.getTime());
}

/**
 * Format date for display (e.g., "December 28, 2024")
 */
export function formatEventDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}

