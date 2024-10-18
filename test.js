// import faker from "faker";
import { faker } from "@faker-js/faker";

// User Data
function generateUserData() {
    const rolesDistribution = {
        student: 25,
        teacher: 5,
        parent: 5,
        admin: 2,
    };

    const users = [];
    let roleCounters = {
        student: 1,
        teacher: 1,
        parent: 1,
        admin: 1,
    };

    // Generate random password
    function generatePassword(length) {
        const chars =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        let password = "";
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    // Create users based on the distribution
    Object.keys(rolesDistribution).forEach((role) => {
        for (let i = 0; i < rolesDistribution[role]; i++) {
            const user = {
                userId: `${role}${roleCounters[role]}`,
                password: generatePassword(10),
                role: role.toUpperCase(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            users.push(user);
            roleCounters[role]++;
        }
    });

    return users;
}

// Student Data
function generateStudentData() {
    const students = [];

    // Random blood types and genders
    const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
    const genders = ["MALE", "FEMALE"];

    // Generate 25 students
    for (let i = 1; i <= 25; i++) {
        const student = {
            studentId: `student${i}`,
            role: "STUDENT",
            name: faker.person.firstName(),
            surname: faker.person.lastName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            address: faker.location.streetAddress(),
            img: faker.image.avatar(), // Optional avatar image
            bloodType:
                bloodTypes[Math.floor(Math.random() * bloodTypes.length)],
            sex: genders[Math.floor(Math.random() * genders.length)],
            parentId: `parent${Math.ceil(i / 5)}`, // Randomly assigning parentId (assuming 5 students per parent)
            class: Math.floor(Math.random() * 5) + 1, // Random classId between 1-5
            section: "S1",
            attendances: [], // ObjectId references can be inserted here later
            results: [], // ObjectId references can be inserted here later
            birthday: faker.date.past(20, new Date(2005, 0, 1)), // Random past date (student ages)
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        students.push(student);
    }

    return students;
}

// Teacher Data
function generateTeacherData() {
    const teachers = [];

    // Random names, blood types, and addresses using faker
    const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
    const genders = ["MALE", "FEMALE"];

    // Generate 10 teacher data
    for (let i = 1; i <= 10; i++) {
        const teacher = {
            teacherId: `teacher${i}`,
            role: "TEACHER",
            name: faker.person.firstName(),
            surname: faker.person.lastName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            address: faker.location.streetAddress(),
            img: faker.image.avatar(), // Optional avatar image
            bloodType:
                bloodTypes[Math.floor(Math.random() * bloodTypes.length)],
            sex: genders[Math.floor(Math.random() * genders.length)],
            subjects: [], // ObjectId references can be inserted here
            lessons: [], // ObjectId references can be inserted here
            classes: [], // ObjectId references can be inserted here
            birthday: faker.date.past(40, new Date(2000, 0, 1)),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        teachers.push(teacher);
    }

    return teachers;
}

// Parent Data
function generateParentData() {
    const parents = [];

    // Generate 10 parent records
    for (let i = 1; i <= 10; i++) {
        const parent = {
            parentId: `parent${i}`,
            role: "PARENT",
            name: faker.person.firstName(),
            surname: faker.person.lastName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            address: faker.location.streetAddress(),
            students: [], // Initially empty, can be linked to students later
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        parents.push(parent);
    }

    return parents;
}

// Subject Data
function generateSubjectData() {
    const subjectNames = [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "History",
        "Geography",
        "English",
        "Computer Science",
        "Physical Education",
        "Art",
    ];

    const subjects = [];

    subjectNames.forEach((name, index) => {
        const subject = {
            subjectCode: `SUBJ${index + 1}`,
            name: name,
            teachers: [], // You would populate with ObjectId references
            lessons: [], // You would populate with ObjectId references
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        subjects.push(subject);
    });

    return subjects;
}

// Result Data
function generateResultData() {
    const results = [];

    // Generate 50 result records
    for (let i = 1; i <= 100; i++) {
        const result = {
            score: faker.number.int({ min: 0, max: 100 }), // Score between 0 and 100
            examId: faker.number.int({ min: 1, max: 20 }), // Random examId (assuming 20 exams available)
            assignmentId: faker.number.int({ min: 1, max: 20 }), // Random assignmentId (assuming 20 assignments available)
            studentId: `student${faker.number.int({ min: 1, max: 25 })}`, // Random studentId (assuming 25 students)
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        results.push(result);
    }

    return results;
}

// Lesson Data
function generateLessonData() {
    const lessons = [];

    // Define some example subjects and classes for reference
    const subjects = Array.from({ length: 10 }, (_, i) => i + 1); // Subject IDs 1-10
    const classes = Array.from({ length: 5 }, (_, i) => i + 1); // Class IDs 1-5
    const teachers = Array.from({ length: 5 }, (_, i) => `teacher${i + 1}`); // Teacher IDs 'teacher1' to 'teacher5'
    const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY"];

    for (let i = 1; i <= 10; i++) {
        const lesson = {
            name: faker.lorem.words(3), // Lesson name
            day: faker.helpers.arrayElement(days), // Random day
            startTime: faker.date.future(), // Future start time
            endTime: faker.date.future(), // Future end time
            subjectId: faker.helpers.arrayElement(subjects), // Random subject ID
            classId: faker.helpers.arrayElement(classes), // Random class ID
            teacherId: faker.helpers.arrayElement(teachers), // Random teacher ID
            exams: [], // Can be populated later
            assignments: [], // Can be populated later
            attendances: [], // Can be populated later
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        lessons.push(lesson);
    }

    return lessons;
}

// Grade Data
function generateGradeData() {
    const grades = [];

    for (let i = 1; i <= 10; i++) {
        const grade = {
            level: i, // Grade level (1 to numGrades)
            students: [], // Randomly select 1 to 10 students
            classes: [], // Randomly select 1 to 3 classes
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        grades.push(grade);
    }

    return grades;
}

// Event Data
function generateExamData() {
    const exams = [];

    // Define some example lesson ObjectIds and result ObjectIds for reference
    const lessons = Array.from({ length: 10 }, (_, i) =>
        faker.number.int({ min: 1, max: 100 })
    ); // Mock lesson IDs

    for (let i = 1; i <= 10; i++) {
        const startTime = faker.date.future();
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // Add 1 hour to the startTime

        const exam = {
            examCode: `EXAM${i}`,
            title: faker.lorem.words(3), // Random title for the exam
            startTime: startTime,
            endTime: endTime,
            lessonId: faker.helpers.arrayElement(lessons), // Random lessonId
            results: [], // Randomly select 1 to 5 results
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        exams.push(exam);
    }

    return exams;
}

// Event Data
function generateEventData() {
    const events = [];

    // Define some example class IDs for reference
    const classes = Array.from({ length: 10 }, (_, i) =>
        faker.number.int({ min: 1, max: 100 })
    );

    for (let i = 1; i <= 10; i++) {
        const startTime = faker.date.future();
        const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours to startTime

        const event = {
            title: faker.lorem.sentence(3), // Generate a random event title
            description: faker.lorem.paragraph(), // Generate a random description
            startTime: startTime,
            endTime: endTime,
            classId: faker.helpers.arrayElement(classes), // Randomly select a class ID
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        events.push(event);
    }

    return events;
}

// Class Data
function generateClassData() {
    const classes = [];

    // Generate unique sections for the classes
    const sections = Array.from({ length: 10 }, (_, i) => `S${i + 1}`);

    for (let i = 0; i < 10; i++) {
        const classData = {
            class: faker.number.int({ min: 1, max: 12 }), // Generate class from 1 to 12
            section: sections[i], // Assign unique section
            capacity: faker.number.int({ min: 20, max: 50 }), // Class capacity between 20 and 50 students
            supervisorId: `teacher${faker.number.int({
                min: 1,
                max: 10,
            })}`, // Random supervisorId (example format)
            lessons: [], // This should be populated with actual lesson references
            students: [], // This should be populated with actual student references
            events: [], // This should be populated with actual event references
            announcements: [], // This should be populated with actual announcement references
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        classes.push(classData);
    }

    return classes;
}

// Attendance Data
function generateAttendanceData() {
    const attendanceData = [];

    for (let i = 0; i < 50; i++) {
        const attendance = {
            date: faker.date.recent(30), // Random date within the last 30 days
            present: faker.datatype.boolean(), // Randomly true or false
            studentId: `student${faker.number.int({ min: 1, max: 25 })}`, // Random studentId (student1 to student25)
            lessonId: faker.number.int({ min: 1, max: 10 }), // Random lessonId (lesson1 to lesson10)
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        attendanceData.push(attendance);
    }

    return attendanceData;
}

// Assignment Data
function generateAssignmentData() {
    const assignmentData = [];

    for (let i = 0; i < 10; i++) {
        const startDate = faker.date.past(1); // A random date in the past year
        const dueDate = faker.date.soon(10, startDate); // Due date within 10 days of the start date

        const assignment = {
            title: faker.lorem.words(3), // Random title with 3 words
            startDate: startDate,
            dueDate: dueDate,
            lessonId: faker.number.int({ min: 1, max: 10 }), // Random lessonId (lesson1 to lesson10)
            results: [], // Empty array for now (can be populated with results later)
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        assignmentData.push(assignment);
    }

    return assignmentData;
}

// Announcement Data
function generateAnnouncementData() {
    const announcementData = [];

    for (let i = 0; i < 10; i++) {
        const announcement = {
            title: faker.lorem.words(4), // Random title with 4 words
            description: faker.lorem.sentences(2), // Random description with 2 sentences
            date: faker.date.recent(30), // Random date in the last 30 days
            classId: faker.number.int({ min: 1, max: 5 }), // Random classId between 1 and 5
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        announcementData.push(announcement);
    }

    return announcementData;
}

// Admin Data
function generateAdminData() {
    const adminData = [];

    for (let i = 0; i < 5; i++) {
        const admin = {
            adminId: `admin${i + 1}`, // Sequential adminId (admin1, admin2, etc.)
            role: "ADMIN", // Static role value
            name: faker.person.firstName(), // Random first name
            surname: faker.person.lastName(), // Random surname
            email: faker.internet.email(), // Random unique email
            img: faker.image.avatar(), // Random avatar image URL
            bloodType: faker.helpers.arrayElement([
                "A+",
                "A-",
                "B+",
                "B-",
                "O+",
                "O-",
                "AB+",
                "AB-",
            ]), // Random blood type
            sex: faker.helpers.arrayElement(["MALE", "FEMALE"]), // Random gender
            birthday: faker.date.past(40, new Date(2000, 0, 1)), // Random birthday in the past 40 years before 2000
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        adminData.push(admin);
    }

    return adminData;
}

// ============================================================ //

const generateData = generateStudentData();

let stringifyData = JSON.stringify(generateData);
console.log("🚀 ~ stringifyData:", stringifyData);
