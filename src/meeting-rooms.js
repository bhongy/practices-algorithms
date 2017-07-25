/*
  Given an array of meeting time intervals consisting of start and end times
  `[[s1,e1],[s2,e2],...]` (s < e) - determine if a person could attend all meetings.

  Assume the schedule is unsorted - i.e. `s1` is not guaranteed to be less than `s2`.

  https://leetcode.com/problems/meeting-rooms

  @flow
*/

type Timestamp = number;
type Appointment = [Timestamp, Timestamp];

function hasOverlap(a1: Appointment, a2: Appointment): boolean {
  const [front, back] = a1[0] < a2[0] ? [a1, a2] : [a2, a1];
  // end time of the front overlaps the start time of the back
  return front[1] > back[0];
}

// O(n choose 2) time ... combination
// O(1) space
function canAttendMeetings(schedule: Array<Appointment>): boolean {
  if (schedule.length < 2) {
    return true;
  }

  for (let i = 0; i < schedule.length - 1; i++) {
    for (let j = i + 1; j < schedule.length; j++) {
      if (hasOverlap(schedule[i], schedule[j])) {
        return false;
      }
    }
  }

  return true;
}

export default canAttendMeetings;
