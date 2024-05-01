"use strict";
class Student {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.enrolledCourses = [];
    }
    enroll(course) {
        this.enrolledCourses.push(course);
    }
}
class Instructor {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    createCourse(title) {
        return new Course(title, this);
    }
    createLesson(course, title) {
        course.addLesson(new Lesson(title));
    }
    createAssignment(lesson, title) {
        lesson.addAssignment(title);
    }
    createAssessment(course, title) {
        course.addAssessment(title);
    }
}
class Course {
    constructor(title, instructor) {
        this.title = title;
        this.instructor = instructor;
        this.lessons = [];
        this.assessments = [];
    }
    addLesson(lesson) {
        this.lessons.push(lesson);
    }
    addAssessment(assessment) {
        this.assessments.push(assessment);
    }
}
class Lesson {
    constructor(title) {
        this.title = title;
        this.assignments = [];
    }
    addAssignment(assignment) {
        this.assignments.push(assignment);
    }
}
const instructor = new Instructor(1, "tung");
const student = new Student(101, "tuan");
const course = instructor.createCourse("JavaScript");
instructor.createLesson(course, "Introduction to JavaScript");
instructor.createAssignment(course.lessons[0], " Data Types");
instructor.createAssessment(course, "Exam");
student.enroll(course);
console.log(student);
console.log(course);
