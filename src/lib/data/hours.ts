export const openingHours = {
    timeZone: "America/New_York",
    days: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:00",
    lastBooking: "18:00",
    closes: "19:00",
};

export function formatHour(time: string) {
    const [hour, minutes] = time.split(":").map(Number);
    const period = hour < 12 ? "am" : "pm";
    const clock = minutes
        ? `${hour % 12 || 12}:${time.slice(3)}`
        : hour % 12 || 12;

    return `${clock}${period}`;
}

export const firstDay = openingHours.days[0];
export const lastDay = openingHours.days[openingHours.days.length - 1];

export const hoursText = `${firstDay} - ${lastDay}, ${formatHour(openingHours.opens)} - ${formatHour(openingHours.closes)}`;
