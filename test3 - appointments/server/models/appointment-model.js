function Appointment(id, teamName, fromDate, toDate, description, room) {
    this.id = id;
    this.teamName = teamName;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.description = description;
    this.room = room;
}

module.exports = {
    Appointment: Appointment
}