export default interface Book {
  id: number;
  author_id: number; // Refers to the user ID ( A book belongs to a user and a user has many books )
  title: string;
  description: string;
  year: string;
}
