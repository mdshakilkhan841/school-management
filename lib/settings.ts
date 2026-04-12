export const ITEM_PER_PAGE = 10

type RouteAccessMap = {
  [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
  "/admin(/.*)?": ["admin"],
  "/student(/.*)?": ["student"],
  "/teacher(/.*)?": ["teacher"],
  "/parent(/.*)?": ["parent"],
  "/teachers(/.*)?": ["admin", "teacher"],
  "/students(/.*)?": ["admin", "teacher"],
  "/parents(/.*)?": ["admin", "teacher"],
  "/subjects(/.*)?": ["admin"],
  "/classes(/.*)?": ["admin", "teacher"],
  "/exams(/.*)?": ["admin", "teacher", "student", "parent"],
  "/assignments(/.*)?": ["admin", "teacher", "student", "parent"],
  "/results(/.*)?": ["admin", "teacher", "student", "parent"],
  "/attendance(/.*)?": ["admin", "teacher", "student", "parent"],
  "/events(/.*)?": ["admin", "teacher", "student", "parent"],
  "/announcements(/.*)?": ["admin", "teacher", "student", "parent"],
};