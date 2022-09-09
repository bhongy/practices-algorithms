import canAttendMeetings, {type Schedule} from './meeting-rooms';

describe('Meeting Rooms', () => {
  it('should return `false` for a schedule with time conflict', () => {
    const schedules: Array<Schedule> = [
      [
        [0, 30],
        [5, 10],
        [15, 20],
      ],
      [
        [5, 8],
        [6, 8],
      ],
    ];

    schedules.forEach((schedule) => {
      expect(canAttendMeetings(schedule)).toBe(false);
    });
  });

  it('should return `true` for a schedule without time conflict', () => {
    const schedules: Array<Schedule> = [
      [],
      [[60, 77]],
      [
        [120, 360],
        [15, 25],
        [360, 385],
      ],
      [
        [1, 5],
        [8, 9],
      ],
    ];

    schedules.forEach((schedule) => {
      expect(canAttendMeetings(schedule)).toBe(true);
    });
  });
});
