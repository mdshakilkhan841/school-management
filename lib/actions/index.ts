// ─── Shared Types ────────────────────────────────────────────
export type { ActionResponse, CurrentState } from "./action-response";

// ─── Domain Actions ──────────────────────────────────────────
export { createSubject, updateSubject, deleteSubject } from "./subject.actions";
export { createClass, updateClass, deleteClass } from "./class.actions";
export { createSection, updateSection, deleteSection } from "./section.actions";
export { createTeacher, updateTeacher, deleteTeacher } from "./teacher.actions";
export { createStudent, updateStudent, deleteStudent } from "./student.actions";
export { createExam, updateExam, deleteExam } from "./exam.actions";
export { createLesson, updateLesson, deleteLesson } from "./lesson.actions";
export { createAssignment, updateAssignment, deleteAssignment } from "./assignment.actions";
export { createResult, updateResult, deleteResult } from "./result.actions";
export { createAttendance, updateAttendance, deleteAttendance } from "./attendance.actions";
export { createEvent, updateEvent, deleteEvent } from "./event.actions";
export { createAnnouncement, updateAnnouncement, deleteAnnouncement } from "./announcement.actions";
